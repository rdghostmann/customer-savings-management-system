"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CheckCircle2, Info, MessageSquare } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";

const formSchema = z.object({
  messageType: z.enum(["all", "filtered", "selected"], {
    required_error: "Please select a message type.",
  }),
  minBalance: z.coerce.number().optional(),
  selectedCustomers: z.array(z.string()).optional(),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
  includeBalance: z.boolean().default(true),
  scheduleForLater: z.boolean().default(false),
});

export default function CustomerMessagingForm({ customers, isCustomMessage = false }) {
  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const defaultMessage = isCustomMessage
    ? "Dear customer, we would like to inform you that..."
    : "Dear customer, your current balance is {{balance}}. Thank you for saving with us!";

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      messageType: "all",
      message: defaultMessage,
      includeBalance: !isCustomMessage,
      scheduleForLater: false,
    },
  });

  const messageType = form.watch("messageType");
  const includeBalance = form.watch("includeBalance");

  function onSubmit(values) {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log(values);
      setIsLoading(false);
      setIsSent(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSent(false);
        if (!isCustomMessage) {
          form.reset({
            messageType: "all",
            message: defaultMessage,
            includeBalance: true,
            scheduleForLater: false,
          });
        }
      }, 3000);
    }, 1500);
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

  const getBalanceForPreview = () => {
    const defaultBalance = 2500; // Default balance for preview
    return formatCurrency(defaultBalance);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {isSent && (
          <Alert className="bg-emerald-50 text-emerald-800 border-emerald-200">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            <AlertTitle>Success!</AlertTitle>
            <AlertDescription>Your messages have been sent successfully to the selected customers.</AlertDescription>
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
                    <FormLabel className="font-normal">All customers ({customers.length})</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="filtered" />
                    </FormControl>
                    <FormLabel className="font-normal">Customers with minimum balance</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="selected" />
                    </FormControl>
                    <FormLabel className="font-normal">Selected customers</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {messageType === "filtered" && (
          <FormField
            control={form.control}
            name="minBalance"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Minimum Balance</FormLabel>
                <FormControl>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                    <input
                      type="number"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-8 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="1000"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormDescription>Only send to customers with at least this balance</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {messageType === "selected" && (
          <FormField
            control={form.control}
            name="selectedCustomers"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">Select Customers</FormLabel>
                  <FormDescription>Choose which customers should receive this message</FormDescription>
                </div>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]">Select</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Account</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead className="text-right">Balance</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {customers.map((customer) => (
                        <TableRow key={customer.id}>
                          <TableCell>
                            <Checkbox
                              checked={form.getValues("selectedCustomers")?.includes(customer.id)}
                              onCheckedChange={(checked) => {
                                const selected = form.getValues("selectedCustomers") || [];
                                form.setValue(
                                  "selectedCustomers",
                                  checked ? [...selected, customer.id] : selected.filter((id) => id !== customer.id)
                                );
                              }}
                            />
                          </TableCell>
                          <TableCell className="font-medium">{customer.name}</TableCell>
                          <TableCell>{customer.accountNumber}</TableCell>
                          <TableCell>{customer.phone}</TableCell>
                          <TableCell className="text-right">{formatCurrency(customer.balance)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea placeholder="Type your message here..." className="min-h-[120px]" {...field} />
              </FormControl>
              {!isCustomMessage && (
                <FormDescription>
                  Use <code>{"{{balance}}"}</code> to include the customer's current balance in the message.
                </FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-700" disabled={isLoading}>
          {isLoading ? "Processing..." : "Send Messages"}
        </Button>
      </form>
    </Form>
  );
}