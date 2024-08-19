import React from "react";
import * as Form from "@radix-ui/react-form";
import { useMutation } from "@tanstack/react-query";
import { $axios } from "@/app/api";
import { useQuery } from "@tanstack/react-query";
import { Cross2Icon } from "@radix-ui/react-icons";

import {
  notificationError,
  notificationSuccess,
} from "@/constants/notifications";
import { notifications } from "@mantine/notifications";
import { getValidUid } from "@/app/api/token";
import { Button } from "../ui/button";

interface UserInfoForm {
  name: string;
  password: string;
  phoneNumber: string;
}

const EditUserInfoButton = (props: any) => {
  const [show, setShow] = React.useState(false);
  const { userInfoRfetch, userInfo } = props;
  const updateUserDataMutation = useMutation({
    mutationFn: (v: UserInfoForm) =>
      $axios.post("/update", {
        name: v.name || userInfo.name,
        password: v.password || userInfo.password,
        phoneNumber: v.phoneNumber || userInfo.phoneNumber,
        id: getValidUid(),
      }),
    onSuccess: (res) => {
      notifications.show({
        ...notificationSuccess,
        message: "个人信息更新成功",
      });
      setShow(false);
      userInfoRfetch();
    },
    onError(e) {
      notifications.show({
        ...notificationError,
        message: e.message,
      });
    },
  });
  return (
    <>
      {!show ? (
        <Button
          className="bg-blue-600 text-white hover:bg-blue-700 float-right"
          onClick={() => setShow(true)}
        >
          修改个人信息
        </Button>
      ) : (
        ""
      )}
      {show ? (
        <div className="w-full bg-white flex justify-center items-center fixed top-0 left-0 z-50 h-screen">
          <Form.Root
            className="w-[360px] bg-white backdrop-blur p-6 rounded-md border-[2px] "
            onSubmit={(event) => {
              const data = Object.fromEntries(
                new FormData(event.currentTarget)
              ) as unknown as UserInfoForm;
              updateUserDataMutation.mutate(data);
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
              | 修改个人信息
            </p>
            <button
              className="bg-transparent text-gray hover:text-black absolute top-4 right-4 "
              onClick={() => setShow(false)}
            >
              <Cross2Icon />
            </button>
            <Form.Field className="grid mb-[10px]" name="name">
              <div className="flex items-baseline justify-between">
                <Form.Label className="text-[15px] font-medium leading-[35px] ">
                  name
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
                  placeholder={userInfo.name}
                />
              </Form.Control>
            </Form.Field>
            <Form.Field className="grid mb-[10px]" name="phoneNumber">
              <div className="flex items-baseline justify-between">
                <Form.Label className="text-[15px] font-medium leading-[35px] ">
                  PhoneNumber
                </Form.Label>
                <Form.Message
                  className="text-[13px]  opacity-[0.8]"
                  match="valueMissing"
                >
                  Please enter your PhoneNumber
                </Form.Message>
              </div>
              <Form.Control asChild>
                <input
                  className="box-border w-full bg-blackA2 shadow-blackA6 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none  shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6"
                  type="phoneNumber"
                  required
                  placeholder={userInfo.phoneNumber}
                />
              </Form.Control>
            </Form.Field>
            <Form.Field className="grid mb-[10px]" name="password">
              <div className="flex items-baseline justify-between">
                <Form.Label className="text-[15px] font-medium leading-[35px] ">
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
                  placeholder="**********"
                />
              </Form.Control>
            </Form.Field>

            <Form.Submit asChild className=" ">
              <Button className="bg-blue-600 text-white hover:bg-blue-700 ">
                保存
              </Button>
            </Form.Submit>
          </Form.Root>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default EditUserInfoButton;
