import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CursorGradient from "./components/ui/CursorGradient";
import Index from "./pages/Index";
import ProjectDetail from "./pages/ProjectDetail";
import MiniProjectDetail from "./pages/MiniProjectDetail";
import MajorProjectDetail from "./pages/MajorProjectDetail";
import CertificationsPage from "./pages/CertificationsPage";
import CertificationDetail from "./pages/CertificationDetail";
import NotFound from "./pages/NotFound";
import SeoHead from "./components/Seo/SeoHead";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <CursorGradient />
      <BrowserRouter>
        <SeoHead />
        <Routes>
          <Route path="/" element={<Index />} />
          {/* Dedicated detail pages per project type */}
          <Route path="/mini-project/:id" element={<MiniProjectDetail />} />
          <Route path="/major-project/:id" element={<MajorProjectDetail />} />
          {/* Legacy route — kept for backward compatibility */}
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="/certifications" element={<CertificationsPage />} />
          <Route path="/certification/:id" element={<CertificationDetail />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
