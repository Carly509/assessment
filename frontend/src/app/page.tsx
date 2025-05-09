import HeaderAndTable from "@/components/HeaderAndTable";

async function getClients() {
  // await new Promise(resolve => setTimeout(resolve, 3000));
  const res = await fetch("http://localhost:3001/clients", { cache: "default" });
  if (!res.ok) throw new Error("Failed to fetch clients");
  return await res.json();
}

export default async function HomePage() {
  let clients = [];
  let errorMessage = null;

  try {
    clients = await getClients();
  } catch (e) {
    console.error('Error loading clients:', e);
    errorMessage = (e as Error).message;
  }

  return (
    <main style={{ maxWidth: 1278, margin: "2rem auto" }}>
      {errorMessage ? (
        <div>Failed to load clients: {errorMessage}</div>
      ) : (
        <HeaderAndTable initialClients={clients} />
      )}
    </main>
  );
}
