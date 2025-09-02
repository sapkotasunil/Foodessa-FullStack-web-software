"use client";

import Loader from "@/components/GlobalComponents/Loders";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setStatus, UpdateItemsQuantity } from "@/lib/store/seller/items/items";
import { Status } from "@/lib/types/types";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AddItemModel from "./AddItemModel";

function ItemCard({ data }: any) {
  const [available, setAvailable] = useState(data.is_available);
  const [quantity, setQuantity] = useState<number | "">("");
  const [isUpdating, setIsUpdating] = useState(false);

  const dispatch = useAppDispatch();
  const [errors, setErrors] = useState({});

  const { error } = useAppSelector((store) => store.item);
  useEffect(() => {
    if (error) {
      //@ts-ignore
      setErrors(error);
    }
  }, [error]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsUpdating(true);

    dispatch(
      UpdateItemsQuantity(data.id, data.id, {
        newQuantity: quantity === "" ? 0 : quantity,
        is_available: available,
      })
    );
    setTimeout(() => {
      setQuantity("");
      setIsUpdating(false);
    }, 300);

    setTimeout(() => {
      setErrors({});
      setIsUpdating(false);
    }, 5000);
  };

  const [modelOpen, setModelOpen] = useState<boolean>(false);

  const openModel = () => {
    setModelOpen(true);
    dispatch(setStatus(Status.LOADING));
  };

  const closeModel = () => {
    setModelOpen(false);
  };

  return (
    <div className="bg-red-50 rounded-xl shadow-md overflow-hidden border border-gray-100 transition-all hover:shadow-lg my-4">
      {modelOpen && (
        <AddItemModel
          closeModel={closeModel}
          previousData={data}
          type="Upadate Item"
        />
      )}

      <div className="flex flex-col lg:flex-row p-5">
        {/* Image and details */}
        <div className="flex items-center  space-x-4 lg:w-2/5">
          <div className="flex-shrink-0">
            <img
              src={
                data.image && data.image.replace("/media/", "/api/v1/media/")
              }
              alt={data.item_name}
              height={150}
              width={150}
              className="rounded-lg object-cover h-36 w-36 shadow-sm border border-gray-200"
            />
          </div>
          <div className="flex-1 min-w-0 ">
            <h3 className="font-bold text-lg text-gray-800 truncate">
              {data?.item_name}
            </h3>
            <p className="text-gray-600 text-sm mt-1 line-clamp-2">
              {data?.item_description}
            </p>
            <div className="flex items-center mt-2">
              <span className="text-sm font-medium text-gray-700">Price:</span>
              <span className="ml-1 text-green-600 font-semibold">
                Rs. {data?.price}
              </span>
            </div>
          </div>
        </div>

        {/* Form section */}
        <form onSubmit={handleSubmit} className="lg:w-3/5 mt-4 lg:mt-0">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
            {/* Quantity Input */}
            <div className="md:col-span-2">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 h-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Add Quantity
                </label>
                <input
                  type="number"
                  value={quantity}
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  onChange={(e) => {
                    setQuantity(Number(e.target.value));
                    setErrors({});
                  }}
                  placeholder="Enter quantity..."
                />

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Availability
                  </label>
                  <select
                    value={available}
                    onChange={(e) => {
                      setAvailable(e.target.value);
                      setErrors({});
                    }}
                    className={`w-full rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 border transition-colors
                      ${
                        available === "yes"
                          ? "bg-green-50 border-green-200 text-green-800"
                          : "bg-red-50 border-red-200 text-red-800"
                      }`}
                  >
                    <option value="yes">Available</option>
                    <option value="no">Unavailable</option>
                  </select>
                </div>
              </div>
            </div>
            {/* Status Display */}
            <div className="md:col-span-2">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 h-full flex flex-col justify-center">
                <div className="flex items-center mb-3">
                  <span className="text-sm font-medium text-gray-700">
                    Status:
                  </span>{" "}
                  <span
                    className={`ml-2 px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${
                      data.is_available === "yes"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {data.is_available === "yes" ? "Available" : "Unavailable"}
                  </span>
                </div>

                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-700">
                    Available Stock:
                  </span>
                  <div className="ml-2 flex items-center">
                    <span
                      className={`text-sm font-semibold ${
                        parseInt(data.available_quantity) < 10
                          ? "text-amber-600"
                          : "text-green-600"
                      }`}
                    >
                      {data.available_quantity} units
                    </span>
                    {parseInt(data.available_quantity) < 5 && (
                      <span className="ml-2 text-xs bg-red-100 text-red-800 px-1.5 py-0.5 rounded-full">
                        Low Stock
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-1   rounded-md">
                  <div className="text-sm font-semibold ">
                    Sold Stock:{" "}
                    <span className="text-blue-600">
                      {data.sold_quantity || 0} units
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* Action Buttons */}
            <div className="md:col-span-1 flex flex-col space-y-2 justify-center">
              <button
                type="submit"
                disabled={isUpdating}
                className={`px-4 py-2 max-h-9 cursor-pointer rounded-lg text-white font-medium text-sm transition-colors
                  ${
                    isUpdating
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
              >
                {isUpdating ? <Loader /> : "Update"}
              </button>

              <button
                onClick={openModel}
                type="button"
                className="px-4 py-2 cursor-pointer rounded-lg bg-blue-600 text-white font-medium text-sm hover:bg-blue-700 transition-colors"
              >
                Edit Details
              </button>
            </div>

            {
              //@ts-ignore
              errors?.id === data.id ? (
                <h1 className=" text-red-500 text-sm col-span-3 -mt-3">
                  {" "}
                  {
                    //@ts-ignore
                    errors.errors
                  }
                </h1>
              ) : (
                ""
              )
            }
          </div>
        </form>
      </div>

      {/* Success indicator */}
    </div>
  );
}

export default ItemCard;
