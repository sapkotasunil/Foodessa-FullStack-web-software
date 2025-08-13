"use client";

import { useAppDispatch } from "@/lib/store/hooks";
import { addOrders } from "@/lib/store/orders/orders.slice";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function BuyModel({ itemsData, closeModel, prevQuantity }: any) {
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [quantity, setQuantity] = useState(prevQuantity);

  const [ordersItemData, setOrdersItemData] = useState({
    item_name: itemsData.id,
    kitchen_name: itemsData.kitchen_name,
    phone_number: "",
    deliveryAddress: "",
    totalPrice: quantity * itemsData.price,
    quantity: quantity,
    paymentStatus: paymentMethod,
    payment: null,
  });
  const dispatch = useAppDispatch();
  const handleChange = (e: ChangeEvent<any>) => {
    const { name, value, files } = e.target;
    setOrdersItemData({
      ...ordersItemData,
      [name]: name === "payment" ? files?.[0] ?? null : value,
    });
  };

  const handlSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addOrders(ordersItemData));
    console.log("submittedData", ordersItemData);
  };
  useEffect(() => {
    setOrdersItemData((prev) => ({
      ...prev,
      quantity: quantity,
      totalPrice: quantity * itemsData.price,
    }));
  }, [quantity, itemsData.price, paymentMethod]);

  return (
    <div className="fixed inset-0 z-40 min-h-full overflow-y-auto overflow-x-hidden transition flex items-center">
      {/* overlay */}
      <div
        aria-hidden="true"
        className="fixed inset-0 w-full h-full bg-black/50 cursor-pointer"
      ></div>

      <div className="max-w-3xl relative w-full   transition my-auto  mx-auto p-6 bg-white shadow-md rounded-lg mt-10 space-y-8">
        {/* 🖼️ Food Image & Details */}
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
        <div className="flex flex-col md:flex-row gap-6 mt-3">
          <img
            src="images/food_1.png"
            alt="Food"
            className="w-full md:w-1/2 h-60  rounded-md"
          />
          <div className="flex-1 space-y-2 mt-5">
            <h2 className="text-2xl font-bold text-gray-800">
              {itemsData.item_name}
            </h2>
            <p className="text-gray-600">{itemsData.item_description}</p>
            <div className="flex gap-2">
              <span>Price:</span>{" "}
              <p className="text-gray-600">Rs {itemsData.price}</p>
            </div>
            <p className="text-sm text-gray-500">
              Kitchen:{itemsData.kitchen_name}
            </p>
            <div className="flex items-center  space-x-2 mt-2 ">
              <span className="text-sm text-gray-500">Quantity:</span>
              <button
                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => setQuantity((q: number) => Math.max(1, q - 1))}
              >
                −
              </button>
              <span className="px-5 bg-green-200 text-2xl rounded-xl ">
                {quantity}
              </span>
              <button
                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => setQuantity((q: number) => q + 1)}
              >
                +
              </button>
            </div>
          </div>
        </div>

        <form action=" " onSubmit={handlSubmit}>
          {/* 📞 Phone & Address */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                id="phone_number"
                name="phone_number"
                type="tel"
                value={ordersItemData.phone_number}
                onChange={handleChange}
                pattern="\d{10}"
                title="Phone number must be exactly 10 digits (e.g. 9801234567)"
                required
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Delivery Address
              </label>
              <input
                onChange={handleChange}
                value={ordersItemData.deliveryAddress}
                type="text"
                name="deliveryAddress"
                placeholder="City, Street, House No."
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
          </div>

          {/* 💰 Total Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Total Price
            </label>
            <input
              type="text"
              value={`Rs. ${quantity * itemsData.price}`}
              readOnly
              className="w-full bg-gray-100 border border-gray-300 rounded-md px-3 py-2 text-gray-700"
            />
          </div>

          {/* 💳 Payment Options */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Method
            </label>
            <div className="flex gap-6 mb-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="payment"
                  value="COD"
                  checked={paymentMethod === "COD"}
                  onChange={() => setPaymentMethod("COD")}
                  className="form-radio text-green-600"
                />
                <span className="ml-2 text-gray-700">Cash on Delivery</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="payment"
                  value="ONLINE"
                  checked={paymentMethod === "ONLINE"}
                  onChange={() => setPaymentMethod("ONLINE")}
                  className="form-radio text-green-600"
                />
                <span className="ml-2 text-gray-700">Online Payment</span>
              </label>
            </div>

            {/* 🔁 Show when online selected */}
            {paymentMethod === "ONLINE" && (
              <div className="space-y-3 border border-green-100 p-4 rounded-md bg-green-50">
                <p className="text-sm text-gray-700">Scan QR to pay:</p>
                <img
                  src="images/food_1.png"
                  alt="QR Code"
                  className="w-40 h-40 object-contain border rounded"
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Upload Payment Receipt
                  </label>
                  <input
                    type="file"
                    onChange={handleChange}
                    name="payment"
                    required={paymentMethod === "ONLINE"}
                    accept="image/*"
                    className="w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-green-50 file:text-green-700
                  hover:file:bg-green-100"
                  />
                </div>
              </div>
            )}
          </div>

          {/* 📦 Submit */}
          <div className="text-center">
            <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-md">
              Place Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
