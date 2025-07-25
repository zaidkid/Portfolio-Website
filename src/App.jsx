import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./pages/Hero";
import About from "./pages/About";
import Education from "./pages/Education";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import Contact from "./pages/Contact";
import "./App.css"; // Make sure this includes the dark mode CSS

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <main>
        <section id="home" className="scroll-mt-20">
          <Hero isDarkMode={darkMode} />
        </section>
        <section id="about" className="scroll-mt-20"><About /></section>
        <section id="Education" className="scroll-mt-20"><Education /></section>
        <section id="projects" className="scroll-mt-20"><Projects /></section>
        <section id="skills" className="scroll-mt-20"><Skills /></section>
        <section id="contact" className="scroll-mt-20"><Contact /></section>
      </main>
      <Footer />
    </>
  );
}

export default App;
