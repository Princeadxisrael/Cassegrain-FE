"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { DashboardLayout } from "@/components/Dashboard";
import { useToast } from "@/components/Toast";

// Mock product data - in real app this would come from API
const mockProductData = {
  "PRD-001": {
    id: "PRD-001",
    name: "Premium Coffee Beans",
    description: "Single-origin Colombian coffee beans, grown at high altitude in the Huila region. These beans are carefully selected and processed to ensure maximum flavor and quality. Perfect for espresso and pour-over brewing methods.",
    category: "Food",
    manufacturer: "Colombian Coffee Co.",
    status: "verified",
    location: "Medellín, Colombia",
    createdAt: "2024-01-10T10:30:00Z",
    verifiedAt: "2024-01-11T14:20:00Z",
    blockHash: "0x1234567890abcdef1234567890abcdef12345678",
    transactionHash: "5K8wJc7nVtCzDzKM9rYqZxP3vF2A4sNbE1qR6tY9uI3o",
    ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
    certifications: ["Organic", "Fair Trade", "Rainforest Alliance"],
    specifications: {
      weight: "1 kg",
      roastLevel: "Medium",
      altitude: "1,800m",
      harvestDate: "2023-12-15",
      processMethod: "Washed"
    },
    supplyChain: [
      {
        step: "Harvest",
        location: "Huila, Colombia",
        date: "2023-12-15",
        verifier: "Farm Inspector",
        status: "completed"
      },
      {
        step: "Processing",
        location: "Local Mill, Colombia",
        date: "2023-12-20",
        verifier: "Quality Controller",
        status: "completed"
      },
      {
        step: "Export",
        location: "Bogotá Port, Colombia",
        date: "2024-01-05",
        verifier: "Export Authority",
        status: "completed"
      },
      {
        step: "Import",
        location: "Miami Port, USA",
        date: "2024-01-08",
        verifier: "Customs",
        status: "completed"
      },
      {
        step: "Distribution",
        location: "Regional Warehouse",
        date: "2024-01-10",
        verifier: "Colombian Coffee Co.",
        status: "completed"
      }
    ]
  },
  "PRD-002": {
    id: "PRD-002",
    name: "Organic Cotton T-Shirt",
    description: "100% organic cotton t-shirt made from sustainably grown cotton. Soft, comfortable, and environmentally friendly.",
    category: "Textiles",
    manufacturer: "EcoTextile Mills",
    status: "pending",
    location: "Mumbai, India",
    createdAt: "2024-01-14T08:15:00Z",
    certifications: ["GOTS Certified", "Organic"],
    specifications: {
      material: "100% Organic Cotton",
      weight: "180 GSM",
      size: "Medium",
      color: "Natural White"
    },
    supplyChain: [
      {
        step: "Cotton Farming",
        location: "Gujarat, India",
        date: "2023-11-01",
        verifier: "Organic Inspector",
        status: "completed"
      },
      {
        step: "Ginning",
        location: "Gujarat, India",
        date: "2023-12-01",
        verifier: "Quality Controller",
        status: "completed"
      },
      {
        step: "Spinning",
        location: "Mumbai, India",
        date: "2023-12-15",
        verifier: "Mill Manager",
        status: "completed"
      },
      {
        step: "Manufacturing",
        location: "Mumbai, India",
        date: "2024-01-14",
        verifier: "EcoTextile Mills",
        status: "pending"
      }
    ]
  },
  "PRD-003": {
    id: "PRD-003",
    name: "Smartphone Processor",
    description: "Advanced 5nm processor chip with enhanced AI capabilities and improved power efficiency.",
    category: "Electronics",
    manufacturer: "ChipTech Industries",
    status: "verified",
    location: "Hsinchu, Taiwan",
    createdAt: "2024-01-13T12:45:00Z",
    verifiedAt: "2024-01-13T16:45:00Z",
    blockHash: "0xabcdef1234567890abcdef1234567890abcdef12",
    transactionHash: "7M9xLe8pWvDaEaLN0sZrAyQ4wG3B5tOcF2rS7uZ0vJ4p",
    ipfsHash: "QmXcZ9pA5CZsnB724s2Yf3nemtYgPpHdWEz80ojWnPbdH",
    certifications: ["ISO 9001", "RoHS Compliant"],
    specifications: {
      architecture: "ARM64",
      cores: "8-core",
      frequency: "3.2 GHz",
      process: "5nm",
      cache: "12MB L3"
    },
    supplyChain: [
      {
        step: "Design",
        location: "San Jose, USA",
        date: "2023-10-01",
        verifier: "Design Team",
        status: "completed"
      },
      {
        step: "Wafer Fabrication",
        location: "Hsinchu, Taiwan",
        date: "2023-12-01",
        verifier: "Fab Engineer",
        status: "completed"
      },
      {
        step: "Testing",
        location: "Hsinchu, Taiwan",
        date: "2024-01-10",
        verifier: "QA Team",
        status: "completed"
      },
      {
        step: "Packaging",
        location: "Hsinchu, Taiwan",
        date: "2024-01-13",
        verifier: "ChipTech Industries",
        status: "completed"
      }
    ]
  }
};

