import React from "react";
import MessagingPage from "./MessagingPage";
import { getAllCustomers } from "@/controllers/getAllCustomers";
import { getTemplateMsg } from "@/controllers/getTemplateMsg";

export default async function Page() {
  const customers = await getAllCustomers();
  const templateData = await getTemplateMsg();

  return (
    <div className="container mx-auto py-8 px-4">
      <MessagingPage templateData={templateData} customers={customers} />
    </div>
  );
}