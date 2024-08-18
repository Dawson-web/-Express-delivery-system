import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const inter = Inter({ subsets: ["latin"] });
import ReactQueryProvider from "./provider/ReactQueryProvider";

export const metadata: Metadata = {
  title: "Dawson's World",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 连接数据库
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased bg-cover bg-[url('https://w.wallhaven.cc/full/d6/wallhaven-d6jzdg.jpg')]",

          fontSans.variable
        )}
      >
        <MantineProvider>
          <Notifications position="top-center" />

          <ReactQueryProvider>{children}</ReactQueryProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
