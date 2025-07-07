"use client";

import React, { useState } from "react";
import { useToast } from "@/components/Toast";
import { useWallet } from "@solana/wallet-adapter-react";
import { products } from "@/libs/db/products";
import { program } from "@/libs/program/connector";
import { AnchorProvider, Program } from "@coral-xyz/anchor";

interface AddProductModalProps {
  refresh: number;
  setRefresh: (refresh: number) => void;
  provider: AnchorProvider;
  isOpen: boolean;
  onClose: () => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({
  refresh,
  setRefresh,
  provider,
  isOpen,
  onClose,
}) => {
  const { addToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    metadataIpfs: "",
    category: "",
    batchSize: "",
  });

  const { publicKey } = useWallet();

  const categories = [
    "electronics",
    "automotive",
    "pharmaceuticals",
    "food",
    "textiles",
    "luxury",
    "industrial",
    "other",
  ];
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    //if batchSize is not a number, return error
    if (isNaN(parseInt(formData.batchSize))) {
      addToast("Please enter a valid batch size", "error");
      return;
    }

    // Basic validation
    if (!formData.metadataIpfs || !formData.category || !formData.batchSize) {
      addToast("Please fill in all required fields", "error");
      return;
    }

    setIsLoading(true);

    const productBatch = {
      metadataIpfs: formData.metadataIpfs,
      batchSize: parseInt(formData.batchSize),
      user: publicKey,
      productCategory: formData.category,
    };

    try {
      const programClass = program(provider);
      const tx = await products.registerBatch(programClass, productBatch);
      // onAddProduct(newProduct);

      addToast(
        `${formData.metadataIpfs} has been successfully added to your inventory`,
        "success"
      );

      // Reset form
      setFormData({
        metadataIpfs: "",
        category: "",
        batchSize: "",
      });

      setRefresh(refresh + 1);

      onClose();
    } catch (error) {
      addToast("Failed to add product. Please try again.", "error");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed w-[100%]  top-0 left-0 bg-black/90 items-center justify-center min-h-screen px-10 pt-4 pb-20 text-center">
      {/* Background overlay */}
      {/* <div
          className="fixed inset-0 transition-opacity bg-black-500/40 "
          onClick={onClose}
        ></div> */}

      {/* Modal */}
      <div className="flex flex-row items-center justify-center min-h-screen px-10 pt-4 pb-20 text-center w-[100%]">
        <div className="shadow inline-block w-full max-w-4xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-800 shadow-xl rounded-2xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              Add New Product
            </h3>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Metadata IPFS *
                </label>
                <input
                  type="text"
                  name="metadataIpfs"
                  value={formData.metadataIpfs}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter IPFS metadata link"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="">Select category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Batch Size
              </label>
              <textarea
                name="batchSize"
                value={formData.batchSize}
                onChange={handleInputChange}
                rows={3}
                placeholder="Enter product batch size"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Footer */}
            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-600">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Adding...
                  </div>
                ) : (
                  "Add Product"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
