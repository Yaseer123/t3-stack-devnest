"use client"; // Ensures client-side rendering

import React from "react";
import Aboutus from "@components/FrontEnd/AboutusSection";
import ContactSection from "@components/FrontEnd/ContactSection";
import FooterSection from "@components/FrontEnd/FooterSection";
import HeroSection from "@components/FrontEnd/HeroSection";
import AutoScrollLogos from "@components/FrontEnd/MovingCodingLanguages";
import Navbar from "@components/FrontEnd/Navbar";
import ReviewSection from "@components/FrontEnd/ReviewSection";
import SliderSection from "~/components/FrontEnd/OurProjects";
import OurServicesSection from "~/components/FrontEnd/OurServicesSection";
import { AbstractShape, AbstractSphere, Diamond } from "~/components/FrontEnd/ThreeDModel";
import { RobocraftCube } from '../components/FrontEnd/ThreeDModel';

const Home = () => {


  return (
    <div className="bg-black text-white relative overflow-hidden min-h-screen">
      {/* <MagicCube/> */}
      <Diamond/>
      <RobocraftCube/>
      <AbstractShape/>
      <AbstractSphere/>
      <Navbar />
      <HeroSection />
      <AutoScrollLogos />
      <OurServicesSection/>
      <Aboutus />
      <SliderSection/>
      <ReviewSection />
      <ContactSection />
      <FooterSection />
    </div>
  );
};

export default Home;
