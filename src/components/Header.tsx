"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

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
    }
    setIsOpen(false);
  };

  return (
    <header
    // backdrop-blur-sm
      className={`flex items-center justify-between p-4 backdrop-blur-sm shadow-md fixed w-full transition-all duration-300 z-50`}
    >
      <button
        className="font-bold"
        onClick={() => scrollToSection("home")}
      >
        lhjin's Portfolio
      </button>
      <button onClick={toggleMenu} className="md:hidden focus:outline-none">
        {isOpen ? "✖" : "☰"}
      </button>
      <nav className={`hidden md:flex space-x-4`}>
        <button
          onClick={() => scrollToSection("about")}
          className={`p-2 l_menu_tab ${activeSection === "about" ? "active" : ""}`}
        >
          It's ME
        </button>
        <button
          onClick={() => scrollToSection("skills")}
          className={`p-2 l_menu_tab ${activeSection === "skills" ? "active" : ""}`}
        >
          Skills
        </button>
        <button
          onClick={() => scrollToSection("projects")}
          className={`p-2 l_menu_tab ${activeSection === "projects" ? "active" : ""}`}
        >
          Projects
        </button>
        <button
          onClick={() => scrollToSection("career")}
          className={`p-2 l_menu_tab ${activeSection === "career" ? "active" : ""}`}
        >
          Career
        </button>
      </nav>
      <nav
        className={`fixed top-0 right-0 bg-yellow-50 h-screen w-3/4 md:hidden transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } z-50`}
      >
        <button className="p-4" onClick={toggleMenu}>
          ✖
        </button>
        <button
          onClick={() => scrollToSection("about")}
          className={`block p-4 w-full l_menu_tab ${
            activeSection === "about" ? "active" : ""
          }`}
        >
          It's ME
        </button>
        <button
          onClick={() => scrollToSection("about")}
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
