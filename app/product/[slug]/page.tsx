import ProductDetailsClient from "@/components/ProductDetails";
import { client } from "@/sanity/lib/client";

export interface ProductDetailsProps {
  params: Promise<{
    slug: string; // The dynamic route parameter
  }>;
}

const ProductDetails = async ({ params }: ProductDetailsProps) => {
  // Since params are expected to be a Promise, we can resolve it here
  const { slug } = await params;

  // Sanity query to fetch a single product by slug
  const productQuery = `*[_type == "product" && slug.current == $slug][0]`;

  // Query to fetch related products (customize this as needed)
  const relatedProductsQuery = `*[_type == "product"][0..5]`;

  try {
    // Fetch the single product based on the slug
    const product = await client.fetch(productQuery, { slug });

    // Fetch related products
    const products = await client.fetch(relatedProductsQuery);

    // Handle the case where no product is found
    if (!product) {
      return (
        <div className="text-center mt-10">
          <h1 className="text-2xl font-bold">Product Not Found</h1>
          <p className="text-gray-600">We couldn&#39;t find the product you&#39;re looking for.</p>
        </div>
      );
    }

    // Pass the fetched data to the client component
    return <ProductDetailsClient product={product} products={products} />;
  } catch (error) {
    // Handle errors gracefully
    console.error("Error fetching product details:", error);

    return (
      <div className="text-center mt-10">
        <h1 className="text-2xl font-bold">Error</h1>
        <p className="text-gray-600">Something went wrong while loading the product details. Please try again later.</p>
      </div>
    );
  }
};

export default ProductDetails;
