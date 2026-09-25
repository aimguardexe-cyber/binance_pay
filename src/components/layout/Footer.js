import React from 'react';
import { Youtube, Github, Linkedin, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-canvas border-t border-hairline pt-[60px] md:pt-[80px] pb-[20px] md:pb-[40px] px-lg md:px-xl">
      <div className="max-w-[1280px] mx-auto">
        {/* Newsletter Block */}
        <div className="bg-primary rounded-md md:rounded-lg p-lg md:p-[60px] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-xl mb-[60px] md:mb-[80px]">
          <div className="max-w-xl">
            <div className="inline-block border border-coral text-coral text-[10px] md:text-[12px] font-sans px-sm py-xxs rounded-pill mb-md md:mb-lg uppercase tracking-wider">
              Crypto moves fast
            </div>
            <h2 className="font-display text-[28px] md:text-[32px] tracking-[-0.32px] text-on-dark mb-xs md:mb-sm">Subscribe to developer updates.</h2>
            <p className="font-sans text-[14px] text-on-dark/60">Get notified about new API endpoints, SDK releases, and platform upgrades.</p>
          </div>
          <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-sm">
            <input 
              type="email" 
              placeholder="Work email" 
              className="bg-on-dark/10 border border-on-dark/20 rounded-xs px-md py-sm text-on-dark placeholder:text-on-dark/40 focus:outline-none focus:border-form-focus w-full sm:w-64 font-sans text-[14px] h-[44px]"
            />
            <button className="bg-canvas text-ink text-[14px] font-medium px-xl rounded-xs hover:bg-soft-stone transition-colors flex items-center justify-center whitespace-nowrap h-[44px] w-full sm:w-auto">
              Subscribe
            </button>
          </div>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-xl border-b border-hairline pb-[40px] md:pb-[60px] mb-[20px] md:mb-[40px]">
          <div className="col-span-2 flex flex-col gap-sm md:gap-md">
            <div className="font-display font-medium text-[18px] md:text-[20px] text-primary flex items-center gap-2 tracking-tight">
              <div className="w-5 h-5 md:w-6 md:h-6 bg-primary rounded-xs flex items-center justify-center">
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 border-[1.5px] md:border-2 border-canvas rounded-xs rotate-45"></div>
              </div>
              Binance Pay
            </div>
            <p className="text-[14px] text-muted leading-[1.5] max-w-xs">
              The leading payment infrastructure for the decentralized web.
            </p>
          </div>
          <div className="flex flex-col gap-sm md:gap-md mt-sm lg:mt-0">
            <h4 className="text-[14px] font-sans font-medium text-ink">Products</h4>
            <Link to="/products/checkout" className="text-[14px] font-sans text-slate hover:text-action-blue transition-colors">Checkout</Link>
            <Link to="/products/payouts" className="text-[14px] font-sans text-slate hover:text-action-blue transition-colors">Payouts</Link>
          </div>
          <div className="flex flex-col gap-sm md:gap-md mt-sm lg:mt-0">
            <h4 className="text-[14px] font-sans font-medium text-ink">Developers</h4>
            <Link to="/developers/documentation" className="text-[14px] font-sans text-slate hover:text-action-blue transition-colors">Documentation</Link>
            <Link to="/developers/api-reference" className="text-[14px] font-sans text-slate hover:text-action-blue transition-colors">API Reference</Link>
            <Link to="/status" className="text-[14px] font-sans text-slate hover:text-action-blue transition-colors">Status</Link>
          </div>
          <div className="flex flex-col gap-sm md:gap-md mt-sm lg:mt-0">
            <h4 className="text-[14px] font-sans font-medium text-ink">Social</h4>
            <a href="https://github.com/lokeshpkz" target="_blank" rel="noopener noreferrer" className="text-[14px] font-sans text-slate hover:text-action-blue transition-colors flex items-center gap-2">
              <Github size={16} /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/lokessh" target="_blank" rel="noopener noreferrer" className="text-[14px] font-sans text-slate hover:text-action-blue transition-colors flex items-center gap-2">
              <Linkedin size={16} /> LinkedIn
            </a>
            <a href="https://x.com/@lokeshkuma56749" target="_blank" rel="noopener noreferrer" className="text-[14px] font-sans text-slate hover:text-action-blue transition-colors flex items-center gap-2">
              <Twitter size={16} /> Twitter
            </a>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-md text-[12px] font-sans text-muted">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-md">
            <div>© {new Date().getFullYear()} Binance Pay Gateway. All rights reserved.</div>
          </div>
          <div className="flex flex-wrap items-center gap-md md:gap-lg">
            <Link to="/privacy-policy" className="hover:text-ink transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-ink transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
