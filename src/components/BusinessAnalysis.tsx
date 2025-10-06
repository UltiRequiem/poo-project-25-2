"use client";

import { useCallback, useEffect, useState } from "react";
import type { Product } from "@/types/product";
import { generate } from "@/app/api/analysis/actions";
import { readStreamableValue } from "@ai-sdk/rsc";

interface BusinessAnalysisProps {
  products: Product[];
}

export default function BusinessAnalysis({ products }: BusinessAnalysisProps) {
  const [analysis, setAnalysis] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  const fetchAnalysis = useCallback(async () => {
    if (products.length === 0) return;

    setAnalysis("");
    setIsAnalyzing(true);

    const { output } = await generate(JSON.stringify(products));

    for await (const delta of readStreamableValue(output)) {
      setAnalysis((currentAnalysis) => `${currentAnalysis}${delta}`);
    }

    setIsAnalyzing(false);
  }, [products]);

  useEffect(() => {
    fetchAnalysis();
  }, [fetchAnalysis]);

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <svg
              className="w-6 h-6 text-blue-600 dark:text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <title>Análisis de Negocio con IA</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2-2V7a2 2 0 012-2h2a2 2 0 002 2v2a2 2 0 002 2h2a2 2 0 012-2V7a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 00-2 2h-2a2 2 0 00-2 2v6a2 2 0 01-2 2H9z"
              />
            </svg>
            Análisis de Negocio con IA
          </h2>
          <button
            onClick={fetchAnalysis}
            disabled={isAnalyzing}
            className="flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            type="button"
          >
            <svg
              className={`w-4 h-4 ${isAnalyzing ? "animate-spin" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <title>Actualizar Análisis</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            {isAnalyzing ? "Analizando..." : "Actualizar"}
          </button>
        </div>
      </div>

      <div className="px-6 py-4">
        {!analysis && (
          <div className="flex items-center justify-center py-8">
            <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
              <svg
                className="w-6 h-6 animate-spin"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <title>Generando Análisis</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              <span>Generando análisis con IA...</span>
            </div>
          </div>
        )}

        {/* {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <div className="flex items-center gap-2 text-red-800 dark:text-red-400">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <title>Error</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="font-medium">Error al generar análisis</span>
            </div>
            <p className="text-red-700 dark:text-red-300 text-sm mt-1">
              {error}
            </p>
          </div>
        )} */}

        {analysis && (
          <div className="prose prose-gray dark:prose-invert max-w-none">
            {analysis}
          </div>
        )}

        {!analysis && !isAnalyzing && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <svg
              className="w-12 h-12 mx-auto mb-3 opacity-50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <title>Análisis Vacio</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2-2V7a2 2 0 012-2h2a2 2 0 002 2v2a2 2 0 002 2h2a2 2 0 012-2V7a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 00-2 2h-2a2 2 0 00-2 2v6a2 2 0 01-2 2H9z"
              />
            </svg>
            <p>
              Haz clic en "Actualizar" para generar un análisis de tus productos
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
