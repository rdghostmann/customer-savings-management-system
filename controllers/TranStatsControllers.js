"use server";

import { connectToDB } from "@/lib/connectDB";
import Transaction from "@/models/Transaction";

// Delete a transaction
export async function deleteTransaction(formData) {
  const { transactionId } = Object.fromEntries(formData);

  try {
    await connectToDB();
    const transaction = await Transaction.findByIdAndDelete(transactionId);
    if (!transaction) {
      throw new Error("Transaction not found");
    }
    return { success: true };
  } catch (error) {
    console.error("Error deleting transaction:", error.message);
    throw new Error("Failed to delete transaction");
  }
}