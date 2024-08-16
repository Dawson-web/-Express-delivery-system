"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import clsx from "clsx";
import { useState } from "react";
import { NavOpen } from "./Menu/NavOpen";
import { DarkMode } from "./Menu/DarkMode";

export default function Menu(props: any) {
  const [option, setOption] = useState<string>("blog");
  const { open, setOpen } = props;

  function checkOption(options: string) {
    setOption(options);
    setTimeout(() => setOpen(false), 400);
  }
  return (
    <>
      <NavOpen open={open} setOpen={setOpen} />
      <div
        className={clsx({
          "sm:relative sm:block  absolute ": open,
          "sm:relative sm:block  sm:h-full sm:w-auto  w-0 h-0 overflow-hidden":
            !open,
        })}
      >
        <NavigationMenu>
          <NavigationMenuList
            className={clsx(
              " sm:flex flex-col justify-start  sm:h-screen h-0 overflow-hidden  pt-[40px]  bg-white dark:bg-gray-900 ",
              {
                " transition-[height] ease-in-out duration-500  h-screen  w-screen":
                  open,
                " transition-[height] ease-in-out duration-500  h-0  ": !open,
              }
            )}
          >
            <NavigationMenuItem onClick={() => checkOption("me")}>
              <Link href="/dashboard/me" legacyBehavior passHref>
                <NavigationMenuLink
                  className={clsx(navigationMenuTriggerStyle(), {
                    "transition-all duration-300 translate-x-6  border-l-4 border-l-blue-600 ":
                      option == "me",
                    "transition-[transform] translate-x-0": option !== "me",
                  })}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-square-user-round"
                  >
                    <path d="M18 21a6 6 0 0 0-12 0" />
                    <circle cx="12" cy="11" r="4" />
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                  </svg>
                  个人
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem onClick={() => checkOption("blog")}>
              <Link href="/dashboard/blog" legacyBehavior passHref>
                <NavigationMenuLink
                  className={clsx(navigationMenuTriggerStyle(), {
                    "transition-all duration-300 translate-x-6  border-l-4 border-l-blue-600":
                      option == "blog",
                    "transition-[transform] translate-x-0": option !== "blog",
                  })}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                    <path d="M3 6h18" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                  订单
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem onClick={() => checkOption("control")}>
              <Link href="/dashboard/control" legacyBehavior passHref>
                <NavigationMenuLink
                  className={clsx(navigationMenuTriggerStyle(), {
                    "transition-all duration-300 translate-x-6  border-l-4 border-l-blue-600 ":
                      option == "control",
                    "transition-[transform] translate-x-0":
                      option !== "control",
                  })}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-sliders-horizontal"
                  >
                    <line x1="21" x2="14" y1="4" y2="4" />
                    <line x1="10" x2="3" y1="4" y2="4" />
                    <line x1="21" x2="12" y1="12" y2="12" />
                    <line x1="8" x2="3" y1="12" y2="12" />
                    <line x1="21" x2="16" y1="20" y2="20" />
                    <line x1="12" x2="3" y1="20" y2="20" />
                    <line x1="14" x2="14" y1="2" y2="6" />
                    <line x1="8" x2="8" y1="10" y2="14" />
                    <line x1="16" x2="16" y1="18" y2="22" />
                  </svg>
                  管理
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem onClick={() => checkOption("links")}>
              <Link href="/dashboard/links" legacyBehavior passHref>
                <NavigationMenuLink
                  className={clsx(navigationMenuTriggerStyle(), {
                    "transition-all duration-300 translate-x-6  border-l-4 border-l-blue-600 ":
                      option == "links",
                    "transition-[transform] translate-x-0": option !== "links",
                  })}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-link"
                  >
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                  友链
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem
              className={clsx(navigationMenuTriggerStyle(), " cursor-pointer")}
            >
              <DarkMode />
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </>
  );
}
