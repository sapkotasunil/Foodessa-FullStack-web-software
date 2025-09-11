"use client";

import { useAppSelector } from "@/lib/store/hooks";
import CartItem from "./components/Items";
import Navbar from "@/components/GlobalComponents/Navbar";

export default function CartPage() {
  const { data } = useAppSelector((store) => store.cart);
  console.log(data);

  return (
    <>
      <div className="min-h-screen  py-10 scrol px-1">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        {data.length !== 0 ? (
          data.map((item) => <CartItem data={item} key={item.id} />)
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="text-gray-400 mb-3">
              <svg
                className="w-16 h-16 mx-auto"
                fill="none"
                stroke="red"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-500 mb-1">
              No Any Items In cart
            </h3>
            <p className="text-gray-400 text-sm">
              Please add a item to orders food
            </p>
          </div>
        )}
      </div>
    </>
  );
}
