import React from "react";
import MessagingPage from "./MessagingPage";
import { getAllCustomers } from "@/controllers/getAllCustomers"; // Import the server action

export default async function Page() {
  // Fetch customers using the server action
  const customers = await getAllCustomers();

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Pass the fetched customers as props to the MessagingPage component */}
      <MessagingPage customers={customers} />
    </div>
  );
}