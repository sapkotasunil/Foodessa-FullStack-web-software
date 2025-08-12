"use client";

import { addToCart } from "@/lib/store/cart/cart.slice";
import { useAppDispatch } from "@/lib/store/hooks";
import { IresposeItemData } from "@/lib/store/seller/items/items.slice";
import { FaStar, FaStarHalfStroke } from "react-icons/fa6";
import { TbShoppingBagPlus } from "react-icons/tb";

function FoodItemCard({ items }: { items: IresposeItemData }) {
  const dispatch = useAppDispatch();

  return (
    <div>
      <div className="flex rounded-xl bg-[#e0fbc2] relative max-w-100 md:w-full">
        <div className="flex  items-center justify-center m-6 rounded-full absolute top-0 bottom-0 -left-[58px]">
          <img
            src={
              //@ts-ignore
              items.image && items.image.replace("/media/", "/api/v1/media/")
            }
            alt=""
            height={115}
            width={115}
            className="object-con aspect-square rounded-xl overflow-hidden object-cover "
          />
        </div>
        {/* info */}
        <div className="mx-4 pl-20">
          {/* title and description */}
          <div className="py-3 ">
            <h4 className="bold-16 line-clamp-1 mb-1 font-semibold text-green-700">
              {items.item_name}
            </h4>
            <div className="flex items-center justify-between pb-2 w-full">
              <h5 className="text-[14px] font-[500] text-gray-600">
                category: {items.category}
              </h5>
              <div className=" flex items-center justify-start gap-x-1 text-[#217041] text-[14px] font-[700]">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStarHalfStroke />
              </div>
            </div>
            <p className="line-clamp-2 leading-4.5 text-sm">
              {items.item_description}
            </p>
          </div>
          {/* food sizes */}
          <div className="flex items-center justify-between mb-2">
            <div className=" flex gap-2 text-gray-500 justify-center items-center">
              <img
                className="rounded-full p-0.5 h-9 w-9 bg-green-500 object-cover  overflow-hidden"
                src={
                  items?.image &&
                  items.kitchen_photo &&
                  //@ts-ignore
                  items.kitchen_photo.replace("/media/", "/api/v1/media/")
                }
                alt=""
              />
              <p className="line-clamp-2 text-gray-600  leading-3.5 text-xs">
                {items.kitchen_name}
              </p>
            </div>
            <button
              onClick={() => dispatch(addToCart(items))}
              className="flex items-center justify-center px-3 gap-x-1 text-[22px] bg-[#217041] hover:bg-green-600 cursor-pointer  text-white rounded-sm p-[3px]"
            >
              <TbShoppingBagPlus />
            </button>
          </div>
          {/* order info */}
          <div className="flex items-center gap-1 xl:gap-4 justify-between rounded-xl pb-3 text-[13px] mr-1">
            <div className="md:text-nowrap  sm:flex items-center justify-between gap-1">
              <h5>Preparation time:</h5>
              <p className="text-xs relative top-[1px] text-green-500 ">20m</p>
            </div>
            <hr className="h-4  w-[1px] bg-tertiary/10 border-none" />
            <div className="sm:flex items-center justify-center gap-1">
              <h5>price: </h5>
              <p className="text-nowrap text-xs text-green-500 relative top-[1px] ">
                RS: {items.price}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FoodItemCard;
