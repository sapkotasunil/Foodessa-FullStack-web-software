"use client";

import { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import { useAppSelector } from "@/lib/store/hooks";
import { Status } from "@/lib/types/types";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setStatus } from "@/lib/store/seller/items/items";

function ItemsData({ searched, data }: any) {
  const SearchedItem = data.filter((item: any) =>
    item.item_name.toLowerCase().includes(searched.toLowerCase())
  );

  const { saveStatus } = useAppSelector((store) => store.item);
  const dispatch = useDispatch();

  useEffect(() => {
    if (saveStatus === Status.SUCCESS) {
      toast.success("Item saved successfully");
      dispatch(setStatus(Status.IDLE)); // prevents re-trigger
    }
  }, [saveStatus]);

  return (
    <>
      <div className="">
        <div className="">
          {SearchedItem.map((data: any) => (
            <ItemCard key={data.id} data={data} />
          ))}
        </div>
      </div>
    </>
  );
}

export default ItemsData;
