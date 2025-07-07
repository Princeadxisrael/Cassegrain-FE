import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { WalletConnectionProvider } from "@/libs/providers/WalletConnect";
import { ToastProvider, ToastContainer } from "@/components/Toast";
import { WalletProviderProvider } from "@/contexts/WalletProviderContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cassegrain",
  description:
    "Cassegrain- The Future of Supply Chain and Onchain Verification",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ToastProvider>
          <WalletConnectionProvider>
            <WalletProviderProvider>{children}</WalletProviderProvider>
          </WalletConnectionProvider>
          <ToastContainer />
        </ToastProvider>
      </body>
    </html>
  );
}
