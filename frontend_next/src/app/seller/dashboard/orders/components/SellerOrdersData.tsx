"use client";
import { useEffect } from "react";
import OrderListCard from "./SellerOrderCard";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { getAllOrdersDataBySeller } from "@/lib/store/orders/orders.slice";
function SellerOrdersData() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllOrdersDataBySeller());
  }, []);

  const { ordered_data } = useAppSelector((store) => store.orders);
  console.log(ordered_data);

  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-4">
      {ordered_data.map((item) => (
        <OrderListCard item={item} />
      ))}
    </div>
  );
}

export default SellerOrdersData;
