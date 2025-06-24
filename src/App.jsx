import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./pages/Hero";
import About from "./pages/About";
import Education from "./pages/Education";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import Contact from "./pages/Contact";

function App() {
  return (
    <>
      <Navbar />
      <main>
        <section id="home" className="scroll-mt-20"><Hero /></section>
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
