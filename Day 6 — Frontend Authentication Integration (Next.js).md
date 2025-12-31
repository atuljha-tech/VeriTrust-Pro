# Day 6 — Frontend Authentication Integration (Next.js)

## Overview

Day 6 focused on connecting the frontend with backend authentication logic.
Until Day 5, authentication existed only at the API level (JWT issuance and verification).
On Day 6, we integrated authentication into the Next.js frontend, enabling:

* User registration
* User login
* Token handling
* Protected dashboard access
* Auth state persistence across pages

This day converts a backend-only auth system into a real, usable web application.

---

## Objectives

By the end of Day 6, we achieved:

* A structured authentication flow on the frontend
* JWT-based session handling in the browser
* Route-level access control
* Centralized auth logic for reuse
* Clean separation of UI and auth concerns

---

## Folder Structure (Worked Files)

```
app/
 ├── login/
 │    └── page.jsx
 ├── register/
 │    └── page.jsx
 ├── dashboard/
 │    └── page.jsx
 ├── layout.jsx
 └── page.jsx

lib/
 └── auth.js
```

Each folder represents a route in the Next.js App Router.

---

## Authentication Flow (Big Picture)

```
User → Login/Register Page
     → Backend API (JWT issued)
     → Token stored (localStorage)
     → Auth utility validates token
     → Dashboard access granted
```

This is the same architecture used in real-world SaaS applications.

---

## File-by-File Breakdown

### 1. `lib/auth.js` — Core Authentication Logic (MOST IMPORTANT)

#### Purpose

This file centralizes all authentication-related logic, preventing duplication and improving security and maintainability.

#### Why this file is critical

* Avoids auth logic scattered across components
* Makes authentication reusable
* Simplifies future upgrades (cookies, refresh tokens, middleware)

#### Typical responsibilities

* Store JWT
* Retrieve JWT
* Check authentication status
* Logout user

#### Key Concepts You Must Understand

**Token Storage**

```
localStorage.setItem("token", token);
```

* JWT is stored client-side
* Used for authenticated API calls
* Simple but not the most secure (cookies are better later)

**Auth Check**

```
export function isAuthenticated() {
  return !!localStorage.getItem("token");
}
```

* Double-negation converts value to boolean
* `true` = logged in
* `false` = logged out

**Logout**

```
export function logout() {
  localStorage.removeItem("token");
}
```

---

### 2. `app/login/page.jsx` — Login Page

#### Purpose

Allows existing users to authenticate and receive a JWT.

#### Key Flow

* User enters email & password
* Frontend sends request to backend
* Backend verifies credentials
* JWT is returned
* Token is stored
* User is redirected to dashboard

#### Important Concepts

**Controlled Inputs**

```
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
```

* React state controls form values
* Prevents direct DOM manipulation

**API Call**

```
fetch("/api/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, password }),
});
```

* JSON-based communication
* Mirrors backend expectations

---

### 3. `app/register/page.jsx` — Registration Page

#### Purpose

Creates new users and prepares them for authentication.

#### Why registration is separate from login

* Different validation rules
* Different backend logic
* Cleaner UX and better security

#### Typical Flow

* User submits details
* Backend hashes password
* User record created
* Optional auto-login or redirect to login

---

### 4. `app/dashboard/page.jsx` — Protected Route

#### Purpose

Represents a restricted page accessible only to authenticated users.

#### Core Idea

Frontend access control using authentication checks.

**Auth Guard Pattern**

```
useEffect(() => {
  if (!isAuthenticated()) {
    router.push("/login");
  }
}, []);
```

* Runs on component mount
* Redirects unauthenticated users
* Simulates real access control

**Important Limitation (Pro Insight)**

This is client-side protection only.
Backend must still verify JWT for real security.

---

### 5. `app/layout.jsx` — Global Layout

#### Purpose

Provides a shared layout across pages.

#### Why auth matters here

* Navigation logic
* Conditional rendering (Login vs Logout)
* Session-aware UI

---

### 6. `app/page.jsx` — Landing Page

#### Purpose

Public entry point of the application.

#### Role in authentication

* Redirect users based on auth state
* Entry decision logic (login vs dashboard)

---

## Security & Architecture Notes (Industry Perspective)

### What we did right

* Centralized authentication logic
* JWT-based stateless authentication
* Clean route separation
* Scalable and maintainable structure

### Known weaknesses (intentional at this stage)

* `localStorage` is vulnerable to XSS
* No refresh tokens
* No HTTP-only cookies
* Client-side guards only

These are advanced topics introduced in later days.

---

## Common Mistakes to Avoid

* Checking authentication only on the frontend
* Storing sensitive data in React state
* Hardcoding API URLs
* Duplicating auth logic across components

---

## Interview-Relevant Questions

### Beginner

* What is JWT and why is it used?
* Difference between login and registration?
* What is `localStorage`?

### Intermediate

* How does client-side route protection work?
* Why centralize authentication logic?
* How does React handle form state?

### Advanced

* Why is `localStorage` unsafe for tokens?
* How would you implement refresh tokens?
* How does frontend auth differ from backend auth?
* How would you protect routes at the server level in Next.js?

---

## What Day 6 Prepared Us For

* Middleware-based authentication (Day 7+)
* Secure backend route protection
* Role-based access control
* Blockchain-verified identity (later in the project)

---

## One-Line Summary

**Day 6 transformed authentication from an API feature into a full user experience, bridging backend security with frontend usability.**
