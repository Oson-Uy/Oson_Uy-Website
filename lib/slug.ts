/** SEO slug helpers. Developer URLs look like /developers/txt-group-21 —
 *  a readable name slug with the numeric id appended for reliable lookup. */

const MAP: Record<string, string> = {
  а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e", ж: "zh", з: "z",
  и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r",
  с: "s", т: "t", у: "u", ф: "f", х: "h", ц: "c", ч: "ch", ш: "sh", щ: "sch",
  ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya", "ʻ": "", "‘": "", "'": "",
};

export function slugify(input: string): string {
  const s = (input || "")
    .toLowerCase()
    .split("")
    .map((ch) => (ch in MAP ? MAP[ch] : ch))
    .join("");
  return s
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || "developer";
}

export function developerSlug(name: string, id: number): string {
  return `${slugify(name)}-${id}`;
}

/** Extract the trailing numeric id from a slug like "txt-group-21" → 21. */
export function idFromSlug(slug: string): number | null {
  const m = String(slug).match(/(\d+)$/);
  return m ? Number(m[1]) : null;
}
