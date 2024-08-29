"use client";
import Loading from "@/components/motion/Loading";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { slug: string } }) {
  // 对params.slug进行URL解码
  const title = decodeURIComponent(params.slug);
  const [article, setArticle] = useState<{
    content: string;
    data: string;
    title: string;
    type: string;
    _id: string;
    _v: number;
  }>({
    content: "",
    data: "",
    title: "",
    type: "",
    _id: "",
    _v: 0,
  });
  const [isContentReady, setIsContentReady] = useState(false); // 新增状态控制内容是否准备好

  const getPages = async () => {
    const res = await axios.get("/api/page", { params: { title } });
    setArticle(res.data.page[0]);
  };

  useEffect(() => {
    const fetchData = async () => {
      // 使用params属性传递查询参数
      await getPages();
      // 延迟加载
      const timerId = setTimeout(() => {
        setIsContentReady(true);
      }, 500); // 设置延迟时间，例如2秒

      // 清除定时器，防止内存泄漏
      return () => clearTimeout(timerId);
    };

    fetchData();
  }, []);

  // 判断article是否存在以及是否准备好显示内容
  if (!article.content || !isContentReady) return <Loading />;

  return <ToMarkdown content={article.content} />;
}
