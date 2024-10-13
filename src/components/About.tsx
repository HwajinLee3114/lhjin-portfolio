import React from "react";
import SlideButton from "./button/SlideButton";
import ProfileCircle from "./ProfileCircle";
import HoverAMenu from "./menu/HoverAMenu";

export default function About() {
  return (
    <section
      id="about"
      className="flex flex-col md:flex-row items-center gap-5 justify-around h-43 bg-themacolor3"
    >
      <div className="h-full p-2 w-full md:w-2/4 flex flex-col items-center justify-center rounded-lg overflow-hidden">
        <ProfileCircle />
        <div className="pb-5"/>
        <SlideButton text="이력서 다운로드" href="#" color="#FAAD1A" />
      </div>

      <div className="h-full flex-grow w-full flex flex-col items-center justify-center">
        <div className="flex gap-5">

        <HoverAMenu 
          url="https://github.com/HwajinLee3114"
          title="Git Hub"
          description="소스 코드 관리"
        />
        <HoverAMenu 
          url="https://lhjini.tistory.com/"
          title="lhjin.log"
          description="공부 및 기록 목적의 블로그"
        />
        </div>
      </div>
    </section>
  );
}
