import { ArrowDownIcon, ArrowUpIcon, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { getRecentTransactions } from "@/controllers/getRecentTransactions";

export default async function RecentTransactions() {
  const transactions = await getRecentTransactions(); // Fetch transactions from the server

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction._id}>
              <TableCell>
                <div>
                  <div className="font-medium">{transaction.customer?.name}</div>
                  <div className="text-xs text-muted-foreground">{transaction.customer?.accountNumber}</div>
                </div>
              </TableCell>
              <TableCell>
                <div className="font-medium">{format(new Date(transaction.date), "MMM d, yyyy")}</div>
                <div className="text-xs text-muted-foreground">{transaction.description}</div>
              </TableCell>
              <TableCell>
                {transaction.type === "credit" ? (
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                    <ArrowUpIcon className="mr-1 h-3 w-3" />
                    Credit
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-rose-50 text-rose-700 border-rose-200">
                    <ArrowDownIcon className="mr-1 h-3 w-3" />
                    Debit
                  </Badge>
                )}
              </TableCell>
              <TableCell
                className={`text-right font-medium ${transaction.type === "credit" ? "text-emerald-600" : "text-rose-600"
                  }`}
              >
                {formatCurrency(transaction.amount)}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Button
                        variant="ghost"
                        // onClick={() => alert(`View details for ${transaction.customer?.name}`)}
                      >
                        View details
                      </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Button
                        variant="ghost"
                        // onClick={() => alert(`Edit transaction for ${transaction.customer?.name}`)}
                      >
                        Edit transaction
                      </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Button
                        variant="ghost"
                        className="text-red-600"
                        // onClick={() => {
                        //   if (confirm(`Are you sure you want to delete this transaction?`)) {
                        //     // Handle deletion logic here
                        //   }
                        // }}
                      >
                        Delete transaction
                      </Button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}