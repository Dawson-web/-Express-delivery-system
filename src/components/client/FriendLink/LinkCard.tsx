"use client";

import clsx from "clsx";
import React from "react";

export default function LinkCard(props: any) {
  const { link, avatar_url, intro, name } = props;
  const [isHovered, setIsHovered] = React.useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <article
      className="  p-4 rounded-lg shadow-md bg-white hover:border-blue-600 border-2 hover:shadow-sm transition-all duration-300 ease-in-out"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="flex  items-center justify-around"
      >
        <div
          className={clsx("w-[90px] h-[90px]  relative ", {
            "animate-bounce delay-300	": isHovered,
          })}
        >
          <img src={avatar_url} alt="avatar" className="rounded-full  " />
          <div className="bg-green-500 border-white border-4 rounded-full w-[20px] h-[20px] absolute bottom-[0px] right-[0px]"></div>
        </div>
        <div className="w-[70%] text-center text-gray-600 font-medium p-2 flex flex-col items-start">
          <span className="text-lg font-bold">{name}</span>
          <div className="text-sm">{intro}</div>
        </div>
      </a>
    </article>
  );
}
