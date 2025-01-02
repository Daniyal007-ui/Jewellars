"use client";

import React, { useRef} from "react";
import Link from "next/link";
import Image from "next/image";
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import { useStateContext } from "../Context/StateContext";
import { urlFor } from "@/sanity/lib/image";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";



interface CartItem {
  _id: string;
  image: SanityImageSource[]; // Adjust this if the image structure differs
  name: string;
  price: number;
  quantity: number;
}
const Cart = () => {
  const cartRef = useRef<HTMLDivElement>(null);
  const { showCart, setShowCart, cartItems, totalQuantities, totalPrice, toggleCartItemQuantity, onRemove } = useStateContext();

 


  // Handle Stripe checkout with shipping
  const handleCheckout = async () => {
    try {
        const response = await fetch('/api/checkout',{
          method:'POST',
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({products:cartItems}),
        });
        const data = await response.json();
        if(data.url){
          window.location.href = data.url
        }
    } catch (error) {
      console.error("Error during checkout", error)
    }




  }

  
  

  return (
    <div
      className={`w-screen h-screen bg-black bg-opacity-50 fixed top-0 right-0 z-50 overflow-hidden transition-transform duration-1000 ${
        showCart ? "transform translate-x-0" : "transform translate-x-full"
      }`}
      ref={cartRef}
    >
      <div className="h-full w-full md:w-3/5 max-w-full bg-white float-right p-6 md:p-10 relative shadow-lg">
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setShowCart(false)}
          className="flex items-center text-lg font-medium cursor-pointer gap-2 ml-2"
        >
          <AiOutlineLeft />
          <span className="ml-2">Your Cart</span>
          <span className="ml-2 text-red-500">({totalQuantities} items)</span>
        </button>

        {/* Cart Items */}
        {cartItems.length < 1 ? (
          <div className="text-center m-10">
            <AiOutlineShopping size={150} className="m-auto" />
            <h3 className="font-semibold text-xl mt-4">Your shopping bag is empty!</h3>
            <Link href="/">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="w-full max-w-[400px] py-2.5 px-3 rounded-lg text-lg mt-8 uppercase hover:bg-transparent hover:text-black bg-black text-white border-[1px] border-black cursor-pointer transition-transform hover:scale-110"
              >
                Continue shopping
              </button>
            </Link>
          </div>
        ) : (
          <div className="mt-4 overflow-auto max-h-[65vh] py-4 px-2">
            {cartItems.map((item:CartItem) => (
              <div className="flex gap-4 p-4" key={item._id}>
                <Image
                  src={item?.image?.[0] ? urlFor(item.image[0]).url() : "/fallback-image.jpg"}
                  alt={ "Product Image"}
                  width={120}
                  height={120}
                  className="md:w-[120px] w-[70px] md:h-[120px] h-[70px] border-[1px] hover:border-black rounded-lg bg-gray-200"
                />
                <div className="flex flex-col justify-between w-full">
                  <div className="flex justify-between text-gray-800">
                    <h5 className="text-xl font-bold">{item.name}</h5>
                    <h4 className="text-lg font-semibold">${item.price}</h4>
                  </div>
                  <div className="flex items-center justify-between ">
                    <div className="flex items-center border border-gray-400">
                      <span
                        onClick={() => toggleCartItemQuantity(item._id, "dec")}
                        className="w-10 h-10 flex items-center justify-center text-lg cursor-pointer border-r border-gray-400 text-red-500"
                      >
                        <AiOutlineMinus />
                      </span>
                      <span className="w-12 h-10 flex items-center justify-center text-lg text-center">
                        {item.quantity}
                      </span>
                      <span
                        onClick={() => toggleCartItemQuantity(item._id, "inc")}
                        className="w-10 h-10 flex items-center justify-center text-lg cursor-pointer border-l border-gray-400 text-green-500"
                      >
                        <AiOutlinePlus />
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => onRemove(item)}
                      className="text-2xl text-red-500 cursor-pointer bg-transparent border-none"
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

       

        {/* Subtotal and Checkout */}
        {cartItems.length >= 1 && (
          <div className="absolute bottom-[12px] text-2xl font-semibold right-2 w-full p-[30px_65px]">
            <div className="flex justify-between">
              <h3>Subtotal:</h3>
              <h3>${totalPrice}</h3>
            </div>
          
            <button
              type="button"
              onClick={handleCheckout}
              className="w-full py-3 px-4 rounded-lg border-[1px] border-black text-lg mt-6 uppercase bg-transparent text-black hover:bg-black hover:text-white cursor-pointer transition-transform hover:scale-105"
            >
              Pay with Stripe
            </button>
         
            </div>
        )}
      </div>
    </div>
  
  );
};

export default Cart;
