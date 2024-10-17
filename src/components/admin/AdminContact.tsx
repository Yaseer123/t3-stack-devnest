"use client";
import React, { useState } from "react";
import { api } from "~/trpc/react";
import { format } from "date-fns";
import { Button } from "~/components/ui/button"; // Use Button component

const AdminContactPage = () => {
  const {
    data: contacts,
    isLoading,
    error,
    refetch,
  } = api.contacts.getContacts.useQuery();
  const updateContact = api.contacts.updateContact.useMutation({
    onSuccess: async () => {
      await refetch();
    },
  });

  const [editingContactId, setEditingContactId] = useState<number | null>(null);
  const [notes, setNotes] = useState<string>("");

  if (isLoading) return <div>Loading contacts...</div>;
  if (error) return <div>Error loading contacts: {error.message}</div>;

  const handleContactedChange = async (id: number, contacted: boolean) => {
    try {
      await updateContact.mutateAsync({ id, contacted, notes: "" });
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  const handleNotesSubmit = async (id: number) => {
    if (notes.trim() === "") return;
    try {
      await updateContact.mutateAsync({ id, contacted: true, notes });
      setEditingContactId(null);
      setNotes("");
    } catch (error) {
      console.error("Error saving notes:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-2xl font-semibold dark:text-white">
        Contact Management
      </h1>

      <table className="min-w-full table-auto border-collapse border border-gray-300 dark:border-gray-700">
        <thead>
          <tr className="dark:bg-gray-800">
            <th className="border px-4 py-2 dark:border-gray-700 dark:text-white">
              Contacted
            </th>
            <th className="border px-4 py-2 dark:border-gray-700 dark:text-white">
              Name
            </th>
            <th className="border px-4 py-2 dark:border-gray-700 dark:text-white">
              Email
            </th>
            <th className="border px-4 py-2 dark:border-gray-700 dark:text-white">
              Phone
            </th>
            <th className="border px-4 py-2 dark:border-gray-700 dark:text-white">
              Message
            </th>
            <th className="border px-4 py-2 dark:border-gray-700 dark:text-white">
              Notes
            </th>
            <th className="border px-4 py-2 dark:border-gray-700 dark:text-white">
              Contact Date
            </th>
          </tr>
        </thead>
        <tbody>
          {contacts?.map((contact) => (
            <tr
              key={contact.id}
              className="odd:bg-gray-100 even:bg-gray-50 dark:odd:bg-gray-800 dark:even:bg-gray-900"
            >
              <td className="border px-4 py-2 text-center dark:border-gray-700">
                <input
                  type="checkbox"
                  className="h-6 w-6"
                  checked={contact.contacted}
                  onChange={(e) =>
                    handleContactedChange(contact.id, e.target.checked)
                  }
                />
              </td>
              <td className="border px-4 py-2 dark:border-gray-700 dark:text-white">
                {contact.name}
              </td>
              <td className="border px-4 py-2 dark:border-gray-700 dark:text-white">
                {contact.email}
              </td>
              <td className="border px-4 py-2 dark:border-gray-700 dark:text-white">
                {contact.phone ?? "N/A"}
              </td>
              <td className="border px-4 py-2 dark:border-gray-700 dark:text-white">
                {contact.message ?? "No message"}
              </td>
              <td className="border px-4 py-2 dark:border-gray-700 dark:text-white">
                {editingContactId === contact.id ? (
                  <div>
                    <textarea
                      className="w-full rounded border p-2 dark:bg-gray-700 dark:text-white"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                    <div className="mt-2 space-x-2">
                      <Button
                        variant="default"
                        onClick={() => handleNotesSubmit(contact.id)}
                      >
                        Save
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => {
                          setEditingContactId(null);
                          setNotes("");
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    {contact.notes ?? "No notes"}
                    <Button
                      variant="outline"
                      className="ml-2"
                      onClick={() => {
                        setEditingContactId(contact.id);
                        setNotes(contact.notes ?? "");
                      }}
                    >
                      Edit Notes
                    </Button>
                  </>
                )}
              </td>
              <td className="border px-4 py-2 dark:border-gray-700 dark:text-white">
                {format(new Date(contact.createdAt), "yyyy-MM-dd HH:mm:ss")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminContactPage;
