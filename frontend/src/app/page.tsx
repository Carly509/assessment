'use client';
import React, { useState } from "react";
import Header from "@/components/Header";
import ClientTable from "@/components/ClientTable";
import { clients as dummyClients } from "@/data/clients";

export default function HomePage() {
  const [search, setSearch] = useState({ name: "", birthday: "", type: "" });
  const [clientList, setClientList] = useState(dummyClients);

  const handleSearch = () => {
    setClientList(
      dummyClients.filter(client =>
        (search.name === "" || client.name.toLowerCase().includes(search.name.toLowerCase())) &&
        (search.birthday === "" || client.birthday === search.birthday) &&
        (search.type === "" || client.type === search.type)
      )
    );
  };

  const handleDelete = (account) => {
    setClientList(prev => prev.filter(c => c.account !== account));
  };

  return (
    <main style={{ maxWidth: 1278, margin: "2rem auto" }}>
      <Header search={search} setSearch={setSearch} onSearch={handleSearch} />
      <ClientTable clients={clientList} onDelete={handleDelete} />
    </main>
  );
}
