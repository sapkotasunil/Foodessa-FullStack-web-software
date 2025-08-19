"use client";

import Loader from "@/components/GlobalComponents/Loders";
import Navbar from "@/components/GlobalComponents/Navbar";
import { SucessfulModel } from "@/components/GlobalComponents/SucessfullModel";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setStatus } from "@/lib/store/seller/kitchenDetails/kitchenDetailsSlice";
import { sellerRegisterForm } from "@/lib/store/seller/sellerRegisterSlice";
import { Status } from "@/lib/types/types";
import React, { FormEvent, useEffect, useState } from "react";

export default function SellerRegistrationForm() {
  const [formData, setFormData] = useState({
    kitchen_name: "",
    kitchen_description: "",
    kitchen_address: "",
    phone_number: "",
    kitchen_type: "",
    kitchen_profile_photo: null,
  });
  const [loader, setLoader] = useState(false);

  const dispatch = useAppDispatch();
  const { status } = useAppSelector((store) => store.seller);
  const handleChange = (e: any) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: name === "kitchen_profile_photo" ? files?.[0] : value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitting form:", formData);
    dispatch(sellerRegisterForm(formData));

    setLoader(true);
  };
  useEffect(() => {
    console.log(status);
    if (status !== "loading") {
      setLoader(false);
    }
    if (status === "success") {
      SucessfulModel("Registered successfully", "Please Wait for the approval");
      dispatch(setStatus(Status.LOADING));
    }
  }, [status]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#f5fbf7] flex items-center justify-center py-10 px-4">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-[#217041] mb-2">
            Register Your Kitchen
          </h2>
          <p className="text-gray-500 mb-6">
            Let’s get your kitchen online. Fill in the form below.
          </p>

          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Kitchen Name
              </label>
              <input
                type="text"
                name="kitchen_name"
                value={formData.kitchen_name}
                onChange={handleChange}
                className="input-field"
                placeholder="Delicious Bites"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="text"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                className="input-field"
                placeholder="98XXXXXXXX"
                required
              />
            </div>

            <div className="md:col-span-2 flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Kitchen Description
              </label>
              <textarea
                name="kitchen_description"
                value={formData.kitchen_description}
                onChange={handleChange}
                className="input-field h-28 resize-none"
                placeholder="A cozy place for homemade Nepali and Indian meals."
                required
              ></textarea>
            </div>

            <div className="md:col-span-2 flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Kitchen Address
              </label>
              <input
                type="text"
                name="kitchen_address"
                value={formData.kitchen_address}
                onChange={handleChange}
                className="input-field"
                placeholder="New Road, Pokhara, Nepal"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Kitchen Type
              </label>
              <select
                name="kitchen_type"
                value={formData.kitchen_type}
                onChange={handleChange}
                className="input-field"
                required
              >
                <option value="">Select Type</option>
                <option value="hotel">Hotel / restaurants / cafe </option>
                <option value="home">Home Kitchen</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Profile Photo
              </label>
              <input
                type="file"
                name="kitchen_profile_photo"
                onChange={handleChange}
                accept="image/*"
                className="input-field"
                required
              />
            </div>

            <div className="md:col-span-2 flex items-center gap-2">
              <input
                type="checkbox"
                required
                className="rounded text-green-600 focus:ring-green-600"
              />
              <span className="text-sm text-gray-600">
                I agree to the{" "}
                <a href="#" className="text-green-700 underline">
                  Terms & Conditions
                </a>
              </span>
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                className={`
                   ${loader && "cursor-not-allowed"}
                 " bg-[#217041] hover:bg-[#1b5a37] min-w-full max-h-12 cursor-pointer text-white font-semibold py-3 px-6 rounded-lg transition-colors"

                 `}
              >
                {loader ? <Loader /> : "Submit Registration"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
