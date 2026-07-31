"use client";

import Link from "next/link";
import {
  FormEvent,
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  MessageCircle,
  Minimize2,
  Send,
  X,
} from "lucide-react";
import type { ChatConversation, ChatMessage } from "@/lib/cms/store";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "teamx_chat_id";

type GreetingData = {
  greeting: string;
  quickReplies: string[];
};

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
}

function renderMessageText(text: string) {
  const parts = text.split(/(\/[a-zA-Z0-9\-/_?=&%#]+)/g);
  return parts.map((part, i) => {
    if (part.startsWith("/") && part.length > 1 && !part.includes(" ")) {
      return (
        <Link
          key={i}
          href={part}
          className="font-medium text-accent underline underline-offset-2 hover:opacity-80"
        >
          {part}
        </Link>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

function MessageBubble({ msg }: { msg: ChatMessage }) {
  const isVisitor = msg.role === "visitor";
  const isAgent = msg.role === "agent";
  const isBot = msg.role === "bot";

  return (
    <div
      className={cn("flex", isVisitor ? "justify-end" : "justify-start")}
    >
      <div
        className={cn(
          "max-w-[88%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
          isVisitor &&
            "rounded-br-md bg-accent text-accent-foreground",
          isAgent && "rounded-bl-md bg-accent/90 text-accent-foreground",
          isBot &&
            "rounded-bl-md border border-border bg-surface/60 text-muted"
        )}
      >
        {!isVisitor && (
          <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-wider opacity-70">
            {isAgent ? "Team X" : "Assistant"}
          </p>
        )}
        <p className="whitespace-pre-wrap break-words">
          {renderMessageText(msg.text)}
        </p>
        <p
          className={cn(
            "mt-1 text-[10px]",
            isVisitor || isAgent ? "opacity-60" : "text-muted/70"
          )}
        >
          {formatTime(msg.createdAt)}
        </p>
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex justify-start" aria-live="polite" aria-label="Assistant is typing">
      <div className="rounded-2xl rounded-bl-md border border-border bg-surface/60 px-4 py-3">
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="h-2 w-2 animate-bounce rounded-full bg-muted"
              style={{ animationDelay: `${i * 150}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [greeting, setGreeting] = useState("");
  const [quickReplies, setQuickReplies] = useState<string[]>([]);
  const [visitorName, setVisitorName] = useState("");
  const [visitorEmail, setVisitorEmail] = useState("");
  const [infoCollected, setInfoCollected] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [sending, setSending] = useState(false);
  const [unread, setUnread] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const needsInfo = !infoCollected && !conversationId;

  const loadGreeting = useCallback(async () => {
    const res = await fetch("/api/chat");
    if (res.ok) {
      const data: GreetingData = await res.json();
      setGreeting(data.greeting);
      setQuickReplies(data.quickReplies);
    }
  }, []);

  const loadConversation = useCallback(async (id: string, isOpen: boolean) => {
    const res = await fetch(`/api/chat?id=${encodeURIComponent(id)}`);
    if (res.status === 404) {
      localStorage.removeItem(STORAGE_KEY);
      setConversationId(null);
      setMessages([]);
      return;
    }
    if (!res.ok) return;
    const chat: ChatConversation = await res.json();
    setMessages(chat.messages);
    if (!isOpen && chat.unreadVisitor > 0) {
      setUnread(chat.unreadVisitor);
    } else if (isOpen) {
      setUnread(0);
    }
  }, []);

  useEffect(() => {
    loadGreeting();
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setConversationId(stored);
      loadConversation(stored, false);
    }
  }, [loadGreeting, loadConversation]);

  useEffect(() => {
    if (!conversationId) return;
    const isActive = open && !minimized;
    loadConversation(conversationId, isActive);
    const interval = setInterval(() => {
      loadConversation(conversationId, open && !minimized);
    }, 3000);
    return () => clearInterval(interval);
  }, [open, minimized, conversationId, loadConversation]);

  useEffect(() => {
    if (!open || minimized) return;
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing, open, minimized]);

  useEffect(() => {
    if (!open || minimized) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, minimized]);

  useEffect(() => {
    if (open && !minimized && !needsInfo) {
      inputRef.current?.focus();
    }
  }, [open, minimized, needsInfo]);

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || sending) return;

    if (needsInfo) return;

    setSending(true);
    setTyping(true);
    setInput("");

    const optimistic: ChatMessage = {
      id: `temp-${Date.now()}`,
      role: "visitor",
      text: trimmed,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, optimistic]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversationId: conversationId ?? undefined,
          text: trimmed,
          visitorName: visitorName.trim() || undefined,
          visitorEmail: visitorEmail.trim() || undefined,
        }),
      });

      if (res.ok) {
        const chat: ChatConversation = await res.json();
        setConversationId(chat.id);
        localStorage.setItem(STORAGE_KEY, chat.id);
        setMessages(chat.messages);
        setUnread(0);
      }
    } finally {
      setTimeout(() => setTyping(false), 800);
      setSending(false);
    }
  }

  function onSubmitInfo(e: FormEvent) {
    e.preventDefault();
    if (!visitorName.trim()) return;
    setInfoCollected(true);
  }

  function onSubmitMessage(e: FormEvent) {
    e.preventDefault();
    sendMessage(input);
  }

  function handleOpen() {
    setOpen(true);
    setMinimized(false);
    setUnread(0);
    if (conversationId) {
      loadConversation(conversationId, true);
    }
  }

  const displayMessages =
    messages.length > 0
      ? messages
      : greeting
        ? [
            {
              id: "greeting",
              role: "bot" as const,
              text: greeting,
              createdAt: new Date().toISOString(),
            },
          ]
        : [];

  return (
    <>
      {/* FAB */}
      {!open && (
        <button
          type="button"
          onClick={handleOpen}
          className="fixed bottom-5 right-5 z-[90] flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-[0_8px_32px_rgba(37,99,235,0.45)] transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:bottom-6 sm:right-6"
          aria-label="Open chat with Team X Assistant"
        >
          <MessageCircle className="h-6 w-6" />
          {unread > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
              {unread > 9 ? "9+" : unread}
            </span>
          )}
        </button>
      )}

      {/* Panel */}
      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="Team X Assistant chat"
          aria-modal="true"
          className={cn(
            "fixed z-[90] flex flex-col overflow-hidden border border-border bg-surface/95 shadow-2xl backdrop-blur-xl",
            "inset-x-3 bottom-3 top-auto h-[min(560px,calc(100vh-5rem))] rounded-2xl",
            "sm:inset-x-auto sm:bottom-6 sm:right-6 sm:top-auto sm:h-[min(520px,calc(100vh-6rem))] sm:w-[min(400px,calc(100vw-2rem))]",
            minimized && "h-14 sm:h-14"
          )}
        >
          {/* Header */}
          <header className="flex shrink-0 items-center justify-between border-b border-border px-4 py-3">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Team X Assistant
                </p>
                <p className="text-[11px] text-muted">Online · replies in minutes</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setMinimized((v) => !v)}
                className="rounded-lg p-2 text-muted transition-colors hover:bg-foreground/5 hover:text-foreground"
                aria-label={minimized ? "Expand chat" : "Minimize chat"}
              >
                <Minimize2 className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg p-2 text-muted transition-colors hover:bg-foreground/5 hover:text-foreground"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </header>

          {!minimized && (
            <>
              {/* Messages */}
              <div
                className="flex-1 space-y-3 overflow-y-auto px-3 py-4 sm:px-4"
                aria-live="polite"
              >
                {needsInfo ? (
                  <form onSubmit={onSubmitInfo} className="space-y-3">
                    <p className="text-sm text-muted">
                      Before we start, tell us a bit about yourself (optional email
                      helps us follow up).
                    </p>
                    <label className="block">
                      <span className="mb-1 block text-xs text-muted">Name *</span>
                      <input
                        value={visitorName}
                        onChange={(e) => setVisitorName(e.target.value)}
                        className="w-full rounded-xl border border-border bg-background/50 px-3 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-accent"
                        placeholder="Your name"
                        required
                        autoFocus
                      />
                    </label>
                    <label className="block">
                      <span className="mb-1 block text-xs text-muted">Email</span>
                      <input
                        type="email"
                        value={visitorEmail}
                        onChange={(e) => setVisitorEmail(e.target.value)}
                        className="w-full rounded-xl border border-border bg-background/50 px-3 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-accent"
                        placeholder="you@company.com"
                      />
                    </label>
                    <button
                      type="submit"
                      className="w-full rounded-xl bg-accent py-2.5 text-sm font-medium text-accent-foreground hover:opacity-90"
                    >
                      Start chat
                    </button>
                  </form>
                ) : (
                  <>
                    {displayMessages.map((msg) => (
                      <MessageBubble key={msg.id} msg={msg} />
                    ))}
                    {typing && <TypingIndicator />}
                    <div ref={messagesEndRef} />
                  </>
                )}
              </div>

              {/* Quick replies + input */}
              {!needsInfo && (
                <div className="shrink-0 border-t border-border">
                  {quickReplies.length > 0 && messages.length <= 1 && (
                    <div className="flex flex-wrap gap-2 px-3 pt-3 sm:px-4">
                      {quickReplies.map((q) => (
                        <button
                          key={q}
                          type="button"
                          onClick={() => sendMessage(q)}
                          disabled={sending}
                          className="rounded-full border border-border bg-background/40 px-3 py-1.5 text-xs text-foreground transition-colors hover:border-accent/40 hover:bg-accent/10 hover:text-accent disabled:opacity-50"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  )}
                  <form
                    onSubmit={onSubmitMessage}
                    className="flex gap-2 p-3 sm:p-4"
                  >
                    <textarea
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Type a message…"
                      rows={1}
                      className="max-h-24 min-h-[44px] flex-1 resize-none rounded-xl border border-border bg-background/50 px-3 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-accent"
                      aria-label="Message input"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          onSubmitMessage(e);
                        }
                      }}
                    />
                    <button
                      type="submit"
                      disabled={sending || !input.trim()}
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground hover:opacity-90 disabled:opacity-50"
                      aria-label="Send message"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </form>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
}
