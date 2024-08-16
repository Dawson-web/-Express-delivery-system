"use client";
import RegisterForm from "@/components/client/RegisterForm";

export default function Home() {
  return (
    <main className="flex min-w-40 min-h-screen flex-col items-center  justify-center p-24">
      <RegisterForm />
    </main>
  );
}
