"use client";
import React, { useRef, useState } from "react";
import * as Form from "@radix-ui/react-form";
import Link from "next/link";
import { jd } from "@/utils/jd";
import { useMutation } from "@tanstack/react-query";
import { $axios } from "@/app/api";
import { useRouter } from "next/navigation";
import {
  notificationError,
  notificationSuccess,
} from "@/constants/notifications";
import { notifications } from "@mantine/notifications";
import { setToken } from "@/app/api/token";
interface CompanyForm {
  name: string;
  address: string;
  uid: string;
  businessHours: string;
}

export default function AddStation() {
  const addStationMutation = useMutation({
    mutationFn: (v: CompanyForm) =>
      $axios.post("/station/create", {
        name: v.name,
        address: v.address,
        businessHours: v.businessHours,
        uid: v.uid,
      }),
    onSuccess: (res) => {
      notifications.show({
        ...notificationSuccess,
        message: "驿站已纳入管理",
      });
    },
    onError(e) {
      notifications.show({
        ...notificationError,
        message: e.message,
      });
    },
  });
  return (
    <Form.Root
      className="w-[80%] bg-gray-200/30 backdrop-blur p-6 rounded-md border-[2px] ml-[10%]"
      onSubmit={(event) => {
        const data = Object.fromEntries(
          new FormData(event.currentTarget)
        ) as unknown as CompanyForm;
        addStationMutation.mutate(data);
        event.preventDefault();
      }}
    >
      <Form.Field className="grid mb-[10px]" name="uid">
        <div className="flex items-baseline justify-between">
          <Form.Label className="text-[15px] font-medium leading-[35px] flex gap-2 ">
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
              class="lucide lucide-id-card"
            >
              <path d="M16 10h2" />
              <path d="M16 14h2" />
              <path d="M6.17 15a3 3 0 0 1 5.66 0" />
              <circle cx="9" cy="11" r="2" />
              <rect x="2" y="5" width="20" height="14" rx="2" />
            </svg>
            站长Uid：
          </Form.Label>
          <Form.Message
            className="text-[13px]  opacity-[0.8]"
            match="valueMissing"
          >
            Please enter your uid
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input
            className="box-border w-full bg-blackA2 shadow-blackA6 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none  shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6"
            type="uid"
            required
          />
        </Form.Control>
      </Form.Field>
      <Form.Field className="grid mb-[10px]" name="name">
        <div className="flex items-baseline justify-between">
          <Form.Label className="text-[15px] font-medium leading-[35px] flex gap-2 ">
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
              class="lucide lucide-house"
            >
              <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
              <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            </svg>{" "}
            驿站名：
          </Form.Label>
          <Form.Message
            className="text-[13px]  opacity-[0.8]"
            match="valueMissing"
          >
            Please enter your name
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input
            className="box-border w-full bg-blackA2 shadow-blackA6 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none  shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6"
            type="name"
            required
          />
        </Form.Control>
      </Form.Field>
      <Form.Field className="grid mb-[10px]" name="address">
        <div className="flex items-baseline justify-between">
          <Form.Label className="text-[15px] font-medium leading-[35px] flex gap-2 ">
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
              class="lucide lucide-map-pinned"
            >
              <path d="M18 8c0 3.613-3.869 7.429-5.393 8.795a1 1 0 0 1-1.214 0C9.87 15.429 6 11.613 6 8a6 6 0 0 1 12 0" />
              <circle cx="12" cy="8" r="2" />
              <path d="M8.714 14h-3.71a1 1 0 0 0-.948.683l-2.004 6A1 1 0 0 0 3 22h18a1 1 0 0 0 .948-1.316l-2-6a1 1 0 0 0-.949-.684h-3.712" />
            </svg>
            驿站地址：
          </Form.Label>
          <Form.Message
            className="text-[13px]  opacity-[0.8]"
            match="valueMissing"
          >
            Please enter your address
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input
            className="box-border w-full bg-blackA2 shadow-blackA6 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none  shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6"
            type="address"
            required
          />
        </Form.Control>
      </Form.Field>
      <Form.Field className="grid mb-[10px]" name="businessHours">
        <div className="flex items-baseline justify-between">
          <Form.Label className="text-[15px] font-medium leading-[35px] flex gap-2 ">
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
              class="lucide lucide-clock"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>{" "}
            营业时间
          </Form.Label>
          <Form.Message
            className="text-[13px]  opacity-[0.8]"
            match="valueMissing"
          >
            Please enter your businessHours
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input
            className="box-border w-full bg-blackA2 shadow-blackA6 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none  shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6"
            type="businessHours"
            required
          />
        </Form.Control>
      </Form.Field>

      <Form.Submit asChild>
        <button className="box-border w-full text-violet11 shadow-blackA4 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none mt-[10px]">
          添加
        </button>
      </Form.Submit>
    </Form.Root>
  );
}
