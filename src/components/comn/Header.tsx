"use client";

import React, { useState, useEffect } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleScroll = () => {
    const sections = ["home", "about", "skills", "projects", "career"];
    const scrollY = window.scrollY;

    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) {
        const { offsetTop, clientHeight } = element;

        if (scrollY >= offsetTop - 200 && scrollY < offsetTop + clientHeight) {
          setActiveSection(section);
        }
      }
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id); // 여기에서 활성화 상태 업데이트
    }
    setIsOpen(false);
  };

  return (
    <header className="flex items-center justify-between fixed top-0 w-full p-4 backdrop-blur-sm shadow-md z-50">
      <button onClick={() => scrollToSection("home")} className="font-bold">
        lhjin's Portfolio
      </button>
      {/* 모바일 햄버거 버튼 */}
      <button onClick={toggleMenu} className="md:hidden">
        <div className={`l_hamburger_menu ${isOpen ? "animate" : ""}`}></div>
      </button>
      {/* PC 메뉴 */}
      <nav className="hidden md:flex space-x-4">
        <button
          onClick={() => scrollToSection("about")}
          className={`p-2 l_menu_tab ${
            activeSection === "about" ? "active" : ""
          }`}
        >
          It's ME
        </button>
        <button
          onClick={() => scrollToSection("skills")}
          className={`p-2 l_menu_tab ${
            activeSection === "skills" ? "active" : ""
          }`}
        >
          Skills
        </button>
        <button
          onClick={() => scrollToSection("projects")}
          className={`p-2 l_menu_tab ${
            activeSection === "projects" ? "active" : ""
          }`}
        >
          Projects
        </button>
        <button
          onClick={() => scrollToSection("career")}
          className={`p-2 l_menu_tab ${
            activeSection === "career" ? "active" : ""
          }`}
        >
          Career
        </button>
      </nav>
      {/* 모바일 사이드 메뉴 */}
      <nav
        className={`shadow-md fixed top-0 right-0 bg-themacolor1 h-screen w-3/4 md:hidden transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } z-50`}
      >
        <div className="h-12"></div>
        <button
          onClick={() => scrollToSection("about")}
          className={`block p-4 w-full l_menu_tab ${
            activeSection === "about" ? "active" : ""
          }`}
        >
          It's ME
        </button>
        <button
          onClick={() => scrollToSection("skills")}
          className={`block p-4 w-full l_menu_tab ${
            activeSection === "skills" ? "active" : ""
          }`}
        >
          Skills
        </button>
        <button
          onClick={() => scrollToSection("projects")}
          className={`block p-4 w-full l_menu_tab ${
            activeSection === "projects" ? "active" : ""
          }`}
        >
          Projects
        </button>
        <button
          onClick={() => scrollToSection("career")}
          className={`block p-4 w-full l_menu_tab ${
            activeSection === "career" ? "active" : ""
          }`}
        >
          Career
        </button>
      </nav>
    </header>
  );
};

export default Header;