import React from 'react';
import ReviewCard from './ReviewCard';

const ReviewSection: React.FC = () => {
  return (
    <>
      <div className="logo-container overflow-hidden relative w-full">
        <div className="scroll-parent">
          <div className="scroll-element primary border border-gray-400">
            <ReviewCard
              name="Michael Richards 1"
              companyName="GreenWave Energy"
              image="/path-to-image/reviewer.jpg"
              review="AIXOR truly understands the power of storytelling and strategic marketing"
            />
            <ReviewCard
              name="Michael Richards 2"
              companyName="GreenWave Energy"
              image="/path-to-image/reviewer.jpg"
              review="AIXOR truly understands the power of storytelling and strategic marketing"
            />
            <ReviewCard
              name="Michael Richards 3"
              companyName="GreenWave Energy"
              image="/path-to-image/reviewer.jpg"
              review="AIXOR truly understands the power of storytelling and strategic marketing"
            />
            <ReviewCard
              name="Michael Richards 4"
              companyName="GreenWave Energy"
              image="/path-to-image/reviewer.jpg"
              review="AIXOR truly understands the power of storytelling and strategic marketing"
            />
              <ReviewCard
              name="Michael Richards 5"
              companyName="GreenWave Energy"
              image="/path-to-image/reviewer.jpg"
              review="AIXOR truly understands the power of storytelling and strategic marketing"
            />
          </div>
          <div className="scroll-element secondary">
            <ReviewCard
              name="Michael Richards 6"
              companyName="GreenWave Energy"
              image="/path-to-image/reviewer.jpg"
              review="AIXOR truly understands the power of storytelling and strategic marketing"
            />
              <ReviewCard
              name="Michael Richards 7"
              companyName="GreenWave Energy"
              image="/path-to-image/reviewer.jpg"
              review="AIXOR truly understands the power of storytelling and strategic marketing"
            />
              <ReviewCard
              name="Michael Richards 8"
              companyName="GreenWave Energy"
              image="/path-to-image/reviewer.jpg"
              review="AIXOR truly understands the power of storytelling and strategic marketing"
            />
              <ReviewCard
              name="Michael Richards 9"
              companyName="GreenWave Energy"
              image="/path-to-image/reviewer.jpg"
              review="AIXOR truly understands the power of storytelling and strategic marketing"
            />

            <ReviewCard
              name="Michael Richards 10"
              companyName="GreenWave Energy"
              image="/path-to-image/reviewer.jpg"
              review="AIXOR truly understands the power of storytelling and strategic marketing"
            />

          </div>
        </div>
      </div>

      <style jsx>{`
        *,
        *::after,
        *::before {
          margin: 0;
          padding: 0;
          border: none;
          outline: none;
          box-sizing: border-box;
        }

        html {
          font-size: 10px;
        }

        .container {
          display: flex;
          align-items: center;
          height: 100vh;
          width: 100vw;
          overflow: hidden;
        }

        .scroll-parent {
          position: relative;
          width: 100vw;
          height: 30rem;
          padding: 2rem 0;
          overflow-x: hidden;
        }

        .scroll-element {
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0%;
          top: 0%;
          display: flex;
          align-items: center;
          justify-content: space-between; /* Change from space-around to space-between */
          gap: 5rem; /* Adjust gap to your desired spacing */
        }


        .scroll-element img {
          width: 12rem;
          height: auto;
        }

        .primary {
          animation: primary 30s linear infinite; /* Slower animation */
        }

        .secondary {
          animation: secondary 30s linear infinite; /* Slower animation */
        }

        @keyframes primary {
          from {
            left: 0%;
          }
          to {
            left: -100%;
          }
        }

        @keyframes secondary {
          from {
            left: 100%;
          }
          to {
            left: 0%;
          }
        }
      `}</style>
    </>
  );
};

export default ReviewSection;
