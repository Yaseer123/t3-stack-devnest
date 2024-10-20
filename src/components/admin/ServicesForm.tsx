"use client";
import React, { useState } from "react";
import { api } from "~/trpc/react"; // Your tRPC client setup
import { Button } from "~/components/ui/button"; // Use Button component

// Define the ServicesEntry interface
interface ServicesEntry {
  id: number;
  content: string;
  isActive: boolean;
}

const ServicesManagement = () => {
  const [content, setContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentEditId, setCurrentEditId] = useState<number | null>(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<
    number | null
  >(null); // New state for delete confirmation

  // Fetch all Services entries
  const { data: servicesList, refetch } =
    api.services.getAllServices.useQuery();

  // Mutation for upserting Services entries
  const upsertServices = api.services.upsertServices.useMutation({
    onSuccess: async () => {
      await refetch(); // Await refetch to ensure the data is updated
    },
  });

  // Mutation for deleting Services entry
  const deleteServices = api.services.deleteServices.useMutation({
    onSuccess: async () => {
      await refetch(); // Await refetch after deletion
      setShowDeleteConfirmation(null); // Reset confirmation state after deletion
    },
  });

  // Mutation for setting a Services entry as active
  const setActiveServices = api.services.setActiveServices.useMutation({
    onSuccess: async () => {
      await refetch(); // Await refetch
    },
  });

  // Handle form submission to add/update Services entry
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await upsertServices.mutateAsync({
      content,
      id: currentEditId ?? undefined,
    });
    setContent("");
    setIsEditing(false); // Reset editing state
  };

  // Handle editing a Services entry
  const handleEdit = (services: ServicesEntry) => {
    setContent(services.content);
    setIsEditing(true);
    setCurrentEditId(services.id); // Set current editing Services ID
  };

  // Handle setting an entry as active
  const handleSetActive = async (id: number) => {
    await setActiveServices.mutateAsync({ id }); // Call the mutation to set the entry as active
  };

  // Handle confirming deletion
  const handleDelete = async (id: number) => {
    await deleteServices.mutateAsync({ id }); // Await delete mutation
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="mb-6 text-center text-2xl font-semibold dark:text-white">
        Manage Services Entries
      </h1>

      {/* Services Form */}
      <form
        onSubmit={handleSubmit}
        className="mx-auto mb-6 max-w-lg rounded bg-white px-8 pb-8 pt-6 shadow-md dark:bg-gray-800"
      >
        <div className="mb-6">
          <label className="mb-2 block text-sm font-bold text-gray-700 dark:text-gray-300">
            Services Content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write the Services content here..."
            className="h-24 w-full rounded border px-3 py-2 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <Button type="submit">
            {isEditing ? "Update Services" : "Save Services"}
          </Button>
        </div>
      </form>

      {/* Services List */}
      <h2 className="mb-4 text-center text-xl font-semibold dark:text-white">
        Existing Services Entries
      </h2>
      <ul className="mx-auto max-w-lg space-y-4">
        {servicesList?.map((services: ServicesEntry) => (
          <li
            key={services.id}
            className="flex items-center justify-between rounded bg-white p-4 shadow-md dark:bg-gray-800"
          >
            <div>
              <p className="text-lg dark:text-white">{services.content}</p>
            </div>
            <div className="space-x-2">
              {showDeleteConfirmation === services.id ? (
                <div className="space-x-2">
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(services.id)}
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
                  <Button
                    variant="outline"
                    onClick={() => handleEdit(services)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => setShowDeleteConfirmation(services.id)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="default"
                    onClick={() => handleSetActive(services.id)}
                    disabled={services.isActive}
                  >
                    {services.isActive ? "Active" : "Set Active"}
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

export default ServicesManagement;
