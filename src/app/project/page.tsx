"use client";

import ProjectCard from "@/components/project/ProjectCard";
import React from "react";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";

const variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

interface ProjectsProps {
  activeSection: string;
}

/*
  - 필터(전체/개인/팀), 주요 프로젝트만 보기(체크)
  - 프로젝트 카드 컴포넌트 생성
    > 미리보기 이미지
      제목, 필터 항목 해시태그 처럼
      개발 기간 yyyy.mm ~ yyyy.mm
      프로젝트 한줄 소개 / 개발한 내용 
      사용 언어
      README - 선택 시 상세 내용
  - hover 이벤트 / 스크롤되어 내려올 때 카드 슉슉 뜨는 
*/
export default function Projects() {
  return (
    <section
      id="projects"
      className="flex flex-col min-h-screen bg-themacolor3"
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold">Projects</h2>
        <p className="mt-4">내가 만든 프로젝트들을 확인하세요.</p>
      </div>

      <ul className="l_pjfilter flex gap-3 cursor-pointer mt-10 justify-center">
        <img src="/images/filterYellow-100.png" className="w-5" alt="filter" />
        <li className="selected" value="">
          All
        </li>
        <li value="personal">Personal</li>
        <li value="team">Team</li>
      </ul>
      {/* link, imageSrc */}
      {/* 
        initial: 시작 상태. opacity, 위치 지정
        whileInView: 뷰 진입 시. opacity, 위치 지정
        transition: 전환 효과 / ease: 속도 조절 함수. duration: 지속 시간. delay: 지연. 
      */}
      <div className="w-full h-full flex-grow shadow-md mt-5 mb-5 rounded-lg bg-themacolor1 p-5 md:p-10">
        <ul className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mb-14 font-scoreRegular">
          {projects.map((project, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                ease: "easeInOut",
                duration: 0.5,
                delay: index * 0.1,
                y: { duration: 0.5 },
              }}
            >
              <ProjectCard
                title={project.title}
                period={project.period}
                skill={project.skill}
                filter={project.filter}
                description={project.description}
              />
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
