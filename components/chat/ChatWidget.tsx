"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type Message = { role: "user" | "assistant"; content: string };

// Client-side fallback when API is unreachable (e.g. dev server not running or DB not set up)
function getOfflineReply(text: string): string {
  const t = text.toLowerCase();
  if (/hi|hello|hey/.test(t)) return "Hi! I'm the IntelliLearn assistant. For full replies, make sure the dev server is running (npm run dev) and the database is set up (see README).";
  if (/course|certificate|exam|login|help/.test(t)) return "I can help with courses, certificates, exams, and login. For full answers, run the app with the database set up (npm run db:push && npm run db:seed).";
  return "The chat server isn't responding. Run 'npm run dev' and ensure the database is set up (see README).";
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<number | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, sessionId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send");
      if (data.sessionId != null) setSessionId(data.sessionId);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply || "Sorry, I couldn't respond." },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: getOfflineReply(text) },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center",
          "bg-primary text-white hover:bg-primary-dark transition-colors"
        )}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>

      {open && (
        <div
          className={cn(
            "fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] rounded-2xl shadow-2xl overflow-hidden",
            "bg-card-light dark:bg-card-dark border border-gray-200 dark:border-gray-700",
            "flex flex-col max-h-[480px]"
          )}
        >
          <div className="px-4 py-3 bg-primary text-white">
            <h3 className="font-semibold">IntelliLearn Assistant</h3>
            <p className="text-sm opacity-90">Ask about courses, certificates, or exams</p>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[200px]">
            {messages.length === 0 && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Type a message to get started.
              </p>
            )}
            {messages.map((m, i) => (
              <div
                key={i}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm max-w-[90%]",
                  m.role === "user"
                    ? "ml-auto bg-primary text-white"
                    : "mr-auto bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                )}
              >
                {m.content}
              </div>
            ))}
            {loading && (
              <div className="rounded-lg px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 w-fit">
                ...
              </div>
            )}
            <div ref={bottomRef} />
          </div>
          <div className="p-3 border-t border-gray-200 dark:border-gray-700 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type your message..."
              className={cn(
                "flex-1 px-3 py-2 rounded-lg border text-sm",
                "bg-background-light dark:bg-background-dark",
                "border-gray-300 dark:border-gray-600",
                "focus:ring-2 focus:ring-primary focus:border-transparent"
              )}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className={cn(
                "p-2 rounded-lg bg-primary text-white hover:bg-primary-dark",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
