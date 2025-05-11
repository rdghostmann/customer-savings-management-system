"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import CustomerUpdateForm from "../Customer/CustomerUpdateForm";

const EditCustomerBtn = ({ customer }) => {
  const [isOpen, setIsOpen] = useState(false); // State to control modal visibility

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)} className="bg-blue-600 hover:bg-blue-700">
          Edit Customer
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Customer Details</DialogTitle>
        </DialogHeader>
        <CustomerUpdateForm customer={customer} onClose={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default EditCustomerBtn;