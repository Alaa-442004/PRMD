import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Simple rule-based responses when no OpenAI key is set
const FALLBACK_RESPONSES: { keywords: string[]; response: string }[] = [
  { keywords: ["course", "courses", "learn", "enroll"], response: "You can browse all courses from the Courses page. After logging in, go to Dashboard to see your enrolled courses and progress." },
  { keywords: ["certificate", "certificates", "certification"], response: "Digital certificates are issued when you complete a course and pass the exam. View them under the Certificates section once you're logged in." },
  { keywords: ["exam", "exams", "test", "quiz"], response: "Exams are available from the My Exams page. You can take proctored exams and view your results after completion." },
  { keywords: ["login", "sign in", "account", "register"], response: "Use the Login link in the navigation to sign in, or Register to create a new account." },
  { keywords: ["help", "support", "contact"], response: "This is the IntelliLearn support assistant. Ask about courses, certificates, exams, or login—or type a question and I'll try to help!" },
  { keywords: ["hello", "hi", "hey"], response: "Hi! I'm the IntelliLearn assistant. You can ask me about courses, certificates, exams, or how to get started." },
];

function getFallbackReply(userMessage: string): string {
  const lower = userMessage.toLowerCase();
  for (const { keywords, response } of FALLBACK_RESPONSES) {
    if (keywords.some((k) => lower.includes(k))) return response;
  }
  return "I'm not sure about that. You can ask about courses, certificates, exams, or how to sign in. How can I help?";
}

export async function POST(request: NextRequest) {
  let message: string;
  let rawSessionId: number | null = null;
  try {
    const body = await request.json();
    const { message: msg, sessionId: sid } = body as { message?: string; sessionId?: number | null };
    if (!msg || typeof msg !== "string" || !msg.trim()) {
      return NextResponse.json(
        { error: "message is required" },
        { status: 400 }
      );
    }
    message = msg.trim();
    rawSessionId = sid != null ? Number(sid) : null;
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  // 1. Compute reply first (works even when DB is not set up)
  let reply: string;
  const openaiKey = process.env.OPENAI_API_KEY;
  if (openaiKey) {
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openaiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "You are a helpful assistant for NMU IntelliLearn, an AI-powered learning and certification platform. Answer briefly about courses, certificates, exams, and how to use the site.",
            },
            { role: "user", content: message },
          ],
          max_tokens: 200,
        }),
      });
      const data = await res.json();
      reply =
        data.choices?.[0]?.message?.content?.trim() || getFallbackReply(message);
    } catch {
      reply = getFallbackReply(message);
    }
  } else {
    reply = getFallbackReply(message);
  }

  // 2. Optionally persist to DB (chat still works if this fails)
  let sessionId: number | null = null;
  try {
    let sid = rawSessionId && rawSessionId > 0 ? rawSessionId : null;
    if (!sid) {
      const session = await prisma.chatSession.create({ data: {} });
      sid = session.id;
    }
    sessionId = sid;
    await prisma.chatMessage.create({
      data: { sessionId: sid, role: "user", content: message },
    });
    await prisma.chatMessage.create({
      data: { sessionId: sid, role: "assistant", content: reply },
    });
  } catch {
    // DB not set up or error — reply already computed, ignore
  }

  return NextResponse.json({ reply, sessionId });
}

export async function GET(request: NextRequest) {
  try {
    const sessionId = request.nextUrl.searchParams.get("sessionId");
    if (!sessionId) {
      return NextResponse.json(
        { error: "sessionId is required" },
        { status: 400 }
      );
    }
    const id = parseInt(sessionId, 10);
    if (isNaN(id) || id <= 0) {
      return NextResponse.json(
        { error: "Invalid sessionId" },
        { status: 400 }
      );
    }
    const messages = await prisma.chatMessage.findMany({
      where: { sessionId: id },
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json({ messages });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to fetch chat history" },
      { status: 500 }
    );
  }
}
