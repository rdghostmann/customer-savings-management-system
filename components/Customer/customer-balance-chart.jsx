"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import { getCustomerTransactions } from "@/controllers/getCustomerTransaction";

export default function CustomerBalanceChart({ customerId }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTransactions() {
      setLoading(true);
      const data = await getCustomerTransactions(customerId); // Fetch transactions
      setTransactions(data);
      setLoading(false);
    }

    fetchTransactions();
  }, [customerId]);

  // Prepare data for the LineChart
  const chartData = transactions.map((transaction) => ({
    date: new Date(transaction.date).toLocaleDateString(), // Format date
    balance: transaction.balance, // Use balance for the Y-axis
  }));

  return (
    <div className="h-full w-full flex flex-col items-center justify-center bg-slate-50 rounded-md p-4">
      {loading ? (
        <p className="text-sm text-muted-foreground">Loading balance history...</p>
      ) : transactions.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="balance" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div className="text-center">
          <p className="text-sm text-muted-foreground">No transaction data available.</p>
        </div>
      )}
    </div>
  );
}