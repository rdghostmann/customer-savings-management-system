"use client";

import React from "react";
import { signOut } from "next-auth/react";
import { Button } from "../ui/button";

const LogOutBtn = () => {
  const handleSignOut = async () => {
    await signOut(); // Trigger the sign-out process
    // await signOut({ callbackUrl: "/login" });
  };

  return (
    <Button onClick={handleSignOut} className="bg-red-600 hover:bg-red-700 text-white float-right">
      Log Out
    </Button>
  );
};
 
export default LogOutBtn;