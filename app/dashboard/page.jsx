import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight, MessageSquare, PiggyBank, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import CustomerSavingsForm from "@/components/Customer/customer-savings-form";
import RecentTransactions from "@/components/RecentTransactions/recent-transactions";
import SavingsSummary from "@/components/SavingSummary/savings-summary";
import { getAllCustomers } from "@/controllers/getAllCustomers"; // Server action to fetch customers
import { getTodayDeposits, getTodayWithdrawals, getTotalCustomers } from "@/controllers/dashboardStats"; // Server actions for stats
import LogOutBtn from "@/components/Logout/LogOutBtn";

export default async function Home() {
  const customers = await getAllCustomers(); // Fetch customers from the server

  const [customersResult, depositsResult, withdrawalsResult] = await Promise.allSettled([
    getTotalCustomers(), // Fetch total customers
    getTodayDeposits(), // Fetch today's deposits
    getTodayWithdrawals(), // Fetch today's withdrawals
  ]);

  // Extract results or default to 0 in case of errors
  const totalCustomers = customersResult.status === "fulfilled" ? customersResult.value : 0;
  const todayDeposits = depositsResult.status === "fulfilled" ? depositsResult.value : 0;
  const todayWithdrawals = withdrawalsResult.status === "fulfilled" ? withdrawalsResult.value : 0;

  // Calculate net savings
  const netSavings = todayDeposits - todayWithdrawals;


  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <PiggyBank className="h-8 w-8 text-emerald-600" />
            <h1 className="text-3xl font-bold">Daily Savings Manager</h1>
          </div>
          <p className="text-muted-foreground">Track and manage your customers' daily savings</p>
        </div>
        <div>
          {/* Logout Button  */}
          <LogOutBtn />
        </div>

      </header>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Record New Transaction</CardTitle>
            <CardDescription>Enter customer credit or debit entry</CardDescription>
          </CardHeader>
          <CardContent>
            <CustomerSavingsForm customers={customers} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Savings Summary</CardTitle>
            <CardDescription>Today's savings overview</CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<div>Loading summary...</div>}>
              <SavingsSummary
                totalCustomers={totalCustomers}
                todayDeposits={todayDeposits}
                todayWithdrawals={todayWithdrawals}
                netSavings={netSavings}
              />            </Suspense>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link href="/dashboard/reports">
                View reports
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link href="/dashboard/messaging">
                <MessageSquare className="mr-2 h-4 w-4" />
                Send Messages
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="col-span-full">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Latest customer savings activities</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard/customers">
                <Users className="mr-2 h-4 w-4" />
                All Customers
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<div>Loading transactions...</div>}>
              <RecentTransactions />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}