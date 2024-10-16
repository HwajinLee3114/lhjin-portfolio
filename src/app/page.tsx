"use client";

import Footer from "@/components/comn/Footer";
import Header from "@/components/comn/Header";
import Projects from "./project/page";
import HomeSec from "./home/page";
import About from "./about/page";
import Career from "./career/page";
import Skills from "./skills/page";
import { useState } from "react";

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
