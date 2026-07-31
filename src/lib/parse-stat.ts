export function parseStatValue(raw: string): {
  value: number;
  suffix: string;
  prefix: string;
  decimals: number;
} {
  const prefix = raw.startsWith("<") ? "<" : "";
  const cleaned = raw.replace(/^[<>]/, "");
  const numMatch = cleaned.match(/^([\d.]+)/);
  const numStr = numMatch?.[1] ?? "0";
  const value = parseFloat(numStr);
  const suffix = cleaned.slice(numStr.length);
  const decimals = numStr.includes(".") ? (numStr.split(".")[1]?.length ?? 0) : 0;

  return { value, suffix, prefix, decimals };
}
