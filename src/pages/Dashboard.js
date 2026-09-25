import React, { useState, useEffect } from "react";
import Lenis from "lenis";
import { Link, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Activity, ArrowUpRight, Copy, KeyRound, Layers, LayoutDashboard, LogOut, Menu, Settings, Wallet, CheckCircle, AlertCircle, Loader2, X, RefreshCw, UploadCloud, Receipt, User, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import jsQR from "jsqr";
import { useAuth, apiFetch, formatApiErrorDetail } from "@/context/AuthContext";
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

// --- Components ---

function StatCard({ label, value, icon: Icon }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
      className="bg-canvas border border-card-border rounded-md p-md sm:p-lg shadow-sm flex flex-col justify-between min-h-[120px] sm:min-h-[140px]"
    >
      <div className="flex justify-between items-center mb-md">
        <span className="text-[14px] font-sans text-body-muted">{label}</span>
        <span className="text-muted"><Icon size={18} /></span>
      </div>
      <div className="font-display text-[32px] text-ink tracking-[-0.32px]">{value}</div>
    </motion.div>
  );
}

function Badge({ status }) {
  const styles = {
    PAID: "bg-pale-green text-deep-green",
    completed: "bg-pale-green text-deep-green",
    PENDING: "bg-pale-blue text-action-blue",
    pending: "bg-pale-blue text-action-blue",
    EXPIRED: "bg-soft-stone text-slate",
    failed: "bg-coral-soft/30 text-error",
    NEW: "bg-pale-blue text-action-blue"
  };
  return (
    <span className={`px-2 py-1 rounded-xs text-[12px] font-mono uppercase tracking-widest ${styles[status] || styles.PENDING}`}>
      {status}
    </span>
  );
}

