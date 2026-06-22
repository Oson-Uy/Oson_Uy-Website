import { notFound } from "next/navigation";
import SceneViewer, { type ScenePayload } from "./SceneViewer";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3002";

async function getScene(projectId: string): Promise<ScenePayload | null> {
  try {
    const res = await fetch(`${API}/projects/${projectId}/scene`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return (await res.json()) as ScenePayload;
  } catch {
    return null;
  }
}

export const dynamic = "force-dynamic";

export default async function Scene3DPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const scene = await getScene(projectId);
  if (!scene) notFound();
  return <SceneViewer projectId={Number(projectId)} scene={scene} apiBase={API} />;
}
