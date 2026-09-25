import React from 'react';
import InfoPage from './InfoPage';
import { CheckCircle, AlertCircle } from 'lucide-react';

export default function Status() {
  const content = (
    <div className="text-[16px] text-body-muted leading-[1.6] space-y-6">
      
      <div className="bg-pale-green border border-green-200 rounded-md p-6 flex items-center gap-4 mb-8">
        <CheckCircle className="text-deep-green" size={32} />
        <div>
          <h2 className="text-[20px] font-display text-primary m-0">All Systems Operational</h2>
          <p className="text-deep-green/80 text-[14px] m-0">Last updated: Just now</p>
        </div>
      </div>

      <h2 className="text-[24px] font-display text-ink mt-8 mb-4">Core Services</h2>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-canvas border border-border-light rounded-md">
          <span className="font-medium text-ink">API Endpoints (REST)</span>
          <span className="flex items-center gap-2 text-[14px] text-deep-green"><CheckCircle size={16} /> Operational</span>
        </div>
        <div className="flex items-center justify-between p-4 bg-canvas border border-border-light rounded-md">
          <span className="font-medium text-ink">Dashboard & Portal</span>
          <span className="flex items-center gap-2 text-[14px] text-deep-green"><CheckCircle size={16} /> Operational</span>
        </div>
        <div className="flex items-center justify-between p-4 bg-canvas border border-border-light rounded-md">
          <span className="font-medium text-ink">Webhook Delivery</span>
          <span className="flex items-center gap-2 text-[14px] text-deep-green"><CheckCircle size={16} /> Operational</span>
        </div>
      </div>

      <h2 className="text-[24px] font-display text-ink mt-12 mb-4">Blockchain Networks</h2>
      
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="flex items-center justify-between p-4 bg-canvas border border-border-light rounded-md">
          <span className="font-medium text-ink">Ethereum (ERC-20)</span>
          <span className="flex items-center gap-2 text-[14px] text-deep-green"><CheckCircle size={16} /> 100%</span>
        </div>
        <div className="flex items-center justify-between p-4 bg-canvas border border-border-light rounded-md">
          <span className="font-medium text-ink">Binance Smart Chain</span>
          <span className="flex items-center gap-2 text-[14px] text-deep-green"><CheckCircle size={16} /> 100%</span>
        </div>
        <div className="flex items-center justify-between p-4 bg-canvas border border-border-light rounded-md">
          <span className="font-medium text-ink">Polygon</span>
          <span className="flex items-center gap-2 text-[14px] text-deep-green"><CheckCircle size={16} /> 100%</span>
        </div>
        <div className="flex items-center justify-between p-4 bg-canvas border border-border-light rounded-md">
          <span className="font-medium text-ink">Solana</span>
          <span className="flex items-center gap-2 text-[14px] text-coral"><AlertCircle size={16} /> Degraded Performance</span>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-hairline">
        <h3 className="text-[20px] font-display text-ink mb-2">Past Incidents</h3>
        <p className="text-[14px]">No incidents reported in the last 30 days.</p>
      </div>

    </div>
  );

  return (
    <InfoPage 
      title="System Status" 
      description="Real-time status and historical uptime for Binance Pay Gateway services." 
      content={content} 
      fullWidth={true}
    />
  );
}
