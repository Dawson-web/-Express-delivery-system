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
interface LoginForm {
  email: string | null;
  username: string | null;
  password: string;
}

export default function LoginForm() {
  const errorTimes = useRef(0);
  const router = useRouter();
  const loginMutation = useMutation({
    mutationFn: (v: LoginForm) =>
      $axios.post(
        "/user/token",
        {
          email: v.email,
          username: v.username,
          password: v.password,
        },
        {
          params: {
            type: v.email ? "EMAIL_AND_PASSWORD" : "USERNAME_AND_PASSWORD",
          },
        }
      ),
    onSuccess: (res) => {
      notifications.show({
        ...notificationSuccess,
        message: "登录成功",
      });
      setToken(res.data.data);
      $axios.get("/user/myInfo").then((_res) => {
        console.log(_res.data.data);

        localStorage.setItem("role", _res.data.data.role);
        router.push("/dashboard");
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
      className="w-[360px] bg-gray-200/30 backdrop-blur p-6 rounded-md border-t-4 border-blue-600"
      onSubmit={(event) => {
        const data = Object.fromEntries(new FormData(event.currentTarget));
        const loginForm = jd(data);
        // prevent default form submission
        loginMutation.mutate(loginForm);
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
        | 登录
      </p>
      <Form.Field className="grid mb-[10px]" name="account">
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
            Email | UserName
          </Form.Label>
          <Form.Message
            className="text-[13px]  opacity-[0.8]"
            match="valueMissing"
          >
            Please enter your account
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input
            className="box-border w-full bg-blackA2 shadow-blackA6 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none  shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6"
            type="account"
            required
          />
        </Form.Control>
      </Form.Field>
      <Form.Field className="grid mb-[10px]" name="password">
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
              <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
            </svg>
            Password
          </Form.Label>
          <Form.Message
            className="text-[13px]  opacity-[0.8]"
            match="valueMissing"
          >
            Please enter your password
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input
            className="box-border w-full bg-blackA2 shadow-blackA6 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none  shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6"
            type="password"
            required
          />
        </Form.Control>
      </Form.Field>
      {errorTimes.current >= 2 ? (
        <Link href="/seekback" className="text-xs opacity-50 hover:opacity-75">
          忘记密码？前往找回
        </Link>
      ) : (
        <Link href="/register" className="text-xs opacity-50 hover:opacity-75">
          没有账号？前往注册
        </Link>
      )}
      <Form.Submit asChild>
        <button className="box-border w-full text-violet11 shadow-blackA4 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none mt-[10px]">
          登录
        </button>
      </Form.Submit>
    </Form.Root>
  );
}
