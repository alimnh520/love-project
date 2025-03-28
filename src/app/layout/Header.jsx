'use client'
import { FaHeartbeat } from "react-icons/fa";
import { GoSearch } from "react-icons/go";
import { LuUserRound } from "react-icons/lu";
import { IoIosArrowDown } from "react-icons/io";
import Link from 'next/link'
import React, { useState } from 'react'

const Header = () => {
    const [showMenu, setShowMenu] = useState(false);
    return (
        <div className='w-full h-auto flex items-center justify-between px-20 text-[#d31158] max-sm:w-full max-sm:flex-col max-sm:items-start max-sm:px-5 relative'>

            <div className="absolute right-5 top-3 w-20 h-9 hidden max-sm:flex items-center justify-between gap-x-2"  onClick={() => setShowMenu(!showMenu)}>
                <div className="text-4xl animate-pulse drop-shadow-[0_0_10px_rgba(255,0,0,1)] ">
                    <FaHeartbeat />
                </div>
                <div className="w-1/2 h-8 flex flex-col items-center justify-between">
                    <div className={`w-full h-1.5 drop-shadow-[0_0_10px_rgba(255,0,0,1)] bg-[#d31158]`}></div>
                    <div className={`w-full h-1.5 drop-shadow-[0_0_10px_rgba(255,0,0,1)] bg-[#d31158]`}></div>
                    <div className={`w-full h-1.5 drop-shadow-[0_0_10px_rgba(255,0,0,1)] bg-[#d31158]`}></div>
                </div>
            </div>

            <img src="/love-lettering-calligraphy-on-transparent-background-free-png.webp" alt="" className="h-20 max-sm:h-16 text" />

            <div className={`flex items-center justify-center gap-x-14 max-sm:flex-col max-sm:items-start max-sm:gap-x-0 max-sm:gap-y-3 overflow-hidden transition-all duration-300 ${showMenu ? 'max-sm:h-48' : 'max-sm:h-0'}`}>
                <ul className='flex items-center justify-center gap-x-5 font-semibold max-sm:flex-col max-sm:gap-x-0 max-sm:gap-y-3'>
                    <li>
                        <Link href='' className="flex items-center justify-center gap-x-0.5 group">Home <span className="mt-px group-hover:rotate-180 transition-all duration-300"><IoIosArrowDown /></span></Link>
                    </li>
                    <li>
                        <Link href='' className="flex items-center justify-center gap-x-0.5 group">About <span className="mt-px group-hover:rotate-180 transition-all duration-300"><IoIosArrowDown /></span></Link>
                    </li>
                    <li>
                        <Link href='' className="flex items-center justify-center gap-x-0.5 group">Photos <span className="mt-px group-hover:rotate-180 transition-all duration-300"><IoIosArrowDown /></span></Link>
                    </li>
                    <li>
                        <Link href='' className="flex items-center justify-center gap-x-0.5 group">Contact <span className="mt-px group-hover:rotate-180 transition-all duration-300"><IoIosArrowDown /></span></Link>
                    </li>
                </ul>

                <div className="flex items-center justify-center gap-x-2 self-center">
                    <Link href=''><LuUserRound /></Link>
                    <div className="w-px h-3.5 bg-[#d31158]"></div>
                    <Link href=''><GoSearch /></Link>
                </div>
            </div>
        </div>
    )
}

export default Header