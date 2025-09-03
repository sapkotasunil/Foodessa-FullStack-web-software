"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";

export default function SellerRegistrationConfirmation() {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  useEffect(() => {
    // Animation on component mount
    setIsVisible(true);

    // Simulate progress for the approval process
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <Head>
        <title>Registration Submitted - Foodessa</title>
        <meta name="description" content="Seller registration confirmation" />
      </Head>

      <div className="min-h-screen  flex items-center justify-center px-4 py-8">
        <div
          className="max-w-2xl w-full bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-700 ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible
              ? "translateY(0) scale(1)"
              : "translateY(20px) scale(0.95)",
          }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-700 p-6 text-center">
            <div className="w-20 h-20 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white">
              Registration Submitted!
            </h1>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="text-center mb-6">
              <p className="text-lg text-gray-700 mb-4">
                Thank you for registering as a seller on Foodessa!
              </p>
              <p className="text-gray-600">
                Your application is being reviewed by our team. We'll notify you
                once it's approved.
              </p>
            </div>

            {/* Progress indicator */}

            {/* Next steps */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-blue-800 mb-2 flex items-center">
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
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                What's Next?
              </h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>Verification of your documents</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>Kitchen quality assessment</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>Final approval from our team</span>
                </li>
              </ul>
            </div>

            {/* Estimated time */}
            <div className="flex items-center justify-center text-sm text-gray-600 mb-6 bg-gray-50 p-3 rounded-lg">
              <svg
                className="w-5 h-5 mr-2 text-amber-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Approval usually takes 1-2 hours</span>
            </div>

            {/* Actions */}
            <div className="flex flex-col space-y-3">
              <button
                onClick={() => router.push("/")}
                className="w-full bg-green-600 cursor-pointer hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
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
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Go to Homepage
              </button>

              <button
                onClick={() => router.push("/buyer/contact")}
                className="w-full border border-green-600 cursor-pointer text-green-600 hover:bg-green-50 py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
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
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Contact Support
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-100 p-4 text-center border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Thank you for choosing{" "}
              <span className="text-green-600 font-semibold">Foodessa</span>
            </p>
          </div>
        </div>

        {/* Floating elements for visual interest */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-green-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-emerald-300 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute top-1/3 right-1/4 w-12 h-12 bg-green-400 rounded-full opacity-40 animate-ping"></div>
      </div>
    </>
  );
}
