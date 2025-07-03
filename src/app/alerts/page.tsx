"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// Mock alerts data
const mockAlerts = [
  {
    id: "alert_001",
    title: "Product Flagged",
    message:
      "Pharmaceutical Tablets (PRD-005) has been flagged for regulatory review",
    severity: "warning",
    timestamp: "2024-01-15T13:45:00Z",
    read: false,
    productId: "PRD-005",
    actionRequired: true,
  },
  {
    id: "alert_002",
    title: "Verification Complete",
    message: "Premium Coffee Beans (PRD-001) has been successfully verified",
    severity: "success",
    timestamp: "2024-01-11T14:20:00Z",
    read: true,
    productId: "PRD-001",
    actionRequired: false,
  },
  {
    id: "alert_003",
    title: "New Product Added",
    message: "Smartphone Processor (PRD-003) has been added to your inventory",
    severity: "info",
    timestamp: "2024-01-13T12:45:00Z",
    read: true,
    productId: "PRD-003",
    actionRequired: false,
  },
  {
    id: "alert_004",
    title: "Blockchain Confirmation",
    message: "Transaction confirmed on Solana blockchain",
    severity: "success",
    timestamp: "2024-01-10T11:00:00Z",
    read: false,
    actionRequired: false,
  },
  {
    id: "alert_005",
    title: "Verification Failed",
    message: "Unable to verify authenticity for product PRD-006",
    severity: "error",
    timestamp: "2024-01-09T16:30:00Z",
    read: false,
    productId: "PRD-006",
    actionRequired: true,
  },
];

export default function AlertsPage() {
  const [alerts, setAlerts] = useState(mockAlerts);
  const [filteredAlerts, setFilteredAlerts] = useState(mockAlerts);
  const [severityFilter, setSeverityFilter] = useState("all");
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 800);
  }, []);

  useEffect(() => {
    let filtered = alerts;

    if (severityFilter !== "all") {
      filtered = filtered.filter((alert) => alert.severity === severityFilter);
    }

    if (showUnreadOnly) {
      filtered = filtered.filter((alert) => !alert.read);
    }

    setFilteredAlerts(filtered);
  }, [alerts, severityFilter, showUnreadOnly]);

  const markAsRead = (alertId: string) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === alertId ? { ...alert, read: true } : alert
      )
    );
  };

  const markAllAsRead = () => {
    setAlerts((prev) => prev.map((alert) => ({ ...alert, read: true })));
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "error":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 border-red-200 dark:border-red-800";
      case "warning":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800";
      case "success":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-800";
      case "info":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 border-blue-200 dark:border-blue-800";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "error":
        return "🚨";
      case "warning":
        return "⚠️";
      case "success":
        return "✅";
      case "info":
        return "ℹ️";
      default:
        return "📢";
    }
  };

  const unreadCount = alerts.filter((alert) => !alert.read).length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/dashboard" className="flex items-center">
                <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">C</span>
                </div>
                <span className="ml-2 text-xl font-semibold text-gray-900 dark:text-white">
                  Cassegrain
                </span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
                >
                  Mark All Read ({unreadCount})
                </button>
              )}
              <Link
                href="/dashboard"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Alerts & Notifications
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Stay updated with system alerts, verification status, and regulatory
            notifications
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-6 border border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap items-center gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Severity
              </label>
              <select
                value={severityFilter}
                onChange={(e) => setSeverityFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="all">All Severities</option>
                <option value="error">Error</option>
                <option value="warning">Warning</option>
                <option value="success">Success</option>
                <option value="info">Info</option>
              </select>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="unreadOnly"
                checked={showUnreadOnly}
                onChange={(e) => setShowUnreadOnly(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="unreadOnly"
                className="ml-2 text-sm text-gray-700 dark:text-gray-300"
              >
                Show unread only
              </label>
            </div>
            <div className="ml-auto">
              <button
                onClick={() => {
                  setSeverityFilter("all");
                  setShowUnreadOnly(false);
                }}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Alert List */}
        <div className="space-y-4">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 animate-pulse"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
                  <div className="flex-1">
                    <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                  </div>
                </div>
              </div>
            ))
          ) : filteredAlerts.length === 0 ? (
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
                  d="M15 17h5l-5 5v-5z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 7H4l5-5v5z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                No alerts found
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                No alerts match your current filters.
              </p>
            </div>
          ) : (
            filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 transition-all duration-200 ${
                  !alert.read
                    ? "shadow-md ring-2 ring-blue-500/20"
                    : "hover:shadow-md"
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-lg ${getSeverityColor(
                      alert.severity
                    )}`}
                  >
                    {getSeverityIcon(alert.severity)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3
                          className={`text-lg font-semibold ${
                            !alert.read
                              ? "text-gray-900 dark:text-white"
                              : "text-gray-700 dark:text-gray-300"
                          }`}
                        >
                          {alert.title}
                          {!alert.read && (
                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                              New
                            </span>
                          )}
                        </h3>
                        <p className="mt-1 text-gray-600 dark:text-gray-400">
                          {alert.message}
                        </p>
                        <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <span>
                            {new Date(alert.timestamp).toLocaleString()}
                          </span>
                          {alert.productId && (
                            <>
                              <span className="mx-2">•</span>
                              <Link
                                href={`/products/${alert.productId}`}
                                className="text-blue-600 dark:text-blue-400 hover:text-blue-500"
                              >
                                View Product
                              </Link>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        {alert.actionRequired && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">
                            Action Required
                          </span>
                        )}
                        {!alert.read && (
                          <button
                            onClick={() => markAsRead(alert.id)}
                            className="text-blue-600 dark:text-blue-400 hover:text-blue-500 text-sm font-medium"
                          >
                            Mark as Read
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Load More */}
        {filteredAlerts.length > 0 && (
          <div className="mt-8 text-center">
            <button className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium">
              Load More Alerts
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
