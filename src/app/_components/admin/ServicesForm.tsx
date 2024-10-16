"use client";
import React, { useState } from "react";
import { api } from "~/trpc/react"; // Your tRPC client setup

// Define the Services interface
interface ServicesEntry {
  id: number;
  content: string;
  isActive: boolean;
}

const ServicesManagement = () => {
  const [content, setContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentEditId, setCurrentEditId] = useState<number | null>(null);

  // Fetch all Services entries
  const { data: servicesList, refetch } =
    api.services.getAllServices.useQuery();

  // Mutation for upserting Services entries
  const upsertServices = api.services.upsertServices.useMutation({
    onSuccess: () => void refetch(), // Explicitly ignore returned promise
  });

  // Mutation for deleting Services entry
  const deleteServices = api.services.deleteServices.useMutation({
    onSuccess: () => void refetch(), // Explicitly ignore returned promise
  });

  // Handle form submission to add/update Services entry
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    upsertServices.mutate({ content, id: currentEditId ?? undefined });
    setContent("");
    setIsEditing(false); // Reset editing state
  };

  // Handle editing a Services entry
  const handleEdit = (services: ServicesEntry) => {
    setContent(services.content);
    setIsEditing(true);
    setCurrentEditId(services.id); // Set current editing Services ID
  };

  // Handle confirming deletion
  const handleDelete = (id: number) => {
    if (
      window.confirm("Are you sure you want to delete this Services entry?")
    ) {
      deleteServices.mutate({ id });
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="mb-6 text-center text-2xl font-semibold">
        Manage Services Entries
      </h1>

      {/* Services Form */}
      <form
        onSubmit={handleSubmit}
        className="mx-auto mb-6 max-w-lg rounded bg-white px-8 pb-8 pt-6 shadow-md"
      >
        <div className="mb-6">
          <label className="mb-2 block text-sm font-bold text-gray-700">
            Services Content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write the Services content here..."
            className="h-24 w-full rounded border px-3 py-2"
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          >
            {isEditing ? "Update Services" : "Save Services"}
          </button>
        </div>
      </form>

      {/* Services List */}
      <h2 className="mb-4 text-center text-xl font-semibold">
        Existing Services Entries
      </h2>
      <ul className="mx-auto max-w-lg space-y-4">
        {servicesList?.map((services: ServicesEntry) => (
          <li
            key={services.id}
            className="flex items-center justify-between rounded bg-white p-4 shadow-md"
          >
            <div>
              <p className="text-lg">{services.content}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(services)}
                className="rounded bg-yellow-500 px-4 py-2 font-bold text-white hover:bg-yellow-700"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(services.id)}
                className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServicesManagement;
