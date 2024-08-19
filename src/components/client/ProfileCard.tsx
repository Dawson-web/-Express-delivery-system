"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image"; // 如果你使用的是Next.js
import { useMutation } from "@tanstack/react-query";
import { $axios } from "@/app/api";
import { useQuery } from "@tanstack/react-query";
import {
  notificationError,
  notificationSuccess,
} from "@/constants/notifications";
import { notifications } from "@mantine/notifications";
import { getValidUid, setToken } from "@/app/api/token";
import { useEffect, useState } from "react";
import { Upload } from "lucide-react";
import EditUserInfoButton from "./EditUserInfoButton";
import { Api, ApiOk } from "@/app/api/types";

interface UserData {
  avatar: string;
  createTime: string;
  email: string;
  id: number;
  lastLoginTime: null;
  name: string;
  password: string;
  phoneNumber: null;
  role: number;
  username: string;
}

export default function ProfileCard() {
  function getAvatar(v: string) {}
  const { isSuccess, data, refetch } = useQuery({
    queryKey: ["avatar"],
    queryFn: () =>
      $axios.get("/user/avatar", {
        params: {
          uid: getValidUid(),
        },
      }),
  });
  const userInfo = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => $axios.get("/user/myInfo"),
  });

  const userInfoRfetch = userInfo.refetch;
  // const userData: UserData = useState(userInfo.data?.data.data;
  // console.log(userData);

  const getAvatarMutation = useMutation({
    mutationFn: (formData: FormData) =>
      $axios.post("/user/avatar", formData, {
        params: {
          uid: getValidUid(),
        },
      }),
    onSuccess: (res) => {
      notifications.show({
        ...notificationSuccess,
        message: "头像更新成功",
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

  function UploadAvatar() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();
    input.onchange = () => {
      const file = input.files[0];
      if (file) {
        console.log(file);
        const formData = new FormData();
        formData.append("file", file);
        getAvatarMutation.mutate(formData);
      }
    };
  }

  return (
    <main className=" gap-4  shadow-xl sm:mt-[8px] mt-[40px]">
      <Card className="cursor-default ">
        <CardHeader>
          <CardTitle className="flex flex-row items-center sm:gap-8 gap-2 text-zinc-700 flex-wrap">
            {/* <Image
              src="http://47.109.106.254:9000/avatar/1825046541603442689.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioadmin%2F20240818%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240818T144721Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=b0deb7cc0f77333bc71515460b36b561f957de6d44b7851b3757e9cbf7f8ddeb"
              alt="Dawson's avatar"
              width={80}
              height={80}
              className="rounded-full"
            /> */}
            <img
              src={data?.data.data}
              alt=""
              style={{ width: "80px", height: "80px", borderRadius: "50%" }}
              onClick={() => {
                UploadAvatar();
              }}
            />
          </CardTitle>
        </CardHeader>
        <CardContent
          className="flex gap-x-10 gap-y-2 text-zinc-500  text-sm flex-wrap 
"
        >
          <p className=" flex gap-2 items-center w-[260px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className=" text-gray-600"
            >
              <path d="M18 20a6 6 0 0 0-12 0" />
              <circle cx="12" cy="10" r="4" />
              <circle cx="12" cy="12" r="10" />
            </svg>
            用户：{userInfo.data?.data.data.name}
          </p>
          <p className=" flex gap-2 items-center w-[260px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className=" text-gray-600"
            >
              <path d="M18 20a6 6 0 0 0-12 0" />
              <circle cx="12" cy="10" r="4" />
              <circle cx="12" cy="12" r="10" />
            </svg>
            ID：{userInfo.data?.data.data.id}
          </p>
          <p className=" flex gap-2 items-center w-[260px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className=" text-gray-600"
            >
              <path d="M18 20a6 6 0 0 0-12 0" />
              <circle cx="12" cy="10" r="4" />
              <circle cx="12" cy="12" r="10" />
            </svg>
            账号：{userInfo.data?.data.data.username}
          </p>
          <p className=" flex gap-2 items-center w-[260px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className=" text-rose-600"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            电话：{userInfo.data?.data.data.phoneNumber || "暂无"}
          </p>

          <p className="flex gap-2 items-center w-[260px]">
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-yellow-500"
            >
              <path
                d="M1 2C0.447715 2 0 2.44772 0 3V12C0 12.5523 0.447715 13 1 13H14C14.5523 13 15 12.5523 15 12V3C15 2.44772 14.5523 2 14 2H1ZM1 3L14 3V3.92494C13.9174 3.92486 13.8338 3.94751 13.7589 3.99505L7.5 7.96703L1.24112 3.99505C1.16621 3.94751 1.0826 3.92486 1 3.92494V3ZM1 4.90797V12H14V4.90797L7.74112 8.87995C7.59394 8.97335 7.40606 8.97335 7.25888 8.87995L1 4.90797Z"
                fill="currentColor"
                fill-rule="evenodd"
                clip-rule="evenodd"
              ></path>
            </svg>
            邮箱：3096567831@qq.com
          </p>
        </CardContent>
      </Card>
      <EditUserInfoButton
        userInfoRfetch={userInfoRfetch}
        userInfo={userInfo.data?.data.data}
      />
    </main>
  );
}
