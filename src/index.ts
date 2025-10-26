export type StyleName = "upper" | "lower" | "leet" | "weird";

/** Base utils */
export const removeAccents = (str: string) =>
  str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

export const normalizeWhitespace = (str: string) => str.trim().replace(/\s+/g, " ");

export const reverse = (str: string) => [...str].reverse().join("");

export const stripNonAscii = (str: string) => str.replace(/[^\x00-\x7F]+/g, "");

/** Case & titles */
export const capitalize = (str: string) =>
  str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : str;

export const toTitleCase = (str: string) =>
  str.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());

export const toSentenceCase = (str: string) =>
  str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : str;

const LITTLE_WORDS = new Set([
  "a","an","the","and","or","but","for","nor","on","at","to","from","by","of","in","with"
]);
export const titleSmart = (str: string) => {
  const parts = normalizeWhitespace(str).split(" ");
  return parts
    .map((p, i) => (i !== 0 && LITTLE_WORDS.has(p.toLowerCase()) ? p.toLowerCase() : capitalize(p)))
    .join(" ");
};

export const nameCase = (str: string) =>
  normalizeWhitespace(str)
    .split(" ")
    .map((p) => (p.toUpperCase() === p || p.toLowerCase() === p ? capitalize(p) : p))
    .join(" ");

/** Slug & cases */
export const toSlug = (str: string) =>
  removeAccents(str)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const kebabCase = (str: string) =>
  removeAccents(str)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const snakeCase = (str: string) =>
  removeAccents(str)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");

export const camelCase = (str: string) => {
  const s = removeAccents(str).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  const words = s.split(" ");
  if (words.length === 0) return "";
  return words[0] + words.slice(1).map((w) => (w ? w[0].toUpperCase() + w.slice(1) : "")).join("");
};

/** Trim & pad */
export const truncate = (str: string, len: number) =>
  str.length > len ? str.slice(0, Math.max(0, len - 3)) + "..." : str;

export const limitWords = (str: string, count: number) => {
  const words = normalizeWhitespace(str).split(" ");
  return words.length > count ? words.slice(0, count).join(" ") + "..." : str;
};

export const pad = (str: string, length: number, char = " ") => {
  if (char.length != 1) throw new Error("pad: 'char' must be a single character");
  if (str.length >= length) return str;
  const total = length - str.length;
  const left = Math.floor(total / 2);
  const right = total - left;
  return char.repeat(left) + str + char.repeat(right);
};

export const wrap = (str: string, width: number) => {
  const words = normalizeWhitespace(str).split(" ");
  const lines: string[] = [];
  let line = "";
  for (const w of words) {
    if (!line) line = w;
    else if ((line + " " + w).length <= width) line += " " + w;
    else { lines.push(line); line = w; }
  }
  if (line) lines.push(line);
  return lines.join("\n");
};

/** Clean */
export const cleanHTML = (html: string) => {
  // Remove scripts and styles
  const withoutTags = html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ");
  return normalizeWhitespace(withoutTags);
};

/** Counts */
export const countWords = (str: string) => {
  const m = normalizeWhitespace(str).match(/[^\s]+/g);
  return m ? m.length : 0;
};

export const countOccurrences = (str: string, sub: string) => {
  if (!sub) return 0;
  let count = 0;
  let pos = 0;
  while (true) {
    const idx = str.indexOf(sub, pos);
    if (idx === -1) break;
    count++;
    pos = idx + sub.length;
  }
  return count;
};

/** Fun styles */
const LEET_MAP: Record<string, string> = {
  a: "4", b: "8", e: "3", i: "1", l: "1", o: "0", s: "5", t: "7", g: "9"
};
const WEIRD_MAP: Record<string, string> = {
  a: "ä", e: "ë", i: "ï", o: "ö", u: "ü", n: "ñ", c: "ç"
};

export const randomCase = (str: string) =>
  [...str]
    .map((ch) => (/[a-z]/i.test(ch) ? (Math.random() < 0.5 ? ch.toLowerCase() : ch.toUpperCase()) : ch))
    .join("");

export const alternatingCase = (str: string) => {
  let upper = true;
  return [...str]
    .map((ch) => {
      if (!/[a-z]/i.test(ch)) return ch;
      const out = upper ? ch.toUpperCase() : ch.toLowerCase();
      upper = !upper;
      return out;
    })
    .join("");
};

export const stylize = (str: string, style: StyleName): string => {
  switch (style) {
    case "upper":
      return str.toUpperCase();
    case "lower":
      return str.toLowerCase();
    case "leet":
      return [...str]
        .map((ch) => {
          const low = ch.toLowerCase();
          const mapped = LEET_MAP[low];
          return mapped ? mapped : ch;
        })
        .join("");
    case "weird":
      return [...str]
        .map((ch) => {
          const low = ch.toLowerCase();
          const mapped = WEIRD_MAP[low];
          if (!mapped) return ch;
          return ch === low ? mapped : mapped.toUpperCase();
        })
        .join("");
    default:
      return str;
  }
};