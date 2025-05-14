'use client';
import React, { useState } from "react";
import Header from "@/components/Header";
import ClientTable from "@/components/ClientTable";
import { AnimatePresence, motion } from "framer-motion";

export default function HeaderAndTable({ initialClients }) {
  const [search, setSearch] = useState({ name: "", birthday: "", type: "" });
  const [originalClientList, setOriginalClientList] = useState(initialClients);
  const [clientList, setClientList] = useState(initialClients);
  const [deletingId, setDeletingId] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");


  const handleSearch = () => {
    setClientList(
      originalClientList.filter(client =>
        (search.name === "" || (client.name && client.name.toLowerCase().includes(search.name.toLowerCase()))) &&
        (search.birthday === "" || client.birthday === search.birthday) &&
        (search.type === "" || client.type === search.type)
      )
    );
  };

  // API DELETE integration using id
  const handleDelete = async (id) => {
    if (deletingId) return; // Prevent double delete
    setDeletingId(id);
    try {
      const res = await fetch(`http://localhost:3001/clients/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete client");
      }
      // Update UI after successful deletion
      setOriginalClientList(prev => prev.filter(c => c.id !== id));
      setClientList(prev => prev.filter(c => c.id !== id));
      setSuccessMessage("Account deleted successfully!");
      setTimeout(() => setSuccessMessage(""), 2500);
    } catch (error) {
      alert("Error deleting client: " + error.message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Success Message */}
      <AnimatePresence>
        {successMessage && (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            style={{
              background: "#4BB543",
              color: "#fff",
              padding: "1rem 2rem",
              borderRadius: "8px",
              position: "fixed",
              top: "2rem",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 2000,
              boxShadow: "0 2px 16px rgba(0,0,0,0.08)"
            }}
          >
            {successMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <Header search={search} setSearch={setSearch} onSearch={handleSearch} />
      <AnimatePresence>
        <ClientTable
          clients={clientList}
          onDelete={handleDelete}
          deletingId={deletingId}
          key={clientList.length}
        />
      </AnimatePresence>
    </motion.div>
  );
}
