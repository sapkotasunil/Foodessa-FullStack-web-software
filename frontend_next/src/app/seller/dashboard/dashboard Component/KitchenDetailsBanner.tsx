"use client";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { getSellerItemsData } from "@/lib/store/seller/items/items";
import { useState, useEffect } from "react";
import { getAllOrdersDataBySeller } from "@/lib/store/orders/orders.slice";

export default function KitchenDashboard({ kitchen }: any) {
  const dispatch = useAppDispatch();

  const { data } = useAppSelector((store) => store.item);
  const { ordered_data } = useAppSelector((store) => store.orders);

  const SucessOrders = ordered_data.filter(
    (items) => items.orderStatus === "SUCESS"
  );

  useEffect(() => {
    dispatch(getSellerItemsData());
    dispatch(getAllOrdersDataBySeller());
  }, []);

  //Today Sales Data
  const Now = new Date();

  const TodaySalesOrders = SucessOrders.filter(
    (item) =>
      new Date(item.Status_updated_at).toDateString() === Now.toDateString()
  );

  //Today sales amount
  const TodaySalesAmount = TodaySalesOrders.reduce(
    (todaySellAmount, orders) => {
      //@ts-ignore
      return todaySellAmount + Number(orders.totalPrice ?? 0);
    },
    0
  );

  //last  7 days sells data
  const Week = new Date();
  Week.setDate(Now.getDate() - 7);

  const ThisWeekSales = SucessOrders.filter((item) => {
    const d = new Date(item.Status_updated_at);
    return d >= Week && d <= Now;
  });

  const WeekSalesAmount = ThisWeekSales.reduce((SellAmount, orders) => {
    //@ts-ignore
    return SellAmount + Number(orders.totalPrice ?? 0);
  }, 0);

  // last 30 days sell data

  const month = new Date();
  month.setDate(Now.getDate() - 30);

  const ThisMonthData = SucessOrders.filter((item) => {
    const date = new Date(item.Status_updated_at);
    return date >= month && date <= Now;
  });
  const MonthSalesAmount = ThisMonthData.reduce((SellAmount, orders) => {
    //@ts-ignore
    return SellAmount + Number(orders.totalPrice ?? 0);
  }, 0);

  //Top 5 selling Items
  const TopSellingItem = [...data]
    .map((item) => ({
      ...item,
      totalRevenue: (item.sold_quantity ?? 0) * (item.price ?? 0),
    }))
    .sort((a, b) => (b.sold_quantity ?? 0) - (a.sold_quantity ?? 0))
    .slice(0, 5);

  if (!kitchen) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading kitchen data...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner Section */}
      <div className="bg-gradient-to-r from-green-600 to-orange-300 mx-4 text-white p-6 shadow-lg">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <img
                src={kitchen.kitchen_profile_photo}
                alt={kitchen.kitchen_name}
                className="w-16 h-16 rounded-full border-4 border-white shadow-md"
              />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">
                  {kitchen.kitchen_name} - Powered by Foodessa
                </h1>
                <p className="text-orange-100">{kitchen.kitchen_description}</p>
              </div>
            </div>
            <div className="bg-white text-orange-600 px-4 py-2 rounded-lg shadow-md">
              <p className="font-semibold">Kitchen by Foodessa</p>
            </div>
          </div>
        </div>
      </div>

      {/* Welcome and Motivation Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Welcome to Your Kitchen Dashboard!
          </h2>
          <p className="text-gray-600 mb-4">
            Congratulations on joining <strong>Foodessa</strong>! Your kitchen
            is now live and ready to serve hungry customers. Every dish you sell
            takes you one step closer to building your food brand. 🍽️
          </p>
          <div className="bg-gradient-to-r from-green-100 to-blue-100 p-4 rounded-lg border-l-4 border-green-500">
            <p className="text-green-700 font-medium">
              💡 Tip: Highlight your special dishes and promote limited-time
              offers to boost orders during slower hours!
            </p>
          </div>
        </div>
        {/* Kitchen Details */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-green-600 mb-4">
            Kitchen Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">
                <span className="font-semibold">Address:</span>{" "}
                {kitchen.kitchen_address}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Phone:</span>{" "}
                {kitchen.phone_number}
              </p>
            </div>
            <div>
              <p className="text-gray-600">
                <span className="font-semibold">Kitchen Type:</span>{" "}
                {kitchen.kitchen_Types}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Member Since:</span>{" "}
                {new Date(kitchen.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-gray-500 text-sm font-semibold mb-2">
              Today's Sales
            </h3>
            <p className="text-3xl font-bold text-green-600">
              Rs {TodaySalesAmount}
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-gray-500 text-sm font-semibold mb-2">
              Lat 7 days
            </h3>
            <p className="text-3xl font-bold text-blue-600">
              Rs {WeekSalesAmount}
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-gray-500 text-sm font-semibold mb-2">
              Last 30 Days
            </h3>
            <p className="text-3xl font-bold text-purple-600">
              Rs {MonthSalesAmount}
            </p>
          </div>
        </div>

        {/* Popular Items */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Popular Menu Items
          </h2>
          <div className="space-y-4">
            {TopSellingItem.map((item, index) => (
              <div
                key={index}
                className=" flex justify-between p-3 bg-gray-50 rounded-lg"
              >
                <span className="font-medium">{item.item_name}</span>
                <div className="grid grid-cols-2">
                  <span className="bg-orange-100 w-20 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {item.sold_quantity} sold
                  </span>
                  <span className="bg-green-700 w-30 text-white  px-3 py-1 rounded-full text-sm font-semibold">
                    Rs {item.totalRevenue}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <button className="bg-orange-500 cursor-pointer hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-200">
              View Full Menu &amp; Analytics
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-green-600 text-white text-center p-4 mt-8 mb-1">
        <p>
          © {new Date().getFullYear()} {kitchen.kitchen_name} - Powered by
          Foodessa
        </p>
      </footer>
    </div>
  );
}
