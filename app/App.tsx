import NavBar from "./components/generics/NavBar";
import Intro from "./components/sections/Intro";
import Projects from "./components/sections/Projects";
import Skills from "./components/sections/Skills";
import About from "./components/sections/About";

export default function App() {
  return (
    <div>
      <NavBar />
      <Intro />
      <Projects />
      <Skills />
      <About />
    </div>
  );
}
