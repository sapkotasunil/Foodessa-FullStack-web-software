"use client";

import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  setOrderStatus,
  UpdateOrderStatus,
} from "@/lib/store/seller/OrderStatus/orderStatusSlice";
import { Status } from "@/lib/types/types";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function OrderDetailsModel({ closeModel, itemsData }: any) {
  const [loader, setLoader] = useState(false);
  const [accept, setAccept] = useState(true);
  const dispatch = useAppDispatch();
  const { orderStatusData, status } = useAppSelector(
    (store) => store.OrderStatus
  );
  console.log("orderStatusData:", orderStatusData);
  console.log("stataus", status);
  const onAccept = () => {
    toast.success("Order Accepted ");

    dispatch(
      UpdateOrderStatus(itemsData.id, {
        deleveryStatus: "PREPARING",
        orderStatus: "ACCEPT",
      })
    );
    setAccept(true);
  };
  const onDecline = () => {
    toast.success("Order Decline", {
      icon: "❌",
      style: {
        border: "1px solid #ff4d4f",
        padding: "5px",
        color: "#ff4d4f",
      },
    });
    dispatch(
      UpdateOrderStatus(itemsData.id, {
        deleveryStatus: "FAILED",
        orderStatus: "CANCEL",
      })
    );
    setAccept(false);
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl p-8 relative animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={closeModel}
          className="absolute top-4 right-4 text-red-400 hover:text-red-700 font-semibold cursor-pointer transition"
        >
          ✕
        </button>

        {/* Content */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left: Image */}
          <div className="flex-shrink-0">
            <img
              src={
                itemsData?.item_image &&
                itemsData.item_image.replace("/media", "/api/v1/media")
              }
              className="w-full md:w-64 h-48 object-cover rounded-xl border"
              alt={itemsData?.item_name}
            />
          </div>

          {/* Right: Details */}
          <div className="flex-1 space-y-3">
            <h2 className="text-2xl font-semibold text-gray-900">
              {itemsData?.item_name}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
              <p className="text-gray-700">
                <span className="font-medium">Buyer:</span>{" "}
                {itemsData?.buyer_name}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Phone:</span>{" "}
                {itemsData?.phone_number}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Address:</span>{" "}
                {itemsData?.deliveryAddress}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Quantity:</span>{" "}
                {itemsData?.quantity}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Total Price:</span> Rs.{" "}
                {itemsData?.totalPrice}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Payment Status:</span>{" "}
                {itemsData?.paymentStatus}
              </p>
            </div>

            {itemsData?.payment_receipt && (
              <div className="mt-3">
                <span className="font-medium text-gray-700">Receipt:</span>
                <img
                  src={itemsData?.payment_receipt}
                  alt="Payment Receipt"
                  className="w-32 h-32 mt-2 object-cover border rounded-lg shadow-sm"
                />
              </div>
            )}

            <div className="pt-3 border-t text-xs text-gray-500 space-y-1">
              <p>
                <span className="font-medium">Order Status:</span>{" "}
                {itemsData?.orderStatus}
              </p>
              <p>
                <span className="font-medium">Delivery Status:</span>{" "}
                {itemsData?.deleveryStatus}
              </p>
              <p>Created: {new Date(itemsData?.created_at).toLocaleString()}</p>
              <p>
                Last Updated:{" "}
                {new Date(itemsData?.Status_updated_at).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}

        {itemsData.orderStatus === "PENDING" && (
          <div className="flex justify-end gap-4 mt-8">
            <button
              onClick={onDecline}
              className="px-6 py-2.5 cursor-pointer rounded-xl bg-red-500 text-white font-medium shadow hover:bg-red-600 transition"
            >
              Decline
            </button>
            <button
              onClick={onAccept}
              className="px-6 py-2.5 rounded-xl cursor-pointer bg-green-500 text-white font-medium shadow hover:bg-green-600 transition"
            >
              Accept
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderDetailsModel;
