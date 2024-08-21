"use client";

import { $axios } from "@/app/api";
import CourieCard from "@/components/client/CourieCard";
import FriendLink from "@/components/client/FriendLink";
import IndexCard from "@/components/client/IndexCard";
import StationCard from "@/components/client/StationCard";
import { useQuery } from "@tanstack/react-query";

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

export default function Page(props: any) {
  const { isSuccess, data, refetch } = useQuery({
    queryKey: ["orderList"],
    queryFn: () => $axios.get("/station/orderList"),
  });
  const thisLocationCourier = useQuery({
    queryKey: ["courier"],
    queryFn: () => $axios.get("/courier/thisLocationCourier"),
  });
  const courierList = useQuery({
    queryKey: ["courier_order"],
    queryFn: () => $axios.get("/courier/getMyOrder"),
  });
  return (
    <div className="flex flex-row gap-4 flex-wrap  mx-0  ">
      {isSuccess
        ? data.data.data.map((item: Field, index: number) => (
            <StationCard key={index} item={item} />
          ))
        : ""}
      {courierList.isSuccess
        ? courierList.data.data.data.map((item: Field, index: number) => (
            <CourieCard key={index} item={item} />
          ))
        : ""}
    </div>
  );
}
