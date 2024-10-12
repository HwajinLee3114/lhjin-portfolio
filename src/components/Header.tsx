"use client";

import React, { useEffect, useState } from "react";

const Header = () => {
  const [activeSection, setActiveSection] = useState<string>("home");
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScroll = () => {
    const sections = ["skills", "projects", "career"]; // 'home' 제외
    const scrollPosition = window.scrollY + 100; // 헤더 높이에 맞춰 조정

    // 메인 섹션 active 해제
    const homeSection = document.getElementById("home");
    if (
      homeSection &&
      scrollPosition < homeSection.offsetTop + homeSection.clientHeight
    ) {
      setActiveSection("");
      // return;
    }

    // 스크롤 상태 업데이트
    if (scrollPosition > 105) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }

    for (const sectionId of sections) {
      const section = document.getElementById(sectionId);
      if (section) {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          setActiveSection(sectionId);
          break;
        }
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`flex justify-between fixed top-0 left-0 right-0 p-4 z-10 transition-all duration-300 
      ${
        isScrolled
          ? "bg-white text-maincolor shadow-lg"
          : "bg-transparent text-black"
      }`}
    >
      <button
        className="text-2xl font-bold"
        onClick={() => scrollToSection("home")}
      >
        lhjin's Portfolio
      </button>
      <nav className="mt-2">
        {["skills", "projects", "career"].map(
          (section) => (
            <button
              key={section}
              className={`mx-2 text-lg ${
                activeSection === section ? "underline" : ""
              }`} // active 클래스 적용
              onClick={() => scrollToSection(section)}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          )
        )}
      </nav>
    </header>
  );
};

export default Header;
