"use client";
import { setStatus, setUser } from "@/lib/store/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { Status } from "@/lib/types/types";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { BiRestaurant, BiSolidUserCircle, BiX } from "react-icons/bi";
import { BsMenuApp } from "react-icons/bs";
import { HiBars3BottomRight } from "react-icons/hi2";
import { MdOutlineFastfood } from "react-icons/md";
import { PiPhone } from "react-icons/pi";
import { RiShoppingBasketLine } from "react-icons/ri";
import { TbHomeFilled } from "react-icons/tb";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const { data } = useAppSelector((store) => store.cart);
  const { user } = useAppSelector((store) => store.auth);
  const { profile_picture, email, role } = user;
  const dispatch = useAppDispatch();

  const Logged =
    typeof window !== "undefined" ? localStorage.getItem("access") : null;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const LinkClasses = (path: string) =>
    pathname.startsWith(path)
      ? "transition flex gap-2 items-center text-green-700 border-b-4 py-0.5 border-green-600"
      : "transition flex gap-2 items-center hover:text-green-700";

  const statusClear = () => {
    dispatch(setStatus(Status.LOADING));
  };

  const cartItemLength = data.length;

  const handleLogout = () => {
    setProfileOpen(false);
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
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
        role: "",
      })
    );
    toast.success("Logout successfully...", {
      style: {
        border: "1px solid #ff4d4f",
        padding: "1px",
        color: "black",
      },
    });
    dispatch(setStatus(Status.LOADING));
    router.push("/buyer/auth/login");
  };

  return (
    <>
      <div className="py-1"></div>
      <nav className="w-full max-w-[1440px] px-4 sm:px-6 lg:px-12 mx-auto sticky top-0 z-50 backdrop-blur-md rounded-xl flex justify-between items-center py-3 sm:py-4  ">
        {/* Logo */}
        <Link
          href="/buyer/home"
          className="text-xl sm:text-[24px] font-bold flex items-center gap-1 min-w-max"
        >
          <span className="inline-flex items-center justify-center p-2 h-7 w-7 sm:h-8 sm:w-8 bg-[#217041] text-white -rotate-[31deg] rounded-full">
            F
          </span>
          <span className="text-gray-800 hidden sm:inline">oodessa</span>
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="hidden lg:flex items-center gap-6 xl:gap-8 text-gray-800 font-semibold">
          <li>
            <Link href="/buyer/home" className={LinkClasses("/buyer/home")}>
              <TbHomeFilled className="text-xl sm:text-2xl" />
              <span className="hidden sm:inline">Home</span>
            </Link>
          </li>
          <li>
            <Link href="/buyer/menu" className={LinkClasses("/buyer/menu")}>
              <BsMenuApp className="text-lg sm:text-xl" />
              <span className="hidden sm:inline">Menu</span>
            </Link>
          </li>
          <li>
            <Link href="/buyer/orders" className={LinkClasses("/buyer/orders")}>
              <MdOutlineFastfood className="text-lg sm:text-xl" />
              <span className="hidden sm:inline">Orders</span>
            </Link>
          </li>
          <li>
            <Link
              href="/buyer/kitchens"
              className={LinkClasses("/buyer/kitchens")}
            >
              <BiRestaurant className="text-lg sm:text-xl" />
              <span className="hidden sm:inline">Kitchens</span>
            </Link>
          </li>
          <li>
            <Link
              href="/buyer/contact"
              className={LinkClasses("/buyer/contact")}
            >
              <PiPhone className="text-lg sm:text-xl" />
              <span className="hidden sm:inline">Contact</span>
            </Link>
          </li>
        </ul>

        {/* User Actions */}
        <div className="flex items-center justify-center gap-4 sm:gap-6">
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <HiBars3BottomRight className="text-2xl text-gray-700" />
          </button>
          {/* Cart Icon */}
          <div className="relative">
            <div className="absolute text-xs sm:text-sm text-white px-1.5 bg-green-600 rounded-2xl -top-2 -right-2 min-w-[18px] text-center">
              {cartItemLength}
            </div>
            <Link href="/buyer/cart/">
              <RiShoppingBasketLine className="text-xl sm:text-2xl text-gray-700 hover:text-green-600 transition-colors" />
            </Link>
          </div>

          {/* Profile Section */}
          <div className="relative" ref={profileRef}>
            {Logged ? (
              <>
                {profile_picture ? (
                  <button
                    className="rounded-full border-2 border-gray-300 hover:border-green-500 bg-gray-200 cursor-pointer transition w-8 h-8 sm:w-9 sm:h-9 overflow-hidden"
                    onClick={() => setProfileOpen(!profileOpen)}
                  >
                    <img
                      src={profile_picture}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      statusClear();
                      setProfileOpen(!profileOpen);
                    }}
                    className="rounded-full border-2 border-gray-300 hover:border-green-500 bg-gray-200 cursor-pointer transition"
                  >
                    <BiSolidUserCircle className="text-3xl sm:text-4xl p-0.5 text-green-600 hover:bg-green-200 rounded-full" />
                  </button>
                )}
              </>
            ) : (
              <Link href="/buyer/auth/login">
                <BiSolidUserCircle className="text-3xl sm:text-4xl p-0.5 text-green-600 hover:bg-green-200 bg-gray-200 rounded-full" />
              </Link>
            )}

            {/* Profile Dropdown */}
            {profileOpen && (
              <div className="absolute right-0 mt-3 w-48 sm:w-56 rounded-xl border border-gray-200 bg-white shadow-lg ring-1 ring-black/5 animate-fadeIn z-50">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {user?.first_name}
                  </p>
                  <p className="text-sm text-gray-500 truncate">{email}</p>
                </div>
                <div className="border-b border-gray-100">
                  {role && role === "seller" ? (
                    <a
                      href="/seller/dashboard"
                      onClick={() => {
                        setProfileOpen(false);
                      }}
                      className="w-full cursor-pointer inline-block text-left px-4 py-3 text-sm text-green-600 hover:bg-green-50 transition-colors"
                    >
                      Switch to seller
                    </a>
                  ) : (
                    <button
                      onClick={() => {
                        setProfileOpen(false);
                        router.push(
                          role === "afs"
                            ? "/seller/register/applied"
                            : "/seller/register/"
                        );
                      }}
                      className="w-full cursor-pointer text-left px-4 py-3 text-sm text-green-600 hover:bg-green-50 transition-colors"
                    >
                      Become a seller
                    </button>
                  )}
                </div>
                <div>
                  <button
                    onClick={handleLogout}
                    className="w-full cursor-pointer text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors rounded-b-xl"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {menuOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 lg:hidden">
            <div
              ref={menuRef}
              className="fixed right-0 z-50 top-0 h-screen w-80 max-w-full bg-green-200 shadow-xl animate-slideIn"
            >
              {/* Header */}
              <div className="flex items-center  justify-between p-6 border-b border-gray-200">
                <Link
                  href="/buyer/home"
                  className="text-xl font-bold flex items-center gap-1"
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="inline-flex items-center justify-center p-2 h-8 w-8 bg-[#217041] text-white -rotate-[31deg] rounded-full">
                    F
                  </span>
                  <span className="text-gray-800">oodessa</span>
                </Link>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-2 rounded-md hover:bg-gray-100 transition-colors"
                  aria-label="Close menu"
                >
                  <BiX className="text-2xl" />
                </button>
              </div>

              {/* Mobile Navigation Links */}
              <div className="p-6 bg-green-200">
                <ul className="space-y-4">
                  <li>
                    <Link
                      href="/buyer/home"
                      className={`${LinkClasses(
                        "/buyer/home"
                      )} text-lg py-3 block`}
                      onClick={() => setMenuOpen(false)}
                    >
                      <TbHomeFilled className="inline text-xl mr-3" />
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/buyer/menu"
                      className={`${LinkClasses(
                        "/buyer/menu"
                      )} text-lg py-3 block`}
                      onClick={() => setMenuOpen(false)}
                    >
                      <BsMenuApp className="inline text-xl mr-3" />
                      Menu
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/buyer/orders"
                      className={`${LinkClasses(
                        "/buyer/orders"
                      )} text-lg py-3 block`}
                      onClick={() => setMenuOpen(false)}
                    >
                      <MdOutlineFastfood className="inline text-xl mr-3" />
                      Orders
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/buyer/kitchens"
                      className={`${LinkClasses(
                        "/buyer/kitchens"
                      )} text-lg py-3 block`}
                      onClick={() => setMenuOpen(false)}
                    >
                      <BiRestaurant className="inline text-xl mr-3" />
                      Kitchens
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/buyer/contact"
                      className={`${LinkClasses(
                        "/buyer/contact"
                      )} text-lg py-3 block`}
                      onClick={() => setMenuOpen(false)}
                    >
                      <PiPhone className="inline text-xl mr-3" />
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
