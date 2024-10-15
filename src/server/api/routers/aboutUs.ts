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

  // Fetch the active About Us entry
  getActiveAboutUs: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.aboutUs.findFirst({
      where: { isActive: true },
    });
  }),

  // Upsert About Us content
  upsertAboutUs: publicProcedure
    .input(z.object({ id: z.number().optional(), content: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id, content } = input;

      if (id) {
        // Update if id is provided
        return await ctx.db.aboutUs.update({
          where: { id },
          data: { content },
        });
      } else {
        // Create new if id is not provided
        return await ctx.db.aboutUs.create({
          data: {
            content,
            isActive: false, // By default, new entries are not active
          },
        });
      }
    }),

  // Set a specific About Us entry as active and deactivate others
  setActiveAboutUs: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      // Deactivate all other entries
      await ctx.db.aboutUs.updateMany({
        where: { isActive: true },
        data: { isActive: false },
      });

      // Set the selected entry as active
      return await ctx.db.aboutUs.update({
        where: { id: input.id },
        data: { isActive: true },
      });
    }),

  // Delete About Us entry
  deleteAboutUs: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.aboutUs.delete({
        where: { id: input.id },
      });
    }),
});
