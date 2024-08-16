"use client";
import React, { useRef } from "react";
import * as Form from "@radix-ui/react-form";
import Link from "next/link";

export default function RegisterForm() {
  return (
    <Form.Root className="w-[360px] bg-blue-600 p-6 rounded-md">
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
      <Form.Field className="grid mb-[10px]" name="email">
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
          <Form.Message
            className="text-[13px] text-white opacity-[0.8]"
            match="typeMismatch"
          >
            Please provide a valid password
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
          注册
        </button>
      </Form.Submit>
    </Form.Root>
  );
}
