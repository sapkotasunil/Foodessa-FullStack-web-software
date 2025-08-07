"use client";
import { useAppSelector } from "@/lib/store/hooks";
import Link from "next/link";
import { useState } from "react";
import { BiHistory, BiHotel, BiRestaurant } from "react-icons/bi";
import { BsMenuApp } from "react-icons/bs";
import { GiKitchenTap } from "react-icons/gi";
import { HiBars3BottomRight } from "react-icons/hi2";
import { PiPhone } from "react-icons/pi";
import { RiShoppingBasketLine, RiUserLine } from "react-icons/ri";
import { TbHomeFilled } from "react-icons/tb";

export default function Navbar() {
  const [menuOpend, setmenuOpend] = useState(false);

  const { data } = useAppSelector((store) => store.cart);
  const cartItemLength = data.length;
  return (
    <>
      <div className="py-1"></div>
      <nav className="w-full    max-w-[1440px] px-6 lg:px-12 mx-auto sticky top-0  z-50 backdrop-blur-md  rounded-xl  flex justify-between items-center py-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-[24px] font-bold flex items-center gap-1"
        >
          <span className="inline-flex items-center justify-center p-2 h-8 w-8 bg-[#217041] text-white -rotate-[31deg] rounded-full">
            F
          </span>
          <span className="text-gray-800">oodessa</span>
        </Link>

        {/* Navigation Links */}
        <ul className="hidden lg:flex items-center gap-8 text-gray-800 font-semibold">
          <li className="">
            <Link
              href="/home/"
              className=" transition  flex gap-2 items-center hover:text-green-700"
            >
              <TbHomeFilled className=" text-2xl" />
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/menu/"
              className=" transition  flex gap-2 items-center hover:text-green-700"
            >
              <BsMenuApp className=" text-xl" />
              Menu
            </Link>
          </li>
          <li>
            <Link
              href="/kitchens/"
              className=" transition flex gap-2 items-center hover:text-green-700"
            >
              <BiRestaurant className="text-xl" />
              Kitchens
            </Link>
          </li>
          <li>
            <Link
              href="/history/"
              className=" transition flex gap-2 items-center hover:text-green-700"
            >
              <BiHistory className="text-xl" />
              History
            </Link>
          </li>
          <li>
            <Link
              href="/contact/"
              className=" transition flex gap-2 items-center hover:text-green-700"
            >
              <PiPhone className="text-xl" />
              Contact
            </Link>
          </li>
        </ul>

        {/* Placeholder for user (e.g. username or icon) */}
        <div className=" flex items-center justify-center gap-8  ">
          <HiBars3BottomRight className="  lg:hidden text-2xl hover:text-green-600" />
          <div className="relative ">
            <div className="absolute text-sm px-1.5 bg-green-600 rounded-2xl -top-2 -right-2">
              {cartItemLength}
            </div>
            <Link href={"/cart/"}>
              <RiShoppingBasketLine className="text-2xl hover:text-green-600" />
            </Link>
          </div>
          <div>
            <RiUserLine className="text-xl hover:text-green-600" />
          </div>
        </div>
      </nav>
    </>
  );
}
