"use client";
import React, { useState } from "react";
import { api } from "~/trpc/react"; // Your tRPC client setup

interface Services {
  id: number;
  content: string;
  isActive: boolean;
  updatedAt: Date;
}

const ServicesManagement = () => {
  const [content, setContent] = useState("");
  const [currentEditId, setCurrentEditId] = useState<number | null>(null);

  // Fetch existing Services content
  const {
    data: servicesList,
    refetch,
    isLoading: isFetching,
  } = api.services.getAllServices.useQuery();

  // Upsert Services content
  const upsertServices = api.services.upsertServices.useMutation({
    onSuccess: () => {
      refetch();
      setContent(""); // Clear form after successful upsert
      setCurrentEditId(null); // Clear current editing state
    },
  });

  // Delete Services content
  const deleteServices = api.services.deleteServices.useMutation({
    onSuccess: () => refetch(),
  });

  // Set active Services
  const setActiveServices = api.services.setActiveServices.useMutation({
    onSuccess: () => refetch(),
  });

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await upsertServices.mutateAsync({
        content,
        id: currentEditId ?? undefined,
      });
    } catch (error) {
      console.error("Error upserting Services content:", error);
    }
  };

  // Handle Edit action
  const handleEdit = (services: Services) => {
    setContent(services.content);
    setCurrentEditId(services.id);
  };

  // Handle Delete action
  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      void deleteServices.mutateAsync({ id }); // Avoid floating promise error
    }
  };

  // Handle Set Active action
  const handleSetActive = (id: number) => {
    void setActiveServices.mutateAsync({ id }); // Avoid floating promise error
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="mb-6 text-2xl font-semibold">Manage Services</h1>

      {/* Form to add new content */}
      <form onSubmit={handleSubmit} className="rounded bg-white p-6 shadow-md">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write the Services content here..."
          className="h-40 w-full rounded border px-3 py-2"
          required
        />
        <button
          type="submit"
          className="mt-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          {currentEditId ? "Update Services" : "Add New Services Entry"}
        </button>
      </form>

      {isFetching ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2 className="mt-6 text-xl font-semibold">
            Existing Services Entries
          </h2>
          <ul className="mt-4">
            {servicesList?.map((services: Services) => (
              <li key={services.id} className="mb-4 rounded border p-4">
                <p>{services.content}</p>
                <div className="mt-2 flex space-x-2">
                  <button
                    onClick={() => handleEdit(services)}
                    className="bg-yellow-500 px-4 py-2 font-bold text-white hover:bg-yellow-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(services.id)}
                    className="bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleSetActive(services.id)}
                    className={`px-4 py-2 font-bold text-white ${
                      services.isActive
                        ? "bg-green-500"
                        : "bg-blue-500 hover:bg-blue-700"
                    }`}
                    disabled={services.isActive}
                  >
                    {services.isActive ? "Active" : "Set Active"}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default ServicesManagement;
