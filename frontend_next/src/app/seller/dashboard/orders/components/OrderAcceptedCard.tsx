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

  const dispatch = useAppDispatch();

  const [loader, setLoader] = useState(false);

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
      <div className="w-full bg-[#c8f2ef] shadow-md rounded-2xl border border-gray-200 p-5 hover:shadow-xl transition-all duration-300 max-h-fit">
        <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-5 items-center gap-6">
          {/* Left: Image + Name */}
          <div className="grid grid-cols-2">
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
              <p className="text-lg font-semibold  text-black mt-2">
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

          <form
            action=""
            className=" grid grid-cols-2 min-w-fit space-x-4 col-span-2"
          >
            {/* Delivery Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Delivery Status
              </label>
              <select
                value={deliveryStatus}
                onChange={(e) => (
                  setDeliveryStatus(e.target.value), setIsLogicError(false)
                )}
                className={`w-full border rounded-lg px-3 py-2 focus:ring-2 transition
      ${
        deliveryStatus === "PENDING"
          ? "bg-yellow-100 border-yellow-400 text-yellow-700"
          : deliveryStatus === "PREPARING"
          ? "bg-blue-100 border-blue-400 text-blue-700"
          : deliveryStatus === "OUT_FOR_DELIVERY"
          ? "bg-purple-100 border-purple-400 text-purple-700"
          : deliveryStatus === "DELIVERED"
          ? "bg-green-100 border-green-400 text-green-700"
          : deliveryStatus === "FAILED"
          ? "bg-red-100 border-red-400 text-red-700"
          : "bg-gray-100 border-gray-300 text-gray-700"
      }`}
              >
                <option
                  value="PENDING"
                  className="bg-yellow-100 text-yellow-800"
                >
                  Pending
                </option>
                <option value="PREPARING" className="bg-blue-100 text-blue-800">
                  Preparing
                </option>
                <option
                  value="OUT_FOR_DELIVERY"
                  className="bg-purple-100 text-purple-800"
                >
                  Out for Delivery
                </option>
                <option
                  value="DELIVERED"
                  className="bg-green-100 text-green-800"
                >
                  Delivered
                </option>
                <option value="FAILED" className="bg-red-100 text-red-800">
                  Failed
                </option>
              </select>
            </div>

            {/* Order Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Order Status
              </label>
              <select
                value={orderStatus}
                onChange={(e) => (
                  setOrderStatus(e.target.value), setIsLogicError(false)
                )}
                className={`w-full border rounded-lg px-3 py-2 focus:ring-2 transition
      ${
        orderStatus === "ACCEPT"
          ? "bg-blue-100 border-blue-400 text-blue-700"
          : orderStatus === "SUCESS"
          ? "bg-green-100 border-green-400 text-green-700"
          : orderStatus === "UNSUCESS"
          ? "bg-red-100 border-red-400 text-red-700"
          : "bg-gray-100 border-gray-300 text-gray-700"
      }`}
              >
                <option value="ACCEPT" className="bg-blue-100 text-blue-800">
                  Accepted
                </option>
                <option value="SUCESS" className="bg-green-100 text-green-800">
                  Delivered
                </option>
                <option value="UNSUCESS" className="bg-red-100 text-red-800">
                  Unsuccessful
                </option>
              </select>
              <h1
                className={`mt-1 text-sm text-red-500 ${
                  isLogicError ? "flex" : "hidden"
                }`}
              >
                You cannot do this with that Delivery status.
              </h1>
            </div>
          </form>

          {/* Right: View Button */}
          <div className="flex justify-center sm:justify-end">
            <button
              onClick={handleSubmit}
              disabled={loader || IsUpdated}
              className={`px-6 py-2 rounded-xl font-medium shadow-sm transition
      ${
        loader || IsUpdated
          ? "bg-green-900 text-white cursor-not-allowed"
          : "bg-green-500 hover:bg-[#1a5c36] text-white cursor-pointer hover:shadow-md"
      }
    `}
            >
              {loader ? <Loader /> : IsUpdated ? "Updated" : "Update"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderAcceptedCard;
