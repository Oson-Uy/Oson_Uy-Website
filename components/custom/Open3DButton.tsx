"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Box } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3002";

/**
 * Shows an "Open 3D Model" button only when the project has a PUBLISHED 3D
 * scene. Self-contained: fetches scene status client-side, renders nothing
 * otherwise (no dead-end links).
 */
export function Open3DButton({
  projectId,
  className,
}: {
  projectId: number;
  className?: string;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let alive = true;
    fetch(`${API}/projects/${projectId}/scene`, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((s) => {
        if (alive && s?.status === "READY") setReady(true);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [projectId]);

  if (!ready) return null;

  return (
    <Link
      href={`/3d/${projectId}`}
      className={
        className ??
        "inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#1E3A8A] to-[#F97316] px-5 py-3 text-sm font-black text-white shadow-lg transition hover:opacity-90"
      }
    >
      <Box className="h-4 w-4" />
      Открыть 3D-модель
    </Link>
  );
}
