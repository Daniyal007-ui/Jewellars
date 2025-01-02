import React from 'react'
import { FaArrowRightLong } from "react-icons/fa6";

const page = () => {
  return (
    <div className='flex flex-col gap-4 items-center justify-center h-screen text-center'>
        <p className='text-[#e57846] text-3xl font-bold'>SUCCESS</p>
        <h1 className='text-3xl sm:text-5xl font-bold text-gray-900'>Your order has been placed! 🎉</h1>
        <p className='text-gray-600'>Thank you for your purchase!</p>
        <a href='/' className='mt-10 flex items-center justify-center gap-2 bg-gray-600 hover:bg-black text-white px-3.5 py-2.5 rounded-md font-semibold'>
            Continue shopping <FaArrowRightLong />
        </a>
    </div>
  )
}

export default page