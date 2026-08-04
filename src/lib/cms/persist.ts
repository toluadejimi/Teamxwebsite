/**
 * Durable CMS persistence.
 * - Local/dev: data/cms.json on disk
 * - Vercel: Upstash Redis (UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN)
 *
 * Without Redis on Vercel, writes only live in memory for one serverless instance
 * and disappear on reload / cold start.
 */

const CMS_KEY = "teamx:cms:v1";

export type StorageBackend = "redis" | "file" | "memory";

export function hasRedis(): boolean {
  return Boolean(
    process.env.UPSTASH_REDIS_REST_URL?.trim() &&
      process.env.UPSTASH_REDIS_REST_TOKEN?.trim()
  );
}

export function getStorageBackend(): StorageBackend {
  if (hasRedis()) return "redis";
  if (process.env.VERCEL) return "memory";
  return "file";
}

async function redisCommand(command: unknown[]): Promise<unknown> {
  const url = process.env.UPSTASH_REDIS_REST_URL!.replace(/\/$/, "");
  const token = process.env.UPSTASH_REDIS_REST_TOKEN!;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Upstash Redis error ${res.status}: ${text}`);
  }
  const json = (await res.json()) as { result?: unknown; error?: string };
  if (json.error) throw new Error(json.error);
  return json.result;
}

export async function loadPersistedJson(): Promise<string | null> {
  if (!hasRedis()) return null;
  const result = await redisCommand(["GET", CMS_KEY]);
  return typeof result === "string" ? result : null;
}

export async function savePersistedJson(json: string): Promise<void> {
  if (!hasRedis()) {
    throw new Error("Redis is not configured");
  }
  await redisCommand(["SET", CMS_KEY, json]);
}

export function storageStatusMessage(): string {
  const backend = getStorageBackend();
  if (backend === "redis") {
    return "Persistent storage (Upstash Redis) — edits survive reloads.";
  }
  if (backend === "file") {
    return "Local file storage (data/cms.json) — fine for development.";
  }
  return "Ephemeral storage on Vercel — edits will reset on reload until you add Upstash Redis (see .env.example).";
}
