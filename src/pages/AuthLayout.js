import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export function AuthLayout({ title, sub, children, footer }) {
  return (
    <div className="min-h-screen bg-canvas flex flex-col md:flex-row font-sans text-ink selection:bg-action-blue selection:text-white">
      {/* Left Branding Panel */}
      <aside className="bg-deep-green md:w-[45%] lg:w-[40%] p-xl flex flex-col justify-between relative overflow-hidden hidden md:flex">
        <div className="relative z-10">
          <Link to="/" className="font-display font-medium text-[20px] text-on-dark flex items-center gap-2 tracking-tight">
            <div className="w-6 h-6 bg-canvas rounded-xs flex items-center justify-center">
              <div className="w-3 h-3 border-2 border-deep-green rounded-xs rotate-45"></div>
            </div>
            Binance Pay
          </Link>
        </div>
        <div className="relative z-10 mb-[80px]">
          <h1 className="font-display text-[48px] lg:text-[60px] tracking-[-1.2px] leading-[1.05] text-on-dark mb-md">
            Enterprise crypto payments.
          </h1>
          <p className="font-sans text-[18px] text-on-dark/80 max-w-sm">
            Manage your API keys, webhooks, and settlements in one place.
          </p>
        </div>
        <div className="relative z-10 flex justify-between text-[12px] font-mono uppercase tracking-widest text-on-dark/50">
          <span>Global Commerce</span>
          <span>EST. 2026</span>
        </div>
        
        {/* Decorative blur */}
        <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-action-blue/20 blur-3xl"></div>
        <div className="absolute top-1/3 -left-10 w-48 h-48 rounded-full bg-coral/20 blur-2xl"></div>
      </aside>

      {/* Right Form Panel */}
      <main className="flex-1 flex flex-col items-center justify-center p-lg md:p-[60px] relative">
        <div className="absolute top-lg left-lg md:top-[40px] md:left-[40px] w-full max-w-[1280px]">
          <Link to="/" className="inline-flex items-center gap-2 text-[14px] font-medium text-muted hover:text-action-blue transition-colors">
            <ArrowLeft size={16} /> Back to site
          </Link>
        </div>
        
        <div className="w-full max-w-[400px] mt-[40px] md:mt-0">
          {/* Mobile Logo */}
          <div className="md:hidden mb-xl">
             <Link to="/" className="font-display font-medium text-[24px] text-primary flex items-center gap-2 tracking-tight">
              <div className="w-8 h-8 bg-primary rounded-xs flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-canvas rounded-xs rotate-45"></div>
              </div>
              Binance Pay
            </Link>
          </div>
          
          <h2 className="font-display text-[32px] md:text-[40px] tracking-[-0.8px] text-primary mb-xs">
            {title}
          </h2>
          <p className="font-sans text-[16px] text-body-muted mb-xl">
            {sub}
          </p>
          
          {children}
          
          <div className="mt-xl pt-lg border-t border-hairline text-center text-[14px] text-muted">
            {footer}
          </div>
        </div>
      </main>
    </div>
  );
}
