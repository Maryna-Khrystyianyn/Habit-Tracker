"use client";

import { useEffect, useState } from "react";
import { useAppSelector } from "../store/hooks";
import {MdCalendarToday} from "react-icons/md";


import CurrentDate from "./CurrentDate";
export default function Header() {
  const user = useAppSelector((state) => state.user);

  const [habitCount, setHabitCount] = useState<number>(0);

  useEffect(() => {
    if (!user.id) return;

    const fetchHabits = async () => {
      try {
        const res = await fetch(`/api/userHabits/${user.id}`);
        if (!res.ok) throw new Error("Failed to fetch habits");
        const data = await res.json();
        setHabitCount(data.length);
      } catch (err) {
        console.error("Error fetching habits:", err);
      }
    };

    fetchHabits();
  }, [user.id]);

  if (!user.id) return null;

  return (
    <header className="  bg-[#087f6a]  shadow-md ">
      <div className="mx-auto flex justify-around items-center p-4 ">
        <div className="flex items-center gap-2 text-white">
             <MdCalendarToday size={20}/>
        <CurrentDate />
        </div>
       

      {/*   <div className="flex items-center gap-6">
          <span className="text-white text-xl">
            Habits: <strong>{habitCount}</strong>
          </span>
        </div> */}

        <div className="w-8 h-8 text-2xl text-white bg-[#76a405] font-bold rounded-full text-center">
          {user.name.slice(0, 1)}
        </div>
      </div>
    </header>
  );
}
