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
  const [currentEditId, setCurrentEditId] = useState<number | null>(null);

  // Fetch existing About Us content
  const {
    data: aboutUsList,
    refetch,
    isLoading: isFetching,
  } = api.aboutUs.getAllAboutUs.useQuery();

  // Upsert About Us content
  const upsertAboutUs = api.aboutUs.upsertAboutUs.useMutation({
    onSuccess: () => {
      refetch();
      setContent(""); // Clear form after successful upsert
      setCurrentEditId(null); // Clear current editing state
    },
  });

  // Delete About Us content
  const deleteAboutUs = api.aboutUs.deleteAboutUs.useMutation({
    onSuccess: () => refetch(),
  });

  // Set active About Us
  const setActiveAboutUs = api.aboutUs.setActiveAboutUs.useMutation({
    onSuccess: () => refetch(),
  });

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await upsertAboutUs.mutateAsync({
        content,
        id: currentEditId ?? undefined,
      }); // Await mutation
    } catch (error) {
      console.error("Error upserting About Us content:", error);
    }
  };

  // Handle Edit action
  const handleEdit = (aboutUs: AboutUs) => {
    setContent(aboutUs.content);
    setCurrentEditId(aboutUs.id);
  };

  // Handle Delete action
  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      try {
        await deleteAboutUs.mutateAsync({ id }); // Await deletion to handle promise
      } catch (error) {
        console.error("Error deleting About Us entry:", error);
      }
    }
  };

  // Handle Set Active action
  const handleSetActive = async (id: number) => {
    try {
      await setActiveAboutUs.mutateAsync({ id }); // Await mutation for setting active
    } catch (error) {
      console.error("Error setting About Us as active:", error);
    }
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
        >
          {currentEditId ? "Update About Us" : "Add New About Us Entry"}
        </button>
      </form>

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
                <div className="mt-2 flex space-x-2">
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
        </>
      )}
    </div>
  );
};

export default AboutUsManagement;
