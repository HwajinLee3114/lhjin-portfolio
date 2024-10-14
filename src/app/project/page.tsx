import ProjectCard from "@/components/comn/ProjectCard";
import React from "react";

/*
  - 필터(전체/개인/팀), 주요 프로젝트만 보기(체크)
  - 프로젝트 카드 컴포넌트 생성
    > 미리보기 이미지
      제목, 필터 항목 해시태그 처럼
      개발 기간 yy.mm ~ yy.mm
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


      <div className="w-full h-full flex-grow shadow-md mt-5 mb-5 rounded-lg bg-themacolor1 p-5 md:p-10">
        <ul className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3  mb-14 font-scoreRegular">
          <li>
            {/* link, imageSrc */}
            <ProjectCard
            title="프로젝트명"
            period="2024.10 ~ 2024.11"
            skill="react, javascript, mysql"
            filter={[
              {
                name:'filter1',
                color:'skyblue'
              },
              {
                name:'filter2',
                color:'coral'
              }
            ]}
            description={[
              '설명1',
              '설명2설명2설명2설명2설명2설명2설명2설명2설명2설명2설명2설명2설명2설명2설명2설명2설명2설명2설명2설명2설명2'
            ]}
            />
          </li>
        </ul>
      </div>
    </section>
  );
}
