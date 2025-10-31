"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useRouter } from "next/navigation";
import { clearUser } from "@/app/store/userSlice";
export default function Header() {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [habitCount, setHabitCount] = useState<number>(0);

  useEffect(() => {
    if (!user.id) return;
  
    const fetchHabits = async () => {
      try {
        const res = await fetch(`/api/habits/${user.id}`);
        if (!res.ok) throw new Error("Failed to fetch habits");
        const data = await res.json();
        setHabitCount(data.length);
      } catch (err) {
        console.error("Error fetching habits:", err);
      }
    };
  
    fetchHabits();
  }, [user.id]);

  const handleLogout = () => {
    dispatch(clearUser());
    router.push("/");
  };

  if (!user.id) return null;

  return (
    <header className="  bg-[#466aba] shadow-md ">
      <div className="mx-auto flex justify-between items-center p-4 w-[300px]">
        <div className="flex items-center gap-6">
          <span className="text-white text-xl">
            Habits: <strong>{habitCount}</strong>
          </span>
        </div>

        <div className="flex items-end gap-3">
          
          <div className="w-8 h-8 text-2xl text-white bg-[#76a405] font-bold rounded-full text-center">
            {user.name.slice(0, 1)}
          </div><button
            onClick={handleLogout}
            className="text-blue-950 hover:underline text-sm"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
