/**
 * JSON-LD: the part of the page written for machines.
 *
 * Meta tags say how a link should *look* when it is shared. They do not say who
 * this person is, that the Holly Johnson on this domain is the Holly Johnson on
 * that LinkedIn profile, or that a case study has an author. Search engines and
 * AI assistants read that from structured data, and without it they are left
 * guessing from prose they may never have rendered.
 *
 * `sameAs` is the load-bearing line. It is the claim that this site and the
 * linked profiles are one entity — which is what lets a search for the name
 * resolve to a person instead of to six unrelated blue links.
 *
 * Everything here has to be true and has to be visible on the page it describes.
 * Structured data that contradicts the page is worse than none: Google ignores
 * the page, and in the bad case it distrusts the domain.
 */
import { absoluteUrl, siteMetadata, type PageMetadata } from './site-metadata';

/** Stable `@id`s, so the Person is defined once and referenced everywhere else. */
export const PERSON_ID = `${siteMetadata.origin}/#person`;
export const WEBSITE_ID = `${siteMetadata.origin}/#website`;

type JsonLdNode = Record<string, unknown>;

function personNode(): JsonLdNode {
  const { person } = siteMetadata;
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: person.name,
    jobTitle: person.jobTitle,
    description: person.description,
    url: absoluteUrl('/'),
    email: `mailto:${person.email}`,
    image: absoluteUrl(person.image),
    sameAs: [...person.sameAs],
    knowsAbout: [...person.knowsAbout],
  };
}

function websiteNode(): JsonLdNode {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: siteMetadata.siteName,
    url: absoluteUrl('/'),
    inLanguage: 'en',
    publisher: { '@id': PERSON_ID },
  };
}

/**
 * The graph for one page.
 *
 * A profile page *is* about the person, so it carries `mainEntity`. A case study
 * is authored *by* her, so it carries `author` — the same Person node either way,
 * which is what ties six pages to one identity instead of to six.
 */
export function structuredDataFor(page: PageMetadata): JsonLdNode {
  const url = absoluteUrl(page.path);
  const image = absoluteUrl(page.image);

  const pageNode: JsonLdNode =
    page.kind === 'profile'
      ? {
          '@type': 'ProfilePage',
          '@id': `${url}#page`,
          url,
          name: page.title,
          description: page.description,
          primaryImageOfPage: image,
          isPartOf: { '@id': WEBSITE_ID },
          mainEntity: { '@id': PERSON_ID },
        }
      : {
          '@type': 'Article',
          '@id': `${url}#article`,
          url,
          headline: page.title,
          description: page.description,
          image,
          isPartOf: { '@id': WEBSITE_ID },
          author: { '@id': PERSON_ID },
          publisher: { '@id': PERSON_ID },
          inLanguage: 'en',
        };

  return { '@context': 'https://schema.org', '@graph': [websiteNode(), personNode(), pageNode] };
}

/**
 * Serialize for a `<script type="application/ld+json">` body.
 *
 * `<` is escaped because a `</script>` sequence inside a JSON string would end
 * the block early and spill the rest of the graph into the document as markup.
 */
export function serializeStructuredData(graph: JsonLdNode): string {
  return JSON.stringify(graph).replaceAll('<', '\\u003c');
}
