# Day 2 — Secure User Registration (Authentication Foundation)

## What was achieved today

On Day 2, the first **real authentication feature** of VeriTrust Pro was implemented. The system can now securely register users using a production-grade backend flow. This day focused purely on **backend correctness and security**, not UI.

By the end of Day 2, the application can:

* Accept user registration data via API
* Validate input properly
* Hash passwords securely
* Store users safely in MongoDB
* Prevent duplicate user accounts

This establishes the **auth foundation** on which login, JWT, role-based access, blockchain verification, and AI features will later depend.

---

## Files worked on (and why they exist)

### 1. `models/User.js`

**Purpose:**
Defines how a user is stored in the database. This is the single source of truth for user structure.

**Key responsibilities:**

* Enforces required fields (`name`, `email`, `password`)
* Ensures email uniqueness
* Assigns default role (`user`)
* Automatically tracks creation and update time

**Why this matters:**

* Database structure must be defined before APIs
* Prevents invalid or inconsistent data
* Enables future authorization logic (admin vs user)

---

### 2. `app/api/auth/register/route.js`

**Purpose:**
Implements the **user registration API endpoint**.

Endpoint:

```
POST /api/auth/register
```

**What this API does step by step:**

1. Connects to MongoDB
2. Reads incoming JSON data
3. Validates required fields
4. Checks if user already exists
5. Hashes the password securely
6. Saves user in database
7. Returns safe response (no password)

**Why this file exists separately:**

* Keeps auth logic isolated
* Makes code maintainable and testable
* Matches industry API structure

---

## bcrypt — what it is and why it was used

### What is bcrypt

`bcrypt` is a **cryptographic hashing algorithm** designed specifically for passwords.

### Why passwords are hashed

* Plain text passwords are a critical security risk
* Databases can be leaked or compromised
* Hashing ensures passwords cannot be reversed

### Why bcrypt (not normal hashing)

* Uses **salt** automatically
* Resistant to brute-force attacks
* Industry standard for authentication systems

### What this line does

```js
const hashedPassword = await bcrypt.hash(password, 10);
```

* Converts the password into an irreversible hash
* `10` is the cost factor (security vs performance balance)

**Important:**
Passwords are **never decrypted**. During login, hashes are compared — not passwords.

---

## Core security logic added today

### Input validation

```js
if (!name || !email || !password)
```

Prevents malformed or incomplete requests.

### Duplicate user protection

```js
const existingUser = await User.findOne({ email });
```

Prevents multiple accounts with the same email.

### Safe API response

* Password is never returned
* Only public fields are exposed

### Proper HTTP status codes

* `400` → Bad input
* `409` → Conflict (user exists)
* `201` → Resource created
* `500` → Server error

This mirrors real production APIs.

---

## What MongoDB did automatically

* Created the `users` collection
* Stored documents according to schema
* Enforced uniqueness on email

**Key understanding:**
You never manually create collections in modern MongoDB workflows.

---

## What you must remember (core memorization points)

You must be able to explain **without notes**:

1. Why passwords are hashed
2. Why bcrypt is used
3. Why email uniqueness matters
4. Why API never returns passwords
5. Why auth routes are separated (`/api/auth/...`)
6. How MongoDB creates collections automatically

If you can explain these, you truly understand Day 2.

---

## Reusable startup pattern learned (very important)

Whenever starting **any serious project**, always do this first:

1. Database connection
2. Data models
3. Secure user registration
4. API testing via Postman

Never start with UI or features.

---

## Why Day 2 is critical for the whole project

Everything that comes later depends on this:

* Login & JWT (Day 3)
* Middleware authorization
* Admin dashboards
* Blockchain proof ownership
* AI user-based analysis

If auth is weak, the entire system collapses.

---

## Day 2 status

✔ Secure user registration implemented
✔ Password hashing working
✔ Database structure validated
✔ Industry-grade auth foundation ready

**Day 2 completed successfully.**
