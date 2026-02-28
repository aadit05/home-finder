import { Building2 } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t bg-primary text-primary-foreground">
    <div className="container py-12">
      <div className="grid gap-8 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
              <Building2 className="h-4 w-4 text-accent-foreground" />
            </div>
            <span className="font-display text-lg font-bold">NestIQ</span>
          </div>
          <p className="text-sm opacity-70">AI-powered real estate marketplace. Buy, rent, or sell with intelligent predictions and smart recommendations.</p>
        </div>
        <div>
          <h4 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider opacity-70">Explore</h4>
          <div className="flex flex-col gap-2 text-sm">
            <Link to="/properties?type=sale" className="opacity-70 hover:opacity-100 transition-opacity">Buy Property</Link>
            <Link to="/properties?type=rent" className="opacity-70 hover:opacity-100 transition-opacity">Rent Property</Link>
            <Link to="/post-property" className="opacity-70 hover:opacity-100 transition-opacity">Post Property</Link>
            <Link to="/ai-estimator" className="opacity-70 hover:opacity-100 transition-opacity">AI Price Estimator</Link>
          </div>
        </div>
        <div>
          <h4 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider opacity-70">Property Types</h4>
          <div className="flex flex-col gap-2 text-sm">
            <span className="opacity-70">Apartments</span>
            <span className="opacity-70">Villas</span>
            <span className="opacity-70">Plots</span>
            <span className="opacity-70">Commercial</span>
          </div>
        </div>
        <div>
          <h4 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider opacity-70">Top Cities</h4>
          <div className="flex flex-col gap-2 text-sm">
            <span className="opacity-70">Mumbai</span>
            <span className="opacity-70">Bangalore</span>
            <span className="opacity-70">Delhi</span>
            <span className="opacity-70">Pune</span>
          </div>
        </div>
      </div>
      <div className="mt-8 border-t border-primary-foreground/20 pt-6 text-center text-sm opacity-50">
        © 2026 NestIQ. All rights reserved. Powered by AI.
      </div>
    </div>
  </footer>
);

export default Footer;
