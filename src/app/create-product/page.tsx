"use client";

import { useState, useTransition } from "react";
import { createProductAction } from "./actions";

type Message = { type: "success" | "error"; text: string } | null;

export default function CreateProduct() {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<Message>(null);

  const handleSubmit = async (formData: FormData) => {
    setMessage(null);

    startTransition(async () => {
      const result = await createProductAction(formData);

      if (result.error) {
        setMessage({ type: "error", text: result.error });
      } else if (result.success) {
        setMessage({
          type: "success",
          text: `Product "${result.product?.name}" created successfully!`,
        });

        const form = document.getElementById("product-form") as HTMLFormElement;
        form?.reset();
      }
    });
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Create Product</h1>

      {message && (
        <div
          className={`mb-4 p-3 rounded ${
            message.type === "success"
              ? "bg-green-100 text-green-700 border border-green-300"
              : "bg-red-100 text-red-700 border border-red-300"
          }`}
        >
          {message.text}
        </div>
      )}

      <form id="product-form" action={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Product Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter product name"
          />
        </div>

        <div>
          <label
            htmlFor="quantity_max"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Maximum Quantity *
          </label>
          <input
            type="number"
            id="quantity_max"
            name="quantity_max"
            min="1"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter maximum quantity"
          />
        </div>

        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Price ($) *
          </label>
          <input
            type="number"
            id="price"
            name="price"
            min="0"
            step="0.01"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter price"
          />
        </div>

        <div>
          <label
            htmlFor="quantity_sold"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Initial Sold Quantity (optional)
          </label>
          <input
            type="number"
            id="quantity_sold"
            name="quantity_sold"
            min="0"
            defaultValue="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter initial sold quantity (default: 0)"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className={`w-full py-2 px-4 rounded-md font-medium ${
            isPending
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          } text-white transition-colors`}
        >
          {isPending ? "Creating..." : "Create Product"}
        </button>
      </form>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <a
          href="/"
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          ← Back to Products
        </a>
      </div>
    </div>
  );
}
