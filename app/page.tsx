import Link from "next/link";
import Image from "next/image";
import Login from "./components/Login";
export default function Home() {
  return (
    <div className=" text-[#819dfe] flex sm:flex-row flex-col items-center justify-center my-20 gap-4">
      <Image src={"/img/main.jpg"}  width={600} height={600} alt="Healthy people"/>
      <div className="flex flex-col gap-5 justify-center items-center m-10">
        <h1 className="sm:text-4xl text-2xl max-w-[400px] font-bold text-center text-[#087f6a]" >Trak Your Habits, Transform Your Life</h1>
        <Login />
        <Link href={"/register"} className="sm:text-xl text-[#4c69c7] underline">
          {" "}
          New here? Create an account!
        </Link>
      </div>
    </div>
  );
}
