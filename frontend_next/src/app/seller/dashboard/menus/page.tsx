"use client";

import { useState } from "react";
import AddItemModel from "./components/AddItemModel";
import ItemsData from "./components/ItemsData";
import { useAppDispatch } from "@/lib/store/hooks";
import { setStatus } from "@/lib/store/seller/items/items";
import { Status } from "@/lib/types/types";

function menus() {
  const [modelOpen, setModelOpen] = useState<boolean>(false);
  const [searched, setSearched] = useState<string>("");
  const openModel = () => {
    setModelOpen(true);
  };
  const closeModel = () => {
    setModelOpen(false);
  };
  const dispatch = useAppDispatch();

  return (
    <>
      <main className="flex-1 p-6 bg-gray-100">
        <h1 className="text-2xl font-semibold text-gray-900">Menus</h1>
        <div className="mt-4 bg-white rounded-lg shadow-md">
          <div className="w-full my-3 flex justify-between  items-center ">
            <div className="mt-3">
              <form className=" ml-5 mx-auto max-w-xl py-1 px-5 rounded-full bg-gray-50 border flex focus-within:border-gray-300">
                <input
                  onChange={(e) => setSearched(e.target.value)}
                  type="text"
                  placeholder="Search anything"
                  className="bg-transparent w-full focus:outline-none pr-4 font-semibold border-0 focus:ring-0 px-0 py-0"
                  name="topic"
                />
                <button className="flex flex-row items-center justify-center min-w-[130px] px-2 rounded-full font-medium tracking-wide border disabled:cursor-not-allowed disabled:opacity-50 transition ease-in-out duration-150 text-base bg-green-900 text-white font-medium tracking-wide border-transparent py-1.5 h-[38px] -mr-3">
                  Search
                </button>
              </form>
            </div>
            <button
              onClick={() => {
                openModel();
                dispatch(setStatus(Status.LOADING));
              }}
              className="bg-green-500 text-xl max-h-12 font-semibold hover:bg-green-600 hover:cursor-pointer text-gray-100  max-h- mt-3 m-3 px-3 py-0.5 rounded-xl "
            >
              + Add Items
            </button>
          </div>
          {modelOpen && <AddItemModel closeModel={closeModel} />}
          <ItemsData searched={searched} />
        </div>
      </main>
    </>
  );
}

export default menus;
