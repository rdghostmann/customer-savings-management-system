"use server";

import { connectToDB } from "@/lib/connectDB";
import Transaction from "@/models/Transaction";
import Customer from "@/models/Customer";
import { revalidatePath } from "next/cache";

export async function createTransaction({ customerId, type, amount, date, description, createdBy }) {
  try {
    // Connect to the database
    await connectToDB();

    // Validate customer existence
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return { success: false, message: "Customer not found" };
    }

    // Calculate new balance
    let newBalance;
    if (type === "credit") {
      newBalance = customer.balance + amount;
    } else if (type === "debit") {
      if (customer.balance < amount) {
        return { success: false, message: "Insufficient balance for withdrawal" };
      }
      newBalance = customer.balance - amount;
    } else {
      return { success: false, message: "Invalid transaction type" };
    }

    // Create the transaction
    const transaction = new Transaction({
      customer: customerId,
      type,
      amount,
      balance: newBalance,
      date,
      description,
      createdBy,
    });

    // Save the transaction
    await transaction.save();

    // Update the customer's balance
    customer.balance = newBalance;
    await customer.save();

    revalidatePath("/dashboard"); // Revalidate the dashboard path to reflect changes

    return { success: true, message: "Transaction created successfully" };
  } catch (error) {
    console.error("Error creating transaction:", error);
    return { success: false, message: "An error occurred while creating the transaction" };
  }
}