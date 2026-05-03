import { DocPageShell } from "@/components/docs/doc-page"
import { Admonition, H2, P, Ul } from "@/components/docs/primitives"
import { getDocBySlug } from "@/lib/docs/registry"

export const metadata = { title: "Architecture · YieldMind Docs" }

export default function Page() {
  const page = getDocBySlug("architecture")!
  return (
    <DocPageShell page={page}>
      <H2 id="overview">Overview</H2>
      <P>
        Six contracts cooperate to deliver autonomous yield. The vault is the only contract user funds interact
        with — it delegates capital to the strategy manager, which routes to whitelisted protocol adapters under
        the supervision of the risk guard.
      </P>

      <Diagram />

      <H2 id="control-flow">Control flow</H2>
      <Ul>
        <li>
          <strong className="text-white">Deposit</strong> — User → <code>YieldVaultV4.deposit()</code> →
          <code> StrategyManager.allocate()</code> → adapter.
        </li>
        <li>
          <strong className="text-white">Rebalance</strong> —
          <code> AutonomousExecutor.tick()</code> reads the latest <code>AIOracle</code> strategy, validates with
          <code> RiskGuard.getRiskScore()</code>, and only then issues moves.
        </li>
        <li>
          <strong className="text-white">Withdraw</strong> — User → <code>YieldVaultV4.withdraw()</code>; the
          manager unwinds positions in deepest-liquidity order.
        </li>
        <li>
          <strong className="text-white">Govern</strong> — MATIC-stake-weighted votes through OpenZeppelin
          <code> Governor</code>. Pause keys live behind <code>EmergencyControl</code>.
        </li>
      </Ul>

      <H2 id="trust-model">Trust model</H2>
      <P>
        The off-chain AI never holds custody. It can only emit a recommended strategy hash to <code>AIOracle</code>;
        the executor then validates and applies it. If the AI is silent, the protocol simply holds its current
        allocation — funds are never frozen by AI inactivity.
      </P>
      <Admonition kind="note">
        Pauses are time-locked under governance — see <code>EmergencyControl.unpause()</code>.
      </Admonition>
    </DocPageShell>
  )
}

function Diagram() {
  const nodes = [
    { id: "user", label: "User", row: 0, col: 0 },
    { id: "vault", label: "YieldVaultV4", row: 0, col: 1 },
    { id: "manager", label: "StrategyManager", row: 0, col: 2 },
    { id: "executor", label: "AutonomousExecutor", row: 1, col: 2 },
    { id: "oracle", label: "AIOracle", row: 1, col: 1 },
    { id: "risk", label: "RiskGuard", row: 1, col: 0 },
  ]
  return (
    <div className="not-prose my-5 border border-white/10 bg-black/50 p-6">
      <div className="grid grid-cols-3 gap-px bg-white/10">
        {nodes.map((n) => (
          <div key={n.id} className="flex h-20 items-center justify-center bg-black/60">
            <div className="text-center">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">Contract</div>
              <div className="mt-1 text-sm font-semibold text-white">{n.label}</div>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
        Deposits flow user → vault → strategy manager. Oracle + risk guard gate every executor action.
      </p>
    </div>
  )
}
