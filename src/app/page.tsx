import Header from "@/components/Header";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Header />
      <main>
        <section id="home" className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <h1 className="text-4xl font-bold text-center text-blue-600">Welcome to My Portfolio</h1>
          <p className="mt-4 text-lg text-gray-700">I’m a front-end developer specializing in creating beautiful websites.</p>
        </section>

        <section id="about" className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
          <h2 className="text-3xl font-bold">About Me</h2>
          <p className="mt-4">안녕하세요! 저는 프론트엔드 개발자입니다.</p>
        </section>

        <section id="skills" className="flex flex-col items-center justify-center min-h-screen bg-gray-300">
          <h2 className="text-3xl font-bold">Skills</h2>
          <p className="mt-4">React, Next.js, Tailwind CSS 등 다양한 기술을 사용합니다.</p>
        </section>

        <section id="archiving" className="flex flex-col items-center justify-center min-h-screen bg-gray-400">
          <h2 className="text-3xl font-bold">Archiving</h2>
          <p className="mt-4">내가 진행한 프로젝트들을 보관하는 공간입니다.</p>
        </section>

        <section id="projects" className="flex flex-col items-center justify-center min-h-screen bg-gray-500">
          <h2 className="text-3xl font-bold">Projects</h2>
          <p className="mt-4">내가 만든 프로젝트들을 확인하세요.</p>
        </section>

        <section id="career" className="flex flex-col items-center justify-center min-h-screen bg-gray-600">
          <h2 className="text-3xl font-bold">Career</h2>
          <p className="mt-4">내 경력에 대해 알아보세요.</p>
        </section>
      </main>
    </div>
  );
}
