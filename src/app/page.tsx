"use client"; // Ensure this component is client-side rendered

import React from "react";
import Aboutus from "~/components/FrontEnd/AboutusSection";
import HeroSection from "~/components/FrontEnd/HeroSection";
import Navbar from "~/components/FrontEnd/Navbar";
import MainPage from "~/components/FrontEnd/OueServicesSection";

const Home = () => {
  return (
    <div className="bg-black text-white relative overflow-hidden min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection /> {/* Use the reusable HeroSection component */}

      {/* About Us Section */}
      <div className="relative z-10">
        <Aboutus />
      </div>
      {/* About Us Section */}
      <div className="relative z-10">
        <MainPage />
      </div>
    </div>
  );
};

export default Home;
