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

  const { status } = useAppSelector((store) => store.item);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status !== Status.LOADING) {
      dispatch(setStatus(Status.LOADING));
    }
    if (status === Status.SUCCESS) {
      toast.success("Item update Sucessfully");

      dispatch(setStatus(Status.LOADING));
    } else {
      dispatch(setStatus(Status.LOADING));
    }
  }, [status]);
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
