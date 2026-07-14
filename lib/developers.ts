import { developerSlug } from "@/lib/slug";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3002";

export type PublicDeveloperListItem = {
  id: number;
  name: string;
  logoUrl: string | null;
  projectsCount: number;
};

export type PublicDeveloperProject = {
  id: number;
  name: string;
  imageUrl: string | null;
  location: string | null;
  district: string | null;
  deliveryDate: string | null;
  totalUnits: number | null;
};

export type PublicDeveloper = {
  id: number;
  name: string;
  logoUrl: string | null;
  description: string | null;
  phone: string | null;
  website: string | null;
  legalAddress: string | null;
  officeAddress: string | null;
  verified: boolean;
  projectsCount: number;
  projects: PublicDeveloperProject[];
};

export async function fetchDeveloperList(): Promise<PublicDeveloperListItem[]> {
  try {
    const res = await fetch(`${API}/developers/public`, { next: { revalidate: 600 } });
    if (!res.ok) return [];
    return (await res.json()) as PublicDeveloperListItem[];
  } catch {
    return [];
  }
}

export async function fetchDeveloper(id: number): Promise<PublicDeveloper | null> {
  try {
    const res = await fetch(`${API}/developers/public/${id}`, { next: { revalidate: 600 } });
    if (!res.ok) return null;
    const d = await res.json();
    return d && d.id ? (d as PublicDeveloper) : null;
  } catch {
    return null;
  }
}

export function devHref(d: { id: number; name: string }): string {
  return `/developers/${developerSlug(d.name, d.id)}`;
}
