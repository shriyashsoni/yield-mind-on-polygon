"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Shield, AlertTriangle, CheckCircle2 } from "lucide-react"

export function TermsModal() {
  const [open, setOpen] = useState(false)
  const [accepted, setAccepted] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [agreedToRisks, setAgreedToRisks] = useState(false)

  useEffect(() => {
    const hasAccepted = localStorage.getItem("yieldmind-terms-accepted")
    if (!hasAccepted) {
      setOpen(true)
    } else {
      setAccepted(true)
    }
  }, [])

  const handleAccept = () => {
    if (agreedToTerms && agreedToRisks) {
      localStorage.setItem("yieldmind-terms-accepted", "true")
      localStorage.setItem("yieldmind-terms-date", new Date().toISOString())
      setAccepted(true)
      setOpen(false)
    }
  }

  const canAccept = agreedToTerms && agreedToRisks

  return (
    <>
      <Dialog open={open} onOpenChange={() => {}}>
        <DialogContent className="max-w-lg max-h-[85vh]" onPointerDownOutside={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg">
              <Shield className="w-5 h-5 text-primary" />
              Terms & Risk Disclosure
            </DialogTitle>
            <DialogDescription className="text-xs">Please accept to continue</DialogDescription>
          </DialogHeader>

          <ScrollArea className="h-[280px] pr-4">
            <div className="space-y-4 text-xs">
              <div className="space-y-2">
                <h3 className="font-semibold text-sm flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-500" />
                  Risk Disclosure
                </h3>
                <div className="space-y-1 text-muted-foreground">
                  <p className="font-medium">DeFi involves significant risks:</p>
                  <ul className="list-disc pl-5 space-y-0.5">
                    <li>Smart contract vulnerabilities</li>
                    <li>Potential loss of funds</li>
                    <li>Market volatility</li>
                    <li>AI predictions not guaranteed</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-sm">Key Terms</h3>
                <div className="space-y-1 text-muted-foreground">
                  <p>
                    <strong>No Financial Advice:</strong> YieldMind is a tool, not financial advice.
                  </p>
                  <p>
                    <strong>Your Responsibility:</strong> You control your wallet and accept all risks.
                  </p>
                  <p>
                    <strong>No Guarantees:</strong> Past performance doesn't indicate future results.
                  </p>
                  <p>
                    <strong>Limitation of Liability:</strong> Use at your own risk. We're not liable for losses.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                <p className="text-xs font-medium text-yellow-600 dark:text-yellow-500">
                  <strong>Warning:</strong> Only invest what you can afford to lose. Always DYOR.
                </p>
              </div>
            </div>
          </ScrollArea>

          <DialogFooter className="flex-col gap-3">
            <div className="space-y-2 w-full">
              <div className="flex items-start gap-2">
                <Checkbox
                  id="terms"
                  checked={agreedToTerms}
                  onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                  className="mt-0.5"
                />
                <label htmlFor="terms" className="text-xs leading-relaxed cursor-pointer">
                  I agree to the Terms of Service
                </label>
              </div>
              <div className="flex items-start gap-2">
                <Checkbox
                  id="risks"
                  checked={agreedToRisks}
                  onCheckedChange={(checked) => setAgreedToRisks(checked as boolean)}
                  className="mt-0.5"
                />
                <label htmlFor="risks" className="text-xs leading-relaxed cursor-pointer">
                  I acknowledge the risks and potential loss of funds
                </label>
              </div>
            </div>
            <Button onClick={handleAccept} disabled={!canAccept} className="w-full">
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Accept & Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {!accepted && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 flex items-center justify-center">
          <div className="text-center space-y-4 p-8">
            <Shield className="w-16 h-16 text-primary mx-auto animate-pulse" />
            <h2 className="text-2xl font-bold">Welcome to YieldMind</h2>
            <p className="text-muted-foreground">Please accept the terms to continue</p>
          </div>
        </div>
      )}
    </>
  )
}
