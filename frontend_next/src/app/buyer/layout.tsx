import Footer from "@/components/GlobalComponents/Footer";
import Navbar from "@/components/GlobalComponents/Navbar";
import Dashboard from "@/components/sellerDahboard/Dashboard";

function sellerDashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Navbar />
      <div className="min-h-screen">{children}</div>
      <Footer />
    </>
  );
}

export default sellerDashboardLayout;
