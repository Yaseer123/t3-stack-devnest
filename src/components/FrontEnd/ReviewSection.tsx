import React from 'react';
import { api } from '~/trpc/react'; // Adjust this path to match your project setup
import ReviewCard from './ReviewCard';

const ReviewSection: React.FC = () => {
  // Fetch all reviews using tRPC
  const { data: reviews, isLoading, error } = api.reviews.getAllReviews.useQuery();

  if (isLoading) return <div>Loading reviews...</div>;
  if (error) return <div>Error loading reviews: {error.message}</div>;

  // Split the reviews data into two groups for the two scrolling elements
  const midpoint = Math.ceil((reviews?.length ?? 0) / 2);
  const firstHalf = reviews?.slice(0, midpoint) ?? [];
  const secondHalf = reviews?.slice(midpoint) ?? [];

  return (
    <>
      <div className="logo-container overflow-hidden relative w-full">
        <div className="scroll-parent">
          <div className="scroll-element primary border border-gray-400">
            {firstHalf.map((review) => (
              <ReviewCard
                key={review.id}
                name={review.name}
                companyName={review.companyName ?? ''}
                image={review.imagePath ?? '/path-to-image/default.jpg'} // Use default image if none provided
                review={review.reviewText}
              />
            ))}
          </div>
          <div className="scroll-element secondary">
            {secondHalf.map((review) => (
              <ReviewCard
                key={review.id}
                name={review.name}
                companyName={review.companyName ?? ''}
                image={review.imagePath ?? '/path-to-image/default.jpg'}
                review={review.reviewText}
              />
            ))}
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
          justify-content: space-around;
          gap: 1rem;
        }

        .scroll-element img {
          width: 12rem;
          height: auto;
        }

        .primary {
          animation: primary 30s linear infinite;
        }

        .secondary {
          animation: secondary 30s linear infinite;
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
