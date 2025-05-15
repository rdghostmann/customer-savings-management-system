"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  customerId: z.string().min(1, { message: "Please select a customer." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export default function CustomerMessagingForm({ customers }) {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerId: "",
      message: "",
    },
  });

  const { setValue, watch } = form;
  const selectedCustomerId = watch("customerId");

  const onSubmit = async (values) => {
    setIsLoading(true);

    try {
      const selectedCustomer = customers.find((c) => c._id === values.customerId);
      if (!selectedCustomer) {
        toast.error("Selected customer not found.");
        setIsLoading(false);
        return;
      }

      const personalizedMessage = values.message
        .replace("{{name}}", selectedCustomer.name)
        .replace("{{balance}}", formatCurrency(selectedCustomer.balance));

      const response = await fetch("/api/kudisms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipients: [selectedCustomer.phone],
          message: personalizedMessage,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message || "SMS sent successfully.");
        form.reset();
      } else {
        toast.error(result.error || "Failed to send SMS.");
      }
    } catch (error) {
      console.error("Error sending SMS:", error);
      toast.error("An error occurred while sending SMS.");
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-lg mx-auto">
        {/* Customer Search & Select */}
        <FormField
          control={form.control}
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

        {/* Message */}
        <FormField
        className=""
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Type your message here... Use {{name}} and {{balance}} for personalization."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-emerald-600 hover:bg-emerald-700"
          disabled={isLoading}
        >
          {isLoading ? "Sending..." : "Send SMS"}
        </Button>
      </form>
    </Form>
  );
}