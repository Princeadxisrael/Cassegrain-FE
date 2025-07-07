"use client";

import React, { useState } from "react";
import Sidebar from "./Sidebar";
import UserItem from "@/libs/store/userstore";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const user = UserItem.getState().user;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {sidebarOpen && (
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      )}

      {/* Main content */}
      <div className="w-full h-screen overflow-auto ">
        <div className=" sticky py-4 top-0 z-30 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open sidebar</span>
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

            <div className="flex-1 lg:hidden">
              <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                Dashboard
              </h1>
            </div>

           

            <div className="flex flex-row items-center space-x-4 justify-between">
              <button className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
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
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <span className="sr-only">Notifications</span>
              </button>
            </div>

            <div className="">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Welcome back, {user?.companyName}
              </h1>
        
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-4  sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