// Mock transaction history
const mockTransactions = {
  "PRD-001": [
    {
      id: "tx_001",
      type: "creation",
      timestamp: "2024-01-10T10:30:00Z",
      blockHash: "0x1234567890abcdef1234567890abcdef12345678",
      transactionHash: "5K8wJc7nVtCzDzKM9rYqZxP3vF2A4sNbE1qR6tY9uI3o",
      status: "confirmed",
      description: "Product created on blockchain"
    },
    {
      id: "tx_002",
      type: "verification",
      timestamp: "2024-01-11T14:20:00Z",
      blockHash: "0x1234567890abcdef1234567890abcdef12345679",
      transactionHash: "6L9xKd8oWuDaEaLN9sZrAyQ3vG2B4tOcE1qR6tY8uI2n",
      status: "confirmed",
      description: "Product verified by Federal Trade Commission"
    }
  ],
  "PRD-002": [
    {
      id: "tx_003",
      type: "creation",
      timestamp: "2024-01-14T08:15:00Z",
      status: "pending",
      description: "Product creation pending blockchain confirmation"
    }
  ],
  "PRD-003": [
    {
      id: "tx_004",
      type: "creation",
      timestamp: "2024-01-13T12:45:00Z",
      blockHash: "0xabcdef1234567890abcdef1234567890abcdef12",
      transactionHash: "7M9xLe8pWvDaEaLN0sZrAyQ4wG3B5tOcF2rS7uZ0vJ4p",
      status: "confirmed",
      description: "Product created on blockchain"
    },
    {
      id: "tx_005",
      type: "verification",
      timestamp: "2024-01-13T16:45:00Z",
      blockHash: "0xabcdef1234567890abcdef1234567890abcdef13",
      transactionHash: "8N0yMf9qXwEbFbMO1tAsByR5xH4C6uPdG3sT8vA1wK5q",
      status: "confirmed",
      description: "Product verified by Electronics Certification Board"
    },
    {
      id: "tx_006",
      type: "transfer",
      timestamp: "2024-01-15T09:30:00Z",
      status: "pending",
      description: "Transfer to Electronics Distributor pending"
    }
  ]
};

