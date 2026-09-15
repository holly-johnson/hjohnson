import { PERSON_ID, serializeStructuredData, structuredDataFor } from './structured-data';
import { pageFor, siteMetadata } from './site-metadata';

function graphFor(path: string): Record<string, unknown>[] {
  const page = pageFor(path);
  if (!page) throw new Error(`no page for ${path}`);
  return structuredDataFor(page)['@graph'] as Record<string, unknown>[];
}

function nodeOfType(path: string, type: string): Record<string, unknown> {
  const node = graphFor(path).find(n => n['@type'] === type);
  if (!node) throw new Error(`no ${type} node for ${path}`);
  return node;
}

describe('structuredDataFor', () => {
  it('describes a profile page as being about the person', () => {
    const page = nodeOfType('/', 'ProfilePage');
    expect(page['mainEntity']).toEqual({ '@id': PERSON_ID });
  });

  it('describes a case study as authored by the person', () => {
    const article = nodeOfType('/work/helios', 'Article');
    expect(article['author']).toEqual({ '@id': PERSON_ID });
    expect(article['headline']).toBe(pageFor('/work/helios')?.title);
  });

  it('gives every page the same Person @id, so six pages resolve to one identity', () => {
    const ids = siteMetadata.pages.map(page => nodeOfType(page.path, 'Person')['@id']);
    expect(new Set(ids)).toEqual(new Set([PERSON_ID]));
  });

  it('carries sameAs, which is what links this site to the LinkedIn profile', () => {
    expect(nodeOfType('/', 'Person')['sameAs']).toEqual([...siteMetadata.person.sameAs]);
  });

  it('uses absolute URLs, which is the only kind structured data may contain', () => {
    for (const page of siteMetadata.pages) {
      for (const node of graphFor(page.path)) {
        for (const value of Object.values(node)) {
          if (typeof value === 'string' && value.startsWith('/')) {
            throw new Error(`relative URL in structured data for ${page.path}: ${value}`);
          }
        }
      }
    }
  });

  it('describes only published pages', () => {
    expect(pageFor('/about')).toBeUndefined();
  });
});

describe('serializeStructuredData', () => {
  it('produces parseable JSON', () => {
    const page = pageFor('/');
    expect(() => JSON.parse(serializeStructuredData(structuredDataFor(page!)))).not.toThrow();
  });

  it('escapes "<" so a "</script>" in the data cannot close the block early', () => {
    const serialized = serializeStructuredData({ name: '</script><img onerror=alert(1)>' });
    expect(serialized).not.toContain('</script>');
    expect(JSON.parse(serialized)['name']).toBe('</script><img onerror=alert(1)>');
  });
});
