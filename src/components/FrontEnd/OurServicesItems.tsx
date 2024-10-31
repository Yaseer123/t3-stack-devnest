import React from 'react';

interface ServiceItemProps {
  name: string;
  features: string[];
}

const ServiceItem: React.FC<ServiceItemProps> = ({ name, features }) => {
  return (
    <div className="flex items-start w-full text-xl text-white py-4">
      {/* Service Name (First Column) */}
      <div className="w-1/3 flex items-center gap-2">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/240857e34022e195c5f7fe32325c62ad14f6e9fb9d53872ee6cb1d66a7c06945?placeholderIfAbsent=true&apiKey=9ec9eabe66804d1aaf868c725baa037c"
          alt=""
          className="w-4 h-4"
        />
        <span className="font-semibold">{name}</span>
      </div>

      {/* Features (Second Column) with Background */}
      <div className="w-1/3 flex flex-col bg-gray-800 p-4 rounded-md text-gray-200 space-y-2">
        {features.map((feature, index) => (
          <span key={index} className="flex items-center">
            <span className="mr-2 font-semibold">
              {["I", "II", "III", "IV"][index]}.
            </span>
            {feature}
          </span>
        ))}
      </div>

      {/* Placeholder for 3D Illustrations (Third Column) */}
      <div className="w-1/3"></div>
    </div>
  );
};

export default ServiceItem;
