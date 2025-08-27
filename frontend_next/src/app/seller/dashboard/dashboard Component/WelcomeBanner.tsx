"use client";
import { Button } from "@/components/ui/button";
import { Rocket, Store } from "lucide-react";
function WelcomeBanner({ KitchenImage }: any) {
  return (
    <>
      <div className="mx-5 relative w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl shadow-xl overflow-hidden p-8 md:p-12 mt-6">
        {/* Decorative background shapes */}
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left Content */}
          <div className="text-center md:text-left max-w-xl">
            <h1 className="text-3xl md:text-4xl font-bold">
              Welcome to{" "}
              <span className="text-yellow-300">Foodessa Kitchen</span> 🚀
            </h1>
            <p className="mt-4 text-lg text-green-50 leading-relaxed">
              Congratulations on joining <strong>Foodessa</strong>! Your kitchen
              is now live and ready to serve hungry customers. Every dish you
              sell takes you one step closer to building your food brand. 🍽️
            </p>
            <p className="mt-3 text-base text-green-100">
              Keep adding more items, maintain great quality, and watch your
              orders grow. Together, let’s make your kitchen shine and reach
              thousands of food lovers. 🌟
            </p>

            {/* Call to action */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <Button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-3 rounded-xl shadow-md flex items-center gap-2">
                <Store size={20} /> Add New Item
              </Button>
            </div>
          </div>

          {/* Right Illustration */}
          <div className="hidden md:block">
            <img
              src={KitchenImage}
              alt="Kitchen Illustration"
              className="w-56 h-56 drop-shadow-lg animate-bounce-slow"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default WelcomeBanner;
