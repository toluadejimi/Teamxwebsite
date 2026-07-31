import { NextResponse } from "next/server";
import {
  readCms,
  uid,
  updateCms,
  type ChatConversation,
  type ChatMessage,
} from "@/lib/cms/store";

const BOT_GREETING =
  "Hi! I'm the Team X assistant. Ask about our services, request a quote, or leave a message — our team can reply live from the admin console.";

const QUICK_REPLIES = [
  "What services do you offer?",
  "Request a quote",
  "Talk to a human",
  "Careers / open roles",
];

function botReply(text: string): string {
  const q = text.toLowerCase();
  if (q.includes("quote") || q.includes("pricing") || q.includes("cost")) {
    return "Great — you can request a formal quote at /request-quote, or share project details here and an engineer will follow up.";
  }
  if (q.includes("career") || q.includes("job") || q.includes("hiring")) {
    return "We're hiring across engineering in Nigeria (Lagos & remote). Browse open roles at /careers or tell us what role you're interested in.";
  }
  if (q.includes("service") || q.includes("build") || q.includes("software")) {
    return "We build enterprise software: core banking, education portals, hospital systems, government platforms, AI, mobile apps, and cloud. Which industry are you in?";
  }
  if (q.includes("human") || q.includes("agent") || q.includes("support") || q.includes("call")) {
    return "I've flagged this chat for our team. Leave your email and a short message — an agent will reply here shortly during business hours.";
  }
  if (q.includes("contact") || q.includes("phone") || q.includes("email") || q.includes("address")) {
    return "You can reach us at hello@teamxtech.com or visit /contact. Our offices are in Lagos and Abuja, Nigeria.";
  }
  if (q.includes("hello") || q.includes("hi") || q.includes("hey")) {
    return "Hello! How can Team X help you today — services, demos, careers, or something else?";
  }
  return "Thanks for your message. I've saved it for our team. Meanwhile, try /services, /request-quote, or /book-demo — or ask me anything else.";
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({
      greeting: BOT_GREETING,
      quickReplies: QUICK_REPLIES,
    });
  }

  const data = await readCms();
  const chat = data.chats.find((c) => c.id === id);
  if (!chat) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Clear visitor unread when they poll
  if (chat.unreadVisitor > 0) {
    await updateCms((current) => ({
      ...current,
      chats: current.chats.map((c) =>
        c.id === id ? { ...c, unreadVisitor: 0 } : c
      ),
    }));
  }

  return NextResponse.json(chat);
}

export async function POST(request: Request) {
  const body = (await request.json()) as {
    conversationId?: string;
    text?: string;
    visitorName?: string;
    visitorEmail?: string;
  };

  if (!body.text?.trim()) {
    return NextResponse.json({ error: "Message required" }, { status: 400 });
  }

  const now = new Date().toISOString();
  const visitorMsg: ChatMessage = {
    id: uid("msg"),
    role: "visitor",
    text: body.text.trim(),
    createdAt: now,
  };

  const autoBot: ChatMessage = {
    id: uid("msg"),
    role: "bot",
    text: botReply(body.text),
    createdAt: new Date(Date.now() + 400).toISOString(),
  };

  let conversationId = body.conversationId;

  const data = await updateCms((current) => {
    if (conversationId) {
      const exists = current.chats.some((c) => c.id === conversationId);
      if (exists) {
        return {
          ...current,
          chats: current.chats.map((c) => {
            if (c.id !== conversationId) return c;
            return {
              ...c,
              visitorName: body.visitorName || c.visitorName,
              visitorEmail: body.visitorEmail || c.visitorEmail,
              messages: [...c.messages, visitorMsg, autoBot],
              unreadAdmin: c.unreadAdmin + 1,
              updatedAt: now,
              status: "open" as const,
            };
          }),
        };
      }
    }

    conversationId = uid("chat");
    const chat: ChatConversation = {
      id: conversationId,
      visitorName: body.visitorName || "Visitor",
      visitorEmail: body.visitorEmail || "",
      status: "open",
      unreadAdmin: 1,
      unreadVisitor: 0,
      createdAt: now,
      updatedAt: now,
      messages: [
        {
          id: uid("msg"),
          role: "bot",
          text: BOT_GREETING,
          createdAt: now,
        },
        visitorMsg,
        autoBot,
      ],
    };

    return { ...current, chats: [chat, ...current.chats] };
  });

  const chat = data.chats.find((c) => c.id === conversationId);
  return NextResponse.json(chat, { status: 201 });
}
