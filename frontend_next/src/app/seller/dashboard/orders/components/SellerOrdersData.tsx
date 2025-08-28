"use client";
import { useEffect } from "react";
import OrderListCard from "./SellerOrderCard";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { getAllOrdersDataBySeller } from "@/lib/store/orders/orders.slice";
import OrderAcceptedCard from "./OrderAcceptedCard";
function SellerOrdersData() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllOrdersDataBySeller());
  }, []);

  const { ordered_data } = useAppSelector((store) => store.orders);
  console.log(ordered_data);
  const pendingOrder = ordered_data.filter(
    (item) => item.orderStatus === "PENDING"
  );
  const acceptedOrder = ordered_data.filter(
    (item) => item.orderStatus === "ACCEPT"
  );
  return (
    <>
      <div className=" text-xl font-bold text-black my-2 w-full h-fit rounded-md px-1 py-1 bg-yellow-200 border-yellow-500 border-l-6">
        Pending Order
      </div>
      <div className="min-h-fit bg-gray-100 py-3 space-y-4 grid  gap-x-4 grid-cols-1">
        {pendingOrder.length !== 0 ? (
          pendingOrder.map((item) => (
            <OrderListCard key={item.id} item={item} />
          ))
        ) : (
          <h1 className="text-gray-500 text-2xl font-semibold">
            No Pending Orders Available
          </h1>
        )}
      </div>
      <div className=" text-xl font-bold text-black my-2 w-full h-fit rounded-md px-1 py-1 bg-green-200 border-green-500 border-l-6">
        Accepted Order
      </div>
      <div className="min-h-fit bg-gray-100 py-3 space-y-4 grid  grid-cols-1">
        {acceptedOrder.length !== 0 ? (
          acceptedOrder.map((item) => (
            <OrderAcceptedCard item={item} key={item.id} />
          ))
        ) : (
          <h1 className="text-gray-500 text-2xl font-semibold">
            No Acceptes Orders Available
          </h1>
        )}
      </div>
    </>
  );
}

export default SellerOrdersData;
