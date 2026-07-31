"use client";

import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { MessageSquare, Send, XCircle } from "lucide-react";
import type { ChatConversation, ChatMessage } from "@/lib/cms/store";
import { cn } from "@/lib/utils";

function formatTime(iso: string) {
  return new Date(iso).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function lastPreview(chat: ChatConversation): string {
  const last = chat.messages[chat.messages.length - 1];
  if (!last) return "No messages yet";
  const prefix =
    last.role === "agent" ? "You: " : last.role === "bot" ? "Bot: " : "";
  return prefix + last.text.slice(0, 60) + (last.text.length > 60 ? "…" : "");
}

function MessageBubble({ msg }: { msg: ChatMessage }) {
  const isAgent = msg.role === "agent";
  const isBot = msg.role === "bot";

  return (
    <div
      className={cn(
        "flex",
        isAgent ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm",
          isAgent && "rounded-br-md bg-blue-600 text-white",
          !isAgent && !isBot && "rounded-bl-md bg-slate-700/80 text-slate-100",
          isBot && "rounded-bl-md border border-white/5 bg-white/[0.04] text-slate-400 italic"
        )}
      >
        {!isAgent && (
          <p className="mb-0.5 text-[10px] font-medium uppercase tracking-wider opacity-60">
            {isBot ? "Assistant" : "Visitor"}
          </p>
        )}
        <p className="whitespace-pre-wrap break-words">{msg.text}</p>
        <p
          className={cn(
            "mt-1 text-[10px]",
            isAgent ? "text-blue-200/70" : "text-slate-500"
          )}
        >
          {formatTime(msg.createdAt)}
        </p>
      </div>
    </div>
  );
}

export default function AdminChatPage() {
  const router = useRouter();
  const [chats, setChats] = useState<ChatConversation[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [reply, setReply] = useState("");
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const selected = chats.find((c) => c.id === selectedId) ?? null;

  const loadChats = useCallback(async () => {
    const res = await fetch("/api/admin/chats");
    if (!res.ok) return;
    const data: ChatConversation[] = await res.json();
    setChats(data);
    return data;
  }, []);

  useEffect(() => {
    (async () => {
      const me = await fetch("/api/admin/me");
      if (!me.ok) {
        router.replace("/admin/login");
        return;
      }
      const data = await loadChats();
      if (data?.length) {
        setSelectedId((prev) => prev ?? data[0].id);
      }
      setLoading(false);
    })();
  }, [router, loadChats]);

  useEffect(() => {
    const interval = setInterval(() => {
      loadChats();
    }, 4000);
    return () => clearInterval(interval);
  }, [loadChats]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selected?.messages]);

  async function sendReply(e: FormEvent) {
    e.preventDefault();
    if (!selectedId || !reply.trim()) return;
    setSending(true);
    const res = await fetch("/api/admin/chats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ conversationId: selectedId, text: reply.trim() }),
    });
    setSending(false);
    if (res.ok) {
      const updated = await res.json();
      setChats((prev) =>
        prev.map((c) => (c.id === updated.id ? updated : c))
      );
      setReply("");
    }
  }

  async function closeConversation() {
    if (!selectedId) return;
    if (!confirm("Close this conversation?")) return;
    const res = await fetch("/api/admin/chats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ conversationId: selectedId, status: "closed" }),
    });
    if (res.ok) {
      const updated = await res.json();
      setChats((prev) =>
        prev.map((c) => (c.id === updated.id ? updated : c))
      );
    }
  }

  if (loading) {
    return <p className="text-sm text-slate-400">Loading…</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-white">Live Chat</h1>
      <p className="mt-1 text-sm text-slate-400">
        Respond to visitor messages from the website chatbot.
      </p>

      <div className="mt-6 flex h-[calc(100vh-12rem)] min-h-[420px] overflow-hidden rounded-2xl border border-white/10 bg-[#0a0f1a]">
        {/* Conversation list */}
        <aside className="flex w-full max-w-xs shrink-0 flex-col border-r border-white/10 md:w-80">
          <div className="border-b border-white/10 px-4 py-3">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
              Conversations ({chats.length})
            </p>
          </div>
          <div className="flex-1 overflow-y-auto">
            {chats.length === 0 ? (
              <p className="p-4 text-sm text-slate-500">No conversations yet.</p>
            ) : (
              chats.map((chat) => (
                <button
                  key={chat.id}
                  type="button"
                  onClick={() => setSelectedId(chat.id)}
                  className={cn(
                    "w-full border-b border-white/5 px-4 py-3 text-left transition-colors hover:bg-white/[0.03]",
                    selectedId === chat.id && "bg-blue-600/10"
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="truncate text-sm font-medium text-white">
                      {chat.visitorName || "Visitor"}
                    </p>
                    {chat.unreadAdmin > 0 && (
                      <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-blue-600 px-1.5 text-[10px] font-bold text-white">
                        {chat.unreadAdmin}
                      </span>
                    )}
                  </div>
                  {chat.visitorEmail && (
                    <p className="truncate text-[11px] text-slate-500">
                      {chat.visitorEmail}
                    </p>
                  )}
                  <p className="mt-1 line-clamp-2 text-xs text-slate-400">
                    {lastPreview(chat)}
                  </p>
                  <div className="mt-1.5 flex items-center gap-2">
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[10px] font-medium uppercase",
                        chat.status === "open"
                          ? "bg-emerald-500/20 text-emerald-300"
                          : "bg-slate-500/20 text-slate-400"
                      )}
                    >
                      {chat.status}
                    </span>
                    <span className="text-[10px] text-slate-600">
                      {formatTime(chat.updatedAt)}
                    </span>
                  </div>
                </button>
              ))
            )}
          </div>
        </aside>

        {/* Message panel */}
        <div className="flex min-w-0 flex-1 flex-col">
          {selected ? (
            <>
              <header className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                <div>
                  <p className="font-medium text-white">{selected.visitorName}</p>
                  {selected.visitorEmail && (
                    <p className="text-xs text-slate-400">{selected.visitorEmail}</p>
                  )}
                </div>
                {selected.status === "open" && (
                  <button
                    type="button"
                    onClick={closeConversation}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-xs text-slate-400 hover:bg-white/5 hover:text-white"
                  >
                    <XCircle className="h-3.5 w-3.5" />
                    Close chat
                  </button>
                )}
              </header>

              <div className="flex-1 space-y-3 overflow-y-auto p-4">
                {selected.messages.map((msg) => (
                  <MessageBubble key={msg.id} msg={msg} />
                ))}
                <div ref={messagesEndRef} />
              </div>

              {selected.status === "open" ? (
                <form
                  onSubmit={sendReply}
                  className="border-t border-white/10 p-4"
                >
                  <div className="flex gap-2">
                    <textarea
                      value={reply}
                      onChange={(e) => setReply(e.target.value)}
                      placeholder="Type your reply…"
                      rows={2}
                      className="min-h-[44px] flex-1 resize-none rounded-xl border border-white/10 bg-black/30 px-3 py-2.5 text-sm text-white outline-none focus:ring-2 focus:ring-blue-500"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          sendReply(e);
                        }
                      }}
                    />
                    <button
                      type="submit"
                      disabled={sending || !reply.trim()}
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-50"
                      aria-label="Send reply"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </form>
              ) : (
                <p className="border-t border-white/10 p-4 text-center text-sm text-slate-500">
                  This conversation is closed.
                </p>
              )}
            </>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center text-slate-500">
              <MessageSquare className="mb-3 h-10 w-10 opacity-40" />
              <p className="text-sm">Select a conversation to view messages</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
