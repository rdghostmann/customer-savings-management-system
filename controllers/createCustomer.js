"use server";

import { connectToDB } from "@/lib/connectDB";
import Customer from "@/models/Customer";
import { revalidatePath } from "next/cache";

export async function createCustomer(formData) {
  try {
    await connectToDB(); // Ensure the database connection is established

    // Create a new customer
    const newCustomer = new Customer({
      name: formData.name,
      accountNumber: formData.accountNumber,
      phone: formData.phone,
      email: formData.email,
      address: formData.address, // Fixed: Accessing address from formData
      balance: formData.balance, // Fixed: Accessing balance from formData
      joinDate: new Date(),
      lastActivity: new Date(),
      status: "active",
    });

    // console.log("Saving new customer:", newCustomer);
    await newCustomer.save();
    // console.log("Customer saved successfully.");
    revalidatePath("/dashboard/customers"); // Revalidate the dashboard path to reflect changes
    // Return the newly created customer
    return { success: true };
  } catch (error) {
    console.error("Error creating customer:", error.message); // Log the error message
    throw new Error("Failed to create customer");
  }
}