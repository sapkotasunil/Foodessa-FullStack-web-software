"use client";
import { useAppSelector } from "@/lib/store/hooks";
import Sidebar from "./Sidebar";
import Link from "next/link";

function Dashboard({ children }: Readonly<{ children: React.ReactNode }>) {
  const { kitchenDetails } = useAppSelector((store) => store.kitchen);
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
        <div className="mt-auto p-4 border-t">
          <div className="flex items-center">
            <img
              className="h-8 w-8 rounded-full"
              alt="User"
              src={
                //@ts-ignore
                kitchenDetails.kitchen_profile_photo_url
                  ? //@ts-ignore
                    typeof kitchenDetails.kitchen_profile_photo_url === "string"
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
              <p className="text-sm font-medium text-gray-700">Welcome Admin</p>
              <p className="text-xs font-medium text-gray-500">
                {kitchenDetails.kitchen_name}
              </p>
            </div>
          </div>
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
