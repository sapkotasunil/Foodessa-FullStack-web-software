"use client";

import { useEffect, useMemo, useState } from "react";
import Head from "next/head";
import API from "@/lib/http/API";
import PendingApproval from "./component/PendingApproval";
import { useAppSelector } from "@/lib/store/hooks";
import { useRouter } from "next/navigation";
import ProtectedManager from "./component/protectedManager";

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

function Dashboard() {
  const [kitchensData, setKitchensData] = useState<Kitchen[]>([]);
  const [feedback, setFeedback] = useState();
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

  const fetchFeedback = async () => {
    try {
      const response = await API.get("/feedback/");
      if (response.status === 200) {
        setFeedback(response.data);
      }
    } catch (error) {
      alert("Something went wrong! Please try later.");
    }
  };

  useEffect(() => {
    fetchKitchens();
    fetchFeedback();
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
  const router = useRouter();

  const { user } = useAppSelector((store) => store.auth);

  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!user) {
      // still checking auth
      setChecking(true);
      return;
    }

    if (user.role !== "manager") {
      router.push("/buyer/home");
    } else {
      setChecking(false);
    }
  }, [user, router]);

  if (checking) {
    return (
      <h1 className="text-2xl w-full mx-auto mt-20 h-screen  text-black font-semibold flex items-center justify-center">
        Checking authorization...
      </h1>
    );
  }

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
                Customer Feedback (
                {
                  //@ts-ignore

                  feedback?.length
                }
                )
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
                {
                  //@ts-ignore
                  feedback?.length === 0 ? (
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
                      {
                        //@ts-ignore

                        feedback?.map((item) => (
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

                            <h4 className="font-medium text-gray-600 mb-2">
                              <span className="text-black">Subject:</span>{" "}
                              {item.subject}
                            </h4>
                            <p className="text-gray-600">{item.message}</p>
                          </div>
                        ))
                      }
                    </div>
                  )
                }
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
