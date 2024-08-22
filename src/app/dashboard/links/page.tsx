"use client";

import { $axios } from "@/app/api";
import CourieCard from "@/components/client/Courier/CourieCard";
import StationCard from "@/components/client/Station/StationCard";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/motion/Loading";

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
  const { isSuccess, data, refetch, isPending } = useQuery({
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
  if (isPending || courierList.isPending) {
    return <Loading />;
  }
  return (
    <div className="flex flex-row gap-4 flex-wrap  mx-0  ">
      {localStorage.getItem("role") == "1" && isSuccess
        ? data.data.data.map((item: Field, index: number) => (
            <StationCard key={index} item={item} />
          ))
        : ""}
      {localStorage.getItem("role") == "3" && courierList.isSuccess
        ? courierList.data.data.data.map((item: Field, index: number) => (
            <CourieCard key={index} item={item} />
          ))
        : ""}
    </div>
  );
}
