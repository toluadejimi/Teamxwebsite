/** Compress/resize an image file in the browser for reliable Vercel uploads. */
export async function compressImageFile(
  file: File,
  options?: { maxWidth?: number; quality?: number; maxBytes?: number }
): Promise<File> {
  const maxWidth = options?.maxWidth ?? 1600;
  const quality = options?.quality ?? 0.82;
  const maxBytes = options?.maxBytes ?? 1.8 * 1024 * 1024;

  if (!file.type.startsWith("image/")) return file;
  // Skip tiny files
  if (file.size <= 200 * 1024) return file;

  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxWidth / bitmap.width);
  const width = Math.max(1, Math.round(bitmap.width * scale));
  const height = Math.max(1, Math.round(bitmap.height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return file;
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  let q = quality;
  let blob: Blob | null = null;
  for (let i = 0; i < 6; i++) {
    blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", q)
    );
    if (!blob) break;
    if (blob.size <= maxBytes) break;
    q = Math.max(0.5, q - 0.1);
  }

  if (!blob) return file;

  const name = file.name.replace(/\.\w+$/, "") + ".jpg";
  return new File([blob], name, { type: "image/jpeg", lastModified: Date.now() });
}
