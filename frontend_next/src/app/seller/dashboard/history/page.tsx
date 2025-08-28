"use client";

import HistoryData from "./component/HistoryData";

function History() {
  return (
    <>
      <main className="flex-1 p-6 bg-gray-100 overflow-y-scroll h-screen">
        <HistoryData />
      </main>
    </>
  );
}

export default History;
