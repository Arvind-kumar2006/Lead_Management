# SmartLeads — Lead Management Dashboard

A full-stack Lead Management Dashboard built with the MERN stack and TypeScript. Designed for sales teams to track, manage, and move leads through a pipeline with role-based access control.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, TypeScript, TailwindCSS, Vite |
| State Management | Zustand (with persistence) |
| Data Fetching | TanStack React Query v5 |
| Form Handling | React Hook Form |
| Backend | Node.js, Express.js, TypeScript |
| Database | MongoDB + Mongoose |
| Authentication | JWT (JSON Web Tokens) |

---

## Features

- **JWT Authentication** — Secure login and registration with token-based auth
- **Role-Based Access Control** — Admin users can delete leads; Sales users can create and edit
- **Lead CRUD** — Create, read, update, and delete leads with full form validation
- **Pipeline Status Tracking** — Move leads through New → Contacted → Qualified → Lost
- **Real-Time Stats** — Dashboard cards show live counts per status from the database
- **Advanced Filtering** — Filter by status, source, and sort order with live search
- **Debounced Search** — Searches trigger after 500ms to avoid excessive API calls
- **Pagination** — Server-side pagination with smart ellipsis page numbers
- **CSV Export** — Export the current page of leads as a timestamped CSV file
- **Dark Mode** — Toggle persisted across sessions via Zustand
- **Skeleton Loaders** — Loading states use skeleton rows instead of spinners
- **Toast Notifications** — Non-blocking success/error messages auto-dismiss after 3s

---

## Project Structure

```
ServiceHive_assignment/
├── Backend/
│   ├── src/
│   │   ├── config/          # Database connection
│   │   ├── controller/      # Route handlers (auth, leads)
│   │   ├── middleware/       # JWT protect + role authorization
│   │   ├── models/          # Mongoose schemas (User, Lead)
│   │   ├── routes/          # Express routers
│   │   └── server.ts        # Entry point
│   ├── .env.example
│   └── tsconfig.json
│
└── Frontend/
    ├── src/
    │   ├── api/             # Axios instance + typed API functions
    │   ├── components/
    │   │   ├── dashboard/   # StatsCard
    │   │   ├── layout/      # Navbar
    │   │   ├── leads/       # LeadTable, LeadForm, FilterBar, Pagination
    │   │   └── ui/          # Modal, Spinner, StatusBadge, SourceBadge
    │   ├── hooks/           # useDebounce
    │   ├── pages/           # Login, Register, Dashboard
    │   ├── routes/          # ProtectedRoute
    │   ├── store/           # Zustand authStore
    │   ├── types/           # All TypeScript interfaces
    │   └── utils/           # exportCsv
    ├── .env.example
    └── index.html
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB Atlas account (or local MongoDB)
- Git

---

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd ServiceHive_assignment
```

---

### 2. Backend Setup

```bash
cd Backend
npm install
```

Copy the example environment file and fill in your values:

```bash
cp .env.example .env
```

Edit `.env`:

```env
PORT=5555
MONGO_URL=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/<dbname>
JWT_SECRET=your_strong_jwt_secret_here
```

Start the backend:

```bash
npm run dev
```

The backend runs on `http://localhost:5555`.

---

### 3. Frontend Setup

```bash
cd ../Frontend
npm install
```

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env`:

```env
VITE_API_URL=http://localhost:5555/api
```

Start the frontend:

```bash
npm run dev
```

The frontend runs on `http://localhost:5173`.

---

## API Endpoints

### Auth

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Register a new user |
| POST | `/api/auth/login` | Public | Login and receive JWT token |

### Leads

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/leads` | Any logged-in user | Get all leads (with filters & pagination) |
| GET | `/api/leads/:id` | Any logged-in user | Get a single lead |
| POST | `/api/leads` | Any logged-in user | Create a new lead |
| PUT | `/api/leads/:id` | Any logged-in user | Update a lead |
| DELETE | `/api/leads/:id` | Admin only | Delete a lead |

### Query Parameters for GET /api/leads

| Param | Type | Example | Description |
|---|---|---|---|
| `page` | number | `?page=2` | Page number (default: 1) |
| `status` | string | `?status=qualified` | Filter by status |
| `source` | string | `?source=website` | Filter by source |
| `search` | string | `?search=rahul` | Search by name or email |
| `sort` | string | `?sort=oldest` | Sort order (default: latest) |

---

## Lead Schema

| Field | Type | Values |
|---|---|---|
| `name` | String | Any name |
| `email` | String | Valid email |
| `status` | Enum | `new`, `contacted`, `qualified`, `lost` |
| `source` | Enum | `website`, `instagram`, `referral`, `other` |
| `createdBy` | ObjectId | Reference to User |

---

## User Roles

| Role | Permissions |
|---|---|
| `sales` | Create, read, update leads |
| `admin` | Create, read, update, delete leads |

---

## Environment Variables

### Backend (`Backend/.env`)

| Variable | Description | Example |
|---|---|---|
| `PORT` | Port the Express server listens on | `5555` |
| `MONGO_URL` | MongoDB connection string | `mongodb+srv://...` |
| `JWT_SECRET` | Secret key for signing JWT tokens | `my_secret_key` |

### Frontend (`Frontend/.env`)

| Variable | Description | Example |
|---|---|---|
| `VITE_API_URL` | Base URL of the backend API | `http://localhost:5555/api` |

> ⚠️ Never commit `.env` files. Only `.env.example` files are tracked in git.

---

## Scripts

### Backend

```bash
npm run dev      # Start in development mode (ts-node-dev)
npm run build    # Compile TypeScript to JavaScript
npm start        # Run compiled JavaScript
```

### Frontend

```bash
npm run dev      # Start Vite dev server
npm run build    # Build for production (runs tsc + vite build)
npm run preview  # Preview the production build locally
```
