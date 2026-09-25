import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code2, Copy, Menu, X, Check, ArrowUpRight, Github, Linkedin, Twitter } from 'lucide-react';
import { toast, Toaster } from 'sonner';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

function App() {
  const [codeTab, setCodeTab] = useState("Node.js");
  const [activeFilter, setActiveFilter] = useState("All");

  const copyCode = () => {
    toast.success("Code copied to clipboard");
  };

  const steps = [
    { n: "01", title: "Create Intent", copy: "Initialize payment with amount & currency." },
    { n: "02", title: "User Confirms", copy: "Customer signs transaction in their wallet." },
    { n: "03", title: "Settled", copy: "Funds arrive directly in your account." },
  ];

  const researchItems = [
    { title: "Optimizing EVM Settlement Finality in Payment Channels", date: "Oct 12, 2026", type: "Engineering", slug: "evm-settlement" },
    { title: "New Webhook Delivery System: 99.999% Reliability", date: "Sep 28, 2026", type: "Product", slug: "webhook-reliability" },
    { title: "Cross-chain Liquidity Routing Algorithms", date: "Sep 15, 2026", type: "Research", slug: "cross-chain-liquidity" },
    { title: "Compliance Engines for EU MiCA Regulations", date: "Aug 30, 2026", type: "Compliance", slug: "mica-compliance" }
  ];

  const filters = ["All", "Engineering", "Product", "Research", "Compliance"];

  return (
    <div className="min-h-screen bg-canvas text-ink font-sans selection:bg-action-blue selection:text-white overflow-x-hidden">
      <Toaster position="bottom-right" toastOptions={{ style: { background: '#17171c', color: '#fff', borderRadius: '8px' } }} />

      <main>
        {/* Hero Section */}
        <section className="pt-[60px] md:pt-[120px] pb-[60px] md:pb-[80px] px-lg md:px-xl max-w-[1280px] mx-auto w-full flex flex-col items-center text-center">
          <h1 className="font-display text-[48px] sm:text-[64px] lg:text-[96px] leading-[1.05] md:leading-[1] tracking-[-1px] md:tracking-[-1.92px] text-primary max-w-4xl mb-lg md:mb-xl">
            Enterprise crypto payments, engineered.
          </h1>
          <p className="font-sans text-[16px] md:text-[18px] text-body-muted leading-[1.5] max-w-2xl mb-xl md:mb-[48px]">
            Turn a payment intent into a settled transaction in under 400ms. Build with the most powerful API in Web3.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-md mb-[60px] md:mb-[80px] w-full sm:w-auto">
            <Link to="/dashboard/keys" className="w-full sm:w-auto bg-primary text-on-primary text-[14px] font-medium px-xl h-[48px] rounded-pill hover:bg-ink transition-colors flex items-center justify-center min-w-[160px]">
              Get API Keys
            </Link>
            <Link to="/developers/documentation" className="text-ink font-medium text-[14px] px-md py-sm hover:text-action-blue transition-colors underline underline-offset-4 flex items-center justify-center">
              Explore the Documentation
            </Link>
          </div>

          {/* Two-card media composition */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-md md:gap-lg w-full max-w-5xl text-left">
            <div className="lg:col-span-7 bg-soft-stone rounded-md md:rounded-lg p-lg md:p-xl flex flex-col justify-between min-h-[320px] md:min-h-[400px]">
              <div>
                <h3 className="font-display text-[24px] md:text-[32px] tracking-[-0.32px] text-primary mb-sm">Native Settlement</h3>
                <p className="font-sans text-[14px] md:text-[16px] text-body-muted leading-[1.5]">Funds hit your merchant wallet directly. No intermediaries holding your capital for days.</p>
              </div>
              <div className="bg-canvas rounded-md p-md md:p-lg mt-xl border border-card-border shadow-sm">
                <div className="flex justify-between items-center mb-md pb-md border-b border-border-light">
                  <div className="flex items-center gap-sm">
                    <div className="w-8 h-8 rounded-full bg-deep-green text-on-dark flex items-center justify-center font-bold text-[12px]">W</div>
                    <div>
                      <div className="text-[13px] md:text-[14px] font-medium text-ink">Merchant Wallet</div>
                      <div className="text-[11px] md:text-[12px] text-muted">0x8f...92a1</div>
                    </div>
                  </div>
                  <span className="text-[10px] md:text-[12px] font-medium text-action-blue bg-pale-blue px-2 py-1 rounded-sm">Connected</span>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-[11px] md:text-[12px] text-muted mb-1">Available Balance</div>
                    <div className="font-display text-[20px] md:text-[24px] text-primary">248,592.00 USDC</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-5 bg-deep-green rounded-md md:rounded-lg p-lg md:p-xl flex flex-col justify-between min-h-[240px] md:min-h-[400px] relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="font-display text-[40px] md:text-[48px] tracking-[-0.48px] text-on-dark mb-xs md:mb-sm">400ms</h3>
                <p className="font-sans text-[14px] md:text-[16px] text-on-dark/80 leading-[1.5]">Average settlement time across all supported chains.</p>
              </div>
              <div className="absolute -bottom-10 -right-10 md:-bottom-20 md:-right-20 w-48 h-48 md:w-64 md:h-64 rounded-full bg-action-blue/20 blur-2xl md:blur-3xl"></div>
              <div className="absolute bottom-10 -left-10 md:-bottom-10 md:-left-10 w-32 h-32 md:w-48 md:h-48 rounded-full bg-coral/20 blur-xl md:blur-2xl"></div>
            </div>
          </div>
        </section>

        {/* Trust Logo Strip */}
        <section className="py-[60px] md:py-[100px] border-y border-hairline bg-canvas">
          <div className="max-w-[1280px] mx-auto px-lg md:px-xl text-center">
            <p className="text-[12px] md:text-[14px] font-sans text-muted mb-[40px] md:mb-[60px] tracking-widest px-md">TRUSTED BY LEADING ENTERPRISES</p>
            <div className="flex flex-wrap justify-center gap-x-[40px] md:gap-x-[80px] gap-y-[30px] opacity-60 grayscale">
              <div className="text-[16px] md:text-[20px] font-display font-bold tracking-widest text-ink">NORTHSTAR</div>
              <div className="text-[16px] md:text-[20px] font-display font-bold tracking-widest text-ink">OASIS</div>
              <div className="text-[16px] md:text-[20px] font-display font-bold tracking-widest text-ink">LUMINARY</div>
              <div className="text-[16px] md:text-[20px] font-display font-bold tracking-widest text-ink">VERTEXT</div>
              <div className="text-[16px] md:text-[20px] font-display font-bold tracking-widest text-ink">QUANTA</div>
            </div>
          </div>
        </section>

        {/* Dark Feature Band */}
        <section id="developers" className="my-[40px] md:my-[80px] mx-sm md:mx-xl rounded-md md:rounded-lg bg-dark-navy px-lg md:px-[80px] py-[60px] md:py-[100px] max-w-[1440px] 2xl:mx-auto text-on-dark overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-[60px] lg:gap-[80px] items-center">
            <div>
              <div className="inline-block border border-coral text-coral text-[10px] md:text-[12px] font-sans px-sm py-xxs rounded-pill mb-md md:mb-lg uppercase tracking-wider">
                Developer First
              </div>
              <h2 className="font-display text-[32px] sm:text-[40px] md:text-[48px] tracking-tight md:tracking-[-0.48px] leading-[1.1] mb-md md:mb-lg">
                Simple enough to ship today.
              </h2>
              <p className="font-sans text-[16px] md:text-[18px] text-on-dark/80 leading-[1.5] mb-lg md:mb-xl max-w-md">
                Everything you need to turn a payment intent into a moment of trust. Built for scale, documented for clarity.
              </p>
              
              <div className="flex flex-col gap-lg mt-lg md:mt-xl">
                {steps.map((step, i) => (
                  <div key={step.n} className="flex gap-sm md:gap-md">
                    <div className="text-[12px] md:text-[14px] font-mono text-coral mt-1 md:mt-0.5">{step.n}</div>
                    <div>
                      <h4 className="font-display text-[18px] md:text-[20px] mb-1">{step.title}</h4>
                      <p className="font-sans text-[13px] md:text-[14px] text-on-dark/70">{step.copy}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Developer Console Mockup */}
            <div className="bg-[#111115] border border-on-dark/10 rounded-md p-6 shadow-2xl w-full max-w-full overflow-hidden flex flex-col gap-6 relative">
              {/* Subtle grid background */}
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-50 z-0 pointer-events-none"></div>
              
              <div className="relative z-10 flex items-center justify-between border-b border-on-dark/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-pale-green animate-pulse"></div>
                  <span className="text-on-dark text-[14px] font-medium font-sans">Live API Metrics</span>
                </div>
                <div className="text-[12px] font-mono text-on-dark/50 bg-on-dark/10 px-2 py-1 rounded-xs">us-east-1</div>
              </div>

              <div className="relative z-10 grid grid-cols-2 gap-4">
                <div className="bg-on-dark/5 border border-on-dark/10 rounded-xs p-4 flex flex-col gap-1">
                  <span className="text-[12px] text-on-dark/60 font-sans uppercase tracking-wider">Avg Latency</span>
                  <span className="text-[24px] font-display text-on-dark">42<span className="text-[16px] text-on-dark/50 font-sans ml-1">ms</span></span>
                </div>
                <div className="bg-on-dark/5 border border-on-dark/10 rounded-xs p-4 flex flex-col gap-1">
                  <span className="text-[12px] text-on-dark/60 font-sans uppercase tracking-wider">Uptime (30d)</span>
                  <span className="text-[24px] font-display text-pale-green">99.999%</span>
                </div>
              </div>

              <div className="relative z-10">
                <span className="text-[12px] text-on-dark/60 font-sans uppercase tracking-wider block mb-3">Recent Webhooks</span>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between bg-on-dark/5 p-3 rounded-xs border border-on-dark/5">
                    <div className="flex items-center gap-3">
                      <span className="text-pale-green"><Check size={14} /></span>
                      <span className="text-[13px] font-mono text-on-dark">payment_intent.succeeded</span>
                    </div>
                    <span className="text-[12px] font-mono text-on-dark/50">200 OK</span>
                  </div>
                  <div className="flex items-center justify-between bg-on-dark/5 p-3 rounded-xs border border-on-dark/5">
                    <div className="flex items-center gap-3">
                      <span className="text-pale-green"><Check size={14} /></span>
                      <span className="text-[13px] font-mono text-on-dark">order.settled</span>
                    </div>
                    <span className="text-[12px] font-mono text-on-dark/50">200 OK</span>
                  </div>
                  <div className="flex items-center justify-between bg-on-dark/5 p-3 rounded-xs border border-on-dark/5">
                    <div className="flex items-center gap-3">
                      <span className="text-pale-green"><Check size={14} /></span>
                      <span className="text-[13px] font-mono text-on-dark">charge.refunded</span>
                    </div>
                    <span className="text-[12px] font-mono text-on-dark/50">200 OK</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Grid / Blog-style capabilities */}
        <section className="py-[80px] md:py-[120px] px-lg md:px-xl max-w-[1280px] mx-auto w-full">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-[40px] md:mb-[80px] gap-md">
            <h2 className="font-display text-[32px] md:text-[48px] tracking-[-0.48px] text-primary">Platform Capabilities</h2>
            <button className="text-ink font-medium text-[14px] hover:text-action-blue transition-colors underline underline-offset-4">
              View all features
            </button>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-xl md:gap-[40px]">
            {/* Capability Card 1 */}
            <div className="bg-canvas border-t border-hairline pt-lg md:pt-xl">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-pale-blue text-action-blue rounded-xs flex items-center justify-center mb-md md:mb-lg">
                <Check size={20} className="md:w-6 md:h-6" />
              </div>
              <h3 className="font-display text-[20px] md:text-[24px] text-primary mb-xs md:mb-sm">Global Compliance</h3>
              <p className="font-sans text-[14px] md:text-[16px] text-body-muted leading-[1.5]">
                Built-in risk engines and KYC flows ensure every transaction meets regulatory standards automatically.
              </p>
            </div>
            
            {/* Capability Card 2 */}
            <div className="bg-canvas border-t border-hairline pt-lg md:pt-xl">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-coral-soft/30 text-coral rounded-xs flex items-center justify-center mb-md md:mb-lg">
                <ArrowRight size={20} className="md:w-6 md:h-6" />
              </div>
              <h3 className="font-display text-[20px] md:text-[24px] text-primary mb-xs md:mb-sm">High Throughput</h3>
              <p className="font-sans text-[14px] md:text-[16px] text-body-muted leading-[1.5]">
                Engineered to handle explosive traffic spikes during NFT mints or flash sales without rate-limiting your checkout.
              </p>
            </div>

            {/* Capability Card 3 */}
            <div className="bg-canvas border-t border-hairline pt-lg md:pt-xl sm:col-span-2 lg:col-span-1">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-pale-green text-deep-green rounded-xs flex items-center justify-center mb-md md:mb-lg">
                <Code2 size={20} className="md:w-6 md:h-6" />
              </div>
              <h3 className="font-display text-[20px] md:text-[24px] text-primary mb-xs md:mb-sm">Webhooks & Events</h3>
              <p className="font-sans text-[14px] md:text-[16px] text-body-muted leading-[1.5]">
                Subscribe to real-time events for payment state changes. Keep your backend perfectly synchronized with on-chain reality.
              </p>
            </div>
          </div>
        </section>

        {/* Research / Updates List */}
        <section className="py-[80px] md:py-[120px] px-lg md:px-xl max-w-[1024px] mx-auto w-full">
          <div className="flex flex-col items-center mb-[40px] md:mb-[80px] text-center">
             <h2 className="font-display text-[32px] md:text-[48px] tracking-[-0.48px] text-primary mb-md md:mb-lg">Engineering & Research</h2>
             <p className="font-sans text-[16px] md:text-[18px] text-body-muted max-w-xl mb-lg md:mb-xl px-md">Read our latest publications on cryptography, cross-chain infrastructure, and scaling global payments.</p>
             
             <div className="flex flex-wrap justify-center gap-xs sm:gap-sm px-sm">
               {filters.map(f => (
                 <button 
                   key={f}
                   onClick={() => setActiveFilter(f)}
                   className={`px-[10px] md:px-[14px] py-[6px] md:py-[8px] rounded-sm font-display text-[14px] md:text-[16px] transition-colors border ${activeFilter === f ? 'bg-coral text-on-dark border-coral' : 'bg-transparent text-coral border-coral hover:bg-coral-soft/10'}`}
                 >
                   {f}
                 </button>
               ))}
             </div>
          </div>
          
          <div className="flex flex-col">
            {researchItems.filter(item => activeFilter === "All" || item.type === activeFilter).map((item, i) => (
              <a href={`/blog/${item.slug}`} key={i} className="flex flex-col md:flex-row md:items-center justify-between py-[24px] md:py-[32px] border-b border-hairline hover:bg-canvas/50 transition-colors group">
                <div className="flex-1 mb-sm md:mb-0">
                  <h4 className="font-display text-[18px] md:text-[24px] text-primary group-hover:text-action-blue transition-colors leading-[1.3]">{item.title}</h4>
                </div>
                <div className="flex items-center justify-between md:justify-end md:gap-xl w-full md:w-auto">
                  <div className="font-mono text-[12px] md:text-[14px] text-slate uppercase tracking-wider bg-soft-stone md:bg-transparent px-2 py-1 md:p-0 rounded-sm md:rounded-none">{item.type}</div>
                  <div className="font-sans text-[14px] md:text-[16px] text-muted md:w-32 md:text-right">{item.date}</div>
                </div>
              </a>
            ))}
          </div>
          <div className="mt-lg md:mt-xl text-center">
            <button className="text-ink font-medium text-[14px] md:text-[16px] hover:text-action-blue transition-colors underline underline-offset-4">
              View all publications
            </button>
          </div>
        </section>

        {/* Contact Form Card Band */}
        <section id="contact" className="py-[80px] md:py-[120px] bg-pale-green px-lg md:px-xl">
          <div className="max-w-[1280px] mx-auto grid lg:grid-cols-2 gap-[40px] md:gap-[80px] items-center">
            <div>
              <h2 className="font-display text-[40px] md:text-[60px] tracking-[-1px] md:tracking-[-1.2px] text-primary leading-[1.1] md:leading-[1] mb-md md:mb-lg">
                Talk to our engineers.
              </h2>
              <p className="font-sans text-[16px] md:text-[18px] text-body-muted leading-[1.5] max-w-md mb-lg md:mb-xl">
                Whether you're processing $10k or $10M a day, our team can help you design the optimal payment routing architecture.
              </p>
              <div className="flex flex-col gap-sm md:gap-md">
                <div className="flex items-center gap-md text-[14px] md:text-[16px] text-primary font-medium">
                  <Check className="text-coral flex-shrink-0" size={20} /> Custom settlement times
                </div>
                <div className="flex items-center gap-md text-[14px] md:text-[16px] text-primary font-medium">
                  <Check className="text-coral flex-shrink-0" size={20} /> High-throughput SLAs
                </div>
                <div className="flex items-center gap-md text-[14px] md:text-[16px] text-primary font-medium">
                  <Check className="text-coral flex-shrink-0" size={20} /> Dedicated integration support
                </div>
              </div>
            </div>
            
            {/* Contact Form Card */}
            <div className="bg-canvas rounded-md md:rounded-lg p-lg md:p-[40px] shadow-sm border border-card-border">
              <form className="flex flex-col gap-lg md:gap-xl" onSubmit={(e) => { e.preventDefault(); toast.success("Inquiry sent successfully."); }}>
                <div className="grid sm:grid-cols-2 gap-lg md:gap-md">
                  <div className="flex flex-col gap-xs">
                    <label className="font-sans text-[13px] md:text-[14px] font-medium text-ink">First Name</label>
                    <input required type="text" className="border border-border-light rounded-xs px-md py-sm text-[14px] md:text-[16px] focus:outline-none focus:border-form-focus transition-colors" />
                  </div>
                  <div className="flex flex-col gap-xs">
                    <label className="font-sans text-[13px] md:text-[14px] font-medium text-ink">Last Name</label>
                    <input required type="text" className="border border-border-light rounded-xs px-md py-sm text-[14px] md:text-[16px] focus:outline-none focus:border-form-focus transition-colors" />
                  </div>
                </div>
                <div className="flex flex-col gap-xs">
                  <label className="font-sans text-[13px] md:text-[14px] font-medium text-ink">Work Email</label>
                  <input required type="email" className="border border-border-light rounded-xs px-md py-sm text-[14px] md:text-[16px] focus:outline-none focus:border-form-focus transition-colors" />
                </div>
                <div className="flex flex-col gap-xs">
                  <label className="font-sans text-[13px] md:text-[14px] font-medium text-ink">Monthly Payment Volume</label>
                  <select className="border border-border-light rounded-xs px-md py-sm text-[14px] md:text-[16px] focus:outline-none focus:border-form-focus bg-canvas transition-colors">
                    <option>Less than $100k</option>
                    <option>$100k - $1M</option>
                    <option>$1M - $10M</option>
                    <option>Over $10M</option>
                  </select>
                </div>
                <div className="flex flex-col gap-xs">
                  <label className="font-sans text-[13px] md:text-[14px] font-medium text-ink">How can we help?</label>
                  <textarea rows={4} className="border border-border-light rounded-xs px-md py-sm text-[14px] md:text-[16px] focus:outline-none focus:border-form-focus transition-colors resize-none"></textarea>
                </div>
                <button type="submit" className="w-full sm:w-auto bg-primary text-on-primary text-[14px] md:text-[16px] font-medium h-[48px] px-xl rounded-pill hover:bg-ink transition-colors mt-xs md:mt-sm self-start">
                  Submit Request
                </button>
              </form>
            </div>
          </div>
        </section>

      </main>
      
      <Footer />
    </div>
  );
}

export default App;
