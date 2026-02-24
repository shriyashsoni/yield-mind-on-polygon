'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import {
  AlertCircle,
  CheckCircle2,
  Lock,
  TrendingUp,
  Shield,
  ArrowRight,
  Loader2,
} from 'lucide-react';

export function PortfolioMandatePanel() {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [mandate, setMandate] = useState({
    maxRisk: 35,
    targetAPY: [8, 12],
    maxChainExposure: 40,
    volatilityCap: 18,
    stablecoinOnly: false,
  });

  const handleSave = async () => {
    setIsSaving(true);
    console.log('[v0] Saving portfolio mandate to smart contract:', mandate);
    
    try {
      // This will connect to PortfolioMandate smart contract
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log('[v0] Mandate saved successfully');
      setIsEditing(false);
    } catch (error) {
      console.error('[v0] Error saving mandate:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card className="border-2 border-blue-500/30 bg-gradient-to-br from-blue-500/5 to-background">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-blue-500" />
              Portfolio Mandate
            </CardTitle>
            <CardDescription>Institutional-grade constraints and objectives</CardDescription>
          </div>
          <Badge className="bg-blue-500/20 text-blue-700">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Active
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Display Mode */}
        {!isEditing && (
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg bg-muted/50">
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm">Max Risk Level</Label>
                <span className="text-2xl font-bold text-blue-600">{mandate.maxRisk}</span>
              </div>
              <div className="w-full h-2 bg-gradient-to-r from-green-500 to-red-500 rounded-full">
                <div
                  className="h-full bg-blue-600 rounded-full"
                  style={{ width: `${(mandate.maxRisk / 100) * 100}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">Out of 100 (lower = conservative)</p>
            </div>

            <div className="p-4 border rounded-lg bg-muted/50">
              <Label className="text-sm mb-2 block">Target APY Range</Label>
              <div className="flex items-center gap-2 text-lg font-bold">
                <span className="text-green-600">{mandate.targetAPY[0]}%</span>
                <ArrowRight className="w-4 h-4" />
                <span className="text-green-600">{mandate.targetAPY[1]}%</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Optimal yield target</p>
            </div>

            <div className="p-4 border rounded-lg bg-muted/50">
              <Label className="text-sm mb-2 block">Max Chain Exposure</Label>
              <div className="text-2xl font-bold text-amber-600">{mandate.maxChainExposure}%</div>
              <p className="text-xs text-muted-foreground mt-2">Per blockchain limit</p>
            </div>

            <div className="p-4 border rounded-lg bg-muted/50">
              <Label className="text-sm mb-2 block">Volatility Cap</Label>
              <div className="text-2xl font-bold text-purple-600">{mandate.volatilityCap}%</div>
              <p className="text-xs text-muted-foreground mt-2">Maximum acceptable volatility</p>
            </div>
          </div>
        )}

        {/* Edit Mode */}
        {isEditing && (
          <div className="space-y-6">
            <div>
              <Label>Max Risk Level: {mandate.maxRisk}/100</Label>
              <Slider
                value={[mandate.maxRisk]}
                onValueChange={([val]) => setMandate({ ...mandate, maxRisk: val })}
                min={0}
                max={100}
                step={1}
                className="mt-2"
              />
            </div>

            <div>
              <Label>Target APY Range (Min)</Label>
              <Input
                type="number"
                value={mandate.targetAPY[0]}
                onChange={(e) =>
                  setMandate({
                    ...mandate,
                    targetAPY: [Number(e.target.value), mandate.targetAPY[1]],
                  })
                }
              />
            </div>

            <div>
              <Label>Target APY Range (Max)</Label>
              <Input
                type="number"
                value={mandate.targetAPY[1]}
                onChange={(e) =>
                  setMandate({
                    ...mandate,
                    targetAPY: [mandate.targetAPY[0], Number(e.target.value)],
                  })
                }
              />
            </div>

            <div>
              <Label>Max Chain Exposure: {mandate.maxChainExposure}%</Label>
              <Slider
                value={[mandate.maxChainExposure]}
                onValueChange={([val]) => setMandate({ ...mandate, maxChainExposure: val })}
                min={0}
                max={100}
                step={5}
                className="mt-2"
              />
            </div>

            <div>
              <Label>Volatility Cap: {mandate.volatilityCap}%</Label>
              <Slider
                value={[mandate.volatilityCap]}
                onValueChange={([val]) => setMandate({ ...mandate, volatilityCap: val })}
                min={5}
                max={50}
                step={1}
                className="mt-2"
              />
            </div>
          </div>
        )}

        <div className="flex gap-2">
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)} variant="outline" className="w-full">
              Edit Mandate
            </Button>
          ) : (
            <>
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Save to Contract
                  </>
                )}
              </Button>
              <Button onClick={() => setIsEditing(false)} variant="outline" className="flex-1">
                Cancel
              </Button>
            </>
          )}
        </div>

        <div className="p-3 border border-blue-500/30 rounded-lg bg-blue-500/5 flex gap-2">
          <AlertCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground">
            Portfolio mandate is enforced by the PortfolioMandate smart contract. Changes are immutable and auditable.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
