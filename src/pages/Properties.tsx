import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SearchFilters, { type Filters } from "@/components/SearchFilters";
import PropertyCard from "@/components/PropertyCard";
import { seedProperties, type Property } from "@/lib/mockData";
import { supabase } from "@/integrations/supabase/client";

const Properties = () => {
  const [searchParams] = useSearchParams();
  const initialCity = searchParams.get("city") || "";
  const initialType = searchParams.get("type") || "";

  const [filters, setFilters] = useState<Filters>({
    search: "",
    listingType: initialType,
    city: initialCity,
    propertyType: "",
    bhk: "",
    minPrice: "",
    maxPrice: "",
    sortBy: "newest",
  });

  const [dbProperties, setDbProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("status", "active");

      if (error) {
        console.error("Error fetching properties:", error);
        setDbProperties([]);
      } else {
        const mapped: Property[] = (data || []).map((p) => ({
          ...p,
          amenities: Array.isArray(p.amenities) ? p.amenities as string[] : [],
          images: p.images || [],
        }));
        setDbProperties(mapped);
      }
      setLoading(false);
    };
    fetchProperties();
  }, []);

  // Use DB properties if available, otherwise seed
  const allProperties = dbProperties.length > 0 ? dbProperties : seedProperties;

  const filtered = useMemo(() => {
    let result = [...allProperties];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q) ||
          p.locality.toLowerCase().includes(q)
      );
    }
    if (filters.listingType) result = result.filter((p) => p.listing_type === filters.listingType);
    if (filters.city) result = result.filter((p) => p.city === filters.city);
    if (filters.propertyType) result = result.filter((p) => p.property_type === filters.propertyType);
    if (filters.bhk) result = result.filter((p) => p.bhk === Number(filters.bhk));
    if (filters.minPrice) result = result.filter((p) => p.price >= Number(filters.minPrice));
    if (filters.maxPrice) result = result.filter((p) => p.price <= Number(filters.maxPrice));

    switch (filters.sortBy) {
      case "price-low": result.sort((a, b) => a.price - b.price); break;
      case "price-high": result.sort((a, b) => b.price - a.price); break;
      case "ai-score": result.sort((a, b) => (b.ai_score || 0) - (a.ai_score || 0)); break;
      default: result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }

    return result;
  }, [filters, allProperties]);

  return (
    <div className="container py-8">
      <div className="mb-6">
        <h1 className="font-display text-3xl font-bold text-foreground">Properties</h1>
        <p className="text-muted-foreground mt-1">
          {loading ? "Loading..." : `${filtered.length} properties found`}
        </p>
      </div>

      <SearchFilters filters={filters} onChange={setFilters} />

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <PropertyCard key={p.id} property={p} />
        ))}
      </div>

      {!loading && filtered.length === 0 && (
        <div className="mt-16 text-center">
          <p className="text-lg text-muted-foreground">No properties match your criteria.</p>
          <p className="mt-1 text-sm text-muted-foreground">Try adjusting your filters.</p>
        </div>
      )}
    </div>
  );
};

export default Properties;
