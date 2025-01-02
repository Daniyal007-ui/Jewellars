"use client"
import React from 'react'
import Link from 'next/link'
import Image from 'next/image';
import { MdOutlineShoppingCart } from "react-icons/md";

import { useStateContext } from "../Context/StateContext";
import Cart from './Cart';


const Navbar = () => {
  const {showCart, setShowCart, totalQuantities} = useStateContext();

  return (
    <div className="wrapper flex justify-between items-center">

        <Link href="/">
        {/* Logo Container */}
    <Image src="/logo.png" alt='logo' width={100} height={100} />
        </Link>
    <div className=' mx-[10px] my-[16px] relative'>
     <button 
  type="button" 
  onClick={() => setShowCart(true)} 
  className="text-[35px] text-black cursor-pointer relative transition-transform duration-400 transform hover:scale-110 ease-in-out border-0 bg-transparent"
>
  <MdOutlineShoppingCart />
  <span className="absolute right-[-6px] top-[-6px] text-[10px] text-[#eee] bg-black w-[15px] h-[15px] rounded-full text-center font-semibold">
    {totalQuantities}
  </span>
</button>
{showCart && <Cart/>}
    </div>
  </div>
  )
}

export default Navbar