# 🗂️ App

A full-stack web app that allows you to:

- **Fetch a list of clients**
- **Apply search filters** by name, birthday, or account type
- **View client details** in a modal
- **Delete client accounts**

This application is built with:

- **Frontend**: Next.js (App Router with Server-Side Rendering)
- **Backend**: NestJS + PostgreSQL + Prisma
- **Managed via a monorepo root** for unified dev workflow

---

## 📁 Project Structure

```
root/
├── frontend/ # Next.js (App Router)
│ ├── public/
│ ├── src/
│ └── ...
├── backend/ # NestJS + Prisma + PostgreSQL
│ ├── src/
│ ├── prisma/
│ └── ...
├── package.json # Root script controller
└── README.md

```
---

## ⚙️ Requirements
- Node.js v18+
- PostgreSQL (locally or cloud)
- npm
---

## 🚀 Getting Started

### 1. Clone the Repository
`bash git clone https://github.com/yourusername/directory-app.git`
and then
`cd client-directory-app`

* * *

### 2\. Configure Backend Environment

Create a `.env` file inside `backend/`:


`DATABASE_URL="postgresql://USERNAME:PASSWORD@localhost:5432/client_directory"`

Make sure PostgreSQL is running and the database exists.

* * *

### 3\. Install All Dependencies

From the root of the project:


`npm run install:all`

> This installs frontend and backend dependencies.

* * *

### 4\. Set Up the Database

`cd backend npx prisma generate npx prisma migrate dev --name init`


### 4.1\. Add fake data to the Database

`npx ts-node prisma/seed.ts`
> This will add 20 fake clients to the database.
> You can modify the `prisma/seed.ts` file to customize the data.

* * *

### 5\. Run the App (Both Frontend + Backend)

From the root of the project:

`npm run dev`

 *   Frontend: [http://localhost:3000](http://localhost:3000)

 *   Backend: [http://localhost:3001](http://localhost:3001)


* * *

## 🌐 SSR with Next.js

The frontend fetches data directly using native `fetch()` inside server components:


`const res = await fetch("http://localhost:3001/clients", { cache: "no-store" }); const data = await res.json();`

> This makes the app fully server-rendered and eliminates the need for client-side data fetching libraries.

* * *

## 🧪 Features

 *   Fully SSR frontend with no client-side fetching libraries

 *   Backend REST API with CRUD (GET + DELETE)

 *   PostgreSQL database via Prisma ORM

 *   Global scripts for managing both projects

 *   Monorepo structure for unified development

 *   Data table with pagination

 *   Search functionality

 *   Framer Motion for fluid, professional animations throughout the UI.

 *   Modal components for actions (Details, Close Account)

* * *

## 🐞 Troubleshooting

 *   **Prisma Errors**: Run `npx prisma generate` and ensure `.env` is correctly configured.

 *   **Port Conflicts**: Make sure ports `3000` (frontend) and `3001` (backend) are available.

 *   **CORS Errors**: Enable CORS in `main.ts` of NestJS:

    `app.enableCors({ origin: 'http://localhost:3000' });`

* * *

## 🧼 Clean Build

`npm run build`
 `npm run start`

> Runs production builds for both frontend and backend.

* * *

## 📄 License

MIT
