import React, { useEffect, useRef, useState } from 'react';

interface Project {
  title: string;
  description: string;
  image: string;
}

const projects: Project[] = [
  {
    title: 'Artificial Intelligence',
    description: 'You can do more with AI.',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F9ec9eabe66804d1aaf868c725baa037c%2F0226d1c0ff5a4a43b4ac0f11145c56b9',
  },
  {
    title: 'Productivity',
    description: 'Enhance your productivity.',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F9ec9eabe66804d1aaf868c725baa037c%2F15f8e62b2c8248b79e04d8780157f317',
  },
  {
    title: 'Product',
    description: 'Launching Apple Vision.',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F9ec9eabe66804d1aaf868c725baa037c%2F0226d1c0ff5a4a43b4ac0f11145c56b9',
  },
];

const SliderSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoSlide = () => {
    intervalRef.current = setInterval(nextSlide, 5000);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const nextSlide = () => {
    stopAutoSlide();
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
    startAutoSlide();
  };

  const prevSlide = () => {
    stopAutoSlide();
    setCurrentIndex((prevIndex) =>
      (prevIndex - 1 + projects.length) % projects.length
    );
    startAutoSlide();
  };

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, []);

  return (
    <div className="slider-container" ref={sliderRef}>
      <div
        className="slider"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {projects.map((project, index) => (
          <div
            className="slide"
            key={index}
            style={{
              backgroundImage: `url(${project.image})`,
            }}
          >
            <div className="text-container">
              <h2>{project.title}</h2>
              <p>{project.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="navigation">
        <button className="prev" onClick={prevSlide}>
          ←
        </button>
        <button className="next" onClick={nextSlide}>
          →
        </button>
      </div>

      <style jsx>{`
        .slider-container {
          position: relative;
          width: 100%;
          overflow: hidden;
          height: 70vh; /* Set a specific height */
        }

        .slider {
          display: flex;
          transition: transform 0.5s ease;
          height: 100%;
        }

        .slide {
          min-width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          color: white;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }

        .text-container {
          text-align: center; /* Center the text */
          padding: 20px; /* Add some padding for better spacing */
          background-color: rgba(0, 0, 0, 0.5); /* Optional: background for text readability */
        }

        .navigation {
          position: absolute;
          top: 50%;
          transform: translateY(-50%); /* Center vertically */
          width: 100%;
          display: flex;
          justify-content: space-between; /* Space the buttons on left and right */
          padding: 0 20px; /* Add padding for better spacing */
        }

        .prev,
        .next {
          background-color: transparent; /* Initially transparent */
          color: white;
          border: 2px solid transparent; /* Border for hover effect */
          padding: 10px;
          cursor: pointer;
          border-radius: 5px;
          transition: background-color 0.3s ease, border-color 0.3s ease; /* Smooth transition */
        }

        .prev:hover,
        .next:hover {
          background-color: rgba(0, 0, 0, 0.5); /* Background on hover */
        }
      `}</style>
    </div>
  );
};

export default SliderSection;
