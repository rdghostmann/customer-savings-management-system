import React from 'react'
import CustomersPage from './_component/CustomerPage/CustomerPage'
import { getAllCustomers } from "@/controllers/getAllCustomers"; // Server action to fetch customers


const page = async () => {
    const customers = await getAllCustomers();
  
  return (
    <div>
      <CustomersPage customers={customers} />
    </div>
  )
}

export default page
