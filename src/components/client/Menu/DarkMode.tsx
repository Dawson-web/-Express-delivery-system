"use client";

import { useState } from "react";

export const DarkMode = (props: any) => {
  const [dark, setDark] = useState<boolean>(true);
  function darkMode() {
    return localStorage.theme === "dark";
  }
  return (
    <div
      className="text-nowrap flex gap-8"
      onClick={() => {
        setDark(!dark);
        localStorage.setItem("theme", darkMode() ? "light" : "dark");
        if (
          darkMode() ||
          (!("theme" in localStorage) &&
            window.matchMedia("(prefers-color-scheme: dark)").matches)
        ) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }}
    >
      {!dark ? (
        <>
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
            className="lucide lucide-toggle-right"
          >
            <rect width="20" height="12" x="2" y="6" rx="6" ry="6" />
            <circle cx="16" cy="12" r="2" />
          </svg>
        </>
      ) : (
        <>
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
            className="lucide lucide-toggle-left"
          >
            <rect width="20" height="12" x="2" y="6" rx="6" ry="6" />
            <circle cx="8" cy="12" r="2" />
          </svg>
        </>
      )}
      暗色模式
    </div>
  );
};
