import React from 'react';
import ServiceItem from './OurServicesItems';

const OurServicesSection: React.FC = () => {
  const services = [
    { name: "Branding Identity", features: ["Legacy Modernisation", "Solution Design", "Technology Enabling", "Mobile-First Systems"] },
    { name: "Interactive Design", features: ["Legacy Modernisation", "Solution Design", "Technology Enabling", "Mobile-First Systems"] },
    { name: "SEO/Marketing", features: ["Legacy Modernisation", "Solution Design", "Technology Enabling", "Mobile-First Systems"] },
    { name: "Development", features: ["Legacy Modernisation", "Solution Design", "Technology Enabling", "Mobile-First Systems"] }
  ];

  return (
    <section className="flex flex-col items-center py-12 bg-black text-white min-w-full">
      {/* Header */}
      <div className="flex flex-col w-full max-w-[1110px] px-4">
        <div className="flex gap-4 items-center text-xl">
          <div className="w-4 h-[15px] bg-neutral-600"></div>
          <h2 className="font-bold">Our Services</h2>
        </div>
        <div className="mt-4 text-3xl font-bold">
          <p>At DEVNEST, we offer tailored creative solutions to</p>
          <p>elevate your brand and drive success, exceeding</p>
          <p>your expectations with our expert team&apos;s dedicated</p>
          <p>services.</p>
        </div>
      </div>

      {/* Service and Features Section */}
      <div className="flex flex-wrap gap-5 mt-10 max-w-full w-full justify-center">
        <div className="flex flex-col w-full md:w-2/3 px-4">
          <div className="flex justify-between items-center border-t border-stone-500 py-4 text-xl font-semibold">
            <span className="px-4">Services</span>
            <span className="px-4">Features</span> {/* Adjusted position */}
            <span className="px-4">3D Illustrations</span>
          </div>

          {/* Service List */}
          <div className="flex flex-col mt-8 space-y-8">
            {services.map((service, index) => (
              <ServiceItem key={index} {...service} />
            ))}
          </div>
        </div>

        {/* Illustration Image */}
        <div className="w-full md:w-1/3 flex justify-center px-4">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/ad7981998234ecbf51c68e8d440099723fe5cd6a3338fe4c7e8fff3df7a931e0?placeholderIfAbsent=true&apiKey=9ec9eabe66804d1aaf868c725baa037c"
            alt="Service illustration"
            className="object-contain w-full aspect-[1.18]"
          />
        </div>
      </div>
    </section>
  );
};

export default OurServicesSection;
