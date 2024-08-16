"use client";
import ArticleUpload from "@/components/client/ArticleUpload";
import ArticleDelete from "./ArticleDelete";
export const RenderComponent = (props: any) => {
  const { component } = props; // Assuming the component prop is a string that represents the component to render
  switch (component) {
    case "ArticleUpload":
      return <ArticleUpload />;
    case "ArticleDelete":
      return <ArticleDelete />;
    default:
      return "";
  }
};
