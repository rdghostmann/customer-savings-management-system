"use server";
import { connectToDB } from "@/lib/connectDB";
import Transaction from "@/models/Transaction";

export async function getCustomerTransactions(customerId) {
  try {
    await connectToDB(); // Ensure the database connection is established

    // Fetch transactions for the given customer ID, sorted by date (most recent first)
    const transactions = await Transaction.find({ customer: customerId }).sort({ date: -1 });
    // console.log("Fetched transactions:", transactions); // Log the fetched transactions
    return transactions.map((transaction) => ({
      _id: transaction._id.toString(),
      type: transaction.type,
      amount: transaction.amount,
      date: transaction.date,
      description: transaction.description,
      balance: transaction.balance,
    }));
  } catch (error) {
    console.error("Error fetching transactions:", error.message);
    return [];
  }
}