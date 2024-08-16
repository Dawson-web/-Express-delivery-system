"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image"; // 如果你使用的是Next.js

export default function OperationPanel() {
  const avatarImage = "/avatar.jpeg";

  return (
    <main className=" gap-4  shadow-xl sm:mt-[8px] mt-[40px]">
      <Card className="cursor-default grid grid-cols-3 grid-rows-1 gap-4 h-[200px] p-4">
        <CardContent className="rounded-lg flex justify-around items-center bg-yellow-400 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="120"
            height="120"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="text-white"
          >
            <path d="M7 2h10" />
            <path d="M5 6h14" />
            <rect width="18" height="12" x="3" y="10" rx="2" />
          </svg>
          <span className="text-white font-bold text-2xl">全部订单</span>
        </CardContent>
        <CardContent className="rounded-lg flex justify-around items-center bg-blue-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="120"
            height="120"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="text-white"
          >
            <path d="M8 6v6" />
            <path d="M15 6v6" />
            <path d="M2 12h19.6" />
            <path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3" />
            <circle cx="7" cy="18" r="2" />
            <path d="M9 18h5" />
            <circle cx="16" cy="18" r="2" />
          </svg>
          <span className="text-white font-bold text-2xl">寄件信息</span>
        </CardContent>
        <CardContent className="rounded-lg flex justify-around items-center bg-purple-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="120"
            height="120"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="text-white"
          >
            <circle cx="12" cy="5" r="3" />
            <path d="M6.5 8a2 2 0 0 0-1.905 1.46L2.1 18.5A2 2 0 0 0 4 21h16a2 2 0 0 0 1.925-2.54L19.4 9.5A2 2 0 0 0 17.48 8Z" />
          </svg>
          <span className="text-white font-bold text-2xl">售后信息</span>
        </CardContent>
      </Card>
    </main>
  );
}
