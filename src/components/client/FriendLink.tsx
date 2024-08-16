"use client";
import LinkCard from "./FriendLink/LinkCard";

export default function FriendLink(props: any) {
  const finfo = [
    {
      name: "bakptr",
      avatar_url: "https://q.qlogo.cn/g?b=qq&nk=369060891&s=160",
      link: "https://pooi.me/",
      intro: "社恐但无所不知的bakaptr",
    },
    {
      name: "未晓",
      avatar_url: "https://q.qlogo.cn/g?b=qq&nk=1537476031&s=160",
      link: "https://www.dawnot.online/",
      intro: "一只正在学习前端的未晓",
    },
    {
      name: "For You",
      avatar_url:
        "http://qn.lackofcsy.cn/config/055c0cb176b1f4c0cdb91e277a8eeb05.jpg",
      link: "https://www.dawnot.online/",
      intro:
        "螃蟹在剥我的壳 ,笔记本在写我， 漫天的我落在枫叶上雪花上， 而你在想我。",
    },
  ];
  return (
    <div className="mt-[40px] p-4">
      <div>
        <span className=" sm:text-3xl font-bold ">
          <span className="text-blue-400"># </span>
          你好这里是Dawson的好盆友们~哈哈哈
        </span>

        <div className="mt-2 text-sm text-gray-500">
          <p>名称：For You</p>
          <p>简介：网站介绍</p>
          <p>
            头像：http://qn.lackofcsy.cn/config/055c0cb176b1f4c0cdb91e277a8eeb05.jpg
          </p>
        </div>
      </div>
      <div className="mt-4 gap-2 sm:gap-4 grid grid-cols-1  md:grid-cols-2 ">
        {finfo.map((item, index) => (
          <LinkCard
            key={index}
            name={item.name}
            avatar_url={item.avatar_url}
            link={item.link}
            intro={item.intro}
          />
        ))}
      </div>
    </div>
  );
}
