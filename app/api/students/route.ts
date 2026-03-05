import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const students = await prisma.student.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(students);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to fetch students" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, enrolledCourses = 0, certificates = 0, joinDate } = body;
    if (!name || !email || !joinDate) {
      return NextResponse.json(
        { error: "name, email, and joinDate are required" },
        { status: 400 }
      );
    }
    const student = await prisma.student.create({
      data: {
        name,
        email,
        enrolledCourses: Number(enrolledCourses) || 0,
        certificates: Number(certificates) || 0,
        joinDate,
      },
    });
    return NextResponse.json(student);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to create student" },
      { status: 500 }
    );
  }
}
