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
import OrderDetailsModel from "./OrderDetailsModel";
import { UpdateItemsQuantity } from "@/lib/store/seller/items/items";
import { error } from "console";

function OrderAcceptedCard({ item }: any) {
  const [IsUpdated, setisUpdated] = useState(true);
  const [isLogicError, setIsLogicError] = useState(false);
  const [orderStatus, setOrderStatus] = useState(item.orderStatus);
  const [deliveryStatus, setDeliveryStatus] = useState(item.deleveryStatus);
  const [loader, setLoader] = useState(false);
  const [modelOpen, setModelOpen] = useState<boolean>(false);
  const openModel = () => {
    setModelOpen(true);
  };

  const closeModel = () => {
    setModelOpen(false);
  };
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

    if (orderStatus === "SUCESS" && deliveryStatus === "DELIVERED") {
      dispatch(
        UpdateItemsQuantity(item.items_name, 0, {
          sold_quantity: item.quantity === "" ? 0 : item.quantity,
        })
      );
    }
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

  return (
    <>
      {modelOpen && (
        <OrderDetailsModel itemsData={item} closeModel={closeModel} />
      )}
      <div className="w-full bg-white shadow-md rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-all duration-300">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Image */}
          <div className=" flex gap-5 col-span-3">
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
            {/* Item Details */}
            <div className="flex flex-col items-start">
              <p className="text-lg font-semibold text-gray-800 truncate">
                {item?.item_name}
              </p>
              <div className="flex items-center mt-1 space-x-2">
                <span className="text-sm text-gray-600 bg-gray-100 px-2 py-0.5 rounded-md">
                  Qty: {item?.quantity || 1}
                </span>
                <span className="text-sm font-medium text-green-700 bg-green-50 px-2 py-0.5 rounded-md">
                  Rs{" "}
                  {item?.totalPrice ||
                    parseFloat(item?.price || 0) * (item?.quantity || 1)}
                </span>
              </div>
            </div>
          </div>

          {/* Buyer Info */}
          <div className="md:col-span-2">
            <div className="text-sm text-gray-700 truncate">
              <span className="font-medium text-gray-600">Buyer:</span>
              <span className="ml-1">{item?.buyer_name}</span>
            </div>
            <div className="mt-1 text-sm text-gray-600 truncate">
              <span className="font-medium text-gray-600">Phone:</span>
              <span className="ml-1">{item?.phone_number}</span>
            </div>
          </div>
          <div className="col-span-2">
            {/* Payment Info */}
            <div className="md:col-span-1">
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
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <p className="text-sm text-gray-700 line-clamp-2">
                <span className="font-medium text-gray-600">Address:</span>
                <span className="ml-1">{item?.deliveryAddress}</span>
              </p>
            </div>
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
          <div className="md:col-span-2 ">
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
          <div className="md:col-span-1 flex justify-center items-end pt-6">
            <button
              onClick={handleSubmit}
              disabled={loader || IsUpdated}
              className={` py-2 w-20 rounded-lg    font-medium text-sm shadow-sm transition-colors flex  justify-center
                ${
                  loader
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : IsUpdated
                    ? "bg-green-700 text-white cursor-not-allowed"
                    : "bg-yellow-400 hover:bg-yellow-600 text-black cursor-pointer"
                }`}
            >
              {loader ? <Loader /> : IsUpdated ? "Updated" : "Update"}
            </button>
          </div>
        </div>

        {/* Status Bar */}
        <div className="mt-2 pt-2 border-t border-gray-100 flex items-center justify-between">
          {/* View Button */}
          <div className="md:col-span-2 flex justify-center md:justify-end">
            <button
              onClick={openModel}
              className="bg-green-500 cursor-pointer hover:bg-green-700 px-4 py-1 rounded-lg text-white font-medium text-sm shadow-sm hover:shadow-md transition-all flex items-center"
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
          <div className="flex items-center space-x-7">
            <div className="text-xs text-gray-900">
              Order Created at: {formatDate(item?.created_at)}
            </div>
            <div className="text-xs text-gray-900">
              Last Updated at: {formatDate(item?.Status_updated_at)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderAcceptedCard;
