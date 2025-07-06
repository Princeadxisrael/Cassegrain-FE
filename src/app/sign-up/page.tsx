"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useToast } from "@/components/Toast";
import { connection, program } from "@/libs/program/connector";
import { AnchorProvider } from "@coral-xyz/anchor";
import { manufacturer } from "@/libs/db/manufacturer";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function SignUpPage() {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    certifications: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const wallet = useWallet();

  const roles = [
    "Manufacturer",
    "Distributor",
    "Retailer",
    "LogisticsProvider",
    "QualityInspector",
    "Consumer",
  ];
  useEffect(() => {
    setTimeout(() => {
      if (wallet.disconnecting) {
        window.location.href = "/";
      }
    }, 1000);

    if (wallet.publicKey) {
      const checkUser = async () => {
        const provider = new AnchorProvider(connection, wallet, {
          commitment: "confirmed",
        });
        const programClass = program(provider);
        const user = await manufacturer.manufacturerDetails(
          wallet.publicKey,
          programClass
        );

        if (user) {
          addToast("You already have an account", "error");
          setTimeout(() => {
            window.location.href = "/dashboard";
          }, 1000);
        }
      };
      checkUser();
    }
  }, [wallet.disconnecting, wallet.publicKey, wallet, addToast]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!acceptTerms) {
      addToast("Please accept the terms and conditions", "error");
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return;
    }

    try {
      // TODO: Implement Firebase authentication

      const provider = new AnchorProvider(connection, wallet, {
        commitment: "confirmed",
      });
      const programClass = program(provider);
      // Type assertion to fix the type mismatch
      const user = await manufacturer.register(
        {
          pubkey: wallet?.publicKey,
          companyName: formData.company,
          certifications: formData.certifications,
          role: formData.role,
        },
        programClass
      );
      console.log(user);
      // Simulate API call
    } catch {
      addToast("Registration failed. Please try again.", "error");
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="mx-auto h-16 w-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
            <div className="text-white font-bold text-2xl">C</div>
          </div>
          <h1 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">
            Join Cassegrain
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Create your supply chain verification account
          </p>
        </div>

        {/* Registration Form */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl px-8 py-10">
          {error && (
            <div className="mb-6 p-3 bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-700 text-red-700 dark:text-red-400 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Company Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="company"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Company *
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  required
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                  placeholder="Your Company Name"
                />
              </div>

              <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Role *
                </label>
                <select
                  id="role"
                  name="role"
                  required
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                >
                  <option value="">Select your role</option>
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="">
              <div>
                <label
                  htmlFor="company"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Certifications *
                </label>
                <input
                  id="certifications"
                  name="certifications"
                  type="text"
                  required
                  value={formData.certifications}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                  placeholder="Your Certifications"
                />
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start">
              <input
                id="acceptTerms"
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
              />
              <label
                htmlFor="acceptTerms"
                className="ml-3 block text-sm text-gray-700 dark:text-gray-300"
              >
                I agree to the{" "}
                <Link
                  href="/terms"
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-500"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-500"
                >
                  Privacy Policy
                </Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading || !acceptTerms}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating Account...
                </div>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="absolute top-4 right-4">
            <WalletMultiButton />
          </div>

          {/* <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500"
              >
                Sign in here
              </Link>
            </p>
          </div> */}
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Join thousands of companies securing their supply chain with
            blockchain verification
          </p>
        </div>
      </div>
    </div>
  );
}
