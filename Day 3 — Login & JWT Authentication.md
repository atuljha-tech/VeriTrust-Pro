# Day 3 — Login & JWT Authentication

## What was accomplished on Day 3

On Day 3, VeriTrust Pro moved from **basic user storage** to a **real authentication system**.

You implemented a **secure login mechanism** that:

* Verifies user credentials
* Confirms password correctness without decryption
* Issues a JWT token as proof of authentication

This is the exact pattern used in **industry-grade backend systems**.

---

## Files created / modified

### `app/api/auth/login/route.js`

**Purpose:**
Handles user login and authentication.

Endpoint:

```
POST /api/auth/login
```

This file is responsible for:

* Accepting login credentials
* Validating them securely
* Generating an authentication token

---

## Step-by-step explanation of the login flow

### 1. Database connection

```js
await connectDB();
```

Ensures MongoDB is connected before querying users.

---

### 2. Reading request data

```js
const { email, password } = await req.json();
```

Extracts login credentials sent from the client.

---

### 3. Input validation

```js
if (!email || !password)
```

Prevents empty or malformed login attempts.

---

### 4. User lookup

```js
const user = await User.findOne({ email });
```

Checks whether a user exists with the given email.

If user does not exist → authentication fails.

---

### 5. Password verification (CRITICAL)

```js
bcrypt.compare(password, user.password)
```

**What this does:**

* Takes the plain password entered by the user
* Compares it with the stored hashed password
* Returns `true` or `false`

**Important:**

* Passwords are NEVER decrypted
* Hashes are compared mathematically

---

### 6. JWT token generation (CORE CONCEPT)

```js
jwt.sign(payload, secret, options)
```

Payload used:

```js
{
  id: user._id,
  role: user.role
}
```

**Meaning:**

* `id` → identifies the user
* `role` → enables authorization later

JWT secret:

```js
process.env.JWT_SECRET
```

Expiration:

```js
{ expiresIn: "7d" }
```

The token acts as **proof that the user is authenticated**.

---

### 7. Safe API response

Returned data:

* JWT token
* Public user information

Not returned:

* Password (never expose it)

---

## What is JWT (JSON Web Token)

JWT (JSON Web Token) is a **compact, URL-safe token** used to securely transfer information between a client and a server.

A JWT proves three things:

1. **Who the user is** (identity)
2. **That the server authenticated the user**
3. **That the data was not changed** after being issued

---

### Structure of a JWT

A JWT looks like this:

```
xxxxx.yyyyy.zzzzz
```

It has **three parts**, separated by dots:

1. **Header**
2. **Payload**
3. **Signature**

---

### 1. Header

Contains metadata about the token:

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

Meaning:

* `alg` → algorithm used to sign the token
* `typ` → token type

---

### 2. Payload (VERY IMPORTANT)

Contains **user-related data**:

```json
{
  "id": "userId",
  "role": "user",
  "iat": 123456789,
  "exp": 123456999
}
```

Rules for payload:

* Store **minimum required data** only
* Never store passwords or secrets
* Payload is **Base64 encoded, not encrypted**

Anyone can read payload, but **cannot modify it**.

---

### 3. Signature (SECURITY CORE)

The signature is created using:

* Header
* Payload
* Secret key (`JWT_SECRET`)

If payload is changed, the signature becomes invalid.

This is how the server detects **tampering**.

---

### Why JWT is used instead of sessions

* Stateless (no server-side memory)
* Scales easily
* Works well with APIs
* Ideal for microservices and frontend-backend separation

JWT is **verification**, not encryption.

---

## What you must memorize from the code (VERY IMPORTANT)

You should be able to write or explain from memory:

1. `bcrypt.compare(password, hashedPassword)`
2. `jwt.sign(payload, secret, options)`
3. Why password hashes are never decrypted
4. Why JWT payload should be minimal
5. Why token expiration matters

These are **core backend interview questions**.

---

## Questions you must be able to answer (with short answers)

### 1. Why do we hash passwords but not JWTs?

Passwords must be protected even if the database is leaked, so they are hashed. JWTs are temporary proof tokens and are signed, not stored permanently.

---

### 2. What happens if JWT_SECRET is leaked?

Anyone can generate fake tokens. All tokens become insecure and the secret must be rotated immediately.

---

### 3. Why do we store user ID in JWT, not email?

User ID is immutable and efficient. Emails can change and are less optimal for database queries.

---

### 4. Why does login return a token instead of a session?

Tokens allow stateless authentication and scale better than server-stored sessions.

---

### 5. What happens when the token expires?

The token becomes invalid and the user must log in again to receive a new token.

If you can answer these confidently, you understand authentication correctly.

---

## Common beginner mistakes (you avoided)

* Returning passwords in API responses
* Storing plain passwords
* Creating JWT without expiration
* Putting too much data in JWT payload

---

## Why Day 3 is critical for the whole project

Day 3 enables:

* Protected APIs (Day 4)
* Role-based access (admin vs user)
* Secure blockchain record ownership
* AI actions tied to authenticated users

Without Day 3, VeriTrust Pro cannot be secure.

---

## Day 3 status

✔ Secure login API implemented
✔ Password verification working
✔ JWT token issued correctly
✔ Auth foundation completed

**Day 3 completed successfully.**
