import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2, XCircle, ShieldCheck, AlertTriangle, ArrowLeft, X } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { apiFetch } from "@/context/AuthContext";

export default function Checkout() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  
  const [step, setStep] = useState(0); 
  const [order, setOrder] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [showCancelAlert, setShowCancelAlert] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");

  // Force transparent body
  useEffect(() => {
    const originalBg = document.body.style.backgroundColor;
    document.body.style.backgroundColor = "transparent";
    document.documentElement.style.backgroundColor = "transparent";
    return () => {
      document.body.style.backgroundColor = originalBg;
      document.documentElement.style.backgroundColor = "";
    };
  }, []);

  // Fetch Order
  useEffect(() => {
    if (!orderId) {
      setErrorMsg("Invalid payment session. Please start the payment from the merchant's website.");
      setStep(4);
      return;
    }
    apiFetch(`/api/checkout/${orderId}`)
      .then(res => {
        setOrder({ ...res.data, currency: res.data.currency || 'USDT' });
        setStep(2);
      })
      .catch(err => {
        setErrorMsg(err.response?.data?.message || "Invalid or expired order.");
        setStep(4);
      });
  }, [orderId]);

  // Timer & Polling
  useEffect(() => {
    let interval, pollInterval;
    if (step === 2 && order) {
      // Timer
      const calculateTimeLeft = () => {
        const orderTime = new Date(order.createdAt).getTime();
        const expiryTime = orderTime + (15 * 60 * 1000);
        const diff = expiryTime - Date.now();
        if (diff <= 0) {
          setTimeLeft("00:00");
          setStep(4);
          setErrorMsg("This payment session has expired.");
          return;
        }
        const m = Math.floor(diff / 60000);
        const s = Math.floor((diff % 60000) / 1000);
        setTimeLeft(`${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`);
      };
      calculateTimeLeft();
      interval = setInterval(calculateTimeLeft, 1000);

      // Polling
      pollInterval = setInterval(() => {
        apiFetch(`/api/verify/${orderId}`)
          .then(res => {
            if (res.data.status === 'PAID') {
              setStep(3);
              window.parent.postMessage({ type: 'BINANCE_PAY_SUCCESS', payload: { transactionId: orderId, redirectUrl: res.data.redirectUrl } }, '*');
            } else if (res.data.status === 'EXPIRED') {
               setErrorMsg("This payment session has expired.");
               setStep(4);
            }
          })
          .catch(() => {});
      }, 3000);
    }
    return () => { clearInterval(interval); clearInterval(pollInterval); };
  }, [step, orderId, order]);

  const closePopup = async () => {
    if (orderId && step < 3 && order?.status === 'PENDING') {
      try {
        await apiFetch(`/api/cancel/${orderId}`, { method: 'POST' });
      } catch (err) {}
    }
    window.parent.postMessage({ type: 'BINANCE_PAY_CLOSE' }, '*');
  };

  return (
    <div className="h-[100dvh] bg-ink/40 xs:backdrop-blur-sm flex items-center justify-center p-0 xs:p-md font-sans selection:bg-action-blue selection:text-white transition-all duration-500 ease-in-out overflow-hidden">
      <div className="absolute inset-0 z-0 cursor-default w-full h-full"></div>
      
      <motion.div 
        layout
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-full xs:max-w-[760px] bg-canvas xs:rounded-xl shadow-2xl overflow-hidden relative z-10 flex flex-col xs:flex-row h-[100dvh] xs:min-h-[480px] xs:h-auto transition-all duration-500 ease-out"
      >
        
        {/* Cancel Confirmation Overlay */}
        <AnimatePresence>
          {showCancelAlert && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 bg-ink/60 backdrop-blur-sm flex items-center justify-center p-lg"
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                className="bg-canvas w-full max-w-[320px] rounded-md shadow-2xl p-lg flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 rounded-full bg-coral/10 text-coral flex items-center justify-center mb-md">
                  <XCircle size={24} />
                </div>
                <h3 className="text-[18px] font-display text-ink mb-xs">Cancel Payment?</h3>
                <p className="text-[13px] text-body-muted mb-lg">Are you sure you want to cancel? Any pending transfer might be lost.</p>
                <div className="flex gap-md w-full">
                  <button onClick={() => setShowCancelAlert(false)} className="flex-1 h-[44px] rounded-pill bg-soft-stone text-ink font-medium text-[13px] hover:bg-border-light transition-colors">No</button>
                  <button onClick={() => { setShowCancelAlert(false); closePopup(); }} className="flex-1 h-[44px] rounded-pill bg-coral text-white font-medium text-[13px] hover:bg-coral-soft transition-colors shadow-sm">Yes, cancel</button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Price Summary Modal (Bottom Sheet for Mobile) */}
        <AnimatePresence>
          {showSummary && order && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[999] bg-ink/60 flex items-end xs:items-center justify-center xs:p-lg"
              onClick={() => setShowSummary(false)}
            >
              <motion.div 
                initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-canvas w-full max-w-full xs:max-w-[400px] rounded-t-2xl xs:rounded-xl shadow-2xl overflow-hidden"
              >
                <div className="p-4 border-b border-dashed border-border-light/80 relative">
                  <h3 className="text-[18px] font-sans font-bold text-ink mb-0.5">Price summary</h3>
                  <p className="text-[13px] text-body-muted">{order.merchantName || 'Binance Pay'}</p>
                  <button onClick={() => setShowSummary(false)} className="absolute top-4 right-4 text-muted hover:text-ink">
                    <X size={20} />
                  </button>
                </div>
                
                <div className="p-4">
                  <div className="bg-[#f5f8ff] rounded-lg p-3 flex gap-3 items-center mb-4 border border-[#e2edff]">
                    <div className="w-10 h-10 bg-white rounded-[8px] shadow-sm border border-border-light/50 flex items-center justify-center flex-shrink-0">
                      <div className="w-6 h-6 bg-[#1a56db] rounded-full flex items-center justify-center text-white font-bold text-[12px]">
                        B
                      </div>
                    </div>
                    <div>
                      <div className="text-[13px] text-[#1a2b4b] font-medium mb-0.5">Buyer Protection by Binance Pay</div>
                      <div className="text-[12px] text-muted leading-tight">100% secure on-chain settlement</div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[14px] text-ink">Subtotal</span>
                    <span className="text-[14px] text-ink font-mono">${order.amount}</span>
                  </div>
                </div>

                <div className="px-4 py-4 border-t border-dashed border-border-light/80 bg-white">
                  <div className="flex justify-between items-center">
                    <span className="text-[16px] font-bold text-ink">Grand Total</span>
                    <span className="text-[16px] font-bold text-ink font-mono">${order.amount}</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Global Close Button (Always top right, except step 2 where it's inline). Hidden on mobile. */}
        {step < 3 && step !== 2 && (
            <button onClick={() => {
              if (step === 2) setShowCancelAlert(true);
              else closePopup();
            }} className="hidden xs:flex absolute top-5 right-5 text-ink hover:text-black bg-soft-stone hover:bg-border-light rounded-full p-1.5 transition-colors z-20">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
        )}
        {step < 3 && step !== 2 && (
            <button onClick={() => {
              if (step === 2) setShowCancelAlert(true);
              else closePopup();
            }} className="absolute top-5 right-5 text-ink hover:text-black bg-soft-stone hover:bg-border-light rounded-full p-1.5 transition-colors z-20">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
        )}

        {/* LEFT PANE (Mobile: Slim Top Header) */}
        {(step > 0 && order) && (
          <div className="bg-primary text-on-dark flex flex-col relative xs:w-[280px] xs:min-h-full xs:justify-between p-md xs:p-xl transition-all duration-300 shrink-0">
            
            {/* Mobile Header Layout (Row) / Desktop Header Layout (Column) */}
            <div className="flex flex-row xs:flex-col items-center xs:items-start gap-3 xs:gap-0">
                
                <div className="w-10 h-10 xs:w-12 xs:h-12 bg-canvas rounded-sm flex items-center justify-center xs:mb-md shadow-sm shrink-0">
                  <div className="w-4 h-4 border-[2.5px] border-primary rounded-xs rotate-45"></div>
                </div>
                
                <div className="flex flex-col flex-1">
                  <div className="flex items-center gap-sm mb-1 xs:mb-xs">
                    <h2 className="text-[16px] font-medium text-on-dark/90 tracking-wide leading-none">{order.merchantName || 'Merchant'}</h2>
                  </div>
                  <div className="inline-flex w-fit px-1.5 py-0.5 rounded-xs bg-on-dark/10 border border-on-dark/10 text-[9px] font-mono uppercase tracking-widest text-on-dark/60 items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-pale-green animate-pulse"></span> Trusted Business
                  </div>
                </div>

                {/* Mobile Close Button (Right side, clean modern X) */}
                <button onClick={() => { if (step === 2) setShowCancelAlert(true); else closePopup(); }} className="xs:hidden text-on-dark/70 hover:text-white p-2 -mr-2 transition-colors">
                   <X size={24} strokeWidth={2} />
                </button>
            </div>

            {/* Desktop Only Amount Block */}
            <div className="hidden xs:block bg-on-dark/5 rounded-md p-md mt-lg border border-on-dark/10">
                <p className="text-[12px] text-on-dark/50 uppercase tracking-widest font-medium mb-1">Amount to Pay</p>
                <div className="flex items-baseline gap-xs">
                    <span className="font-sans text-[20px] text-on-dark/70">$</span>
                    <span className="font-display text-[32px] tracking-[-0.5px] leading-none">{order.amount}</span>
                    <span className="font-mono text-[14px] text-on-dark/60 ml-1">{order.currency}</span>
                </div>
            </div>

            {/* Desktop Only Footer Graphic/Info */}
            <div className="hidden xs:flex flex-col mt-xl">
                <div className="flex items-center gap-2 text-on-dark/40 text-[12px]">
                    <ShieldCheck size={16} /> Secured by Binance Pay Gateway
                </div>
            </div>
          </div>
        )}

        {/* RIGHT PANE (Body) */}
        <div className="flex-1 bg-canvas relative flex flex-col overflow-y-auto xs:overflow-hidden">
          <AnimatePresence mode="wait">
            
            {/* Loading */}
            {step === 0 && (
              <motion.div key="loading" className="flex-1 flex flex-col items-center justify-center min-h-[300px] xs:min-h-[480px]">
                 {/* You can place your website logo image in the public folder as logo.png */}
                 <img src="/logo.png" alt="Website Logo" className="w-16 h-16 object-contain mb-md animate-pulse" 
                      onError={(e) => {
                          e.target.style.display = 'none'; // Fallback if logo.png is not found
                          e.target.nextElementSibling.style.display = 'flex';
                      }}
                 />
                 {/* Fallback logo just in case the image is missing */}
                 <div className="hidden w-16 h-16 bg-canvas rounded-lg shadow-sm border border-border-light items-center justify-center mb-md animate-pulse">
                     <div className="w-6 h-6 border-[3px] border-primary rounded-sm rotate-45"></div>
                 </div>

                 <p className="text-[15px] text-ink font-medium animate-pulse">Fetching payment info...</p>
              </motion.div>
            )}

            {/* Error */}
            {step === 4 && (
              <motion.div key="error" className="flex-1 flex flex-col items-center justify-center p-xl">
                <div className="w-16 h-16 rounded-full bg-coral-soft/20 text-error flex items-center justify-center mb-md shadow-sm">
                  <XCircle size={32} />
                </div>
                <h3 className="text-[20px] font-display text-ink tracking-[-0.2px] mb-xs">Payment Failed</h3>
                <p className="text-[14px] text-body-muted mb-xl text-center">{errorMsg}</p>
                <button onClick={closePopup} className="w-full max-w-[200px] h-[48px] rounded-pill bg-soft-stone text-ink font-medium text-[14px] hover:bg-border-light transition-colors">
                  Close
                </button>
              </motion.div>
            )}

            {/* QR Screen */}
            {step === 2 && (
              <motion.div 
                key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                className="p-lg xs:p-xl flex flex-col flex-1 relative h-full justify-between"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-border-light pb-md mb-lg">
                      <h3 className="text-[18px] font-display font-medium text-ink">Scan & Pay</h3>
                      
                      <div className="flex items-center gap-3">
                          {timeLeft && (
                              <div className="px-3 py-1.5 bg-coral/10 rounded-full flex items-center gap-2">
                                  <span className="w-2 h-2 rounded-full bg-coral animate-pulse"></span>
                                  <span className="font-mono text-[13px] text-coral font-bold tracking-widest leading-none">{timeLeft}</span>
                              </div>
                          )}
                          <button onClick={() => setShowCancelAlert(true)} className="hidden xs:flex items-center justify-center w-8 h-8 text-ink hover:text-black bg-soft-stone hover:bg-border-light rounded-full transition-colors">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                          </button>
                      </div>
                  </div>

                  <div className="flex flex-col xs:flex-row gap-xl">
                      {/* Left: QR Code */}
                      <div className="flex flex-col items-center justify-center xs:pr-xl xs:border-r border-border-light">
                          <p className="text-[13px] text-body-muted font-medium mb-md text-center">Open Binance App</p>
                          <div className="w-[180px] h-[180px] bg-canvas border border-border-light shadow-sm rounded-lg p-2 flex items-center justify-center relative mb-xs">
                              <img src={order.qrUrl || `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${order.binanceId}`} alt="QR" className="w-full h-full object-contain rounded-md" />
                              {!order.qrUrl && (
                                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                      <div className="w-10 h-10 bg-canvas rounded-sm flex items-center justify-center shadow-md">
                                          <div className="w-4 h-4 border-[2px] border-primary rounded-xs rotate-45"></div>
                                      </div>
                                  </div>
                              )}
                          </div>
                      </div>

                      {/* Right: Data */}
                      <div className="flex-1 flex flex-col justify-center">
                          <div className="bg-pale-blue w-full p-md rounded-md border border-action-blue/20 mb-md relative overflow-hidden group">
                              <div className="absolute top-0 left-0 w-1 h-full bg-action-blue"></div>
                              <span className="block text-[11px] text-action-blue uppercase tracking-widest font-bold mb-xs pl-2">Mandatory Note</span>
                              <span className="block font-mono text-[24px] text-ink font-bold tracking-widest select-all mb-1 pl-2">
                                  {order.note}
                              </span>
                              <div className="flex items-center gap-1.5 text-error pl-2 mt-1">
                                  <AlertTriangle size={14} />
                                  <span className="text-[12px] font-medium leading-tight">
                                      Required for verification.
                                  </span>
                              </div>
                          </div>
                          
                          <div className="w-full bg-soft-stone p-md rounded-md border border-border-light">
                              <span className="block text-[11px] uppercase tracking-widest text-muted font-bold mb-1">Binance Pay ID</span>
                              <span className="block font-mono text-[16px] text-ink font-bold select-all">
                                  {order.binanceId || 'Not Configured'}
                              </span>
                          </div>
                      </div>
                  </div>
                </div>

                <div className="flex items-center justify-center mt-xl pt-md pb-xl xs:pb-0 w-full">
                    <div className="flex items-center gap-sm px-lg py-2.5 bg-action-blue/5 border border-action-blue/20 rounded-full shadow-sm">
                        <Loader2 size={16} className="animate-spin text-action-blue" />
                        <span className="text-[13px] text-action-blue font-medium tracking-wide">Awaiting blockchain verification...</span>
                    </div>
                </div>
              </motion.div>
            )}

            {/* Success Screen */}
            {step === 3 && (
              <motion.div 
                key="step3" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="p-xl flex flex-col items-center text-center flex-1 justify-center"
              >
                <div className="w-16 h-16 rounded-full bg-pale-green text-deep-green flex items-center justify-center mb-md shadow-sm">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-[24px] font-display text-ink tracking-[-0.24px] mb-xs">Payment Successful</h3>
                <p className="text-[14px] text-body-muted mb-xl">Your transaction has been verified on the blockchain.</p>
                <div className="text-[13px] text-muted animate-pulse">Closing popup...</div>
              </motion.div>
            )}

          </AnimatePresence>

          {/* Mobile Only Sticky Footer */}
          {step === 2 && order && (
             <div className="xs:hidden mt-auto sticky bottom-0 left-0 w-full bg-canvas shadow-[0_-4px_12px_rgba(0,0,0,0.1)] z-20 border-t border-border-light/50">
               
               {/* Buyer Protection Bar */}
               <div className="bg-[#d5e4fc] px-4 py-2.5 flex items-center justify-center gap-1.5 border-b border-border-light/50">
                 <div className="w-4 h-4 bg-[#1a56db] rounded-full flex items-center justify-center text-white font-bold text-[9px] shadow-sm">
                   B
                 </div>
                 <span className="text-[12px] font-sans text-[#1a2b4b] flex items-center gap-1">
                   <span className="border-b border-dashed border-[#1a2b4b]/40 pb-[0.5px] font-medium tracking-tight">Buyer Protection</span> 
                   <span className="text-[#1a2b4b]/80">by</span>
                   <strong className="tracking-tight italic font-black text-[#1a56db]">BINANCE</strong>
                 </span>
               </div>

               {/* Price and Button Area */}
               <div className="px-4 py-3 flex items-center gap-4 bg-white">
                 <div className="flex flex-col flex-shrink-0 min-w-[80px]">
                   <div className="font-sans text-[20px] font-bold text-ink leading-tight tracking-tight">${order.amount}</div>
                   <div onClick={() => setShowSummary(true)} className="text-[11px] text-body-muted flex items-center gap-1 mt-[2px] cursor-pointer hover:text-ink transition-colors">
                     View Details
                     <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-60"><polyline points="18 15 12 9 6 15"></polyline></svg>
                   </div>
                 </div>
                 
                 <a href={order.payUrl || "binance://"} target="_top" className="flex-1 h-[44px] rounded-[4px] bg-[#0c1421] text-white font-medium text-[15px] flex items-center justify-center shadow-sm hover:bg-black transition-colors cursor-pointer tracking-wide">
                   Continue
                 </a>
               </div>
             </div>
          )}
        </div>

      </motion.div>
    </div>
  );
}
