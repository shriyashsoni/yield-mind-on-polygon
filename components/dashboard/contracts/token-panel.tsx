"use client"

import { useState } from "react"
import useSWR from "swr"
import { ethers } from "ethers"
import { useWeb3 } from "@/lib/web3-context"
import { useContractAction } from "@/hooks/use-contract-action"
import { CONTRACT_ADDRESSES } from "@/lib/contract-abis"
import { YLD_TOKEN_WRITE_ABI } from "@/lib/contract-write-abis"
import { fmtNum } from "../format"
import {
  ContractHeader,
  MetricRow,
  NumberInput,
  PrimaryAction,
  StatusPill,
} from "./contract-header"

const TOKEN = CONTRACT_ADDRESSES.AMOY.YLDToken

export function TokenPanel() {
  const { provider, address, isConnected, connect } = useWeb3()
  const action = useContractAction()
  const [recipient, setRecipient] = useState("")
  const [amount, setAmount] = useState("")

  const { data, mutate } = useSWR(
    provider && address ? ["yld-token-data", address] : null,
    async () => {
      const c = new ethers.Contract(TOKEN, YLD_TOKEN_WRITE_ABI, provider!)
      const [bal, supply, dec, sym] = await Promise.all([
        c.balanceOf(address!).catch(() => 0n),
        // total supply is not in the write abi but is on the read abi; do a raw call
        provider!.call({
          to: TOKEN,
          data: "0x18160ddd", // totalSupply()
        }).then((d) => (d ? BigInt(d) : 0n)).catch(() => 0n),
        c.decimals().catch(() => 18),
        c.symbol().catch(() => "YLD"),
      ])
      return {
        balance: ethers.formatUnits(bal, dec),
        supply: ethers.formatUnits(supply, dec),
        decimals: dec,
        symbol: sym,
      }
    },
    { refreshInterval: 15_000 },
  )

  const decimals = data?.decimals ?? 18
  const symbol = data?.symbol ?? "YLD"
  const balance = Number(data?.balance ?? 0)
  const supply = Number(data?.supply ?? 0)
  const validRecipient = ethers.isAddress(recipient)

  const submit = async () => {
    if (!isConnected) return connect()
    if (!validRecipient || !amount || Number(amount) <= 0) return
    const wei = ethers.parseUnits(amount, decimals)
    const r = await action.run({
      address: TOKEN,
      abi: YLD_TOKEN_WRITE_ABI,
      label: `Transfer ${amount} ${symbol}`,
      runner: async (c) => c.transfer(recipient, wei),
      successMessage: `Sent ${amount} ${symbol}`,
    })
    if (r) {
      setAmount("")
      setRecipient("")
      mutate()
    }
  }

  return (
    <div className="space-y-5">
      <ContractHeader
        name="YLD Token"
        address={TOKEN}
        description="ERC-20 governance token. Voting power, staking, and rewards all settle in YLD."
      />

      <div className="grid grid-cols-2 gap-px bg-white/10 lg:grid-cols-3">
        <MetricRow label="Total supply" value={fmtNum(supply, 0)} sub={symbol} />
        <MetricRow label="Your balance" value={fmtNum(balance, 4)} sub={symbol} />
        <MetricRow
          label="Share of supply"
          value={supply > 0 ? `${((balance / supply) * 100).toFixed(2)}%` : "—"}
          sub="of circulating"
        />
      </div>

      <div className="space-y-4 border border-white/10 bg-black/40 p-5">
        <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">Transfer</div>
        <label className="flex flex-col gap-1.5">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">Recipient</span>
          <input
            value={recipient}
            onChange={(e) => setRecipient(e.target.value.trim())}
            placeholder="0x…"
            className={`border bg-black/40 px-3 py-2.5 font-mono text-xs text-white outline-none ${
              recipient && !validRecipient ? "border-white/40" : "border-white/15 focus:border-white"
            }`}
          />
        </label>
        <NumberInput
          label="Amount"
          value={amount}
          onChange={setAmount}
          suffix={symbol}
          max={balance.toString()}
        />
        <div className="flex flex-wrap items-center gap-3">
          <PrimaryAction
            onClick={submit}
            disabled={
              action.state === "pending" ||
              action.state === "preparing" ||
              !amount ||
              Number(amount) <= 0 ||
              !validRecipient
            }
          >
            {!isConnected ? "Connect Wallet" : "Send YLD"}
          </PrimaryAction>
          <a
            href={`https://amoy.polygonscan.com/token/${TOKEN}`}
            target="_blank"
            rel="noreferrer"
            className="ml-auto font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 hover:text-white"
          >
            Token on Polygonscan ↗
          </a>
        </div>
        <StatusPill state={action.state} hash={action.hash} />
      </div>
    </div>
  )
}
