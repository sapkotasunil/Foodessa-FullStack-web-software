"use client";

import Loader from "@/components/GlobalComponents/Loders";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { addItemData } from "@/lib/store/seller/items/items";
import { IAdditemData } from "@/lib/store/seller/items/items.slice";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface IcloseMOdel {
  closeModel: () => void;
}

const AddItemModel: React.FC<IcloseMOdel> = ({ closeModel }) => {
  const [itemData, setItemData] = useState<IAdditemData>({
    category: "",
    item_description: "",
    item_name: "",
    image: null,
    price: 0,
  });
  const [loader, setLoader] = useState(false);
  const { status } = useAppSelector((store) => store.item);

  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent<any>) => {
    const { name, value, files } = e.target;
    setItemData({
      ...itemData,
      [name]: name === "image" ? files?.[0] ?? null : value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoader(true);
    dispatch(addItemData(itemData));
  };

  useEffect(() => {
    if (status !== "loading") {
      setLoader(false);
    }
    if (status === "success") {
      toast.success("Item added sucessfully");
      closeModel();
    }
  }, [status]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 bg-black/50 backdrop-blur-sm">
      {/* Modal Container */}
      <div className="bg-white dark:bg-gray-900 w-full max-w-lg rounded-2xl shadow-lg overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white">
            Add New Item
          </h2>
          <button
            onClick={closeModel}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-5">
          {/* Item Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Item Name <span className="text-red-500">*</span>
            </label>
            <input
              onChange={handleChange}
              name="item_name"
              value={itemData.item_name}
              type="text"
              placeholder="Enter item name"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-green-500 outline-none"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Price <span className="text-red-500">*</span>
            </label>
            <input
              onChange={handleChange}
              name="price"
              value={itemData.price}
              type="number"
              placeholder="Enter price"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-green-500 outline-none"
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Image <span className="text-red-500">*</span>
            </label>
            <input
              onChange={handleChange}
              name="image"
              type="file"
              accept="image/*"
              className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-100 file:text-green-700 hover:file:bg-green-200"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              onChange={handleChange}
              name="category"
              value={itemData.category}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-green-500 outline-none"
              required
            >
              <option value="">Select category</option>
              <option value="pizza">Pizza</option>
              <option value="chicken">Chicken</option>
              <option value="drinks">Drinks</option>
              <option value="fruits">Fruits</option>
              <option value="momo">Momo</option>
              <option value="roti">Roti</option>
              <option value="others">Others</option>
              <option value="khana_set">Khana Set</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Item Description <span className="text-red-500">*</span>
            </label>
            <textarea
              onChange={handleChange}
              name="item_description"
              value={itemData.item_description}
              placeholder="Enter item description"
              rows={3}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-green-500 outline-none"
              required
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={closeModel}
              className="px-4 py-2 cursor-pointer rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={` ${
                loader && "cursor-not-allowed"
              } px-4 py-2 max-h-10 cursor-pointer rounded-lg bg-green-500 hover:bg-green-600 text-white font-medium shadow-sm transition`}
            >
              {loader ? <Loader /> : "Add Item"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItemModel;
