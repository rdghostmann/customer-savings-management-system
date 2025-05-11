"use server";

import { connectToDB } from "@/lib/connectDB";
import Customer from "@/models/Customer";

export async function resetAllCustomerBalances() {
  try {
    await connectToDB(); // Ensure the database connection is established

    // Update all customers' balances to zero
    const result = await Customer.updateMany({}, { $set: { balance: 0 } });

    return { success: true, updatedCount: result.modifiedCount };
  } catch (error) {
    console.error("Error resetting customer balances:", error.message);
    throw new Error("Failed to reset customer balances");
  }
}