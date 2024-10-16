"use client";
import React, { useState, useEffect } from "react";
import { api } from "~/trpc/react"; // Your tRPC client setup

interface AboutUs {
  id: number;
  content: string;
  isActive: boolean;
  updatedAt: Date;
}

const AboutUsManagement = () => {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Fetch all existing About Us entries
  const {
    data: aboutUsList,
    refetch,
    isLoading: isFetching,
  } = api.aboutUs.getAllAboutUs.useQuery();

  // Upsert About Us content
  const upsertAboutUs = api.aboutUs.upsertAboutUs.useMutation({
    onSuccess: async () => {
      await refetch(); // Ensure this promise is awaited
      setIsLoading(false);
    },
  });

  // Set an entry as active
  const setActiveAboutUs = api.aboutUs.setActiveAboutUs.useMutation({
    onSuccess: async () => {
      await refetch(); // Ensure this promise is awaited
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state when submitting
    try {
      await upsertAboutUs.mutateAsync({ content }); // Await mutation
      setContent(""); // Reset content after submitting
    } catch (error) {
      console.error("Error adding About Us content:", error); // Handle error
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const handleSetActive = async (id: number) => {
    try {
      await setActiveAboutUs.mutateAsync({ id }); // Await mutation
    } catch (error) {
      console.error("Error setting active About Us:", error); // Handle error
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
          Add New About Us Entry
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
                <button
                  onClick={() => void handleSetActive(aboutUs.id)} // Use void operator if you don't want to await the result
                  className={`mt-2 px-4 py-2 font-bold text-white ${
                    aboutUs.isActive
                      ? "bg-green-500"
                      : "bg-blue-500 hover:bg-blue-700"
                  }`}
                  disabled={aboutUs.isActive} // Disable if already active
                >
                  {aboutUs.isActive ? "Active" : "Set Active"}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default AboutUsManagement;
