import Hero from "@/components/mainHomePage/Hero";
import Features from "@/components/mainHomePage/Features";
import ActionSection from "@/components/mainHomePage/ActionSection";
import Testomonials from "@/components/mainHomePage/Testomonials";
import Footer from "@/components/mainHomePage/Footer";

import Link from "next/link";

export default function mainHome() {
  return (
    <>
      <Hero />
      <Features />
      <ActionSection />
      <Testomonials />
      <Footer />
    </>
  );
}
