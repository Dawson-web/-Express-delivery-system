"use client";

import axios from "axios";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ControlButton(props: any) {
  const { form, method, title } = props;

  const getPages = async () => {
    const res = await axios.get("/api/page", {});
  };
  const deletePages = async () => {
    const res = await axios.delete("/api/page", { params: { title } });
    const res_ = await axios.delete("/api/index", { params: { title } });
  };
  const updatePages = async () => {
    await axios.put("/api/page", {}, { params: {} });
  };
  const postPages = async () => {
    await axios.post("/api/page", {
      title: form?.title,
      content: form?.content,
      type: form?.type,
      date: form?.date,
    });
    await axios.post("/api/index", {
      title: form?.title,
      introduction: form?.introduction,
      date: form?.date,
    });
  };
  const doMethod = async () => {
    try {
      switch (method) {
        case "get":
          await getPages();
          break; // 这里需要break，否则会执行下一个case
        case "delete":
          await deletePages();
          break;
        case "update":
          await updatePages();
          break;
        case "post":
          await postPages();
          break;
        default:
          break;
      }
      toast.success("Success", {
        description: "操作成功",
      });
    } catch (e) {
      toast.error("Fail", {
        description: `操作失败：  ${e}`,
      });
    }
  };
  return (
    <Button
      className="w-[100px] bg-blue-600 hover:bg-blue-700 text-white"
      onClick={async () => {
        await doMethod();
      }}
    >
      {props.value}
    </Button>
  );
}
