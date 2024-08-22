import styles from "@/app/dashboard/order/page.module.css";
import clsx from "clsx";
import Loading from "@/components/motion/Loading";
import { useEffect, useState } from "react";
import RecieveCard from "@/components/client/User/RecieveCard";
import { useQuery } from "@tanstack/react-query";
import { $axios } from "@/app/api";
export interface Field {
  id: string;
  additionalInfo: string;
  companyId: string;
  isReturn: string;
  itemId: string;
  recipientLocation: string;
  recipientPhone: string;
  senderLocation: string;
  senderPhone: string;
  shippingMethod: string;
  stationId: string;
}
export default function AllOrders(props: any) {
  const { data, isPending } = useQuery({
    queryKey: ["receiveOrderList"],
    queryFn: () => $axios.get("/order/receiveOrderList"),
  });
  console.log(data?.data.data);

  if (isPending) return;
  <Loading />;
  return (
    <div
      className={clsx(
        "row-span-3  w-[95%]  justify-self-center overflow-y-scroll h-full ",
        styles.scroll
      )}
    >
      <div className=" gap-2 sm:gap-4 grid md:grid-cols-2 grid-cols-1 ">
        {data?.data.data.map((item: Field, index: string) => (
          <RecieveCard item={item} key={index} />
        ))}
        {data?.data.data.length === 0 && (
          <div className="w-full flex justify-center items-center">
            {" "}
            <h1 className="mx-0 font-bold text-2xl mt-[20vh]">暂无订单</h1>
          </div>
        )}{" "}
      </div>
    </div>
  );
}
