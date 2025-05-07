import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'Daily Savings Manager',
  description: 'Created with RdTech',
}


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} cz-shortcut-listen="true">
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
