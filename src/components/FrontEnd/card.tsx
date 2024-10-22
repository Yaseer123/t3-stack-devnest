import React from "react";
import Image from "next/image";

interface CardProps {
  title: string;
  value: string;
  imageSrc?: string; 
}

const Card: React.FC<CardProps> = ({ title, value, imageSrc }) => {
  return (
    <div className="relative items-start self-stretch my-auto min-w-[240px] w-[250px] group">
      {/* Card Content */}
      <div className="rounded-2xl border border-solid border-white border-opacity-20  aspect-square bg-black h-[250px] w-[250px] relative overflow-hidden group-hover:shadow-lg group-hover:border-transparent transition-all duration-500 ease-in-out">
        {/* Hover Image */}
        {imageSrc && (
          <Image
            src={imageSrc}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"
          />
        )}

        {/* Text and Value (Static position, same in both default and hover state) */}
        <div className="absolute inset-0 flex flex-col justify-between p-4 z-10">
          <div className="text-xs text-right">{title}</div>
          <div className="text-2xl text-left">{value}</div>
        </div>

        {/* Icon Arrow */}
        <div className="absolute bottom-4 right-4 text-white opacity-100">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Card;
