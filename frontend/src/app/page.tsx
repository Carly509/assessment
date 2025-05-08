import HeaderAndTable from "@/components/HeaderAndTable";

async function getClients() {

  const res = await fetch("http://localhost:3001/clients", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch clients");
  return await res.json();
}

export default async function HomePage() {
  let clients = [];
  try {
    clients = await getClients();
  } catch (e) {
    return <div>Failed to load clients.</div>;
  }
  return (
    <main style={{ maxWidth: 1278, margin: "2rem auto" }}>
      <HeaderAndTable initialClients={clients} />
    </main>
  );
}
