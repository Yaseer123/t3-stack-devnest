"use client"; // Ensure this component is client-side rendered

import React from "react";
import Button from "./button";

const HeroSection = () => {
  return (
    <div className="relative min-h-screen flex flex-col justify-between px-8 py-12">
      {/* Left Side Text */}
      <div className="max-w-lg space-y-6 z-10">
        <p className="text-xl font-light italic leading-relaxed text-[#5B5B5B]">
          “ At AIXOR, we believe that creativity is the catalyst for innovation.
          As a full-service creative agency, we specialise in transforming bold
          ideas into compelling realities.
        </p>
        <p className="text-lg font-light leading-relaxed text-[#5B5B5B]">
          Whether it&apos;s developing a brand identity, creating a user-friendly
          website, or executing a dynamic marketing campaign, we approach every
          project with the same level of dedication and enthusiasm. ”
        </p>
        <div className="pt-8">
          <p className="text-xl font-semibold">Yaseer Arafat K</p>
          <p className="text-lg font-light">Chief Executive Officer</p>
        </div>
      </div>

      {/* Imagination Meets Innovation */}
      <div className="absolute bottom-24 left-8 z-10">
        <div className="left-8 md:left-16 text-9xl font-semibold tracking-tight z-10 imagination-text">
          Imagination <br />
          Meets Innovation
        </div>
      </div>

      {/* Connect Button (Bottom Right) */}
      <div className="absolute bottom-20 right-8 z-10">
        <Button label="Let&apos;s Connect" className="animate-bounce" />
      </div>
    </div>
  );
};

export default HeroSection;
