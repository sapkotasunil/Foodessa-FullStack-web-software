"use client";

import Dashboard from "@/components/sellerDahboard/Dashboard";
import ProtectedRoute from "./dashboard Component/ProtectedRoute";

function sellerDashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ProtectedRoute>
      <Dashboard>{children}</Dashboard>
    </ProtectedRoute>
  );
}

export default sellerDashboardLayout;
