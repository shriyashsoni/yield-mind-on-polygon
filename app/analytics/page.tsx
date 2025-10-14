"use client"

import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Line, LineChart, Bar, BarChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { TrendingUp, DollarSign, Activity, Zap } from "lucide-react"

const performanceData = [
  { date: "Jan", value: 100000, apy: 12.5 },
  { date: "Feb", value: 112000, apy: 13.2 },
  { date: "Mar", value: 125000, apy: 14.8 },
  { date: "Apr", value: 138000, apy: 15.5 },
  { date: "May", value: 152000, apy: 16.2 },
  { date: "Jun", value: 168000, apy: 17.1 },
]

const gasData = [
  { month: "Jan", cost: 45 },
  { month: "Feb", cost: 52 },
  { month: "Mar", cost: 38 },
  { month: "Apr", cost: 41 },
  { month: "May", cost: 35 },
  { month: "Jun", cost: 29 },
]

const stats = [
  { label: "Total Value", value: "$168,000", change: "+68%", icon: DollarSign, color: "text-green-500" },
  { label: "Average APY", value: "15.2%", change: "+2.7%", icon: TrendingUp, color: "text-blue-500" },
  { label: "Rebalances", value: "24", change: "This month", icon: Activity, color: "text-purple-500" },
  { label: "Gas Saved", value: "$142", change: "vs Manual", icon: Zap, color: "text-orange-500" },
]

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-balance">Analytics Dashboard</h1>
          <p className="text-muted-foreground text-lg">Comprehensive performance metrics and insights</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.label}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <Tabs defaultValue="performance" className="space-y-6">
          <TabsList>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="gas">Gas Optimization</TabsTrigger>
          </TabsList>

          <TabsContent value="performance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Value Over Time</CardTitle>
                <CardDescription>6-month performance history</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    value: {
                      label: "Portfolio Value",
                      color: "#ffffff",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff" strokeOpacity={0.1} />
                      <XAxis dataKey="date" stroke="#ffffff" />
                      <YAxis stroke="#ffffff" />
                      <ChartTooltip
                        content={<ChartTooltipContent />}
                        contentStyle={{
                          backgroundColor: "#000000",
                          border: "1px solid #ffffff",
                          color: "#ffffff",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#ffffff"
                        strokeWidth={3}
                        dot={{ fill: "#000000", stroke: "#ffffff", strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>APY Trends</CardTitle>
                <CardDescription>Average yield percentage over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    apy: {
                      label: "APY %",
                      color: "#ffffff",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff" strokeOpacity={0.1} />
                      <XAxis dataKey="date" stroke="#ffffff" />
                      <YAxis stroke="#ffffff" />
                      <ChartTooltip
                        content={<ChartTooltipContent />}
                        contentStyle={{
                          backgroundColor: "#000000",
                          border: "1px solid #ffffff",
                          color: "#ffffff",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="apy"
                        stroke="#ffffff"
                        strokeWidth={3}
                        dot={{ fill: "#000000", stroke: "#ffffff", strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="gas">
            <Card>
              <CardHeader>
                <CardTitle>Gas Cost Analysis</CardTitle>
                <CardDescription>Monthly gas fees for automated rebalancing</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    cost: {
                      label: "Gas Cost (USD)",
                      color: "#ffffff",
                    },
                  }}
                  className="h-[400px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={gasData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff" strokeOpacity={0.1} />
                      <XAxis dataKey="month" stroke="#ffffff" />
                      <YAxis stroke="#ffffff" />
                      <ChartTooltip
                        content={<ChartTooltipContent />}
                        contentStyle={{
                          backgroundColor: "#000000",
                          border: "1px solid #ffffff",
                          color: "#ffffff",
                        }}
                      />
                      <Bar dataKey="cost" fill="#ffffff" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
