"use client";
import { setStatus } from "@/lib/store/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { Status } from "@/lib/types/types";
import Link from "next/link";
import { useState } from "react";
import { BiHistory, BiHotel, BiRestaurant } from "react-icons/bi";
import { BsMenuApp } from "react-icons/bs";
import { GiFoodChain } from "react-icons/gi";
import { HiBars3BottomRight } from "react-icons/hi2";
import { MdOutlineFastfood } from "react-icons/md";
import { PiPhone } from "react-icons/pi";
import { RiShoppingBasketLine, RiUserLine } from "react-icons/ri";
import { TbHomeFilled } from "react-icons/tb";

export default function Navbar() {
  const [menuOpend, setmenuOpend] = useState(false);

  const { data } = useAppSelector((store) => store.cart);
  const { user } = useAppSelector((store) => store.auth);
  const { profile_picture } = user;
  const dispatch = useAppDispatch();
  const statusClear = () => {
    dispatch(setStatus(Status.LOADING));
  };
  const cartItemLength = data.length;
  return (
    <>
      <div className="py-1"></div>
      <nav className="w-full    max-w-[1440px] px-6 lg:px-12 mx-auto sticky top-0  z-50 backdrop-blur-md  rounded-xl  flex justify-between items-center py-4">
        {/* Logo */}
        <Link
          href="/buyer/home"
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
              href="/buyer/home/"
              className=" transition  flex gap-2 items-center hover:text-green-700"
            >
              <TbHomeFilled className=" text-2xl" />
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/buyer/menu/"
              className=" transition  flex gap-2 items-center hover:text-green-700"
            >
              <BsMenuApp className=" text-xl" />
              Menu
            </Link>
          </li>
          <li>
            <Link
              href="/buyer/kitchens/"
              className=" transition flex gap-2 items-center hover:text-green-700"
            >
              <BiRestaurant className="text-xl" />
              Kitchens
            </Link>
          </li>
          <li>
            <Link
              href="/buyer/orders/"
              className=" transition flex gap-2 items-center hover:text-green-700"
            >
              <MdOutlineFastfood className="text-xl" />
              Orders
            </Link>
          </li>
          <li>
            <Link
              href="/buyer/contact/"
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
            <div className="absolute text-sm text-white px-1.5 bg-green-600 rounded-2xl -top-2 -right-2">
              {cartItemLength}
            </div>
            <Link href={"/buyer/cart/"}>
              <RiShoppingBasketLine className="text-2xl hover:text-green-600" />
            </Link>
          </div>
          {profile_picture ? (
            <Link
              href={"/buyer/auth/login/"}
              className=" rounded-full border-2 border-gray-600 bg-gray-300"
            >
              <img
                src={profile_picture}
                alt="Profile"
                className="w-7 h-7 rounded-full object-cover"
              />
            </Link>
          ) : (
            <Link
              href={"/buyer/auth/login/"}
              className="p-1 rounded-2xl border-2 border-gray-600 bg-gray-300"
              onClick={statusClear}
            >
              <RiUserLine className="text-xl hover:text-green-600" />
            </Link>
          )}
        </div>
      </nav>
    </>
  );
}
