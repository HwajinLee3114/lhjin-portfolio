import Career from "@/components/Career";
import Header from "@/components/Header";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";

export default function Home() {
  return (
    <div>
      <Header />
      <main>
        <section id="home" className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <h1 className="text-4xl font-bold text-center text-blue-600">Welcome to My Portfolio</h1>
          <p className="mt-4 text-lg text-gray-700">I’m a front-end developer specializing in creating beautiful websites.</p>
        </section>

        <Skills />
        <Projects />
        <Career />    
      </main>
    </div>
  );
}
