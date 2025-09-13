"use client";
import { useState } from "react";
import Image from "next/image";
import { useAppDispatch } from "@/lib/store/hooks";
import { removecartData } from "@/lib/store/cart/cart.slice";
import BuyModel from "./BuyFunction/BuyModel";
import toast from "react-hot-toast";
import { setStatus } from "@/lib/store/orders/orders.slice";
import { Status } from "@/lib/types/types";

export default function CartItem({ data }: any) {
  const [quantity, setQuantity] = useState(1);

  const dispatch = useAppDispatch();

  const removeItems = () => {
    dispatch(removecartData(data.id));
    toast.success("Removed from cart", {
      icon: "🗑️",
      style: {
        border: "1px solid #ff4d4f",
        padding: "5px",
        color: "#ff4d4f",
      },
    });
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
    <>
      {modelOpen && (
        <BuyModel
          itemsData={data}
          closeModel={closeModel}
          prevQuantity={quantity}
        />
      )}
      <div className="w-full grid   bg-white shadow-xl rounded-2xl p-4 grid-cols-1 md:grid-cols-5 sm:grid-cols-2  items-center space-x-4 mb-4">
        <div className="flex items-center gap-3  ">
          <Image
            src={data?.image && data.image.replace("/media/", "/api/v1/media/")}
            alt="Loading.."
            width={80}
            height={80}
            className="rounded-lg object-cover"
          />
          <div>
            <h2 className="text-xl font-semibold">{data?.item_name}</h2>
            <h2 className="text-lmd text-gray-700 line-clamp-2">
              {data?.item_description}
            </h2>
          </div>{" "}
        </div>

        <div className="flex items-center  space-x-2 mt-2">
          <span className="text-sm text-gray-500">Quantity:</span>
          <button
            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          >
            −
          </button>
          <span className="px-3">{quantity}</span>
          <button
            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
            onClick={() => setQuantity((q) => q + 1)}
          >
            +
          </button>
        </div>

        <div>
          {data.is_available === "no" ? (
            <div className="flex items-center">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span className="text-gray-400 text-sm pl-1">
                Not available now
              </span>
            </div>
          ) : (
            <div className="flex items-center">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-gray-400 text-sm pl-1">Available now</span>
            </div>
          )}
        </div>

        <p className="text-gray-700 font-bold flex items-center mt-2">
          Price: Rs. {data?.price * quantity}
        </p>

        <div className="mt-4 flex space-x-2 justify-end px-12">
          <button
            className="bg-green-600 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
            onClick={openModel}
          >
            Buy
          </button>
          <button
            className="bg-red-500 text-white cursor-pointer px-4 py-2 rounded-lg hover:bg-red-600 transition"
            onClick={() => removeItems()}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}
