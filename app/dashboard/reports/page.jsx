import React from 'react'
import ReportsPage from './ReportsPage'
import { getAllCustomers } from "@/controllers/getAllCustomers"; // Server action to fetch customers
import { getTodayDeposits, getTodayWithdrawals, getTotalCustomers } from "@/controllers/dashboardStats"; // Server actions for stats

const page = async () => {

    const customers = await getAllCustomers(); // Fetch customers from the server
  
    const [customersResult, depositsResult, withdrawalsResult] = await Promise.allSettled([
      getTotalCustomers(), // Fetch total customers
      getTodayDeposits(), // Fetch today's deposits
      getTodayWithdrawals(), // Fetch today's withdrawals
    ]);
  

  return <ReportsPage customers={customers} depositsResult={depositsResult} withdrawalsResult={withdrawalsResult} customersResult={customersResult}  />;
}
export default page
