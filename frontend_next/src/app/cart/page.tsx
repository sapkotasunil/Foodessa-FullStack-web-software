"use client";

import { useAppSelector } from "@/lib/store/hooks";
import CartItem from "./components/Items";

const sampleProduct = {
  id: "1",
  name: "Tasty Pizza",
  price: 499,
  image: "/images/food_1.png",
  description: "pizza is a very testy food", // Add this image in your public folder
};

export default function CartPage() {
  const { data } = useAppSelector((store) => store.cart);
  console.log(data);

  const handleBuy = (id: string, qty: number) => {
    alert(`Buying ${qty} item(s) of product ID ${id}`);
  };

  const handleCancel = (id: string) => {
    alert(`Cancelled product ID ${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {data.map((item) => (
        <CartItem
          data={item}
          key={item.id}
          onBuy={handleBuy}
          onCancel={handleCancel}
        />
      ))}
    </div>
  );
}
