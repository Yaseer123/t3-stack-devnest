import { postRouter } from "~/server/api/routers/post";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { seoRouter } from "./routers/seo";
import { aboutUsRouter } from "./routers/aboutUs";
import { servicesRouter } from "./routers/services";
import { contactRouter } from "./routers/contact";
import { projectsRouter } from "./routers/projects";
import { reviewsRouter } from "./routers/reviews";
import { allServicesRouter } from "./routers/allServices";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  aboutUs: aboutUsRouter,
  services: servicesRouter,
  allServices: allServicesRouter,
  seo: seoRouter,
  contacts: contactRouter,
  projects: projectsRouter,
  reviews: reviewsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
