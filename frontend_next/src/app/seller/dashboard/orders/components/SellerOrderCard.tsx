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
      <div className="w-full bg-[#dff0db] shadow-md rounded-xl border  items-center justify-between p-4 hover:shadow-lg transition">
        {/* Left: Image */}
        <div className=" items-center grid grid-cols-4  gap-4">
          <div>
            <Image
              src={
                item?.item_image &&
                item.item_image.replace("/media", "/api/v1/media")
              }
              alt={item?.item_name}
              width={70}
              height={70}
              className="rounded-lg object-cover"
            />
            <p className="text-sm text-gray-600">
              Item name: {item?.item_name}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Buyer: {item?.buyer_name}</p>
            <p className="text-sm text-gray-600">
              Payment Method: {item?.paymentStatus}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">
              Address: {item?.deliveryAddress}
            </p>
            <p className="text-sm text-gray-600">Phone: {item?.phone_number}</p>
          </div>

          {/* Right: View Button */}

          <button
            onClick={openModel}
            className="bg-[#217041] hover:bg-[#1a5c36] cursor-pointer text-white px-5 py-2 rounded-lg font-semibold transition"
          >
            View
          </button>
        </div>
      </div>
    </>
  );
};

export default OrderListCard;
