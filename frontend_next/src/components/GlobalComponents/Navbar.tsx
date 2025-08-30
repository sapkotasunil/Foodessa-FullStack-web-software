"use client";
import { setStatus, setUser } from "@/lib/store/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { Status } from "@/lib/types/types";
import Link from "next/link";
import { redirect, usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { BiRestaurant, BiSolidUserCircle } from "react-icons/bi";
import { BsMenuApp } from "react-icons/bs";
import { HiBars3BottomRight } from "react-icons/hi2";
import { MdOutlineFastfood } from "react-icons/md";
import { PiPhone } from "react-icons/pi";
import { RiShoppingBasketLine } from "react-icons/ri";
import { TbHomeFilled } from "react-icons/tb";

export default function Navbar() {
  const [menuOpend, setmenuOpend] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const Logged = localStorage.getItem("access");
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const pathname = usePathname();
  console.log(pathname);
  const LinkClasses = (path: string) =>
    pathname === path
      ? "transition  flex gap-2 items-center  text-green-700 border-b-4 py-0.5  border-green-600"
      : "transition  flex gap-2 items-center hover:text-green-700";

  const { data } = useAppSelector((store) => store.cart);
  const { user } = useAppSelector((store) => store.auth);
  const { profile_picture, email } = user;
  const dispatch = useAppDispatch();
  const statusClear = () => {
    dispatch(setStatus(Status.LOADING));
  };
  const cartItemLength = data.length;
  return (
    <>
      <div className="py-1  "></div>
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
              href="/buyer/home"
              className={`${LinkClasses("/buyer/home")}`}
            >
              <TbHomeFilled className=" text-2xl" />
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/buyer/menu"
              className={`${LinkClasses("/buyer/menu")}`}
            >
              <BsMenuApp className=" text-xl" />
              Menu
            </Link>
          </li>
          <li>
            <Link
              href="/buyer/orders"
              className={`${LinkClasses("/buyer/orders")}`}
            >
              <MdOutlineFastfood className="text-xl" />
              Orders
            </Link>
          </li>
          <li>
            <Link
              href="/buyer/kitchens"
              className={`${LinkClasses("/buyer/kitchens")}`}
            >
              <BiRestaurant className="text-xl" />
              Kitchens
            </Link>
          </li>
          <li>
            <Link
              href="/buyer/contact"
              className={`${LinkClasses("/buyer/contact")}`}
            >
              <PiPhone className="text-xl" />
              Contact
            </Link>
          </li>
        </ul>

        {/* Placeholder for user (e.g. username or icon) */}
        <div className=" flex items-center  justify-center gap-8  ">
          <HiBars3BottomRight className="  lg:hidden text-2xl hover:text-green-600" />
          <div className="relative ">
            <div className="absolute text-sm text-white px-1.5 bg-green-600 rounded-2xl -top-2 -right-2">
              {cartItemLength}
            </div>
            <Link href={"/buyer/cart/"}>
              <RiShoppingBasketLine className="text-2xl hover:text-green-600" />
            </Link>
          </div>
          <div className=" relative  rounded-full    hover:border-green-500  cursor-pointer  ">
            {Logged ? (
              <div>
                {/* Trigger */}
                {profile_picture ? (
                  <button
                    className="rounded-full border-2 border-gray-300 hover:border-green-500 bg-gray-200 cursor-pointer transition"
                    onClick={() => setOpen(!open)}
                  >
                    <img
                      src={profile_picture}
                      alt="Profile"
                      className="w-9 h-9 rounded-full object-cover"
                    />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      statusClear();
                      setOpen(!open);
                    }}
                    className="rounded-full border-2 border-gray-300 hover:border-green-500 bg-gray-200 cursor-pointer transition"
                  >
                    <BiSolidUserCircle
                      color="green"
                      className="text-4xl  p-0.5 hover:bg-green-200 bg-gray-200 rounded-full "
                    />
                  </button>
                )}
              </div>
            ) : (
              <Link href={"/buyer/auth/login"}>
                <BiSolidUserCircle
                  color="green"
                  className="text-4xl  p-0.5 hover:bg-green-200 bg-gray-200 rounded-full "
                />
              </Link>
            )}
            {/* Dropdown */}
            {open && (
              <div className="absolute right-0 mt-3 w-56 rounded-xl border border-gray-200 bg-white shadow-lg ring-1 ring-black/5 animate-fadeIn z-50">
                {/* Header */}
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-800">
                    {user?.first_name}
                  </p>
                  <p className="text-sm text-gray-500 truncate">{email}</p>
                </div>
                {/* Menu */}
                <div className="">
                  <button
                    onClick={() => {
                      setOpen(false);

                      router.push("/seller/register");
                    }}
                    className="w-full cursor-pointer text-left px-4 py-2 text-sm text-green-600 border-green-200 border-b-2 hover:bg-green-50"
                  >
                    Become a seller
                  </button>
                </div>
                <div className="">
                  <button
                    onClick={() => {
                      setOpen(false);
                      //@ts-ignore
                      localStorage.removeItem("access");
                      dispatch(
                        setUser({
                          address: "",
                          email: "",
                          first_name: "",
                          gender: "",
                          id: 0,
                          last_name: "",
                          phone_number: "",
                          profile_picture: null,
                        })
                      );
                      toast.success("Logout sucessfully....", {
                        style: {
                          border: "1px solid #ff4d4f ",
                          padding: "1px",
                          color: "black",
                        },
                      });

                      dispatch(setStatus(Status.LOADING));

                      router.push("/buyer/auth/login"); // navigate manually
                    }}
                    className="w-full rounded-b-2xl cursor-pointer text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
