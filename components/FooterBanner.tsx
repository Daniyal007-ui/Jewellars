
"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";


type FooterBannerProps = {
  bannerData: {
    smallText: string;
    midText: string;
    largeText1: string;
    largeText2: string;
    buttonText: string;
    image:string
    saleTime: string;
    desc: string;
    productId: string;
    discount:string;
  }; 
};

export default function FooterBanner({ bannerData }: FooterBannerProps) {
  return (
    <main className="bg-black rounded-[20px]">
 <div className="wrapper p-[70px_40px] bg-black rounded-[15px] relative md:h-[400px] h-auto leading-[1] text-white w-full mt-[120px]">
  <div className="flex justify-start  ">
    {/* left */}
    <div className="flex flex-col md:mb-0 mb-28 md:mt-0 mt-40">
    <h3 className="block md:hidden font-bold text-4xl sm:text-5xl w-max   mb-[25px] ">{bannerData.midText}</h3>
      <p className="text-[18px] ">{bannerData.smallText}</p>
      <h3 className="font-bold tracking-widest my-8 uppercase text-[50px] md:text-[80px]">{bannerData.largeText1}</h3>
       {/* Button with Link */}
     <Link href={`/product/${bannerData.productId}`}>
           <button
              type="button"
              className=" rounded-lg px-6 py-3 bg-white hover:bg-gray-600 text-black mt-8 md:mt-3 text-sm md:text-lg font-medium cursor-pointer"
            >
              {bannerData.buttonText}
            </button>
          </Link>
     
     
     
    </div>
    {/* right */}
   
    <div className="absolute bottom-4  left-4 lg:right-4  p-4 rounded-lg text-gray-300 w-[80%] lg:w-[300px]">
        <h5 className="font-bold text-lg mb-2">Description</h5>
        <p className="text-sm">{bannerData.desc}</p>
      </div>

    {/* image */}
    <div className="flex justify-end items-end">
    <Image src={urlFor(bannerData.image).url()}
    alt=""
    width={350}
    height={350}
    className="absolute md:w-[350px] w-[200px] md:h-auto h-[250px] md:top-[-25%] top-[-15%] md:right-20  hover:border-[2px] hover:border-white rounded-[20px]" 
    />
  </div>
 
    
    </div>
      <h3 className="md:block hidden font-bold md:text-[55px] text-5xl w-max tracking-wider md:ml-[300px]  md:mt-[70px] ">{bannerData.midText}</h3>
 </div>
 </main>
  );
}
