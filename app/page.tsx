"use client"

import Link from "next/link";
import Image from "next/image";
import Login from "./components/Login";
import { useAppSelector } from "./store/hooks";

export default function Home() {
  const user = useAppSelector((state) => state.user);

  return (
    <div className=" text-[#819dfe] flex sm:flex-row flex-col items-center justify-center my-2 sm:min-h-screen">
      <div className="sm:hidden flex flex-col justify-center items-center gap-5 ">
         <h2 className=" text-gray-900">Welcome to your habits journey</h2>
           <h1 className="text-[32px] text-2xl max-w-[400px] font-bold text-center text-green-950">
          Trak Your Habits,<br/> Transform Your Life
        </h1>
      </div>
     

      <Image
        src={"/img/main.jpg"}
        width={400}
        height={300}
        alt="Healthy people"
      />
      <div className="flex flex-col  justify-center items-center sm:items-start">
      <h1 className="hidden sm:block sm:text-[48px] max-w-[400px] font-bold text-center text-[#087f6a] sm:text-left">
          Trak Your Habits, Transform Your Life
        </h1>

        {!user.id && (
          <div className="flex flex-col justify-center items-center mx-auto gap-5">
            <Login />
            <Link
              href={"/register"}
              className="sm:text-xl text-[#4c69c7] underline "
            >
              New here? Create an account!
            </Link>
          </div>
        )}
        {user.id && (
          <div className="flex flex-col gap-3  justify-center items-center sm:items-start sm:mt-5">
            <p className="text-xl text-[#e93f2e] text-center font-bold sm:text-left">Hello, <span>{user.name}</span></p>
           <p className="text-gray-900">Keep going - your future self will thank you!</p>
           <Link className="sm:mt-10 bg-green-800 w-[200px] flex justify-center text-white p-2 rounded-xl" href={`/user/${user.id}`}>
          Get Start!
        </Link>
          </div>
        )}



      </div>
    </div>
  );
}
