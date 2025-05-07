"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CalendarIcon, CreditCard, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { createTransaction } from "@/controllers/createTransaction";
import { useRouter } from "next/navigation"; // Ensure you import useRouter from next/navigation
import { useToast } from "@/hooks/use-toast"; // Ensure toast is imported

const formSchema = z.object({
  customerId: z.string({
    required_error: "Please select a customer.",
  }),
  transactionType: z.enum(["credit", "debit"], {
    required_error: "Please select a transaction type.",
  }),
  amount: z.coerce
    .number({
      required_error: "Please enter an amount.",
      invalid_type_error: "Amount must be a number.",
    })
    .positive("Amount must be positive."),
  date: z.date({
    required_error: "Please select a date.",
  }),
  description: z.string().optional(),
});

export default function CustomerSavingsForm({ customers }) {
  const { toast } = useToast(); // Initialize toast
  const [open, setOpen] = useState(false);
  const [openDate, setOpenDate] = useState(false);

  const router = useRouter(); // Initialize router

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
      description: "",
    },
  });

  const { handleSubmit, control, reset, setValue } = form;

  async function onSubmit(values) {
    const response = await createTransaction({
      customerId: values.customerId,
      type: values.transactionType,
      amount: values.amount,
      date: values.date,
      description: values.description,
      createdBy: "Admin", // Replace with the actual user performing the transaction
    });

    if (response.success) {
      toast({
        title: "Success",
        description: "Transaction recorded successfully!",
        variant: "default", // Optional: Customize the toast variant
      });
      router.refresh(); // Refresh the page to reflect the new transaction
      reset(); // Reset the form fields
    } else {
      toast({
        title: "Error",
        description: response.message || "An error occurred while recording the transaction.",
        variant: "destructive", // Optional: Customize the toast variant
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          {/* Customer Selection */}
          <FormField
            control={control}
            name="customerId"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Customer</FormLabel>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className={cn("justify-between", !field.value && "text-muted-foreground")}
                      >
                        {field.value
                          ? customers.find((customer) => customer._id === field.value)?.name
                          : "Select customer"}
                        <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="p-0">
                    <Command>
                      <CommandInput placeholder="Search customer..." />
                      <CommandList>
                        <CommandEmpty>No customer found.</CommandEmpty>
                        <CommandGroup>
                          {customers.map((customer) => (
                            <CommandItem
                              key={customer._id}
                              value={customer.name}
                              onSelect={() => {
                                setValue("customerId", customer._id);
                                setOpen(false);
                              }}
                            >
                              {customer.name}
                              <span className="ml-2 text-xs text-muted-foreground">{customer.accountNumber}</span>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Transaction Date */}
          <FormField
            control={control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Transaction Date</FormLabel>
                <Popover open={openDate} onOpenChange={setOpenDate}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn("justify-start text-left font-normal", !field.value && "text-muted-foreground")}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? format(field.value, "PPP") : "Select date"}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(date) => {
                        field.onChange(date);
                        setOpenDate(false);
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Transaction Type */}
        <FormField
          control={control}
          name="transactionType"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Transaction Type</FormLabel>
              <FormControl>
                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-4">
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="credit" />
                    </FormControl>
                    <FormLabel className="font-normal text-emerald-600">Credit (Deposit)</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="debit" />
                    </FormControl>
                    <FormLabel className="font-normal text-rose-600">Debit (Withdrawal)</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Amount */}
        <FormField
          control={control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="0.00" className="pl-10" {...field} type="number" step="0.01" />
                </div>
              </FormControl>
              <FormDescription>Enter the transaction amount in your local currency.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Transaction details" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button type="submit" className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-700">
          Record Transaction
        </Button>
      </form>
    </Form>
  );
}