"use client";
import remarkGfm from "remark-gfm";
import Markdown from "react-markdown";
import clsx from "clsx";
import styles from "@/components/client/scroller.module.css";

export default function ToMarkdown(props: any) {
  const content = Buffer.from(props.content.data, "base64");
  let string = content.toString();
  const article = Buffer.from(string, "base64").toString();
  return (
    <div className="w-full prose lg:prose-xl bg-zinc-100 rounded-lg shadow-lg dark:bg-gray-400 p-4">
      <Markdown
        remarkPlugins={[remarkGfm]}
        className={clsx("w-full h-screen overflow-y-scroll ", styles.scroll)}
      >
        {article}
      </Markdown>
    </div>
  );
}
