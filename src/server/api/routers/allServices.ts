import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const allServicesRouter = createTRPCRouter({
  // Fetch all services
  getAllServices: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.allServices.findMany({
      orderBy: {
        updatedAt: "desc",
      },
    });
  }),

  // Create or update a service
  upsertService: publicProcedure
    .input(
      z.object({
        id: z.number().optional(),
        title: z.string(),
        description: z.string(),
        features: z.array(z.string()),
        threeDModelPath: z.string().optional(), // Optional 3D model path
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.allServices.upsert({
        where: { id: input.id ?? 0 },
        update: {
          title: input.title,
          description: input.description,
          features: input.features,
          threeDModelPath: input.threeDModelPath ?? undefined, // Handle undefined
        },
        create: {
          title: input.title,
          description: input.description,
          features: input.features,
          threeDModelPath: input.threeDModelPath ?? undefined, // Handle undefined
        },
      });
    }),

  // Delete a service
  deleteService: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.allServices.delete({
        where: { id: input.id },
      });
    }),
});
