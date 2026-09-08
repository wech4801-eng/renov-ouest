<?php
/**
 * Renov'Ouest — reception des demandes de devis.
 *
 * Compatible hebergement mutualise (Hostinger, Apache/Nginx + PHP 8).
 * Envoi par SMTP quand il est configure, repli sur mail() sinon.
 *
 * AUCUN SECRET DANS CE FICHIER : la configuration est lue depuis les variables
 * d'environnement, ou depuis config.php (non versionne) si presentes.
 * Voir README, section « Configuration du formulaire ».
 */

declare(strict_types=1);

// ---------------------------------------------------------------- configuration
$config = [
    'to'          => getenv('CONTACT_TO') ?: 'renovouest49@gmail.com',
    'smtp_host'   => getenv('SMTP_HOST') ?: '',
    'smtp_port'   => (int) (getenv('SMTP_PORT') ?: 587),
    'smtp_user'   => getenv('SMTP_USER') ?: '',
    'smtp_pass'   => getenv('SMTP_PASS') ?: '',
    'smtp_from'   => getenv('SMTP_FROM') ?: '',
    'smtp_secure' => getenv('SMTP_SECURE') ?: 'tls',
    'site'        => getenv('PUBLIC_SITE_URL') ?: '',
];
if (is_readable(__DIR__ . '/config.php')) {
    $config = array_merge($config, (array) require __DIR__ . '/config.php');
}

// ---------------------------------------------------------------- utilitaires
function wants_json(): bool
{
    $accept = $_SERVER['HTTP_ACCEPT'] ?? '';
    return str_contains($accept, 'application/json');
}

function respond(bool $ok, string $message, int $status = 200): never
{
    http_response_code($status);
    if (wants_json()) {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(['ok' => $ok, 'error' => $ok ? null : $message], JSON_UNESCAPED_UNICODE);
    } else {
        // Repli sans JavaScript : on renvoie l'utilisateur sur la page contact.
        $target = $ok ? '/contact?envoye=1' : '/contact?erreur=1#devis';
        header('Location: ' . $target, true, 303);
    }
    exit;
}

/** Neutralise les tentatives d'injection d'en-tetes SMTP. */
function clean_header(string $v): string
{
    return trim(str_replace(["\r", "\n", "%0a", "%0d"], '', $v));
}

function field(string $name, int $max = 2000): string
{
    $v = (string) ($_POST[$name] ?? '');
    $v = str_replace("\0", '', $v);
    return mb_substr(trim($v), 0, $max);
}

/** Limitation basique par IP : 5 envois par heure, sans base de donnees. */
function rate_limited(): bool
{
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'inconnu';
    $file = sys_get_temp_dir() . '/ro_rate_' . sha1($ip) . '.json';
    $now = time();
    $hits = [];
    if (is_readable($file)) {
        $hits = json_decode((string) file_get_contents($file), true) ?: [];
    }
    $hits = array_values(array_filter($hits, static fn($t) => $now - (int) $t < 3600));
    if (count($hits) >= 5) {
        return true;
    }
    $hits[] = $now;
    @file_put_contents($file, json_encode($hits), LOCK_EX);
    return false;
}

/** Envoi SMTP minimal (AUTH LOGIN + STARTTLS), sans dependance externe. */
function smtp_send(array $c, string $subject, string $body, string $replyTo): bool
{
    $transport = $c['smtp_secure'] === 'ssl' ? 'ssl://' : '';
    $socket = @stream_socket_client(
        $transport . $c['smtp_host'] . ':' . $c['smtp_port'],
        $errno, $errstr, 15
    );
    if (!$socket) {
        return false;
    }

    $read = static function () use ($socket): string {
        $out = '';
        while ($line = fgets($socket, 515)) {
            $out .= $line;
            if (isset($line[3]) && $line[3] === ' ') break;
        }
        return $out;
    };
    $cmd = static function (string $c) use ($socket, $read): string {
        fwrite($socket, $c . "\r\n");
        return $read();
    };
    $ok = static fn(string $r, string $code): bool => str_starts_with($r, $code);

    $read();
    $host = $_SERVER['SERVER_NAME'] ?? 'localhost';
    $cmd('EHLO ' . $host);

    if ($c['smtp_secure'] === 'tls') {
        if (!$ok($cmd('STARTTLS'), '220')) { fclose($socket); return false; }
        if (!@stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
            fclose($socket); return false;
        }
        $cmd('EHLO ' . $host);
    }

    if ($c['smtp_user'] !== '') {
        $cmd('AUTH LOGIN');
        $cmd(base64_encode($c['smtp_user']));
        if (!$ok($cmd(base64_encode($c['smtp_pass'])), '235')) { fclose($socket); return false; }
    }

    $from = $c['smtp_from'] ?: $c['smtp_user'];
    if (!$ok($cmd('MAIL FROM:<' . $from . '>'), '250')) { fclose($socket); return false; }
    if (!$ok($cmd('RCPT TO:<' . $c['to'] . '>'), '250')) { fclose($socket); return false; }
    if (!$ok($cmd('DATA'), '354')) { fclose($socket); return false; }

    $headers = implode("\r\n", [
        'From: Site Renov Ouest <' . $from . '>',
        'Reply-To: ' . $replyTo,
        'To: ' . $c['to'],
        'Subject: =?UTF-8?B?' . base64_encode($subject) . '?=',
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'Content-Transfer-Encoding: 8bit',
        'Date: ' . date('r'),
    ]);
    // Un point en debut de ligne doit etre double (RFC 5321).
    $safeBody = preg_replace('/^\./m', '..', $body);
    $sent = $ok($cmd($headers . "\r\n\r\n" . $safeBody . "\r\n."), '250');
    $cmd('QUIT');
    fclose($socket);
    return $sent;
}

