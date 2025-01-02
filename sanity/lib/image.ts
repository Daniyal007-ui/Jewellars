import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

const client = createClient({
  projectId: "7hjwg7jg", // Replace this with the valid projectId
  dataset: "production",
  apiVersion: "2023-10-01", // Use the latest API version
  useCdn: true,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source: SanityImageSource) => builder.image(source);
