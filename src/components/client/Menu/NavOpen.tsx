"use client";

import clsx from "clsx";

export const NavOpen = (props: any) => {
  const { open, setOpen } = props; // Assuming the component prop is a string that represents the component to render
  return (
    <div
      className={clsx(
        "flex sm:hidden absolute  z-50 top-2 left-4 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200",
        {
          "transition-transform duration-500 rotate-90": open,
          "transition-transform duration-500 rotate-0": !open,
        }
      )}
    >
      <svg
        width="25"
        height="25"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={clsx("absolute", {
          "z-0 transition duration-500	opacity-0  ": open,
          "z-20 transition duration-500	deley-200 opacity-1": !open,
        })}
        onClick={() => setOpen(true)}
      >
        <path
          d="M2 4.5C2 4.22386 2.22386 4 2.5 4H12.5C12.7761 4 13 4.22386 13 4.5C13 4.77614 12.7761 5 12.5 5H2.5C2.22386 5 2 4.77614 2 4.5ZM2 7.5C2 7.22386 2.22386 7 2.5 7H7.5C7.77614 7 8 7.22386 8 7.5C8 7.77614 7.77614 8 7.5 8H2.5C2.22386 8 2 7.77614 2 7.5ZM2 10.5C2 10.2239 2.22386 10 2.5 10H10.5C10.7761 10 11 10.2239 11 10.5C11 10.7761 10.7761 11 10.5 11H2.5C2.22386 11 2 10.7761 2 10.5Z"
          fill="currentColor"
          fill-rule="evenodd"
          clip-rule="evenodd"
        ></path>
      </svg>
      <svg
        width="25"
        height="25"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={clsx({
          "z-20 transition-opacity duration-500 deley-200	opacity-1": open,
          "transition-opacity duration-500	opacity-0": !open,
        })}
        onClick={() => setOpen(false)}
      >
        <path
          d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z"
          fill="currentColor"
          fill-rule="evenodd"
          clip-rule="evenodd"
        ></path>
      </svg>
    </div>
  );
};