// ---------------------------------------------------------------- traitement
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(false, 'Méthode non autorisée.', 405);
}

// Anti-spam 1 : piege a robots. Un humain ne remplit jamais ce champ.
if (field('societe') !== '') {
    // On repond « ok » pour ne pas renseigner le robot sur la detection.
    respond(true, '');
}

// Anti-spam 2 : formulaire envoye en moins de 3 secondes = automate.
$ts = (int) field('ts');
if ($ts > 0 && (microtime(true) * 1000 - $ts) < 3000) {
    respond(true, '');
}

if (rate_limited()) {
    respond(false, 'Trop de demandes envoyées depuis cette connexion. Réessayez plus tard.', 429);
}

$nom       = field('nom', 120);
$telephone = field('telephone', 40);
$email     = field('email', 180);
$type      = field('type', 80);
$adresse   = field('adresse', 240);
$budget    = field('budget', 80);
$dateSouh  = field('date', 40);
$message   = field('message', 5000);

$errors = [];
if ($nom === '')                                        $errors[] = 'nom';
if (strlen(preg_replace('/[^\d+]/', '', $telephone)) < 9) $errors[] = 'téléphone';
if (!filter_var($email, FILTER_VALIDATE_EMAIL))          $errors[] = 'email';
if ($type === '')                                        $errors[] = 'type de projet';
if (mb_strlen($message) < 10)                            $errors[] = 'message';

if ($errors) {
    respond(false, 'Champs invalides : ' . implode(', ', $errors) . '.', 422);
}

$replyTo = clean_header($nom) . ' <' . clean_header($email) . '>';
$subject = 'Demande de devis — ' . $type . ' — ' . $nom;

$lines = [
    'Nouvelle demande de devis depuis le site.',
    '',
    'Nom            : ' . $nom,
    'Téléphone      : ' . $telephone,
    'Email          : ' . $email,
    'Type de projet : ' . $type,
];
if ($adresse !== '')  $lines[] = 'Adresse        : ' . $adresse;
if ($budget !== '')   $lines[] = 'Budget         : ' . $budget;
if ($dateSouh !== '') $lines[] = 'Date souhaitée : ' . $dateSouh;
$lines[] = '';
$lines[] = 'Message :';
$lines[] = $message;
$lines[] = '';
$lines[] = '--';
$lines[] = 'Envoyé le ' . date('d/m/Y à H:i') . ' depuis ' . ($config['site'] ?: 'le site');
$body = implode("\n", $lines);

$sent = false;
if ($config['smtp_host'] !== '') {
    $sent = smtp_send($config, $subject, $body, $replyTo);
}
if (!$sent) {
    // Repli : fonction mail() de l'hebergeur.
    $headers = implode("\r\n", [
        'From: Site Renov Ouest <' . ($config['smtp_from'] ?: 'no-reply@' . ($_SERVER['SERVER_NAME'] ?? 'localhost')) . '>',
        'Reply-To: ' . $replyTo,
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
    ]);
    $sent = @mail(
        $config['to'],
        '=?UTF-8?B?' . base64_encode($subject) . '?=',
        $body,
        $headers
    );
}

if (!$sent) {
    error_log('[renov-ouest] echec envoi demande de devis');
    respond(false, 'L’envoi a échoué. Merci de nous appeler au 06 63 72 98 00.', 502);
}

respond(true, '');
