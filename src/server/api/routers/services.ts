import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const servicesRouter = createTRPCRouter({
  // Fetch all Services entries
  getAllServices: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.services.findMany({
      orderBy: {
        updatedAt: "desc",
      },
    });
  }),

  // Fetch a specific Services entry by ID
  getServicesById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.services.findUnique({
        where: { id: input.id },
      });
    }),

  // Upsert Services content
  upsertServices: publicProcedure
    .input(
      z.object({
        id: z.number().optional(), // ID is optional for creating new entries
        content: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.services.upsert({
        where: { id: input.id ?? 0 }, // Insert if ID doesn't exist
        update: { content: input.content },
        create: { content: input.content },
      });
    }),

  // Delete Services entry by ID
  deleteServices: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.services.delete({
        where: { id: input.id },
      });
    }),

  // Set a specific Services entry as active
  setActiveServices: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      // Set all other entries to inactive
      await ctx.db.services.updateMany({
        data: { isActive: false },
      });

      // Set the selected entry as active
      return await ctx.db.services.update({
        where: { id: input.id },
        data: { isActive: true },
      });
    }),
});
