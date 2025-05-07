"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CheckCircle2, Info, MessageSquare } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const formSchema = z.object({
  messageType: z.enum(["all", "positive"], {
    required_error: "Please select which customers to message.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
  includePersonalName: z.boolean().default(true),
  scheduleForLater: z.boolean().default(false),
});

export default function BalanceNotificationMessage({ customers = [] }) {
  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [previewCustomer, setPreviewCustomer] = useState(customers[0] || { name: "Customer", balance: 0 });

  const defaultMessage = "Dear {{name}}, your current balance is {{balance}}. Thank you for saving with us!";

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      messageType: "all",
      message: defaultMessage,
      includePersonalName: true,
      scheduleForLater: false,
    },
  });

  const messageType = form.watch("messageType");
  const includePersonalName = form.watch("includePersonalName");
  const message = form.watch("message");

  const onSubmit = async (values) => {
    setIsLoading(true);

    try {
      // Simulate API call
      console.log("Submitting values:", values);
      setTimeout(() => {
        setIsSent(true);
        setIsLoading(false);

        // Reset form after 3 seconds
        setTimeout(() => {
          setIsSent(false);
        }, 3000);
      }, 1500);
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

  const getCustomerCount = () => {
    if (messageType === "all") {
      return customers.length;
    } else if (messageType === "positive") {
      return customers.filter((c) => c.balance > 0).length;
    }
    return 0;
  };

  const getMessagePreview = () => {
    let preview = message;

    if (includePersonalName) {
      preview = preview.replace("{{name}}", previewCustomer.name || "Customer");
    } else {
      preview = preview.replace("{{name}}", "Customer");
    }

    preview = preview.replace("{{balance}}", formatCurrency(previewCustomer.balance || 0));

    return preview;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Send Balance Notifications</CardTitle>
        <CardDescription>Send text messages to customers with their current balance information</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {isSent && (
              <Alert className="bg-emerald-50 text-emerald-800 border-emerald-200">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <AlertTitle>Success!</AlertTitle>
                <AlertDescription>
                  Balance notifications have been sent to {getCustomerCount()} customers.
                </AlertDescription>
              </Alert>
            )}

            <FormField
              control={form.control}
              name="messageType"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Recipients</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="all" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          All customers
                          <Badge variant="outline" className="ml-2 bg-slate-100">
                            {customers.length}
                          </Badge>
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="positive" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Only customers with positive balance
                          <Badge variant="outline" className="ml-2 bg-emerald-50 text-emerald-700">
                            {customers.filter((c) => c.balance > 0).length}
                          </Badge>
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message Template</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Type your message here..." className="min-h-[120px]" {...field} />
                  </FormControl>
                  <FormDescription>
                    Use <code>{"{{name}}"}</code> for customer name and <code>{"{{balance}}"}</code> for their current balance.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Message Preview</AlertTitle>
              <AlertDescription>
                <p className="text-sm text-muted-foreground mb-2">{getMessagePreview()}</p>
                <div className="text-xs text-muted-foreground">This is how your message will appear to customers.</div>
              </AlertDescription>
            </Alert>

            <Button type="submit" className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-700" disabled={isLoading}>
              {isLoading ? (
                <>Processing...</>
              ) : (
                <>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Send to {getCustomerCount()} Customers
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}