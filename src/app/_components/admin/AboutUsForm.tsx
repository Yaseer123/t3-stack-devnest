"use client";
import React, { useState } from "react";
import { api } from "~/trpc/react"; // Your tRPC client setup

// Define the AboutUsEntry interface
interface AboutUsEntry {
  id: number;
  content: string;
  isActive: boolean;
}

const AboutUsManagement = () => {
  const [content, setContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentEditId, setCurrentEditId] = useState<number | null>(null);

  // Fetch all About Us entries
  const { data: aboutUsList, refetch } = api.aboutUs.getAllAboutUs.useQuery();

  // Mutation for upserting About Us entries
  const upsertAboutUs = api.aboutUs.upsertAboutUs.useMutation({
    onSuccess: () => void refetch(), // Explicitly ignore returned promise
  });

  // Mutation for deleting About Us entry
  const deleteAboutUs = api.aboutUs.deleteAboutUs.useMutation({
    onSuccess: () => void refetch(), // Explicitly ignore returned promise
  });

  // Mutation for setting an About Us entry as active
  const setActiveAboutUs = api.aboutUs.setActiveAboutUs.useMutation({
    onSuccess: () => void refetch(), // Explicitly ignore returned promise
  });

  // Handle form submission to add/update About Us entry
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    upsertAboutUs.mutate({ content, id: currentEditId ?? undefined });
    setContent("");
    setIsEditing(false); // Reset editing state
  };

  // Handle editing an About Us entry
  const handleEdit = (aboutUs: AboutUsEntry) => {
    setContent(aboutUs.content);
    setIsEditing(true);
    setCurrentEditId(aboutUs.id); // Set current editing About Us ID
  };

  // Handle confirming deletion
  const handleDelete = (id: number) => {
    if (
      window.confirm("Are you sure you want to delete this About Us entry?")
    ) {
      deleteAboutUs.mutate({ id });
    }
  };

  // Handle setting an entry as active
  const handleSetActive = (id: number) => {
    setActiveAboutUs.mutate({ id });
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="mb-6 text-center text-2xl font-semibold">
        Manage About Us Entries
      </h1>

      {/* About Us Form */}
      <form
        onSubmit={handleSubmit}
        className="mx-auto mb-6 max-w-lg rounded bg-white px-8 pb-8 pt-6 shadow-md"
      >
        <div className="mb-6">
          <label className="mb-2 block text-sm font-bold text-gray-700">
            About Us Content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write the About Us content here..."
            className="h-24 w-full rounded border px-3 py-2"
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          >
            {isEditing ? "Update About Us" : "Save About Us"}
          </button>
        </div>
      </form>

      {/* About Us List */}
      <h2 className="mb-4 text-center text-xl font-semibold">
        Existing About Us Entries
      </h2>
      <ul className="mx-auto max-w-lg space-y-4">
        {aboutUsList?.map((aboutUs: AboutUsEntry) => (
          <li
            key={aboutUs.id}
            className="flex items-center justify-between rounded bg-white p-4 shadow-md"
          >
            <div>
              <p className="text-lg">{aboutUs.content}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(aboutUs)}
                className="rounded bg-yellow-500 px-4 py-2 font-bold text-white hover:bg-yellow-700"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(aboutUs.id)}
                className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
              >
                Delete
              </button>
              <button
                onClick={() => handleSetActive(aboutUs.id)}
                className={`px-4 py-2 font-bold text-white ${
                  aboutUs.isActive
                    ? "bg-green-500"
                    : "bg-blue-500 hover:bg-blue-700"
                }`}
                disabled={aboutUs.isActive}
              >
                {aboutUs.isActive ? "Active" : "Set Active"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AboutUsManagement;
