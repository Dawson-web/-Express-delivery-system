"use client";
import React, { useRef, useState } from "react";
import * as Form from "@radix-ui/react-form";
import Link from "next/link";
import {} from "next/router";
import { useRouter } from "next/navigation";
import { $axios } from "@/app/api";
import { useMutation } from "@tanstack/react-query";
import {
  notificationError,
  notificationSuccess,
} from "@/constants/notifications";
import { notifications } from "@mantine/notifications";

interface RegisterForm {
  username: string;
  email: string;
  password: string;
  code: string;
}

export default function RegisterForm() {
  const [registerForm, setRegisterForm] = useState<RegisterForm>({
    username: "",
    email: "",
    password: "",
    code: "",
  });
  const [pace, setPace] = useState(0);
  const router = useRouter();

  const getEmailCodeMutation = useMutation({
    mutationFn: (v: RegisterForm) =>
      $axios.post("/verifyCode", {
        email: v.email,
      }),
    onSuccess: () => {
      setPace(1);
      notifications.show({
        ...notificationSuccess,
        message: "验证码已发送至邮箱，请查收",
      });
    },
    onError(e) {
      notifications.show({
        ...notificationError,
        message: e.message,
      });
    },
  });
  const registerMutation = useMutation({
    mutationFn: (v: RegisterForm) =>
      $axios.post(
        "/register",
        {
          email: v.email,
          password: v.password,
          name: v.username,
        },
        {
          params: {
            code: v.code,
          },
        }
      ),
    onSuccess: () => {
      setPace(2);
      notifications.show({
        ...notificationSuccess,
        message: "账号注册成功",
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
    <div>
      {pace === 0 ? (
        <Form.Root
          className="w-[360px] bg-gray-200/30 backdrop-blur p-6 rounded-md border-[2px] "
          onSubmit={(event) => {
            const data = Object.fromEntries(new FormData(event.currentTarget));
            // prevent default form submission
            console.log(data);
            setRegisterForm(data as unknown as RegisterForm);
            // $axios.post("/verifyCode", { email: data.email });

            console.log(registerForm);
            getEmailCodeMutation.mutate(data as unknown as RegisterForm);

            event.preventDefault();
          }}
        >
          <p className="flex justify-center items-center gap-2 w-full m-auto text-center text-[20px] font-bold leading-[35px] text-white mb-4">
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
            | 注册
          </p>
          <Form.Field className="grid mb-[10px]" name="username">
            <div className="flex items-baseline justify-between">
              <Form.Label className="text-[15px] font-medium leading-[35px] text-white">
                Username
              </Form.Label>
              <Form.Message
                className="text-[13px] text-white opacity-[0.8]"
                match="valueMissing"
              >
                Please enter your username
              </Form.Message>
            </div>
            <Form.Control asChild>
              <input
                className="box-border w-full bg-blackA2 shadow-blackA6 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none  shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6"
                type="username"
                required
              />
            </Form.Control>
          </Form.Field>
          <Form.Field className="grid mb-[10px]" name="email">
            <div className="flex items-baseline justify-between">
              <Form.Label className="text-[15px] font-medium leading-[35px] text-white">
                Email
              </Form.Label>
              <Form.Message
                className="text-[13px] text-white opacity-[0.8]"
                match="valueMissing"
              >
                Please enter your email
              </Form.Message>
              <Form.Message
                className="text-[13px] text-white opacity-[0.8]"
                match="typeMismatch"
              >
                Please provide a valid email
              </Form.Message>
            </div>
            <Form.Control asChild>
              <input
                className="box-border w-full bg-blackA2 shadow-blackA6 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none  shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6"
                type="email"
                required
              />
            </Form.Control>
          </Form.Field>
          <Form.Field className="grid mb-[10px]" name="password">
            <div className="flex items-baseline justify-between">
              <Form.Label className="text-[15px] font-medium leading-[35px] text-white">
                Password
              </Form.Label>
              <Form.Message
                className="text-[13px] text-white opacity-[0.8]"
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
          <Link href="/login" className="text-xs opacity-50 hover:opacity-75">
            已有账号？前往登录
          </Link>
          <Form.Submit asChild>
            <button className="box-border w-full text-violet11 shadow-blackA4 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none mt-[10px]">
              下一步
            </button>
          </Form.Submit>
        </Form.Root>
      ) : (
        ""
      )}
      {pace === 1 ? (
        <div>
          <Form.Root
            className="w-[360px] bg-gray-200/30 backdrop-blur p-6 rounded-md border-[2px] "
            onSubmit={(event) => {
              const data = Object.fromEntries(
                new FormData(event.currentTarget)
              );

              // prevent default form submission
              const code = data.code as unknown as string;
              registerMutation.mutate({ ...registerForm, code: code });
              event.preventDefault();
            }}
          >
            <p className="flex justify-center items-center gap-2 w-full m-auto text-center text-[20px] font-bold leading-[35px] text-white mb-4">
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
              | 注册
            </p>

            <Form.Field className="grid mb-[10px]" name="code">
              <div className="flex items-baseline justify-between">
                <Form.Label className="text-[15px] font-medium leading-[35px] text-white">
                  code
                </Form.Label>
                <Form.Message
                  className="text-[13px] text-white opacity-[0.8]"
                  match="valueMissing"
                >
                  Please enter your email code
                </Form.Message>
              </div>
              <Form.Control asChild>
                <input
                  className="box-border w-full bg-blackA2 shadow-blackA6 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none  shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6"
                  type="code"
                  required
                />
              </Form.Control>
            </Form.Field>
            <Link href="/login" className="text-xs opacity-50 hover:opacity-75">
              已有账号？前往登录
            </Link>
            <Form.Submit asChild>
              <button className="box-border w-full text-violet11 shadow-blackA4 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none mt-[10px]">
                下一步
              </button>
            </Form.Submit>
          </Form.Root>
        </div>
      ) : (
        ""
      )}
      {pace === 2 ? (
        <div>
          <Form.Root
            className="w-[360px] bg-gray-200/30 backdrop-blur p-6 rounded-md border-[2px] "
            onSubmit={(event) => {
              router.push("/login");
              event.preventDefault();
            }}
          >
            <p className="flex justify-center items-center gap-2 w-full m-auto text-center text-[20px] font-bold leading-[35px] text-white mb-4">
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
              | 注册
            </p>
            <div className="w-full bg-blue-300/70 p-2 text-white font-bold border-l-8 border-blue-600 ">
              账号注册成功！
            </div>
            <Form.Submit asChild>
              <button className="box-border w-full text-violet11 shadow-blackA4 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none mt-[10px]">
                前往登录
              </button>
            </Form.Submit>
          </Form.Root>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
