"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import ScrollDownBtn from "./ScrollDownBtn";

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
      className="flex flex-col items-center justify-center min-h-35 h-full bg-white"
    >
      <div className="l_search_div flex relative">
        <img
          src="/images/search-240.svg"
          alt="icon"
          className="absolute left-2 w-7 md:w-12 md:h-8 lg:w-16 lg:h-10"
        />
        <h1 className="l_main_title text-base md:text-xl lg:text-4xl font-bold text-center text-themacolor2">
          {title}
        </h1>
      </div>

      <ScrollDownBtn />
    </section>
  );
}
