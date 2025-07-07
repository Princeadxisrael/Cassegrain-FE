"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/Dashboard";
import { AddProductModal } from "@/components/Products";
import { useWalletProvider } from "@/contexts/WalletProviderContext";
import { useToast } from "@/components/Toast";
import { program } from "@/libs/program/connector";
import { products as productsDB } from "@/libs/db/products";
import { useWallet } from "@solana/wallet-adapter-react";

// Mock data
const mockProducts = [
  {
    id: "PRD-001",
    name: "Premium Coffee Beans",
    description: "Single-origin Colombian coffee beans",
    category: "Food",
    manufacturer: "Colombian Coffee Co.",
    status: "verified",
    location: "Medellín, Colombia",
    createdAt: "2024-01-10T10:30:00Z",
    blockHash: "0x1234567890abcdef",
  },
  {
    id: "PRD-002",
    name: "Organic Cotton T-Shirt",
    description: "100% organic cotton t-shirt",
    category: "Textiles",
    manufacturer: "EcoTextile Mills",
    status: "pending",
    location: "Mumbai, India",
    createdAt: "2024-01-14T08:15:00Z",
  },
  {
    id: "PRD-003",
    name: "Smartphone Processor",
    description: "Advanced 5nm processor chip",
    category: "Electronics",
    manufacturer: "ChipTech Industries",
    status: "verified",
    location: "Hsinchu, Taiwan",
    createdAt: "2024-01-13T12:45:00Z",
    blockHash: "0xabcdef1234567890",
  },
];

export default function ProductsPage() {
  // const [products] = useState(mockProducts);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { addToast } = useToast();
  const [refresh, setRefresh] = useState(0);
  const { provider, connection, isConnected } = useWalletProvider();
  const { publicKey } = useWallet();

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  useEffect(() => {
    const getProducts = async () => {
      if (!isConnected || !provider || !connection) {
        return;
      }
      const programClass = program(provider);
      const productsItems = await productsDB.getProducts(programClass);
      setProducts(
        productsItems.filter(
          (product) =>
            product.account.manufacturer.toBase58() === publicKey?.toBase58()
        )
      );
    };

    getProducts();
  }, [isConnected, addToast, provider, connection, publicKey, refresh]);

  useEffect(() => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.manufacturer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((product) => product.status === statusFilter);
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter(
        (product) => product.category === categoryFilter
      );
    }

    setFilteredProducts(filtered);
  }, [searchTerm, statusFilter, categoryFilter, products]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "flagged":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return "✓";
      case "pending":
        return "⏳";
      case "flagged":
        return "⚠️";
      default:
        return "•";
    }
  };

  const handleAddProduct = (newProduct: any) => {
    setProducts((prev) => [...prev, newProduct]);
    setFilteredProducts((prev) => [...prev, newProduct]);
  };

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Product Management
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage your supply chain products and track their verification
            status
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center"
        >
          <svg
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-6 border border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Search
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Status</option>
              <option value="verified">Verified</option>
              <option value="pending">Pending</option>
              <option value="flagged">Flagged</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category
            </label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Categories</option>
              <option value="Food">Food</option>
              <option value="Electronics">Electronics</option>
              <option value="Textiles">Textiles</option>
              <option value="Pharmaceuticals">Pharmaceuticals</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
                setCategoryFilter("all");
              }}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Products ({filteredProducts.length})
            </h2>
            <div className="flex space-x-2">
              <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">
              Loading products...
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredProducts.map((product) => (
                  <tr
                    key={product?.account?.batchId}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-sm">
                            {product?.publicKey?.toBase58().charAt(0)}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {product?.publicKey?.toBase58()}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {/* {product?.publicKey?.toBase58()} */}
                            {product?.account?.batchId.toString().slice(0, 6)}
                            ...
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                          product?.account?.authenticityVerified
                            ? "verified"
                            : "pending"
                        )}`}
                      >
                        <span className="mr-1">
                          {getStatusIcon(
                            product?.account?.authenticityVerified
                              ? "verified"
                              : "pending"
                          )}
                        </span>
                        {product?.account?.authenticityVerified
                          ? "verified"
                          : "pending"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {product?.account?.category?.electronics
                        ? "Electronics"
                        : product?.account?.category?.food
                        ? "Food"
                        : product?.account?.category?.pharmaceuticals
                        ? "Pharmaceuticals"
                        : "Other"}
                    </td>
                    {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {product.location}
                        </td> */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(
                        product?.account?.createdAt.toNumber() * 1000
                      ).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Link
                          href={`/products/${product?.id}`}
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-500"
                        >
                          View
                        </Link>
                        <button className="text-gray-600 dark:text-gray-400 hover:text-gray-500">
                          Edit
                        </button>
                        {product?.blockHash && (
                          <span className="inline-flex items-center text-green-600 dark:text-green-400">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                            On-chain
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                  No products found
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Try adjusting your search criteria or add a new product.
                </p>
                <div className="mt-6">
                  <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Add Product
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add Product Modal */}
      <AddProductModal
        refresh={refresh}
        setRefresh={setRefresh}
        provider={provider}
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddProduct={handleAddProduct}
      />
    </DashboardLayout>
  );
}
