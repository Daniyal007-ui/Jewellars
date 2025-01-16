"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";

type HeroBannerProps = {
  bannerData: {
    smallText: string;
    midText: string;
    largeText1: string;
    largeText2: string;
    buttonText: string;
    image: string;
    desc: string;
    productId: string;
  };
};

export default function HeroBanner({ bannerData }: HeroBannerProps) {
  return (<main className="bg-black rounded-[20px]">
 
    <div className="wrapper px-4 py-10 bg-black rounded-lg mb-10 relative z-10 h-auto md:h-[800px] w-full">
      <div className="relative flex flex-col lg:flex-row items-center lg:items-start lg:justify-between h-full">
        {/* Text Content */}
        <div className="z-20 text-center lg:text-left lg:w-1/2 md:space-y-4 space-y-8 p-4">
          {/* Small Text */}
          <p className="text-xl md:text-2xl text-gray-400 mb-4">{bannerData.smallText}</p>

          {/* Mid Text */}
          <h3 className="text-5xl md:text-6xl tracking-wide text-white font-bold mb-4">{bannerData.midText}</h3>

          {/* Large Text */}
          <h1 className="text-5xl md:text-8xl font-extrabold tracking-wider text-gray-400 text-opacity-70 uppercase leading-tight">
            {bannerData.largeText1}
          </h1>
          <h1 className="text-5xl md:text-8xl font-extrabold tracking-wider text-gray-400 text-opacity-70 uppercase leading-tight">
            {bannerData.largeText2}
          </h1>

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

        {/* Image */}
        <div className="relative lg:w-1/2 w-full ">
          <Image
            src={urlFor(bannerData.image).url()}
            alt="Banner Product"
            width={600}
            height={600}
            className=" md:h-full object-center rounded-lg"
          />
        </div>
      </div>

      {/* Description */}
      <div className="absolute bottom-4 left-4 lg:right-4  p-4 rounded-lg text-gray-300 w-[90%] lg:w-[300px]">
        <h5 className="font-bold text-lg mb-2">Description</h5>
        <p className="text-sm">{bannerData.desc}</p>
      </div>
    </div>
    </main>
  );
}
