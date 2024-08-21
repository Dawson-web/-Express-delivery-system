import Link from "next/link";
import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import * as Form from "@radix-ui/react-form";

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

export default function CourieCard(props: any) {
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

  const [orderId, setOrderId] = useState("");

  const updateOrderMutation = useMutation({
    mutationFn: (v: any) =>
      $axios.post("/order/update", {
        id: orderId,
        status: v.status,
        currentLocation: v.currentLocation,
      }),
    onSuccess: (res) => {
      notifications.show({
        ...notificationSuccess,
        message: "物流更新成功",
      });
      // 更新成功后重新获取头像数据
      refetch(); // 触发 useQuery 的重新查询
    },
    onError(e) {
      notifications.show({
        ...notificationError,
        message: e.message,
      });
    },
  });

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
        <div className="flex gap-2 ">
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <button
                onClick={() => setOrderId(item.id)}
                className="text-violet11 shadow-blackA4 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none"
              >
                更新状态
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
              <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
                  更新物流状态
                </Dialog.Title>
                <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
                  请严格按照管理更新物流状态
                </Dialog.Description>
                <Form.Root
                  className="w-[360px] bg-gray-200/30 backdrop-blur p-6 rounded-md border-t-4 border-blue-600"
                  onSubmit={(event) => {
                    const data = Object.fromEntries(
                      new FormData(event.currentTarget)
                    );
                    console.log(data);
                    updateOrderMutation.mutate(data);
                    event.preventDefault();
                  }}
                >
                  <p className="flex justify-center items-center gap-2 w-full m-auto text-center text-[20px] font-bold leading-[35px]  mb-4">
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
                      <path d="M17 5c0-1.7-1.3-3-3-3s-3 1.3-3 3c0 .8.3 1.5.8 2H11c-3.9 0-7 3.1-7 7c0 2.2 1.8 4 4 4" />
                      <path d="M16.8 3.9c.3-.3.6-.5 1-.7 1.5-.6 3.3.1 3.9 1.6.6 1.5-.1 3.3-1.6 3.9l1.6 2.8c.2.3.2.7.2 1-.2.8-.9 1.2-1.7 1.1 0 0-1.6-.3-2.7-.6H17c-1.7 0-3 1.3-3 3" />
                      <path d="M13.2 18a3 3 0 0 0-2.2-5" />
                      <path d="M13 22H4a2 2 0 0 1 0-4h12" />
                      <path d="M16 9h.01" />
                    </svg>
                    | 更新
                  </p>
                  <Form.Field className="grid mb-[10px]" name="status">
                    <div className="flex items-baseline justify-between">
                      <Form.Label className="text-[15px] font-medium leading-[35px]  flex gap-2">
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
                          <path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4" />
                          <path d="M14 13.12c0 2.38 0 6.38-1 8.88" />
                          <path d="M17.29 21.02c.12-.6.43-2.3.5-3.02" />
                          <path d="M2 12a10 10 0 0 1 18-6" />
                          <path d="M2 16h.01" />
                          <path d="M21.8 16c.2-2 .131-5.354 0-6" />
                          <path d="M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2" />
                          <path d="M8.65 22c.21-.66.45-1.32.57-2" />
                          <path d="M9 6.8a6 6 0 0 1 9 5.2v2" />
                        </svg>{" "}
                        状态
                      </Form.Label>
                      <Form.Message
                        className="text-[13px]  opacity-[0.8]"
                        match="valueMissing"
                      >
                        Please enter your status
                      </Form.Message>
                    </div>
                    <Form.Control asChild>
                      <select>
                        <option value="2">已发货</option>
                        <option value="3">配送中</option>
                        <option value="4">已送达</option>
                      </select>
                    </Form.Control>
                  </Form.Field>
                  <Form.Field className="grid mb-[10px]" name="currentLocation">
                    <div className="flex items-baseline justify-between">
                      <Form.Label className="text-[15px] font-medium leading-[35px]  flex gap-2  ">
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
                          <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
                          <circle
                            cx="16.5"
                            cy="7.5"
                            r=".5"
                            fill="currentColor"
                          />
                        </svg>
                        currentLocation
                      </Form.Label>
                      <Form.Message
                        className="text-[13px]  opacity-[0.8]"
                        match="valueMissing"
                      >
                        Please enter your currentLocation
                      </Form.Message>
                    </div>
                    <Form.Control asChild>
                      <input
                        className="box-border w-full bg-blackA2 shadow-blackA6 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none  shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6"
                        type="text"
                        required
                      />
                    </Form.Control>
                  </Form.Field>

                  <Form.Submit asChild>
                    <button className="box-border w-full text-violet11 shadow-blackA4 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none mt-[10px]">
                      登录
                    </button>
                  </Form.Submit>
                </Form.Root>

                <div className="mt-[25px] flex justify-end">
                  <Dialog.Close asChild>
                    <button className="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
                      提交
                    </button>
                  </Dialog.Close>
                </div>
                <Dialog.Close asChild>
                  <button
                    className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                    aria-label="Close"
                  >
                    <Cross2Icon />
                  </button>
                </Dialog.Close>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </CardFooter>
    </Card>
  );
}
