"use client";

import { useState, useTransition } from "react";
import { incrementProductQuantity, decrementProductQuantity } from "@/app/actions";

interface ProductActionsProps {
  productId: number;
  currentSold: number;
  maxQuantity: number;
}

export default function ProductActions({ productId, currentSold, maxQuantity }: ProductActionsProps) {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);

  const handleIncrement = () => {
    if (currentSold >= maxQuantity) {
      setMessage("Stock agotado");
      setTimeout(() => setMessage(null), 2000);
      return;
    }

    startTransition(async () => {
      const result = await incrementProductQuantity(productId);
      
      if (result.error) {
        setMessage(result.error);
        setTimeout(() => setMessage(null), 2000);
      }
    });
  };

  const handleDecrement = () => {
    if (currentSold <= 0) {
      setMessage("No se puede reducir más");
      setTimeout(() => setMessage(null), 2000);
      return;
    }

    startTransition(async () => {
      const result = await decrementProductQuantity(productId);
      if (result.error) {
        setMessage(result.error);
        setTimeout(() => setMessage(null), 2000);
      }
    });
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center justify-center gap-2.5">
        <button 
          onClick={handleDecrement}
          disabled={isPending || currentSold <= 0}
          className={`w-9 h-9 flex items-center justify-center text-white rounded-md shadow-sm transition-all duration-200 ${
            isPending || currentSold <= 0
              ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed opacity-50"
              : "action-btn action-btn-decrement"
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
          </svg>
        </button>
        <button 
          onClick={handleIncrement}
          disabled={isPending || currentSold >= maxQuantity}
          className={`w-9 h-9 flex items-center justify-center text-white rounded-md shadow-sm transition-all duration-200 ${
            isPending || currentSold >= maxQuantity
              ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed opacity-50"
              : "action-btn action-btn-increment"
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
      {message && (
        <div className="text-xs font-semibold text-red-600 dark:text-red-400 text-center px-2 py-1 bg-red-50 dark:bg-red-500/10 rounded-md">
          {message}
        </div>
      )}
    </div>
  );
}