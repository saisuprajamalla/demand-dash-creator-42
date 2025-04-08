
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DataSourceScreen from "./components/data/DataSourceScreen";
import ModelSelectionScreen from "./components/models/ModelSelectionScreen";
import ForecastSetupScreen from "./components/forecast/ForecastSetupScreen";
import ConstraintsScreen from "./components/constraints/ConstraintsScreen";
import { ForecastProvider } from "./context/ForecastContext";
import OnboardingScreen from '@/pages/OnboardingScreen';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ForecastProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<OnboardingScreen />} />
            <Route path="/data-source" element={<DataSourceScreen />} />
            <Route path="/model-selection" element={<ModelSelectionScreen />} />
            <Route path="/forecast-setup" element={<ForecastSetupScreen />} />
            <Route path="/constraints" element={<ConstraintsScreen />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ForecastProvider>
  </QueryClientProvider>
);

export default App;
