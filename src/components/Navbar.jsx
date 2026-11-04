import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { FaBars, FaTimes, FaDownload } from "react-icons/fa";
import { Link } from "react-scroll";

const navLinks = [
  { name: "Home", to: "home" },
  { name: "Education", to: "education" },
  { name: "Projects", to: "projects" },
  { name: "Skills", to: "skills" },
  { name: "Contact", to: "contact" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const headerRef = useRef(null);

  // Scroll progress bar (no custom CSS animation needed)
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  // Hide on scroll down, show on scroll up (ref avoids re-registering the listener)
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - lastY.current) < 6) return;
      setHidden(y > lastY.current && y > 80);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on outside click or Escape
  useEffect(() => {
    if (!menuOpen) return;
    const onDown = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) setMenuOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <>
      {/* Scroll progress */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="fixed left-0 top-0 z-[60] h-[3px] w-full origin-left bg-gradient-to-r from-[#6B7280] to-[#E5E7EB]"
      />

      <header
        ref={headerRef}
        className={`fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#14171F]/80 font-['Inter',sans-serif] backdrop-blur-xl transition-transform duration-300 ${
          hidden && !menuOpen ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 text-white md:px-8">
          {/* Logo */}
          <Link
            to="home"
            smooth
            duration={500}
            className="flex cursor-pointer items-center gap-3"
            aria-label="Go to top"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-white text-[15px] font-extrabold text-[#14171F]">
              ZK
            </span>
            <span className="hidden font-['Plus_Jakarta_Sans',sans-serif] text-lg font-extrabold tracking-tight sm:block">
              Zaid Kidwai
            </span>
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                smooth
                duration={500}
                spy
                offset={-64}
                activeClass="!text-white [&>span]:!scale-x-100"
                className="group relative cursor-pointer py-1 text-[15px] font-medium text-[#B6BDC9] transition-colors hover:text-white"
              >
                {link.name}
                <span className="absolute inset-x-0 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded bg-white transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            ))}

            <a
              href="my-portfolio\src\assets\Resume.pdf"
              download="Zaid_Kidwai_Resume.pdf"
              className="inline-flex items-center gap-2 rounded-[10px] bg-white px-5 py-2.5 text-sm font-semibold text-[#14171F] transition hover:-translate-y-0.5 hover:bg-[#E5E7EB]"
            >
              Resume <FaDownload className="text-xs" />
            </a>
          </nav>

          {/* Mobile toggle */}
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 text-xl md:hidden"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              id="mobile-menu"
              aria-label="Mobile"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              className="absolute left-3 right-3 top-[calc(100%+8px)] flex flex-col gap-1 rounded-2xl border border-white/10 bg-[#14171F]/95 p-3 text-white shadow-2xl backdrop-blur-xl md:hidden"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  smooth
                  duration={500}
                  spy
                  offset={-64}
                  activeClass="!bg-white/10 !text-white"
                  className="cursor-pointer rounded-xl px-4 py-3 text-base font-medium text-[#B6BDC9] transition-colors hover:bg-white/5 hover:text-white"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <a
                href="/resume.pdf"
                download
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-base font-semibold text-[#14171F]"
              >
                Download Resume <FaDownload className="text-sm" />
              </a>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Navbar;