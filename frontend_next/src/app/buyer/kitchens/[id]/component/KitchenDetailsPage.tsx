"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Head from "next/head";
import API from "@/lib/http/API";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { getAllItemsData } from "@/lib/store/seller/items/items";
import FoodItemCard from "@/app/buyer/home/components/FoodItemCard";

export interface IKitchenDetails {
  id: number;
  kitchen_name: string;
  kitchen_description: string;
  kitchen_address: string;
  phone_number: string;
  kitchen_Types: string;
  kitchen_profile_photo: string | null;
  kitchen_qr_photo: string | null;
  created_at: string; // ISO date string
  user: string;
  user_role: string;
}

// Mock kitchen data - in a real app, this would come from an API
const mockData = {
  opening_hours: {
    monday: { open: "09:00", close: "21:00" },
    tuesday: { open: "09:00", close: "21:00" },
    wednesday: { open: "09:00", close: "21:00" },
    thursday: { open: "09:00", close: "21:00" },
    friday: { open: "09:00", close: "22:00" },
    saturday: { open: "10:00", close: "22:00" },
    sunday: { open: "10:00", close: "20:00" },
  },
};

export default function KitchenDetailsPage() {
  const router = useRouter();
  const { id } = useParams();
  const [kitchen, setKitchen] = useState<IKitchenDetails>();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [showQR, setShowQR] = useState(false);
  const dispatch = useAppDispatch();

  const { data } = useAppSelector((store) => store.item);
  useEffect(() => {
    data.length === 0 && dispatch(getAllItemsData());
  }, []);

  const kitchen_item = data.filter(
    (item) => item.kitchen_name === kitchen?.kitchen_name
  );

  useEffect(() => {
    const fetchKitchenData = async () => {
      try {
        setLoading(true);
        const response = await API.get(`/kitchen/${id}`);
        const kitchenData = response.data;
        setKitchen(kitchenData);

        // Using mock data for demonstration
        setTimeout(() => {
          setKitchen(kitchenData);
          setLoading(false);
        }, 2000);
      } catch (error) {
        setLoading(false);
      }
    };

    if (id) {
      fetchKitchenData();
    }
  }, []);

  const formatDate = (dateString: any) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getKitchenTypeColor = (type: any) => {
    switch (type.toLowerCase()) {
      case "hotel":
        return "bg-blue-100 text-blue-800";
      case "home":
        return "bg-green-100 text-green-800";
      case "cloud":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center ">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{kitchen?.kitchen_name} - Kitchen Details | Foodessa</title>
        <meta
          name="description"
          content={`View details for ${kitchen?.kitchen_name} kitchen`}
        />
      </Head>

      <div className="min-h-screen ">
        {/* Header Section */}
        <div className="">
          <div className="container  mx-auto px-4 py-4">
            <button
              onClick={() => router.back()}
              className="flex cursor-pointer items-center text-green-600 hover:text-green-800 transition-colors mb-4"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back
            </button>
          </div>
        </div>

        {/* Kitchen Header */}
        <div className="relative h-64 md:h-80 overflow-hidden">
          {
            //@ts-ignore
            kitchen?.kitchen_profile_photo_url ? (
              <Image
                //@ts-ignore
                src={kitchen?.kitchen_profile_photo_url}
                alt={kitchen?.kitchen_name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-3xl font-bold">
                      {kitchen?.kitchen_name}
                    </span>
                  </div>
                  <p className="text-gray-600">No image available</p>
                </div>
              </div>
            )
          }

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40"></div>

          {/* Kitchen Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="container mx-auto">
              <div className="flex flex-col md:flex-row md:items-end justify-between">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">
                    {kitchen?.kitchen_name}
                  </h1>
                  <div className="flex items-center flex-wrap gap-2 mb-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getKitchenTypeColor(
                        kitchen?.kitchen_Types
                      )}`}
                    >
                      {kitchen?.kitchen_Types || "Kitchen"}
                    </span>
                    <div className="flex items-center">
                      <span className="text-amber-400 mr-1">★</span>
                      <span className="font-semibold">4.5</span>
                      <span className="mx-1">•</span>
                      <span> 0 reviews</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto  py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Kitchen Details */}
            <div className="lg:col-span-2">
              {/* Navigation Tabs */}
              <div className="bg-white rounded-lg shadow-sm mb-6">
                <div className="flex border-b border-gray-200">
                  <button
                    className={`px-6 py-3 font-medium text-sm cursor-pointer ${
                      activeTab === "overview"
                        ? "text-green-600 border-b-2 border-green-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() => setActiveTab("overview")}
                  >
                    Overview
                  </button>
                  <button
                    className={`px-6 py-3 font-medium text-sm cursor-pointer${
                      activeTab === "menu"
                        ? "text-green-600 border-b-2 border-green-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() => setActiveTab("menu")}
                  >
                    Menu
                  </button>
                  <button
                    className={`px-6 py-3 font-medium text-sm cursor-pointer ${
                      activeTab === "reviews"
                        ? "text-green-600 border-b-2 border-green-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() => setActiveTab("reviews")}
                  >
                    Reviews (0)
                  </button>
                </div>
              </div>

              {/* Tab Content */}
              {activeTab === "overview" && (
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    About {kitchen?.kitchen_name}
                  </h2>
                  <p className="text-gray-600 mb-6">
                    {kitchen?.kitchen_description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-3">
                        Popular Items
                      </h3>
                      <ul className="space-y-2">
                        {kitchen_item.map((item, index) => (
                          <li
                            key={index}
                            className="flex items-center text-gray-600"
                          >
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3"></span>
                            {item.item_name}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-800 mb-3">
                        Delivery Info
                      </h3>
                      <ul className="space-y-2">
                        <li className="flex justify-between">
                          <span className="text-gray-600">Delivery Time</span>
                          <span className="font-medium">20-25</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-600">Minimum Order</span>
                          <span className="font-medium">Rs. 149</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-600">Delivery Fee</span>
                          <span className="font-medium">Rs. 100</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "menu" && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-6">
                    Menu
                  </h2>
                  {kitchen_item.length !== 0 ? (
                    <div className="grid grid-cols-2 ml-6 space-x-8 gap-5 ">
                      {kitchen_item.map((item) => (
                        <FoodItemCard items={item} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="text-gray-400 text-6xl mb-4">🍔</div>
                      <h3 className="text-lg font-semibold text-gray-600 mb-2">
                        Menu Coming Soon
                      </h3>
                      <p className="text-gray-500">
                        We're preparing our delicious menu for you.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-6">
                    Customer Reviews
                  </h2>
                  <div className="text-center py-12">
                    <div className="text-gray-400 text-6xl mb-4">⭐</div>
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">
                      No Reviews Yet
                    </h3>
                    <p className="text-gray-500">
                      Be the first to review this kitchen.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Contact & Info */}
            <div className="space-y-6">
              {/* Contact Card */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="bg-green-100 p-2 rounded-lg mr-3">
                      <svg
                        className="w-5 h-5 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Address</p>
                      <p className="font-medium">{kitchen?.kitchen_address}</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="bg-green-100 p-2 rounded-lg mr-3">
                      <svg
                        className="w-5 h-5 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <a
                        href={`tel:${kitchen?.phone_number}`}
                        className="font-medium hover:text-green-600 transition-colors"
                      >
                        {kitchen?.phone_number}
                      </a>
                    </div>
                  </div>

                  {kitchen?.kitchen_qr_photo && (
                    <div className="pt-4 border-t border-gray-100">
                      <button
                        onClick={() => setShowQR(true)}
                        className="w-full bg-green-600 cursor-pointer hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
                      >
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                          />
                        </svg>
                        View QR Code for payment
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Hours Card */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4">
                  Opening Hours
                </h3>
                <div className="space-y-3">
                  {Object.entries(mockData.opening_hours).map(
                    ([day, hours]) => (
                      <div key={day} className="flex justify-between">
                        <span className="text-gray-600 capitalize">{day}</span>
                        <span className="font-medium">
                          {hours.open} - {hours.close}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Stats Card */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4">
                  Kitchen Stats
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Member Since</span>
                    <span className="font-medium">
                      {formatDate(kitchen?.created_at)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Kitchen Type</span>
                    <span className="font-medium capitalize">
                      {kitchen?.kitchen_Types}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* QR Code Modal */}
        {showQR && kitchen?.kitchen_qr_photo && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl p-6 max-w-sm w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Scan to Order
                </h3>
                <button
                  onClick={() => setShowQR(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                >
                  <svg
                    className="w-6 h-6"
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
              <div className="bg-gray-100 p-4 rounded-lg flex justify-center">
                <Image
                  src={kitchen?.kitchen_qr_photo.replace(
                    "/media",
                    "/api/v1/media"
                  )}
                  alt="QR Code"
                  width={200}
                  height={200}
                  className="w-48 h-48 object-contain"
                />
              </div>
              <p className="text-center text-sm text-gray-600 mt-3">
                Scan this QR code to pay directly
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
