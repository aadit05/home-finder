import { useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cities, propertyTypes, bhkOptions } from "@/lib/mockData";

export interface Filters {
  search: string;
  listingType: string;
  city: string;
  propertyType: string;
  bhk: string;
  minPrice: string;
  maxPrice: string;
  sortBy: string;
}

interface Props {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

const SearchFilters = ({ filters, onChange }: Props) => {
  const [expanded, setExpanded] = useState(false);

  const update = (key: keyof Filters, value: string) => {
    onChange({ ...filters, [key]: value });
  };

  const clearAll = () => {
    onChange({
      search: "",
      listingType: "",
      city: "",
      propertyType: "",
      bhk: "",
      minPrice: "",
      maxPrice: "",
      sortBy: "newest",
    });
  };

  const hasFilters = filters.city || filters.propertyType || filters.bhk || filters.minPrice || filters.maxPrice || filters.listingType;

  return (
    <div className="rounded-xl border bg-card p-4 shadow-card">
      {/* Buy/Rent Toggle + Search */}
      <div className="flex gap-2">
        <div className="flex rounded-lg border bg-secondary p-0.5">
          <button
            onClick={() => update("listingType", "")}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              !filters.listingType ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            All
          </button>
          <button
            onClick={() => update("listingType", "sale")}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              filters.listingType === "sale" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Buy
          </button>
          <button
            onClick={() => update("listingType", "rent")}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              filters.listingType === "rent" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Rent
          </button>
        </div>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by location, project, or keyword..."
            value={filters.search}
            onChange={(e) => update("search", e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" onClick={() => setExpanded(!expanded)} className="gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          Filters
          {hasFilters && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">!</span>
          )}
        </Button>
      </div>

      {/* Expanded filters */}
      {expanded && (
        <div className="mt-4 animate-fade-in">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            <Select value={filters.city} onValueChange={(v) => update("city", v)}>
              <SelectTrigger><SelectValue placeholder="City" /></SelectTrigger>
              <SelectContent>
                {cities.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={filters.propertyType} onValueChange={(v) => update("propertyType", v)}>
              <SelectTrigger><SelectValue placeholder="Property Type" /></SelectTrigger>
              <SelectContent>
                {propertyTypes.map((t) => <SelectItem key={t} value={t} className="capitalize">{t}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={filters.bhk} onValueChange={(v) => update("bhk", v)}>
              <SelectTrigger><SelectValue placeholder="BHK" /></SelectTrigger>
              <SelectContent>
                {bhkOptions.map((b) => <SelectItem key={b} value={String(b)}>{b} BHK</SelectItem>)}
              </SelectContent>
            </Select>
            <Input type="number" placeholder="Min Price (₹)" value={filters.minPrice} onChange={(e) => update("minPrice", e.target.value)} />
            <Input type="number" placeholder="Max Price (₹)" value={filters.maxPrice} onChange={(e) => update("maxPrice", e.target.value)} />
          </div>
          <div className="mt-3 flex items-center justify-between">
            <Select value={filters.sortBy} onValueChange={(v) => update("sortBy", v)}>
              <SelectTrigger className="w-48"><SelectValue placeholder="Sort By" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="ai-score">AI Score</SelectItem>
              </SelectContent>
            </Select>
            {hasFilters && (
              <Button variant="ghost" size="sm" onClick={clearAll} className="gap-1 text-muted-foreground">
                <X className="h-3 w-3" />Clear all
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;
