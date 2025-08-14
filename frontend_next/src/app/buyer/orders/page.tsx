"use client";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { getAllOrdersData } from "@/lib/store/orders/orders.slice";
import { useState, useEffect } from "react";

export default function OrdersPage() {
  const { ordered_data } = useAppSelector((store) => store.orders);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllOrdersData());
  }, []);
  console.log(ordered_data);
  const sections = [
    { title: "Pending Orders", status: "PENDING" },
    { title: "Completed Orders", status: "COMPLETED" },
    { title: "Cancelled Orders", status: "CANCELLED" },
  ];

  return (
    <div className="p-6 space-y-8">
      {sections.map((section) => {
        const filteredOrders = ordered_data.filter(
          (order) => order.orderStatus === section.status
        );
        return (
          <div key={section.status}>
            <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-6">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 p-1"
                  >
                    <img
                      src={
                        order.item_image &&
                        order.item_image.replace("/media/", "/api/v1/media/")
                      }
                      alt="waiting"
                      className="w-full h-60 rounded-2xl border-b-2 hover:border-2 hover:border-green-600  border-gray-400 object-fill"
                    />
                    <div className="p-4 space-y-2">
                      <h3 className="text-lg font-semibold">
                        {order.item_name}
                      </h3>
                      <p className="text-gray-500">{order.kitchen_name}</p>

                      <p className="text-sm">Qty: {order.quantity}</p>
                      <p className="text-sm font-bold text-green-600">
                        Rs. {order.totalPrice}
                      </p>

                      <p className="text-sm">
                        Payment:{" "}
                        <span
                          className={`px-2 py-1 rounded ${
                            order.paymentStatus === "ONLINE"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {order.paymentStatus}
                        </span>
                      </p>
                      <p className="text-sm">
                        Delivery:{" "}
                        <span
                          className={`px-2 py-1 rounded ${
                            order.deleveryStatus === "DELIVERED"
                              ? "bg-green-100 text-green-700"
                              : order.deleveryStatus === "PREPARING"
                              ? "bg-orange-100 text-orange-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {order.deleveryStatus}
                        </span>
                      </p>
                      <p className="text-xs text-gray-400">
                        Ordered on:{" "}
                        {new Date(order.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No orders found</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
