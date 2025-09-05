"use client";
import { useAppSelector } from "@/lib/store/hooks";
import Sidebar from "./Sidebar";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

function Dashboard({ children }: Readonly<{ children: React.ReactNode }>) {
  const { kitchenDetails } = useAppSelector((store) => store.kitchen);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleSwitchToSeller = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const router = useRouter();

  return (
    <div className="bg-gray-100 flex h-full min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md ">
        <div className="p-4 border-b">
          <div className="flex items-center">
            <Link href="/" className="text-[24px] font-bold flex items-center">
              <span className="inline-flex items-center justify-center p-2 h-8 w-8 bg-[#217041] text-white -rotate-[31deg] rounded-full">
                F
              </span>
              <span className="text-gray-800">oodessa</span>
            </Link>
          </div>
        </div>
        <Sidebar />
        <div className="mt-auto p-4 border-t relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                className="h-8 w-8 rounded-full"
                alt="User"
                src={
                  //@ts-ignore
                  kitchenDetails.kitchen_profile_photo_url
                    ? //@ts-ignore
                      typeof kitchenDetails.kitchen_profile_photo_url ===
                      "string"
                      ? //@ts-ignore
                        kitchenDetails.kitchen_profile_photo_url
                      : URL.createObjectURL(
                          //@ts-ignore
                          kitchenDetails.kitchen_profile_photo_url
                        )
                    : "/placeholder.png"
                }
              />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">
                  Welcome Admin
                </p>
                <p className="text-xs font-medium text-gray-500">
                  {kitchenDetails.kitchen_name}
                </p>
              </div>
            </div>

            {/* Dropdown trigger */}
            <button
              className="text-gray-500 cursor-pointer hover:text-gray-700 focus:outline-none"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-menu-icon lucide-menu"
              >
                <path d="M4 5h16" />
                <path d="M4 12h16" />
                <path d="M4 19h16" />
              </svg>
            </button>
          </div>

          {/* Dropdown menu */}
          {isDropdownOpen && (
            <div className="absolute right-4  mb-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
              <div className="px-4 bg-green-50 py-2 border-b border-gray-100">
                <p className="text-sm text-gray-700">Signed in as</p>
                <p className="text-sm font-medium  truncate text-green-600">
                  {kitchenDetails.kitchen_name}
                </p>
              </div>

              <button
                onClick={() =>
                  router.push(`/buyer/kitchens/${kitchenDetails.id}`)
                }
                className="block px-2 py-2 border-t text-sm text-start cursor-pointer text-gray-700 font-medium hover:bg-gray-100 w-full"
              >
                <i className="fas fa-user-circle mr-2 font-medium"></i>Your
                Profile
              </button>
              <Link
                href={"/seller/register/update"}
                className="block px-2 py-2 border-t text-sm text-gray-700 font-medium hover:bg-gray-100"
              >
                <i className="fas fa-cog mr-2"></i>Edit kitchen details
              </Link>

              <div className="border-t border-gray-100 my-1"></div>

              {/* Switch to Seller button */}
              <Link
                href={"/buyer/home"}
                className="w-full text-left text-gray-700 block px-2 py-2 text-sm hover:bg-gray-100 font-medium"
              >
                <i className="fas fa-store mr-2"></i>Switch to Seller
              </Link>

              <div className="border-t border-gray-100 my-1"></div>
            </div>
          )}
        </div>
      </aside>
      {/* Main Content */}
      {/* <main className="flex-1 p-6 bg-gray-100">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <div className="mt-4 bg-white rounded-lg shadow-md">
          <div className="">{children}</div>
        </div>
      </main> */}
      {children}
    </div>
  );
}

export default Dashboard;
