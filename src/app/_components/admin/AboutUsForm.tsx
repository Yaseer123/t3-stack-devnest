"use client";
import React, { useState } from "react";
import { api } from "~/trpc/react"; // Your tRPC client setup

interface AboutUs {
  id: number;
  content: string;
  isActive: boolean;
  updatedAt: Date;
}

const AboutUsManagement = () => {
  const [content, setContent] = useState("");
  const [currentEditId, setCurrentEditId] = useState<number | null>(null); // Track if editing
  const [isLoading, setIsLoading] = useState(false);

  // Fetch all existing About Us entries
  const {
    data: aboutUsList,
    refetch,
    isLoading: isFetching,
  } = api.aboutUs.getAllAboutUs.useQuery();

  // Upsert About Us content (Create or Update)
  const upsertAboutUs = api.aboutUs.upsertAboutUs.useMutation({
    onSuccess: () => {
      refetch();
      setIsLoading(false);
      setContent("");
      setCurrentEditId(null); // Reset after upsert
    },
  });

  // Set an entry as active
  const setActiveAboutUs = api.aboutUs.setActiveAboutUs.useMutation({
    onSuccess: () => refetch(),
  });

  // Delete About Us entry
  const deleteAboutUs = api.aboutUs.deleteAboutUs.useMutation({
    onSuccess: () => refetch(),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    upsertAboutUs.mutate({
      content,
      id: currentEditId || undefined, // If editing, send the currentEditId
    });
  };

  const handleEdit = (aboutUs: AboutUs) => {
    setContent(aboutUs.content);
    setCurrentEditId(aboutUs.id); // Set ID for editing
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      deleteAboutUs.mutate({ id });
    }
  };

  const handleSetActive = (id: number) => {
    setActiveAboutUs.mutate({ id });
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="mb-6 text-2xl font-semibold">Manage About Us</h1>

      {/* Form to add new content */}
      <form onSubmit={handleSubmit} className="rounded bg-white p-6 shadow-md">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write the About Us content here..."
          className="h-40 w-full rounded border px-3 py-2"
          required
        />
        <button
          type="submit"
          className="mt-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          disabled={isLoading}
        >
          {currentEditId ? "Update About Us" : "Add New About Us Entry"}
        </button>
      </form>

      {/* Show loading state while fetching data */}
      {isFetching ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2 className="mt-6 text-xl font-semibold">
            Existing About Us Entries
          </h2>
          <ul className="mt-4">
            {aboutUsList?.map((aboutUs: AboutUs) => (
              <li key={aboutUs.id} className="mb-4 rounded border p-4">
                <p>{aboutUs.content}</p>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleSetActive(aboutUs.id)}
                    className={`px-4 py-2 font-bold text-white ${
                      aboutUs.isActive
                        ? "bg-green-500"
                        : "bg-blue-500 hover:bg-blue-700"
                    }`}
                    disabled={aboutUs.isActive} // Disable if already active
                  >
                    {aboutUs.isActive ? "Active" : "Set Active"}
                  </button>
                  <button
                    onClick={() => handleEdit(aboutUs)}
                    className="bg-yellow-500 px-4 py-2 font-bold text-white hover:bg-yellow-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(aboutUs.id)}
                    className="bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
                  >
                    Delete
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

export default AboutUsManagement;
