
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import FindTrial from "./pages/FindTrial";
import Referrals from "./pages/Referrals";
import Microhub from "./pages/Microhub";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import ManageTrials from "./pages/ManageTrials";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route 
            path="/" 
            element={
              <Layout>
                <Dashboard />
              </Layout>
            } 
          />
          <Route 
            path="/find-trial" 
            element={
              <Layout>
                <FindTrial />
              </Layout>
            } 
          />
          <Route 
            path="/referrals" 
            element={
              <Layout>
                <Referrals />
              </Layout>
            } 
          />
          <Route 
            path="/microhub" 
            element={
              <Layout>
                <Microhub />
              </Layout>
            } 
          />
          <Route 
            path="/manage-trials" 
            element={
              <Layout>
                <ManageTrials />
              </Layout>
            } 
          />
          <Route 
            path="/settings" 
            element={
              <Layout>
                <Settings />
              </Layout>
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
