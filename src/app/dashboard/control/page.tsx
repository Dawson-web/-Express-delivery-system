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
  const [component, setComponent] = useState<string>("ArticleUpload");

  return (
    <main className=" flex flex-col items-center justify-center gap-4  w-[85vw] min-w-[360px]">
      <h1 className={` mb-4 text-xl md:text-2xl`}>控制台</h1>
      <Menubar className="w-full shadow-md">
        <MenubarMenu>
          <MenubarTrigger
            onClick={() => setComponent("ArticleUpload")}
            className={clsx({
              "border-b-2 border-blue-600": component == "ArticleUpload",
            })}
          >
            发布文章
          </MenubarTrigger>
          <MenubarTrigger
            onClick={() => setComponent("ArticleDelete")}
            className={clsx({
              "border-b-2 border-blue-600": component == "ArticleDelete",
            })}
          >
            删除文章
          </MenubarTrigger>
        </MenubarMenu>
      </Menubar>
      <div className="flex flex-col gap-4 border-solid	border-2	rounded-lg	p-4  w-full bg-gray-50 shadow-lg dark:bg-gray-800">
        <RenderComponent component={component} />
      </div>
    </main>
  );
}
