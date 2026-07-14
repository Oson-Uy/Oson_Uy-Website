import { clean } from "@/lib/seo/schema";

/**
 * Renders a JSON-LD block. Server component — safe to place anywhere in the
 * server tree. Objects are cleaned of empty fields before serialisation.
 */
export function JsonLd({ data }: { data: object | null | undefined }) {
  if (!data) return null;
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe here (no user HTML); escape < to be strict.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(clean(data)).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export default JsonLd;
