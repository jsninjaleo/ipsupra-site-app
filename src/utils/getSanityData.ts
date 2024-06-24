import { client } from '../sanityClient'

export async  function getSanityData(query: string) {
  const CONTENT_QUERY = query;
  const content = await client.fetch(CONTENT_QUERY);
  return content;
}
