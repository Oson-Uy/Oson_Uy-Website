import { Project } from "@/types";

export const PROJECTS: Project[] = [
    {
        id: "silk-road",
        name: "Silk Road Residences",
        developer: "UzInvest Group",
        location: "Tashkent",
        district: "Mirabad District",
        priceFrom: 240000,
        deliveryDate: "Q2 2025",
        floors: 18,
        isPopular: true,
        isPremium: true,
        image: "https://picsum.photos/seed/silk/1200/800",
        description: "Experience luxury living at the heart of the Silk Road. Modern design meets traditional aesthetics.",
        apartments: [
            { id: "s1", projectId: "silk-road", unitType: "Studio Alpha", block: "A-04", area: 42.5, floor: "12 of 18", price: 51000 },
            { id: "s2", projectId: "silk-road", unitType: "2-Bedroom Comfort", block: "B-12", area: 78.2, floor: "08 of 18", price: 93840 },
        ]
    },
    {
        id: "infinity",
        name: "Infinity Residences",
        developer: "Golden House",
        location: "Tashkent",
        district: "Yunusabad District",
        priceFrom: 180000,
        deliveryDate: "Q4 2025",
        floors: 24,
        isPopular: true,
        image: "https://picsum.photos/seed/infinity/1200/800",
        description: "Limitless comfort and breathtaking views in the most dynamic district of Tashkent.",
        apartments: [
            { id: "i1", projectId: "infinity", unitType: "1-Bedroom Elite", block: "C-01", area: 55.0, floor: "15 of 24", price: 65000 },
        ]
    },
    {
        id: "gardenia",
        name: "Gardenia Heights",
        developer: "Murad Buildings",
        location: "Tashkent",
        district: "Mirzo-Ulugbek District",
        priceFrom: 120000,
        deliveryDate: "Q1 2026",
        floors: 12,
        image: "https://picsum.photos/seed/garden/1200/800",
        description: "A green oasis in the urban landscape. Ecological materials and smart design.",
        apartments: []
    },
    {
        id: "sky-tower",
        name: "Sky Tower Loft",
        developer: "Tashkent City",
        location: "Tashkent",
        district: "Shaykhantakhur District",
        priceFrom: 155000,
        deliveryDate: "Ready",
        floors: 45,
        isPopular: false,
        image: "https://picsum.photos/seed/sky/1200/800",
        description: "Reach for the stars. The tallest residential building in Central Asia.",
        apartments: []
    }
];