"use client";

import EditUserInfoButton from "@/components/client/EditUserInfoButton";
import ProfileCard from "@/components/client/ProfileCard";

export default function page(props: any) {
  return (
    <div>
      <ProfileCard />
      <EditUserInfoButton />
    </div>
  );
}
