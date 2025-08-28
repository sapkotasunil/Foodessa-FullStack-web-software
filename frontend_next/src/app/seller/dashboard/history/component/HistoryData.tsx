import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { getAllOrdersDataBySeller } from "@/lib/store/orders/orders.slice";
import { useEffect } from "react";
import HistoryItemCard from "./HistoryItemCard";

function HistoryData() {
  const dispatch = useAppDispatch();
  const { ordered_data } = useAppSelector((store) => store.orders);

  useEffect(() => {
    ordered_data.length === 0 && dispatch(getAllOrdersDataBySeller());
  }, [dispatch, ordered_data.length]);

  // Filter orders by status
  const successfulOrder = ordered_data.filter(
    (item) => item.orderStatus === "SUCESS"
  );
  const unsucessOrder = ordered_data.filter(
    (item) => item.orderStatus === "UNSUCESS"
  );
  const canceledOrder = ordered_data.filter(
    (item) => item.orderStatus === "CANCEL"
  );

  // Calculate statistics
  const totalOrders = ordered_data.length;
  const successRate =
    totalOrders > 0 ? (successfulOrder.length / totalOrders) * 100 : 0;

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      {/* Header with Stats */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Order History</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
            <div className="text-sm text-blue-700 font-medium">
              Total Orders
            </div>
            <div className="text-2xl font-bold text-blue-900">
              {totalOrders}
            </div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
            <div className="text-sm text-green-700 font-medium">Successful</div>
            <div className="text-2xl font-bold text-green-900">
              {successfulOrder.length}
            </div>
          </div>
          <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
            <div className="text-sm text-red-700 font-medium">Failed</div>
            <div className="text-2xl font-bold text-red-900">
              {unsucessOrder.length}
            </div>
          </div>
          <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-500">
            <div className="text-sm text-amber-700 font-medium">Canceled</div>
            <div className="text-2xl font-bold text-amber-900">
              {canceledOrder.length}
            </div>
          </div>
        </div>
        {totalOrders > 0 && (
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
              <span>Success Rate</span>
              <span>{successRate.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${successRate}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* Successful Orders Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="w-3 h-6 bg-green-500 rounded-sm mr-3"></div>
            <h2 className="text-xl font-semibold text-gray-800">
              Successful Orders
            </h2>
            <span className="ml-3 bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
              {successfulOrder.length}
            </span>
          </div>
        </div>

        {successfulOrder.length !== 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
            {successfulOrder.map((item, index) => (
              <HistoryItemCard key={index} item={item} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="text-gray-400 mb-3">
              <svg
                className="w-16 h-16 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-500 mb-1">
              No Successful Orders
            </h3>
            <p className="text-gray-400 text-sm">
              All completed orders will appear here
            </p>
          </div>
        )}
      </div>

      {/* Failed Orders Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="w-3 h-6 bg-red-500 rounded-sm mr-3"></div>
            <h2 className="text-xl font-semibold text-gray-800">
              Failed Orders
            </h2>
            <span className="ml-3 bg-red-100 text-red-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
              {unsucessOrder.length}
            </span>
          </div>
        </div>

        {unsucessOrder.length !== 0 ? (
          <div className="grid grid-cols-1  gap-4">
            {unsucessOrder.map((item, index) => (
              <HistoryItemCard key={index} item={item} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="text-gray-400 mb-3">
              <svg
                className="w-16 h-16 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                ></path>
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-500 mb-1">
              No Failed Orders
            </h3>
            <p className="text-gray-400 text-sm">
              That's great! Keep up the good work
            </p>
          </div>
        )}
      </div>

      {/* Canceled Orders Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="w-3 h-6 bg-amber-500 rounded-sm mr-3"></div>
            <h2 className="text-xl font-semibold text-gray-800">
              Canceled Orders
            </h2>
            <span className="ml-3 bg-amber-100 text-amber-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
              {canceledOrder.length}
            </span>
          </div>
        </div>

        {canceledOrder.length !== 0 ? (
          <div className="grid grid-cols-1  gap-2">
            {canceledOrder.map((item, index) => (
              <HistoryItemCard key={index} item={item} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="text-gray-400 mb-3">
              <svg
                className="w-16 h-16 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-500 mb-1">
              No Canceled Orders
            </h3>
            <p className="text-gray-400 text-sm">
              Excellent order fulfillment rate
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default HistoryData;
