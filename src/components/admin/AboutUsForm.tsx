"use client";
import React, { useState } from "react";
import { api } from "~/trpc/react"; // Your tRPC client setup
import { Button } from "~/components/ui/button"; // Use Button component

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
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<
    number | null
  >(null); // New state

  // Fetch all About Us entries
  const { data: aboutUsList, refetch } = api.aboutUs.getAllAboutUs.useQuery();

  // Mutation for upserting About Us entries
  const upsertAboutUs = api.aboutUs.upsertAboutUs.useMutation({
    onSuccess: async () => {
      await refetch(); // Await refetch to ensure the data is updated
    },
  });

  // Mutation for deleting About Us entry
  const deleteAboutUs = api.aboutUs.deleteAboutUs.useMutation({
    onSuccess: async () => {
      await refetch(); // Await refetch after deletion
      setShowDeleteConfirmation(null); // Reset confirmation state after deletion
    },
  });

  // Mutation for setting an About Us entry as active
  const setActiveAboutUs = api.aboutUs.setActiveAboutUs.useMutation({
    onSuccess: async () => {
      await refetch(); // Await refetch
    },
  });

  // Define the handleSetActive function to set an entry as active
  const handleSetActive = async (id: number) => {
    await setActiveAboutUs.mutateAsync({ id }); // Await the mutation
  };

  // Handle form submission to add/update About Us entry
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await upsertAboutUs.mutateAsync({
      content,
      id: currentEditId ?? undefined,
    });
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
  const handleDelete = async (id: number) => {
    await deleteAboutUs.mutateAsync({ id }); // Await delete mutation
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="mb-6 text-center text-2xl font-semibold dark:text-white">
        Manage About Us Entries
      </h1>

      {/* About Us Form */}
      <form
        onSubmit={handleSubmit}
        className="mx-auto mb-6 max-w-lg rounded bg-white px-8 pb-8 pt-6 shadow-md dark:bg-gray-800"
      >
        <div className="mb-6">
          <label className="mb-2 block text-sm font-bold text-gray-700 dark:text-gray-300">
            About Us Content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write the About Us content here..."
            className="h-24 w-full rounded border px-3 py-2 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <Button type="submit">
            {isEditing ? "Update About Us" : "Save About Us"}
          </Button>
        </div>
      </form>

      {/* About Us List */}
      <h2 className="mb-4 text-center text-xl font-semibold dark:text-white">
        Existing About Us Entries
      </h2>
      <ul className="mx-auto max-w-lg space-y-4">
        {aboutUsList?.map((aboutUs: AboutUsEntry) => (
          <li
            key={aboutUs.id}
            className="flex items-center justify-between rounded bg-white p-4 shadow-md dark:bg-gray-800"
          >
            <div>
              <p className="text-lg dark:text-white">{aboutUs.content}</p>
            </div>
            <div className="space-x-2">
              {showDeleteConfirmation === aboutUs.id ? (
                <div className="space-x-2">
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(aboutUs.id)}
                  >
                    Confirm Delete
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowDeleteConfirmation(null)}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <>
                  <Button variant="outline" onClick={() => handleEdit(aboutUs)}>
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => setShowDeleteConfirmation(aboutUs.id)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="default"
                    onClick={() => handleSetActive(aboutUs.id)}
                    disabled={aboutUs.isActive}
                  >
                    {aboutUs.isActive ? "Active" : "Set Active"}
                  </Button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AboutUsManagement;
