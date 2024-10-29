"use client"; // Ensures client-side rendering

import React from "react";
import Aboutus from "@components/FrontEnd/AboutusSection";
import ContactSection from "@components/FrontEnd/ContactSection";
import FooterSection from "@components/FrontEnd/FooterSection";
import HeroSection from "@components/FrontEnd/HeroSection";
import AutoScrollLogos from "@components/FrontEnd/MovingCodingLanguages";
import Navbar from "@components/FrontEnd/Navbar";
import OurServices from "@components/FrontEnd/OurServicesSection";
import ReviewSection from "@components/FrontEnd/ReviewSection";
import { InfiniteMovingCards } from "@components/ui/infinite-moving-cards";

const Home = () => {
  // Example data to satisfy the 'items' requirement
  const testimonials = [
    { quote: "This is amazing!", name: "John Doe", title: "CEO" },
    { quote: "Absolutely fantastic!", name: "Jane Smith", title: "CTO" },
    { quote: "Couldn’t be better!", name: "Alex Johnson", title: "Product Manager" },
  ];

  return (
    <div className="bg-black text-white relative overflow-hidden min-h-screen">
      <Navbar />
      <HeroSection />
      <AutoScrollLogos />
      <OurServices />
      <Aboutus />
      <InfiniteMovingCards
        items={testimonials}   // Pass the required 'items' prop
        direction="left"       // Optional: specify direction
        speed="slow"         // Optional: specify speed
        pauseOnHover={true}    // Optional: specify pause on hover
        className="my-8"       // Optional: add any additional styling
      />
      <ReviewSection />
      <ContactSection />
      <FooterSection />
    </div>
  );
};

export default Home;
