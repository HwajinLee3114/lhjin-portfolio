import Career from "@/components/Career";
import Header from "@/components/Header";
import HomeSec from "@/components/Home";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";

export default function Home() {
  return (
    <div>
      <Header />
      <main>
        <HomeSec />
        <Skills />
        <Projects />
        <Career />    
      </main>
    </div>
  );
}
