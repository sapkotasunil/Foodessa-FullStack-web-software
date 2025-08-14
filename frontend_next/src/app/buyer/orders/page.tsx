"use client";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { getAllOrdersData } from "@/lib/store/orders/orders.slice";
import { useState, useEffect } from "react";
import ItemCard from "./Components/OrderItemCard";

export default function OrdersPage() {
  const { ordered_data } = useAppSelector((store) => store.orders);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllOrdersData());
  }, []);
  console.log(ordered_data);

  const sections = [
    { title: "Accepted Orders", status: "ACCEPT" },
    { title: "Pending Orders", status: "PENDING" },
    { title: "Completed Orders", status: "SUCESS" },
    { title: "Cancelled Orders", status: "CANCEL" },
  ];

  return (
    <>
      <div className="px-16 py-6 space-y-8">
        {sections.map((section) => {
          const filteredOrders = ordered_data.filter(
            (order) => order.orderStatus === section.status
          );
          return (
            <div key={section.status}>
              <h2
                className={`text-2xl font-bold mb-4 border-l-4 pl-3 py-2 tracking-wide rounded-md shadow-sm text-gray-800
    ${
      {
        ACCEPT: "bg-green-200 border-green-600",
        PENDING: "bg-yellow-200 border-yellow-600",
        SUCESS: "bg-blue-200 border-blue-600",
        CANCEL: "bg-red-200 border-red-600",
      }[section.status] || "bg-gray-200 border-gray-500"
    }
  `}
              >
                {section.title}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-6">
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => <ItemCard order={order} />)
                ) : (
                  <p className="text-gray-500">No orders found</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
