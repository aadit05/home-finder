import { Link } from "react-router-dom";
import { MapPin, Maximize, BedDouble, Brain, Eye, TrendingUp, IndianRupee } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { type Property, formatPrice, formatArea } from "@/lib/mockData";

interface Props {
  property: Property;
}

const PropertyCard = ({ property }: Props) => {
  const typeLabels: Record<string, string> = {
    flat: "Apartment",
    villa: "Villa",
    plot: "Plot",
    commercial: "Commercial",
  };

  const isRental = property.listing_type === "rent";

  return (
    <Link to={`/property/${property.id}`} className="group block">
      <div className="overflow-hidden rounded-xl border bg-card shadow-card transition-all duration-300 hover:shadow-elevated hover:-translate-y-1">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={property.images[0] || "/placeholder.svg"}
            alt={property.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />

          {/* Badges */}
          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            <Badge className="bg-accent text-accent-foreground border-0 text-xs font-semibold">
              {typeLabels[property.property_type]}
            </Badge>
            <Badge className={`border-0 text-xs font-semibold ${isRental ? "bg-success text-success-foreground" : "bg-ai text-ai-foreground"}`}>
              {isRental ? "Rent" : "Sale"}
            </Badge>
            {property.featured && (
              <Badge className="bg-warning text-warning-foreground border-0 text-xs font-semibold">⭐ Featured</Badge>
            )}
          </div>

          {/* AI Score */}
          {property.ai_score && (
            <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-card/90 px-2.5 py-1 text-xs font-semibold backdrop-blur-sm">
              <Brain className="h-3 w-3 text-ai" />
              <span>{property.ai_score}%</span>
            </div>
          )}

          {/* Price */}
          <div className="absolute bottom-3 left-3">
            <p className="font-display text-2xl font-bold text-primary-foreground drop-shadow-lg">
              {formatPrice(property.price)}{isRental ? "/mo" : ""}
            </p>
            {property.predicted_price && (
              <p className="flex items-center gap-1 text-xs text-primary-foreground/80">
                <TrendingUp className="h-3 w-3" />
                AI: {formatPrice(property.predicted_price)}{isRental ? "/mo" : ""}
              </p>
            )}
          </div>

          <div className="absolute bottom-3 right-3 flex items-center gap-1 text-xs text-primary-foreground/80">
            <Eye className="h-3 w-3" />
            {property.views_count}
          </div>
        </div>

        {/* Details */}
        <div className="p-4">
          <h3 className="font-display text-lg font-semibold text-card-foreground line-clamp-1 group-hover:text-accent transition-colors">
            {property.title}
          </h3>
          <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            {property.locality}, {property.city}
          </p>
          <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
            {property.bhk > 0 && (
              <span className="flex items-center gap-1">
                <BedDouble className="h-3.5 w-3.5" />
                {property.bhk} BHK
              </span>
            )}
            <span className="flex items-center gap-1">
              <Maximize className="h-3.5 w-3.5" />
              {formatArea(property.area_sqft)}
            </span>
            {isRental && property.furnishing_status && (
              <span className="capitalize text-xs">{property.furnishing_status}</span>
            )}
          </div>
          {isRental && property.deposit_amount && (
            <p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
              <IndianRupee className="h-3 w-3" />
              Deposit: {formatPrice(property.deposit_amount)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
