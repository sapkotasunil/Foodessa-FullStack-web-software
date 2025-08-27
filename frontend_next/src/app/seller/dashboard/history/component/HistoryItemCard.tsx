"use client";

import Image from "next/image";
import { useState } from "react";
import OrderDetailsModel from "../../orders/components/OrderDetailsModel";

function HistoryItemCard({ item }: any) {
  const [modelOpen, setModelOpen] = useState(false);

  const openModel = () => {
    setModelOpen(true);
    // dispatch(setStatus(Status.LOADING));
  };
  const closeModel = () => {
    setModelOpen(false);
  };
  return (
    <>
      {modelOpen && (
        <OrderDetailsModel itemsData={item} closeModel={closeModel} />
      )}
      <div
        className={`w-full shadow-md rounded-2xl p-5 hover:shadow-xl transition-all border-4 duration-300 max-h-fit
    ${
      item?.orderStatus === "SUCESS"
        ? "border-green-500 bg-[#c8f2ef]"
        : item?.orderStatus === "UNSUCESS"
        ? "border-red-500 bg-red-100"
        : "border-amber-700 bg-amber-100"
    }
  `}
      >
        <div className="grid grid-cols-1  lg:grid-cols-2  items-center gap-4 ">
          {/* Left: Image + Name */}
          <div className="flex gap-4 items-center   ">
            <div>
              <Image
                src={
                  item?.item_image &&
                  item.item_image.replace("/media", "/api/v1/media")
                }
                alt={item?.item_name}
                width={80}
                height={80}
                className="rounded-xl object-cover shadow-sm border"
              />
              <p className="text-lg text-nowrap font-semibold  text-black mt-2">
                {item?.item_name}
              </p>
            </div>
            {/* Buyer Info */}
            <div className=" flex flex-col  h-full justify-center">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Buyer:</span> {item?.buyer_name}
              </p>
              <p className="text-sm text-gray-700 ">
                <span className="font-semibold">Payment Method:</span>{" "}
                {item?.paymentStatus}
              </p>
            </div>
          </div>

          {/* Address & Phone */}
          <div className="space-y-1 pl-20">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Address:</span>{" "}
              {item?.deliveryAddress}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Phone Number:</span>{" "}
              {item?.phone_number}
            </p>
          </div>
          {/* Order Status */}

          <p className="text-sm">
            Status:{" "}
            <span
              className={`px-2 py-1 rounded ${
                item?.orderStatus === "SUCESS"
                  ? "bg-green-200 text-green-700"
                  : item?.orderStatus === "UNSUCESS"
                  ? "bg-red-200 text-red-700"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {item?.orderStatus === "CANCEL" ? "DECLINED" : item?.orderStatus}
            </span>
            <p className="text-xs text-blue-600 mt-2">
              <span className="text-black">Last Update:</span>{" "}
              {new Date(item?.Status_updated_at).toLocaleString()}
            </p>
          </p>

          {/* Right: View Button */}
          <div className="flex justify-center sm:justify-end">
            <button
              onClick={openModel}
              className="bg-[#217041] hover:bg-[#1a5c36] px-6 py-2 rounded-xl cursor-pointer text-white font-medium shadow-sm hover:shadow-md transition"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default HistoryItemCard;
