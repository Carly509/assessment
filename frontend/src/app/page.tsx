import HeaderAndTable from "@/components/HeaderAndTable";

// Example: Replace this with your actual data-fetching logic
async function getClients() {
  // Fetch from external API or database here
  // For demonstration, we'll use a placeholder API
  const res = await fetch("http://localhost:3001/clients", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch clients");
  // Transform data to match your client structure if needed
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
