import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, Search, Brain, Menu, X, Building2, Plus, Shield, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, userRole, signOut } = useAuth();

  const links = [
    { to: "/", label: "Home", icon: Home },
    { to: "/properties", label: "Properties", icon: Building2 },
    { to: "/ai-estimator", label: "AI Estimator", icon: Brain },
  ];

  if (userRole === "admin") {
    links.push({ to: "/admin", label: "Admin", icon: Shield });
  }

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Building2 className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold text-foreground">
            Nest<span className="text-gradient-accent">IQ</span>
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link key={l.to} to={l.to}>
              <Button variant={isActive(l.to) ? "default" : "ghost"} size="sm" className="gap-2">
                <l.icon className="h-4 w-4" />
                {l.label}
              </Button>
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <Link to="/properties">
            <Button variant="outline" size="sm" className="gap-2">
              <Search className="h-4 w-4" />
              Search
            </Button>
          </Link>
          {user ? (
            <>
              <Link to="/post-property">
                <Button size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Post Property
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={handleSignOut} className="gap-2">
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <Link to="/auth">
              <Button size="sm" className="gap-2">
                <User className="h-4 w-4" />
                Sign In
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile toggle */}
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="animate-fade-in border-t bg-card p-4 md:hidden">
          <div className="flex flex-col gap-2">
            {links.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)}>
                <Button variant={isActive(l.to) ? "default" : "ghost"} className="w-full justify-start gap-2">
                  <l.icon className="h-4 w-4" />
                  {l.label}
                </Button>
              </Link>
            ))}
            {user ? (
              <>
                <Link to="/post-property" onClick={() => setOpen(false)}>
                  <Button className="mt-2 w-full gap-2"><Plus className="h-4 w-4" />Post Property</Button>
                </Link>
                <Button variant="ghost" className="w-full justify-start gap-2" onClick={() => { handleSignOut(); setOpen(false); }}>
                  <LogOut className="h-4 w-4" />Sign Out
                </Button>
              </>
            ) : (
              <Link to="/auth" onClick={() => setOpen(false)}>
                <Button className="mt-2 w-full gap-2"><User className="h-4 w-4" />Sign In</Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
