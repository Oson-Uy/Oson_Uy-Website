import type { MetadataRoute } from "next";
import {
  BRAND_IMAGE_ICON_PATH,
  BRAND_IMAGE_OG_PATH,
} from "@/lib/brand";

/**
 * Web App Manifest — improves the Lighthouse "Best Practices" / PWA score and
 * gives Android install / rich search metadata for the brand.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Oson Uy — новостройки Узбекистана",
    short_name: "Oson Uy",
    description:
      "Маркетплейс новостроек Узбекистана: проверенные застройщики, квартиры в рассрочку и ипотеку, онлайн-подбор жилья.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1E3A8A",
    lang: "ru",
    dir: "ltr",
    categories: ["business", "shopping", "lifestyle"],
    icons: [
      { src: BRAND_IMAGE_ICON_PATH, sizes: "any", type: "image/png", purpose: "any" },
      { src: BRAND_IMAGE_OG_PATH, sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
