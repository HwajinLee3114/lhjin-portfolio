"use client";
import { useState } from "react";

import Projects from "./project/page";
import HomeSec from "./home/page";
import About from "./about/page";
import Career from "./career/page";
import Skills from "./skills/page";

import Footer from "@/components/comn/Footer";
import Header from "@/components/comn/Header";

export default function Home() {
  const [activeSection, setActiveSection] = useState<string>("");
  return (
    <div>
      <Header
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <main>
        <HomeSec />
        <About />
        <Skills />
        <Projects />
        <Career />
      </main>
      <Footer />
      <div id="modalTmp"></div>
    </div>
  );
}
