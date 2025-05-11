"use client"

import { ArrowDown, ArrowUp, CircleDollarSign, Users } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"

export default function SavingsSummary({ totalCustomers, todayDeposits, todayWithdrawals, netSavings }) {
  // In a real app, this data would come from your backend


  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Customers</p>
                <h3 className="text-2xl font-bold">{totalCustomers}</h3>
              </div>
              <div className="rounded-full bg-emerald-100 p-2">
                <Users className="h-5 w-5 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Net Savings</p>
                <h3 className="text-2xl font-bold">{formatCurrency(netSavings)}</h3>
              </div>
              <div className="rounded-full bg-emerald-100 p-2">
                <ArrowUp className="h-5 w-5 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ArrowUp className="h-4 w-4 text-emerald-600" />
                <p className="text-sm font-medium text-muted-foreground">Deposits</p>
              </div>
              <div className="rounded-full bg-emerald-100 p-2">
                <CircleDollarSign className="h-5 w-5 text-emerald-600" />
              </div>
            </div>
            <div className="flex flex-col">
              <h3 className="text-xl font-bold text-emerald-600">{formatCurrency(todayDeposits)}</h3>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ArrowDown className="h-4 w-4 text-rose-600" />
                <p className="text-sm font-medium text-muted-foreground">Withdrawls</p>
              </div>
              <div className="rounded-full bg-red-100 p-2">
                <CircleDollarSign className="h-5 w-5 text-rose-600" />
              </div>
            </div>
            <div className="flex flex-col">
              <h3 className="text-xl font-bold text-rose-600">{formatCurrency(todayWithdrawals)}</h3>
            </div>
           
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
