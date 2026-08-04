import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/cms/auth";
import { readCms, uid, updateCms, type ChatMessage } from "@/lib/cms/store";

export async function GET() {
  try {
    const ok = await requireAdmin();
    if (!ok) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const data = await readCms();
    const chats = [...data.chats].sort(
      (a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt)
    );
    return NextResponse.json(chats);
  } catch (err) {
    console.error("[admin/chats GET]", err);
    return NextResponse.json({ error: "Failed to load chats" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const ok = await requireAdmin();
  if (!ok) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = (await request.json()) as {
    conversationId?: string;
    text?: string;
    status?: "open" | "closed";
  };

  if (!body.conversationId) {
    return NextResponse.json({ error: "conversationId required" }, { status: 400 });
  }

  const data = await updateCms((current) => {
    const chats = current.chats.map((chat) => {
      if (chat.id !== body.conversationId) return chat;

      let messages = chat.messages;
      let unreadVisitor = chat.unreadVisitor;

      if (body.text?.trim()) {
        const msg: ChatMessage = {
          id: uid("msg"),
          role: "agent",
          text: body.text.trim(),
          createdAt: new Date().toISOString(),
        };
        messages = [...messages, msg];
        unreadVisitor += 1;
      }

      return {
        ...chat,
        messages,
        unreadVisitor,
        unreadAdmin: 0,
        status: body.status || chat.status,
        updatedAt: new Date().toISOString(),
      };
    });
    return { ...current, chats };
  });

  const updated = data.chats.find((c) => c.id === body.conversationId);
  return NextResponse.json(updated);
}
