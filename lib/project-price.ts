/** Min total listing price from apartments and/or per-floor pricing (API shape uses `floors` for ProjectFloor[]). */
export function minListingPriceFromApiProject(project: {
  apartments?: { price: number }[];
  floors?: { pricePerM2: number; areaSqm: number }[];
}): number {
  const aptPrices = project.apartments?.length
    ? project.apartments.map((a) => a.price)
    : [];
  const floorTotals = project.floors?.length
    ? project.floors.map((f) => f.pricePerM2 * f.areaSqm)
    : [];
  const all = [...aptPrices, ...floorTotals].filter((n) => n > 0);
  if (!all.length) return 0;
  return Math.min(...all);
}
