import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const contactRouter = createTRPCRouter({
  // Create a new contact
  createContact: publicProcedure
    .input(
      z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Invalid email address"),
        phone: z.string().optional(),
        message: z.string().min(1, "Message is required"),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const contact = await ctx.db.contact.create({
        data: {
          name: input.name,
          email: input.email,
          phone: input.phone,
          message: input.message,
        },
      });
      return contact;
    }),

  // Get all contacts
  getContacts: publicProcedure.query(async ({ ctx }) => {
    const contacts = await ctx.db.contact.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return contacts;
  }),

  // Get a single contact by ID
  getContactById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const contact = await ctx.db.contact.findUnique({
        where: { id: input.id },
      });
      if (!contact) {
        throw new Error("Contact not found");
      }
      return contact;
    }),

  // Update the contacted status and notes
  updateContact: publicProcedure
    .input(
      z.object({
        id: z.number(),
        contacted: z.boolean(),
        notes: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const updatedContact = await ctx.db.contact.update({
        where: { id: input.id },
        data: {
          contacted: input.contacted,
          notes: input.notes,
        },
      });
      return updatedContact;
    }),
});
