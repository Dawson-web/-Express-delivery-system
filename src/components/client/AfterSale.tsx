import styles from "@/app/dashboard/order/page.module.css";
import clsx from "clsx";
import Loading from "@/components/motion/Loading";
import { useEffect, useState } from "react";
import IndexCard from "@/components/client/IndexCard";

export default function AfterSale(props: any) {
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
  );
}
