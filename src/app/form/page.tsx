"use client";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function FraudDetectionForm() {
  const [amount, setAmount] = useState("");
  const [location, setLocation] = useState("");
  const [userId, setUserId] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/fraud-detection", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: Number(amount), location, user_id: userId }),
    });
    const data = await response.json();
    
    setResult(data.risk || "Error checking fraud risk");

    // Show toast notifications based on fraud risk
    if (data.risk === "High Risk") {
      toast.error("🚨 Transaction is Suspicious! Proceed with caution.", {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
      });
    } else if (data.risk === "Medium Risk") {
      toast.warn("⚠️ Transaction may be risky. Double-check details!", {
        position: "top-right",
        autoClose: 4000,
        theme: "dark",
      });
    } else {
      toast.success("✅ Transaction is Normal", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6">
      <ToastContainer /> {/* Toast notifications container */}

      <h1 className="text-2xl font-bold mb-4">Fraud Detection Form</h1>
      <form onSubmit={handleSubmit} className="bg-gray-900 p-6 shadow-lg rounded-lg space-y-4 w-full max-w-md border border-gray-600">
        <input
          type="number"
          placeholder="Transaction Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 bg-black text-white border border-gray-600 rounded"
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-2 bg-black text-white border border-gray-600 rounded"
          required
        />
        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="w-full p-2 bg-black text-white border border-gray-600 rounded"
          required
        />
        <button type="submit" className="w-full bg-white text-black p-2 rounded border border-gray-600 hover:bg-gray-300">
          Check Fraud
        </button>
      </form>

      {result && (
        <p
          className={`mt-4 text-lg font-bold ${
            result === "High Risk" ? "text-red-500" : result === "Medium Risk" ? "text-yellow-500" : "text-green-500"
          }`}
        >
          {result === "High Risk" ? "🚨 Transaction is Suspicious!" : result === "Medium Risk" ? "⚠️ Transaction may be risky!" : "✅ Transaction is Normal"}
        </p>
      )}
    </div>
  );
}
