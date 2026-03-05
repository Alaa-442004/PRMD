import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    const count = await prisma.student.count();
    return NextResponse.json({
      ok: true,
      message: "Database connected successfully",
      studentCount: count,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json(
      { ok: false, message: "Database connection failed", error: message },
      { status: 500 }
    );
  }
}
