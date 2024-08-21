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
import { useMutation, useQuery } from "@tanstack/react-query";
import { $axios } from "@/app/api";
import { notifications } from "@mantine/notifications";
import {
  notificationError,
  notificationSuccess,
} from "@/constants/notifications";

export interface Field {
  id: string;
  additionalInfo: string;
  companyId: string;
  isReturn: string;
  itemId: string;
  recipientLocation: string;
  recipientPhone: string;
  senderLocation: string;
  senderPhone: string;
  shippingMethod: string;
  stationId: string;
}

export default function StationCard(props: any) {
  const { item } = props;
  const Status = (status: number) => {
    switch (status) {
      case 0:
        return <span className="text-red-500">待收件</span>;
      case 1:
        return <span className="text-green-500">已收件</span>;
      case 2:
        return <span className="text-blue-500">已发货</span>;
      case 3:
        return <span className="text-yellow-500">配送中</span>;
      case 4:
        return <span className="text-green-500">已送达</span>;
      case 5:
        return <span className="text-red-500">已签收</span>;
    }
  };

  const confirmOrderMutation = useMutation({
    mutationFn: (v: any) =>
      $axios.post("/station/confirmOrder", { id: item.id, status: 1 }),
    onSuccess: () => {
      notifications.show({
        ...notificationSuccess,
        message: "已收件，请尽快发出",
      });
    },
    onError(e) {
      notifications.show({
        ...notificationError,
        message: e.message,
      });
    },
  });
  let img = "";
  const { isSuccess, data, refetch } = useQuery({
    queryKey: ["item"],
    queryFn: () => $axios.get("/item/list", {}),
  });

  for (let i = 0; i < data?.data.data.length; i++) {
    if (data?.data.data[i].id == item.itemId) {
      img = data?.data.data[i].img;
    }
  }

  return (
    <Card className="  shadow-lg w-full   ">
      <CardHeader className="felx  flex-row items-start justify-start gap-8">
        <img src={img} alt="image" className="h-24 w-24 object-cover" />
        <CardTitle className="  font-normal break-words h-full overflow-hidden text-ellipsis text-sm  text-gray-600">
          <ul>
            <li>订单号：{item.id}</li>
            <li>寄件人电话号：{item.senderPhone}</li>
            <li>收件人电话号：{item.recipientPhone}</li>
            <li>备注：{item.additionalInfo}</li>

            <li>
              支付方式：
              {item.shippingMethod == 0
                ? "微信支付"
                : item.shippingMethod == 1
                ? "支付宝支付"
                : "货到付款"}
            </li>
            <li>下单时间：{item.createTime}</li>
          </ul>
        </CardTitle>
      </CardHeader>
      <CardContent className=" w-full  ">
        <div className="font-bold">
          运输：{item.senderLocation} —— {item.recipientLocation} | 订单费用：
          {item.shippingFee}
        </div>
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
          <span> 状态：{Status(item.status)} |</span>
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
            <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span> 当前位置：{item.currentLocation || "暂无信息"}</span>
        </div>
        <div className="items-start"></div>
      </CardContent>
      <CardFooter className="flex justify-end self-end mt-[-10px]">
        {item.status == 0 ? (
          <div className="flex gap-2 ">
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => {
                confirmOrderMutation.mutate(item.id);
              }}
            >
              确认收货
            </Button>
          </div>
        ) : (
          ""
        )}
      </CardFooter>
    </Card>
  );
}
