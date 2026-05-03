import { DocPageShell } from "@/components/docs/doc-page"
import { Admonition, CodeBlock, H2, P } from "@/components/docs/primitives"
import { getDocBySlug } from "@/lib/docs/registry"

export const metadata = { title: "Risk guard · YieldMind Docs" }

export default function Page() {
  const page = getDocBySlug("risk-guard")!
  return (
    <DocPageShell page={page}>
      <H2 id="score">Risk score</H2>
      <P>
        <code>RiskGuard.getRiskScore()</code> returns a <code>0..100</code> integer that the executor compares
        against the per-strategy ceiling. Above the ceiling, allocations are skipped silently — capital is held in
        the vault rather than deployed.
      </P>
      <CodeBlock
        language="solidity"
        code={`function getRiskScore() external view returns (uint256); // 0..100
function protectionActive() external view returns (bool);
function insuranceReserve() external view returns (uint256);`}
      />

      <H2 id="protection">Protection switch</H2>
      <P>
        When <code>protectionActive()</code> is true, the executor refuses any action that increases exposure to
        non-blue-chip adapters. The dashboard surfaces this as a banner.
      </P>
      <Admonition kind="danger" title="Live state">
        Protection mode is set by governance only. There is no admin override.
      </Admonition>

      <H2 id="reserve">Insurance reserve</H2>
      <P>
        A portion of harvested yield is routed to <code>insuranceReserve()</code>. The reserve is denominated in
        the vault asset and can be drained only by a successful governance proposal.
      </P>
    </DocPageShell>
  )
}
