"use client";

import { useAppSelector } from "@/lib/store/hooks";
import CartItem from "./components/Items";
import Navbar from "@/components/GlobalComponents/Navbar";

export default function CartPage() {
  const { data } = useAppSelector((store) => store.cart);
  console.log(data);

  return (
    <>
      <div className="min-h-screen bg-gray-100 py-10 scrol px-16">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        {data.map((item) => (
          <CartItem data={item} key={item.id} />
        ))}
      </div>
    </>
  );
}
