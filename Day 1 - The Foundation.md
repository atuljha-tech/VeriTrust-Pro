# Day 1 – Backend Foundation (Next.js + MongoDB)

## Project Context

This document summarizes **Day 1** of the VeriTrust Pro project. The objective of Day 1 was to establish a **clean, working backend foundation** using **Next.js App Router**, **MongoDB**, and **Postman**, and to fully understand how requests flow from client → server → database.

---

## ✅ What Was Accomplished on Day 1

### 1. Local Development Environment

* Initialized a **Next.js (App Router)** project
* Ran the development server using `npm run dev`
* Verified server availability on `http://localhost:3000`

### 2. Environment Configuration

* Created `.env.local`
* Stored sensitive configuration securely

**Key variable used:**

```
MONGODB_URI=mongodb://127.0.0.1:27017/veritrust
```

This ensures:

* Credentials are not hardcoded
* Config can change across environments (dev, staging, prod)

---

## 📁 Folder & File Responsibilities (Day 1 Scope)

### `/lib/db.js` — Database Connection Layer

**Purpose:**

* Establishes a connection to MongoDB using Mongoose
* Prevents multiple connections during hot reloads

**Core Responsibility:**

* Acts as a **single source of truth** for database connectivity
* Ensures stability and performance

---

### `/models/User.js` — Data Model Definition

**Purpose:**

* Defines the **User schema** using Mongoose

**Key Concepts Learned:**

* Schema-based data validation
* Separation of data structure from business logic

**Role in the system:**

* Controls how user data is stored in MongoDB
* Prevents malformed or unexpected data

---

### `/app/api/users/route.js` — API Route (App Router)

**Purpose:**

* Handles HTTP requests for `/api/users`

**What it does:**

* Connects to MongoDB
* Fetches users from the database
* Returns structured JSON responses

**Concepts covered:**

* REST-style API endpoints
* Server-side request handling
* Response formatting

---

### `/middleware.js` — Middleware Layer

**Purpose:**

* Intercepts requests **before** they reach routes

**Current State (Day 1):**

* Minimal placeholder middleware

```js
export function middleware(request) {
  return;
}
```

**Why it matters:**

* Middleware runs **before API routes and pages**
* Incorrect middleware configuration can block the entire backend

---

## 🧠 What Is Middleware? (Deep Understanding)

Middleware is a **request interception layer**.

It executes:

1. Before API routes
2. Before page rendering
3. Before server logic

### Typical Use Cases (Future Days)

* Authentication (JWT/session checks)
* Authorization (role-based access)
* Rate limiting
* Request logging
* IP filtering

**Critical Insight:**

> A broken middleware can cause every API to return 404 or fail silently.

---

## 🧪 Testing & Verification

### Tool Used: Postman

**Endpoint Tested:**

```
GET http://localhost:3000/api/users
```

**Expected Response:**

```json
{
  "success": true,
  "count": 0,
  "users": []
}
```

### MongoDB Compass

* Connected to local MongoDB instance
* Verified automatic database & collection creation

**Important:**

* MongoDB creates databases/collections automatically on first insert
* No manual setup required on Day 1

---

## 🔁 Request → Response Lifecycle (Observed)

1. Client sends request (Postman / Browser)
2. Middleware executes
3. API route handler runs
4. Database connection established
5. Query executed via model
6. JSON response returned

This lifecycle is the **core mental model** for all backend work.

---

## 📌 Core Knowledge Gained on Day 1

* How Next.js API routes work internally
* How MongoDB integrates with server frameworks
* Why environment variables are mandatory
* How schema-based validation protects data
* Why middleware must be handled with extreme care
* How to verify backend work independently of frontend

---

## 🚀 Standard Checklist When Starting Any Backend Project

Always do these steps **in this order**:

1. Initialize project framework
2. Configure environment variables
3. Set up database connection layer
4. Define core data models
5. Create a test API endpoint
6. Test via Postman (not UI)
7. Confirm DB connectivity
8. Add middleware last

Skipping this order leads to unstable systems.

---

## 🎯 Day 1 Completion Criteria (Met)

* [x] Server running
* [x] Database connected
* [x] API responding
* [x] Middleware understood
* [x] Errors diagnosed & fixed

**Day 1 Status: COMPLETE**

---

## 🔜 What Comes Next

Day 2 will build on this foundation:

* User registration
* Password hashing
* Input validation
* Secure data storage

This Day 1 setup is now reusable for **any future backend project**.
