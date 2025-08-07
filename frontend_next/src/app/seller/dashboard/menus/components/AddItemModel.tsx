"use client";

import { useAppDispatch } from "@/lib/store/hooks";
import { addItemData } from "@/lib/store/seller/items/items";
import { IAdditemData } from "@/lib/store/seller/items/items.slice";
import { ChangeEvent, FormEvent, useState } from "react";

interface IcloseMOdel {
  closeModel: () => void;
}

const AddItemModel: React.FC<IcloseMOdel> = ({ closeModel }) => {
  const [itemData, setItemData] = useState<IAdditemData>({
    category: "",
    item_description: "",
    item_name: "",
    photo: null,
    price: 0,
  });

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
    console.log("your data is", itemData);
    dispatch(addItemData(itemData));
  };

  return (
    <>
      <div className="fixed inset-0 z-40 min-h-full overflow-y-auto overflow-x-hidden transition flex items-center">
        {/* overlay */}
        <div
          aria-hidden="true"
          className="fixed inset-0 w-full h-full bg-black/50 cursor-pointer"
        ></div>
        {/* Modal */}
        <div className="relative w-full cursor-pointer pointer-events-none transition my-auto p-4">
          <div className="w-full py-2 bg-indigo-50 cursor-default pointer-events-auto dark:bg-gray-800 relative rounded-xl mx-auto max-w-lg ">
            <button
              onClick={closeModel}
              type="button"
              className="absolute top-2 right-2 rtl:right-auto rtl:left-2"
            >
              <svg
                className="h-4 w-4 hover:rotate-180 transition-all ease-in-out duration-500 cursor-pointer text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
              </svg>
              <span className="sr-only">Close</span>
            </button>
            <div className="space-y-2 p-2">
              <div className="p-2 space-y-2 text-center dark:text-white">
                <h2
                  className="text-xl font-bold tracking-tight"
                  id="page-action.heading"
                >
                  Let add a Item Details
                </h2>
                <p className="text-gray-500">
                  Are you sure you would like to do this?
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <div
                aria-hidden="true"
                className="border-t border-gray-700 px-2"
              />
              <div className="grid grid-cols-1 place-items-center px-4 py-2">
                <form noValidate onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="mb-2 text-gray-400 text-lg">
                      Item Name
                      <span className="text-red-600 inline-block p-1 text-sm">
                        *
                      </span>
                    </label>
                    <input
                      onChange={handleChange}
                      name="item_name"
                      className="item-input-field"
                      type="text"
                      placeholder="Item Name"
                      value={itemData.item_name}
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-2 text-gray-400 text-lg">
                      Price
                      <span className="text-red-600 inline-block p-1 text-sm">
                        *
                      </span>
                    </label>
                    <input
                      onChange={handleChange}
                      name="price"
                      className="item-input-field"
                      type="number"
                      title="must be a digit"
                      value={itemData.price}
                      placeholder="Price"
                      required
                    />
                  </div>
                  <div className="lg:">
                    <div>
                      <label className="mb-2 text-gray-400 text-lg">
                        Image
                        <span className="text-red-600 inline-block p-1 text-sm">
                          *
                        </span>
                      </label>
                      <input
                        onChange={handleChange}
                        name="image"
                        className="item-input-field"
                        type="file"
                        accept="image/*"
                        required
                      />
                    </div>
                    <div>
                      <label className="mb-2 text-gray-400 text-lg">
                        Category
                        <span className="text-red-600 st inline-block p-1 text-sm">
                          *
                        </span>
                      </label>
                      <select
                        onChange={handleChange}
                        name="category"
                        id=""
                        required
                        className="item-input-field"
                        value={itemData.category}
                      >
                        <option value="">Select category</option>
                        <option value="pizza">Pizza</option>
                        <option value="chicken">Chicken</option>
                        <option value="mutton">Mutton</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 text-gray-400 text-lg">
                      Item Description
                      <span className="text-red-600 inline-block p-1 text-sm">
                        *
                      </span>
                    </label>
                    <textarea
                      value={itemData.item_description}
                      onChange={handleChange}
                      name="item_description"
                      className="item-input-field"
                      placeholder="Item Description"
                      required
                    />
                  </div>
                  <div
                    aria-hidden="true"
                    className="border-b border-gray-700 px-2"
                  />
                  <div className="px-6 py-2">
                    <div className="grid gap-2 grid-cols-[repeat(auto-fit,minmax(0,1fr))]">
                      <button
                        onClick={closeModel}
                        type="button"
                        className="item-input-field"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center py-1 gap-1 font-medium rounded-lg border transition-colors outline-none focus:ring-offset-2 focus:ring-2 focus:ring-inset dark:focus:ring-offset-0 min-h-[2.25rem] px-4 text-sm text-white shadow focus:ring-white border-transparent bg-green-500 hover:bg-green-600 focus:bg-[#11071F] focus:ring-offset-[#11071F]"
                      >
                        <span className="flex items-center gap-1">
                          <span>Add</span>
                        </span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddItemModel;
