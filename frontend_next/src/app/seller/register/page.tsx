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
    kitchen_qr_photo: null,
    payment_method: "both", // cash, online, both
  });
  const [loader, setLoader] = useState(false);

  const dispatch = useAppDispatch();
  const { status } = useAppSelector((store) => store.seller);

  const handleChange = (e: any) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "kitchen_profile_photo" || name === "kitchen_qr_photo"
          ? files?.[0]
          : value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitting form:", formData);
    dispatch(sellerRegisterForm(formData));
    setLoader(true);
  };

  useEffect(() => {
    if (status !== "loading") {
      setLoader(false);
    }
    if (status === "success") {
      SucessfulModel("Registered successfully", "Please Wait for the approval");
      dispatch(setStatus(Status.LOADING));
    }
  }, [status, dispatch]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center py-10 px-4">
        <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-700 px-8 py-6 text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Register Your Kitchen
            </h2>
            <p className="text-green-100">
              Join our platform and start serving delicious meals to your
              customers
            </p>
          </div>

          <div className="p-8">
            <form
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              onSubmit={handleSubmit}
            >
              {/* Kitchen Name */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-2">
                  Kitchen Name *
                </label>
                <input
                  type="text"
                  name="kitchen_name"
                  value={formData.kitchen_name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-colors"
                  placeholder="Delicious Bites Kitchen"
                  required
                />
              </div>

              {/* Phone Number */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-colors"
                  placeholder="98XXXXXXXX"
                  required
                />
              </div>

              {/* Kitchen Description */}
              <div className="md:col-span-2 flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-2">
                  Kitchen Description *
                </label>
                <textarea
                  name="kitchen_description"
                  value={formData.kitchen_description}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-colors resize-none"
                  placeholder="Describe your kitchen, specialties, and what makes you unique..."
                  rows={3}
                  required
                ></textarea>
              </div>

              {/* Kitchen Address */}
              <div className="md:col-span-2 flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-2">
                  Kitchen Address *
                </label>
                <input
                  type="text"
                  name="kitchen_address"
                  value={formData.kitchen_address}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-colors"
                  placeholder="New Road, Pokhara, Nepal"
                  required
                />
              </div>

              {/* Kitchen Type */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-2">
                  Kitchen Type *
                </label>
                <select
                  name="kitchen_type"
                  value={formData.kitchen_type}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-colors"
                  required
                >
                  <option value="">Select Type</option>
                  <option value="hotel">Hotel / Restaurant / Cafe</option>
                  <option value="home">Home Kitchen</option>
                </select>
              </div>

              {/* Payment Method */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-2">
                  Payment Method *
                </label>
                <select
                  name="payment_method"
                  value={formData.payment_method}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-colors"
                  required
                >
                  <option value="cash">Cash Only</option>

                  <option value="both">Both Cash & Online</option>
                </select>
              </div>

              {/* Profile Photo */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-2">
                  Profile Photo *
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-green-400 transition-colors">
                  <input
                    type="file"
                    name="kitchen_profile_photo"
                    onChange={handleChange}
                    accept="image/*"
                    className="hidden"
                    id="profile-upload"
                    required
                  />
                  <label
                    htmlFor="profile-upload"
                    className="cursor-pointer text-center block"
                  >
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
                      {formData.kitchen_profile_photo
                        ? "Photo selected"
                        : "Click to upload photo"}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      PNG, JPG, JPEG (Max 5MB)
                    </p>
                  </label>
                </div>
              </div>

              {/* QR Code Section for Online Payments */}
              {formData.payment_method === "both" && (
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-2">
                    Upload Qr image *
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-green-400 transition-colors">
                    <input
                      type="file"
                      name="kitchen_qr_photo"
                      onChange={handleChange}
                      accept="image/*"
                      className="hidden"
                      id="kitchen_qr_photo"
                      required
                    />
                    <label
                      htmlFor="kitchen_qr_photo"
                      className="cursor-pointer text-center block"
                    >
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
                        {formData.kitchen_qr_photo
                          ? "Photo selected"
                          : "Click to upload photo"}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        PNG, JPG, JPEG (Max 5MB)
                      </p>
                    </label>
                  </div>
                </div>
              )}

              {/* Terms and Conditions */}
              <div className="md:col-span-2 flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <input
                  type="checkbox"
                  required
                  className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
                />
                <span className="text-sm text-gray-700">
                  I agree to the{" "}
                  <a
                    href="#"
                    className="text-green-600 hover:text-green-700 underline font-medium"
                  >
                    Terms & Conditions
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="text-green-600 hover:text-green-700 underline font-medium"
                  >
                    Privacy Policy
                  </a>
                </span>
              </div>

              {/* Submit Button */}
              <div className="md:col-span-2">
                <button
                  type="submit"
                  disabled={loader}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center ${
                    loader
                      ? "bg-gray-400 cursor-not-allowed text-white"
                      : "bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg"
                  }`}
                >
                  {loader ? <Loader /> : "Submit Registration"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
