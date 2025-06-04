import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Team1 - Final Semi Project",
  description: "Team1 - Final Semi Project",
};

interface RootLayoutProps {
  children: ReactNode;
  modal?: ReactNode;
}

export default function RootLayout({ children, modal }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="relative">
        <Header />
        <main className="w-screen pt-14 pb-10">{children}</main>
        {modal ? modal : null}
      </body>
    </html>
  );
}
