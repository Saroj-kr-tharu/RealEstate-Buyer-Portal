<div align="center">

# 🏠 Real Estate E-Commerce Backend

**A Production-Ready RESTful API for Real Estate Listings**

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.x-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15%2B-336791?style=flat-square&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Sequelize](https://img.shields.io/badge/Sequelize-6.x-52B0E7?style=flat-square&logo=sequelize&logoColor=white)](https://sequelize.org/)
[![Zod](https://img.shields.io/badge/Zod-4.x-3E67B1?style=flat-square)](https://zod.dev/)
[![JWT](https://img.shields.io/badge/JWT-Auth-FF6B35?style=flat-square)](https://jwt.io/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=flat-square&logo=docker&logoColor=white)](https://docker.com/)

**Secure** • **Scalable** • **Well-Structured** • **Production-Ready**

*Role-based real estate platform where Agents list properties and Buyers manage favourites — built with clean MVC architecture, Zod validation, and centralized error handling.*

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Highlights](#-key-highlights)
- [Tech Stack](#-tech-stack)
- [Architecture & Design Patterns](#-architecture--design-patterns)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Reference](#-api-reference)
- [Request Validation (Zod)](#-request-validation-zod)
- [Error Handling](#-error-handling)
- [Response Handler](#-response-handler)
- [Async Handler](#-async-handler)
- [Database Schema](#-database-schema)
- [Docker Deployment](#-docker-deployment)
- [License](#-license)

---

## 📖 Overview

A full-featured **Real Estate E-Commerce** backend API that supports two user roles:

| Role | Capabilities |
|:-----|:-------------|
| **Agent** | Create, update, delete, and manage property listings |
| **Buyer** | Browse all properties, favourite/unfavourite listings |

The API provides JWT-based authentication with access & refresh token rotation, Zod schema validation on every request, and a layered architecture that cleanly separates concerns across controllers, services, and repositories.

---

## ✨ Key Highlights

| Feature | Description |
|:--------|:------------|
| 🛡️ **Zod Request Validation** | Schema-based validation middleware for body & params using [Zod](https://zod.dev/) |
| ⚠️ **Custom Error Classes** | `AppError` and `ServiceError` for structured, predictable error propagation |
| 🌐 **Global Error Middleware** | Centralized error handler catches all errors — custom, Sequelize, and unknown |
| 📦 **Response Handler** | Uniform `{ success, message, data }` response format across every endpoint |
| 🔄 **Async Handler** | Promise-based wrapper that forwards rejected promises to the error middleware |
| 🏗️ **MVC + Repository Pattern** | Clean separation: Routes → Controllers → Services → Repositories → Database |
| 🔑 **JWT Authentication** | Access tokens (10m) & refresh tokens (7d) with HttpOnly cookie storage |
| 🔒 **Bcrypt Password Hashing** | Industry-standard one-way hashing with configurable salt rounds |
| 👑 **Role-Based Access Control** | Fine-grained authorization — Agents manage listings, Buyers manage favourites |
| 🐳 **Docker Support** | Production-ready Dockerfile included |

---

## 🛠️ Tech Stack

| Layer | Technology |
|:------|:-----------|
| **Runtime** | Node.js 18+ |
| **Framework** | Express 5.x |
| **Database** | PostgreSQL 15+ |
| **ORM** | Sequelize 6.x |
| **Validation** | Zod 4.x |
| **Authentication** | JSON Web Tokens (jsonwebtoken) |
| **Password Hashing** | bcrypt |
| **Containerization** | Docker (Alpine) |

---

## 🏗️ Architecture & Design Patterns

```
  Client Request
       │
       ▼
┌─────────────┐
│   Routes    │  ── Define endpoints & attach middleware
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Middlewares │  ── Zod validation, token checks, error handling
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Controllers │  ── Handle HTTP req/res, delegate to services
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Services   │  ── Business logic, authorization, orchestration
└──────┬──────┘
       │
       ▼
┌─────────────┐
│Repositories │  ── Data access layer (Sequelize queries)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Database   │  ── PostgreSQL
└─────────────┘
```

**Design Patterns Used:**

- **MVC (Model-View-Controller)** — Routes act as the entry layer, Controllers handle request/response, Services contain business logic, Models define data structure.
- **Repository Pattern** — All database queries are abstracted into repository classes (`curd.repo.js`, `user.repo.js`, `property.repo.js`, `favorite.repo.js`), keeping services database-agnostic.
- **Service Layer Pattern** — Business rules live in service classes that inherit from a generic `CurdService` base class.
- **Middleware Pipeline** — Composable request processing: validation → authentication → controller.
- **Centralized Error Handling** — All errors flow through a single global error middleware.

---

## 📁 Project Structure

```
backend/
├── dockerfile                    # Docker container configuration
├── package.json                  # Dependencies & scripts
├── README.md
│
└── src/
    ├── index.js                  # App entry point — Express setup & server start
    │
    ├── config/
    │   ├── config.json           # Sequelize DB config (dev / test / prod)
    │   └── server.config.js      # Environment variables loader
    │
    ├── controllers/
    │   ├── index.js              # Barrel export
    │   ├── auth.controller.js    # Signup, login, token verify, refresh, logout
    │   ├── property.controller.js# CRUD for property listings
    │   └── buyer.controller.js   # Favourite / unfavourite properties
    │
    ├── middlewares/
    │   ├── index.js              # Barrel export
    │   ├── user.middleware.js    # Zod validation for auth + token checks
    │   ├── property.middleware.js# Zod validation for property operations
    │   └── error.middleware.js   # Global error handler
    │
    ├── models/
    │   ├── index.js              # Sequelize initialization & model loader
    │   ├── user.js               # User model (UUID, roles, refresh token)
    │   ├── property.js           # Property model (title, price, location)
    │   └── favourite.js          # Favourite model (join table: User ↔ Property)
    │
    ├── repository/
    │   ├── curd.repo.js          # Generic CRUD repository (base class)
    │   ├── user.repo.js          # User-specific queries
    │   ├── property.repo.js      # Property-specific queries
    │   └── favorite.repo.js      # Favourite-specific queries
    │
    ├── Routes/
    │   ├── index.js              # Mounts /api/v1 prefix
    │   └── routes/index.js       # All route definitions
    │
    ├── schemas/
    │   ├── user.schema.js        # Zod schemas: SignupSchema, LoginSchema
    │   └── property.schema.js    # Zod schemas: AddProperty, UpdateProperty, PropertyId
    │
    ├── services/
    │   ├── index.js              # Barrel export
    │   ├── curdService.js        # Generic CRUD service (base class)
    │   ├── user.service.js       # Auth business logic
    │   ├── property.service.js   # Property business logic
    │   └── favorite.service.js   # Favourite business logic
    │
    ├── seeders/
    │   └── 20260118170821-users.js
    │
    ├── migrations/
    │   ├── 20251117070636-create-user.js
    │   ├── 20260401073142-create-property.js
    │   └── 20260401073824-create-favourite.js
    │
    └── utlis/
        ├── index.js              # Barrel export for all utilities
        ├── async.handler.js      # Async wrapper — catches rejected promises
        ├── response.handler.js   # Uniform success/error response builder
        ├── https.codes.js        # HTTP status code constants
        ├── jwt.helper.js         # JWT create & verify helpers
        ├── bcrypt.helper.js      # Password comparison helper
        └── Errors/
            ├── AppErrors.js      # AppError class
            └── ServiceError.js   # ServiceError class
```

---

## 🚀 Getting Started

### Prerequisites

| Requirement | Version |
|:-----------|:---------|
| **Node.js** | v18.x or higher |
| **PostgreSQL** | v15.x or higher |
| **npm** | v9.x or higher |

### Installation

```bash
# 1. Clone the repository
git clone <repo-url>
cd backend

# 2. Install dependencies
npm install

# 3. Create a .env file (see Environment Variables section below)

# 4. Create the PostgreSQL database
createdb RealStateDB

# 5. Run migrations
npx sequelize-cli db:migrate

# 6. (Optional) Seed the database
npx sequelize-cli db:seed:all

# 7. Start the development server
npm start
```

The server will start at `http://localhost:<PORT>`.

---

## ⚙️ Environment Variables

Create a `.env` file in the project root:

```env
# Server
PORT=3000

# JWT Secrets (use strong random strings)
PRIVATEJWT=your_access_token_secret_min_32_chars
PRIVATEJWTRefersh=your_refresh_token_secret_min_32_chars

# PostgreSQL (also configure src/config/config.json)
DB_HOST=127.0.0.1
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=RealStateDB
```



---

## 📡 API Reference

All routes are prefixed with `/api/v1`.

### Health Check

| Method | Endpoint | Description |
|:------:|:---------|:------------|
| `GET` | `/api/v1/check` | Server health check |

### Authentication

| Method | Endpoint | Middleware | Description |
|:------:|:---------|:-----------|:------------|
| `POST` | `/api/v1/signup` | Zod `SignupSchema` | Register a new user |
| `POST` | `/api/v1/login` | Zod `LoginSchema` | Login & receive JWT tokens |
| `GET` | `/api/v1/veriyToken` | Token presence check | Verify an access token |
| `POST` | `/api/v1/refresh-token` | Refresh token check | Rotate access & refresh tokens |
| `POST` | `/api/v1/logout` | — | Clear refresh token & logout |

### Properties (Agent Role)

| Method | Endpoint | Middleware | Description |
|:------:|:---------|:-----------|:------------|
| `POST` | `/api/v1/property` | Zod `AddPropertySchema` | Create a new property listing |
| `PATCH` | `/api/v1/property/:id` | Zod `UpdatePropertySchema` + `PropertyIdSchema` | Update a property |
| `DELETE` | `/api/v1/property/:id` | ID presence check | Delete a property |
| `GET` | `/api/v1/propertyAgent` | — | Get all properties by the logged-in agent |

### Properties (Public)

| Method | Endpoint | Description |
|:------:|:---------|:------------|
| `GET` | `/api/v1/property` | Get all property listings |
| `GET` | `/api/v1/property/:id` | Get a single property by ID |

### Favourites (Buyer Role)

| Method | Endpoint | Middleware | Description |
|:------:|:---------|:-----------|:------------|
| `POST` | `/api/v1/favorite/:id` | ID presence check | Add a property to favourites |
| `DELETE` | `/api/v1/favorite/:id` | ID presence check | Remove a property from favourites |
| `GET` | `/api/v1/favorite` | — | Get all favourited properties |

### Request / Response Examples

<details>
<summary><b>POST /api/v1/signup</b></summary>

**Request:**
```json
{
  "email": "agent@example.com",
  "password": "Secure@123",
  "role": "AGENT"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Successfully Signup",
  "data": {
    "id": "b2f7c9a1-...",
    "email": "agent@example.com",
    "role": "AGENT"
  }
}
```

**Validation Error (400):**
```json
{
  "success": false,
  "message": "password: Must contain at least one uppercase letter",
  "data": {}
}
```
</details>

<details>
<summary><b>POST /api/v1/login</b></summary>

**Request:**
```json
{
  "email": "agent@example.com",
  "password": "Secure@123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Successfully Login",
  "data": {
    "email": "agent@example.com",
    "id": "b2f7c9a1-...",
    "role": "AGENT",
    "username": null,
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "isActive": false
  }
}
```

**Headers set:**
```
Set-Cookie: refreshToken=eyJ...; HttpOnly; Secure; SameSite=Strict; Max-Age=604800
```
</details>

<details>
<summary><b>POST /api/v1/property</b></summary>

**Headers:**
```
x-access-token: <JWT access token>
```

**Request:**
```json
{
  "title": "Luxury Villa in Miami",
  "description": "5 bed, 4 bath waterfront property",
  "price": 1250000,
  "location": "Miami, FL",
  "imageUrl": "https://example.com/villa.jpg"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Successfully Created Property",
  "data": {
    "id": "a1c3e5f7-...",
    "title": "Luxury Villa in Miami",
    "description": "5 bed, 4 bath waterfront property",
    "price": "1250000.00",
    "location": "Miami, FL",
    "imageUrl": "https://example.com/villa.jpg",
    "createdBy": "b2f7c9a1-..."
  }
}
```
</details>

---

## 🛡️ Request Validation (Zod)

All incoming requests are validated using **Zod** schemas before reaching the controller. Validation is performed in dedicated middleware classes.

### How It Works

```
Request  →  Middleware (Zod parse)  →  Controller
                 │
                 ├─ ✅ Valid    → req.body/params overwritten with parsed data → next()
                 └─ ❌ Invalid  → 400 response with field-level error messages
```

### Schemas

**User Schemas** (`src/schemas/user.schema.js`):

```js
// SignupSchema
{
  email:    z.string().email().transform(toLowerCase),
  password: z.string().min(8).max(20)
              .refine(hasUppercase)
              .refine(hasNumber)
              .refine(hasSpecialChar),
  role:     z.enum(['AGENT', 'BUYER']).optional()
}

// LoginSchema
{
  email:    z.string().email().transform(toLowerCase),
  password: z.string()
}
```

**Property Schemas** (`src/schemas/property.schema.js`):

```js
// AddPropertySchema
{
  title:       z.string().min(3).max(255),
  description: z.string().optional(),
  price:       z.preprocess(Number, z.number().positive()),
  location:    z.string().min(1),
  imageUrl:    z.string().url().optional().or(z.literal(''))
}

// UpdatePropertySchema — partial version of AddPropertySchema
// PropertyIdSchema     — validates UUID format for :id param
```

### Validation Middleware Example

```js
// Reusable Zod parser inside middleware class
#validate(schema, req, res, next) {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      const messages = err.issues
        .map((e) => `${e.path.join('.')}: ${e.message}`)
        .join(', ');
      return responseHandler.error(res, messages, 400);
    }
    next(err);
  }
}
```

---

## ⚠️ Error Handling

The project implements a **three-layer error handling strategy** — custom error classes, a global error middleware, and an async handler wrapper.

### 1. Custom Error Classes

**`AppError`** — General application-level errors:
```js
class AppError extends Error {
  constructor(name, message, explanation, statusCode = 500) {
    super();
    this.name        = name;
    this.message     = message;
    this.explanation = explanation;
    this.statusCode  = statusCode;
  }
}
```

**`ServiceError`** — Business logic / service-layer errors:
```js
class ServiceErrors extends Error {
  constructor(name, message, explanation, statusCode = 500) {
    super();
    this.name        = 'ServiceError';
    this.message     = message;
    this.explanation = explanation;
    this.statusCode  = statusCode;
  }
}
```

Both classes carry a `statusCode` and `explanation`, enabling the global error middleware to return precise HTTP responses.

### 2. Global Error Middleware

Registered as the **last middleware** in the Express pipeline (`src/middlewares/error.middleware.js`):

```js
const errorMiddleware = (err, req, res, next) => {
  // Custom errors (AppError / ServiceError)
  if (err.statusCode) {
    return responseHandler.error(res, err.message, err.statusCode, { explanation: err.explanation });
  }

  // Sequelize errors
  if (err.name === 'SequelizeUniqueConstraintError')   // → 409 Conflict
  if (err.name === 'SequelizeValidationError')          // → 400 Bad Request
  if (err.name === 'SequelizeForeignKeyConstraintError')// → 400 Bad Request
  if (err.name === 'SequelizeDatabaseError')            // → 500 Internal Server Error

  // Fallback
  return responseHandler.error(res, "Something went wrong");
};
```

### 3. Error Flow

```
Controller / Service throws error
       │
       ▼
asyncHandler catches rejected promise  →  calls next(err)
       │
       ▼
Global Error Middleware
  ├─ Custom Error?      → respond with err.statusCode + err.message
  ├─ Sequelize Error?   → respond with mapped status code
  └─ Unknown Error?     → respond with 500 "Something went wrong"
```

---

## 📦 Response Handler

All API responses follow a **consistent JSON structure** via `src/utlis/response.handler.js`:

### Success Response
```js
responseHandler.success(res, data, message, statusCode)
```
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response
```js
responseHandler.error(res, message, statusCode, data)
```
```json
{
  "success": false,
  "message": "Something went wrong",
  "data": { ... }
}
```

This ensures every endpoint — whether successful or failed — returns a predictable format that frontend clients can reliably parse.

---

## 🔄 Async Handler

A lightweight wrapper (`src/utlis/async.handler.js`) that eliminates repetitive try/catch blocks in controllers and services:

```js
const asyncHandler = (fn) => (req, res, next) => {
  return Promise.resolve(fn(req, res, next)).catch(next);
};
```

**Usage in controllers:**
```js
class AuthController {
  signup = asyncHandler(async (req, res) => {
    const response = await userService.createService(req.body);
    return responseHandler.success(res, response, "Successfully Signup");
  });
}
```

If `userService.createService()` throws, the error is automatically forwarded to the global error middleware — no manual try/catch needed.

---

## 🗃️ Database Schema

Three models with UUID primary keys and Sequelize-managed timestamps.

### User

| Column | Type | Constraints |
|:-------|:-----|:------------|
| `id` | UUID (v4) | Primary Key, Auto-generated |
| `email` | STRING | NOT NULL, UNIQUE, validated |
| `username` | STRING | Optional |
| `password` | STRING | NOT NULL, bcrypt hashed |
| `refreshToken` | TEXT | Nullable |
| `role` | ENUM(`BUYER`, `AGENT`) | NOT NULL, default: `BUYER` |
| `isActive` | BOOLEAN | NOT NULL, default: `false` |
| `createdAt` | TIMESTAMP | Auto-managed |
| `updatedAt` | TIMESTAMP | Auto-managed |

### Property

| Column | Type | Constraints |
|:-------|:-----|:------------|
| `id` | UUID (v4) | Primary Key, Auto-generated |
| `title` | STRING | NOT NULL |
| `description` | TEXT | Optional |
| `price` | DECIMAL(12,2) | NOT NULL |
| `location` | STRING | NOT NULL |
| `imageUrl` | STRING | Optional |
| `createdBy` | UUID | FK → Users.id, ON DELETE CASCADE |
| `createdAt` | TIMESTAMP | Auto-managed |
| `updatedAt` | TIMESTAMP | Auto-managed |

### Favourite (Join Table)

| Column | Type | Constraints |
|:-------|:-----|:------------|
| `id` | UUID (v4) | Primary Key, Auto-generated |
| `userId` | UUID | FK → Users.id |
| `propertyId` | UUID | FK → Properties.id |
| `createdAt` | TIMESTAMP | Auto-managed |
| `updatedAt` | TIMESTAMP | Auto-managed |

### Relationships

```
User (AGENT)  ─── hasMany ───▶  Property       (one agent → many properties)
User (BUYER)  ─── belongsToMany ───▶  Property  (many buyers ↔ many properties via Favourite)
```

---

## 🐳 Docker Deployment

### Build & Run

```bash
# Build the image
docker build -t real-estate-backend .

# Run the container
docker run -d \
  --name real-estate-api \
  -p 3000:3000 \
  --env-file .env \
  real-estate-backend

# View logs
docker logs -f real-estate-api
```

### Dockerfile Overview

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package* ./
RUN npm ci
COPY . .
CMD ["npm", "start"]
```

---

## 🔧 Development Commands

```bash
# Start dev server (with nodemon auto-reload)
npm start

# Run database migrations
npx sequelize-cli db:migrate

# Undo last migration
npx sequelize-cli db:migrate:undo

# Seed the database
npx sequelize-cli db:seed:all

# Generate a new migration
npx sequelize-cli migration:generate --name <migration-name>

# Generate a new model
npx sequelize-cli model:generate --name <ModelName> --attributes <attr>:<type>
```

---

## 📦 Dependencies

| Package | Purpose |
|:--------|:--------|
| `express` | Web framework |
| `sequelize` | PostgreSQL ORM |
| `pg` / `pg-hstore` | PostgreSQL driver |
| `zod` | Request schema validation |
| `jsonwebtoken` | JWT token creation & verification |
| `bcrypt` | Password hashing |
| `cookie-parser` | Parse HTTP cookies |
| `body-parser` | Parse request bodies |
| `dotenv` | Load environment variables |
| `nodemon` | Development auto-reload |
| `sequelize-cli` | Database migration tooling |

---



<div align="center">

**[⬆ Back to Top](#-real-estate-e-commerce-backend)**

</div>
