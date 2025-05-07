import Transaction from "@/models/Transaction";
import { connectToDB } from "@/lib/connectDB";

export async function getRecentTransactions() {
  try {
    await connectToDB(); // Ensure the database connection is established
    const transactions = await Transaction.find()
      .populate("customer", "name accountNumber") // Populate customer details (name and account number)
      .sort({ date: -1 }) // Sort by most recent transactions
      .lean(); // Return plain JavaScript objects
    return transactions;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw new Error("Failed to fetch transactions");
  }
}