const fmtMoney = (n) => `$${Number(n || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
const fmtDate = (iso) => new Date(iso).toLocaleString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });

// --- Views ---


function Overview() {
  const [stats, setStats] = useState(null);
  const [txs, setTxs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      apiFetch("/api/merchant/stats"),
      apiFetch("/api/merchant/transactions").catch(() => ({ data: { transactions: [] } }))
    ])
      .then(([statsRes, txsRes]) => {
        setStats(statsRes.data);
        setTxs(txsRes.data.transactions || []);
      })
      .catch(err => toast.error(formatApiErrorDetail(err.response?.data)))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex items-center justify-center p-xl"><Loader2 className="animate-spin text-primary" /></div>;
  if (!stats) return null;

  // Generate the last 7 days dynamically so the X-Axis is always real
  const last7Days = [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  });

  const grouped = txs.reduce((acc, tx) => {
    if (!tx.created_at) return acc;
    const d = new Date(tx.created_at).toLocaleDateString(undefined, { month: "short", day: "numeric" });
    if (acc[d] !== undefined) {
      acc[d].volume += Number(tx.amount || 0);
      acc[d].count += 1;
    }
    return acc;
  }, last7Days.reduce((acc, date) => ({ ...acc, [date]: { name: date, volume: 0, count: 0 } }), {}));
  
  let chartData = Object.values(grouped);

  const completed = stats.recentOrders?.filter(o => o.status === "PAID" || o.status === "completed").length || 0;
  const total = stats.recentOrders?.length || 1;
  const successRate = ((completed / total) * 100).toFixed(1);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="flex flex-col gap-xl">



      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-lg">
        <StatCard label="Total Revenue" value={fmtMoney(stats.totalRevenue)} icon={Wallet} />
        <StatCard label="Total Orders" value={stats.totalOrders?.toLocaleString()} icon={Layers} />
        <StatCard label="Success Rate" value={`${successRate}%`} icon={Activity} />
        <StatCard label="Avg Order" value={fmtMoney(stats.totalRevenue / (stats.totalOrders || 1))} icon={ArrowUpRight} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
        <div className="lg:col-span-2 bg-canvas border border-card-border rounded-md p-md sm:p-xl shadow-sm">
          <div className="flex justify-between items-center mb-lg">
            <div>
              <h3 className="font-display text-[24px] tracking-[-0.24px] text-ink">Volume History</h3>
              <p className="text-[14px] text-body-muted">Settled amounts over time</p>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorVol" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1863dc" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#1863dc" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#93939f', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#93939f', fontSize: 12}} tickFormatter={(val) => `$${val}`} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} 
                  formatter={(value) => [fmtMoney(value), "Volume"]}
                />
                <Area type="monotone" dataKey="volume" stroke="#1863dc" strokeWidth={2} fillOpacity={1} fill="url(#colorVol)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-canvas border border-card-border rounded-md p-md sm:p-xl shadow-sm flex flex-col">
          <div className="mb-lg">
            <h3 className="font-display text-[24px] tracking-[-0.24px] text-ink">Transaction Velocity</h3>
            <p className="text-[14px] text-body-muted">Daily transaction counts</p>
          </div>
          <div className="flex-1 min-h-[250px] w-full flex items-end">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                 <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#003c33" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#003c33" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#93939f', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#93939f', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} 
                />
                <Area type="step" dataKey="count" stroke="#003c33" strokeWidth={2} fillOpacity={1} fill="url(#colorCount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

    </motion.div>
  );
}

function ApiKeys() {
  const { user } = useAuth();
  const copyKey = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };
  
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="flex flex-col gap-xl">



      <div className="bg-canvas border border-card-border rounded-md p-md sm:p-xl shadow-sm">
        <h3 className="font-display text-[24px] tracking-[-0.24px] text-ink mb-sm">API Keys</h3>
        <p className="font-sans text-[16px] text-body-muted mb-xl max-w-2xl">
          Use these keys to authenticate your API requests. Keep your secret key confidential and do not expose it in client-side code.
        </p>
        
        <div className="flex flex-col gap-lg">
          <div className="flex flex-col gap-xs">
            <label className="text-[14px] font-medium text-ink">Gateway API Key</label>
            <div className="flex flex-col sm:flex-row sm:items-center items-start gap-md">
              <input type="text" readOnly value={user?.gatewayApiKey || "Not generated"} className="flex-1 h-[44px] px-md rounded-xs border border-border-light bg-soft-stone/30 font-mono text-[14px] text-ink focus:outline-none" />
              <button onClick={() => copyKey(user?.gatewayApiKey)} className="h-[44px] px-md rounded-xs border border-border-light bg-canvas hover:bg-soft-stone transition-colors text-ink">
                <Copy size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Transactions() {
  const [txs, setTxs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    apiFetch("/api/merchant/transactions")
      .then(res => setTxs(res.data.transactions || []))
      .catch(err => toast.error(formatApiErrorDetail(err.response?.data)))
      .finally(() => setLoading(false));
  }, []);

  const totalPages = Math.ceil(txs.length / itemsPerPage);
  const currentTxs = txs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="flex flex-col gap-xl">



      <div className="bg-canvas border border-card-border rounded-md shadow-sm overflow-hidden">
        <div className="p-lg border-b border-border-light bg-pale-blue/30 flex justify-between items-center">
          <h3 className="font-display text-[20px] text-ink">Binance Pay Transactions</h3>
        </div>
        <div className="overflow-x-auto">
          {loading ? (
             <div className="flex items-center justify-center p-xl"><Loader2 className="animate-spin text-primary" /></div>
          ) : (
            <>
            <table className="w-full text-left font-sans dash-table">
              <thead>
                <tr className="border-b border-border-light text-muted bg-soft-stone/30">
                  <th className="font-mono text-[12px] uppercase tracking-widest py-md px-lg">Tx ID</th>
                  <th className="font-mono text-[12px] uppercase tracking-widest py-md px-lg">Amount</th>
                  <th className="font-mono text-[12px] uppercase tracking-widest py-md px-lg">Type</th>
                  <th className="font-mono text-[12px] uppercase tracking-widest py-md px-lg">Note</th>
                  <th className="font-mono text-[12px] uppercase tracking-widest py-md px-lg text-right">Date</th>
                </tr>
              </thead>
              <tbody>
                {currentTxs.map((tx, i) => (
                  <tr key={i} className="border-b border-border-light last:border-none hover:bg-soft-stone/20 transition-colors group">
                    <td className="py-md px-lg">
                       <div className="flex items-center gap-sm">
                        <div className="w-8 h-8 rounded-full bg-soft-stone flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-canvas transition-colors">
                          <Activity size={14} />
                        </div>
                        <span className="font-mono text-[13px] text-ink">{tx.order_id}</span>
                      </div>
                    </td>
                    <td className="py-md px-lg">
                      <div className="flex items-center gap-xs">
                        <span className="font-display text-[16px] text-ink">{tx.amount}</span>
                        <span className="text-[12px] font-mono text-muted">{tx.currency}</span>
                      </div>
                    </td>
                    <td className="py-md px-lg">
                      <span className="px-2 py-1 bg-soft-stone rounded-xs text-[11px] font-mono text-ink tracking-wider uppercase">{tx.orType || 'SETTLEMENT'}</span>
                    </td>
                    <td className="py-md px-lg text-[13px] text-ink opacity-80">{tx.note || 'Binance Pay'}</td>
                    <td className="py-md px-lg text-right text-[13px] text-body-muted">{fmtDate(tx.created_at)}</td>
                  </tr>
                ))}
                {txs.length === 0 && (
                  <tr>
                    <td colSpan="5" className="py-[80px] text-center">
                      <div className="flex flex-col items-center justify-center text-muted">
                        <AlertCircle size={32} className="mb-sm opacity-20" />
                        <p className="text-[14px]">No ledger activity found.</p>
                        <p className="text-[12px] opacity-60">Ensure your Binance API keys are configured correctly.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            {totalPages > 1 && (
              <div className="p-md border-t border-border-light flex justify-between items-center bg-soft-stone/10">
                <span className="text-[13px] text-muted font-sans">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, txs.length)} of {txs.length}
                </span>
                <div className="flex items-center gap-sm">
                  <button 
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-xs rounded-xs hover:bg-soft-stone disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-ink"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <span className="text-[13px] font-medium text-ink px-xs">{currentPage} / {totalPages}</span>
                  <button 
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="p-xs rounded-xs hover:bg-soft-stone disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-ink"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function SettingsView() {
  const { user } = useAuth();
  const [keys, setKeys] = useState({ binanceApiKey: "", binanceSecretKey: "", binancePayId: user?.binancePayId || "" });
  const [loading, setLoading] = useState(false);
  const [qrFile, setQrFile] = useState(null);

  // Crop States
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [upImg, setUpImg] = useState();
  const [crop, setCrop] = useState(null);
  const [completedCrop, setCompletedCrop] = useState(null);
  const imgRef = React.useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [decodedUrl, setDecodedUrl] = useState("");

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await apiFetch("/api/merchant/settings", { method: "PUT", data: keys });
      toast.success("Binance keys securely updated.");
    } catch (err) {
      toast.error(formatApiErrorDetail(err.response?.data));
    }
    setLoading(false);
  };

  // Auto-detect QR using jsQR
  const handleQrUpload = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setUpImg(reader.result);
        
        // Use jsQR to auto-detect
        const img = new Image();
        img.src = reader.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, img.width, img.height);
          
          let finalCode = null;
          let finalLoc = null;

          // Helper function to scan a specific region
          const scanRegion = (x, y, w, h) => {
             const imageData = ctx.getImageData(x, y, w, h);
             const code = jsQR(imageData.data, w, h);
             if (code) {
                 // Adjust local coordinates back to global canvas coordinates
                 return {
                     data: code.data,
                     location: {
                         topLeftCorner: { x: code.location.topLeftCorner.x + x, y: code.location.topLeftCorner.y + y },
                         topRightCorner: { x: code.location.topRightCorner.x + x, y: code.location.topRightCorner.y + y },
                         bottomLeftCorner: { x: code.location.bottomLeftCorner.x + x, y: code.location.bottomLeftCorner.y + y },
                         bottomRightCorner: { x: code.location.bottomRightCorner.x + x, y: code.location.bottomRightCorner.y + y }
                     }
                 };
             }
             return null;
          };

          // 1. First, aggressively scan just the center/top area where the real Pay QR lives (avoiding the bottom footer)
          const centerCode = scanRegion(0, 0, img.width, Math.floor(img.height * 0.75));
          if (centerCode && !centerCode.data.includes("download") && !centerCode.data.includes("binance.info")) {
              finalCode = centerCode;
          } 
          // 2. Fallback to scanning the whole image if the center scan failed or returned garbage
          else {
              const fullCode = scanRegion(0, 0, img.width, img.height);
              if (fullCode) {
                  finalCode = fullCode;
              }
          }

          if (finalCode) {
             setDecodedUrl(finalCode.data);
             const loc = finalCode.location;
             const minX = Math.min(loc.topLeftCorner.x, loc.bottomLeftCorner.x);
             const maxX = Math.max(loc.topRightCorner.x, loc.bottomRightCorner.x);
             const minY = Math.min(loc.topLeftCorner.y, loc.topRightCorner.y);
             const maxY = Math.max(loc.bottomLeftCorner.y, loc.bottomRightCorner.y);
             
             const padding = 20;
             const cropX = Math.max(0, minX - padding);
             const cropY = Math.max(0, minY - padding);
             const cropW = Math.min(img.width - cropX, (maxX - minX) + padding * 2);
             const cropH = Math.min(img.height - cropY, (maxY - minY) + padding * 2);
             
             setCrop({ 
               unit: '%', 
               x: (cropX / img.width) * 100, 
               y: (cropY / img.height) * 100, 
               width: (cropW / img.width) * 100, 
               height: (cropH / img.height) * 100 
             });
             
             if (finalCode.data.includes("download")) {
                 toast.error("Detected download QR instead of Payment QR. Please check the URL.");
             } else {
                 toast.success("Main Payment QR successfully detected!");
             }
          } else {
             setCrop({ unit: '%', width: 50, height: 50, x: 25, y: 25 });
             toast("Could not read QR automatically. Please crop manually.");
          }
          setCropModalOpen(true);
        };
      });
      reader.readAsDataURL(file);
    }
    e.target.value = ''; // Reset input
  };

  const uploadCroppedImage = async () => {
    if (!completedCrop || !imgRef.current) return;

    if (decodedUrl) {
      const isValid = /^https:\/\/app\.binance\.com\//i.test(decodedUrl);
      if (!isValid) {
        toast.error("Invalid Binance Pay URL. Upload blocked for security.");
        return;
      }
    }

    setIsUploading(true);
    
    try {
      const image = imgRef.current;
      const canvas = document.createElement('canvas');
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      canvas.width = completedCrop.width;
      canvas.height = completedCrop.height;
      const ctx = canvas.getContext('2d');

      ctx.drawImage(
        image,
        completedCrop.x * scaleX,
        completedCrop.y * scaleY,
        completedCrop.width * scaleX,
        completedCrop.height * scaleY,
        0,
        0,
        completedCrop.width,
        completedCrop.height
      );

      canvas.toBlob(async (blob) => {
        if (!blob) throw new Error('Canvas is empty');
        const fd = new FormData();
        fd.append("qrImage", blob, 'qr.png');
        if (decodedUrl) fd.append("payUrl", decodedUrl);
        
        toast("Uploading Cropped QR Code...");
        await apiFetch("/api/merchant/qr", { method: "POST", data: fd });
        toast.success("QR Code uploaded successfully");
        setCropModalOpen(false);
        setIsUploading(false);
        
        // Refresh page to show new image
        window.location.reload();
      }, 'image/png');
      
    } catch (err) {
      setIsUploading(false);
      toast.error("Failed to crop/upload image.");
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="flex flex-col gap-xl">



      
      {/* Crop Modal Overlay */}
      <AnimatePresence>
        {cropModalOpen && (
          <div className="fixed inset-0 z-[100] bg-ink/80 backdrop-blur-sm flex items-center justify-center p-md">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-canvas rounded-lg p-lg shadow-2xl w-full max-w-[600px] flex flex-col max-h-[90vh]">
              <h3 className="font-display text-[20px] text-ink mb-xs">Crop QR Code & Verify URL</h3>
              <p className="text-[14px] text-body-muted mb-md">Adjust the crop box around your QR code and verify the decoded URL.</p>
              
              <div className="flex flex-col gap-xs mb-md">
                <label className="text-[12px] font-medium text-ink uppercase tracking-wider">Decoded Binance Pay URL</label>
                <div 
                  className={`h-[40px] px-sm rounded-xs border flex items-center bg-soft-stone/50 text-[13px] font-mono w-full truncate ${
                    decodedUrl && !/^https:\/\/app\.binance\.com\//i.test(decodedUrl) 
                      ? 'border-coral text-coral bg-coral/5' 
                      : 'border-border-light text-ink/70'
                  }`}
                >
                  {decodedUrl || "No URL detected..."}
                </div>
                {decodedUrl && !/^https:\/\/app\.binance\.com\//i.test(decodedUrl) && (
                  <span className="text-[11px] text-coral font-medium mt-1">⚠️ This does not look like a valid Binance Pay URL.</span>
                )}
              </div>
              
              <div className="flex-1 overflow-auto bg-soft-stone rounded-md mb-md flex items-center justify-center relative min-h-[300px]">
                <ReactCrop
                  crop={crop}
                  onChange={(c) => setCrop(c)}
                  onComplete={(c) => setCompletedCrop(c)}
                  aspect={1}
                >
                  <img 
                    ref={imgRef} 
                    src={upImg} 
                    alt="Upload Preview" 
                    className="max-h-[50vh] object-contain"
                    onLoad={(e) => {
                      if (!crop) setCrop({ unit: '%', width: 50, height: 50, x: 25, y: 25 });
                    }}
                  />
                </ReactCrop>
              </div>

              <div className="flex justify-end gap-md pt-sm border-t border-border-light">
                <button onClick={() => setCropModalOpen(false)} disabled={isUploading} className="px-lg py-2 rounded-full text-ink hover:bg-soft-stone font-medium text-[14px] transition-colors">Cancel</button>
                <button onClick={uploadCroppedImage} disabled={isUploading} className="px-xl py-2 rounded-full bg-primary text-on-primary font-medium text-[14px] hover:bg-ink transition-colors flex items-center gap-2">
                  {isUploading ? <Loader2 size={16} className="animate-spin" /> : "Confirm & Upload"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
<div className="bg-canvas border border-card-border rounded-md p-md sm:p-xl shadow-sm">
        <h3 className="font-display text-[24px] tracking-[-0.24px] text-ink mb-sm">Binance API Configuration</h3>
        <p className="font-sans text-[16px] text-body-muted mb-xl max-w-2xl">
          Enter your Binance Pay API keys to allow the gateway to generate payment URLs and verify transactions securely.
        </p>
        
        <form className="flex flex-col gap-lg max-w-2xl" onSubmit={handleSave}>
          <div className="flex flex-col gap-xs">
            <label className="text-[14px] font-medium text-ink">Binance API Key</label>
            <input 
              type="text" 
              placeholder={user?.binanceApiKey ? "******** (Encrypted)" : "Enter API Key"}
              value={keys.binanceApiKey} onChange={e => setKeys({...keys, binanceApiKey: e.target.value})} 
              className="h-[44px] px-md rounded-xs border border-border-light focus:border-form-focus focus:outline-none bg-canvas text-[14px]" 
            />
          </div>
          <div className="flex flex-col gap-xs">
            <label className="text-[14px] font-medium text-ink">Binance Secret Key</label>
            <input 
              type="password" 
              placeholder={user?.binanceSecretKey ? "******** (Encrypted)" : "Enter Secret Key"}
              value={keys.binanceSecretKey} onChange={e => setKeys({...keys, binanceSecretKey: e.target.value})} 
              className="h-[44px] px-md rounded-xs border border-border-light focus:border-form-focus focus:outline-none bg-canvas text-[14px]" 
            />
          </div>
          <div className="flex flex-col gap-xs">
            <label className="text-[14px] font-medium text-ink">Binance Merchant Pay ID</label>
            <input 
              type="text" 
              value={keys.binancePayId} onChange={e => setKeys({...keys, binancePayId: e.target.value})} 
              className="h-[44px] px-md rounded-xs border border-border-light focus:border-form-focus focus:outline-none bg-canvas text-[14px]" 
            />
          </div>
          
          <div className="pt-md mt-sm border-t border-border-light">
            <button type="submit" disabled={loading} className="h-[40px] px-xl rounded-pill bg-primary text-on-primary font-medium text-[14px] hover:bg-ink transition-colors disabled:opacity-50">
              {loading ? <Loader2 className="animate-spin inline" size={16} /> : "Save API Config"}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-canvas border border-card-border rounded-md p-md sm:p-xl shadow-sm">
        <h3 className="font-display text-[24px] tracking-[-0.24px] text-ink mb-sm">Payment QR Code</h3>
        <p className="font-sans text-[16px] text-body-muted mb-xl max-w-2xl">
          Upload your Binance Pay QR code image to enable direct wallet-to-wallet scanning.
        </p>
        
        <div className="flex flex-col sm:flex-row sm:items-center items-start gap-md">
          {user?.binanceQrUrl && (
            <img src={user.binanceQrUrl} alt="QR Code" className="w-24 h-24 rounded-xs border border-border-light object-cover" />
          )}
          <label className="flex items-center justify-center gap-sm px-xl h-[44px] border border-border-light rounded-pill cursor-pointer hover:bg-soft-stone transition-colors font-medium text-[14px] text-ink">
            <UploadCloud size={16} /> Upload QR Image
            <input type="file" accept="image/*" className="hidden" onChange={handleQrUpload} />
          </label>
        </div>
      </div>
    </motion.div>
  );
}

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    apiFetch("/api/merchant/orders")
      .then(res => {
        const data = res.data;
        setOrders(Array.isArray(data) ? data : (data?.orders || []));
      })
      .catch(err => toast.error(formatApiErrorDetail(err.response?.data)))
      .finally(() => setLoading(false));
  }, []);

  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const currentOrders = orders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="flex flex-col gap-xl">
      <div className="bg-canvas border border-card-border rounded-md shadow-sm overflow-hidden">
        <div className="p-lg border-b border-border-light bg-pale-blue/30 flex justify-between items-center">
          <h3 className="font-display text-[20px] text-ink">Customer Orders</h3>
        </div>
        <div className="overflow-x-auto">
          {loading ? (
             <div className="flex items-center justify-center p-xl"><Loader2 className="animate-spin text-primary" /></div>
          ) : (
            <>
            <table className="w-full text-left font-sans dash-table">
              <thead>
                <tr className="border-b border-border-light text-muted bg-soft-stone/30">
                  <th className="font-mono text-[12px] uppercase tracking-widest py-md px-lg">Order ID</th>
                  <th className="font-mono text-[12px] uppercase tracking-widest py-md px-lg">Amount</th>
                  <th className="font-mono text-[12px] uppercase tracking-widest py-md px-lg">Status</th>
                  <th className="font-mono text-[12px] uppercase tracking-widest py-md px-lg">Note</th>
                  <th className="font-mono text-[12px] uppercase tracking-widest py-md px-lg text-right">Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="py-xl text-center text-muted font-sans text-[14px]">No orders found.</td>
                  </tr>
                ) : (
                  currentOrders.map((order, i) => (
                    <tr key={i} className="border-b border-border-light last:border-none hover:bg-soft-stone/20 transition-colors group">
                      <td className="py-md px-lg">
                        <div className="flex items-center gap-sm">
                          <div className="w-8 h-8 rounded-full bg-soft-stone flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-canvas transition-colors">
                            <Layers size={14} />
                          </div>
                          <span className="font-mono text-[13px] text-ink">{order.orderId}</span>
                        </div>
                      </td>
                      <td className="py-md px-lg font-mono text-[14px] text-ink">{order.amount}</td>
                      <td className="py-md px-lg">
                        <Badge status={order.status} />
                      </td>
                      <td className="py-md px-lg text-[13px] text-body-muted truncate max-w-[200px]">{order.note}</td>
                      <td className="py-md px-lg text-right font-mono text-[12px] text-muted">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            {totalPages > 1 && (
              <div className="p-md border-t border-border-light flex justify-between items-center bg-soft-stone/10">
                <span className="text-[13px] text-muted font-sans">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, orders.length)} of {orders.length}
                </span>
                <div className="flex items-center gap-sm">
                  <button 
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-xs rounded-xs hover:bg-soft-stone disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-ink"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <span className="text-[13px] font-medium text-ink px-xs">{currentPage} / {totalPages}</span>
                  <button 
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="p-xs rounded-xs hover:bg-soft-stone disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-ink"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function Profile() {
  const { user } = useAuth();
  
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="flex flex-col gap-xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
        <div className="lg:col-span-1 flex flex-col gap-md">
          <div className="bg-canvas border border-card-border rounded-md shadow-sm overflow-hidden">
            <div className="p-lg border-b border-border-light bg-pale-blue/30 flex justify-center items-center">
              <h3 className="font-display text-[18px] text-ink">User Identity</h3>
            </div>
            <div className="p-lg flex flex-col items-center justify-center text-center">
              <div className="w-24 h-24 rounded-full bg-soft-stone border-2 border-border-light flex items-center justify-center mb-md overflow-hidden shadow-sm">
                {user?.avatar ? (
                  <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <User size={40} className="text-muted" />
                )}
              </div>
              <h3 className="font-display text-[22px] tracking-tight text-ink">{user?.name || user?.displayName || "Merchant User"}</h3>
              <p className="text-[15px] text-muted font-sans mt-xs">{user?.email || "No email provided"}</p>
              
              <div className="mt-lg px-md py-sm bg-pale-green/10 border border-pale-green/30 text-pale-green rounded-pill text-[12px] font-medium font-sans uppercase tracking-widest flex items-center gap-2">
                <CheckCircle size={14} /> Active Merchant
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-2 flex flex-col gap-md">
          <div className="bg-canvas border border-card-border rounded-md shadow-sm overflow-hidden h-full">
            <div className="p-lg border-b border-border-light bg-pale-blue/30 flex justify-between items-center">
              <h3 className="font-display text-[18px] text-ink">Account Details</h3>
            </div>
            
            <div className="p-0">
              <div className="flex flex-col sm:flex-row sm:items-center px-xl py-lg border-b border-border-light last:border-none hover:bg-soft-stone/30 transition-colors">
                <span className="text-[13px] font-medium text-muted uppercase tracking-widest w-[160px] flex-shrink-0">User ID</span>
                <span className="font-mono text-[14px] text-ink bg-soft-stone/50 px-sm py-xxs rounded-xs border border-border-light truncate">{user?._id || "Unknown"}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center px-xl py-lg border-b border-border-light last:border-none hover:bg-soft-stone/30 transition-colors">
                <span className="text-[13px] font-medium text-muted uppercase tracking-widest w-[160px] flex-shrink-0">Full Name</span>
                <span className="font-sans text-[16px] text-ink font-medium">{user?.name || user?.displayName || "Not set"}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center px-xl py-lg border-b border-border-light last:border-none hover:bg-soft-stone/30 transition-colors">
                <span className="text-[13px] font-medium text-muted uppercase tracking-widest w-[160px] flex-shrink-0">Email Address</span>
                <span className="font-sans text-[16px] text-ink">{user?.email || "Not set"}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center px-xl py-lg border-b border-border-light last:border-none hover:bg-soft-stone/30 transition-colors">
                <span className="text-[13px] font-medium text-muted uppercase tracking-widest w-[160px] flex-shrink-0">Auth Provider</span>
                <div className="flex items-center gap-2">
                  <span className={`inline-block w-2 h-2 rounded-full ${user?.provider === 'discord' ? 'bg-[#5865F2]' : user?.provider === 'google' ? 'bg-[#EA4335]' : 'bg-primary'}`}></span>
                  <span className="font-sans text-[16px] text-ink capitalize">{user?.provider || "Local"}</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center px-xl py-lg border-b border-border-light last:border-none hover:bg-soft-stone/30 transition-colors">
                <span className="text-[13px] font-medium text-muted uppercase tracking-widest w-[160px] flex-shrink-0">Account Role</span>
                <span className="font-sans text-[16px] text-ink capitalize bg-pale-blue/30 px-sm py-xxs rounded-sm border border-pale-blue text-action-blue font-medium">{user?.role || "Merchant"}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center px-xl py-lg border-b border-border-light last:border-none hover:bg-soft-stone/30 transition-colors">
                <span className="text-[13px] font-medium text-muted uppercase tracking-widest w-[160px] flex-shrink-0">Member Since</span>
                <span className="font-sans text-[16px] text-ink">
                  {user?.createdAt ? new Date(user.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : "Unknown"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// --- Main Layout ---

export default function Dashboard() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const container = document.getElementById('dashboard-scroll-container');
    if (!container) return;
    
    const lenis = new Lenis({
      wrapper: container,
      content: container.firstElementChild || container,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const id = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, []);

  const handleLogout = async () => {
    try {
      if (logout) await logout();
      navigate('/login');
    } catch (err) {
      navigate('/login');
    }
  };

  const navItems = [
    { path: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { path: "/dashboard/keys", label: "API Keys", icon: KeyRound },
    { path: "/dashboard/transactions", label: "Transactions", icon: Receipt },
    { path: "/dashboard/orders", label: "Orders", icon: Layers },
    { path: "/dashboard/profile", label: "Profile", icon: User },
    { path: "/dashboard/settings", label: "Settings", icon: Settings },
  ];

  const isActive = (path) => {
    if (path === "/dashboard" && location.pathname === "/dashboard") return true;
    if (path !== "/dashboard" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const currentTabName = navItems.find(item => isActive(item.path))?.label || "Overview";

  return (
    <div className="flex h-screen bg-soft-stone font-sans text-ink selection:bg-action-blue selection:text-white overflow-hidden">
      
      {/* Mobile Nav Backdrop */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-primary/20 z-40 md:hidden" 
            onClick={() => setMobileMenu(false)} 
          />
        )}
      </AnimatePresence>

      {/* Left Sidebar */}
      <aside className={`fixed md:relative z-50 w-[260px] h-full bg-primary text-on-dark flex flex-col transition-transform duration-300 ease-in-out ${mobileMenu ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        
        {/* Brand Header */}
        <div className="h-[72px] flex items-center px-lg border-b border-on-dark/10 shrink-0">
          <Link to="/" className="font-display font-medium text-[20px] text-on-dark flex items-center gap-sm tracking-tight hover:text-on-dark/90">
            <div className="w-6 h-6 bg-canvas rounded-xs flex items-center justify-center">
              <div className="w-3 h-3 border-[2px] border-primary rounded-xs rotate-45"></div>
            </div>
            Binance Pay
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-lg px-md flex flex-col gap-xs">
          <div className="text-[12px] font-mono uppercase tracking-widest text-on-dark/40 px-md mb-xs">
            Merchant Panel
          </div>
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              to={item.path}
              onClick={() => setMobileMenu(false)}
              className={`flex items-center gap-sm px-md py-sm rounded-xs text-[14px] font-medium transition-colors ${isActive(item.path) ? "bg-on-dark/10 text-on-dark" : "text-on-dark/60 hover:text-on-dark hover:bg-on-dark/10"}`}
            >
              <item.icon size={18} /> {item.label}
            </Link>
          ))}
        </nav>

        {/* Footer Area */}
        <div className="p-md border-t border-on-dark/10 shrink-0">
          <div className="flex items-center justify-between mb-md px-md">
            <div className="flex items-center gap-xs text-[12px] font-mono uppercase tracking-widest text-on-dark/70">
              <div className="w-2 h-2 rounded-full bg-pale-green animate-pulse"></div>
              {user?.name || "Live"}
            </div>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-sm w-full px-md py-sm rounded-xs text-[14px] font-medium text-coral hover:bg-coral/10 transition-colors">
            <LogOut size={16} /> Log Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-soft-stone relative">
        
        {/* Mobile Header */}
        <div className="md:hidden h-[64px] bg-canvas border-b border-border-light flex items-center justify-between px-lg shrink-0">
          <Link to="/" className="font-display font-medium text-[18px] text-primary flex items-center gap-sm tracking-tight">
            <div className="w-5 h-5 bg-primary rounded-xs flex items-center justify-center">
              <div className="w-2.5 h-2.5 border-[1.5px] border-canvas rounded-xs rotate-45"></div>
            </div>
            Binance Pay
          </Link>
          <button className="text-ink" onClick={() => setMobileMenu(true)}>
            <Menu size={24} />
          </button>
        </div>

        {/* Content Scroll Area */}
        <div id="dashboard-scroll-container" className="flex-1 overflow-y-auto w-full">
          <div className="lenis-content-wrapper">
            {/* Page Header */}
            <div className="bg-canvas border-b border-border-light sticky top-0 z-30 w-full">
              <div className="pt-lg sm:pt-xl md:pt-[60px] pb-md sm:pb-lg px-md sm:px-lg md:px-[60px] max-w-[1280px] w-full mx-auto flex justify-between items-end">
                <motion.h1 
                  key={currentTabName} 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} 
                  className="font-display text-[40px] md:text-[48px] tracking-[-0.48px] text-ink leading-none"
                >
                  {currentTabName}
                </motion.h1>
              </div>
            </div>
            
            {/* Page Content */}
            <div className="px-md sm:px-lg md:px-[60px] py-lg sm:py-xl pb-[120px] max-w-[1280px] w-full mx-auto">
              <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                  <Route path="/" element={<Overview />} />
                  <Route path="keys" element={<ApiKeys />} />
                  <Route path="transactions" element={<Transactions />} />
                  <Route path="orders" element={<Orders />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="settings" element={<SettingsView />} />
                </Routes>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
