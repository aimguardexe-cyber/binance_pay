import React from 'react';
import InfoPage from './InfoPage';

export default function TermsOfService() {
  const content = (
    <div className="text-[16px] text-body-muted leading-[1.6] space-y-6">
      <p>Last updated: September 2026</p>
      
      <h2 className="text-[24px] font-display text-ink mt-8 mb-4">1. Agreement to Terms</h2>
      <p>
        These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and Binance Pay Gateway ("we," "us" or "our"), concerning your access to and use of our enterprise cryptocurrency payment infrastructure.
      </p>

      <h2 className="text-[24px] font-display text-ink mt-8 mb-4">2. Services and SLA</h2>
      <p>
        We provide high-throughput API endpoints and SDKs to facilitate cryptocurrency payments and settlements. While we strive for 99.999% uptime, services are provided "as is" and "as available". Settlement times may vary depending on underlying blockchain network congestion.
      </p>

      <h2 className="text-[24px] font-display text-ink mt-8 mb-4">3. Prohibited Activities</h2>
      <p>
        You may not access or use the Services for any purpose other than that for which we make the Services available. As a user of the Services, you agree not to:
      </p>
      <ul className="list-disc pl-6 space-y-2 mt-2">
        <li>Systematically retrieve data or other content to create or compile a collection, compilation, database, or directory without written permission from us.</li>
        <li>Circumvent, disable, or otherwise interfere with security-related features of the Services.</li>
        <li>Use the Services to facilitate illegal transactions, including but not limited to money laundering, terrorist financing, or purchasing illicit goods.</li>
        <li>Interfere with, disrupt, or create an undue burden on the Services or the networks connected to the Services.</li>
      </ul>

      <h2 className="text-[24px] font-display text-ink mt-8 mb-4">4. Compliance and KYC</h2>
      <p>
        Enterprise clients must complete mandatory Know Your Business (KYB) and Know Your Customer (KYC) onboarding. We reserve the right to suspend API access if compliance standards are not continuously met.
      </p>

      <h2 className="text-[24px] font-display text-ink mt-8 mb-4">5. Limitation of Liability</h2>
      <p>
        In no event will we or our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, or loss of data arising from your use of the Services.
      </p>
    </div>
  );

  return (
    <InfoPage 
      title="Terms of Service" 
      description="The rules and guidelines for using Binance Pay Gateway." 
      content={content} 
    />
  );
}
