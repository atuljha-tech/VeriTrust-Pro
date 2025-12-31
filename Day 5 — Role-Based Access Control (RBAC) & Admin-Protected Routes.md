# 🛡️ Day 5 — Role-Based Access Control (RBAC) & Admin-Protected Routes

**Project:** VeriTrust Pro — Secure Backend Architecture

---

## 1️⃣ What Day 5 Is About (Big Picture)

By the end of **Day 4**, the system already supported:

* User registration
* User login
* JWT-based authentication
* Protected routes (only logged-in users allowed)

However, real-world systems require a more advanced question to be answered:

> **“Even among logged-in users, should everyone be allowed to access everything?”**

The answer is **No**.

This is where **Role-Based Access Control (RBAC)** is introduced.

Day 5 ensures that:

* Authentication proves *who you are* (Day 4)
* Authorization decides *what you are allowed to do* (Day 5)

---

## 2️⃣ Why Role-Based Access Control Is Needed

In production systems, users are **not equal**.

### Typical Roles

* `user`
* `admin`
* `moderator`
* `manager`

### Real-World Access Patterns

* **Users** → View their own data
* **Admins** → Manage users, delete data, view reports
* **Moderators** → Approve or reject content

Day 5 enforces a **two-layer security model**:

1. All users must be authenticated (JWT required)
2. Only specific roles may access sensitive routes

---

## 3️⃣ Core Concepts Introduced in Day 5

| Concept           | Purpose                                  |
| ----------------- | ---------------------------------------- |
| JWT Payload       | Store user role inside the token         |
| Role Verification | Enforce permissions after authentication |
| Admin-only Routes | Restrict access to privileged users      |
| Authorization     | Decide *what actions* a user can perform |
| Security Design   | Enforce separation of concerns           |

---

## 4️⃣ Folder & File Structure (Day 5)

```
app/
 └── api/
     ├── auth/
     │   ├── register/route.js
     │   └── login/route.js
     ├── protected/route.js
     └── admin/route.js   ← NEW (Day 5)
```

The **admin route** is the key addition in Day 5.

---

## 5️⃣ How Roles Work in VeriTrust Pro

### User Model (Already Exists)

```js
{
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    default: "user"
  }
}
```

### Role Rules

* Every new user starts with role: `user`
* Admins are explicitly assigned role: `admin`
* Role is authoritative on the backend only

---

## 6️⃣ JWT Payload Design (Critical Part)

During login, the JWT is created as follows:

```js
const token = jwt.sign(
  {
    id: user._id,
    role: user.role
  },
  process.env.JWT_SECRET,
  { expiresIn: "7d" }
);
```

### Why Store Role Inside JWT?

* JWT becomes **self-contained**
* No database lookup required on every request
* Faster request processing
* Horizontally scalable (stateless)

This is a **production-grade JWT design pattern**.

---

## 7️⃣ Admin-Only Route (Day 5 Core Feature)

### 📄 `app/api/admin/route.js`

This route enforces **both authentication and authorization**.

Key security checks performed:

1. Validate `Authorization` header format
2. Verify JWT signature and expiration
3. Check user role (`admin` only)
4. Return `403 Forbidden` for unauthorized roles
5. Return `401 Unauthorized` for invalid tokens

This ensures **admin routes are never accessible by normal users**, even if they are logged in.

---

## 8️⃣ Authentication vs Authorization (Very Important)

### Authentication (Day 4)

> **“Who are you?”**

* Valid JWT required
* Token must not be expired
* Identity is verified

### Authorization (Day 5)

> **“Are you allowed to do this?”**

* Role verification (`admin` vs `user`)
* Permission enforcement

📌 **Day 5 = Authorization**

---

## 9️⃣ Testing Day 5 Using Postman

### Step 1 — Login as Normal User

* Access `/api/admin`
* Result → ❌ `403 Forbidden`

### Step 2 — Change Role in Database

```
role: "admin"
```

### Step 3 — Login Again

* New JWT generated with updated role

### Step 4 — Access `/api/admin`

* Result → ✅ Success

---

## 🔑 Important JWT Insight (Interview-Level)

* JWT is generated **only at login**
* Role changes do **not** affect existing tokens
* User must login again to receive updated permissions

This design is:

* Stateless
* Predictable
* Secure
* Scalable

---

## 🔴 Common Mistakes (Avoid These)

* ❌ Trusting frontend role values
* ❌ Forgetting to re-login after role change
* ❌ Hardcoding JWT secrets
* ❌ Allowing admin routes without role checks

All role enforcement **must happen on the server**.

---

## 1️⃣1️⃣ What to Memorize (Projects & Interviews)

Must-know concepts:

* JWT = Authentication
* Role checks = Authorization
* JWT payload is immutable
* Role changes require re-login
* Admin routes must verify role server-side

---

## 1️⃣2️⃣ Industry Perspective

This RBAC design pattern is used in:

* SaaS dashboards
* Banking systems
* Admin panels
* Enterprise portals
* Cybersecurity platforms

You are implementing **real backend security architecture**, not tutorials.

---

## 1️⃣3️⃣ Day 5 Completion Checklist ✅

* ✅ JWT contains role
* ✅ Admin-only route created
* ✅ Role verification enforced
* ✅ Unauthorized users blocked
* ✅ Admin access tested successfully

---

## 🧾 Final Summary

**Day 5 introduces Role-Based Access Control, ensuring that authenticated users can only perform actions permitted by their assigned role — a cornerstone of real-world backend security.**
