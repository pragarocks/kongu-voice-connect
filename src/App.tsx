import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import Candidates2026 from "./pages/Candidates2026";
import DistrictPage from "./pages/DistrictPage";
import ManageContent from "./pages/ManageContent";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/candidates-2026" element={<Candidates2026 />} />
            <Route path="/erode" element={<DistrictPage district="erode" />} />
            <Route path="/coimbatore" element={<DistrictPage district="coimbatore" />} />
            <Route path="/tiruppur" element={<DistrictPage district="tiruppur" />} />
            <Route path="/salem" element={<DistrictPage district="salem" />} />
            <Route path="/namakkal" element={<DistrictPage district="namakkal" />} />
            <Route path="/nilgiris" element={<DistrictPage district="nilgiris" />} />
            <Route path="/karur" element={<DistrictPage district="karur" />} />
            <Route path="/dharmapuri" element={<DistrictPage district="dharmapuri" />} />
            <Route path="/manage-content" element={<ManageContent />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
