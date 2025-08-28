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
  const [filter, setFilter] = useState<"all">("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(items.map((item: any) => item.category))
    );
    return ["all", ...uniqueCategories];
  }, [items]);

  // Helper to filter items by date range and category
  const filteredItems = useMemo(() => {
    let filtered = items;

    // Apply date filter
    if (filter !== "all") {
      const now = new Date();
      filtered = filtered.filter((item: any) => {
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
    }

    // Apply category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (item: any) => item.category === selectedCategory
      );
    }

    return filtered;
  }, [filter, items, selectedCategory]);

  // Overall Analysis
  const overallStats = useMemo(() => {
    let totalSold = 0;
    let totalRevenue = 0;
    let lowStockItems: Item[] = [];
    let totalItems = filteredItems.length;

    filteredItems.forEach((item: any) => {
      const sold = parseInt(item.sold_quantity) || 0;
      const available = parseInt(item.available_quantity) || 0;
      const price = parseFloat(item.price) || 0;

      totalSold += sold;
      totalRevenue += sold * price;

      if (available < 5) {
        lowStockItems.push(item);
      }
    });

    const averageRevenue = totalItems > 0 ? totalRevenue / totalItems : 0;

    return {
      totalSold,
      totalRevenue,
      lowStockItems,
      totalItems,
      averageRevenue,
    };
  }, [filteredItems]);

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="p-6 space-y-6 min-w-full bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Items Analytics Dashboard
        </h1>
        <p className="text-gray-600">
          Track your inventory performance and sales metrics
        </p>
      </div>

      {/* Filter Controls */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Filter Reports
            </h2>
            <div className="flex flex-wrap gap-2">
              {(["all"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === f
                      ? "bg-green-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {f === "all"
                    ? "All Time"
                    : f === "today"
                    ? "Today"
                    : f === "week"
                    ? "This Week"
                    : "This Month"}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              {categories.map((category) => {
                const cat = category as string;
                return (
                  <option key={cat} value={cat}>
                    {cat === "all"
                      ? "All Categories"
                      : cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg mr-4">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-gray-500 text-sm font-semibold">Total Sold</p>
              <p className="text-2xl font-bold text-gray-800">
                {overallStats.totalSold}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg mr-4">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-gray-500 text-sm font-semibold">
                Total Revenue
              </p>
              <p className="text-2xl font-bold text-gray-800">
                {formatCurrency(overallStats.totalRevenue)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg mr-4">
              <svg
                className="w-6 h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <div>
              <p className="text-gray-500 text-sm font-semibold">Total Items</p>
              <p className="text-2xl font-bold text-gray-800">
                {overallStats.totalItems}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 bg-amber-100 rounded-lg mr-4">
              <svg
                className="w-6 h-6 text-amber-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
            <div>
              <p className="text-gray-500 text-sm font-semibold">
                Avg. Revenue per item
              </p>
              <p className="text-2xl font-bold text-gray-800">
                {formatCurrency(overallStats.averageRevenue)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Low Stock Warning */}
      {overallStats.lowStockItems.length > 0 && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-red-800 font-medium">Low Stock Alert</h3>
              <div className="mt-2 text-red-700">
                <p>
                  The following items have low inventory (less than 5 units
                  available):
                </p>
                <ul className="list-disc pl-5 mt-1">
                  {overallStats.lowStockItems.map((item) => (
                    <li key={item.id} className="text-sm">
                      {item.item_name} - Only {item.available_quantity} left
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Per Item Stats */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Item Performance</h2>
          <span className="text-sm text-gray-500">
            Showing {filteredItems.length} of {items.length} items
          </span>
        </div>

        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <svg
              className="w-16 h-16 text-gray-300 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-16M9 10h.01M15 10h.01"
              />
            </svg>
            <p className="text-gray-500">
              No items found matching your filters
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item: any) => {
              const sold = parseInt(item.sold_quantity) || 0;
              const available = parseInt(item.available_quantity) || 0;
              const revenue = sold * parseFloat(item.price) || 0;

              return (
                <div
                  key={item.id}
                  className="border border-gray-200 rounded-lg p-4 bg-green-50 hover:shadow-md transition-shadow"
                >
                  <h3 className="font-semibold text-green-600 text-lg mb-2 truncate">
                    {item.item_name}
                  </h3>
                  <hr />
                  <span className="inline-block bg-yellow-100 text-gray-600 text-xs px-2 py-1 rounded-full mb-3 capitalize">
                    {item.category}
                  </span>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sold:</span>
                      <span className="font-medium">{sold}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Available:</span>
                      <span
                        className={`font-medium ${
                          available < 5 ? "text-red-600" : "text-green-600"
                        }`}
                      >
                        {available} {available < 5 && "⚠️"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Revenue:</span>
                      <span className="font-medium text-blue-600">
                        {formatCurrency(revenue)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Price:</span>
                      <span className="font-medium">
                        {formatCurrency(parseFloat(item.price))}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
