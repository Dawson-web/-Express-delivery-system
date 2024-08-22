"use client";
import { RenderComponent } from "@/components/client/RenderComponent";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import clsx from "clsx";
import { useState } from "react";
export default function Page() {
  const [component, setComponent] = useState<string>("AddCompany");

  return (
    <main className=" flex flex-col items-center justify-center gap-4  w-[90%] min-w-[360px]">
      <h1 className={` mb-4 text-xl md:text-2xl`}>控制台</h1>

      <Menubar className="w-full shadow-md">
        <MenubarMenu>
          {localStorage.getItem("role") == "1" ? (
            <MenubarTrigger
              onClick={() => setComponent("AddStation")}
              className={clsx({
                "border-b-2 border-blue-600": component == "AddStation",
              })}
            >
              新增驿站
            </MenubarTrigger>
          ) : (
            <>
              <MenubarTrigger
                onClick={() => setComponent("AddCompany")}
                className={clsx({
                  "border-b-2 border-blue-600": component == "AddCompany",
                })}
              >
                新增物流公司
              </MenubarTrigger>

              <MenubarTrigger
                onClick={() => setComponent("UserRole")}
                className={clsx({
                  "border-b-2 border-blue-600": component == "UserRole",
                })}
              >
                用户权限管理
              </MenubarTrigger>
            </>
          )}
        </MenubarMenu>
      </Menubar>
      <div className="flex flex-col gap-4 border-solid	border-2	rounded-lg	p-4  w-full bg-gray-50 shadow-lg dark:bg-gray-800">
        <RenderComponent component={component} />
      </div>
    </main>
  );
}
