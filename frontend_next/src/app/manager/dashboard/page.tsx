"use client";

import { useEffect, useMemo, useState } from "react";
import Head from "next/head";
import API from "@/lib/http/API";
import PendingApproval from "./component/PendingApproval";

type Kitchen = {
  id: number;
  kitchen_name: string;
  kitchen_description: string;
  kitchen_address: string;
  phone_number: string;
  created_at: string;
  user_role: "pending" | "seller" | "afs" | string;
  kitchen_profile_photo?: string | null; // full url from API
  rating?: number;
  total_orders?: number;
};

const mockFeedback = [
  {
    id: 1,
    name: "Ramesh Kumar",
    email: "ramesh@example.com",
    phone: "9812345678",
    subject: "Excellent Service",
    message:
      "The food was delicious and delivery was on time. Will order again!",
    rating: 5,
    created_at: "2025-09-03T14:25:36.123456+05:45",
  },
  {
    id: 2,
    name: "Sita Sharma",
    email: "sita@example.com",
    phone: "9861234567",
    subject: "Food Quality Issue",
    message:
      "The chicken momo was undercooked. Please improve quality control.",
    rating: 2,
    created_at: "2025-09-02T18:40:22.654321+05:45",
  },
];

function Dashboard() {
  const [kitchensData, setKitchensData] = useState<Kitchen[]>([]);
  const [feedback] = useState(mockFeedback);
  const [activeTab, setActiveTab] = useState<"afs" | "approved" | "feedback">(
    "afs"
  );
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const fetchKitchens = async () => {
    try {
      setIsFetching(true);
      const response = await API.get("/kitchens/");
      if (response.status === 200) {
        setKitchensData(response.data as Kitchen[]);
      }
    } catch (error) {
      alert("Something went wrong! Please try later.");
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchKitchens();
  }, []);

  // Derive lists without setting state during render
  const pendingSellers = useMemo(
    () =>
      kitchensData.filter(
        (k) => (k.user_role ?? "afs").toLowerCase() === "afs"
      ),
    [kitchensData]
  );

  const approvedSellers = useMemo(
    () =>
      kitchensData.filter(
        (k) => (k.user_role ?? "").toLowerCase() === "seller"
      ),
    [kitchensData]
  );

  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return "—";
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status: "afs" | "approved" | "rejected" | string) => {
    switch (status) {
      case "afs":
        return "";
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      <Head>
        <title>Manager Dashboard - Seller Approvals | Foodessa</title>
        <meta
          name="description"
          content="Manage seller registrations and feedback"
        />
      </Head>

      <div className="min-h-screen bg-green-50 p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Manager Dashboard
            </h1>
            <p className="text-gray-600 mt-2">
              Manage seller registrations and customer feedback
            </p>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-lg shadow-sm mb-6">
            <div className="flex border-b border-gray-200">
              <button
                className={`px-6 py-3 font-medium text-sm ${
                  activeTab === "afs"
                    ? "text-green-600 border-b-2 border-green-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("afs")}
              >
                Pending Approvals ({pendingSellers.length})
              </button>
              <button
                className={`px-6 py-3 font-medium text-sm ${
                  activeTab === "approved"
                    ? "text-green-600 border-b-2 border-green-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("approved")}
              >
                Approved Sellers ({approvedSellers.length})
              </button>
              <button
                className={`px-6 py-3 font-medium text-sm ${
                  activeTab === "feedback"
                    ? "text-green-600 border-b-2 border-green-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("feedback")}
              >
                Customer Feedback ({feedback.length})
              </button>
            </div>
          </div>

          {/* Content based on active tab */}
          <div className="space-y-6">
            {activeTab === "afs" && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  New Seller Registration Requests
                </h2>

                {isFetching ? (
                  <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                    <div className="w-8 h-8 border-4 border-gray-300 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-600">Loading kitchens…</p>
                  </div>
                ) : pendingSellers.length === 0 ? (
                  <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                    <div className="text-green-500 text-5xl mb-4">✅</div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      All caught up!
                    </h3>
                    <p className="text-gray-500">
                      No pending registration requests.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6">
                    {pendingSellers.map((pending) => (
                      <PendingApproval
                        key={pending.id}
                        seller={pending}
                        formatDate={formatDate}
                        type="pending"
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "approved" && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Approved Sellers
                </h2>

                {isFetching ? (
                  <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                    <div className="w-8 h-8 border-4 border-gray-300 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-600">Loading kitchens…</p>
                  </div>
                ) : approvedSellers.length === 0 ? (
                  <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                    <div className="text-gray-400 text-5xl mb-4">🏪</div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      No approved sellers yet
                    </h3>
                    <p className="text-gray-500">
                      Approved sellers will appear here.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6">
                    {approvedSellers.map((seller) => (
                      <PendingApproval
                        seller={seller}
                        key={seller.id}
                        formatDate={formatDate}
                        type="approval"
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "feedback" && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Customer Feedback
                </h2>
                {feedback.length === 0 ? (
                  <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                    <div className="text-gray-400 text-5xl mb-4">💬</div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      No feedback yet
                    </h3>
                    <p className="text-gray-500">
                      Customer feedback will appear here.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {feedback.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-semibold text-gray-800">
                              {item.name}
                            </h3>
                            <p className="text-gray-600 text-sm">
                              {item.email} • {item.phone}
                            </p>
                          </div>
                          <div className="flex items-center">
                            {item.rating && (
                              <div className="flex items-center mr-3">
                                {[...Array(5)].map((_, i) => (
                                  <svg
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < item.rating
                                        ? "text-amber-500"
                                        : "text-gray-300"
                                    }`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                              </div>
                            )}
                            <span className="text-sm text-gray-500">
                              {formatDate(item.created_at)}
                            </span>
                          </div>
                        </div>

                        <h4 className="font-medium text-gray-800 mb-2">
                          {item.subject}
                        </h4>
                        <p className="text-gray-600">{item.message}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
