"use client";

import React, { useState } from "react";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { AiFillStar, AiOutlineMinus, AiOutlinePlus, AiOutlineStar } from "react-icons/ai";
import Product from "@/components/Product";
import { useStateContext } from "../Context/StateContext";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";


interface Product {
  
_id:string
  image: SanityImageSource[]; 
  name: string;
  slug: { current: string };
  price: number;
  h4:string;
  details: string;
}
interface ProductDetailsClientProps {
  product: Product;
  products: Product[];
}

const ProductDetailsClient = ({ product, products }: ProductDetailsClientProps) => {
  const { image, name,h4, details,slug, price } = product;
  const [index, setIndex] = useState(0);

  // Correct object destructuring
  const { decQty, incQty, qty, onAdd } = useStateContext();

  return (
    <div>
      <div className="flex md:flex-row flex-col wrapper gap-[40px] m-[40px] mt-[60px] text-[#324d67]">
        {/* Product Image */}
        <Link href={`/product/${slug.current}`}>
        
        <div className="flex md:flex-col flex-row justify-center items-center gap-4" >
          <div className=" border-[2px] border-black rounded-[15px] md:w-[400px] w-[300px] md:h-[400px] h-[300px] cursor-pointer">
            {image && image[index] ? (
              <Image
                src={urlFor(image[index]).url()}
                alt={name}
                width={400}
                height={400}
                className="w-full h-full object-contain rounded-[15px]"
              />
            ) : (
              <p>No Image Available</p>
            )}
          </div>
          <div className="flex md:flex-row flex-col gap-[10px] md:mt-[20px]">
            {image?.map((item, i) => (
              <Image
                key={i}
                src={urlFor(item).url()}
                alt=""width={70}
                height={70}
                className={
                  i === index
                    ? "rounded-[8px] bg-[#ebebeb] w-[70px] h-[70px] cursor-pointer hover:border-[2px] hover:border-black"
                    : "rounded-[8px] bg-[#ebebeb] w-[70px] h-[70px] cursor-pointer"
                }
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>
        </Link>

        {/* Product Details */}
        <div className="flex flex-col">
          <h1 className="mt-[10px] text-black/80 font-bold text-[40px]">{name}</h1>
          <h4 className="mt-[2px] text-black text-[20px]">{h4}</h4>
          <div className="text-[#f02d34] mt-[10px] flex gap-[5px] items-center">
            <div className="flex gap-1">
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p className="text-[#324d67]">(20)</p>
          </div>
          <h4 className="font-bold text-black/80 text-xl mt-3">Details:</h4>
          <p className="mt-[10px]">{details}</p>
          <p className="text-[26px] font-bold mt-8 text-black">${price}</p>
          <div className="flex gap-[20px] mt-[10px] items-center">
            <div>
              <div>
              <div className="flex flex-col sm:flex-row items-center  justify-center gap-[30px]">
                <div className="flex items-center gap-4">
                  <h3 className="text-xl font-medium text-black/80 whitespace-nowrap">Quantity:</h3>
                  <div className="flex items-center border-[1.5px] border-black">
                    <span
                      onClick={decQty}
                      className="w-[40px] h-[40px] flex items-center justify-center text-[16px] cursor-pointer border-r-[1.5px] border-black text-[#f02d34]"
                    >
                      <AiOutlineMinus />
                    </span>
                    <span className="w-[50px] h-[40px] flex items-center justify-center text-black font-semibold text-[16px] text-center">
                      {qty}
                    </span>
                    <span
                      onClick={incQty}
                      className="w-[40px] h-[40px] flex items-center justify-center text-[16px] cursor-pointer border-l-[1.5px] border-black text-green-600"
                    >
                      <AiOutlinePlus />
                    </span>
                  </div>
                </div>
                  <button
                  type="button"
                    onClick={() => onAdd(product, qty)}
                    className=" px-[20px] py-[10px] border-[2px] border-black  text-[18px] font-medium text-black hover:text-white hover:bg-black rounded-[10px] bg-white w-[200px] cursor-pointer transition-transform duration-500 transform hover:scale-110"
                  >
                    Add to Cart
                  </button>
                 
              </div>
             

               
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-[120px]">
        <h2 className="text-center my-[50px] font-semibold text-black text-[30px]">
          You may also like
        </h2>
        <div className="relative marquee space-x-12 h-[400px]  overflow-x-hidden">
          <div className="absolute  will-change-transform  hover:paused animate-marquee w-[200%]">
            {products.map((product) => (
              <div className="product-card  inline-block" key={product._id}>
                <Product product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsClient;
