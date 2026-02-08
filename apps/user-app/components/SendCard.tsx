"use client";

import { Button } from "@repo/ui/button";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";
import { ArrowRight, Send } from "lucide-react";

export function SendCard() {
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isDisabled = !number || !amount || loading;

  const handleTransfer = async () => {
    if (isDisabled) return;

    // Reset error
    setError("");

    // Validate amount
    const amountValue = Number(amount);
    if (isNaN(amountValue) || amountValue <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    try {
      setLoading(true);
      const result = await p2pTransfer(number, amountValue * 100);
      
      if (result.success) {
        alert("Transfer successful");
        setNumber("");
        setAmount("");
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 bg-indigo-50 rounded-full">
            <Send className="w-6 h-6 text-indigo-600" />
        </div>
        <div>
            <h2 className="text-xl font-bold text-gray-900">Send Money</h2>
            <p className="text-sm text-gray-500">Instant P2P transfers</p>
        </div>
      </div>
      
      <div className="space-y-6">
        <TextInput
          label="Phone Number"
          placeholder="Enter recipient's number"
          onChange={(value) => {
            setError("");
            setNumber(value);
          }}
        />

        <TextInput
          label="Amount"
          placeholder="Enter amount"
          onChange={(value) => {
            setError("");
            setAmount(value);
          }}
        />
        
        {error && (
          <div className="flex items-center text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-100">
            <span className="mr-2">●</span> {error}
          </div>
        )}

        <div className="pt-2">
            <Button
                onClick={handleTransfer}
                disabled={isDisabled}
            >
                <div className="flex items-center justify-center space-x-2">
                    <span>{loading ? "Processing..." : "Send Securely"}</span>
                    {!loading && <ArrowRight className="w-4 h-4" />}
                </div>
            </Button>
        </div>
        
        <div className="text-sm text-gray-400 text-center">
          Transfers are encrypted and processed instantly
        </div>
      </div>
    </div>
  );
}