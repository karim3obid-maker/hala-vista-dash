import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import Index from "./pages/Index";
import Calculator from "./pages/Calculator";
import Wholesale from "./pages/Wholesale";
import Pricing from "./pages/Pricing";
import Orders from "./pages/Orders";
import Products from "./pages/Products";
import Wallet from "./pages/Wallet";
import Affiliate from "./pages/Affiliate";
import Challenges from "./pages/Challenges";
import Validation from "./pages/Validation";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/wholesale" element={<Wholesale />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/products" element={<Products />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/affiliate" element={<Affiliate />} />
            <Route path="/challenges" element={<Challenges />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
