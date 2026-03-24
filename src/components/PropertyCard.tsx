import { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Maximize, BedDouble, Brain, Eye, TrendingUp, IndianRupee, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { type Property, formatPrice, formatArea } from "@/lib/mockData";

interface Props {
  property: Property;
}

const PropertyCard = ({ property }: Props) => {
  const [liked, setLiked] = useState(false);

  const typeLabels: Record<string, string> = {
    flat: "Apartment",
    villa: "Villa",
    plot: "Plot",
    commercial: "Commercial",
  };

  const isRental = property.listing_type === "rent";

  return (
    <div className="group relative">
      <Link to={`/property/${property.id}`} className="block">
        <div className="overflow-hidden rounded-xl border bg-card shadow-card transition-all duration-300 hover:shadow-elevated">
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={property.images[0] || "/placeholder.svg"}
              alt={property.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />

            {/* Badges */}
            <div className="absolute left-2.5 top-2.5 flex flex-wrap gap-1.5">
              {property.featured && (
                <Badge className="bg-warning text-warning-foreground border-0 text-[10px] font-semibold px-2 py-0.5">⭐ Featured</Badge>
              )}
              {property.status === "active" && (
                <Badge className="bg-success text-success-foreground border-0 text-[10px] font-semibold px-2 py-0.5">
                  Ready To Move
                </Badge>
              )}
            </div>

            {/* AI Score */}
            {property.ai_score && (
              <div className="absolute right-2.5 bottom-2.5 flex items-center gap-1 rounded-full bg-card/90 px-2 py-0.5 text-[10px] font-semibold backdrop-blur-sm">
                <Brain className="h-3 w-3 text-ai" />
                <span>{property.ai_score}%</span>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="p-3.5">
            <h3 className="font-display text-sm font-semibold text-card-foreground line-clamp-1 group-hover:text-primary transition-colors">
              {property.title}
            </h3>
            <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
              {property.bhk > 0 && <span>{property.bhk} BHK {typeLabels[property.property_type]}</span>}
              {property.bhk > 0 && <span>in</span>}
              <span>{property.locality}, {property.city}</span>
            </p>

            <p className="mt-2 font-display text-lg font-bold text-foreground">
              {formatPrice(property.price)}{isRental ? "/mo" : ""}
            </p>

            {property.predicted_price && (
              <p className="flex items-center gap-1 text-[10px] text-ai font-medium">
                <TrendingUp className="h-3 w-3" />
                AI Estimate: {formatPrice(property.predicted_price)}{isRental ? "/mo" : ""}
              </p>
            )}

            <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
              {property.bhk > 0 && (
                <span className="flex items-center gap-1">
                  <BedDouble className="h-3 w-3" />
                  {property.bhk} BHK
                </span>
              )}
              <span className="flex items-center gap-1">
                <Maximize className="h-3 w-3" />
                {formatArea(property.area_sqft)}
              </span>
              {isRental && property.furnishing_status && (
                <span className="capitalize">{property.furnishing_status}</span>
              )}
            </div>

            {isRental && property.deposit_amount && (
              <p className="mt-1.5 flex items-center gap-1 text-[10px] text-muted-foreground">
                <IndianRupee className="h-3 w-3" />
                Deposit: {formatPrice(property.deposit_amount)}
              </p>
            )}
          </div>
        </div>
      </Link>

      {/* Wishlist heart - outside Link to prevent navigation */}
      <button
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setLiked(!liked); }}
        className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-sm hover:bg-white transition-colors"
      >
        <Heart className={`h-4 w-4 transition-colors ${liked ? "fill-accent text-accent" : "text-muted-foreground"}`} />
      </button>
    </div>
  );
};

export default PropertyCard;
