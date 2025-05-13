"use client";

import { useState } from "react";
import { ArrowLeft, CirclePlus, MoreHorizontal, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { format } from "date-fns"; // Import date-fns for consistent date formatting
import Link from "next/link";
import CreateForm from "@/components/Customer/CreateForm"; // Import the CreateForm component
import { deleteCustomer } from "@/controllers/deleteCustomer";

export default function CustomersPage({ customers }) {
  const [isOpen, setIsOpen] = useState(false); // State to control the dialog visibility
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [customerList, setCustomerList] = useState(customers); // State for customer list

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

  // Filter customers based on search term
  const filteredCustomers = customerList.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.accountNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteCustomer = async (customerId) => {
    try {
      await deleteCustomer({ customerId }); // Call server action to delete customer
      setCustomerList((prev) => prev.filter((customer) => customer._id !== customerId)); // Update state
      // toast.success("Customer deleted successfully");
    } catch (error) {
      console.error("Error deleting customer:", error);
      // toast.error("Failed to delete customer");
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="outline" size="icon" asChild>
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Customer Accounts</h1>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <CirclePlus />
              Add New Customer
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Customer</DialogTitle>
            </DialogHeader>
            <CreateForm /> {/* Render the CreateForm component inside the dialog */}
          </DialogContent>
        </Dialog>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Customer Search</CardTitle>
          <CardDescription>Find customers by name or account number</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search customers..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Customers</CardTitle>
          <CardDescription>Manage your customer accounts</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredCustomers.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Account Number</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead className="text-right">Current Balance</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow key={customer._id}>
                    <TableCell className="font-medium">{customer.name}</TableCell>
                    <TableCell>{customer.accountNumber}</TableCell>
                    <TableCell>
                      {format(new Date(customer.joinDate), "dd/MM/yyyy")} {/* Consistent date format */}
                    </TableCell>
                    <TableCell className="text-right font-medium">{formatCurrency(customer.balance)}</TableCell>
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
                            <Link href={`/dashboard/customers/${customer._id.toString()}`}>
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-600"
                                onClick={() => handleDeleteCustomer(customer._id.toString())}
                              >
                                Delete Customer
                              </Button>
                            {/* </Link> */}

                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-center text-muted-foreground">No customers found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}