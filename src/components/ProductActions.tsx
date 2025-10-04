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
      <div className="flex items-center justify-center gap-2">
        <button 
          onClick={handleDecrement}
          disabled={isPending || currentSold <= 0}
          className={`w-8 h-8 flex items-center justify-center text-white rounded transition-colors ${
            isPending || currentSold <= 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-500 hover:bg-red-600"
          }`}
          type="button"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <title>Decrementar</title>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>
        <button 
          onClick={handleIncrement}
          disabled={isPending || currentSold >= maxQuantity}
          className={`w-8 h-8 flex items-center justify-center text-white rounded transition-colors ${
            isPending || currentSold >= maxQuantity
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600"
          }`}
          type="button"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <title>Incrementar</title>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
      {message && (
        <div className="text-xs text-red-500 dark:text-red-400 text-center">
          {message}
        </div>
      )}
    </div>
  );
}