"use client";

import React, { useState } from "react";
import Image from "next/image";
import OrderDetailsModel from "./OrderDetailsModel";
import { IuserResponseDataForOrders } from "@/lib/store/orders/orders.types";

const OrderListCard = ({ item }: any) => {
  const [modelOpen, setModelOpen] = useState<boolean>(false);

  const openModel = () => {
    setModelOpen(true);
  };

  const closeModel = () => {
    setModelOpen(false);
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <>
      {modelOpen && (
        <OrderDetailsModel itemsData={item} closeModel={closeModel} />
      )}
      <div className="w-full bg-white shadow-md rounded-xl border border-gray-100 p-5 hover:shadow-lg transition-all duration-300">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Image */}
          <div className="md:col-span-1 flex justify-center">
            <Image
              src={
                item?.item_image &&
                item.item_image.replace("/media", "/api/v1/media")
              }
              alt={item?.item_name}
              width={70}
              height={70}
              className="rounded-lg object-cover shadow-sm border border-gray-200"
            />
          </div>

          {/* Item Details */}
          <div className="md:col-span-3">
            <p className="text-lg font-semibold text-gray-800 truncate">
              {item?.item_name}
            </p>
            <div className="flex items-center mt-1 space-x-3">
              <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-md">
                Qty: {item?.quantity || 1}
              </span>
              <span className="text-sm font-medium text-green-700 bg-green-50 px-2 py-1 rounded-md">
                {formatCurrency(
                  item?.totalPrice || parseFloat(item?.price || 0)
                )}
              </span>
            </div>
          </div>

          {/* Buyer Info */}
          <div className="md:col-span-3 space-y-1">
            <p className="text-sm text-gray-700 truncate">
              <span className="font-medium text-gray-600">Buyer:</span>
              <span className="ml-1">{item?.buyer_name}</span>
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-medium text-gray-600">Payment:</span>
              <span
                className={`ml-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                  item?.paymentStatus === "completed"
                    ? "bg-green-100 text-green-800"
                    : item?.paymentStatus === "pending"
                    ? "bg-amber-100 text-amber-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {item?.paymentStatus}
              </span>
            </p>
          </div>

          {/* Address & Phone */}
          <div className="md:col-span-3 space-y-1">
            <p className="text-sm text-gray-700 truncate">
              <span className="font-medium text-gray-600">Address:</span>
              <span className="ml-1">{item?.deliveryAddress}</span>
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-medium text-gray-600">Phone:</span>
              <span className="ml-1">{item?.phone_number}</span>
            </p>
          </div>

          {/* View Button */}
          <div className="md:col-span-2 flex justify-center md:justify-end">
            <button
              onClick={openModel}
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-white font-medium text-sm shadow-sm hover:shadow-md transition-all flex items-center"
            >
              <span>View Details</span>
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Status Bar */}
        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
          <div className="text-xs text-gray-500">
            Order ID: #{item?.id || "N/A"}
          </div>
          <div className="text-xs text-gray-500">
            {item?.created_at
              ? new Date(item?.created_at).toLocaleString()
              : "Date not available"}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderListCard;
