"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CheckCircle2, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
  includeBalance: z.boolean().default(true),
  messageTemplate: z.string().optional(),
});

export default function SingleCustomerMessage({ customer }) {
  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const defaultMessage = `Dear ${customer.name}, your current balance is ${formatCurrency(
    customer.balance
  )}. Thank you for saving with us!`;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: defaultMessage,
      includeBalance: true,
    },
  });

  // const { handleSubmit, control, setValue } = form;

  // function onSubmit(values) {
  //   setIsLoading(true);

  //   // Simulate API call
  //   setTimeout(() => {
  //     console.log(values);
  //     setIsLoading(false);
  //     setIsSent(true);

  //     // Reset form after 3 seconds
  //     setTimeout(() => {
  //       setIsSent(false);
  //     }, 3000);
  //   }, 1500);
  // }

  function formatCurrency(amount) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  }

  // Sample message templates
  const templates = [
    {
      id: "balance",
      name: "Balance Notification",
      content: `Dear ${customer.name}, your current balance is ${formatCurrency(
        customer.balance
      )}. Thank you for saving with us!`,
    },
    {
      id: "reminder",
      name: "Payment Reminder",
      content: `Dear ${customer.name}, this is a friendly reminder about your upcoming savings deposit. Thank you.`,
    },
    {
      id: "promotion",
      name: "New Service",
      content: `Dear ${customer.name}, we're excited to announce our new savings plan with higher interest rates! Visit our office to learn more.`,
    },
  ];

  // // Update message when template changes
  const handleTemplateChange = (value) => {
    const template = templates.find((t) => t.id === value);
    if (template) {
      setValue("message", template.content);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Message {customer.name}</CardTitle>
        <CardDescription>Send a direct message to this customer</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-6">
            {isSent && (
              <Alert className="bg-emerald-50 text-emerald-800 border-emerald-200">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <AlertTitle>Message sent!</AlertTitle>
                <AlertDescription>Your message has been sent successfully to {customer.name}.</AlertDescription>
              </Alert>
            )}

            <div className="space-y-4">
              <div className="flex flex-col space-y-1.5">
                <h3 className="text-sm font-medium">Customer Information</h3>
                <div className="text-sm">
                  <p>
                    <span className="text-muted-foreground">Name:</span> {customer.name}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Account:</span> {customer.accountNumber}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Phone:</span> {customer.phone}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Balance:</span> {formatCurrency(customer.balance)}
                  </p>
                </div>
              </div>

              <FormField
                // control={control}
                name="messageTemplate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message Template</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        handleTemplateChange(value);
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a template" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="custom">Custom Message</SelectItem>
                        {templates.map((template) => (
                          <SelectItem key={template.id} value={template.id}>
                            {template.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>Choose a template or write a custom message</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                // control={control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Type your message here..." className="min-h-[120px]" {...field} />
                    </FormControl>
                    <FormDescription>This message will be sent to {customer.name}'s phone number.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                // control={control}
                name="includeBalance"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between space-x-3 space-y-0">
                    <div className="space-y-0.5">
                      <FormLabel>Include Balance</FormLabel>
                      <FormDescription>Include the customer's current balance in the message</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-700" disabled={isLoading}>
              {isLoading ? (
                <>Processing...</>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}