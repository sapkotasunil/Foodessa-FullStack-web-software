import Dashboard from "@/components/sellerDahboard/Dashboard";

function sellerDashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <Dashboard>{children}</Dashboard>;
}

export default sellerDashboardLayout;
