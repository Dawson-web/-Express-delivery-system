import * as React from "react";
import * as Form from "@radix-ui/react-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { $axios } from "@/app/api";
import { notifications } from "@mantine/notifications";
import {
  notificationError,
  notificationSuccess,
} from "@/constants/notifications";

export default function SendOrders(props: any) {
  const [pace, setPace] = React.useState(0);

  const formData = new FormData();

  const companyList = useQuery({
    queryKey: ["company"],
    queryFn: () => $axios.get("/company/list"),
  });
  const stationList = useQuery({
    queryKey: ["station"],
    queryFn: () => $axios.get("/station/list"),
  });
  // const itemList = useQuery({
  //   queryKey: ["item"],
  //   queryFn: () => $axios.get("/item/list"),
  // });
  console.log(companyList.data?.data.data);
  console.log(stationList.data?.data.data);
  // console.log(itemList.data?.data.data);

  const postItemMutation = useMutation({
    mutationFn: (v: any) => $axios.post("/item/create", v),
    onSuccess: () => {
      setPace(1);
      notifications.show({
        ...notificationSuccess,
        message: "物品信息已录入",
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
    <div className="w-full h-full flex justify-center items-start ">
      {pace == 0 ? (
        <Form.Root
          className="w-[360px] sm:w-[95%] bg-gray-200 backdrop-blur p-6 rounded-md border-[2px] shadow-2xl "
          onSubmit={(event) => {
            const data = Object.fromEntries(new FormData(event.currentTarget));
            const item = {
              name: data.name,
              currentLocation: data.currentLocation,
            };
            const blob = new Blob([JSON.stringify(item)], {
              type: "application/json",
            });
            formData.append("item", blob);
            formData.append("file", data.file);

            postItemMutation.mutate(formData);

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
            | 物品详情
          </p>
          <Form.Field className="grid mb-[10px]" name="file">
            <div className="flex items-baseline justify-between">
              <Form.Label className="text-[15px] font-medium leading-[35px] ">
                物品图片
              </Form.Label>
              <Form.Message
                className="text-[13px]  opacity-[0.8]"
                match="valueMissing"
              >
                请录入物品图片
              </Form.Message>
            </div>
            <Form.Control asChild>
              <input
                className="box-border w-full bg-blackA2 shadow-blackA6 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none  shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6"
                type="file"
                required
              />
            </Form.Control>
          </Form.Field>
          <Form.Field className="grid mb-[10px]" name="name">
            <div className="flex items-baseline justify-between">
              <Form.Label className="text-[15px] font-medium leading-[35px] ">
                物品名称
              </Form.Label>
              <Form.Message
                className="text-[13px]  opacity-[0.8]"
                match="valueMissing"
              >
                请录入物品名称
              </Form.Message>
            </div>
            <Form.Control asChild>
              <input
                className="box-border w-full bg-blackA2 shadow-blackA6 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none  shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6"
                required
              />
            </Form.Control>
          </Form.Field>
          <Form.Field className="grid mb-[10px]" name="currentLocation">
            <div className="flex items-baseline justify-between">
              <Form.Label className="text-[15px] font-medium leading-[35px] ">
                当前位置
              </Form.Label>
              <Form.Message
                className="text-[13px]  opacity-[0.8]"
                match="valueMissing"
              >
                请录入物品当前位置
              </Form.Message>
            </div>
            <Form.Control asChild>
              <input
                className="box-border w-full bg-blackA2 shadow-blackA6 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none  shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6"
                required
              />
            </Form.Control>
          </Form.Field>
          <span
            className="text-xs opacity-50 hover:opacity-75 cursor-pointer"
            onClick={() => setPace(1)}
          >
            物品信息已收录，直接前往寄件
          </span>
          <Form.Submit asChild>
            <button className="box-border w-full text-violet11 shadow-blackA4 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none mt-[10px]">
              保存
            </button>
          </Form.Submit>
        </Form.Root>
      ) : (
        <Form.Root
          className="w-[360px] sm:w-[95%] bg-gray-200 backdrop-blur p-6 rounded-md border-[2px] shadow-2xl "
          onSubmit={(event) => {
            const data = Object.fromEntries(new FormData(event.currentTarget));
            // prevent default form submission
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
            | 寄件详情
          </p>
          <Form.Field className="grid mb-[10px]" name="account">
            <div className="flex items-baseline justify-between">
              <Form.Label className="text-[15px] font-medium leading-[35px] ">
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
              />
            </Form.Control>
          </Form.Field>
          <span
            className="text-xs opacity-50 hover:opacity-75 cursor-pointer"
            onClick={() => setPace(0)}
          >
            物品信息未收录，前往填写
          </span>
          <Form.Submit asChild>
            <button className="box-border w-full text-violet11 shadow-blackA4 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none mt-[10px]">
              确认寄件
            </button>
          </Form.Submit>
        </Form.Root>
      )}
    </div>
  );
}
