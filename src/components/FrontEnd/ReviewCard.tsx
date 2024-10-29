import React from 'react';

interface ReviewCardProps {
  name: string;
  companyName: string;
  image: string;
  review: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ name, companyName, image, review }) => {
  return (
    <div className="review-card">
      <div className="review-stars">★★★★★</div>
      <p className="review-text">&quot;{review}&quot;</p>
      <div className="reviewer-info">
        <img src={image} alt={name} className="reviewer-image" />
        <div className="reviewer-details">
          <span className="reviewer-name">{name}</span>
          <span className="company-name">{companyName}</span>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
