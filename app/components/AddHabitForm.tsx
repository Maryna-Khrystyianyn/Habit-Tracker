"use client";

import React, { useState } from "react";
import { useAppSelector } from "../store/hooks";

type AddHabitFormProps = {
  onHabitAdded: () => void;
};

export default function AddHabitForm({ onHabitAdded }: AddHabitFormProps) {
  const user = useAppSelector((state) => state.user); // user.id з Redux
  const [habitName, setHabitName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user.id) {
      setMessage("User is not logged in");
      return;
    }

    const res = await fetch(`/api/userHabits/${user.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: habitName,
        description,
      }),
    });

    if (res.ok) {
      onHabitAdded();
    } else {
      const data = await res.json();
      setMessage(data.error || "Something went wrong ❌");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 bg-white shadow p-4 rounded-lg max-w-md mx-auto"
    >
      <h2 className="text-xl font-semibold text-center text-[#087f6a]">
        Add New Habit
      </h2>

      <input
        type="text"
        placeholder="Habit name"
        value={habitName}
        onChange={(e) => setHabitName(e.target.value)}
        required
        className="border border-gray-300 p-2 rounded"
      />

      <textarea
        placeholder="Habit description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border border-gray-300 p-2 rounded"
      />

      <button
        type="submit"
        className="bg-[#087f6a] text-white py-2 rounded hover:bg-[#066756] transition"
      >
        Add Habit
      </button>

      {message && (
        <p className="text-center text-sm text-gray-700">{message}</p>
      )}
    </form>
  );
}
