"use client";
import React, { useState, useEffect } from "react";
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
  const [isLoading, setIsLoading] = useState(false);

  // Fetch all existing Services entries
  const {
    data: servicesList,
    refetch,
    isLoading: isFetching,
  } = api.services.getAllServices.useQuery();

  // Upsert Services content
  const upsertServices = api.services.upsertServices.useMutation({
    onSuccess: () => {
      refetch();
      setIsLoading(false);
    },
  });

  // Set an entry as active
  const setActiveServices = api.services.setActiveServices.useMutation({
    onSuccess: () => refetch(),
  });

  // Delete a Services entry
  const deleteServices = api.services.deleteServices.useMutation({
    onSuccess: () => refetch(),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state when submitting
    upsertServices.mutate({ content, id: currentEditId ?? undefined });
    setContent(""); // Reset content after submitting
    setCurrentEditId(null); // Reset current edit ID
  };

  const handleEdit = (services: Services) => {
    setContent(services.content);
    setCurrentEditId(services.id); // Set current edit ID
  };

  const handleSetActive = (id: number) => {
    setActiveServices.mutate({ id });
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      deleteServices.mutate({ id });
    }
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

      {/* Show loading state while fetching data */}
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
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleEdit(services)}
                    className="mt-2 bg-yellow-500 px-4 py-2 font-bold text-white hover:bg-yellow-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleSetActive(services.id)}
                    className={`mt-2 px-4 py-2 font-bold text-white ${
                      services.isActive
                        ? "bg-green-500"
                        : "bg-blue-500 hover:bg-blue-700"
                    }`}
                    disabled={services.isActive} // Disable if already active
                  >
                    {services.isActive ? "Active" : "Set Active"}
                  </button>
                  <button
                    onClick={() => handleDelete(services.id)}
                    className="mt-2 bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
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

export default ServicesManagement;
