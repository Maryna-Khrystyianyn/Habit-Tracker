"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "../store/hooks";
import { setUser } from "../store/userSlice";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("../api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (res.ok) {
        dispatch(setUser({ id: Number(data.user.id), name: data.user.name }));
        router.push(`/user/${data.user.id}`);
    } else {
      setError(data.error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center  gap-4">
      <h1 className="text-2xl font-bold">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-64">
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border p-2 rounded focus:outline focus:outline-[#74a501] "
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="border p-2 rounded focus:outline focus:outline-[#74a501] "
        />
        <button className="bg-[#75a20a] text-white p-2 rounded" type="submit">
          Login
        </button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}