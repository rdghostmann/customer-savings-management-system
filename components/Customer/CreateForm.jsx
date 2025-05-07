"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createCustomer } from "@/controllers/createCustomer";

export default function CreateForm() {
  const [formData, setFormData] = useState({
    name: "",
    accountNumber: "",
    phone: "",
    email: "",
    address: "",
    balance: 0,
  });
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await createCustomer(formData);
      if (response) {
        toast({
          title: "Success",
          description: "Customer created successfully!",
        });
        setFormData({
          name: "",
          accountNumber: "",
          phone: "",
          email: "",
          address: "",
          balance: 0,
        }); // Reset form fields
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create customer. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <Input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700">
          Account Number
        </label>
        <Input
          id="accountNumber"
          name="accountNumber"
          type="text"
          value={formData.accountNumber}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Phone
        </label>
        <Input
          id="phone"
          name="phone"
          type="text"
          value={formData.phone}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
          Address
        </label>
        <Input
          id="address"
          name="address"
          type="text"
          value={formData.address}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="balance" className="block text-sm font-medium text-gray-700">
          Initial Balance
        </label>
        <Input
          id="balance"
          name="balance"
          type="number"
          value={formData.balance}
          onChange={handleInputChange}
          required
        />
      </div>
      <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={loading}>
        {loading ? "Saving..." : "Save Customer"}
      </Button>
    </form>
  );
}