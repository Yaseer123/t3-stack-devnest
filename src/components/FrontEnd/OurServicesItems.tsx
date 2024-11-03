import React from 'react';

interface ServiceItemProps {
  name: string;
  features: string[];
  persistentBackground?: boolean;
}

const ServiceItem: React.FC<ServiceItemProps> = ({ name, features, persistentBackground = false }) => {
  return (
    <div
      className={`relative flex items-start w-full text-xl text-white ${
        persistentBackground ? 'bg-stone-900' : 'group'
      }`}
    >
      {/* Background on hover for non-persistent items */}
      {!persistentBackground && (
        <div className="absolute inset-0 bg-stone-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      )}

      {/* Service Name (First Column) */}
      <div className="relative w-1/3 flex items-center gap-2 z-10 py-4 pl-8">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/240857e34022e195c5f7fe32325c62ad14f6e9fb9d53872ee6cb1d66a7c06945?placeholderIfAbsent=true&apiKey=9ec9eabe66804d1aaf868c725baa037c"
          alt=""
          className="w-4 h-4"
        />
        <span className="font-semibold text-5xl italic">{name}</span>
      </div>

      {/* Features (Second Column) */}
      <div className="relative w-1/3 flex flex-col py-4 pl-24 text-gray-200 space-y-2 z-10">
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
      <div className="relative w-1/3 z-10 py-4 pl-8"></div>
    </div>
  );
};

export default ServiceItem;
