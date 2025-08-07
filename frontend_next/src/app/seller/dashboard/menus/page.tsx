"use client";

import { useState } from "react";
import AddItemModel from "./components/AddItemModel";
import ItemsData from "./components/ItemsData";

function menus() {
  const [modelOpen, setModelOpen] = useState<boolean>(false);
  const openModel = () => {
    setModelOpen(true);
  };
  const closeModel = () => {
    setModelOpen(false);
  };

  return (
    <>
      <main className="flex-1 p-6 bg-gray-100">
        <h1 className="text-2xl font-semibold text-gray-900">Menus</h1>
        <div className="mt-4 bg-white rounded-lg shadow-md">
          <div className="w-full flex justify-end ">
            <button
              onClick={openModel}
              className="bg-green-500 text-xl font-semibold hover:bg-green-600 hover:cursor-pointer text-gray-100  max-h-fit m-6 px-3 py-0.5 rounded-xl "
            >
              + Add Items
            </button>
          </div>
          {modelOpen && <AddItemModel closeModel={closeModel} />}
          <ItemsData />
        </div>
      </main>
    </>
  );
}

export default menus;
