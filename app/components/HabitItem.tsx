"use client";

import type { Habit } from "@prisma/client";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";

interface HabitItemProps {
  habit: Habit;
  onHabitUpdated: () => void;
}

export default function HabitItem({ habit, onHabitUpdated }: HabitItemProps) {
  const [isDone, setIsDone] = useState<boolean>(false);
  const [logId, setLogId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkHabitStatus = async () => {
      try {
        const res = await fetch(`/api/habitlogs/check?habitId=${habit.id}`);
        const data = await res.json();
        if (res.ok) {
          setIsDone(data.done);
        } else {
          console.error(data.error);
        }
      } catch (err) {
        console.error("Error checking habit log:", err);
      } finally {
        setLoading(false);
      }
    };

    checkHabitStatus();
  }, [habit.id]);

  const toggleHabit = async () => {
    try {
      
        await fetch(`/api/habitlogs`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              habitId: habit.id,
            }),
          });
        setIsDone(!isDone);
      onHabitUpdated();
    } catch (err) {
      console.error("Error toggling habit:", err);
    }
  };

  if (loading) return <div>Loading...</div>;

  const handleDelete = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this habits?"
    );
    if (confirm) {
      try {
        const res = await fetch(`/api/habits/${habit.id}`, {
          method: "DELETE",
        });
        if (!res.ok) throw new Error("Failed to delete habit");
        onHabitUpdated();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="flex gap-3 items-center ">
        <div className=" w-[250px] sm:w-[500px]  flex justify-between items-center bg-gray-100 p-2 rounded-md">
      <span>{habit.name}</span>
      <div className="flex gap-5 px-3">
        <button
          onClick={toggleHabit}
          className="bg-[#087f6a] text-white text-sm w-6 h-6 rounded"
        >
          {isDone && <FaCheck className="text-white w-3 h-3 mx-auto" />}
        </button>
        
      </div>
    </div><button onClick={handleDelete} className=" text-red-500 border border-gray-300 w-5 h-5 rounded-full flex justify-center items-center hover:bg-gray-200 text-[11px]">
          ✕
        </button>
    </div>
    
  );
}
