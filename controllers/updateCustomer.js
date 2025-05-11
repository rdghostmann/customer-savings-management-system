"use server";

import { connectToDB } from "@/lib/connectDB";
import Customer from "@/models/Customer";
import { revalidatePath } from 'next/cache';

export async function updateCustomer(customerId, formData) {
  try {
    await connectToDB(); // Ensure the database connection is established

    // Find the customer by ID and update their details
    const updatedCustomer = await Customer.findByIdAndUpdate(
      customerId,
      {
        name: formData.name,
        accountNumber: formData.accountNumber,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        balance: formData.balance,
        lastActivity: new Date(), // Update last activity timestamp
      },
      { new: true } // Return the updated document
    );
    
    revalidatePath("/dashboard/customers"); // Revalidate the path to reflect changes
    if (!updatedCustomer) {
      throw new Error("Customer not found");
    }

    return { success: true, };
  } catch (error) {
    console.error("Error updating customer:", error.message);
    throw new Error("Failed to update customer");
  }
}