import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SearchFilters, { type Filters } from "@/components/SearchFilters";
import PropertyCard from "@/components/PropertyCard";
import { properties } from "@/lib/mockData";

const Properties = () => {
  const [searchParams] = useSearchParams();
  const initialCity = searchParams.get("city") || "";

  const [filters, setFilters] = useState<Filters>({
    search: "",
    city: initialCity,
    propertyType: "",
    bhk: "",
    minPrice: "",
    maxPrice: "",
    sortBy: "newest",
  });

  const filtered = useMemo(() => {
    let result = [...properties];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q) ||
          p.locality.toLowerCase().includes(q)
      );
    }
    if (filters.city) result = result.filter((p) => p.city === filters.city);
    if (filters.propertyType) result = result.filter((p) => p.propertyType === filters.propertyType);
    if (filters.bhk) result = result.filter((p) => p.bhk === Number(filters.bhk));
    if (filters.minPrice) result = result.filter((p) => p.price >= Number(filters.minPrice));
    if (filters.maxPrice) result = result.filter((p) => p.price <= Number(filters.maxPrice));

    switch (filters.sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "ai-score":
        result.sort((a, b) => (b.aiScore || 0) - (a.aiScore || 0));
        break;
      default:
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return result;
  }, [filters]);

  return (
    <div className="container py-8">
      <div className="mb-6">
        <h1 className="font-display text-3xl font-bold text-foreground">Properties</h1>
        <p className="text-muted-foreground mt-1">
          {filtered.length} properties found
        </p>
      </div>

      <SearchFilters filters={filters} onChange={setFilters} />

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <PropertyCard key={p.id} property={p} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-16 text-center">
          <p className="text-lg text-muted-foreground">No properties match your criteria.</p>
          <p className="mt-1 text-sm text-muted-foreground">Try adjusting your filters.</p>
        </div>
      )}
    </div>
  );
};

export default Properties;
