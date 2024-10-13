import React from "react";
import SlideButton from "./button/SlideButton";

export default function About() {
  return (
    <section
      id="about"
      className="flex flex-col md:flex-row items-center gap-5 justify-around h-43 bg-themacolor1"
    >
      <div className="h-full p-2 w-full md:w-2/4 flex flex-col items-center justify-center rounded-lg overflow-hidden">
        {/* <img
          src="/images/profile.jpg"
          alt="Profile"
          className="w-72 h-72 rounded-full"
        /> */}
        <div className="w-72 h-72 bg-themacolor2 rounded-full"></div>
        <h1 className="text-lg">234234</h1>
        <p className="text-center mb-10">sadfasdfasdf</p>
        <SlideButton text="이력서 다운로드" href="#" color="#344C36" />
      </div>

      <div className="h-full flex-grow w-full"></div>
    </section>
  );
}
