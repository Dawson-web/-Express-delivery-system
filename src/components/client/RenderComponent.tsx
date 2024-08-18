"use client";
import AllOrders from "@/components/client/AllOrders";
import SendOrders from "@/components/client/SendOrders";

import AfterSale from "@/components/client/AfterSale";
export const RenderComponent = (props: any) => {
  const { component } = props; // Assuming the component prop is a string that represents the component to render
  switch (component) {
    case "AllOrders":
      return <AllOrders />;
    case "SendOrders":
      return <SendOrders />;
    case "AfterSale":
      return <AfterSale />;
  }
};
