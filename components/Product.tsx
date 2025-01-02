"use client"
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { useStateContext } from "../Context/StateContext";
import product from "@/sanity/schemaTypes/product";
import { MdOutlineShoppingCart } from "react-icons/md";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
// Define the types for the product
interface ProductProps {
  product:{ 
    _id:string;
    image: SanityImageSource[]; 
    name: string;
    slug: { current: string };
    price: number;
    h4:string;
    details: string;}
}

const Product: React.FC<ProductProps> = ({ product: { image, name, slug, price } }) => {
  // Ensure you're getting a valid URL for the image
  const imageUrl = image && image.length > 0 ? urlFor(image[0]).url() : '/default-image.png';

  // Correct object destructuring
  
  const {  qty, onAdd } = useStateContext();
  return (
    <div className="wrapper cursor-pointer ">
      {/* Link should wrap the entire product */}
      <Link href={`/product/${slug.current}`}>
        <div className="transform scale-x-100 mb-[70px]   scale-y-100 transition-transform hover:scale-[1.1] duration-500 ease-linear text-[#324d67]">
          {/* Product Image */}
          <div className="rounded-[15px]  relative group  bg-[#d4abab] border-[2px] border-black overflow-hidden">
  {/* Product Image */}
  <Image
    src={imageUrl}
    width={250}
    height={250}
    alt={name}
    className="transition-transform duration-500  ease-linear group-hover:scale-110"
  />

  {/* Button */}
  <button
    type="button"
    onClick={() => onAdd(product, qty)}
    className="absolute top-4  left-10 transform -translate-x-1/2 z-10  text-[18px] font-medium text-black rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-500 hover:scale-110"
  >
    <MdOutlineShoppingCart className="inline-block mr-2" size={30} />
    
  </button>
</div>

          {/* Product Name */}
          <h2 className="text-left mt-4 text-black/80 font-semibold text-xl">{name}</h2>
          {/* Product Price */}
          <p className="text-left mt-2 text-xl text-black font-extrabold">${price}</p>
        </div>
      </Link>
    </div>
  );
};

export default Product;
