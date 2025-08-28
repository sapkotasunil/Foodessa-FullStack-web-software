"use client";
import Loader from "@/components/GlobalComponents/Loders";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  UpdateOrderStatus,
  setOrderStatus as setOrderStatusSlice,
} from "@/lib/store/seller/OrderStatus/orderStatusSlice";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function OrderAcceptedCard({ item }: any) {
  const [IsUpdated, setisUpdated] = useState(true);
  const [isLogicError, setIsLogicError] = useState(false);
  const [orderStatus, setOrderStatus] = useState(item.orderStatus);
  const [deliveryStatus, setDeliveryStatus] = useState(item.deleveryStatus);
  const [loader, setLoader] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (
      item.orderStatus === orderStatus &&
      item.deleveryStatus === deliveryStatus
    ) {
      setisUpdated(true);
    } else {
      setisUpdated(false);
    }
  }, [orderStatus, deliveryStatus, item.orderStatus, item.deleveryStatus]);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // Combined logic check
    if (
      (orderStatus === "SUCESS" && deliveryStatus !== "DELIVERED") ||
      (orderStatus === "UNSUCESS" && deliveryStatus !== "FAILED")
    ) {
      setIsLogicError(true);
      return; // stop execution if logic invalid
    } else {
      setIsLogicError(false);
    }

    // Valid combination → proceed
    setLoader(true);
    dispatch(
      UpdateOrderStatus(item.id, {
        orderStatus: orderStatus,
        deleveryStatus: deliveryStatus,
      })
    );

    setTimeout(() => {
      setLoader(false);
      toast.success("Order Updated Successfully");
    }, 500);
  };

  return (
    <>
      <div className="w-full bg-white shadow-md rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-all duration-300">
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
          <div className="md:col-span-2">
            <p className="text-lg font-semibold text-gray-800 truncate">
              {item?.item_name}
            </p>
            <div className="mt-1 text-sm text-gray-600">
              Buyer: {item?.buyer_name}
            </div>
          </div>

          {/* Payment Info */}
          <div className="md:col-span-2">
            <div className="text-sm text-gray-700">
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
            </div>
            <div className="mt-1 text-sm text-gray-600 truncate">
              Phone: {item?.phone_number}
            </div>
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <p className="text-sm text-gray-700 line-clamp-2">
              <span className="font-medium text-gray-600">Address:</span>
              <span className="ml-1">{item?.deliveryAddress}</span>
            </p>
          </div>

          {/* Delivery Status */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Delivery Status
            </label>
            <select
              value={deliveryStatus}
              onChange={(e) => (
                setDeliveryStatus(e.target.value), setIsLogicError(false)
              )}
              className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors
                ${
                  deliveryStatus === "PENDING"
                    ? "bg-yellow-50 border-yellow-200 text-yellow-700"
                    : deliveryStatus === "PREPARING"
                    ? "bg-blue-50 border-blue-200 text-blue-700"
                    : deliveryStatus === "OUT_FOR_DELIVERY"
                    ? "bg-purple-50 border-purple-200 text-purple-700"
                    : deliveryStatus === "DELIVERED"
                    ? "bg-green-50 border-green-200 text-green-700"
                    : deliveryStatus === "FAILED"
                    ? "bg-red-50 border-red-200 text-red-700"
                    : "bg-gray-50 border-gray-200 text-gray-700"
                }`}
            >
              <option value="PENDING" className="bg-yellow-50 text-yellow-800">
                Pending
              </option>
              <option value="PREPARING" className="bg-blue-50 text-blue-800">
                Preparing
              </option>
              <option
                value="OUT_FOR_DELIVERY"
                className="bg-purple-50 text-purple-800"
              >
                Out for Delivery
              </option>
              <option value="DELIVERED" className="bg-green-50 text-green-800">
                Delivered
              </option>
              <option value="FAILED" className="bg-red-50 text-red-800">
                Failed
              </option>
            </select>
          </div>

          {/* Order Status */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Order Status
            </label>
            <select
              value={orderStatus}
              onChange={(e) => (
                setOrderStatus(e.target.value), setIsLogicError(false)
              )}
              className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors
                ${
                  orderStatus === "ACCEPT"
                    ? "bg-blue-50 border-blue-200 text-blue-700"
                    : orderStatus === "SUCESS"
                    ? "bg-green-50 border-green-200 text-green-700"
                    : orderStatus === "UNSUCESS"
                    ? "bg-red-50 border-red-200 text-red-700"
                    : "bg-gray-50 border-gray-200 text-gray-700"
                }`}
            >
              <option value="ACCEPT" className="bg-blue-50 text-blue-800">
                Accepted
              </option>
              <option value="SUCESS" className="bg-green-50 text-green-800">
                Success
              </option>
              <option value="UNSUCESS" className="bg-red-50 text-red-800">
                Unsuccessful
              </option>
            </select>
            {isLogicError && (
              <p className="mt-1 text-xs text-red-600">
                Invalid status combination
              </p>
            )}
          </div>

          {/* Update Button */}
          <div className="md:col-span-1 flex justify-center">
            <button
              onClick={handleSubmit}
              disabled={loader || IsUpdated}
              className={`w-full py-2 rounded-lg font-medium text-sm shadow-sm transition-colors flex items-center justify-center
                ${
                  loader
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : IsUpdated
                    ? "bg-green-700 text-white cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700 text-white cursor-pointer"
                }`}
            >
              {loader ? <Loader /> : IsUpdated ? "Updated" : "Update"}
            </button>
          </div>
        </div>

        {/* Status Bar */}
        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
          <div className="text-xs text-gray-500">
            Order ID: #{item?.id || "N/A"}
          </div>
          <div className="text-xs text-gray-500">
            {item?.order_date
              ? new Date(item.order_date).toLocaleDateString()
              : "Date not available"}
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderAcceptedCard;