export default function ProductViewPage() {


  const params = useParams();
  const router = useRouter();
  const { addToast } = useToast();
  const productId = params.id as string;

  const [product, setProduct] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      const productData = mockProductData[productId as keyof typeof mockProductData];
      const transactionData = mockTransactions[productId as keyof typeof mockTransactions] || [];
      
      if (productData) {
        setProduct(productData);
        setTransactions(transactionData);
      }
      setIsLoading(false);
    }, 1000);
  }, [productId]);



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
        return "✅";
      case "pending":
        return "⏳";
      case "flagged":
        return "⚠️";
      default:
        return "•";
    }
  };

  const getTransactionTypeColor = (type: string) => {
    switch (type) {
      case "creation":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      case "verification":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "transfer":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400";
      case "update":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const handleVerifyProduct = () => {
    addToast("Verification Initiated", "success");
  };

  const handleEditProduct = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      addToast("Product Updated", "success");
    }
  };

  const generateQRCode = () => {
    addToast("QR Code Generated", "info");
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600 dark:text-gray-400">Loading product...</span>
        </div>
      </DashboardLayout>
    );
  }

  if (!product) {
    return (
      <DashboardLayout>
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
            Product not found
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
           {`The product you're looking for doesn't exist or has been removed.`}
          </p>
          <div className="mt-6">
            <Link
              href="/products"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Back to Products
            </Link>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const tabs = [
    { id: "overview", label: "Overview", icon: "📋" },
    { id: "blockchain", label: "Blockchain", icon: "🔗" },
    { id: "supply-chain", label: "Supply Chain", icon: "🚚" },
    { id: "transactions", label: "Transactions", icon: "📊" }
  ];

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              href="/products"
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <div className="flex-shrink-0 h-12 w-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">
                {product.name.charAt(0)}
              </span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {product.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {product.id} • {product.manufacturer}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(product.status)}`}>
              <span className="mr-1">{getStatusIcon(product.status)}</span>
              {product.status}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 mb-8">
        <button
          onClick={handleEditProduct}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
        >
          {isEditing ? "Save Changes" : "Edit Product"}
        </button>
        {product.status !== "verified" && (
          <button
            onClick={handleVerifyProduct}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium"
          >
            Verify Product
          </button>
        )}
        <button
          onClick={generateQRCode}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium"
        >
          Generate QR Code
        </button>
        <Link
          href={`/verify-product?id=${product.id}`}
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium"
        >
          Public Verify
        </Link>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Product Details */}
            <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Product Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Description
                  </label>
                  <p className="text-gray-900 dark:text-white mt-1">
                    {product.description}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Category
                    </label>
                    <p className="text-gray-900 dark:text-white">
                      {product.category}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Location
                    </label>
                    <p className="text-gray-900 dark:text-white">
                      {product.location}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Created
                    </label>
                    <p className="text-gray-900 dark:text-white">
                      {new Date(product.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  {product.verifiedAt && (
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Verified
                      </label>
                      <p className="text-gray-900 dark:text-white">
                        {new Date(product.verifiedAt).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>
                {product.certifications && (
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Certifications
                    </label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {product.certifications.map((cert: string, index: number) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Specifications */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Specifications
              </h3>
              {product.specifications && (
                <div className="space-y-3">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key}>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </label>
                      <p className="text-gray-900 dark:text-white text-sm">
                        {value as string}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Blockchain Tab */}
        {activeTab === "blockchain" && (
          <div className="space-y-6">
            {product.blockHash ? (
              <>
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-8 w-8 text-green-600 dark:text-green-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">
                        Blockchain Verified
                      </h3>
                      <p className="text-green-700 dark:text-green-300">
                        This product is recorded on the Solana blockchain
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Blockchain Proof
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Block Hash
                      </label>
                      <div className="flex items-center space-x-2 mt-1">
                        <code className="flex-1 p-2 bg-gray-100 dark:bg-gray-700 rounded text-sm font-mono text-gray-900 dark:text-white break-all">
                          {product.blockHash}
                        </code>
                        <button className="text-blue-600 dark:text-blue-400 hover:text-blue-500 p-1">
                          📋
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Transaction Hash
                      </label>
                      <div className="flex items-center space-x-2 mt-1">
                        <code className="flex-1 p-2 bg-gray-100 dark:bg-gray-700 rounded text-sm font-mono text-gray-900 dark:text-white break-all">
                          {product.transactionHash}
                        </code>
                        <button className="text-blue-600 dark:text-blue-400 hover:text-blue-500 p-1">
                          📋
                        </button>
                      </div>
                    </div>
                    {product.ipfsHash && (
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          IPFS Hash
                        </label>
                        <div className="flex items-center space-x-2 mt-1">
                          <code className="flex-1 p-2 bg-gray-100 dark:bg-gray-700 rounded text-sm font-mono text-gray-900 dark:text-white break-all">
                            {product.ipfsHash}
                          </code>
                          <a
                            href={`https://ipfs.io/ipfs/${product.ipfsHash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 dark:text-blue-400 hover:text-blue-500 p-1"
                          >
                            🔗
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="mt-6 flex space-x-3">
                    <a
                      href={`https://explorer.solana.com/tx/${product.transactionHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium inline-flex items-center"
                    >
                      View on Explorer
                      <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-8 w-8 text-yellow-600 dark:text-yellow-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200">
                      Pending Blockchain Recording
                    </h3>
                    <p className="text-yellow-700 dark:text-yellow-300">
                      This product is not yet recorded on the blockchain
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Supply Chain Tab */}
        {activeTab === "supply-chain" && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Supply Chain Journey
            </h3>
            <div className="space-y-6">
              {product.supplyChain.map((step: any, index: number) => (
                <div key={index} className="relative">
                  <div className="flex items-start">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/20">
                      <div className={`w-3 h-3 rounded-full ${
                        step.status === "completed" 
                          ? "bg-green-500" 
                          : step.status === "pending"
                          ? "bg-yellow-500"
                          : "bg-gray-300"
                      }`}></div>
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                          {step.step}
                        </h4>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          step.status === "completed" 
                            ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                            : step.status === "pending"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                        }`}>
                          {step.status}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">
                        {step.location}
                      </p>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                        <span>{new Date(step.date).toLocaleDateString()}</span>
                        <span className="mx-2">•</span>
                        <span>Verified by {step.verifier}</span>
                      </div>
                    </div>
                  </div>
                  {index < product.supplyChain.length - 1 && (
                    <div className="absolute left-4 top-8 w-px h-6 bg-gray-200 dark:bg-gray-600"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Transactions Tab */}
        {activeTab === "transactions" && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Transaction History ({transactions.length})
              </h3>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {transactions.length > 0 ? (
                transactions.map((tx) => (
                  <div key={tx.id} className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTransactionTypeColor(tx.type)}`}>
                          {tx.type}
                        </span>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {tx.description}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {new Date(tx.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          tx.status === "confirmed" 
                            ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                        }`}>
                          {tx.status}
                        </span>
                        {tx.transactionHash && (
                          <a
                            href={`https://explorer.solana.com/tx/${tx.transactionHash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 dark:text-blue-400 hover:text-blue-500 text-sm"
                          >
                            View
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-6 py-8 text-center">
                  <p className="text-gray-500 dark:text-gray-400">
                    No transactions found for this product
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
} 