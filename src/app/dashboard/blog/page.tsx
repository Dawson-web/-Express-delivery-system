"use client";

import axios from "axios";
import Loading from "@/components/motion/Loading";
import { useEffect, useState } from "react";
import IndexCard from "@/components/client/IndexCard";
import ProfileCard from "@/components/client/ProfileCard";
import styles from "@/app/dashboard/blog/page.module.css";
import clsx from "clsx";

export default function Page() {
  const [indexs, setIndexs] = useState<
    Array<{ _id: string; title: string; introduction: string; date: string }>
  >([]);

  useEffect(() => {
    setIndexs([
      { _id: "1", title: "title", introduction: "introduction", date: "date" },
    ]);
  }, []);

  if (!indexs.length) return <Loading />;
  return (
    <main className="flex flex-col w-full h-full items-center gap-4 ">
      <div className="row-span-1  w-[95%]  justify-self-center 	 ">
        <ProfileCard />
      </div>

      <div
        className={clsx(
          "row-span-3  w-[95%]  justify-self-center overflow-y-scroll h-full ",
          styles.scroll
        )}
      >
        <div className=" gap-2 sm:gap-4 grid md:grid-cols-2 grid-cols-1 ">
          {indexs.map((index) => (
            <IndexCard index={index} key={index._id} />
          ))}
        </div>
      </div>
    </main>
  );
}
