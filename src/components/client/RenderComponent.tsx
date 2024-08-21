"use client";
import SendOrders from "@/components/client/User/SendOrders";

import AfterSale from "@/components/client/User/AfterSale";
import AddCompany from "./Company/AddCompany";
import AddStation from "./Station/AddStation";
import { UserRole } from "./Controler/UserRole";
import AllOrders from "./User/AllOrders";
export const RenderComponent = (props: any) => {
  const { component } = props; // Assuming the component prop is a string that represents the component to render
  switch (component) {
    case "AllOrders":
      return <AllOrders />;
    case "SendOrders":
      return <SendOrders />;
    case "AfterSale":
      return <AfterSale />;
    case "AddCompany":
      return <AddCompany />;
    case "AddStation":
      return <AddStation />;
    case "UserRole":
      return <UserRole />;
  }
};
