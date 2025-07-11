import Link from "next/link";
import React, { useState, useEffect } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { AnchorProvider } from "@coral-xyz/anchor";
import { manufacturer } from "@/libs/db/manufacturer";
import { connection, program } from "@/libs/program/connector";
import { useToast } from "@/components/Toast";
import UserItem from "@/libs/store/userstore";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const wallet = useWallet();
  const { addToast } = useToast();

  //check if the user is in the database
  useEffect(() => {
    const checkUser = async () => {
      if (wallet.connected && wallet.publicKey) {
        try {
          const provider = new AnchorProvider(connection, wallet, {
            commitment: "confirmed",
          });
          const programClass = program(provider); // Type assertion to fix the type mismatch
          const user = await manufacturer.manufacturerDetails(
            wallet.publicKey,
            programClass
          );
          // Handle the user data as needed
          if (!user) {
            addToast(
              "Welcome! Please complete your manufacturer registration.",
              "info"
            );
            setTimeout(() => {
              window.location.href = "/sign-up";
            }, 1000);
          } else {
            addToast(`Welcome back, ${user.companyName}!`, "success");
            UserItem.getState().setUser({
              companyName: user.companyName,
              role: user.businessType,
              certifications: user.certifications,
            });
            UserItem.getState().createSession();
            setTimeout(() => {
              window.location.href = "/dashboard";
            }, 1000);
          }
        } catch (error) {
          console.error("Error checking user:", error);
          addToast("Failed to load user data. Please try again.", "error");
        }
      }
    };

    checkUser();
  }, [wallet, addToast]);

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
              Cassegrain
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              How it Works
            </a>
            <a
              href="#testimonials"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Testimonials
            </a>
            <Link
              href="/verify-product"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Verify Product
            </Link>
            <div className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
              {wallet.connected ? (
                <div className="flex items-center space-x-4">
                  <Link
                    href="/dashboard"
                    className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    Dashboard
                  </Link>
                  <div
                    className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer"
                    onClick={() => {
                      wallet.disconnect();
                      window.location.href = "/";
                    }}
                  >
                    LogOut
                  </div>
                </div>
              ) : (
                <WalletMultiButton />
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 py-4 space-y-2">
            <a
              href="#features"
              className="block px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="block px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              How it Works
            </a>
            <a
              href="#testimonials"
              className="block px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              Testimonials
            </a>
            <Link
              href="/verify-product"
              className="block px-3 py-2 text-blue-600 dark:text-blue-400 font-medium"
            >
              Verify Product
            </Link>

            <div className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
              {wallet.connected ? (
                <div className="flex items-center space-x-4">
                  <Link
                    href="/dashboard"
                    className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    Dashboard
                  </Link>
                  <div
                    className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer"
                    onClick={() => {
                      wallet.disconnect();
                      window.location.href = "/";
                    }}
                  >
                    LogOut
                  </div>
                </div>
              ) : (
                <WalletMultiButton />
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
