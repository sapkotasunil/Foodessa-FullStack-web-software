"use client";

import { useAppDispatch } from "@/lib/store/hooks";
import { UpdateItemsQuantity } from "@/lib/store/seller/items/items";
import { useState } from "react";

function ItemCard({ data }: any) {
  const [available, setAvailable] = useState(data.is_available);
  const [quantity, setQuantity] = useState<number | "">("");

  const dispatch = useAppDispatch();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    dispatch(
      UpdateItemsQuantity(data.id, {
        newQuantity: quantity === "" ? 0 : quantity,
        is_available: available,
      })
    );
    setQuantity("");
  };

  return (
    <div className="bg-amber-50 px-3  rounded-xl flex md:flex-wrap lg:flex-nowrap space-y-6 w-full  my-4 mx-1">
      {/* Image and details */}
      <div className="xl:flex justify-center items-center gap-2 max-w-fit">
        <img
          src={data.image && data.image.replace("/media/", "/api/v1/media/")}
          alt="food"
          height={98}
          width={98}
          className="rounded-md object-cover"
        />
        <div>
          <p className="font-semibold text-xl">{data?.item_name}</p>
          <p className="text-gray-900 text-sm line-clamp-2">
            Description:{" "}
            <span className="text-gray-500 ">{data?.item_description}</span>
          </p>
          <p className="text-black text-sm mt-1">Price: {data?.price}</p>
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-5 min-w-fit  "
        action=""
      >
        {/* Quantity */}
        <div className="xl:mx-auto col-span-2 flex flex-col justify-start items-start shadow-s rounded-xl p-4 w-full max-w-sm">
          <label className="mt-3 text-sm  text-gray-700 font-semibold">
            Add Quantity:
          </label>
          <input
            type="number"
            value={quantity}
            className="bg-green-100 border border-green-300 rounded-xl px-3 py-1 mt-1 focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={(e) => setQuantity(Number(e.target.value))}
            placeholder="Enter quantity..."
          />
          <div className="flex mt-3 flex-col">
            <span className=" text-gray-700 font-semibold">
              Change Availibility :
            </span>
            <div className="ml-2 w-full ">
              <select
                value={available}
                onChange={(e) => setAvailable(e.target.value)}
                className={`border w-full rounded-lg px-3 py-1 focus:ring-2 transition
        ${
          available === "yes"
            ? "bg-green-100 border-green-400 text-green-700"
            : available === "no"
            ? "bg-red-100 border-red-400 text-red-700"
            : "bg-gray-100 border-gray-300 text-gray-700"
        }`}
              >
                <option value="yes" className="bg-green-100 text-green-800">
                  Yes
                </option>
                <option value="no" className="bg-red-100 text-red-800">
                  No
                </option>
              </select>
            </div>
          </div>
        </div>
        {/* Category and availability */}
        <div className=" col-span-2 xl:mx-auto flex justify-center items-center ">
          <div className="grid grid-rows-2 mt-3">
            <div className="flex">
              <span className=" text-gray-700 font-semibold">
                Available Now:
              </span>
              <div className="ml-2 flex">
                <h1
                  className={` px-4 text-white ${
                    data.is_available === "yes"
                      ? "bg-green-500 rounded-sm border-green-400 text-green-700"
                      : data.is_available === "no"
                      ? "bg-red-500 border-red-400 text-red-700"
                      : "bg-gray-100 border-gray-300 text-gray-700"
                  }`}
                >
                  {data.is_available === "yes" ? "Yes" : "No"}
                </h1>
              </div>
            </div>
            <h1 className="text  font-semibold text-gray-800">
              Remaining Quantity:{" "}
              <span className="text-green-600">{data?.available_quantity}</span>
            </h1>
          </div>
        </div>

        <div className="flex justify-end items-center pt-6.5 text-white">
          <button className="bg-green-500 px-2 py-1 w-fit h-fit rounded-xl">
            Update
          </button>
        </div>
      </form>
      {/* Buttons */}
      <div className="xl:flex grid grid-cols-2 ml-5 items-center gap-2 max-w-fit xl:w-full text-white">
        <button className="bg-green-500 px-2 py-1 rounded-xl">
          Edit Details
        </button>
      </div>
    </div>
  );
}

export default ItemCard;
