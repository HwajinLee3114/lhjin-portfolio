import React from "react";
import CompleteDown from "./CompleteDown";
import DepthButton from "./DepthButton/DepthButton";

export default function About() {
  return (
    <section
      id="about"
      className="flex flex-col items-center justify-center min-h-screen bg-themacolor1"
    >
      <h2 className="text-3xl font-bold">About ME</h2>
      <p className="mt-4">내 이름은 이화진</p>

      <CompleteDown />
      <DepthButton text="이력서 다운로드" />
    </section>
  );
}
