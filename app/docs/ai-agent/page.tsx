import { DocPageShell } from "@/components/docs/doc-page"
import { Admonition, CodeBlock, H2, P } from "@/components/docs/primitives"
import { getDocBySlug } from "@/lib/docs/registry"

export const metadata = { title: "The AI agent · YieldMind Docs" }

export default function Page() {
  const page = getDocBySlug("ai-agent")!
  return (
    <DocPageShell page={page}>
      <H2 id="loop">Reasoning loop</H2>
      <P>
        The agent runs server-side on each dashboard load. It reads the live snapshot via{" "}
        <code>readProtocolSnapshot()</code>, feeds it to Groq&apos;s Llama 3.3 70B model with a structured Zod
        schema, and returns a typed insight. There is no hidden state — the LLM only sees on-chain numbers.
      </P>
      <CodeBlock
        language="ts"
        code={`// app/api/ai/insights/route.ts
const snapshot = await readProtocolSnapshot()
const { object } = await generateObject({
  model: groq("llama-3.3-70b-versatile"),
  schema: InsightSchema,
  system: "You are YieldMind's autonomous AI yield agent...",
  prompt: \`Live snapshot at block \${snapshot.network.blockNumber}...\`,
})
return Response.json({ insight: object, snapshot })`}
      />

      <H2 id="schema">Output schema</H2>
      <CodeBlock
        language="ts"
        code={`const InsightSchema = z.object({
  headline:       z.string(),
  riskBand:       z.enum(["low","medium","high"]),
  confidence:     z.number().min(0).max(1),
  recommendation: z.enum(["hold","rebalance","reduce","expand"]),
  allocation: z.array(z.object({
    protocol: z.string(),
    weight:   z.number().min(0).max(1),
  })),
  signals: z.array(z.object({
    label:    z.string(),
    severity: z.enum(["info","warn","alert"]),
    detail:   z.string(),
  })),
})`}
      />

      <H2 id="streaming">Streaming reasoning</H2>
      <P>
        The dashboard&apos;s <em>rebalance</em> panel uses <code>POST /api/ai/rebalance</code>. The endpoint
        streams chain-of-thought text via <code>streamText()</code> so the UI can render reasoning token-by-token.
      </P>
      <Admonition kind="tip" title="Bring your own key">
        Set <code>GROQ_API_KEY</code> in your environment to enable inference. Without a key the routes return a
        deterministic fallback so the dashboard never breaks.
      </Admonition>
    </DocPageShell>
  )
}
