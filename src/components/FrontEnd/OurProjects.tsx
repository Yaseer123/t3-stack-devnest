import React, { useEffect, useRef, useState } from 'react';
import { api } from '~/trpc/react'; // Assuming your trpc setup path
import { Project } from '../types'; // Define a type for projects if not already defined

const SliderSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch projects data
  const { data: projects = [], isLoading, error } = api.projects.getAllProjects.useQuery();

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
    if (projects.length > 0) startAutoSlide();
    return () => stopAutoSlide();
  }, [projects]);

  if (isLoading) return <div>Loading projects...</div>;
  if (error) return <div>Error loading projects: {error.message}</div>;

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
              backgroundImage: `url(${project.imagePaths[0]})`, // Using the first image path
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
          height: 70vh;
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
          text-align: center;
          padding: 20px;
          background-color: rgba(0, 0, 0, 0.5);
        }

        .navigation {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 100%;
          display: flex;
          justify-content: space-between;
          padding: 0 20px;
        }

        .prev,
        .next {
          background-color: transparent;
          color: white;
          border: 2px solid transparent;
          padding: 10px;
          cursor: pointer;
          border-radius: 5px;
          transition: background-color 0.3s ease, border-color 0.3s ease;
        }

        .prev:hover,
        .next:hover {
          background-color: rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </div>
  );
};

export default SliderSection;
