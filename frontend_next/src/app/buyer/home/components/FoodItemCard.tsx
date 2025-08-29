"use client";

import { addToCart, removecartData } from "@/lib/store/cart/cart.slice";
import { useAppDispatch } from "@/lib/store/hooks";
import { IresposeItemData } from "@/lib/store/seller/items/items.slice";
import { useState } from "react";
import toast from "react-hot-toast";
import { BsFillCartCheckFill } from "react-icons/bs";
import { FaStar, FaStarHalfStroke } from "react-icons/fa6";
import { TbShoppingBagPlus } from "react-icons/tb";

function FoodItemCard({ items }: { items: IresposeItemData }) {
  const dispatch = useAppDispatch();
  const [addToCartIcon, setAddToCartIcon] = useState(false);

  const addedToCart = () => {
    if (addToCartIcon) {
      dispatch(removecartData(items.id));
      setAddToCartIcon(false);
      toast.success("Removed from cart", {
        icon: "🗑️",
        style: {
          border: "1px solid #ff4d4f",
          padding: "5px",
          color: "#ff4d4f",
        },
      });
    } else {
      dispatch(addToCart(items));
      setAddToCartIcon(true);
      toast.success("Added to cart");
    }
  };

  return (
    <div>
      <div className="flex rounded-xl bg-gradient-to-br min-h-[196px] lg:max-w-[402px] from-green-50 to-emerald-50 relative md:w-full border border-green-100 shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="flex items-center justify-center m-6 rounded-full absolute top-0 bottom-0 -left-[58px]">
          <img
            src={
              //@ts-ignore
              items.image && items.image.replace("/media/", "/api/v1/media/")
            }
            alt={items.item_name}
            height={115}
            width={115}
            className="object-cover aspect-square rounded-xl border-2 bg-green-100 border-white shadow-md"
          />
        </div>

        {/* info */}
        <div className="mx-4 pl-20 py-2 w-full">
          {/* title and description */}
          <div className="py-2 w-full">
            <h4 className="font-semibold text-green-800 text-lg mb-1 line-clamp-1">
              {items.item_name}
            </h4>
            <div className="flex items-center justify-between pb-2 w-full">
              <span className="text-xs font-medium text-green-700 bg-green-100 px-2 py-1 rounded-full">
                {items.category}
              </span>
              <div className="flex items-center gap-x-0.5 text-amber-500 text-sm">
                <FaStar className="w-3 h-3" />
                <FaStar className="w-3 h-3" />
                <FaStar className="w-3 h-3" />
                <FaStar className="w-3 h-3" />
                <FaStarHalfStroke className="w-3 h-3" />
              </div>
            </div>
            <p className="line-clamp-2 leading-4 text-sm text-gray-600">
              {items.item_description}
            </p>
          </div>

          {/* food sizes */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex gap-2 text-gray-700 items-center">
              <img
                className="rounded-full h-8 w-8 border-2 border-white shadow-sm object-cover"
                src={
                  items?.image &&
                  items.kitchen_photo &&
                  //@ts-ignore
                  items.kitchen_photo.replace("/media/", "/api/v1/media/")
                }
                alt={items.kitchen_name}
              />
              <p className="text-xs font-medium text-gray-700">
                {items.kitchen_name}
              </p>
            </div>
            <button
              onClick={addedToCart}
              className={`flex items-center justify-center p-2 rounded-lg transition-colors duration-200 ${
                addToCartIcon
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-green-500 text-white hover:bg-green-600"
              }`}
            >
              {!addToCartIcon ? (
                <TbShoppingBagPlus className="text-lg" />
              ) : (
                <BsFillCartCheckFill className="text-lg" />
              )}
            </button>
          </div>

          {/* order info */}
          <div className="flex items-center gap-3 justify-between pb-2 text-xs text-gray-600">
            <div className="flex items-center gap-1">
              <svg
                className="w-3 h-3 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>20m</span>
            </div>

            <div className="w-px h-4 bg-gray-300"></div>

            <div className="flex items-center gap-1">
              <span className="font-medium text-green-700">
                Rs. {items.price}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FoodItemCard;
