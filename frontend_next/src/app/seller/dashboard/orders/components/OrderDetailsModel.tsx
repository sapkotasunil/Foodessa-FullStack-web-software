"use client";

import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { UpdateItemsQuantity } from "@/lib/store/seller/items/items";
import {
  setOrderStatus,
  UpdateOrderStatus,
} from "@/lib/store/seller/OrderStatus/orderStatusSlice";
import { Status } from "@/lib/types/types";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function OrderDetailsModel({ closeModel, itemsData }: any) {
  const dispatch = useAppDispatch();

  const [showReceipt, setShowReceipt] = useState(false);

  const onAccept = () => {
    toast.success("Order Accepted");
    dispatch(
      UpdateOrderStatus(itemsData.id, {
        deleveryStatus: "PREPARING",
        orderStatus: "ACCEPT",
      })
    );
    dispatch(
      UpdateItemsQuantity(itemsData.items_name, {
        newQuantity: itemsData.quantity === "" ? 0 : -itemsData.quantity,
      })
    );
  };

  const onDecline = () => {
    toast.success("Order Declined", {
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
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Check if payment is online and has receipt
  const isOnlinePayment = itemsData?.paymentStatus === "ONLINE";
  const hasReceipt = itemsData?.payment;

  console.log("order:", isOnlinePayment);
  console.log("receipt:", hasReceipt);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative animate-fadeIn">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-xl flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Order Details</h2>
          <button
            onClick={closeModel}
            className="text-gray-400 cursor-pointer hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
          >
            <svg
              className="w-6 h-6"
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
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left: Image and Basic Info */}
            <div className="lg:w-2/5">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <img
                  src={
                    itemsData?.item_image &&
                    itemsData.item_image.replace("/media", "/api/v1/media")
                  }
                  className="w-full h-48 object-cover rounded-lg mb-4"
                  alt={itemsData?.item_name}
                />

                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {itemsData?.item_name}
                </h3>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Quantity:</span>
                    <span className="font-medium">{itemsData?.quantity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Unit Price:</span>
                    <span className="font-medium">
                      {formatCurrency(parseFloat(itemsData?.price || 0))}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-2">
                    <span className="text-gray-800">Total:</span>
                    <span className="text-green-600">
                      {formatCurrency(parseFloat(itemsData?.totalPrice || 0))}
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Receipt Section */}
              {isOnlinePayment && hasReceipt && (
                <div className="mt-4 bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-blue-800">
                      Payment Receipt
                    </h4>
                    <button
                      onClick={() => setShowReceipt(!showReceipt)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                    >
                      {showReceipt ? "Hide" : "View"} Receipt
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
                          d={showReceipt ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                        />
                      </svg>
                    </button>
                  </div>

                  {showReceipt && (
                    <div className="mt-2">
                      <img
                        src={itemsData.payment.replace(
                          "/media",
                          "/api/v1/media"
                        )}
                        alt="Payment Receipt"
                        className="w-full rounded-lg border border-blue-300 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() =>
                          window.open(
                            itemsData.payment.replace(
                              "/media",
                              "/api/v1/media"
                            ),
                            "_blank"
                          )
                        }
                      />
                      <p className="text-xs text-blue-600 mt-2 text-center">
                        Click image to view full size
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right: Detailed Information */}
            <div className="lg:w-3/5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Customer Information */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                    <svg
                      className="w-4 h-4 mr-2 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    Customer Information
                  </h4>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="text-gray-600">Name:</span>{" "}
                      {itemsData?.buyer_name}
                    </p>
                    <p>
                      <span className="text-gray-600">Phone:</span>{" "}
                      {itemsData?.phone_number}
                    </p>
                  </div>
                </div>

                {/* Delivery Information */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                    <svg
                      className="w-4 h-4 mr-2 text-gray-600"
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
                    Delivery Address
                  </h4>
                  <p className="text-sm text-gray-700">
                    {itemsData?.deliveryAddress}
                  </p>
                </div>

                {/* Payment Information */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                    <svg
                      className="w-4 h-4 mr-2 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                      />
                    </svg>
                    Payment Details
                  </h4>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="text-gray-600">Payment Method:</span>
                      <span
                        className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                          itemsData?.paymentStatus === "completed"
                            ? "bg-green-100 text-green-800"
                            : itemsData?.paymentStatus === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {itemsData?.paymentStatus}
                      </span>
                    </p>
                    <p>
                      <span className="text-gray-600">Total price:</span> Rs{" "}
                      {itemsData.totalPrice}
                    </p>
                  </div>
                </div>

                {/* Order Status */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                    <svg
                      className="w-4 h-4 mr-2 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                    Order Status
                  </h4>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="text-gray-600">Order:</span>
                      <span
                        className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                          itemsData?.orderStatus === "ACCEPT"
                            ? "bg-blue-100 text-blue-800"
                            : itemsData?.orderStatus === "SUCESS"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {itemsData?.orderStatus}
                      </span>
                    </p>
                    <p>
                      <span className="text-gray-600">Delivery:</span>
                      <span
                        className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                          itemsData?.deleveryStatus === "DELIVERED"
                            ? "bg-green-100 text-green-800"
                            : itemsData?.deleveryStatus === "PREPARING"
                            ? "bg-blue-100 text-blue-800"
                            : itemsData?.deleveryStatus === "PENDING"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {itemsData?.deleveryStatus}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Timestamps */}
              <div className="mt-4 bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-3">Timestamps</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-600">Created:</span>
                    <p className="text-gray-800">
                      {new Date(itemsData?.created_at).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600">Last Updated:</span>
                    <p className="text-gray-800">
                      {new Date(itemsData?.Status_updated_at).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          {itemsData.orderStatus === "PENDING" && (
            <div className="flex justify-end gap-4 mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={onDecline}
                className="px-6 py-2.5 cursor-pointer rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition-colors flex items-center"
              >
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Decline Order
              </button>
              <button
                onClick={onAccept}
                className="px-6 py-2.5 cursor-pointer rounded-lg bg-green-500 text-white font-medium hover:bg-green-600 transition-colors flex items-center"
              >
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
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Accept Order
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderDetailsModel;
