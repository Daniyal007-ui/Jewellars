import FooterBanner from "@/components/FooterBanner";
import HeroBanner from "@/components/HeroBanner";


import Product from "@/components/Product";
import { client } from "@/sanity/lib/client";


// Define the type for the product object
interface ProductType {
  _id: string;
  image: string[];
  slug: { current: string };
  price: number;
  h4:string;
  name: string;
  details: string;
}

export default async function Home() {
  // GROQ queries for fetching banner and product data
  const bannerQuery = `*[_type == "banner"]{ 
    smallText, 
    midText,
    largeText1, 
    largeText2, 
    buttonText, 
    image, 
    desc, 
    saleTime,
    discount,
    "productId": product._id 
  }`;
  const footerQuery = `*[_type == "footer"]{ 
    smallText, 
    midText,
    largeText1, 
     
    buttonText, 
    image, 
    desc, 
    saleTime,
    discount,
    "productId": product._id 
  }`;
  const productQuery = `*[_type == "product"]{
    _id,    // Include the unique ID for use in the "key" prop
    image,
    slug,
    price,
    name,
    details
  }`;

  // Fetch both products and banner data concurrently
  const [products, bannerData, footer] = await Promise.all([
    client.fetch(productQuery),
    client.fetch(bannerQuery),
    client.fetch(footerQuery),
  ]);

  return (
    <main className="">
     
      {/* Hero Banner */}
      <HeroBanner bannerData={bannerData[0]} />

      {/* Content */}
      <div className="text-center mx-[40px] my-[80px] text-black">
        <h2 className="text-[40px] font-bold mt-10 ">Eternity Collection </h2>
        <p className="text-[16px] font-extralight">A continuous band of diamonds Signifying eternal love</p>
      </div>

      {/* Product Details */}
      <div className="flex flex-wrap justify-center gap-[15px] mt-[20px] w-full">
        {products.map((product:ProductType) => (
          <div className="product-card" key={product._id}>
            <Product product={product} />
          </div>
        ))}
      </div>

      {/* Footer */}
      <FooterBanner bannerData={footer[0]} />
     
    </main>
  );
}
