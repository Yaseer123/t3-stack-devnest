import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const projectsRouter = createTRPCRouter({
  // Fetch all projects
  getAllProjects: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.project.findMany({
      orderBy: {
        updatedAt: "desc",
      },
    });
  }),

  // Fetch a specific project by ID
  getProjectById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.project.findUnique({
        where: { id: input.id },
      });
    }),

  // Create or update project with multiple image paths
  upsertProject: publicProcedure
    .input(
      z.object({
        id: z.number().optional(),
        title: z.string(),
        description: z.string(),
        imagePaths: z.array(z.string()), // Accepting an array of image paths
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.project.upsert({
        where: { id: input.id ?? 0 }, // If ID exists, update; otherwise, create
        update: {
          title: input.title,
          description: input.description,
          imagePaths: input.imagePaths, // Updating the array of image paths
        },
        create: {
          title: input.title,
          description: input.description,
          imagePaths: input.imagePaths, // Creating with the array of image paths
        },
      });
    }),

  // Delete project
  deleteProject: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.project.delete({
        where: { id: input.id },
      });
    }),
});
