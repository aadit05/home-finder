import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { MapPin, List, LayoutGrid, Building2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { seedProperties, formatPrice, type Property } from "@/lib/mockData";
import { supabase } from "@/integrations/supabase/client";
import { getPropertyImage } from "@/lib/stockImages";

// Fix leaflet default icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const createPriceIcon = (price: string, featured: boolean) => {
  return L.divIcon({
    className: "price-marker",
    html: `<div class="px-2 py-1 rounded-md text-xs font-bold shadow-md whitespace-nowrap ${
      featured ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground"
    }">${price}</div>`,
    iconSize: [80, 28],
    iconAnchor: [40, 28],
  });
};

const cityCoords: Record<string, [number, number]> = {
  Mumbai: [19.076, 72.8777],
  Delhi: [28.6139, 77.209],
  Bangalore: [12.9716, 77.5946],
  Hyderabad: [17.385, 78.4867],
  Chennai: [13.0827, 80.2707],
  Pune: [18.5204, 73.8567],
  Kolkata: [22.5726, 88.3639],
  Ahmedabad: [23.0225, 72.5714],
  Jaipur: [26.9124, 75.7873],
  Lucknow: [26.8467, 80.9462],
  Gurgaon: [28.4595, 77.0266],
  Noida: [28.5355, 77.391],
};

const getPropertyCoords = (p: Property): [number, number] => {
  if (p.latitude && p.longitude) return [p.latitude, p.longitude];
  const base = cityCoords[p.city] || [20.5937, 78.9629];
  const hash = p.id.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return [base[0] + (hash % 100 - 50) * 0.005, base[1] + ((hash * 7) % 100 - 50) * 0.005];
};

const MapExplorer = () => {
  const [dbProperties, setDbProperties] = useState<Property[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [listingType, setListingType] = useState<"all" | "sale" | "rent">("all");

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from("properties").select("*").eq("status", "active");
      if (data) {
        setDbProperties(data.map((p) => ({
          ...p,
          amenities: Array.isArray(p.amenities) ? (p.amenities as string[]) : [],
          images: p.images || [],
        })));
      }
    };
    fetch();
  }, []);

  const allProperties = dbProperties.length > 0 ? dbProperties : seedProperties;
  const filtered = useMemo(() => {
    if (listingType === "all") return allProperties;
    return allProperties.filter((p) => p.listing_type === listingType);
  }, [allProperties, listingType]);

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)]">
      {/* Toolbar */}
      <div className="border-b bg-card px-4 py-2 flex items-center gap-3 shrink-0">
        <h1 className="font-display text-lg font-bold text-foreground flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" /> Map Explorer
        </h1>
        <div className="flex items-center gap-1 ml-4 rounded-lg border bg-background p-0.5">
          {(["all", "sale", "rent"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setListingType(t)}
              className={`rounded-md px-3 py-1 text-xs font-semibold transition-colors ${
                listingType === t ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t === "all" ? "All" : t === "sale" ? "Buy" : "Rent"}
            </button>
          ))}
        </div>
        <span className="text-sm text-muted-foreground ml-auto">{filtered.length} properties</span>
      </div>

      <div className="flex flex-1 min-h-0">
        {/* Sidebar list */}
        <div className="hidden md:flex flex-col w-80 border-r bg-card overflow-y-auto">
          {filtered.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedProperty(p)}
              className={`flex gap-3 p-3 border-b text-left hover:bg-secondary/50 transition-colors ${
                selectedProperty?.id === p.id ? "bg-secondary" : ""
              }`}
            >
              <img
                src={getPropertyImage(p.images, 0)}
                alt={p.title}
                className="w-20 h-16 rounded-md object-cover shrink-0"
                loading="lazy"
              />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-card-foreground truncate">{p.title}</p>
                <p className="text-xs text-muted-foreground truncate">{p.locality}, {p.city}</p>
                <p className="text-sm font-bold text-primary mt-0.5">{formatPrice(p.price)}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Map */}
        <div className="flex-1 relative">
          <MapContainer
            center={[20.5937, 78.9629]}
            zoom={5}
            className="h-full w-full z-0"
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {filtered.map((p) => {
              const coords = getPropertyCoords(p);
              return (
                <Marker
                  key={p.id}
                  position={coords}
                  icon={createPriceIcon(formatPrice(p.price), p.featured)}
                  eventHandlers={{ click: () => setSelectedProperty(p) }}
                >
                  <Popup>
                    <div className="w-48">
                      <img src={getPropertyImage(p.images, 0)} alt={p.title} className="w-full h-24 object-cover rounded-md mb-2" />
                      <p className="font-semibold text-sm">{p.title}</p>
                      <p className="text-xs text-gray-500">{p.locality}, {p.city}</p>
                      <p className="font-bold text-sm mt-1">{formatPrice(p.price)}</p>
                      <Link to={`/property/${p.id}`} className="text-xs text-blue-600 hover:underline mt-1 block">
                        View Details →
                      </Link>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>

          {/* Selected property panel on mobile */}
          {selectedProperty && (
            <div className="absolute bottom-4 left-4 right-4 md:hidden bg-card rounded-xl shadow-elevated border p-3 z-[1000]">
              <button onClick={() => setSelectedProperty(null)} className="absolute top-2 right-2">
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
              <div className="flex gap-3">
                <img src={getPropertyImage(selectedProperty.images, 0)} alt="" className="w-20 h-16 rounded-md object-cover" />
                <div>
                  <p className="font-semibold text-sm">{selectedProperty.title}</p>
                  <p className="text-xs text-muted-foreground">{selectedProperty.locality}, {selectedProperty.city}</p>
                  <p className="font-bold text-primary mt-0.5">{formatPrice(selectedProperty.price)}</p>
                  <Link to={`/property/${selectedProperty.id}`} className="text-xs text-primary hover:underline">View →</Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MapExplorer;
