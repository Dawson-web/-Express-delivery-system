"use client";

import { redirect } from "next/navigation";
import { getValidToken } from "../api/token";
import { useQuery } from "@tanstack/react-query";
import { $axios } from "../api";

function RoutingGuard() {
  const token = getValidToken();

  if (!token) {
    redirect("/login");
  }
}

export default RoutingGuard;
