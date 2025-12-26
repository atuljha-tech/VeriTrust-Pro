# 🔐 Day 4 — Protected Routes & JWT Verification

**Project:** VeriTrust Pro
**Focus:** Backend Authentication Security (JWT)

---

## 📘 Overview — What Day 4 Is About

Day 4 focuses on **securing backend APIs using JWT (JSON Web Tokens)**.

Until Day 3, the system allowed users to:

* Register
* Log in
* Receive a JWT token

However, **any API endpoint could still be accessed without proof of login**.

👉 **Day 4 fixes this by introducing protected routes**, ensuring:

> **Only authenticated users can access sensitive APIs**

This is a **core industry requirement** for any real-world backend system.

---

## 🧱 What Was Built on Day 4

The following security capabilities were implemented:

* ✅ A protected API route
* ✅ JWT verification on every request
* ✅ Secure access using `Authorization: Bearer <token>`
* ✅ User identity extraction from JWT
* ✅ Proper handling of unauthorized access

This completes the **authentication foundation** of VeriTrust Pro.

---

## 📂 Files Created / Used

### `app/api/protected/route.js`

**Endpoint:**

```
GET /api/protected
```

**Purpose:**

* Allow access only if a valid JWT is provided
* Reject unauthenticated or invalid requests

This endpoint represents a **real protected backend API**.

---

## 🔐 What Is a Protected Route? (Beginner Explanation)

A **protected route** is an API that:

* ❌ Rejects requests without authentication
* ❌ Rejects invalid or expired tokens
* ✅ Allows access only after verifying user identity

In simple terms:

> **“If you are not logged in, you are not allowed.”**

---

## 🔄 How Authentication Works (End-to-End Flow)

### Step 1 — User Logs In

* User sends email + password
* Server verifies credentials
* Server generates a JWT token

### Step 2 — Client Stores JWT

* Token is stored on the frontend

  * Memory
  * `localStorage`
  * Cookie

### Step 3 — Client Accesses Protected Route

The request includes this header:

```
Authorization: Bearer <JWT_TOKEN>
```

### Step 4 — Server Verifies JWT

The backend:

* Extracts the token
* Verifies the signature using `JWT_SECRET`
* Confirms token is valid and not expired

### Step 5 — Access Granted or Denied

* ✅ Valid token → access allowed
* ❌ Missing / invalid token → request rejected

---

## 🧠 JWT Verification Logic (Core Concept)

Inside the protected route:

```js
jwt.verify(token, process.env.JWT_SECRET);
```

This **single line** ensures:

* Token was created by this backend
* Token payload was not modified
* Token is still valid

If verification fails → **request is immediately rejected**.

---

## 🔑 Why `JWT_SECRET` Is Critical

`JWT_SECRET` is a **server-only cryptographic key**.

Important facts:

* Stored in `.env.local`
* Never exposed to users
* Never committed to GitHub

The same secret is used to:

* ✍️ Sign JWTs (during login)
* 🔍 Verify JWTs (on protected routes)

### Mental Model

> **JWT_SECRET is the backend’s trust anchor**

---

## 🚫 Why Users Never See `JWT_SECRET`

Users:

* Receive JWT tokens
* Send JWT tokens back to the server

Users **do not**:

* Know how the token was signed
* Know the secret key
* Have the ability to forge tokens

This separation is what makes **JWT secure**.

---

## 🧠 What You Must Memorize From Day 4

### 🔑 Core Ideas (Very Important)

* JWT is proof of authentication
* Protected routes require a valid JWT
* JWT is sent in the `Authorization` header
* JWT is verified using `jwt.verify()`
* `JWT_SECRET` must stay private

### 🔑 Header Format (Must Remember)

```
Authorization: Bearer <token>
```

### 🔑 Verification Line

```js
jwt.verify(token, process.env.JWT_SECRET);
```

---

## ❓ Common Beginner Questions (Answered)

**Q1: Why not send user ID directly?**
Because IDs can be faked; JWT signatures cannot.

**Q2: Why does JWT expire?**
To limit damage if a token is stolen.

**Q3: Can JWT be decrypted?**
No. JWT is **signed**, not encrypted.

**Q4: Why store role inside JWT?**
For future authorization (admin vs user).

**Q5: Why not store JWT in a database?**
JWT is stateless by design.

---

## 🧩 Why Middleware Was Not Used (Important)

Middleware was intentionally avoided at this stage because:

* It adds complexity
* Route-level auth is clearer for learning
* Easier to debug and understand

Middleware will be introduced later when:

* Authorization grows
* Multiple routes require the same checks

---

## 🧭 How Day 4 Fits Into the Full Project

Day 4 enables:

* Secure AI endpoints
* User-specific blockchain records
* Admin-only dashboards
* Role-based access control
* Real production security patterns

Without Day 4, **VeriTrust Pro cannot be secure**.

---

## ✅ Day 4 Status

* ✔ JWT verification implemented
* ✔ Protected route created
* ✔ Unauthorized access blocked
* ✔ Authentication flow complete

---

## 🧾 Final Summary (One Line)

**Day 4 ensures that every sensitive API in VeriTrust Pro is protected by cryptographically verified user identity.**
