"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function HomeSec() {
  const content = "프론트엔드 개발자 이화진 입니다";
  const [title, setTitle] = useState<string>("");
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    const typing = () => {
      if (index < content.length) {
        setTitle((prev) => prev + content[index]);
        setIndex((prev) => prev + 1);
      }
    };

    const interval = setInterval(typing, 100);
    return () => clearInterval(interval);
  }, [index, content]);

  return (
    <section
      id="home"
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100"
    >
      <div className="l_search_div flex relative">
        <Image
          src="/images/search-120.png"
          alt="search icon"
          width={40}
          height={40}
          className="absolute left-5"
        />
        <h1 className="l_main_title text-4xl font-bold text-center text-blue-600">
          {title}
        </h1>
      </div>
    </section>
  );
}
