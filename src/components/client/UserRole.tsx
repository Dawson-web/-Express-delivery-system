"use client";

import { $axios } from "@/app/api";
import {
  notificationError,
  notificationSuccess,
} from "@/constants/notifications";
import { Select } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

interface RoleForm {
  uid: string;
}

export const UserRole = (props: any) => {
  const userList = useQuery({
    queryKey: ["user"],
    queryFn: () => $axios.get("/user/list"),
  });
  const updateUserRoleMutation = useMutation({
    mutationFn: (v: RoleForm) =>
      $axios.post("/user/modifyOther", {}, { params: { uid: v.uid } }),
    onSuccess: (res) => {
      notifications.show({
        ...notificationSuccess,
        message: "设置快递员成功",
      });
    },
    onError(e) {
      notifications.show({
        ...notificationError,
        message: e.message,
      });
    },
  });

  let uid = useRef("");
  let role = useRef("");

  let userUid = [];
  let userRole = [{ label: "快递员", value: "3" }];
  for (let i = 0; i < userList.data?.data.data.length; i++) {
    userUid.push({
      label: userList.data?.data.data[i].name,
      value: userList.data?.data.data[i].id,
    });
  }
  return (
    <div>
      <Select
        label="用户"
        placeholder="Pick value"
        data={userUid}
        onChange={(_value, option) => {
          uid.current = option.value;
        }}
      />
      <Select
        label="权限"
        placeholder="Pick value"
        data={userRole}
        onChange={(_value, option) => {
          role.current = option.value;
        }}
      />
      <button
        className="bg-blue-600 text-white px-2 py-1 rounded-md float-end mt-4"
        onClick={() =>
          updateUserRoleMutation.mutate({
            uid: uid.current,
          })
        }
      >
        确认
      </button>
    </div>
  );
};
