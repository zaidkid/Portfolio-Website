const Navbar = () => (
  <nav className="fixed top-0 left-0 w-full bg-black text-white p-4 flex justify-center space-x-6 z-50">
    <a href="#home" className="hover:underline">Home</a>
    <a href="#about" className="hover:underline">About</a>
    <a href="#education" className="text-white hover:text-purple-400 transition">Education</a>
    <a href="#projects" className="hover:underline">Projects</a>
    <a href="#skills" className="hover:underline">Skills</a>
    <a href="#contact" className="hover:underline">Contact</a>
  </nav>
);

export default Navbar;
