import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const aboutUsRouter = createTRPCRouter({
  // Fetch all About Us entries
  getAllAboutUs: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.aboutUs.findMany({
      orderBy: {
        updatedAt: "desc",
      },
    });
  }),

  // Fetch a specific About Us entry by ID
  getAboutUsById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.aboutUs.findUnique({
        where: { id: input.id },
      });
    }),

  // Upsert About Us content
  upsertAboutUs: publicProcedure
    .input(
      z.object({
        id: z.number().optional(), // ID is optional for creating new entries
        content: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.aboutUs.upsert({
        where: { id: input.id ?? 0 }, // Insert if ID doesn't exist
        update: { content: input.content },
        create: { content: input.content },
      });
    }),

  // Delete About Us entry by ID
  deleteAboutUs: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.aboutUs.delete({
        where: { id: input.id },
      });
    }),

  // Set a specific About Us entry as active
  setActiveAboutUs: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      // Set all other entries to inactive
      await ctx.db.aboutUs.updateMany({
        data: { isActive: false },
      });

      // Set the selected entry as active
      return await ctx.db.aboutUs.update({
        where: { id: input.id },
        data: { isActive: true },
      });
    }),
    getActiveAboutUs: publicProcedure.query(async ({ ctx }) => {
      return await ctx.db.aboutUs.findFirst({
        where: { isActive: true },
      });
    }),
});
