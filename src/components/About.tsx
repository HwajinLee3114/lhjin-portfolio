import React from "react";
import SlideButton from "./button/SlideButton";
import ProfileCircle from "./ProfileCircle";
import HoverAMenu from "./menu/HoverAMenu";

export default function About() {
  return (
    <section
      id="about"
      className="flex flex-col md:flex-row items-center gap-5 justify-around h-50 md:h-43 bg-themacolor3"
    >
      <div className="w-full md:w-96 text-center mb-5">
        <h2 className="text-2xl font-bold text-white">About Me</h2>
        <p className="text-lg text-gray-300">
          저는 개발자로서의 여정을<br/>나누고 싶습니다
        </p>
      </div>

      <div className="h-full p-2 w-full md:w-2/4 flex flex-col items-center justify-center rounded-lg">
        <ProfileCircle />
        <div className="pb-5" />
        <SlideButton
          text="이력서 다운로드"
          url="/files/resume.pdf"
          isDown={true}
          color="#FAAD1A"
        />
      </div>

      <div className="h-full flex-grow w-full flex flex-col items-center justify-center">
        <div className="flex flex-col md:flex-row gap-5">
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
