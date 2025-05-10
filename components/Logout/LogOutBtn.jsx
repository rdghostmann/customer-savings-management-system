"use client";

import React from "react";
import { signOut } from "next-auth/react";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";

const LogOutBtn = () => {
  const handleSignOut = async () => {
    await signOut(); // Trigger the sign-out process
    // await signOut({ callbackUrl: "/login" });
  };

  return (
    <Button onClick={handleSignOut} className="bg-red-600 hover:bg-red-700 text-white animate-bounce">
      <LogOut /><span>Log Out</span>
    </Button>
  );
};
 
export default LogOutBtn;