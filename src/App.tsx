import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Index from "./pages/Index";
import Properties from "./pages/Properties";
import PropertyDetail from "./pages/PropertyDetail";
import AIEstimator from "./pages/AIEstimator";
import Auth from "./pages/Auth";
import PostProperty from "./pages/PostProperty";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/properties" element={<Properties />} />
                <Route path="/property/:id" element={<PropertyDetail />} />
                <Route path="/ai-estimator" element={<AIEstimator />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/post-property" element={<PostProperty />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
