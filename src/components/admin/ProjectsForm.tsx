"use client";
import React, { useState } from "react";
import { api } from "~/trpc/react"; // Your tRPC client setup
import { Button } from "~/components/ui/button"; // Use Button component
import Image from "next/image"; // Import Next.js Image component

interface Project {
  id: number;
  title: string;
  description: string;
  imagePaths: string[];
  updatedAt: Date;
}

const ProjectsManagement = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imagePaths, setImagePaths] = useState<string[]>([""]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEditId, setCurrentEditId] = useState<number | null>(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<
    number | null
  >(null);

  const { data: projectList, refetch } = api.projects.getAllProjects.useQuery();

  const upsertProject = api.projects.upsertProject.useMutation({
    onSuccess: () => {
      void refetch(); // Refetch the project list after mutation
      setTitle("");
      setDescription("");
      setImagePaths([""]);
      setCurrentEditId(null);
      setIsEditing(false);
    },
  });

  const deleteProject = api.projects.deleteProject.useMutation({
    onSuccess: () => {
      void refetch(); // Refetch the project list after deletion
      setShowDeleteConfirmation(null);
    },
  });

  // Handle form submission for adding/updating projects
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Ensure the correct path is stored in the database
      await upsertProject.mutateAsync({
        title,
        description,
        imagePaths: imagePaths.map((path) => `admin/projects/${path}`), // Store the full path
        id: currentEditId ?? undefined,
      });
    } catch (error) {
      console.error("Error saving project:", error);
    }
  };

  // Handle editing a project
  const handleEdit = (project: Project) => {
    setTitle(project.title);
    setDescription(project.description);
    setImagePaths(
      project.imagePaths.map((path) => path.replace("admin/projects/", "")), // Remove the prefix for editing
    );
    setIsEditing(true);
    setCurrentEditId(project.id);
  };

  // Handle deleting a project
  const handleDelete = async (id: number) => {
    try {
      await deleteProject.mutateAsync({ id });
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  // Add a new image field
  const addImageField = () => {
    setImagePaths([...imagePaths, ""]);
  };

  // Handle image input change
  const handleImageChange = (index: number, value: string) => {
    const updatedPaths = [...imagePaths];
    updatedPaths[index] = value;
    setImagePaths(updatedPaths);
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="mb-6 text-center text-2xl font-semibold dark:text-white">
        Manage Projects
      </h1>

      {/* Form for adding/editing projects */}
      <form
        onSubmit={handleSubmit}
        className="mx-auto mb-6 max-w-lg rounded bg-white px-8 pb-8 pt-6 shadow-md dark:bg-gray-800"
      >
        <div className="mb-4">
          <label className="mb-2 block text-sm font-bold text-gray-700 dark:text-gray-300">
            Project Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Project Title"
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-sm font-bold text-gray-700 dark:text-gray-300">
            Project Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Project Description"
            className="focus:shadow-outline h-24 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        {/* Image paths input */}
        {imagePaths.map((imagePath, index) => (
          <div key={index} className="mb-4">
            <label className="mb-2 block text-sm font-bold text-gray-700 dark:text-gray-300">
              Image Path {index + 1}
            </label>
            <input
              type="text"
              value={imagePath}
              onChange={(e) => handleImageChange(index, e.target.value)}
              placeholder="Image Path (relative to public folder)"
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
        ))}

        <Button variant="outline" onClick={addImageField}>
          Add Another Image
        </Button>

        <div className="mt-4 flex items-center justify-between">
          <Button type="submit">
            {isEditing ? "Update Project" : "Save Project"}
          </Button>
        </div>
      </form>

      {/* Display existing projects */}
      <h2 className="mb-4 text-center text-xl font-semibold dark:text-white">
        Existing Projects
      </h2>
      <ul className="mx-auto max-w-lg space-y-4">
        {projectList?.map((project: Project) => (
          <li
            key={project.id}
            className="flex items-center justify-between rounded bg-white p-4 shadow-md dark:bg-gray-800"
          >
            <div>
              <p className="text-lg font-medium dark:text-white">
                {project.title}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {project.description}
              </p>
              {project.imagePaths.map((imagePath, i) => (
                <Image
                  key={i}
                  src={`/${imagePath}`} // Render using the stored full path
                  alt={project.title}
                  width={300} // Set the width of the image
                  height={200} // Set the height of the image
                  className="mt-2 rounded"
                />
              ))}
            </div>
            <div className="space-x-2">
              {showDeleteConfirmation === project.id ? (
                <div className="space-x-2">
                  <Button
                    variant="destructive"
                    onClick={async () => {
                      await handleDelete(project.id); // Await deletion
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
                  <Button variant="outline" onClick={() => handleEdit(project)}>
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => setShowDeleteConfirmation(project.id)}
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

export default ProjectsManagement;
