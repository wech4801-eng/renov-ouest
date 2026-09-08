/**
 * Noeuds Schema.org des prestations.
 * Chaque propriete provient de `services.ts` : rien n'est ajoute pour le SEO.
 * `offers` est volontairement absent — aucun prix n'est communique.
 */
import { services, type Service } from '@/data/services';
import { company, siteUrl } from '@/data/company';

export const serviceId = (slug: string) => `${siteUrl}/prestations/${slug}#service`;

export const serviceNode = (s: Service) => ({
  '@type': 'Service',
  '@id': serviceId(s.slug),
  name: s.name,
  serviceType: s.name,
  description: s.short,
  url: `${siteUrl}/prestations/${s.slug}`,
  provider: { '@id': `${siteUrl}/#business` },
  areaServed: company.serviceArea.map((name) => ({ '@type': 'Place', name })),
  // Ce que couvre concretement l'intervention, tel qu'affiche sur la page.
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: `${s.name} — étapes de l’intervention`,
    itemListElement: s.scope.map((step) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: step },
    })),
  },
});

export const allServiceNodes = () => services.map(serviceNode);
