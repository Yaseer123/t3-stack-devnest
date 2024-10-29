import React from 'react';

interface ButtonProps {
  label: string;
  onClick?: () => void;
  className?: string; // Optional for custom styles
}

const Button: React.FC<ButtonProps> = ({ label, onClick, className = '' }) => {
  return (
    <button
      className={`px-6 py-3 border border-white rounded-full text-white hover:bg-white hover:text-black transition duration-1000 ease-in-out hover:animate-none ${className}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
