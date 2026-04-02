# Real Estate - Buyer Portal

A full-stack real estate platform where **Buyers** can browse and like/dislike properties, and **Agents** can manage property listings.

## Tech Stack

| Layer    | Technology                     |
| -------- | ------------------------------ |
| Frontend | React, Vite, Tailwind CSS     |
| Backend  | Node.js, Express, Sequelize   |
| Database | PostgreSQL                     |
| DevOps   | Docker, Docker Compose         |

---

## Getting Started with Docker Compose

### 1. Create Environment Files

Create an `environment` folder in the project root and add these three files:

```
📁 environment/
  ├── .env.postgres
  ├── .env.backend
  └── .env.fortend
```

**`.env.postgres`**

```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=12345
POSTGRES_DB=POSTGRES_db
```

**`.env.backend`**

```env
PORT=3004
PRIVATEJWT=your_jwt_secret_key
PRIVATEJWTRefersh=your_refresh_jwt_secret_key
FORTEND_URL=http://localhost:5180
```

**`.env.fortend`**

```env
VITE_BACKEND_URL=http://localhost:3004
```

### 2. Run with Docker Compose

```bash
docker-compose up --build
```

This will start:

| Service  | URL                      |
| -------- | ------------------------ |
| Frontend | http://localhost:5180     |
| Backend  | http://localhost:3004     |
| Postgres | localhost:5432           |

> The backend automatically runs migrations and seeds demo data on startup.

### 3. Stop the Project

```bash
docker-compose down
```

---

## Demo Accounts (Seeded)

All demo accounts use the password: **`Test@1234`**

| Role  | Email                    | Username |
| ----- | ------------------------ | -------- |
| Buyer | JohnbBuyer@gmail.com     | John     |
| Buyer | SaritaBuyer@gmail.com    | Sarita   |
| Agent | mahesh@gmail.com         | manesh   |
| Agent | roshan@gmail.com         | roshan   |

---

## App Flow

### Homepage → Login / Signup

1. Open **http://localhost:5180** — you land on the **Homepage** with property listings.
2. Click **Login** or **Signup** from the header.
3. **Signup** — register as a new `BUYER` or `AGENT`.
4. **Login** — use your credentials or a demo account above.
5. After login, you are redirected to your role-based dashboard.

### Buyer Dashboard

- Browse all available properties.
- **Like** properties to save them as favourites.
- **Dislike** (remove) properties from your favourites.

### Agent Dashboard

- View all properties you have listed.
- **Add** a new property listing.
- **Update** an existing property's details.
- **Delete** a property listing.

---

## Project Structure

```
├── Backend/          # Express API server
│   └── src/
│       ├── controllers/
│       ├── models/        # User, Property, Favourite
│       ├── Routes/
│       ├── services/
│       └── middlewares/
├── Fortend/          # React frontend (Vite)
│   └── src/
│       ├── pages/         # Homepage, Login, Signup, Dashboards
│       ├── components/    # Header, Footer, ItemCard
│       ├── redux/         # Auth, Property, Favourite slices
│       └── route/
├── environment/      # Env files (create manually)
└── docker-compose.yml
```
