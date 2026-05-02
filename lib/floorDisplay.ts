import type { ProjectFloor } from "@/types";

export function minFloorInProject(floors: ProjectFloor[]): number {
  if (!floors.length) return 0;
  return Math.min(...floors.map((f) => f.floor));
}

/** Нижний ярус в модели и в данных — торговый; жилые этажи считаем от 1 над ним. */
export function isRetailStory(f: ProjectFloor, minFloor: number): boolean {
  return f.floor === minFloor;
}

/** Номер для подписи «N этаж» над торговым минимумом (при min=1 и floor=2 → 1). */
export function residentialStoryNumber(f: ProjectFloor, minFloor: number): number {
  return f.floor - minFloor;
}
