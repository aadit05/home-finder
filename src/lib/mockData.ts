import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  city: string;
  locality: string;
  address: string;
  propertyType: "flat" | "villa" | "plot" | "commercial";
  bhk: number;
  areaSqft: number;
  amenities: string[];
  images: string[];
  ownerId: string;
  ownerName: string;
  status: "active" | "sold" | "pending";
  featured: boolean;
  views: number;
  aiScore?: number;
  predictedPrice?: number;
  createdAt: string;
}

export const properties: Property[] = [
  {
    id: "1",
    title: "Skyline Penthouse with Panoramic Views",
    description: "Luxurious 4 BHK penthouse with floor-to-ceiling windows offering breathtaking city views. Features a private terrace, designer kitchen, and smart home automation throughout.",
    price: 25000000,
    city: "Mumbai",
    locality: "Worli",
    address: "The Skyline Towers, Worli Sea Face",
    propertyType: "flat",
    bhk: 4,
    areaSqft: 3200,
    amenities: ["Swimming Pool", "Gym", "Concierge", "Parking", "Smart Home", "Terrace"],
    images: [property1, property2, property3],
    ownerId: "u1",
    ownerName: "Arjun Mehta",
    status: "active",
    featured: true,
    views: 1240,
    aiScore: 94,
    predictedPrice: 24500000,
    createdAt: "2026-02-15",
  },
  {
    id: "2",
    title: "Modern Villa in Whitefield",
    description: "Stunning 5 BHK independent villa with landscaped garden, private pool, and contemporary interiors. Located in a premium gated community with 24/7 security.",
    price: 18500000,
    city: "Bangalore",
    locality: "Whitefield",
    address: "Prestige Lakeside Habitat",
    propertyType: "villa",
    bhk: 5,
    areaSqft: 4500,
    amenities: ["Private Pool", "Garden", "Gym", "Club House", "Security", "Power Backup"],
    images: [property3, property1, property2],
    ownerId: "u2",
    ownerName: "Priya Sharma",
    status: "active",
    featured: true,
    views: 890,
    aiScore: 91,
    predictedPrice: 19200000,
    createdAt: "2026-02-10",
  },
  {
    id: "3",
    title: "Elegant 3 BHK in Bandra West",
    description: "Beautifully renovated apartment with sea-facing balcony, modular kitchen, and premium fixtures. Walking distance to Bandstand promenade and popular restaurants.",
    price: 15000000,
    city: "Mumbai",
    locality: "Bandra West",
    address: "Sea Breeze Apartments, Turner Road",
    propertyType: "flat",
    bhk: 3,
    areaSqft: 1800,
    amenities: ["Sea View", "Gym", "Parking", "Children Play Area", "Lift"],
    images: [property2, property3, property1],
    ownerId: "u3",
    ownerName: "Rahul Desai",
    status: "active",
    featured: false,
    views: 650,
    aiScore: 87,
    predictedPrice: 14800000,
    createdAt: "2026-02-20",
  },
  {
    id: "4",
    title: "Premium Commercial Space in Cyber City",
    description: "Ready-to-move-in commercial office space with modern interiors, central AC, and ample parking. Ideal for IT companies and startups.",
    price: 32000000,
    city: "Gurugram",
    locality: "Cyber City",
    address: "DLF Cyber Hub, Phase 2",
    propertyType: "commercial",
    bhk: 0,
    areaSqft: 5000,
    amenities: ["Central AC", "Parking", "Cafeteria", "24/7 Security", "Power Backup", "High Speed Internet"],
    images: [property1, property2, property3],
    ownerId: "u4",
    ownerName: "Vikram Singh",
    status: "active",
    featured: true,
    views: 420,
    aiScore: 82,
    predictedPrice: 31500000,
    createdAt: "2026-01-28",
  },
  {
    id: "5",
    title: "Spacious Plot in Sarjapur Road",
    description: "Premium residential plot in a BMRDA-approved layout. Close to IT hubs, schools, and hospitals. Perfect for building your dream home.",
    price: 8500000,
    city: "Bangalore",
    locality: "Sarjapur Road",
    address: "Green Valley Layout, Sarjapur",
    propertyType: "plot",
    bhk: 0,
    areaSqft: 2400,
    amenities: ["Gated Community", "Club House", "Park", "Water Supply", "Electricity"],
    images: [property3, property2, property1],
    ownerId: "u5",
    ownerName: "Ananya Reddy",
    status: "active",
    featured: false,
    views: 310,
    aiScore: 78,
    predictedPrice: 8800000,
    createdAt: "2026-02-05",
  },
  {
    id: "6",
    title: "Luxury 2 BHK in Koregaon Park",
    description: "Contemporary 2 BHK apartment with designer interiors, Italian marble flooring, and a scenic balcony overlooking the lush garden area.",
    price: 9500000,
    city: "Pune",
    locality: "Koregaon Park",
    address: "Marvel Arco, Lane 6",
    propertyType: "flat",
    bhk: 2,
    areaSqft: 1200,
    amenities: ["Swimming Pool", "Gym", "Garden", "Security", "Parking"],
    images: [property2, property1, property3],
    ownerId: "u6",
    ownerName: "Sneha Kulkarni",
    status: "active",
    featured: false,
    views: 540,
    aiScore: 85,
    predictedPrice: 9200000,
    createdAt: "2026-02-18",
  },
];

export const cities = ["Mumbai", "Bangalore", "Gurugram", "Pune", "Delhi", "Hyderabad", "Chennai"];
export const propertyTypes = ["flat", "villa", "plot", "commercial"] as const;
export const bhkOptions = [1, 2, 3, 4, 5];

export function formatPrice(price: number): string {
  if (price >= 10000000) return `₹${(price / 10000000).toFixed(1)} Cr`;
  if (price >= 100000) return `₹${(price / 100000).toFixed(1)} L`;
  return `₹${price.toLocaleString("en-IN")}`;
}

export function formatArea(area: number): string {
  return `${area.toLocaleString("en-IN")} sq.ft`;
}
