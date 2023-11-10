"use client";
import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { ContractProvider } from "@/contexts/contractContext";
import { MetamaskProvider } from "@/hooks/useMetamask";
import NotificationProvider from "@/contexts/notificationContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MetamaskProvider>
          <NotificationProvider>
            <ContractProvider>{children}</ContractProvider>
          </NotificationProvider>
        </MetamaskProvider>
      </body>
    </html>
  );
}
