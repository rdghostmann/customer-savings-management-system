"use server";

import { connectToDB } from "@/lib/connectDB";
import Customer from "@/models/Customer";

export async function deleteCustomer({ customerId }) {
  try {
    await connectToDB();
    const customer = await Customer.findByIdAndDelete(customerId);
    if (!customer) {
      throw new Error("Customer not found");
    }
    return { success: true };
  } catch (error) {
    console.error("Error deleting customer:", error.message);
    throw new Error("Failed to delete customer");
  }
}