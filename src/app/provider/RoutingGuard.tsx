"use client";

import { redirect } from "next/navigation";
import { getValidToken } from "../api/token";

function RoutingGuard() {
  const token = getValidToken();

  if (!token) redirect("/login");
}

export default RoutingGuard;
