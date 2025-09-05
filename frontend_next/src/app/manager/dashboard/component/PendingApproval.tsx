"use client";

import APIWITHTOKEN from "@/lib/http/APIWITHTOKEN";
import { updateUser } from "@/lib/store/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

function PendingApproval({ seller, formatDate, type }: any) {
  const [types, settypes] = useState(type);
  const handleAccept = async () => {
    try {
      const response = await APIWITHTOKEN.patch(`/user/${seller.user_id}/`, {
        role: "seller",
      });
      if (response.status === 200) {
        toast.success("Seller Approved Sucessfully ");
        settypes("seller");
      } else {
        alert("something wrong right now! please wait");
      }
    } catch (error: any) {
      alert("connection failed");
    }
  };

  const router = useRouter();

  return (
    <>
      <div className="">
        <div
          key={seller.id}
          className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200"
        >
          <div className="relative h-48 overflow-hidden">
            <img
              src={seller.kitchen_profile_photo_url}
              alt={seller.kitchen_name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800                      "pending"
                    `}
              >
                {types === "pending" ? "Pending Approval" : "Accepted kitchen"}
              </span>
            </div>
          </div>

          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {seller.kitchen_name}
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              {seller.kitchen_description}
            </p>

            <div className="space-y-2 text-sm mb-6">
              <div className="flex items-center text-gray-600">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>{seller.kitchen_address}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span>{seller.phone_number}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>Registered: {formatDate(seller.created_at)}</span>
              </div>
            </div>

            <div className="flex space-x-3">
              {types === "pending" && (
                <>
                  <button
                    onClick={handleAccept}
                    className="flex-1 bg-green-600 cursor-pointer hover:bg-green-700 disabled:bg-green-400 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Approve
                  </button>
                </>
              )}
              <button
                onClick={() => router.push(`/buyer/kitchens/${seller.id}`)}
                className="flex-1 border cursor-pointer border-blue-600 text-blue-600 hover:bg-blue-100 disabled:opacity-50 py-2 px-4 rounded-lg font-medium transition-colors"
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PendingApproval;
