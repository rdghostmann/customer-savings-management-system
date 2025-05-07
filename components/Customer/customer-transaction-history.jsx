"use client";

import { useEffect, useState } from "react";
import { ArrowDownIcon, ArrowUpIcon, Download, Filter, MoreHorizontal, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { getCustomerTransactions } from "@/controllers/getCustomerTransaction"; // Import the server action

export default function CustomerTransactionHistory({ customerId }) {
  const [transactions, setTransactions] = useState([]); // State to store transactions
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [filterType, setFilterType] = useState("all"); // State for transaction type filter
  const [loading, setLoading] = useState(true); // State for loading indicator

  // Fetch transactions when the component mounts
  useEffect(() => {
    async function fetchTransactions() {
      setLoading(true); // Set loading to true before fetching
      try {
        const data = await getCustomerTransactions(customerId); // Fetch transactions from the server
        setTransactions(data || []); // Update state with fetched transactions
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    }

    fetchTransactions();
  }, [customerId]); // Re-run the effect if customerId changes

  // Filter transactions based on search term and type
  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch = tx.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || tx.type === filterType;
    return matchesSearch && matchesType;
  });

  // Format currency for display
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

  return (
    <div className="space-y-4">
      {/* Search and Filter Section */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search transactions..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                {filterType === "all"
                  ? "All Transactions"
                  : filterType === "credit"
                  ? "Deposits Only"
                  : "Withdrawals Only"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setFilterType("all")}>All Transactions</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterType("credit")}>Deposits Only</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterType("debit")}>Withdrawals Only</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="rounded-md border">
        {loading ? (
          <div className="text-center py-4">Loading transactions...</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Balance</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                    No transactions found
                  </TableCell>
                </TableRow>
              ) : (
                filteredTransactions.map((transaction) => (
                  <TableRow key={transaction._id}>
                    <TableCell>{format(new Date(transaction.date), "MMM d, yyyy")}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>
                      {transaction.type === "credit" ? (
                        <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                          <ArrowUpIcon className="mr-1 h-3 w-3" />
                          Deposit
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-rose-50 text-rose-700 border-rose-200">
                          <ArrowDownIcon className="mr-1 h-3 w-3" />
                          Withdrawal
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell
                      className={`text-right font-medium ${
                        transaction.type === "credit" ? "text-emerald-600" : "text-rose-600"
                      }`}
                    >
                      {transaction.type === "credit" ? "+" : "-"}
                      {formatCurrency(transaction.amount)}
                    </TableCell>
                    <TableCell className="text-right font-medium">{formatCurrency(transaction.balance)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => alert(`View details for transaction ${transaction._id}`)}>
                            View details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => alert(`Print receipt for transaction ${transaction._id}`)}>
                            Print receipt
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Pagination Placeholder */}
      <div className="flex justify-between items-center text-sm text-muted-foreground">
        <div>
          Showing {filteredTransactions.length} of {transactions.length} transactions
        </div>
        <div className="flex gap-1">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" disabled>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}