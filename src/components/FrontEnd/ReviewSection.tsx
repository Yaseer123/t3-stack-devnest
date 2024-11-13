import React, { useEffect, useState } from 'react';
import ReviewCard from './ReviewCard';
import { api } from '~/trpc/react';

interface Review {
  id: number;
  name: string;
  companyName: string | null;
  imagePath: string | null;
  reviewText: string;
}

const ReviewSection: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  const { data: reviewList, refetch } = api.reviews.getAllReviews.useQuery();

  useEffect(() => {
    if (reviewList) {
      setReviews([...reviewList, ...reviewList]); // Duplicate reviews for seamless looping
    }
  }, [reviewList]);

  return (
    <div className="logo-container overflow-hidden relative w-full">
      <div className="scroll-parent">
        <div className="scroll-element primary">
          {reviews.map((review, index) => (
            <ReviewCard
              key={`${review.id}-${index}`}
              name={review.name}
              companyName={review.companyName ?? ''}
              image={`/${review.imagePath ?? 'path-to-default-image'}`}
              review={review.reviewText}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .scroll-parent {
          position: relative;
          width: 100vw;
          height: 30rem;
          overflow: hidden;
          display: flex;
          align-items: center;
        }

        .scroll-element {
          display: flex;
          gap: 5rem;
          animation: scroll 30s linear infinite;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / 2)); /* Move by half the total length */
          }
        }
      `}</style>
    </div>
  );
};

export default ReviewSection;
