import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const [mobileNav, setMobileNav] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  // Close mobile nav on route change
  useEffect(() => {
    setMobileNav(false);
  }, [location.pathname]);

  const [showNav, setShowNav] = useState(true);

  // Lock body scroll when mobile nav is open
  useEffect(() => {
    if (mobileNav) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileNav]);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (mobileNav) return;
      
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileNav]);

  return (
    <>
      <motion.nav 
        initial={{ y: 0 }}
        animate={{ y: showNav ? 0 : "-100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="h-[64px] md:h-[72px] bg-canvas border-b border-hairline flex items-center justify-between px-lg md:px-xl max-w-[1440px] mx-auto w-full sticky top-0 z-50"
      >
        <div className="flex items-center gap-[24px] lg:gap-[40px]">
          <Link to="/" className="font-display font-medium text-[18px] md:text-[20px] text-primary flex items-center gap-2 tracking-tight">
            <div className="w-5 h-5 md:w-6 md:h-6 bg-primary rounded-xs flex items-center justify-center">
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 border-[1.5px] md:border-2 border-canvas rounded-xs rotate-45"></div>
            </div>
            Binance Pay
          </Link>
          <div className="hidden lg:flex gap-lg">
            <Link to="/developers/documentation" className="text-[14px] font-medium text-ink hover:text-action-blue transition-colors">Docs</Link>
            <a href="/#developers" className="text-[14px] font-medium text-ink hover:text-action-blue transition-colors">Developers</a>
            <Link to="/developers/api-reference" className="text-[14px] font-medium text-ink hover:text-action-blue transition-colors">API Reference</Link>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-md lg:gap-lg">
          {user ? (
            <Link to="/dashboard" className="bg-primary border border-primary text-on-dark text-[14px] font-medium px-lg lg:px-xl h-[40px] rounded-pill hover:bg-ink transition-colors flex items-center justify-center">
              Dashboard
            </Link>
          ) : (
            <>
              <Link to="/login" className="text-[14px] font-medium text-ink hover:text-action-blue transition-colors">Sign In</Link>
              <Link to="/register" className="bg-canvas border border-primary text-primary text-[14px] font-medium px-lg lg:px-xl h-[40px] rounded-pill hover:bg-soft-stone transition-colors flex items-center justify-center">
                Get Started
              </Link>
            </>
          )}
        </div>
        <button className="md:hidden text-ink p-2 -mr-2" onClick={() => setMobileNav(!mobileNav)}>
          <motion.div animate={{ rotate: mobileNav ? 90 : 0 }} transition={{ duration: 0.2 }}>
            {mobileNav ? <X size={24} /> : <Menu size={24} />}
          </motion.div>
        </button>
      </motion.nav>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileNav && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden fixed inset-0 top-[64px] bg-canvas z-40 px-lg py-xl flex flex-col gap-md overflow-y-auto h-[calc(100vh-64px)] border-t border-hairline shadow-2xl"
          >
            <div className="flex flex-col gap-sm">
              <Link to="/developers/documentation" className="text-[20px] font-display text-primary py-sm border-b border-hairline" onClick={() => setMobileNav(false)}>Docs</Link>
              <a href="/#developers" className="text-[20px] font-display text-primary py-sm border-b border-hairline" onClick={() => setMobileNav(false)}>Developers</a>
              <Link to="/developers/api-reference" className="text-[20px] font-display text-primary py-sm border-b border-hairline" onClick={() => setMobileNav(false)}>API Reference</Link>
            </div>
            <div className="flex flex-col gap-md mt-xl">
              {user ? (
                <Link to="/dashboard" className="w-full bg-primary border border-primary text-on-dark text-[16px] font-medium h-[48px] rounded-pill flex items-center justify-center" onClick={() => setMobileNav(false)}>Dashboard</Link>
              ) : (
                <>
                  <Link to="/register" className="w-full bg-canvas border border-primary text-primary text-[16px] font-medium h-[48px] rounded-pill flex items-center justify-center" onClick={() => setMobileNav(false)}>Get Started</Link>
                  <Link to="/login" className="w-full text-[16px] font-medium text-ink h-[48px] flex items-center justify-center" onClick={() => setMobileNav(false)}>Sign In</Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
