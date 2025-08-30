"use client";

import { useEffect, useState } from "react";
import AddItemModel from "./components/AddItemModel";
import ItemsData from "./components/ItemsData";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { getSellerItemsData, setStatus } from "@/lib/store/seller/items/items";
import { Status } from "@/lib/types/types";

function Menus() {
  const [modelOpen, setModelOpen] = useState<boolean>(false);
  const [searched, setSearched] = useState<string>("");
  const dispatch = useAppDispatch();

  const openModel = () => {
    setModelOpen(true);
    dispatch(setStatus(Status.LOADING));
  };

  const closeModel = () => {
    setModelOpen(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search functionality would be implemented here
  };

  const { data } = useAppSelector((store) => store.item);

  useEffect(() => {
    if (data.length === 0) {
      dispatch(getSellerItemsData());
    }
  }, []);

  const lowStockItem = data.filter((item) => item.available_quantity < 6);
  const AvailableStock = data.filter((item) => item.is_available === "yes");

  return (
    <>
      <div className="overflow-y-scroll h-screen w-full">
        <main className="flex-1 p-6 bg-gray-50 min-h-screen">
          {/* Header Section */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              Menu Management
            </h1>
            <p className="text-gray-600 mt-1">
              Manage your restaurant's menu items and inventory
            </p>
          </div>

          {/* Search and Add Item Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              {/* Search Form */}
              <div className="flex-1 max-w-2xl">
                <form onSubmit={handleSearch} className="relative">
                  <div className="relative">
                    <input
                      onChange={(e) => setSearched(e.target.value)}
                      type="text"
                      placeholder="Search menu items by name....."
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                      value={searched}
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="absolute cursor-pointer right-1 top-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Search
                  </button>
                </form>
              </div>

              {/* Add Item Button */}
              <button
                onClick={openModel}
                className="bg-green-600 cursor-pointer hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center shadow-sm hover:shadow-md"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add New Item
              </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-100">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">
                  {data.length}
                </div>
                <div className="text-sm text-gray-600">Total Items</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {AvailableStock.length}
                </div>
                <div className="text-sm text-gray-600">Available</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-600">
                  {lowStockItem.length}
                </div>
                <div className="text-sm text-gray-600">Low Stock</div>
              </div>
            </div>
          </div>

          {/* Items Data Section */}
          <div className="   ">
            <ItemsData searched={searched} data={data} />
          </div>

          {/* Add Item Modal */}
          {modelOpen && <AddItemModel closeModel={closeModel} />}
        </main>
      </div>
    </>
  );
}

export default Menus;
