"use client";

import { resetAllCustomerBalances } from "@/controllers/resetBalances";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function ResetBalancesButton() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleReset = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await resetAllCustomerBalances();
      if (response.success) {
        setMessage(`Successfully reset balances for ${response.updatedCount} customers.`);
      }
    } catch (error) {
      setMessage("Failed to reset customer balances. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button
        onClick={handleReset}
        disabled={loading}
        className="bg-red-600 hover:bg-red-700 text-white"
      >
        {loading ? "Resetting..." : "Reset All Balances"}
      </Button>
      {message && <p className="mt-2 text-sm text-muted-foreground">{message}</p>}
    </div>
  );
}