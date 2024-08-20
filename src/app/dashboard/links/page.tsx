"use client";

import { $axios } from "@/app/api";
import FriendLink from "@/components/client/FriendLink";
import { useQuery } from "@tanstack/react-query";

export default function Page(props: any) {
  const { isSuccess, data, refetch } = useQuery({
    queryKey: ["orderList"],
    queryFn: () => $axios.get("/station/orderList"),
  });
  return <div>{isSuccess ? <FriendLink /> : ""}</div>;
}
