import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const reviewsRouter = createTRPCRouter({
  // Fetch all reviews
  getAllReviews: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.review.findMany({
      orderBy: {
        updatedAt: "desc",
      },
    });
  }),

  // Create or update a review
  upsertReview: publicProcedure
    .input(
      z.object({
        id: z.number().optional(),
        name: z.string(),
        companyName: z.string().optional(),
        reviewText: z.string(),
        rating: z.number().min(1).max(5), // Rating from 1 to 5
        imagePath: z.string().optional(), // Optional: Image path
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.review.upsert({
        where: { id: input.id ?? 0 },
        update: {
          name: input.name,
          companyName: input.companyName,
          reviewText: input.reviewText,
          rating: input.rating,
          imagePath: input.imagePath, // Save the image path
        },
        create: {
          name: input.name,
          companyName: input.companyName,
          reviewText: input.reviewText,
          rating: input.rating,
          imagePath: input.imagePath, // Save the image path
        },
      });
    }),

  // Delete a review
  deleteReview: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.review.delete({
        where: { id: input.id },
      });
    }),
});
