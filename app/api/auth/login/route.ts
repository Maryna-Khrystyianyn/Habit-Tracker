import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Missing filds" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || user.password !== password) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    return NextResponse.json({ message: "Login successful", user }, { status: 200 });
  } catch (error) {
    console.error("❌ Login error:", error);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}