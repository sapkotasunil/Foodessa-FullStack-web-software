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
    preperiation_time: "",
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
      toast.success("Item added successfully");
      closeModel();
    }
  }, [status, closeModel]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 bg-black/50 backdrop-blur-sm">
      {/* Modal Container */}
      <div className="bg-white w-full max-w-md rounded-xl shadow-xl overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">Add New Menu Item</h2>
            <button
              onClick={closeModel}
              className="text-white cursor-pointer hover:text-gray-200 transition-colors p-1 rounded-full hover:bg-white/10"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <p className="text-green-100 text-sm mt-1">
            Fill in the details to add a new item to your menu
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="px-6 py-5 space-y-4 max-h-[70vh] overflow-y-auto"
        >
          {/* Item Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Item Name <span className="text-red-500">*</span>
            </label>
            <input
              onChange={handleChange}
              name="item_name"
              value={itemData.item_name}
              type="text"
              placeholder="e.g., Margherita Pizza"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-colors"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price (Rs) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-500">Rs.</span>
              <input
                onChange={handleChange}
                name="price"
                value={itemData.price}
                type="number"
                placeholder="0.00"
                min="0"
                step="0.01"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-colors"
                required
              />
            </div>
          </div>

          {/* Preparation Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preparation Time (in minutes)
              <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                onChange={handleChange}
                name="preperiation_time"
                value={itemData.preperiation_time}
                type="number"
                placeholder="e.g., 15"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-colors"
                required
              />
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Item Image <span className="text-red-500">*</span>
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-green-400 transition-colors">
              <input
                onChange={handleChange}
                name="image"
                type="file"
                accept="image/*"
                className="hidden"
                id="image-upload"
                required
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                <svg
                  className="w-8 h-8 text-gray-400 mx-auto mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p className="text-sm text-gray-600">
                  {itemData.image
                    ? itemData.image.name
                    : "Click to upload image"}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  PNG, JPG, JPEG up to 5MB
                </p>
              </label>
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              onChange={handleChange}
              name="category"
              value={itemData.category}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-colors appearance-none bg-white"
              required
            >
              <option value="">Select a category</option>
              <option value="pizza">Pizza</option>
              <option value="chicken">Chicken</option>
              <option value="drinks">Drinks</option>
              <option value="fruits">Fruits</option>
              <option value="momo">Momo</option>
              <option value="roti">Roti</option>
              <option value="khana_set">Khana Set</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="others">Others</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              onChange={handleChange}
              name="item_description"
              value={itemData.item_description}
              placeholder="Describe your item... (ingredients, special features, etc.)"
              rows={3}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-colors resize-none"
              required
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={closeModel}
              className="px-5 py-2.5 cursor-pointer rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loader}
              className={`px-5 py-2.5 cursor-pointer rounded-lg font-medium transition-colors flex items-center justify-center min-w-[100px] ${
                loader
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-green-600 hover:bg-green-700 text-white  shadow-sm hover:shadow-md"
              }`}
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
