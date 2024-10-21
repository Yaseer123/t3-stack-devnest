"use client";
import React, { useState } from "react";
import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import Image from "next/image"; // Import Next.js Image component

interface Review {
  id: number;
  name: string;
  companyName: string | null; // Allow null values for compatibility with backend
  reviewText: string;
  rating: number;
  imagePath: string | null; // Allow null values for image path
  updatedAt: Date;
}

const ReviewsManagement = () => {
  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(1);
  const [imagePath, setImagePath] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentEditId, setCurrentEditId] = useState<number | null>(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<
    number | null
  >(null);

  const { data: reviewList, refetch } = api.reviews.getAllReviews.useQuery();

  const upsertReview = api.reviews.upsertReview.useMutation({
    onSuccess: () => {
      void refetch(); // Refetch the review list after mutation
      setName("");
      setCompanyName("");
      setReviewText("");
      setRating(1);
      setImagePath("");
      setCurrentEditId(null);
      setIsEditing(false);
    },
  });

  const deleteReview = api.reviews.deleteReview.useMutation({
    onSuccess: () => {
      void refetch(); // Refetch the review list after deletion
      setShowDeleteConfirmation(null);
    },
  });

  // Handle form submission for adding/updating reviews
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await upsertReview.mutateAsync({
        name,
        companyName,
        reviewText,
        rating,
        imagePath: `admin/reviews/${imagePath}`, // Save the image path
        id: currentEditId ?? undefined,
      });
    } catch (error) {
      console.error("Error saving review:", error);
    }
  };

  // Handle editing a review
  const handleEdit = (review: Review) => {
    setName(review.name);
    setCompanyName(review.companyName ?? ""); // Use nullish coalescing
    setReviewText(review.reviewText);
    setRating(review.rating);
    setImagePath(review.imagePath?.replace("admin/reviews/", "") ?? ""); // Use nullish coalescing
    setIsEditing(true);
    setCurrentEditId(review.id);
  };

  // Handle deleting a review
  const handleDelete = async (id: number) => {
    try {
      await deleteReview.mutateAsync({ id });
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="mb-6 text-center text-2xl font-semibold dark:text-white">
        Manage Reviews
      </h1>

      {/* Form for adding/editing reviews */}
      <form
        onSubmit={handleSubmit}
        className="mx-auto mb-6 max-w-lg rounded bg-white px-8 pb-8 pt-6 shadow-md dark:bg-gray-800"
      >
        <div className="mb-4">
          <label className="mb-2 block text-sm font-bold text-gray-700 dark:text-gray-300">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Reviewer Name"
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-sm font-bold text-gray-700 dark:text-gray-300">
            Company Name (Optional)
          </label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Company Name"
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-sm font-bold text-gray-700 dark:text-gray-300">
            Review Text
          </label>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Review Text"
            className="focus:shadow-outline h-24 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-sm font-bold text-gray-700 dark:text-gray-300">
            Rating
          </label>
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(parseInt(e.target.value))}
            min="1"
            max="5"
            placeholder="Rating (1-5)"
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        {/* Image path input */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-bold text-gray-700 dark:text-gray-300">
            Image Path
          </label>
          <input
            type="text"
            value={imagePath}
            onChange={(e) => setImagePath(e.target.value)}
            placeholder="Image Path (relative to public folder)"
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        <div className="mt-4 flex items-center justify-between">
          <Button type="submit">
            {isEditing ? "Update Review" : "Save Review"}
          </Button>
        </div>
      </form>

      {/* Display existing reviews */}
      <h2 className="mb-4 text-center text-xl font-semibold dark:text-white">
        Existing Reviews
      </h2>
      <ul className="mx-auto max-w-lg space-y-4">
        {reviewList?.map((review: Review) => (
          <li
            key={review.id}
            className="flex items-center justify-between rounded bg-white p-4 shadow-md dark:bg-gray-800"
          >
            <div>
              <p className="text-lg font-medium dark:text-white">
                {review.name}
              </p>
              {review.companyName && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {review.companyName}
                </p>
              )}
              <p className="mt-2">{review.reviewText}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Rating: {review.rating}/5
              </p>
              {review.imagePath && (
                <Image
                  src={`/${review.imagePath}`} // Render the image
                  alt={review.name}
                  width={300} // Set the width of the image
                  height={200} // Set the height of the image
                  className="mt-2 rounded"
                />
              )}
            </div>
            <div className="space-x-2">
              {showDeleteConfirmation === review.id ? (
                <div className="space-x-2">
                  <Button
                    variant="destructive"
                    onClick={async () => {
                      await handleDelete(review.id); // Await deletion
                    }}
                  >
                    Confirm Delete
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowDeleteConfirmation(null)}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <>
                  <Button variant="outline" onClick={() => handleEdit(review)}>
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => setShowDeleteConfirmation(review.id)}
                  >
                    Delete
                  </Button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewsManagement;
