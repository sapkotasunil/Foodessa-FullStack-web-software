"use client";

import { useState, useMemo } from "react";

type Item = {
  id: number;
  item_name: string;
  item_description: string;
  category: string;
  price: string;
  sold_quantity: string;
  available_quantity: string;
  created_at: string;
};

type Props = {
  items: Item[];
};

export default function ItemsDashboard({ items }: any) {
  const [filter, setFilter] = useState<"today" | "week" | "month" | "all">(
    "all"
  );

  // Helper to filter items by date range
  const filteredItems = useMemo(() => {
    if (filter === "all") return items;

    const now = new Date();
    return items.filter((item) => {
      const created = new Date(item.created_at);

      if (filter === "today") {
        return created.toDateString() === now.toDateString();
      }
      if (filter === "week") {
        const weekAgo = new Date();
        weekAgo.setDate(now.getDate() - 7);
        return created >= weekAgo;
      }
      if (filter === "month") {
        return (
          created.getMonth() === now.getMonth() &&
          created.getFullYear() === now.getFullYear()
        );
      }
      return true;
    });
  }, [filter, items]);

  // Overall Analysis
  const overallStats = useMemo(() => {
    let totalSold = 0;
    let totalRevenue = 0;
    let lowStockItems: Item[] = [];

    filteredItems.forEach((item) => {
      const sold = parseInt(item.sold_quantity);
      const available = parseInt(item.available_quantity);
      const price = parseFloat(item.price);

      totalSold += sold;
      totalRevenue += sold * price;

      if (available < 5) {
        lowStockItems.push(item);
      }
    });

    return { totalSold, totalRevenue, lowStockItems };
  }, [filteredItems]);

  return (
    <div className="p-6 space-y-6">
      {/* Filter Controls */}
      <div className="flex gap-3">
        {["all", "today", "week", "month"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as any)}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              filter === f
                ? "bg-green-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {f.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Overall Stats */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-5 bg-white rounded-2xl shadow-md">
          <h3 className="text-lg font-semibold">Total Sold Quantity</h3>
          <p className="text-2xl font-bold text-green-700">
            {overallStats.totalSold}
          </p>
        </div>
        <div className="p-5 bg-white rounded-2xl shadow-md">
          <h3 className="text-lg font-semibold">Total Revenue</h3>
          <p className="text-2xl font-bold text-blue-700">
            Rs. {overallStats.totalRevenue}
          </p>
        </div>
        <div className="p-5 bg-white rounded-2xl shadow-md">
          <h3 className="text-lg font-semibold">Low Stock Items</h3>
          {overallStats.lowStockItems.length > 0 ? (
            <ul className="text-sm text-red-600 list-disc ml-5">
              {overallStats.lowStockItems.map((item) => (
                <li key={item.id}>
                  {item.item_name} ({item.available_quantity} left)
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-green-600">All good 🚀</p>
          )}
        </div>
      </div>

      {/* Per Item Stats */}
      <div>
        <h2 className="text-xl font-bold mb-4">Per-Item Analysis</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const sold = parseInt(item.sold_quantity);
            const available = parseInt(item.available_quantity);
            const revenue = sold * parseFloat(item.price);

            return (
              <div key={item.id} className="p-5 bg-white rounded-2xl shadow-md">
                <h3 className="text-lg font-semibold">{item.item_name}</h3>
                <p className="text-gray-600 text-sm">{item.category}</p>
                <div className="mt-3 space-y-1">
                  <p>
                    Sold: <span className="font-bold">{sold}</span>
                  </p>
                  <p>
                    Available:
                    <span
                      className={`font-bold ${
                        available < 5 ? "text-red-600" : "text-green-700"
                      }`}
                    >
                      {available}
                    </span>
                  </p>
                  <p>
                    Revenue:{" "}
                    <span className="font-bold text-blue-700">
                      Rs. {revenue}
                    </span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
