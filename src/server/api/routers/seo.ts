import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const seoRouter = createTRPCRouter({
  // Query to get SEO settings for a specific page
  getSeoByPage: publicProcedure
    .input(z.object({ pagePath: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.seoSettings.findUnique({
        where: { pagePath: input.pagePath },
      });
    }),

  // Mutation to update the SEO settings (like the 'create' in postRouter)
  upsertSeo: publicProcedure
    .input(
      z.object({
        pagePath: z.string(),
        title: z.string().min(1),
        description: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      console.log("Upserting SEO entry with input:", input); // Log the input
      try {
        const seo = await ctx.db.seoSettings.upsert({
          where: { pagePath: input.pagePath },
          update: {
            title: input.title,
            description: input.description,
          },
          create: {
            pagePath: input.pagePath,
            title: input.title,
            description: input.description,
          },
        });
        console.log("Upsert result:", seo); // Log the result from the database
        return seo;
      } catch (error) {
        console.error("Error during upsert:", error); // Log any errors
        throw new Error("Upsert failed");
      }
    }),

  // Delete SEO entry by page path
  deleteSeo: publicProcedure
    .input(z.object({ pagePath: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.seoSettings.delete({
        where: { pagePath: input.pagePath }, // Use pagePath as the unique identifier
      });
    }),
  // Get all SEO entries
  getAllSeo: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.seoSettings.findMany(); // Fetch all SEO settings
  }),
});
