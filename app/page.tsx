
import { PrismaClient, User } from "@/app/generated/prisma/client";

const prisma = new PrismaClient





export default async function Home() {
 
const users:User[] =  await prisma.user.findMany()
if(!users) return <div>Loading...</div>

console.log(users);
  return (
    <div className=" text-amber-500">
{
  users.map((user)=>{
    return(<div key={user.id}>
{user.name}
    </div>)
  })
}
      
    </div>
  );
}