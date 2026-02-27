import { Link } from "react-router-dom";
import { Search, Brain, TrendingUp, Shield, ArrowRight, Building2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import PropertyCard from "@/components/PropertyCard";
import AIEstimatorWidget from "@/components/AIEstimatorWidget";
import { properties, cities } from "@/lib/mockData";
import heroBg from "@/assets/hero-bg.jpg";

const Index = () => {
  const featured = properties.filter((p) => p.featured);

  return (
    <div>
      {/* Hero */}
      <section className="relative flex min-h-[85vh] items-center overflow-hidden">
        <img src={heroBg} alt="Modern architecture" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="container relative z-10 py-20">
          <div className="max-w-2xl animate-fade-up">
            <p className="mb-4 flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-accent">
              <Brain className="h-4 w-4" />
              AI-Powered Real Estate
            </p>
            <h1 className="font-display text-5xl font-bold leading-tight text-primary-foreground md:text-6xl lg:text-7xl">
              Find Your Perfect <span className="text-gradient-accent">Home</span>
            </h1>
            <p className="mt-6 text-lg text-primary-foreground/80 leading-relaxed max-w-lg">
              Discover properties with AI-driven price predictions, smart recommendations, and advanced market analytics.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/properties">
                <Button size="lg" className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-base px-8">
                  <Search className="h-5 w-5" />
                  Explore Properties
                </Button>
              </Link>
              <Link to="/ai-estimator">
                <Button size="lg" variant="outline" className="gap-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-base px-8">
                  <Brain className="h-5 w-5" />
                  AI Estimator
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b bg-card">
        <div className="container grid grid-cols-2 gap-4 py-8 md:grid-cols-4">
          {[
            { value: "10,000+", label: "Properties Listed" },
            { value: "5,000+", label: "Happy Buyers" },
            { value: "50+", label: "Cities Covered" },
            { value: "95%", label: "AI Accuracy" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-2xl font-bold text-foreground md:text-3xl">{s.value}</p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Properties */}
      <section className="container py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-accent">Handpicked</p>
            <h2 className="font-display text-3xl font-bold text-foreground mt-1">Featured Properties</h2>
          </div>
          <Link to="/properties">
            <Button variant="ghost" className="gap-1 text-muted-foreground hover:text-accent">
              View All <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      </section>

      {/* AI Features */}
      <section className="bg-secondary py-16">
        <div className="container">
          <div className="mb-10 text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-accent">Powered by Intelligence</p>
            <h2 className="font-display text-3xl font-bold text-foreground mt-1">AI-Driven Features</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: TrendingUp, title: "Price Prediction", desc: "ML-powered property valuation using market data, location trends, and comparable sales analysis." },
              { icon: Brain, title: "Smart Recommendations", desc: "Personalized property suggestions based on your preferences, search history, and budget." },
              { icon: Shield, title: "Fraud Detection", desc: "AI-powered listing verification to identify suspicious prices, duplicates, and anomalies." },
            ].map((f) => (
              <div key={f.title} className="rounded-xl border bg-card p-6 shadow-card transition-all hover:shadow-elevated">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-ai/10">
                  <f.icon className="h-6 w-6 text-ai" />
                </div>
                <h3 className="font-display text-lg font-semibold text-card-foreground">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cities */}
      <section className="container py-16">
        <div className="mb-8">
          <p className="text-sm font-medium uppercase tracking-widest text-accent">Explore</p>
          <h2 className="font-display text-3xl font-bold text-foreground mt-1">Popular Cities</h2>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-7">
          {cities.map((city) => (
            <Link
              key={city}
              to={`/properties?city=${city}`}
              className="group flex flex-col items-center gap-2 rounded-xl border bg-card p-4 text-center shadow-card transition-all hover:shadow-elevated hover:border-accent"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 transition-colors group-hover:bg-accent/20">
                <MapPin className="h-5 w-5 text-accent" />
              </div>
              <span className="text-sm font-medium text-card-foreground">{city}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* AI Estimator CTA */}
      <section className="bg-secondary py-16">
        <div className="container max-w-2xl">
          <AIEstimatorWidget />
        </div>
      </section>
    </div>
  );
};

export default Index;
