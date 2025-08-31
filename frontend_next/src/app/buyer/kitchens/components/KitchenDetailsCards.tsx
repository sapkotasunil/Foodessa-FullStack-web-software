"use client";
import Image from "next/image";
import { useState } from "react";

function KitchenDetailsCards({ kitchen }: any) {
  const [imageError, setImageError] = useState(false);
  const [qrError, setQrError] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const handleImageError = () => setImageError(true);
  const handleQrError = () => setQrError(true);

  const formatDate = (dateString: any) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getKitchenTypeColor = (type: any) => {
    switch (type) {
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

  return (
    <div className="bg-white rounded-xl shadow-lg max-h-[460px] xl:w-[323px] overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100">
      {/* Header Section with Image */}
      <div className="relative h-48 overflow-hidden">
        {kitchen.kitchen_profile_photo && !imageError ? (
          <Image
            src={kitchen.kitchen_profile_photo}
            alt={kitchen.kitchen_name}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-white text-2xl font-bold">
                  {kitchen.kitchen_name && kitchen.kitchen_name.toUpperCase()}
                </span>
              </div>
              <p className="text-gray-600 text-sm">No image available</p>
            </div>
          </div>
        )}

        {/* Kitchen Type Badge */}
        <div className="absolute top-4 left-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${getKitchenTypeColor(
              kitchen.kitchen_Types
            )}`}
          >
            {kitchen.kitchen_Types || "Kitchen"}
          </span>
        </div>

        {/* QR Code Toggle */}
        {kitchen.kitchen_qr_photo && (
          <div className="absolute top-4 right-4">
            <button
              onClick={() => setShowQR(!showQR)}
              className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-white transition-colors"
              aria-label="Toggle QR code"
            >
              <svg
                className="w-4 h-4 text-gray-700"
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
            </button>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Kitchen Name and Description */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
            {kitchen.kitchen_name}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-2">
            {kitchen.kitchen_description || "No description available"}
          </p>
        </div>

        {/* Contact Information */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <svg
              className="w-4 h-4 mr-2 text-green-600"
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
            <span className="line-clamp-1">{kitchen.kitchen_address}</span>
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <svg
              className="w-4 h-4 mr-2 text-green-600"
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
            <a
              href={`tel:${kitchen.phone_number}`}
              className="hover:text-green-700 transition-colors"
            >
              {kitchen.phone_number}
            </a>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 mb-4">
          <button className="cursor-pointer flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
            View Details
          </button>
        </div>

        {/* Footer with Date */}
        <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-100">
          <span>Joined: {formatDate(kitchen.created_at)}</span>
          <span className="flex items-center">
            <svg
              className="w-3 h-3 mr-1 text-green-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            {kitchen.kitchen_Types === "hotel" ? "Hotel" : "Home"}
          </span>
        </div>
      </div>

      {/* QR Code Overlay */}
      {showQR && kitchen.kitchen_qr_photo && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Scan to Order
              </h3>
              <button
                onClick={() => setShowQR(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
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
              {!qrError ? (
                <Image
                  src={kitchen.kitchen_qr_photo.replace(
                    "/media/",
                    "/api/v1/media/"
                  )}
                  alt="QR Code"
                  width={200}
                  height={200}
                  className="w-48 h-48 object-contain"
                  onError={handleQrError}
                />
              ) : (
                <div className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500 text-sm">
                    QR code not available
                  </span>
                </div>
              )}
            </div>
            <p className="text-center text-sm text-gray-600 mt-3">
              Scan this QR code to view our menu and order directly
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default KitchenDetailsCards;
