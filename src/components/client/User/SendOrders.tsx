import * as React from "react";
import * as Form from "@radix-ui/react-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { $axios } from "@/app/api";
import { notifications } from "@mantine/notifications";
import {
  notificationError,
  notificationSuccess,
} from "@/constants/notifications";
import { Select } from "@mantine/core";

export default function SendOrders(props: any) {
  const [status, setStatus] = React.useState<
    "add" | "fill" | "select" | "sure"
  >("add");

  let [orderForm, setOrderForm] = React.useState({});

  const formData = new FormData();

  const companyList = useQuery({
    queryKey: ["company"],
    queryFn: () => $axios.get("/company/list"),
  });
  const stationList = useQuery({
    queryKey: ["station"],
    queryFn: () => $axios.get("/station/list"),
  });
  const itemList = useQuery({
    queryKey: ["item"],
    queryFn: () => $axios.get("/item/list"),
  });
  const items = [];
  const stations = [];
  const companys = [];

  let [itemId, setItemId] = React.useState("");
  let [stationId, setStationId] = React.useState("");
  let [companyId, setCompanyId] = React.useState("");
  let [method, setMethod] = React.useState("");

  for (let i = 0; i < itemList.data?.data.data.length; i++) {
    items.push({
      label: itemList.data?.data.data[i].name,
      value: itemList.data?.data.data[i].id,
    });
  }
  for (let i = 0; i < stationList.data?.data.data.length; i++) {
    stations.push({
      label: stationList.data?.data.data[i].name,
      value: stationList.data?.data.data[i].uid,
    });
  }
  for (let i = 0; i < companyList.data?.data.data.length; i++) {
    companys.push({
      label: companyList.data?.data.data[i].name,
      value: companyList.data?.data.data[i].id,
    });
  }
  const postItemMutation = useMutation({
    mutationFn: (v: any) => $axios.post("/item/create", v),
    onSuccess: () => {
      notifications.show({
        ...notificationSuccess,
        message: "物品信息已录入",
      });
      setStatus("fill");
    },
    onError(e) {
      notifications.show({
        ...notificationError,
        message: e.message,
      });
    },
  });

  const shippingMethod = [
    {
      label: "微信支付",
      value: "0",
    },
    {
      label: "支付宝",
      value: "1",
    },
    {
      label: "货到付款",
      value: "2",
    },
  ];

  const postOrderMutation = useMutation({
    mutationFn: (v: any) => $axios.post("/order/create", v),
    onSuccess: () => {
      notifications.show({
        ...notificationSuccess,
        message: "寄件信息已录入",
      });
      setStatus("fill");
    },
    onError(e) {
      notifications.show({
        ...notificationError,
        message: e.message,
      });
    },
  });
  const judge = () => {
    if (itemId !== "" && stationId !== "" && companyId !== "") {
      setStatus("sure");
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-start ">
      {status === "add" ? (
        <Form.Root
          className="w-[360px] sm:w-[95%] bg-gray-200 backdrop-blur p-6 rounded-md border-[2px] shadow-2xl "
          onSubmit={(event) => {
            const data = Object.fromEntries(new FormData(event.currentTarget));
            const item = {
              name: data.name,
              currentLocation: data.currentLocation,
            };

            formData.set(
              "item",
              new Blob([JSON.stringify(item)], { type: "application/json" })
            );
            formData.set("file", data.file);

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
                >
                  <path d="M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10l-3.1-3.1a2 2 0 0 0-2.814.014L6 21" />
                  <path d="m14 19.5 3-3 3 3" />
                  <path d="M17 22v-5.5" />
                  <circle cx="9" cy="9" r="2" />
                </svg>{" "}
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
              <input className="" type="file" required />
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
                >
                  <path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4" />
                  <path d="M2 6h4" />
                  <path d="M2 10h4" />
                  <path d="M2 14h4" />
                  <path d="M2 18h4" />
                  <path d="M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" />
                </svg>{" "}
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
                >
                  <path d="M18 8c0 3.613-3.869 7.429-5.393 8.795a1 1 0 0 1-1.214 0C9.87 15.429 6 11.613 6 8a6 6 0 0 1 12 0" />
                  <circle cx="12" cy="8" r="2" />
                  <path d="M8.714 14h-3.71a1 1 0 0 0-.948.683l-2.004 6A1 1 0 0 0 3 22h18a1 1 0 0 0 .948-1.316l-2-6a1 1 0 0 0-.949-.684h-3.712" />
                </svg>{" "}
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
            onClick={() => setStatus("fill")}
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
        ""
      )}
      {status === "fill" && (
        <Form.Root
          className="w-[360px] sm:w-[95%] bg-gray-200 backdrop-blur p-6 rounded-md border-[2px] shadow-2xl "
          onSubmit={(event) => {
            const data = Object.fromEntries(new FormData(event.currentTarget));
            // prevent default form submission
            setOrderForm(data);
            setStatus("select");
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
          <Form.Field className="grid mb-[10px]" name="senderPhone">
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
                  class="lucide lucide-phone"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                寄件人电话
              </Form.Label>
              <Form.Message
                className="text-[13px]  opacity-[0.8]"
                match="valueMissing"
              >
                Please enter PhoneNumber
              </Form.Message>
            </div>
            <Form.Control asChild>
              <input
                className="box-border w-full bg-blackA2 shadow-blackA6 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none  shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6"
                type="senderPhone"
                required
              />
            </Form.Control>
          </Form.Field>
          <Form.Field className="grid mb-[10px]" name="recipientPhone">
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
                  class="lucide lucide-phone"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                收件人电话
              </Form.Label>
              <Form.Message
                className="text-[13px]  opacity-[0.8]"
                match="valueMissing"
              >
                Please enter PhoneNumber
              </Form.Message>
            </div>
            <Form.Control asChild>
              <input
                className="box-border w-full bg-blackA2 shadow-blackA6 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none  shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6"
                type="recipientPhone"
                required
              />
            </Form.Control>
          </Form.Field>
          <Form.Field className="grid mb-[10px]" name="senderLocation">
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
                  class="lucide lucide-map-pin-house"
                >
                  <path d="M15 22a1 1 0 0 1-1-1v-4a1 1 0 0 1 .445-.832l3-2a1 1 0 0 1 1.11 0l3 2A1 1 0 0 1 22 17v4a1 1 0 0 1-1 1z" />
                  <path d="M18 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 .601.2" />
                  <path d="M18 22v-3" />
                  <circle cx="10" cy="10" r="3" />
                </svg>
                发货地址
              </Form.Label>
              <Form.Message
                className="text-[13px]  opacity-[0.8]"
                match="valueMissing"
              >
                Please enter senderLocation
              </Form.Message>
            </div>
            <Form.Control asChild>
              <input
                className="box-border w-full bg-blackA2 shadow-blackA6 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none  shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6"
                type="senderLocation"
                required
              />
            </Form.Control>
          </Form.Field>
          <Form.Field className="grid mb-[10px]" name="recipientLocation">
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
                </svg>{" "}
                收件人地址
              </Form.Label>
              <Form.Message
                className="text-[13px]  opacity-[0.8]"
                match="valueMissing"
              >
                Please enter recipientLocation
              </Form.Message>
            </div>
            <Form.Control asChild>
              <input
                className="box-border w-full bg-blackA2 shadow-blackA6 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none  shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6"
                type="recipientLocation"
                required
              />
            </Form.Control>
          </Form.Field>
          <Form.Field className="grid mb-[10px]" name="additionalInfo">
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
                  class="lucide lucide-notebook-pen"
                >
                  <path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4" />
                  <path d="M2 6h4" />
                  <path d="M2 10h4" />
                  <path d="M2 14h4" />
                  <path d="M2 18h4" />
                  <path d="M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" />
                </svg>
                备注
              </Form.Label>
              <Form.Message
                className="text-[13px]  opacity-[0.8]"
                match="valueMissing"
              >
                Please enter additionalInfo
              </Form.Message>
            </div>
            <Form.Control asChild>
              <input
                className="box-border w-full bg-blackA2 shadow-blackA6 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none  shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6"
                type="additionalInfo"
                required
              />
            </Form.Control>
          </Form.Field>
          <span
            className="text-xs opacity-50 hover:opacity-75 cursor-pointer"
            onClick={() => setStatus("select")}
          >
            物品信息未收录，前往填写
          </span>
          <Form.Submit asChild>
            <button className="box-border w-full text-violet11 shadow-blackA4 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none mt-[10px]">
              下一步
            </button>
          </Form.Submit>
        </Form.Root>
      )}
      {(status === "select" || status === "sure") && (
        <div className="w-[360px] sm:w-[95%] bg-gray-200 backdrop-blur p-6 rounded-md border-[2px] shadow-2xl ">
          <Select
            label="包裹"
            placeholder="Pick value"
            data={items}
            onChange={(_value, option) => {
              setItemId(option.value);
              judge();
            }}
          />
          <Select
            label="物流公司"
            placeholder="Pick value"
            data={companys}
            onChange={(_value, option) => {
              setCompanyId(option.value);
              judge();
            }}
          />
          <Select
            label="寄件驿站"
            placeholder="Pick value"
            data={stations}
            onChange={(_value, option) => {
              setStationId(option.value);
              judge();
            }}
          />
          <Select
            label="支付方式"
            placeholder="Pick value"
            data={shippingMethod}
            onChange={(_value, option) => {
              setMethod(option.value);
              judge();
            }}
          />
          <button
            onClick={() => {
              let form = {
                ...orderForm,
                stationId: stationId,
                companyId: companyId,
                itemId: itemId,
                isReturn: "0",
                shippingMethod: Number(method),
              };

              console.log(form);

              postOrderMutation.mutate(form);
            }}
            className="box-border w-full text-violet11 shadow-blackA4 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none mt-[10px]"
          >
            确认寄件
          </button>
        </div>
      )}
    </div>
  );
}
