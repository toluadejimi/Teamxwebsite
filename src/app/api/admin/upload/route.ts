import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { requireAdmin } from "@/lib/cms/auth";
import { uid } from "@/lib/cms/store";

function detectImageExt(buf: Buffer): string | null {
  if (buf.length < 12) return null;
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return ".jpg";
  if (
    buf[0] === 0x89 &&
    buf[1] === 0x50 &&
    buf[2] === 0x4e &&
    buf[3] === 0x47
  )
    return ".png";
  if (buf[0] === 0x47 && buf[1] === 0x49 && buf[2] === 0x46) return ".gif";
  if (
    buf[0] === 0x52 &&
    buf[1] === 0x49 &&
    buf[2] === 0x46 &&
    buf[3] === 0x46 &&
    buf[8] === 0x57 &&
    buf[9] === 0x45 &&
    buf[10] === 0x42 &&
    buf[11] === 0x50
  )
    return ".webp";
  return null;
}

function mimeForExt(ext: string): string {
  switch (ext) {
    case ".png":
      return "image/png";
    case ".gif":
      return "image/gif";
    case ".webp":
      return "image/webp";
    default:
      return "image/jpeg";
  }
}

export async function POST(request: Request) {
  const ok = await requireAdmin();
  if (!ok) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "file required" }, { status: 400 });
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  if (bytes.length > 5 * 1024 * 1024) {
    return NextResponse.json({ error: "Max file size is 5MB" }, { status: 400 });
  }

  const ext = detectImageExt(bytes);
  if (!ext) {
    return NextResponse.json(
      { error: "Only real JPEG, PNG, GIF, or WebP images are allowed" },
      { status: 400 }
    );
  }

  // Vercel: no durable public disk — store as data URL in CMS (after client compress)
  if (process.env.VERCEL) {
    if (bytes.length > 2 * 1024 * 1024) {
      return NextResponse.json(
        {
          error:
            "Image is still too large after upload (max 2MB on Vercel). Try a smaller image or paste an image URL.",
        },
        { status: 400 }
      );
    }
    const dataUrl = `data:${mimeForExt(ext)};base64,${bytes.toString("base64")}`;
    return NextResponse.json({ url: dataUrl });
  }

  const dir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(dir, { recursive: true });
  const filename = `${uid("img")}${ext}`;
  await fs.writeFile(path.join(dir, filename), bytes);

  return NextResponse.json({ url: `/uploads/${filename}` });
}
