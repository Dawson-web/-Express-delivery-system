import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { Button } from "../ui/button";
export default function IndexCard(props: any) {
  const [index, setIndex] = useState(props.index);

  return (
    <Card className="  shadow-lg w-full ">
      <img
        src="/avatar.jpeg"
        alt="image"
        className="h-48 w-full object-cover rounded-t-lg"
      />
      <CardHeader>
        <CardTitle className=" hover:text-zinc-400 ">
          <Link href={`blog/${index.title}`} legacyBehavior passHref>
            {index.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className=" w-[90%] ">
        <p className="truncate text-nowrap text-gray-600">
          摘要：{index.introduction}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between self-end ">
        <div className="text-[#00668c] flex bg-blue-200 px-2 py-1 rounded-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 10" />
          </svg>
          <span className="ml-2 ">{index.date}</span>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Link href={`blog/${index.title}`} legacyBehavior passHref>
            阅读
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
