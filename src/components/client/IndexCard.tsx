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
      <Link href={`blog/${index.title}`} legacyBehavior passHref>
        <CardHeader className="felx  flex-row items-start justify-start gap-8">
          <img
            src="/avatar.jpeg"
            alt="image"
            className="h-24 w-24 object-cover"
          />
          <CardTitle className=" hover:text-zinc-400 font-normal break-words h-full overflow-hidden text-ellipsis text-sm  text-gray-600">
            订单号：XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
          </CardTitle>
        </CardHeader>
      </Link>
      <CardContent className=" w-full  ">
        <div className="flex truncate gap-2 text-nowrap bg-gray-100 text-gray-600 border-gray-200 border-[1px] p-2 rounded-md overflow-hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z" />
            <path d="m7 16.5-4.74-2.85" />
            <path d="m7 16.5 5-3" />
            <path d="M7 16.5v5.17" />
            <path d="M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z" />
            <path d="m17 16.5-5-3" />
            <path d="m17 16.5 4.74-2.85" />
            <path d="M17 16.5v5.17" />
            <path d="M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z" />
            <path d="M12 8 7.26 5.15" />
            <path d="m12 8 4.74-2.85" />
            <path d="M12 13.5V8" />
          </svg>
          <span> 物流状态：XXXXXXXX </span>
          <span> | 当前位置：XXXXXXXXX</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end self-end ">
        <div className="flex gap-2 ">
          <Button className="bg-gray-100 hover:bg-gray-200 border-gray border-[1px] text-black ">
            <Link href={`blog/${index.title}`} legacyBehavior passHref>
              申请售后
            </Link>
          </Button>
          <Button className="bg-gray-100 hover:bg-gray-200 border-gray border-[1px] text-black ">
            <Link href={`blog/${index.title}`} legacyBehavior passHref>
              查看详情
            </Link>
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Link href={`blog/${index.title}`} legacyBehavior passHref>
              确认收货
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
