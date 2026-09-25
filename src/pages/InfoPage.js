import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function InfoPage({ title, description, content, fullWidth = false }) {
  return (
    <div className="min-h-screen bg-canvas text-ink font-sans selection:bg-action-blue selection:text-white flex flex-col">

      {/* Content */}
      <main className={`pt-[60px] md:pt-[100px] pb-[80px] px-lg md:px-xl mx-auto w-full flex-1 ${fullWidth ? 'max-w-[1280px]' : 'max-w-[800px]'}`}>
        <h1 className="font-display text-[40px] md:text-[56px] tracking-tight text-primary leading-[1.1] mb-md">{title}</h1>
        {description && <p className="font-sans text-[18px] text-body-muted leading-[1.5] mb-xl">{description}</p>}
        
        <div className="prose prose-slate prose-invert max-w-none">
          {content || (
            <div className="bg-soft-stone rounded-md p-xl border border-hairline flex flex-col items-center justify-center text-center min-h-[300px]">
              <h3 className="font-display text-[24px] text-primary mb-sm">Coming Soon</h3>
              <p className="text-muted text-[16px]">We are working hard to bring you the {title.toLowerCase()} page.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
