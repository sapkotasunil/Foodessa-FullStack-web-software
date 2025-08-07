import React from "react";
import Hero from "../componenets/Hero";
import Features from "../componenets/Features";
import PopularFoods from "../componenets/PopularFoods";
import TestoMonials from "../componenets/TestoMonials";
import Footer from "../componenets/Footer";

const Home = () => {
  return (
    <>
      <Hero />
      <Features />
      <PopularFoods />
      <TestoMonials />
      <div className="max-padd-container">
        <div>
          <h2 className="h3">Discover Flavors awaken your taste buds.</h2>
          <p>
            Experience a variety of dishes with the freshest ingredients and
            bold, authentic flavors, Enjoy a delicious journey
          </p>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Home;
