"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken, removeToken } from "@/lib/auth";

export default function DashboardPage() {
  const router = useRouter();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = getToken();

    if (!token) {
      router.push("/login");
      return;
    }

    async function fetchProtected() {
      const res = await fetch("/api/protected", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        removeToken();
        router.push("/login");
        return;
      }

      setMessage(data.message);
    }

    fetchProtected();
  }, [router]);

  function logout() {
    removeToken();
    router.push("/login");
  }

  return (
    <div>
      <h2>Dashboard</h2>
      <p>{message}</p>

      <button onClick={logout}>Logout</button>
    </div>
  );
}
