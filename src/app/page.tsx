"use client";
import { redirect } from "next/navigation";
export default function Home() {
  redirect(`login`);
  return (
    <main className="flex min-w-40 min-h-screen flex-col items-center  justify-center p-24">
      cc
    </main>
  );
}
