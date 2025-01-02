export default {
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    {
      name: "image",
      title: "Image",
      type: "array", // Field is an array of images
      of: [{ type: "image" }], // Images inside the array
    },
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "h4",
      title: "H4",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 90,
      },
    },
    {
      name: "price",
      title: "Price",
      type: "number",
    },
    {
      name: "details",
      title: "Details",
      type: "string",
    },
  ],

  // Add this "preview" block to show an image in the Studio
  preview: {
    select: {
      title: "name", // Name of the product
      media: "image.0.asset", // Correct reference to the first image asset in the array
    },
  },
};
