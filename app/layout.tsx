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
<<<<<<< HEAD
    <html lang="en">   
      <body>
        <div className="pt-20">
          <Header />
          <main>{children}</main>
        </div>     
=======
    <html lang="en">
      <body className="relative">
        <Header />
        <main className="w-screen pt-14 pb-10">{children}</main>
        {modal ? modal : null}
>>>>>>> e39abd67d1c2bf047891ea71e677fc4b20be8b18
      </body>
    </html>
  );
}
