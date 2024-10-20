"use client";
import React, { useState } from "react";
import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button"; // Use Button component

// Define the SEOEntry interface
interface SEOEntry {
  id: number;
  pagePath: string;
  title: string;
  description: string;
}

const SEOComponent = () => {
  const [pagePath, setPagePath] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<
    number | null
  >(null); // New state for delete confirmation

  const { data: seoList, refetch } = api.seo.getAllSeo.useQuery();
  const upsertSeo = api.seo.upsertSeo.useMutation({
    onSuccess: () => void refetch(), // Marked with void
  });
  const deleteSeo = api.seo.deleteSeo.useMutation({
    onSuccess: () => {
      void refetch(); // Marked with void
      setShowDeleteConfirmation(null); // Reset delete confirmation after deletion
    },
  });

  // Handle form submission for adding/updating SEO entries
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await upsertSeo.mutateAsync({ pagePath, title, description });
      setPagePath("");
      setTitle("");
      setDescription("");
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving SEO entry:", error);
    }
  };

  // Handle editing an SEO entry
  const handleEdit = (seo: SEOEntry) => {
    setPagePath(seo.pagePath);
    setTitle(seo.title);
    setDescription(seo.description);
    setIsEditing(true);
  };

  // Handle deleting an SEO entry
  const handleDelete = async (pagePath: string) => {
    try {
      await deleteSeo.mutateAsync({ pagePath });
    } catch (error) {
      console.error("Error deleting SEO entry:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="mb-6 text-center text-2xl font-semibold dark:text-white">
        Manage SEO for Different Pages
      </h1>

      {/* Form for adding/editing SEO */}
      <form
        onSubmit={handleSubmit}
        className="mx-auto mb-6 max-w-lg rounded bg-white px-8 pb-8 pt-6 shadow-md dark:bg-gray-800"
      >
        <div className="mb-4">
          <label className="mb-2 block text-sm font-bold text-gray-700 dark:text-gray-300">
            Page Path
          </label>
          <input
            type="text"
            value={pagePath}
            onChange={(e) => setPagePath(e.target.value)}
            placeholder="Page Path (e.g., /about)"
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none dark:bg-gray-700 dark:text-white"
            required
            disabled={isEditing}
          />
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-sm font-bold text-gray-700 dark:text-gray-300">
            Page Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Page Title"
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        <div className="mb-6">
          <label className="mb-2 block text-sm font-bold text-gray-700 dark:text-gray-300">
            Page Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Page Description"
            className="focus:shadow-outline h-24 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <Button type="submit">{isEditing ? "Update SEO" : "Save SEO"}</Button>
        </div>
      </form>

      {/* Display existing SEO entries */}
      <h2 className="mb-4 text-center text-xl font-semibold dark:text-white">
        Existing SEO Entries
      </h2>
      <ul className="mx-auto max-w-lg space-y-4">
        {seoList?.map((seo: SEOEntry) => (
          <li
            key={seo.id}
            className="flex items-center justify-between rounded bg-white p-4 shadow-md dark:bg-gray-800"
          >
            <div>
              <p className="text-lg font-medium dark:text-white">
                {seo.pagePath}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {seo.title}
              </p>
            </div>
            <div className="space-x-2">
              {showDeleteConfirmation === seo.id ? (
                <div className="space-x-2">
                  <Button
                    variant="destructive"
                    onClick={async () => {
                      await handleDelete(seo.pagePath); // Await handleDelete
                    }}
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
                  <Button variant="outline" onClick={() => handleEdit(seo)}>
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => setShowDeleteConfirmation(seo.id)}
                  >
                    Delete
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

export default SEOComponent;
