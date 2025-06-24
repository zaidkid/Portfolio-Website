import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-scroll";

const navLinks = [
  { name: "Home", to: "home" },
  { name: "About", to: "about" },
  { name: "Education", to: "education" },
  { name: "Skills", to: "skills" },
  { name: "Projects", to: "projects" },
  { name: "Contact", to: "contact" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/70 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center text-white">
        <Link
          to="home"
          smooth={true}
          duration={500}
          className="text-2xl font-bold text-purple-400 cursor-pointer"
        >
          Zaid.dev
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              smooth={true}
              duration={500}
              spy={true}
              offset={-70}
              activeClass="text-purple-400"
              className="cursor-pointer transition font-medium hover:text-purple-400"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="md:hidden bg-black/90">
          <ul className="flex flex-col items-center py-4 space-y-4 text-lg font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                smooth={true}
                duration={500}
                spy={true}
                offset={-70}
                activeClass="text-purple-400"
                className="cursor-pointer transition hover:text-purple-400"
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
