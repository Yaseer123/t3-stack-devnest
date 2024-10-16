"use client";
import React, { useState } from "react";
import { api } from "~/trpc/react";

const AdminContactPage = () => {
  const {
    data: contacts,
    isLoading,
    error,
    refetch,
  } = api.contacts.getContacts.useQuery();

  const updateContact = api.contacts.updateContact.useMutation({
    onSuccess: async () => {
      await refetch(); // Refetch contacts after a successful update with await
    },
  });

  const [editingContactId, setEditingContactId] = useState<number | null>(null);
  const [notes, setNotes] = useState<string>("");

  if (isLoading) {
    return <div>Loading contacts...</div>;
  }

  if (error) {
    return <div>Error loading contacts: {error.message}</div>;
  }

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
      <h1 className="mb-6 text-2xl font-semibold">Contact Management</h1>

      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border px-4 py-2">Contacted</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Phone</th>
            <th className="border px-4 py-2">Message</th>
            <th className="border px-4 py-2">Notes</th>
          </tr>
        </thead>
        <tbody>
          {contacts?.map((contact) => (
            <tr key={contact.id} className="odd:bg-gray-100 even:bg-gray-50">
              <td className="border px-4 py-2 text-center">
                <input
                  type="checkbox"
                  className="h-6 w-6" // Increase checkbox size
                  checked={contact.contacted}
                  onChange={(e) =>
                    handleContactedChange(contact.id, e.target.checked)
                  }
                />
              </td>
              <td className="border px-4 py-2">{contact.name}</td>
              <td className="border px-4 py-2">{contact.email}</td>
              <td className="border px-4 py-2">{contact.phone || "N/A"}</td>
              <td className="border px-4 py-2">{contact.message}</td>
              <td className="border px-4 py-2">
                {editingContactId === contact.id ? (
                  <div>
                    <textarea
                      className="w-full rounded border p-2"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                    <div className="mt-2 space-x-2">
                      <button
                        className="rounded bg-blue-500 px-4 py-2 text-white"
                        onClick={() => handleNotesSubmit(contact.id)}
                      >
                        Save
                      </button>
                      <button
                        className="rounded bg-gray-500 px-4 py-2 text-white"
                        onClick={() => {
                          setEditingContactId(null);
                          setNotes("");
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {contact.notes || "No notes"}
                    <button
                      className="ml-2 rounded bg-yellow-500 px-4 py-2 text-white"
                      onClick={() => {
                        setEditingContactId(contact.id);
                        setNotes(contact.notes || "");
                      }}
                    >
                      Edit Notes
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminContactPage;
