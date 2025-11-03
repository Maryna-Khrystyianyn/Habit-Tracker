"use client";

import { useEffect, useState } from "react";
import { useAppSelector } from "../../store/hooks";
import Header from "@/app/components/Header";
//import type { Habit } from "@prisma/client";
import HabitItem from "@/app/components/HabitItem";
import AddHabitForm from "@/app/components/AddHabitForm";
type Habit = {
    id:number,
    name:string,
    description:string|null,
    userId:number,  
    createdAt:Date
}

const UserPage = () => {
  const user = useAppSelector((state) => state.user);
  const [habits, setHabits] = useState<Habit[]>([]);
  const [showAddHabitForm, setShowAddHabitForm] = useState(false);

  const fetchHabits = async () => {
    try {
      const res = await fetch(`/api/userHabits/${user.id}`);
      if (!res.ok) throw new Error("Failed to fetch habits");
      const data = await res.json();
      setHabits(data);
    } catch (err) {
      console.error("Error fetching habits:", err);
    }
  };

  useEffect(() => {
    if (!user.id) return;
    fetchHabits();
  }, [user.id]);

  const handleHabitUpdate = () => {
    fetchHabits(); // перезавантажуємо звички
  };

  console.log(habits);

  return (
    <div>
      <Header />
      <div className="max-w-[550px] flex flex-col   mx-auto gap-3">
        <h2 className="mt-20 mb-5 text-xl font-bold text-gray-900">
          My habits. My rebirth. One step at a time.
        </h2>
        
        {/* Habits List */}
        {habits.map((item) => {
          return (
            <div key={item.id} className="w-full">
              <HabitItem habit={item} onHabitUpdated={handleHabitUpdate} />
            </div>
          );
        })}
        {/* Add Habit Form */}
        {showAddHabitForm && (
          <AddHabitForm
            onHabitAdded={() => {
              fetchHabits(); // оновити список
              setShowAddHabitForm(false); // сховати форму
            }}
          />
        )}

        {/* Add New Habit */}
        {!showAddHabitForm && (
          <div className="w-full flex ">
            <button
              onClick={() => setShowAddHabitForm(true)}
            >
              {" "}
              <span className="text-[#087f6a]"> + <span className="pl-2"> Add new habit </span></span>
              
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPage;
