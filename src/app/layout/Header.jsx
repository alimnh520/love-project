import { GoSearch } from "react-icons/go";
import { LuUserRound } from "react-icons/lu";
import { IoIosArrowDown } from "react-icons/io";
import Link from 'next/link'
import React from 'react'

const Header = () => {
    return (
        <div className='w-full h-auto flex items-center justify-between px-20 text-[#d31158] max-sm:w-full max-sm:flex-col max-sm:items-start max-sm:px-5 relative'>

            <div className="absolute right-5 top-3 w-16 h-8 bg-red-500 hidden max-sm:block"></div>

            <img src="/love-lettering-calligraphy-on-transparent-background-free-png.webp" alt="" className="h-20 max-sm:h-16" />

            <div className="flex items-center justify-center gap-x-14 max-sm:flex-col max-sm:items-start max-sm:gap-x-0 max-sm:gap-y-3">
                <ul className='flex items-center justify-center gap-x-5 font-semibold text-[14px] max-sm:flex-col max-sm:gap-x-0 max-sm:gap-y-3'>
                    <li>
                        <Link href='' className="flex items-center justify-center gap-x-0.5 group">Home <span className="mt-px text-[12px] group-hover:rotate-180 transition-all duration-300"><IoIosArrowDown /></span></Link>
                    </li>
                    <li>
                        <Link href='' className="flex items-center justify-center gap-x-0.5 group">About <span className="mt-px text-[12px] group-hover:rotate-180 transition-all duration-300"><IoIosArrowDown /></span></Link>
                    </li>
                    <li>
                        <Link href='' className="flex items-center justify-center gap-x-0.5 group">Photos <span className="mt-px text-[12px] group-hover:rotate-180 transition-all duration-300"><IoIosArrowDown /></span></Link>
                    </li>
                    <li>
                        <Link href='' className="flex items-center justify-center gap-x-0.5 group">Contact <span className="mt-px text-[12px] group-hover:rotate-180 transition-all duration-300"><IoIosArrowDown /></span></Link>
                    </li>
                </ul>

                <div className="flex items-center justify-center gap-x-2">
                    <Link href=''><LuUserRound /></Link>
                    <div className="w-px h-3.5 bg-[#d31158]"></div>
                    <Link href=''><GoSearch /></Link>
                </div>
            </div>
        </div>
    )
}

export default Header