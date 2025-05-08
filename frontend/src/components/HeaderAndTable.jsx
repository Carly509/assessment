'use client';
import React, { useState, useCallback } from "react";
import Header from "@/components/Header";
import ClientTable from "@/components/ClientTable";
import debounce from "lodash.debounce";
import { AnimatePresence, motion } from "framer-motion";

export default function HeaderAndTable({ initialClients }) {
  const [search, setSearch] = useState({ name: "", birthday: "", type: "" });
  const [originalClientList, setOriginalClientList] = useState(initialClients);
  const [clientList, setClientList] = useState(initialClients);

  // Debounced search for smooth UX
  const debouncedSearch = useCallback(
    debounce((searchObj, list) => {
      setClientList(
        list.filter(client =>
          (searchObj.name === "" || (client.name && client.name.toLowerCase().includes(searchObj.name.toLowerCase()))) &&
          (searchObj.birthday === "" || client.birthday === searchObj.birthday) &&
          (searchObj.type === "" || client.type === searchObj.type)
        )
      );
    }, 300),
    []
  );

  const handleSearch = () => {
    debouncedSearch(search, originalClientList);
  };

  const handleDelete = (account) => {
    setOriginalClientList(prev => prev.filter(c => c.account !== account && c.id !== account));
    setClientList(prev => prev.filter(c => c.account !== account && c.id !== account));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Header search={search} setSearch={setSearch} onSearch={handleSearch} />
      <AnimatePresence>
        <ClientTable
          clients={clientList}
          onDelete={handleDelete}
          key={clientList.length}
        />
      </AnimatePresence>
    </motion.div>
  );
}
