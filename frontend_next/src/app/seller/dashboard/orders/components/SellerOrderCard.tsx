"use client";

import React, { useState } from "react";
import Image from "next/image";
import OrderDetailsModel from "./OrderDetailsModel";
import { IuserResponseDataForOrders } from "@/lib/store/orders/orders.types";

const OrderListCard = ({ item }: any) => {
  const [modelOpen, setModelOpen] = useState<boolean>(false);
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
      <div className="w-full bg-[#f4faf3] shadow-md rounded-2xl border border-gray-200 p-5 hover:shadow-xl transition-all duration-300 max-h-fit">
        <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-6">
          {/* Left: Image + Name */}
          <div className="flex flex-col items-center sm:items-start">
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
            <p className="text-lg font-semibold  text-black mt-2">
              {item?.item_name}
            </p>
          </div>

          {/* Buyer Info */}
          <div className="space-y-1">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Buyer:</span> {item?.buyer_name}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Payment Method:</span>{" "}
              {item?.paymentStatus}
            </p>
          </div>

          {/* Address & Phone */}
          <div className="space-y-1">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Address:</span>{" "}
              {item?.deliveryAddress}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Phone Number:</span>{" "}
              {item?.phone_number}
            </p>
          </div>

          {/* Right: View Button */}
          <div className="flex justify-center sm:justify-end">
            <button
              onClick={openModel}
              className="bg-[#217041] hover:bg-[#1a5c36] px-6 py-2 rounded-xl cursor-pointer text-white font-medium shadow-sm hover:shadow-md transition"
            >
              View
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderListCard;
