"use client";
import { useAppDispatch } from "@/lib/store/hooks";
import { getKitchenDetails } from "@/lib/store/seller/kitchenDetails/kitchenDetailsSlice";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

function Sidebar() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getKitchenDetails());
  }, []);

  const pathname = usePathname();

  const linkClasses = (path: string) =>
    pathname === path
      ? "group flex items-center px-2 py-2 text-base font-medium rounded-md bg-indigo-100 text-indigo-700"
      : "group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-200 hover:text-gray-900";

  const DashBoardSidebarMenu = [
    {
      name: "Dashboard",
      link: "/seller/dashboard",
      svg: (
        <svg
          className=" h-6 w-6 "
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
    },
    {
      name: " Orders",
      link: "/seller/dashboard/orders",
      svg: (
        <svg
          className=" h-6 w-6  group-hover:text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      name: "Menus",
      link: "/seller/dashboard/menus",
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-square-menu-icon lucide-square-menu"
        >
          <rect width="18" height="18" x="3" y="3" rx="2" />
          <path d="M7 8h10" />
          <path d="M7 12h10" />
          <path d="M7 16h10" />
        </svg>
      ),
    },
    {
      name: "History",
      link: "/seller/dashboard/history",
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-clipboard-clock-icon lucide-clipboard-clock"
        >
          <path d="M16 14v2.2l1.6 1" />
          <path d="M16 4h2a2 2 0 0 1 2 2v.832" />
          <path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h2" />
          <circle cx="16" cy="16" r="6" />
          <rect x="8" y="2" width="8" height="4" rx="1" />
        </svg>
      ),
    },

    {
      name: "Reports",
      link: "/seller/dashboard/reports",
      svg: (
        <svg
          className=" h-6 w-6  group-hover:text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
    },
  ];
  return (
    <nav className="mt-5 px-2 ">
      {DashBoardSidebarMenu.map((menu, idx) => (
        <Link
          key={idx}
          href={menu.link}
          className={`${linkClasses(menu.link)} flex gap-3 my-1`}
        >
          {menu.svg}
          {menu.name}
        </Link>
      ))}
    </nav>
  );
}

export default Sidebar;
