"use server";
import { connectToDB } from "@/lib/connectDB";
import Transaction from "@/models/Transaction";

export async function getSavingsAnalytics(period) {
  await connectToDB();

  const today = new Date();
  let startDate;

  switch (period) {
    case "today":
      startDate = new Date();
      startDate.setHours(0, 0, 0, 0);
      break;
    case "thisWeek":
      startDate = new Date();
      startDate.setDate(today.getDate() - today.getDay());
      startDate.setHours(0, 0, 0, 0);
      break;
    case "thisMonth":
      startDate = new Date(today.getFullYear(), today.getMonth(), 1);
      break;
    case "lastMonth":
      startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      break;
    case "thisYear":
      startDate = new Date(today.getFullYear(), 0, 1);
      break;
    default:
      throw new Error("Invalid period");
  }

  const deposits = await Transaction.aggregate([
    { $match: { type: "credit", date: { $gte: startDate } } },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);

  const withdrawals = await Transaction.aggregate([
    { $match: { type: "debit", date: { $gte: startDate } } },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);

  const netSavings = (deposits[0]?.total || 0) - (withdrawals[0]?.total || 0);

  return {
    deposits: deposits[0]?.total || 0,
    withdrawals: withdrawals[0]?.total || 0,
    netSavings,
  };
}