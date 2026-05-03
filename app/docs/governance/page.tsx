import { DocPageShell } from "@/components/docs/doc-page"
import { CodeBlock, H2, P, Ul } from "@/components/docs/primitives"
import { getDocBySlug } from "@/lib/docs/registry"

export const metadata = { title: "Governance · YieldMind Docs" }

export default function Page() {
  const page = getDocBySlug("governance")!
  return (
    <DocPageShell page={page}>
      <H2 id="lifecycle">Proposal lifecycle</H2>
      <Ul>
        <li>
          <strong className="text-white">Pending</strong> — submitted, voting not yet open.
        </li>
        <li>
          <strong className="text-white">Active</strong> — votes accepted until <code>deadline</code>.
        </li>
        <li>
          <strong className="text-white">Succeeded</strong> — quorum + majority reached.
        </li>
        <li>
          <strong className="text-white">Queued</strong> — sent to the timelock.
        </li>
        <li>
          <strong className="text-white">Executed</strong> — call dispatched on-chain.
        </li>
      </Ul>

      <H2 id="voting">Voting</H2>
      <P>
        Voting weight equals your <code>YLD</code> balance at the proposal&apos;s snapshot block. Cast a vote with
        the standard OZ Governor entrypoint:
      </P>
      <CodeBlock
        language="solidity"
        code={`function castVote(uint256 proposalId, uint8 support) external returns (uint256 weight);
// support: 0 = Against, 1 = For, 2 = Abstain`}
      />
      <CodeBlock
        language="ts"
        code={`const gov = new ethers.Contract(GOVERNANCE_ADDRESS, GOVERNANCE_ABI, signer)
await (await gov.castVote(proposalId, 1)).wait()`}
      />

      <H2 id="proposing">Creating proposals</H2>
      <P>
        Proposals are calldata batches against any whitelisted target (vault config, risk parameters, executor
        ceilings). Use <code>propose()</code> with arrays of <code>targets</code>, <code>values</code>,{" "}
        <code>calldatas</code> and a description string.
      </P>
    </DocPageShell>
  )
}
