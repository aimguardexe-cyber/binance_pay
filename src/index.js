import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import "@/index.css";

import { AuthProvider } from "@/context/AuthContext";
import App from "@/App";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Dashboard from "@/pages/Dashboard";
import Checkout from "@/pages/Checkout";
import InfoPage from "@/pages/InfoPage";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";
import Documentation from "@/pages/Documentation";
import ApiReference from "@/pages/ApiReference";
import Status from "@/pages/Status";
import BlogArticle from "@/pages/BlogArticle";
import Navbar from "@/components/layout/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import Lenis from "lenis";

const lenis = new Lenis();

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      refetchOnWindowFocus: false,
    },
  },
});

const MainLayout = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <div className="flex-1 flex flex-col relative z-0">
      <Outlet />
    </div>
  </div>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <Toaster />
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<App />} />
            <Route path="/blog/:slug" element={<BlogArticle />} />
            
            <Route path="/products/checkout" element={<InfoPage title="Checkout" description="Accept global crypto payments instantly." />} />
            <Route path="/products/payouts" element={<InfoPage title="Payouts" description="Programmatic global payouts infrastructure." />} />
            <Route path="/developers/documentation" element={<Documentation />} />
            <Route path="/developers/api-reference" element={<ApiReference />} />
            <Route path="/status" element={<Status />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
          </Route>
          
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard/*" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);
