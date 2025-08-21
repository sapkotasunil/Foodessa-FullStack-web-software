"use client";

import Footer from "@/components/GlobalComponents/Footer";
import Navbar from "@/components/GlobalComponents/Navbar";
import FoodSkeletonGrid from "@/components/Skalton Loader/FoodSkeletonGrid";
import store from "@/lib/store/store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

function sellerDashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  let persistor = persistStore(store);
  return (
    <>
      <Navbar />
      <PersistGate persistor={persistor} loading={<FoodSkeletonGrid />}>
        <div className="min-h-screen">{children}</div>
      </PersistGate>
      <Footer />
    </>
  );
}

export default sellerDashboardLayout;
