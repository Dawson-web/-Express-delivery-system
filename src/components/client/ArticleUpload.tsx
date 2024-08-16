"use client";
import { Input } from "@/components/ui/input";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ControlButton from "@/components/client/ControlButton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function ArticleUpload() {
  const [form, setForm] = useState<object>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  function formatDate(timestamp: number) {
    let now = new Date(timestamp); // 创建一个新的 Date 对象
    let year = now.getFullYear(); // 获取年份
    let month = String(now.getMonth() + 1).padStart(2, "0"); // 获取月份并将其格式化为两位数
    let date = String(now.getDate()).padStart(2, "0"); // 获取日期并将其格式化为两位数
    let formattedDate = `${year}-${month}-${date}`; // 组合年、月、日
    return formattedDate;
  }

  const readFile = () => {
    const title = document.querySelector<HTMLInputElement>("#title");
    const introduction =
      document.querySelector<HTMLTextAreaElement>("#introduction");

    setForm({
      ...form,
      title: title?.value,
      introduction: introduction?.value,
      date: formatDate(Date.now()),
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === FileReader.DONE) {
        // 确保读取已完成
        const result = reader.result as string;
        const base64String = result?.split(",")[1];
        setForm({ ...form, content: base64String });
      }
    };

    reader.onerror = (error) => {
      console.error("Error reading file:", error);
    };

    reader.readAsDataURL(file);
  };
  return (
    <>
      <div>
        <h3>标题：</h3>
        <Input id="title" className="w-[180px] " />
      </div>
      <div>
        <h3>类型：</h3>
        <Select
          onValueChange={(value) => {
            setForm({ ...form, type: value });
            console.log(form);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="类型" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="前端">前端</SelectItem>
            <SelectItem value="后端">后端</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <h3>简介：</h3>
        <Textarea id="introduction" />
      </div>
      <div>
        <h3>文本：</h3>
        <Input
          ref={fileInputRef}
          id="myFile"
          type="file"
          onChange={handleFileChange}
        />
      </div>

      <div className="self-end ">
        <Button
          onClick={() => {
            readFile();
          }}
          className="w-[100px] bg-blue-600 hover:bg-blue-700 text-white mr-2"
        >
          确认
        </Button>
        <ControlButton form={form} method={"post"} value="发布" />
      </div>
    </>
  );
}
