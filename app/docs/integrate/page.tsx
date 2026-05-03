import { DocPageShell } from "@/components/docs/doc-page"
import { Admonition, CodeBlock, H2, P } from "@/components/docs/primitives"
import { getDocBySlug } from "@/lib/docs/registry"

export const metadata = { title: "Integrate · YieldMind Docs" }

export default function Page() {
  const page = getDocBySlug("integrate")!
  return (
    <DocPageShell page={page}>
      <H2 id="read-via-rest">Read via REST</H2>
      <P>
        The simplest way to read protocol state from another app is the JSON snapshot endpoint. It&apos;s
        edge-cached, CORS-open and contains every number the dashboard renders.
      </P>
      <CodeBlock
        language="ts"
        code={`const r = await fetch("https://your-app.vercel.app/api/onchain/snapshot")
const snapshot = await r.json()`}
      />

      <H2 id="read-via-ethers">Read via ethers</H2>
      <P>
        For tighter integrations point ethers at the deployed addresses with the ABIs in{" "}
        <code>lib/contract-abis.ts</code>.
      </P>
      <CodeBlock
        language="ts"
        code={`import { ethers } from "ethers"
import { CONTRACT_ADDRESSES, YIELD_VAULT_V4_ABI } from "@/lib/contract-abis"

const provider = new ethers.JsonRpcProvider("https://rpc-amoy.polygon.technology")
const vault = new ethers.Contract(
  CONTRACT_ADDRESSES.AMOY.YieldVaultV4,
  YIELD_VAULT_V4_ABI,
  provider,
)
const tvl    = await vault.totalAssets()
const apyBps = await vault.yieldRate()`}
      />

      <H2 id="submitting-tx">Submitting transactions</H2>
      <P>
        Use a browser provider for user-signed transactions. The vault and governance contracts use plain ABI
        calls — no extra meta-tx wrapping needed.
      </P>
      <CodeBlock
        language="ts"
        code={`const provider = new ethers.BrowserProvider(window.ethereum)
const signer   = await provider.getSigner()
const vault    = new ethers.Contract(VAULT_ADDRESS, YIELD_VAULT_V4_ABI, signer)
await (await vault.deposit(amount, await signer.getAddress())).wait()`}
      />

      <Admonition kind="tip" title="Need help?">
        Open an issue on the GitHub repo or ask the AI agent directly via the dashboard&apos;s live rebalance
        stream.
      </Admonition>
    </DocPageShell>
  )
}
