"use client";
import React, { useState } from "react";
import { api } from "~/trpc/react"; // Your tRPC client setup

// Define the SEOEntry interface
interface SEOEntry {
  id: number;
  pagePath: string;
  title: string;
  description: string;
}

const SEOComponent = () => {
  // Local state for form fields
  const [pagePath, setPagePath] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isEditing, setIsEditing] = useState(false); // Track if editing
  const [currentEditId, setCurrentEditId] = useState<number | null>(null); // Allow null and number

  // Fetch all existing SEO entries
  const { data: seoList, refetch } = api.seo.getAllSeo.useQuery();

  // Mutation for upserting SEO entries
  const upsertSeo = api.seo.upsertSeo.useMutation({
    onSuccess: () => refetch(), // Refetch after mutation
  });

  // Mutation for deleting SEO entry
  const deleteSeo = api.seo.deleteSeo.useMutation({
    onSuccess: () => refetch(), // Refetch after deletion
  });

  // Handle form submission to add/update SEO entry
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    upsertSeo.mutate({ pagePath, title, description });
    setPagePath("");
    setTitle("");
    setDescription("");
    setIsEditing(false); // Reset editing state
  };

  // Handle editing an SEO entry
  const handleEdit = (seo: SEOEntry) => {
    // Use SEOEntry interface
    setPagePath(seo.pagePath);
    setTitle(seo.title);
    setDescription(seo.description);
    setIsEditing(true);
    setCurrentEditId(seo.id); // Set current editing SEO ID
  };

  // Handle confirming deletion
  const handleDelete = (pagePath: string) => {
    if (window.confirm("Are you sure you want to delete this SEO entry?")) {
      deleteSeo.mutate({ pagePath });
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="mb-6 text-center text-2xl font-semibold">
        Manage SEO for Different Pages
      </h1>

      {/* SEO Form */}
      <form
        onSubmit={handleSubmit}
        className="mx-auto mb-6 max-w-lg rounded bg-white px-8 pb-8 pt-6 shadow-md"
      >
        <div className="mb-4">
          <label className="mb-2 block text-sm font-bold text-gray-700">
            Page Path
          </label>
          <input
            type="text"
            value={pagePath}
            onChange={(e) => setPagePath(e.target.value)}
            placeholder="Page Path (e.g., /about)"
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            required
            disabled={isEditing} // Disable pagePath editing when in edit mode
          />
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-sm font-bold text-gray-700">
            Page Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Page Title"
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            required
          />
        </div>

        <div className="mb-6">
          <label className="mb-2 block text-sm font-bold text-gray-700">
            Page Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Page Description"
            className="focus:shadow-outline h-24 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
          >
            {isEditing ? "Update SEO" : "Save SEO"}
          </button>
        </div>
      </form>

      {/* SEO List */}
      <h2 className="mb-4 text-center text-xl font-semibold">
        Existing SEO Entries
      </h2>
      <ul className="mx-auto max-w-lg space-y-4">
        {seoList?.map(
          (
            seo: SEOEntry, // Ensure type for 'seo'
          ) => (
            <li
              key={seo.id}
              className="flex items-center justify-between rounded bg-white p-4 shadow-md"
            >
              <div>
                <p className="text-lg font-medium">{seo.pagePath}</p>
                <p className="text-sm text-gray-600">{seo.title}</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(seo)}
                  className="rounded bg-yellow-500 px-4 py-2 font-bold text-white hover:bg-yellow-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(seo.pagePath)}
                  className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </li>
          ),
        )}
      </ul>
    </div>
  );
};

export default SEOComponent;
