"use server";

import { getProducts } from "@/lib/products";
import ProductActions from "@/components/ProductActions";

export default async function Dashboard() {
  const products = await getProducts()

  const grandTotal = products.reduce(
    (sum, product) => sum + product.price * product.quantity_sold,
    0,
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-md shadow-lg border-b border-gray-200 dark:border-white/10 sticky top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                Dashboard
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1.5 font-medium">
                Gestor de Ventas.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <a href="/create-product">
                <button className="flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg font-medium">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
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

      <main className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
        <div className="table-container">
          <div className="px-6 py-5 border-b border-gray-200 dark:border-white/10 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-t-xl">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
              Lista de Productos
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="table-header-sticky">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                    Producto
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                    Precio
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                    Acciones
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-white/5">
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <div className="p-4 bg-gray-100 dark:bg-white/5 rounded-full mb-4">
                          <svg
                            className="w-16 h-16 text-gray-400 dark:text-gray-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                            />
                          </svg>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 text-lg font-semibold">
                          No hay productos
                        </p>
                        <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">
                          Haz clic en "Agregar" para añadir tu primer producto
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  products.map((product) => {
                    const total = product.price * product.quantity_sold;
                    const available = product.quantity_max - product.quantity_sold;
                    
                    return (
                      <tr
                        key={product.id}
                        className="table-row-hover"
                      >
                        <td className="px-6 py-5 text-sm font-semibold text-gray-900 dark:text-white">
                          {product.name}
                        </td>
                        <td className="px-6 py-5 text-sm text-gray-600 dark:text-gray-400 text-right font-medium">
                          ${product.price.toFixed(2)}
                        </td>
                        <td className="px-6 py-5 text-sm text-gray-600 dark:text-gray-400 text-right">
                          <div className="flex flex-col items-end gap-1">
                            <span className="font-bold text-gray-900 dark:text-white">
                              {product.quantity_sold}/{product.quantity_max}
                            </span>
                            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                              available > 0 
                                ? "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400" 
                                : "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400"
                            }`}>
                              {available > 0 ? `${available} disponibles` : "Agotado"}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <ProductActions 
                            productId={product.id}
                            currentSold={product.quantity_sold}
                            maxQuantity={product.quantity_max}
                          />
                        </td>
                        <td className="px-6 py-5 text-sm font-bold text-gray-900 dark:text-white text-right">
                          ${total.toFixed(2)}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
              <tfoot className="table-footer-total">
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-5 text-right text-base font-bold text-gray-900 dark:text-white tracking-wide uppercase"
                  >
                    Valor Total:
                  </td>
                  <td className="px-6 py-5 text-right text-xl font-extrabold text-green-600 dark:text-green-400 tracking-tight">
                    ${grandTotal.toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
