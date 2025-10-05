"use server";

import Image from "next/image";
import BusinessAnalysis from "@/components/BusinessAnalysis";
import ProductItem from "@/components/ProductItem";
import { getProducts, serializeProduct } from "@/lib/products";
import { PROJECT_MEMBERS } from "./lib/constants";

export default async function Dashboard() {
  const products = await getProducts();

  const serializedProducts = serializeProduct(products);

  const grandTotal = products.reduce(
    (sum, product) => sum + product.price * product.quantity_sold,
    0,
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Panel de Ventas
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Gestionar los productos y sus ventas
              </p>
            </div>
            <div className="flex items-center gap-3">
              <a href="/create-product">
                <button
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  type="button"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <title>Agregar</title>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Agregar
                </button>
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Lista de Productos
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-blue-500 dark:text-blue-400 uppercase tracking-wider">
                    Producto
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-blue-500 dark:text-blue-400 uppercase tracking-wider">
                    Precio
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-blue-500 dark:text-blue-400 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-semibold text-blue-500 dark:text-blue-400 uppercase tracking-wider">
                    Acciones
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-blue-500 dark:text-blue-400 uppercase tracking-wider">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <svg
                          className="w-16 h-16 text-gray-400 mb-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <title>No hay productos</title>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                          />
                        </svg>
                        <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">
                          No hay productos
                        </p>
                        <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
                          Haz clic en "Agregar" para añadir tu primer producto
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <ProductItem key={product.id} product={product} />
                  ))
                )}
              </tbody>
              <tfoot className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-4 text-right text-base font-bold text-gray-900 dark:text-white"
                  >
                    VALOR TOTAL:
                  </td>
                  <td className="px-6 py-4 text-right text-lg font-bold text-green-600 dark:text-green-400">
                    ${grandTotal.toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        <BusinessAnalysis products={serializedProducts} />
      </main>

      <footer className="mt-auto bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg border-gray-200 dark:border-gray-700">
            <div className="px-6 py-6">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-6">
                  <Image
                    src="/uni.png"
                    alt="Logo de la Universidad"
                    width={150}
                    height={150}
                    className="object-contain rounded-lg"
                  />

                  <div className="text-left space-y-2">
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                      Productify
                    </h4>
                    <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                      <p className="font-semibold">
                        Programación Orientada a Objetos
                      </p>
                      <p>Profesor: Carlos Alberto Bazán Cabanillas</p>
                      <p>Ciclo: 25-2</p>
                    </div>
                  </div>
                </div>

                <div className="text-center lg:text-right">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-blue-500 dark:text-blue-400 mb-3">
                      Miembros del Proyecto
                    </h3>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                      {PROJECT_MEMBERS.map((member) => (
                        <div
                          key={member}
                          className="bg-gray-50 dark:bg-gray-700/50 px-3 py-2 rounded-lg text-sm text-left font-medium text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600"
                        >
                          {member}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
