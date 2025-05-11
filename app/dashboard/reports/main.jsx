"use client";
import Link from "next/link"
import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { ArrowLeft, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getSavingsAnalytics } from "@/controllers/getSavingReports";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ReportsPage() {

  const [period, setPeriod] = useState("thisMonth");
  const [analytics, setAnalytics] = useState({ deposits: 0, withdrawals: 0, netSavings: 0 });
  const [chartData, setChartData] = useState([]);

  const [depositsData, setDepositsData] = useState([]);
  const [withdrawalsData, setWithdrawalsData] = useState([]);
  const [customerData, setCustomerData] = useState([]);


  useEffect(() => {
    async function fetchAnalytics() {
      const data = await getSavingsAnalytics(period);
      setAnalytics(data);

      // Generate dummy chart data for visualization
      const dummyData = Array.from({ length: 6 }, (_, i) => ({
        month: `Month ${i + 1}`,
        deposits: Math.random() * 1000,
        withdrawals: Math.random() * 500,
        netSavings: Math.random() * 1500,
      }));
      setChartData(dummyData);

      // Generate dummy data for deposits, withdrawals, and customers
      const dummyDeposits = Array.from({ length: 6 }, (_, i) => ({
        month: `Month ${i + 1}`,
        amount: Math.random() * 1000,
      }));
      setDepositsData(dummyDeposits);

      const dummyWithdrawals = Array.from({ length: 6 }, (_, i) => ({
        month: `Month ${i + 1}`,
        amount: Math.random() * 500,
      }));
      setWithdrawalsData(dummyWithdrawals);

      const dummyCustomers = [
        { name: "Customer A", value: Math.random() * 1000 },
        { name: "Customer B", value: Math.random() * 800 },
        { name: "Customer C", value: Math.random() * 600 },
      ];
      setCustomerData(dummyCustomers);
    }

    fetchAnalytics();
  }, [period]);

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];



  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="outline" size="icon" asChild>
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Savings Reports</h1>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="thisMonth" onValueChange={(value) => setPeriod(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="thisWeek">This Week</SelectItem>
              <SelectItem value="thisMonth">This Month</SelectItem>
              <SelectItem value="lastMonth">Last Month</SelectItem>
              <SelectItem value="thisYear">This Year</SelectItem>
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
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">${analytics.deposits.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Withdrawals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rose-600">${analytics.withdrawals.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Savings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${analytics.netSavings.toFixed(2)}</div>
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

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Savings Trend</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="deposits" stroke="#8884d8" />
                  <Line type="monotone" dataKey="withdrawals" stroke="#82ca9d" />
                  <Line type="monotone" dataKey="netSavings" stroke="#ffc658" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Deposits Tab */}
        <TabsContent value="deposits" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Deposit Analysis</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={depositsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="amount" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Withdrawals Tab */}
        <TabsContent value="withdrawals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Withdrawal Analysis</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={withdrawalsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="amount" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Customers Tab */}
        <TabsContent value="customers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Savings Distribution</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={customerData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  >
                    {customerData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
