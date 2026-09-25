import React from 'react';
import { useParams } from 'react-router-dom';
import InfoPage from './InfoPage';

const articles = {
  "evm-settlement": {
    title: "Optimizing EVM Settlement Finality in Payment Channels",
    date: "Oct 12, 2026",
    content: (
      <div className="text-[16px] text-body-muted leading-[1.6] space-y-6">
        <p>
          Achieving sub-second finality on EVM-compatible chains has historically been a bottleneck for high-throughput payment gateways. By leveraging state channel optimizations and zero-knowledge proofs, our engineering team has reduced settlement times by over 90%.
        </p>
        <h3 className="text-[20px] font-display text-ink mt-8 mb-4">The Challenge with Layer 1 Finality</h3>
        <p>
          Standard L1 block times vary significantly, leading to unpredictable checkout experiences for end-users. We needed a way to provide instant confirmation to merchants while still guaranteeing cryptographic security.
        </p>
        <h3 className="text-[20px] font-display text-ink mt-8 mb-4">Our Approach: Optimistic ZK-Rollups</h3>
        <p>
          By implementing a hybrid approach using optimistic rollups backed by ZK proofs for dispute resolution, we can confirm payments off-chain instantly and batch settle them to the mainnet. This not only improves speed but drastically reduces gas fees for merchants.
        </p>
      </div>
    )
  },
  "webhook-reliability": {
    title: "New Webhook Delivery System: 99.999% Reliability",
    date: "Sep 28, 2026",
    content: (
      <div className="text-[16px] text-body-muted leading-[1.6] space-y-6">
        <p>
          Webhooks are the lifeblood of modern payment integrations. Missing a `payment_intent.succeeded` event means an unfulfilled order and an unhappy customer. Today, we are excited to announce our completely rewritten webhook delivery infrastructure.
        </p>
        <h3 className="text-[20px] font-display text-ink mt-8 mb-4">Distributed Queueing</h3>
        <p>
          We migrated from a centralized queueing system to a globally distributed Kafka-based architecture. This ensures that even in the event of a regional outage, webhook payloads are safely stored and routed through the nearest healthy edge node.
        </p>
        <h3 className="text-[20px] font-display text-ink mt-8 mb-4">Intelligent Retries</h3>
        <p>
          If your server is down or returns a 500 error, our new system implements an exponential backoff strategy, retrying up to 15 times over 3 days. You can also manually replay any failed webhook from your Merchant Dashboard.
        </p>
      </div>
    )
  },
  "cross-chain-liquidity": {
    title: "Cross-chain Liquidity Routing Algorithms",
    date: "Sep 15, 2026",
    content: null
  },
  "mica-compliance": {
    title: "Compliance Engines for EU MiCA Regulations",
    date: "Aug 30, 2026",
    content: null
  }
};

export default function BlogArticle() {
  const { slug } = useParams();
  
  const article = articles[slug];

  if (!article) {
    return <InfoPage title="Article Not Found" description="The publication you are looking for does not exist." />;
  }

  return (
    <InfoPage 
      title={article.title} 
      description={`Published on ${article.date}`} 
      content={article.content} 
    />
  );
}
