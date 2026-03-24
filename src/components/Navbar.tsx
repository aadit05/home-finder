import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Search, Menu, X, Building2, Plus, LogOut, User, ChevronDown,
  Home, Key, Brain, Shield, Calculator, Heart, Clock, Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { user, userRole, signOut } = useAuth();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/properties?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const handleSignOut = async () => {
    await signOut();
    setUserMenuOpen(false);
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-[hsl(var(--nav-bg))] text-[hsl(var(--nav-foreground))] shadow-md">
      {/* Top bar */}
      <div className="container flex h-14 items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
            <Building2 className="h-4 w-4 text-accent-foreground" />
          </div>
          <span className="font-display text-xl font-extrabold tracking-tight text-white">
            ApnaGhar
          </span>
        </Link>

        {/* Search bar - desktop */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl items-center">
          <div className="flex w-full items-center rounded-md bg-white overflow-hidden">
            <Input
              placeholder="Enter Locality / Project / Landmark"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-0 bg-transparent text-foreground placeholder:text-muted-foreground focus-visible:ring-0 h-9"
            />
            <button type="submit" className="flex items-center justify-center h-9 w-10 text-muted-foreground hover:text-foreground">
              <Search className="h-4 w-4" />
            </button>
          </div>
        </form>

        {/* Right actions */}
        <div className="hidden md:flex items-center gap-1">
          <Link to="/post-property">
            <Button size="sm" variant="outline" className="gap-1.5 border-white/40 text-white hover:bg-white/10 hover:text-white font-semibold text-xs">
              <Plus className="h-3.5 w-3.5" />
              Post Property
              <span className="ml-1 rounded bg-success px-1.5 py-0.5 text-[10px] font-bold text-success-foreground">FREE</span>
            </Button>
          </Link>

          {/* User menu */}
          <div className="relative ml-1">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-1 rounded-md px-2 py-1.5 text-sm hover:bg-white/10 transition-colors"
            >
              <User className="h-4 w-4" />
              <ChevronDown className="h-3 w-3" />
            </button>
            {userMenuOpen && (
              <div className="absolute right-0 top-full mt-1 w-56 rounded-lg border bg-card shadow-elevated z-50 animate-fade-in">
                {user ? (
                  <div className="p-2">
                    <div className="px-3 py-2 border-b mb-1">
                      <p className="text-sm font-semibold text-card-foreground truncate">{user.email}</p>
                      <p className="text-xs text-muted-foreground capitalize">{userRole || "User"}</p>
                    </div>
                    <Link to="/properties" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-card-foreground hover:bg-secondary">
                      <Clock className="h-4 w-4" /> Recently Viewed
                    </Link>
                    <Link to="/properties" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-card-foreground hover:bg-secondary">
                      <Heart className="h-4 w-4" /> Shortlisted
                    </Link>
                    <Link to="/post-property" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-card-foreground hover:bg-secondary">
                      <Plus className="h-4 w-4" /> Post Property
                    </Link>
                    {userRole === "admin" && (
                      <Link to="/admin" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-card-foreground hover:bg-secondary">
                        <Shield className="h-4 w-4" /> Admin Dashboard
                      </Link>
                    )}
                    <button onClick={handleSignOut} className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-destructive hover:bg-secondary">
                      <LogOut className="h-4 w-4" /> Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="p-3">
                    <Link to="/auth" onClick={() => setUserMenuOpen(false)}>
                      <Button className="w-full mb-2">LOGIN / REGISTER</Button>
                    </Link>
                    <div className="space-y-1 pt-1 border-t">
                      <Link to="/post-property" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-card-foreground hover:bg-secondary">
                        <Plus className="h-4 w-4" /> Post Property <span className="ml-auto rounded bg-success px-1.5 py-0.5 text-[10px] font-bold text-success-foreground">FREE</span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Hamburger for extra menu */}
          <button className="p-1.5 rounded-md hover:bg-white/10 transition-colors">
            <Menu className="h-5 w-5" />
          </button>
        </div>

        {/* Mobile toggle */}
        <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-white/10" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Sub navigation - desktop */}
      <div className="hidden md:block border-t border-white/10 bg-white">
        <div className="container flex items-center gap-0 h-10 text-sm">
          <Link to="/properties?type=sale" className="flex items-center gap-1.5 px-4 h-full font-medium text-foreground hover:text-primary border-b-2 border-transparent hover:border-primary transition-colors">
            <Home className="h-3.5 w-3.5" /> Buy
          </Link>
          <Link to="/properties?type=rent" className="flex items-center gap-1.5 px-4 h-full font-medium text-foreground hover:text-primary border-b-2 border-transparent hover:border-primary transition-colors">
            <Key className="h-3.5 w-3.5" /> Rent
          </Link>
          <Link to="/properties?propertyType=commercial" className="flex items-center gap-1.5 px-4 h-full font-medium text-foreground hover:text-primary border-b-2 border-transparent hover:border-primary transition-colors">
            <Building2 className="h-3.5 w-3.5" /> Commercial
          </Link>
          <Link to="/properties?propertyType=plot" className="flex items-center gap-1.5 px-4 h-full font-medium text-foreground hover:text-primary border-b-2 border-transparent hover:border-primary transition-colors">
            Plots/Land
          </Link>
          <Link to="/ai-estimator" className="flex items-center gap-1.5 px-4 h-full font-medium text-foreground hover:text-primary border-b-2 border-transparent hover:border-primary transition-colors">
            <Brain className="h-3.5 w-3.5" /> AI Insights
          </Link>
          <Link to="/emi-calculator" className="flex items-center gap-1.5 px-4 h-full font-medium text-foreground hover:text-primary border-b-2 border-transparent hover:border-primary transition-colors">
            <Calculator className="h-3.5 w-3.5" /> EMI Calculator
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="animate-fade-in border-t border-white/10 bg-[hsl(var(--nav-bg))] p-4 md:hidden">
          <form onSubmit={handleSearch} className="mb-4">
            <div className="flex items-center rounded-md bg-white overflow-hidden">
              <Input
                placeholder="Search locality, project..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-0 bg-transparent text-foreground focus-visible:ring-0 h-9"
              />
              <button type="submit" className="h-9 w-10 flex items-center justify-center text-muted-foreground">
                <Search className="h-4 w-4" />
              </button>
            </div>
          </form>
          <div className="flex flex-col gap-1">
            {[
              { to: "/properties?type=sale", label: "Buy", icon: Home },
              { to: "/properties?type=rent", label: "Rent", icon: Key },
              { to: "/properties?propertyType=commercial", label: "Commercial", icon: Building2 },
              { to: "/ai-estimator", label: "AI Insights", icon: Brain },
              { to: "/emi-calculator", label: "EMI Calculator", icon: Calculator },
            ].map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white">
                <l.icon className="h-4 w-4" />{l.label}
              </Link>
            ))}
            <div className="border-t border-white/10 mt-2 pt-2">
              <Link to="/post-property" onClick={() => setMobileOpen(false)}>
                <Button size="sm" className="w-full gap-2"><Plus className="h-4 w-4" />Post Property FREE</Button>
              </Link>
              {user ? (
                <Button variant="ghost" size="sm" className="w-full mt-1 text-white/80 hover:text-white hover:bg-white/10 justify-start gap-2" onClick={() => { handleSignOut(); setMobileOpen(false); }}>
                  <LogOut className="h-4 w-4" />Sign Out
                </Button>
              ) : (
                <Link to="/auth" onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full mt-1 border-white/30 text-white hover:bg-white/10 gap-2">
                    <User className="h-4 w-4" />Login / Register
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Backdrop for user menu */}
      {userMenuOpen && <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />}
    </nav>
  );
};

export default Navbar;
