"use client";

import { useState } from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/Dashboard";

export default function VerifyProductPage() {
  const [productId, setProductId] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleVerify = async () => {
    if (!productId.trim()) {
      setError("Please enter a product ID");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock verification result
      const mockResult = {
        isValid: true,
        product: {
          id: productId,
          name: "Premium Coffee Beans",
          manufacturer: "Colombian Coffee Co.",
          status: "verified",
          location: "Medellín, Colombia",
        },
        blockchainProof: {
          blockHash: "0x1234567890abcdef1234567890abcdef12345678",
          transactionId: "5K8wJc7nVtCzDzKM9rYqZxP3vF2A4sNbE1qR6tY9uI3o",
          timestamp: "2024-01-10T10:30:00Z",
          confirmations: 1247,
        },
        ipfsData: {
          hash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
          url: "https://ipfs.io/ipfs/QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        },
      };

      setVerificationResult(mockResult);
    } catch {
      setError("Verification failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const startQRScan = () => {
    setIsScanning(true);
    // In a real implementation, this would open camera for QR scanning
    setTimeout(() => {
      setProductId("PRD-001");
      setIsScanning(false);
    }, 2000);
  };

  return (
    <DashboardLayout>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Verify Product Authenticity
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Scan QR code or enter product ID to verify on-chain authenticity
        </p>
      </div>

      {!verificationResult ? (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
          {/* QR Scanner Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                Scan QR Code
              </h2>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-12 mb-6">
                {isScanning ? (
                  <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-400">
                      Scanning QR code...
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <svg
                      className="h-16 w-16 text-gray-400 mb-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                      />
                    </svg>
                    <p className="text-gray-600 dark:text-gray-400">
                      Position QR code in camera view
                    </p>
                  </div>
                )}
              </div>
              <button
                onClick={startQRScan}
                disabled={isScanning}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isScanning ? "Scanning..." : "Start QR Scan"}
              </button>
            </div>

            <div className="flex items-center lg:justify-center">
              <div className="text-center">
                <div className="text-gray-400 text-2xl font-bold mb-2">OR</div>
              </div>
            </div>
          </div>

          {/* Manual Input Section */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Enter Product ID
            </h2>
            <div className="max-w-md mx-auto">
              <div className="flex space-x-4">
                <input
                  type="text"
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                  placeholder="PRD-001"
                  className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
                <button
                  onClick={handleVerify}
                  disabled={isLoading}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Verifying...
                    </div>
                  ) : (
                    "Verify"
                  )}
                </button>
              </div>
              {error && (
                <p className="mt-3 text-red-600 dark:text-red-400 text-sm">
                  {error}
                </p>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Verification Results */
        <div className="space-y-6">
          {/* Status Banner */}
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
                  ✅ Product Verified!
                </h3>
                <p className="text-green-700 dark:text-green-300">
                  This product is authentic and verified on the blockchain
                </p>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Product Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Product ID
                </label>
                <p className="text-gray-900 dark:text-white font-mono">
                  {verificationResult.product.id}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Name
                </label>
                <p className="text-gray-900 dark:text-white">
                  {verificationResult.product.name}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Manufacturer
                </label>
                <p className="text-gray-900 dark:text-white">
                  {verificationResult.product.manufacturer}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Location
                </label>
                <p className="text-gray-900 dark:text-white">
                  {verificationResult.product.location}
                </p>
              </div>
            </div>
          </div>

          {/* Blockchain Proof */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Blockchain Proof
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Block Hash
                </label>
                <p className="text-gray-900 dark:text-white font-mono text-sm break-all">
                  {verificationResult.blockchainProof.blockHash}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Transaction ID
                </label>
                <p className="text-gray-900 dark:text-white font-mono text-sm break-all">
                  {verificationResult.blockchainProof.transactionId}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Timestamp
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {new Date(
                      verificationResult.blockchainProof.timestamp
                    ).toLocaleString()}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Confirmations
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {verificationResult.blockchainProof.confirmations.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* IPFS Data */}
          {verificationResult.ipfsData && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                IPFS Metadata
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    IPFS Hash
                  </label>
                  <p className="text-gray-900 dark:text-white font-mono text-sm break-all">
                    {verificationResult.ipfsData.hash}
                  </p>
                </div>
                <div>
                  <a
                    href={verificationResult.ipfsData.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-500"
                  >
                    View on IPFS
                    <svg
                      className="ml-1 h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => {
                setVerificationResult(null);
                setProductId("");
              }}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium"
            >
              Verify Another Product
            </button>
            <Link
              href="/dashboard"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium inline-flex items-center"
            >
              Return to Dashboard
            </Link>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
