"use client";

import Image from "next/image";
import { useState } from "react";
import OrderDetailsModel from "../../orders/components/OrderDetailsModel";

function HistoryItemCard({ item }: any) {
  const [modelOpen, setModelOpen] = useState(false);

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

  // Format date
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return (
      date.toLocaleDateString() +
      " " +
      date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  };

  // Get status colors and text
  const getStatusInfo = () => {
    switch (item?.orderStatus) {
      case "SUCESS":
        return {
          bgColor: "bg-green-50",
          borderColor: "border-green-300",
          statusColor: "bg-green-100 text-green-800",
          statusText: "SUCCESS",
          icon: (
            <svg
              className="w-5 h-5 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ),
        };
      case "UNSUCESS":
        return {
          bgColor: "bg-red-50",
          borderColor: "border-red-300",
          statusColor: "bg-red-100 text-red-800",
          statusText: "FAILED",
          icon: (
            <svg
              className="w-5 h-5 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ),
        };
      case "CANCEL":
        return {
          bgColor: "bg-amber-50",
          borderColor: "border-amber-300",
          statusColor: "bg-amber-100 text-amber-800",
          statusText: "DECLINED",
          icon: (
            <svg
              className="w-5 h-5 text-amber-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ),
        };
      default:
        return {
          bgColor: "bg-gray-50",
          borderColor: "border-gray-300",
          statusColor: "bg-gray-100 text-gray-800",
          statusText: item?.orderStatus || "UNKNOWN",
          icon: (
            <svg
              className="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ),
        };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <>
      {modelOpen && (
        <OrderDetailsModel itemsData={item} closeModel={closeModel} />
      )}
      <div
        className={`w-full rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-5 border ${statusInfo.borderColor} ${statusInfo.bgColor}`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-4 items-center">
          {/* Image */}
          <div className="lg:col-span-1 flex justify-center">
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
          <div className="lg:col-span-2">
            <p className="text-lg font-semibold text-gray-800 truncate">
              {item?.item_name}
            </p>
            <div className="flex items-center mt-1 space-x-2">
              <span className="text-sm text-gray-600 bg-gray-100 px-2 py-0.5 rounded-md">
                Qty: {item?.quantity || 1}
              </span>
              <span className="text-sm font-medium text-green-700 bg-green-50 px-2 py-0.5 rounded-md">
                {formatCurrency(
                  item?.totalPrice ||
                    parseFloat(item?.price || 0) * (item?.quantity || 1)
                )}
              </span>
            </div>
          </div>

          {/* Buyer Info */}
          <div className="lg:col-span-2">
            <div className="text-sm text-gray-700">
              <span className="font-medium text-gray-600">Buyer:</span>
              <span className="ml-1">{item?.buyer_name}</span>
            </div>
            <div className="mt-1 text-sm text-gray-600">
              <span className="font-medium text-gray-600">Phone:</span>
              <span className="ml-1">{item?.phone_number}</span>
            </div>
          </div>

          {/* Payment Info */}
          <div className="lg:col-span-2">
            <div className="text-sm text-gray-700">
              <span className="font-medium text-gray-600">Payment:</span>
              <span
                className={`ml-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                  item?.paymentStatus === "completed"
                    ? "bg-green-100 text-green-800"
                    : item?.paymentStatus === "pending"
                    ? "bg-amber-100 text-amber-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {item?.paymentStatus}
              </span>
            </div>
            <div className="mt-1 text-sm text-gray-600 line-clamp-1">
              <span className="font-medium text-gray-600">Address:</span>
              <span className="ml-1">{item?.deliveryAddress}</span>
            </div>
          </div>

          {/* Status */}
          <div className="lg:col-span-2">
            <div className="flex items-center">
              {statusInfo.icon}
              <span
                className={`ml-2 px-3 py-1 rounded-full text-sm font-medium ${statusInfo.statusColor}`}
              >
                {statusInfo.statusText}
              </span>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              Updated: {formatDate(item?.Status_updated_at)}
            </div>
          </div>

          {/* View Button */}
          <div className="lg:col-span-1 flex justify-center">
            <button
              onClick={openModel}
              className="bg-green-600 cursor-pointer hover:bg-green-700 px-4 py-2 rounded-lg text-white font-medium text-sm shadow-sm hover:shadow-md transition-all flex items-center"
            >
              <span>View</span>
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
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

        {/* Timestamp for mobile */}
        <div className="mt-3 pt-3 border-t border-gray-200 lg:hidden">
          <div className="text-xs text-gray-500">
            Updated: {formatDate(item?.Status_updated_at)}
          </div>
        </div>
      </div>
    </>
  );
}

export default HistoryItemCard;
