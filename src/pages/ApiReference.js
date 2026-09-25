import React from 'react';
import InfoPage from './InfoPage';

export default function ApiReference() {
  const content = (
    <div className="text-[16px] text-body-muted leading-[1.6] space-y-6">
      <p>
        The Binance Pay Gateway API is organized around REST. Our API has predictable resource-oriented URLs, accepts JSON-encoded request bodies, returns JSON-encoded responses, and uses standard HTTP response codes.
      </p>

      <h2 className="text-[24px] font-display text-ink mt-8 mb-4">Authentication</h2>
      <p>
        Authenticate your API requests by including your secret API key in the request header. You can find your API key in the Merchant Dashboard.
      </p>
      <pre className="bg-cohere-black text-on-dark p-4 rounded-md font-mono text-[14px] mt-2 overflow-x-auto">
        x-api-key: YOUR_GATEWAY_API_KEY
      </pre>

      <h2 className="text-[24px] font-display text-ink mt-8 mb-4">Endpoints</h2>
      
      <div className="border border-border-light rounded-md overflow-hidden">
        <div className="bg-canvas border-b border-border-light p-4 font-mono text-[14px]">
          <span className="text-pale-green font-bold mr-4">POST</span> /api/create-order
        </div>
        <div className="p-4 bg-soft-stone">
          <p className="mb-2 text-[14px]">Creates a new payment order and returns a hosted checkout URL.</p>
          <p className="text-[14px] font-medium text-ink mt-4">Headers:</p>
          <ul className="list-disc pl-6 space-y-1 mt-1 text-[14px]">
            <li><code>x-api-key</code> (required) - Your merchant API key.</li>
          </ul>
          <p className="text-[14px] font-medium text-ink mt-4">Body Parameters:</p>
          <ul className="list-disc pl-6 space-y-1 mt-1 text-[14px]">
            <li><code>amount</code> (required, string or number) - The amount to collect. Must be a positive number.</li>
            <li><code>redirectUrl</code> (optional, string) - The URL to redirect the user to after a successful payment.</li>
          </ul>
          <p className="text-[14px] font-medium text-ink mt-4">Response:</p>
          <pre className="bg-cohere-black text-on-dark p-4 rounded-md font-mono text-[13px] mt-2">
{`{
  "orderId": "ORD-A1B2C3D4",
  "checkoutUrl": "https://gateway.com/checkout/ORD-A1B2C3D4",
  "amount": "150.00",
  "note": "PAY-E5F6G7"
}`}
          </pre>
        </div>
      </div>

      <div className="border border-border-light rounded-md overflow-hidden mt-6">
        <div className="bg-canvas border-b border-border-light p-4 font-mono text-[14px]">
          <span className="text-action-blue font-bold mr-4">GET</span> /api/verify/:orderId
        </div>
        <div className="p-4 bg-soft-stone">
          <p className="mb-2 text-[14px]">Verifies the on-chain payment status of an order. This endpoint is public and does not require an API key.</p>
          <p className="text-[14px] font-medium text-ink mt-4">Path Parameters:</p>
          <ul className="list-disc pl-6 space-y-1 mt-1 text-[14px]">
            <li><code>orderId</code> (required) - The ID of the order to verify.</li>
          </ul>
          <p className="text-[14px] font-medium text-ink mt-4">Response (Pending):</p>
          <pre className="bg-cohere-black text-on-dark p-4 rounded-md font-mono text-[13px] mt-2">
{`{
  "status": "PENDING"
}`}
          </pre>
          <p className="text-[14px] font-medium text-ink mt-4">Response (Paid):</p>
          <pre className="bg-cohere-black text-on-dark p-4 rounded-md font-mono text-[13px] mt-2">
{`{
  "status": "PAID",
  "redirectUrl": "https://your-website.com/success"
}`}
          </pre>
        </div>
      </div>

    </div>
  );

  return (
    <InfoPage 
      title="API Reference" 
      description="Detailed specifications for the Binance Pay REST API." 
      content={content} 
      fullWidth={true}
    />
  );
}
