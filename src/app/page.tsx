import Footer from "@/components/comn/Footer";
import Header from "@/components/comn/Header";
import Projects from "./project/page";
import HomeSec from "./home/page";
import About from "./about/page";
import Career from "./career/page";
import Skills from "./skills/page";

export default function Home() {
  return (
    <div>
      <Header />
      <main>
        <HomeSec />
        <About />
        <Skills />
        <Projects />
        <Career />
      </main>
      <Footer />
    </div>
  );
}
