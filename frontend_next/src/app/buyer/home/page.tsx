import Hero from "./components/Hero";
import Features from "./components/Features";
import PopularFoods from "./components/PopularFoods";
import TestimonialsSection from "@/components/mainHomePage/Testomonials";
import Testomonials from "./components/Testomonials";
import Footer from "@/components/GlobalComponents/Footer";
import Navbar from "@/components/GlobalComponents/Navbar";

function home() {
  return (
    <>
      <Hero />
      <Features />
      <PopularFoods />
      <Testomonials />
    </>
  );
}

export default home;
