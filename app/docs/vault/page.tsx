import { DocPageShell } from "@/components/docs/doc-page"
import { CodeBlock, H2, Mono, P, Ul } from "@/components/docs/primitives"
import { getDocBySlug } from "@/lib/docs/registry"

export const metadata = { title: "Vault & shares · YieldMind Docs" }

export default function Page() {
  const page = getDocBySlug("vault")!
  return (
    <DocPageShell page={page}>
      <H2 id="interface">Interface</H2>
      <P>
        <Mono>YieldVaultV4</Mono> issues YLD shares against deposits, tracks <Mono>totalAssets()</Mono> and a
        public <Mono>yieldRate()</Mono> in basis points. Conversions are deterministic and on-chain.
      </P>
      <CodeBlock
        language="solidity"
        code={`function deposit(uint256 assets, address receiver) external returns (uint256 shares);
function withdraw(uint256 shares, address receiver) external returns (uint256 assets);
function totalAssets() external view returns (uint256);
function yieldRate()  external view returns (uint256); // basis points
function asset() external view returns (address);`}
      />

      <H2 id="share-math">Share math</H2>
      <P>
        Shares are minted in proportion to your deposit relative to the live <Mono>totalAssets()</Mono> and
        <Mono> totalSupply()</Mono>. The first depositor receives <Mono>1:1</Mono> shares; later depositors get
        <Mono> assets * supply / totalAssets</Mono>.
      </P>
      <CodeBlock
        language="ts"
        code={`const sharesOut =
  totalSupply === 0n
    ? assetsIn
    : (assetsIn * totalSupply) / totalAssets`}
      />

      <H2 id="events">Events</H2>
      <Ul>
        <li>
          <Mono>Deposit(caller, owner, assets, shares)</Mono>
        </li>
        <li>
          <Mono>Withdraw(caller, receiver, owner, assets, shares)</Mono>
        </li>
        <li>
          <Mono>Rebalanced(strategyHash, blockNumber)</Mono>
        </li>
      </Ul>
    </DocPageShell>
  )
}
