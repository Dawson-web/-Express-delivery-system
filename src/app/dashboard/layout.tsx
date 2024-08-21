"use client";
import Menu from "@/components/client/menu";
import { Toaster } from "@/components/ui/sonner";
import clsx from "clsx";
import { useState } from "react";
import RoutingGuard from "../provider/RoutingGuard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState<boolean>(false);
  RoutingGuard();
  return (
    <main
      className={clsx("flex  sm:flex-row  w-full  ", {
        "h-screen": open,
      })}
    >
      <Menu open={open} setOpen={setOpen} className="w-[30vw] " />

      <section
        className={clsx(
          "  grow w-[clac(100vw-1rem)] sm:w-[70vw]  p-[1rem] flex flex-col items-center  bg-gray-200 dark:bg-gray-900 min-h-screen"
        )}
      >
        {children}
      </section>
    </main>
  );
}
