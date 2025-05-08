'use client';
import React, { useState } from "react";
import Header from "@/components/Header";
import ClientTable from "@/components/ClientTable";

export default function HeaderAndTable({ initialClients }) {
  const [search, setSearch] = useState({ name: "", birthday: "", type: "" });
  const [originalClientList, setOriginalClientList] = useState(initialClients);
  const [clientList, setClientList] = useState(initialClients);

  const handleSearch = () => {
    setClientList(
      originalClientList.filter(client =>
        (search.name === "" || client.name.toLowerCase().includes(search.name.toLowerCase())) &&
        (search.birthday === "" || client.birthday === search.birthday) &&
        (search.type === "" || client.type === search.type)
      )
    );
  };

  const handleDelete = (account) => {
    setOriginalClientList(prev => prev.filter(c => c.account !== account));
    setClientList(prev => prev.filter(c => c.account !== account));
  };

  return (
    <>
      <Header search={search} setSearch={setSearch} onSearch={handleSearch} />
      <ClientTable clients={clientList} onDelete={handleDelete} />
    </>
  );
}
