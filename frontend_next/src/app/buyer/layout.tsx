import Footer from "@/components/GlobalComponents/Footer";
import Navbar from "@/components/GlobalComponents/Navbar";
import Dashboard from "@/components/sellerDahboard/Dashboard";

function sellerDashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

export default sellerDashboardLayout;
