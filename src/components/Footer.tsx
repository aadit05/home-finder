import { Building2, MapPin, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t bg-[hsl(var(--nav-bg))] text-white">
    <div className="container py-10">
      <div className="grid gap-8 md:grid-cols-5">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
              <Building2 className="h-4 w-4 text-accent-foreground" />
            </div>
            <span className="font-display text-lg font-bold">ApnaGhar</span>
          </div>
          <p className="text-sm opacity-60 leading-relaxed max-w-xs">
            India's smartest real estate platform powered by AI. Buy, rent, or sell properties with intelligent price predictions and smart recommendations.
          </p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider opacity-60">For Buyers</h4>
          <div className="flex flex-col gap-1.5 text-sm">
            <Link to="/properties?type=sale" className="opacity-60 hover:opacity-100 transition-opacity">Buy Property</Link>
            <Link to="/properties?type=rent" className="opacity-60 hover:opacity-100 transition-opacity">Rent Property</Link>
            <Link to="/emi-calculator" className="opacity-60 hover:opacity-100 transition-opacity">EMI Calculator</Link>
            <Link to="/ai-estimator" className="opacity-60 hover:opacity-100 transition-opacity">AI Price Estimator</Link>
          </div>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider opacity-60">For Owners</h4>
          <div className="flex flex-col gap-1.5 text-sm">
            <Link to="/post-property" className="opacity-60 hover:opacity-100 transition-opacity">Post Property FREE</Link>
            <Link to="/properties" className="opacity-60 hover:opacity-100 transition-opacity">Property Insights</Link>
            <Link to="/ai-estimator" className="opacity-60 hover:opacity-100 transition-opacity">Know Property Value</Link>
          </div>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider opacity-60">Top Cities</h4>
          <div className="flex flex-col gap-1.5 text-sm">
            {["Mumbai", "Bangalore", "Delhi", "Pune", "Hyderabad", "Chennai"].map((city) => (
              <Link key={city} to={`/properties?city=${city}`} className="opacity-60 hover:opacity-100 transition-opacity">
                Properties in {city}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-8 border-t border-white/15 pt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs opacity-40">
        <span>© 2026 ApnaGhar. All rights reserved.</span>
        <span>Powered by AI • Made in India 🇮🇳</span>
      </div>
    </div>
  </footer>
);

export default Footer;
