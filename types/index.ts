export type Location = 'Tashkent' | 'Samarkand' | 'Bukhara';

export interface Apartment {
  id: string;
  projectId: string;
  rooms: number;
  area: number; // in m2
  floor: number;
  price: number; // in USD
  status: 'available' | 'reserved' | 'sold';
  layoutImage: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  location: Location;
  developer: {
    name: string;
    verified: boolean;
    logo: string;
  };
  deliveryDate: string;
  tags: string[];
  images: string[];
  mainImage: string;
  priceFrom: number;
  apartments: Apartment[];
}

export interface FilterState {
  location: Location | 'All';
  rooms: number | 'All';
  priceRange: [number, number];
}
