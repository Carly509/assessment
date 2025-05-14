// app/page.tsx
export const dynamic = "force-dynamic";

import HeaderAndTable from "@/components/HeaderAndTable";

async function getClients() {
const res = await fetch(`${process.env.BACKEND_URL}/clients`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch clients");
  return await res.json();
}

export default async function HomePage() {
  let clients = [];
  let errorMessage = null;

  try {
    clients = await getClients();
  } catch (e) {
    console.error("Error loading clients:", e);
    errorMessage = (e as Error).message;
  }

  return (
    <main style={{ maxWidth: 1278, margin: "2rem auto" }}>
      {errorMessage ? (
        <div style={{ color: "red", textAlign: "center" }}>
          ❌ Failed to load clients: {errorMessage}
        </div>
      ) : (
        <HeaderAndTable initialClients={clients} />
      )}
    </main>
  );
}
