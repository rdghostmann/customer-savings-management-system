import { connectToDB } from "@/lib/connectDB";
import Customer from "@/models/Customer";
import Transaction from "@/models/Transaction";

export async function getTotalCustomers() {
  await connectToDB();
  return await Customer.countDocuments();
}

export async function getTodayDeposits() {
  await connectToDB();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const deposits = await Transaction.aggregate([
    { $match: { type: "credit", date: { $gte: today } } },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);

  return deposits[0]?.total || 0;
}

export async function getTodayWithdrawals() {
  await connectToDB();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const withdrawals = await Transaction.aggregate([
    { $match: { type: "debit", date: { $gte: today } } },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);

  return withdrawals[0]?.total || 0;
}