import Link from "next/link"
import { ArrowLeft, BarChart3, Download, LineChart, PieChart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ReportsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Savings Reports</h1>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="thisMonth">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="thisWeek">This Week</SelectItem>
              <SelectItem value="thisMonth">This Month</SelectItem>
              <SelectItem value="lastMonth">Last Month</SelectItem>
              <SelectItem value="thisYear">This Year</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Deposits</CardTitle>
            <LineChart className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">$12,450.00</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Withdrawals</CardTitle>
            <LineChart className="h-4 w-4 text-rose-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rose-600">$4,320.00</div>
            <p className="text-xs text-muted-foreground">-5.2% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Savings</CardTitle>
            <BarChart3 className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$8,130.00</div>
            <p className="text-xs text-muted-foreground">+35.7% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="deposits">Deposits</TabsTrigger>
          <TabsTrigger value="withdrawals">Withdrawals</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Savings Trend</CardTitle>
              <CardDescription>View the savings trend over the past 6 months</CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center bg-slate-50 rounded-md">
              <div className="text-center">
                <BarChart3 className="mx-auto h-16 w-16 text-slate-300" />
                <p className="mt-2 text-sm text-muted-foreground">Chart visualization will appear here</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">View Detailed Analysis</Button>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download Report
              </Button>
            </CardFooter>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Savings by Customer Type</CardTitle>
                <CardDescription>Distribution of savings across customer segments</CardDescription>
              </CardHeader>
              <CardContent className="h-64 flex items-center justify-center bg-slate-50 rounded-md">
                <div className="text-center">
                  <PieChart className="mx-auto h-16 w-16 text-slate-300" />
                  <p className="mt-2 text-sm text-muted-foreground">Pie chart will appear here</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Transaction Volume</CardTitle>
                <CardDescription>Number of transactions over time</CardDescription>
              </CardHeader>
              <CardContent className="h-64 flex items-center justify-center bg-slate-50 rounded-md">
                <div className="text-center">
                  <LineChart className="mx-auto h-16 w-16 text-slate-300" />
                  <p className="mt-2 text-sm text-muted-foreground">Line chart will appear here</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="deposits" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Deposit Analysis</CardTitle>
              <CardDescription>Detailed breakdown of all deposits</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Deposit analysis content will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="withdrawals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Withdrawal Analysis</CardTitle>
              <CardDescription>Detailed breakdown of all withdrawals</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Withdrawal analysis content will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="customers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Savings Analysis</CardTitle>
              <CardDescription>Savings patterns by customer</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Customer analysis content will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
