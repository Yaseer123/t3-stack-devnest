import React from "react";

const ServicesSection: React.FC = () => {
  return (
    <div className="flex flex-col items-center py-16">
      <div className="text-white text-4xl mb-8">Services</div>
      <div className="flex flex-wrap gap-10 justify-between items-center w-full text-white max-w-[1097px] max-md:max-w-full">
        <ul className="text-lg">
          <li>Branding Identity</li>
          <li>Interactive Design</li>
          <li>Development</li>
          <li>SEO/Marketing</li>
        </ul>
      </div>
    </div>
  );
};

const FeaturesSection: React.FC = () => {
  return (
    <div className="flex flex-col items-center py-16">
      <div className="text-white text-4xl mb-8">Features</div>
      <div className="flex flex-wrap gap-10 justify-between items-center w-full text-white max-w-[1097px] max-md:max-w-full">
        <ul className="text-lg">
          <li>I. Legacy Modernisation</li>
          <li>II. Solution Design</li>
          <li>III. Technology Enabling</li>
          <li>IV. Mobile-First Systems</li>
        </ul>
      </div>
    </div>
  );
};

const ThreeDModelSection: React.FC = () => {
  return (
    <div className="flex flex-col items-center py-16">
      <div className="text-white text-4xl mb-8">3D Illustrations</div>
      <div className="relative w-full h-96">
        {/* Replace with your 3D model component */}
        <p className="text-lg text-center">3D Model Component Placeholder</p>
      </div>
    </div>
  );
};

const MainPage: React.FC = () => {
  return (
    <div className="bg-black text-white">
      {/* Services Section */}
      <ServicesSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* 3D Illustrations Section */}
      <ThreeDModelSection />
    </div>
  );
};

export default MainPage;
