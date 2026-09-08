/**
 * Pages legales.
 * Les mentions marquees « A completer » attendent les informations reelles de
 * l'entreprise : elles ne doivent PAS etre inventees (PRD §39).
 */
import { company } from './company';

export type LegalBlock = { h: string; p: string; todo?: boolean };

export const mentions: { title: string; intro: string; blocks: LegalBlock[] } = {
  title: 'Mentions légales',
  intro:
    'Informations légales relatives au site et à son éditeur, conformément à la loi pour la confiance dans l’économie numérique.',
  blocks: [
    {
      h: 'Éditeur du site',
      p: `${company.name}\n${company.address.street}\n${company.address.postalCode} ${company.address.city}\n${company.address.region}, ${company.address.country}\nTéléphone : ${company.phone.display}\nEmail : ${company.email.display}`,
    },
    {
      h: 'Informations juridiques',
      p: 'Forme juridique, SIREN, SIRET et numéro de TVA intracommunautaire : à compléter avec les informations réelles de l’entreprise.',
      todo: true,
    },
    {
      h: 'Responsable de la publication',
      p: 'À compléter.',
      todo: true,
    },
    {
      h: 'Hébergeur',
      p: 'À compléter avec le nom, l’adresse et le contact de l’hébergeur du site.',
      todo: true,
    },
    {
      h: 'Propriété intellectuelle',
      p: `L’ensemble des contenus de ce site (textes, images, éléments graphiques, logo) est la propriété de ${company.name}, sauf mention contraire. Toute reproduction, même partielle, sans autorisation écrite préalable est interdite.`,
    },
    {
      h: 'Liens et responsabilité',
      p: 'Les informations publiées sur ce site sont fournies à titre indicatif et peuvent évoluer. Elles ne constituent pas un engagement contractuel : seul un devis signé engage l’entreprise.',
    },
  ],
};

export const confidentialite: { title: string; intro: string; blocks: LegalBlock[] } = {
  title: 'Politique de confidentialité',
  intro:
    'Cette page décrit les données collectées via ce site, leur finalité et les droits dont vous disposez.',
  blocks: [
    {
      h: 'Données collectées',
      p: 'Via le formulaire de demande de devis : nom et prénom, téléphone, email, type de projet, adresse du chantier, message, et le cas échéant budget indicatif et date souhaitée. Aucune autre donnée n’est collectée à votre insu.',
    },
    {
      h: 'Finalité du traitement',
      p: 'Ces données servent uniquement à répondre à votre demande, échanger sur votre projet et établir un devis.',
    },
    {
      h: 'Base légale',
      p: 'Le traitement repose sur votre consentement, exprimé par l’envoi du formulaire, et sur l’intérêt légitime de l’entreprise à répondre aux demandes qui lui sont adressées.',
    },
    {
      h: 'Destinataire',
      p: `Les demandes sont adressées à ${company.name} uniquement (${company.email.display}). Aucune donnée n’est vendue, louée ni cédée à des tiers.`,
    },
    {
      h: 'Durée de conservation',
      p: 'Les demandes sont conservées le temps nécessaire au traitement du projet, puis pour la durée légale applicable. Durée précise : à compléter.',
      todo: true,
    },
    {
      h: 'Vos droits',
      p: `Vous disposez d’un droit d’accès, de rectification, d’effacement, de limitation et d’opposition sur vos données. Pour l’exercer, écrivez à ${company.email.display} ou appelez le ${company.phone.display}. Vous pouvez également introduire une réclamation auprès de la CNIL.`,
    },
    {
      h: 'Cookies et mesure d’audience',
      p: 'Ce site n’utilise aucun cookie de suivi ni outil de mesure d’audience. Si un tel outil est ajouté ultérieurement, un mécanisme de consentement sera mis en place au préalable.',
    },
    {
      h: 'Hébergement des données',
      p: 'Les données transitent par l’hébergeur du site et par la messagerie de l’entreprise. Coordonnées de l’hébergeur : à compléter.',
      todo: true,
    },
  ],
};
