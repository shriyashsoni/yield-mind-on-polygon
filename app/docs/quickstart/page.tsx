import { DocPageShell } from "@/components/docs/doc-page"
import { Admonition, CodeBlock, H2, Mono, Ol, P, Ul } from "@/components/docs/primitives"
import { getDocBySlug } from "@/lib/docs/registry"

export const metadata = { title: "Quickstart · YieldMind Docs" }

export default function Page() {
  const page = getDocBySlug("quickstart")!
  return (
    <DocPageShell page={page}>
      <H2 id="prerequisites">Prerequisites</H2>
      <Ul>
        <li>An EVM wallet (MetaMask, Rabby) with a Polygon Amoy account.</li>
        <li>
          A small amount of testnet MATIC for gas — grab some from the{" "}
          <a
            href="https://faucet.polygon.technology/"
            target="_blank"
            rel="noreferrer"
            className="text-white underline-offset-4 hover:underline"
          >
            Polygon faucet
          </a>
          .
        </li>
        <li>The dashboard accepts the asset configured by the deployed vault. See the connect screen for the live symbol.</li>
      </Ul>

      <H2 id="connect-wallet">Connect wallet</H2>
      <P>
        Open the dashboard and click <Mono>Connect wallet</Mono>. The app will request a chain switch to Amoy if
        your wallet is on another network. State is read live — you do not need to sign anything to read protocol
        data.
      </P>

      <H2 id="deposit">Deposit</H2>
      <Ol>
        <li>Approve the vault to spend your asset (one-time per token).</li>
        <li>
          Call <Mono>deposit(assets, receiver)</Mono> on the vault — the contract mints ymMATIC shares 1:1 with your
          contribution adjusted by the current share price.
        </li>
        <li>
          The autonomous executor picks up the new TVL on its next tick. The AI agent re-evaluates allocation and
          may submit a rebalance.
        </li>
      </Ol>

      <CodeBlock
        language="ts"
        code={`import { ethers } from "ethers"
import { CONTRACT_ADDRESSES, YIELD_VAULT_V4_ABI, ERC20_ABI } from "@/lib/contract-abis"

const provider = new ethers.BrowserProvider(window.ethereum)
const signer = await provider.getSigner()

const vault  = new ethers.Contract(CONTRACT_ADDRESSES.AMOY.YieldVaultV4, YIELD_VAULT_V4_ABI, signer)
const asset  = new ethers.Contract(await vault.asset(), ERC20_ABI, signer)
const amount = ethers.parseUnits("100", await asset.decimals())

await (await asset.approve(vault.target, amount)).wait()
await (await vault.deposit(amount, await signer.getAddress())).wait()`}
      />

      <Admonition kind="warning" title="Testnet only">
        The current deployment is on Amoy. Do not bridge mainnet funds to test deposits.
      </Admonition>

      <H2 id="next-steps">Next steps</H2>
      <Ul>
        <li>Watch the AI insight panel update on each block.</li>
        <li>Read the streaming rebalance reasoning to understand why the agent acted.</li>
        <li>Vote on an open governance proposal — your weight equals your staked MATIC.</li>
      </Ul>
    </DocPageShell>
  )
}
