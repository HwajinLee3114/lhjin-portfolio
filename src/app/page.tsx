import About from "@/components/About";
import Career from "@/components/Career";
import Footer from "@/components/Footer";
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
        <About />
        <Skills />
        <Projects />
        <Career />    
      </main>
      <Footer />
    </div>
  );
}
