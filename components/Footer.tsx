import React from 'react'
import { FaLinkedin, FaGithub } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="text-black text-center mt-5 py-[30px] px-[10px] font-bold flex flex-col items-center gap-2 justify-center"
>
  <p className="">{new Date().getFullYear()} Prakh Jewelers. All right reserved.</p>
  <p className="flex gap-[10px] text-[20px]">
    <FaLinkedin size={25}/>
    <FaGithub size={25}/>
  </p>
</div>

  )
}

export default Footer