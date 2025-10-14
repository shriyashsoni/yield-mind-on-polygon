"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { DEMO_PERFORMANCE_DATA } from "@/lib/demo-data"

export function PerformanceMetrics() {
  const performanceData = DEMO_PERFORMANCE_DATA

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Analytics</CardTitle>
        <CardDescription>Track your portfolio growth and metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="portfolio" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="portfolio">Portfolio Value</TabsTrigger>
            <TabsTrigger value="apy">APY Trend</TabsTrigger>
            <TabsTrigger value="gas">Gas Costs</TabsTrigger>
          </TabsList>

          <TabsContent value="portfolio" className="h-[300px] mt-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ffffff" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#ffffff" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff" strokeOpacity={0.1} />
                <XAxis dataKey="date" stroke="#ffffff" fontSize={12} />
                <YAxis stroke="#ffffff" fontSize={12} tickFormatter={(value) => `$${(value / 1000).toFixed(1)}k`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#000000",
                    border: "1px solid #ffffff",
                    borderRadius: "8px",
                    color: "#ffffff",
                  }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, "Value"]}
                />
                <Area type="monotone" dataKey="value" stroke="#ffffff" strokeWidth={2} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="apy" className="h-[300px] mt-6">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff" strokeOpacity={0.1} />
                <XAxis dataKey="date" stroke="#ffffff" fontSize={12} />
                <YAxis stroke="#ffffff" fontSize={12} tickFormatter={(value) => `${value}%`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#000000",
                    border: "1px solid #ffffff",
                    borderRadius: "8px",
                    color: "#ffffff",
                  }}
                  formatter={(value: number) => [`${value}%`, "APY"]}
                />
                <Line
                  type="monotone"
                  dataKey="apy"
                  stroke="#ffffff"
                  strokeWidth={3}
                  dot={{ fill: "#000000", stroke: "#ffffff", strokeWidth: 2, r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="gas" className="h-[300px] mt-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="colorGas" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ffffff" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#ffffff" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff" strokeOpacity={0.1} />
                <XAxis dataKey="date" stroke="#ffffff" fontSize={12} />
                <YAxis stroke="#ffffff" fontSize={12} tickFormatter={(value) => `$${value}`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#000000",
                    border: "1px solid #ffffff",
                    borderRadius: "8px",
                    color: "#ffffff",
                  }}
                  formatter={(value: number) => [`$${value}`, "Gas Cost"]}
                />
                <Area type="monotone" dataKey="gas" stroke="#ffffff" strokeWidth={2} fill="url(#colorGas)" />
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
