import React, { useState } from 'react';
import InfoPage from './InfoPage';
import { Terminal, Code, Zap } from 'lucide-react';

export default function Documentation() {
  const [activeTab, setActiveTab] = useState('node');

  const content = (
    <div className="text-[16px] text-body-muted leading-[1.6] space-y-12">
      
      {/* Introduction */}
      <div>
        <p className="text-[18px] max-w-3xl">
          Welcome to the Binance Pay Gateway developer documentation. Our API is designed to be as simple as possible. You only need one API call to generate a hosted checkout page, and we handle the rest—from displaying the QR code to verifying the on-chain transaction.
        </p>
      </div>

      {/* Grid Features */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-canvas border border-border-light rounded-md p-6">
          <Terminal className="text-primary mb-4" size={24} />
          <h3 className="text-[20px] font-display text-ink mb-2">REST API</h3>
          <p className="text-[14px]">Simple, predictable, resource-oriented URLs and standard HTTP response codes.</p>
        </div>
        <div className="bg-canvas border border-border-light rounded-md p-6">
          <Code className="text-primary mb-4" size={24} />
          <h3 className="text-[20px] font-display text-ink mb-2">Hosted Checkout</h3>
          <p className="text-[14px]">We host the checkout page so you don't have to build any complex UI.</p>
        </div>
        <div className="bg-canvas border border-border-light rounded-md p-6">
          <Zap className="text-primary mb-4" size={24} />
          <h3 className="text-[20px] font-display text-ink mb-2">Auto Verification</h3>
          <p className="text-[14px]">We poll the blockchain automatically and redirect the user upon success.</p>
        </div>
      </div>

      <hr className="border-hairline" />

      {/* Integration Guide */}
      <div>
        <h2 className="text-[32px] font-display text-ink mb-6">Integration Guide</h2>
        <p className="mb-6 max-w-3xl">
          Integrating Binance Pay Gateway requires only two steps: creating the order from your backend and handling the redirect when the user successfully pays.
        </p>

        <div className="space-y-12">
          {/* Step 1 */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-8 rounded-full bg-primary text-on-dark flex items-center justify-center font-bold">1</div>
              <h3 className="text-[24px] font-display text-ink m-0">Create an Order</h3>
            </div>
            <p className="mb-4 max-w-3xl">
              When your customer is ready to checkout, make a <code>POST</code> request from your backend to our <code>/api/create-order</code> endpoint. You must include your API Key in the headers.
            </p>
            
            <div className="bg-cohere-black rounded-md overflow-hidden border border-border-light/20 shadow-xl max-w-4xl">
              <div className="flex bg-on-dark/5 border-b border-on-dark/10">
                <button onClick={() => setActiveTab('node')} className={`px-4 py-2 text-[13px] font-mono ${activeTab === 'node' ? 'text-action-blue border-b-2 border-action-blue' : 'text-on-dark/60'}`}>Node.js (Fetch)</button>
                <button onClick={() => setActiveTab('python')} className={`px-4 py-2 text-[13px] font-mono ${activeTab === 'python' ? 'text-action-blue border-b-2 border-action-blue' : 'text-on-dark/60'}`}>Python (Requests)</button>
                <button onClick={() => setActiveTab('curl')} className={`px-4 py-2 text-[13px] font-mono ${activeTab === 'curl' ? 'text-action-blue border-b-2 border-action-blue' : 'text-on-dark/60'}`}>cURL</button>
              </div>
              <div className="p-4 overflow-x-auto text-[13px] font-mono text-on-dark/90">
                {activeTab === 'node' && (
<pre><code><span className="text-coral">const</span> response = <span className="text-action-blue">await</span> fetch(<span className="text-pale-green">'https://api.binancepay.com/api/create-order'</span>, {`{`}{'\n'}
  method: <span className="text-pale-green">'POST'</span>,{'\n'}
  headers: {`{`}{'\n'}
    <span className="text-pale-green">'Content-Type'</span>: <span className="text-pale-green">'application/json'</span>,{'\n'}
    <span className="text-pale-green">'x-api-key'</span>: <span className="text-pale-green">'YOUR_GATEWAY_API_KEY'</span>{'\n'}
  {`}`},{'\n'}
  body: JSON.<span className="text-coral">stringify</span>({`{`}{'\n'}
    amount: <span className="text-pale-green">"150.00"</span>,{'\n'}
    redirectUrl: <span className="text-pale-green">"https://your-website.com/success"</span>{'\n'}
  {`}`}){'\n'}
{`}`});{'\n'}
{'\n'}
<span className="text-coral">const</span> data = <span className="text-action-blue">await</span> response.json();{'\n'}
{'\n'}
<span className="text-muted">// Redirect your user to the generated checkout page</span>{'\n'}
res.redirect(data.checkoutUrl);</code></pre>
                )}
                {activeTab === 'python' && (
<pre><code><span className="text-coral">import</span> requests{'\n'}
{'\n'}
url = <span className="text-pale-green">"https://api.binancepay.com/api/create-order"</span>{'\n'}
headers = {`{`}{'\n'}
    <span className="text-pale-green">"Content-Type"</span>: <span className="text-pale-green">"application/json"</span>,{'\n'}
    <span className="text-pale-green">"x-api-key"</span>: <span className="text-pale-green">"YOUR_GATEWAY_API_KEY"</span>{'\n'}
{`}`}{'\n'}
payload = {`{`}{'\n'}
    <span className="text-pale-green">"amount"</span>: <span className="text-pale-green">"150.00"</span>,{'\n'}
    <span className="text-pale-green">"redirectUrl"</span>: <span className="text-pale-green">"https://your-website.com/success"</span>{'\n'}
{`}`}{'\n'}
{'\n'}
response = requests.post(url, json=payload, headers=headers){'\n'}
data = response.json(){'\n'}
{'\n'}
<span className="text-muted"># Redirect your user to the generated checkout page</span>{'\n'}
<span className="text-action-blue">return</span> redirect(data[<span className="text-pale-green">'checkoutUrl'</span>])</code></pre>
                )}
                {activeTab === 'curl' && (
<pre><code>curl -X POST https://api.binancepay.com/api/create-order \{'\n'}
  -H <span className="text-pale-green">"Content-Type: application/json"</span> \{'\n'}
  -H <span className="text-pale-green">"x-api-key: YOUR_GATEWAY_API_KEY"</span> \{'\n'}
  -d {`'{`}{'\n'}
    "amount": "150.00",{'\n'}
    "redirectUrl": "https://your-website.com/success"{'\n'}
  {`}'`}</code></pre>
                )}
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-8 rounded-full bg-primary text-on-dark flex items-center justify-center font-bold">2</div>
              <h3 className="text-[24px] font-display text-ink m-0">Handle the Redirect</h3>
            </div>
            <p className="mb-4 max-w-3xl">
              After redirecting your user to <code>checkoutUrl</code>, they will see a payment QR code. Our frontend will continuously poll the blockchain to detect when they have transferred the funds. 
            </p>
            <p className="mb-4 max-w-3xl">
              Once the transaction is successfully verified on-chain, we will automatically redirect the user back to the <code>redirectUrl</code> you provided in Step 1. You can now display a success message and fulfill their order!
            </p>
          </div>

        </div>
      </div>
    </div>
  );

  return (
    <InfoPage 
      title="Integration Documentation" 
      description="Learn how to integrate Binance Pay Gateway into your platform step by step." 
      content={content} 
      fullWidth={true}
    />
  );
}
