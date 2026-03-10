import { NextRequest, NextResponse } from "next/server";

const FACE_SERVICE_URL = process.env.FACE_SERVICE_URL;

export async function POST(request: NextRequest) {
  if (!FACE_SERVICE_URL) {
    return NextResponse.json(
      {
        success: false,
        message: "FACE_SERVICE_URL is not configured on the server.",
      },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();

    if (!body?.image) {
      return NextResponse.json(
        { success: false, message: "Missing image in request body." },
        { status: 400 }
      );
    }

    const response = await fetch(FACE_SERVICE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image: body.image,
        ...(body.studentId != null && { student_id: body.studentId }),
      }),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          message: data?.message || "Face service returned an error.",
        },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in /api/face-verify:", error);
    return NextResponse.json(
      { success: false, message: "Unexpected error during face verification." },
      { status: 500 }
    );
  }
}

