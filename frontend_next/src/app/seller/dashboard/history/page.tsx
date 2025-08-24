"use client";

import HistoryData from "./component/HistoryData";

function History() {
  return (
    <>
      <main className="flex-1 p-6 bg-gray-100">
        <h1 className="text-2xl font-semibold text-gray-900">Orders</h1>
        <HistoryData />
      </main>
    </>
  );
}

export default History;
