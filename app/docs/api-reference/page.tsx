import { DocPageShell } from "@/components/docs/doc-page"
import { CodeBlock, H2, P } from "@/components/docs/primitives"
import { getDocBySlug } from "@/lib/docs/registry"

export const metadata = { title: "REST API · YieldMind Docs" }

export default function Page() {
  const page = getDocBySlug("api-reference")!
  return (
    <DocPageShell page={page}>
      <P>
        The dashboard is built on a small set of public endpoints. They are server-rendered, edge-cached for ~5
        seconds and require no authentication.
      </P>

      <H2 id="snapshot">GET /api/onchain/snapshot</H2>
      <P>
        Unified protocol snapshot — vault, risk, strategies, oracle, governance, events. Optional{" "}
        <code>?account=0x…</code> includes the wallet&apos;s position.
      </P>
      <CodeBlock
        language="bash"
        code={`curl https://your-app.vercel.app/api/onchain/snapshot?account=0xabc...`}
      />
      <CodeBlock
        language="json"
        code={`{
  "network":   { "name": "Polygon Amoy", "blockNumber": 12345678 },
  "vault":     { "address": "0x...", "asset": "0x...", "totalAssets": "...", "yieldRateBps": 0 },
  "risk":      { "score": 18, "protectionActive": false },
  "strategies":[ { "name":"Aave v3","apyBps":520,"weight":0.42 } ],
  "oracle":    { "strategyHash":"0x...","score":74 },
  "governance":{ "proposalCount": 7 },
  "events":    [ { "type":"Deposit","tx":"0x...","at":1730000000 } ]
}`}
      />

      <H2 id="insights">GET /api/ai/insights</H2>
      <P>Structured AI insight (headline, risk band, recommendation, allocation, signals).</P>
      <CodeBlock language="bash" code={`curl https://your-app.vercel.app/api/ai/insights`} />

      <H2 id="rebalance">POST /api/ai/rebalance</H2>
      <P>
        Streaming rebalance reasoning. Body: <code>{`{ account?, question? }`}</code>. Response:{" "}
        <code>text/plain</code> stream.
      </P>
      <CodeBlock
        language="bash"
        code={`curl -N -X POST https://your-app.vercel.app/api/ai/rebalance \\
  -H "content-type: application/json" \\
  -d '{ "question": "Should we increase Aave weight?" }'`}
      />

      <H2 id="governance">GET /api/governance/proposals</H2>
      <P>Indexed proposals from the Governor contract.</P>
      <CodeBlock language="bash" code={`curl https://your-app.vercel.app/api/governance/proposals`} />
    </DocPageShell>
  )
}
