import Link from "next/link";
import { ArrowLeft, CheckCircle, MessageSquare, Send, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BalanceNotificationMessage from "@/components/Balance-Notification-Message/balance-notification-message";
import MessageTemplates from "@/components/MessageTemplates/message-templates";
import CustomerMessagingForm from "@/components/Customer/customer-messaging-form";

export default async function MessagingPage({customers}) {

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Customer Messaging</h1>
        </div>
        <Button variant="outline" asChild>
          <Link href="#">
            <MessageSquare className="mr-2 h-4 w-4" />
            Message History
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customers.length}</div>
            <p className="text-xs text-muted-foreground">All active accounts</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages Sent Today</CardTitle>
            <Send className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">3 balance notifications</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Delivery Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98%</div>
            <p className="text-xs text-muted-foreground">High delivery success</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="balance" className="space-y-4">
        <TabsList>
          <TabsTrigger value="balance">Balance Notifications</TabsTrigger>
          <TabsTrigger value="custom">Custom Message</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>
        <TabsContent value="balance" className="space-y-4">
          <BalanceNotificationMessage customers={customers} />
        </TabsContent>
        <TabsContent value="custom" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Custom Message</CardTitle>
              <CardDescription>Send a custom message to selected customers</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Use this form to send personalized messages to specific customers or groups.
              </p>
              <CustomerMessagingForm customers={customers} isCustomMessage={true} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Message Templates</CardTitle>
              <CardDescription>Manage your saved message templates</CardDescription>
            </CardHeader>
            <CardContent>
              <MessageTemplates customers={customers} /> {/* Pass customers as props */}
            </CardContent>
            <CardFooter>
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <span className="mr-2">+</span> Create New Template
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}