"use client";

import FoodItemCard from "@/app/home/components/FoodItemCard";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { getAllItemsData } from "@/lib/store/seller/items/items";
import { useEffect } from "react";

function ItemData(serchedItem: string) {
  const dispatch = useAppDispatch();

  const { data } = useAppSelector((store) => store.item);
  useEffect(() => {
    data.length === 0 && dispatch(getAllItemsData());
  }, []);
  console.log(data);
  const serchedItems = data.filter((item) =>
    item.item_name.toLowerCase().includes(serchedItem)
  );
  console.log(serchedItems);

  return (
    <>
      <div className="grid 2xl:grid-cols-3 space-x-12 space-y-4   xl:grid-cols-2 lg:grid-cols-2 ml-8  md:ml-11">
        {serchedItems.map((data) => (
          <FoodItemCard key={data.id} items={data} />
        ))}
      </div>
    </>
  );
}

export default ItemData;
