"use server";

import { connectToDB } from "@/lib/connectDB";
import Transaction from "@/models/Transaction";
import { revalidatePath } from "next/cache";


// Delete a transaction
export async function deleteTransaction(formData) {
  const { transactionId } = Object.fromEntries(formData);

  try {
    await connectToDB();
    const transaction = await Transaction.findByIdAndDelete(transactionId);
    if (!transaction) {
      toast.error("Transaction not found"); // Notify user if transaction is not found
      throw new Error("Transaction not found");
    }
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error deleting transaction:", error.message);
    toast.error("Failed to delete transaction"); // Notify user of failure
    throw new Error("Failed to delete transaction");
  }
}