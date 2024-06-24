import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder'

export const client = createClient({
   projectId: "ws4rmf4j", 
   dataset: "production", 
   apiVersion: "2024-03-11",
   useCdn: false, 
})

const builder = imageUrlBuilder(client)

export const urlFor = (source: any) => {
  return builder.image(source);
}
