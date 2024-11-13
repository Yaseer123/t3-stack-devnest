import React from 'react';

interface ServiceItemProps {
  name: string;
  features: string[];
  persistentBackground?: boolean;
  render3DModel?: React.ReactNode; // Accept the 3D model as a prop
}

const ServiceItem: React.FC<ServiceItemProps> = ({ name, features, persistentBackground = false, render3DModel }) => {
  return (
    <div
      className={`relative space-y-20 flex items-center w-full text-xl text-white ${
        persistentBackground ? 'bg-stone-900' : 'group'
      }`}
      style={{ padding: '1rem 0' }}
    >
      {/* Background on hover for non-persistent items */}
      {!persistentBackground && (
        <div className="absolute inset-0 bg-stone-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      )}

      {/* Service Name (First Column) */}
      <div className="relative w-1/3 flex items-center gap-2 z-10 pl-8">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/240857e34022e195c5f7fe32325c62ad14f6e9fb9d53872ee6cb1d66a7c06945?placeholderIfAbsent=true&apiKey=9ec9eabe66804d1aaf868c725baa037c"
          alt=""
          className="w-4 h-4"
        />
        <span className="font-semibold text-3xl italic">{name}</span>
      </div>

      {/* Features (Second Column) */}
      <div className="relative w-1/3 flex flex-col pl-8 text-gray-200 space-y-1 z-10">
        {features.map((feature, index) => (
          <span key={index} className="flex items-center">
            <span className="mr-2 font-semibold">{["I", "II", "III", "IV"][index]}.</span>
            {feature}
          </span>
        ))}
      </div>

      {/* 3D Illustration (Third Column) */}
      <div className="relative w-1/3 flex justify-center items-center z-10">
        {render3DModel ? (
          <div className="w-24 h-24">{render3DModel}</div> // Adjust size here for compact view
        ) : (
          <div>No 3D model available</div>
        )}
      </div>
    </div>
  );
};

export default ServiceItem;
