import Link from "next/link";
import { ArrowLeft, Calendar, CheckCircle, Clock, Hash, MapPin, MessageSquareShare, Phone, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getCustomer } from "@/controllers/getCustomer";
import CustomerTransactionHistory from "@/components/Customer/customer-transaction-history";
import CustomerBalanceChart from "@/components/Customer/customer-balance-chart";
import { format } from "date-fns"; // Import date-fns for date formatting
import dynamic from "next/dynamic";
import EditCustomerBtn from "@/components/EditCustomerBtn/EditCustomerBtn";

const SingleCustomerMessage = dynamic(() =>
  import("@/components/Customer/single-customer-message")
);

export default async function CustomerDetailPage({ params }) {
  const { id } = params; // Extract customer ID from the route params
  const customer = await getCustomer(id); // Fetch customer details using the server action

  if (!customer) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/customers">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Customer Not Found</h1>
        </div>
        <Card>
          <CardContent className="p-6">
            <p>The customer you are looking for does not exist or has been removed.</p>
            <Button className="mt-4" asChild>
              <Link href="/dashboard/customers">Return to Customers</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="w-full flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/customers">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div className="w-full flex items-center justify-between p-4">
            <div>
              <h1 className="text-2xl font-bold">{customer.name}</h1>
              <p className="text-muted-foreground">{customer.accountNumber}</p>
            </div>
            {/* Edit Customer details  */}
            <EditCustomerBtn customer={customer} />
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
              {customer.status}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(customer.balance)}</div>
            <p className="text-xs text-muted-foreground">Last updated today</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contact Information</CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-sm">{customer.phone}</div>
            <div className="text-sm">{customer.email}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Account Details</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-sm">Joined: {format(new Date(customer.joinDate), "dd/MM/yyyy")}</div>
            <div className="text-sm">Last Activity: {format(new Date(customer.lastActivity), "dd/MM/yyyy")}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="statement" className="space-y-4">
        <TabsList>
          <TabsTrigger value="statement">Statement of Account</TabsTrigger>
          <TabsTrigger value="analytics">Balance Analytics</TabsTrigger>
          <TabsTrigger value="message"> <MessageSquareShare className="animate-bounce mr-2 h-4 w-4" /> Send Message</TabsTrigger>
          <TabsTrigger value="details">Personal Details</TabsTrigger>
        </TabsList>

        <TabsContent value="statement">
          <CustomerTransactionHistory customerId={customer._id} />
        </TabsContent>

        <TabsContent value="analytics">
          <CustomerBalanceChart customerId={customer._id} />
        </TabsContent>

        <TabsContent value="message">
          <SingleCustomerMessage customer={customer} />
        </TabsContent>

        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Customer details and preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    <Phone className="h-5 w-5 text-emerald-600" />
                    Contact Details
                  </h3>
                  <p className="text-sm flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    Full Name: {customer.name}
                  </p>
                  <p className="text-sm flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    Phone: {customer.phone}
                  </p>
                  <p className="text-sm flex items-center gap-2">
                    <MessageSquareShare className="h-4 w-4 text-muted-foreground" />
                    Email: {customer.email}
                  </p>
                  <p className="text-sm flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    Address: {customer.address}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    <User className="h-5 w-5 text-emerald-600" />
                    Account Information
                  </h3>
                  <p className="text-sm flex items-center gap-2">
                    <Hash className="h-4 w-4 text-muted-foreground" />
                    Account Number: {customer.accountNumber}
                  </p>
                  <p className="text-sm flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    Join Date: {format(new Date(customer.joinDate), "dd/MM/yyyy")}
                  </p>
                  <p className="text-sm flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    Last Activity: {format(new Date(customer.lastActivity), "dd/MM/yyyy")}
                  </p>
                  <p className="text-sm flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    Status: {customer.status}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}