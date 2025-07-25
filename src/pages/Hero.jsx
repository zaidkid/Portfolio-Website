"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring} from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const titleLine1 = "Hey there!";
const titleLine2 = "I'm Zaid Kidwai";
const typewriterPhrases = ["Web Developer", "AI Enthusiast", "Freelancer"];

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.3 },
  },
};

const letter = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 500, damping: 30 },
  },
};

const Hero = () => {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  const currentPhrase = typewriterPhrases[index];

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 30, stiffness: 300 });
  const smoothY = useSpring(mouseY, { damping: 30, stiffness: 300 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const typingSpeed = isDeleting ? 40 : 100;
    const pause = 1200;

    const timeout = setTimeout(() => {
      if (!isDeleting && charIndex < currentPhrase.length) {
        setText(currentPhrase.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      } else if (isDeleting && charIndex > 0) {
        setText(currentPhrase.substring(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
      } else {
        if (!isDeleting) {
          setTimeout(() => setIsDeleting(true), pause);
        } else {
          setIsDeleting(false);
          setIndex((prev) => (prev + 1) % typewriterPhrases.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, currentPhrase]);

  useEffect(() => {
    const blink = setInterval(() => setShowCursor((prev) => !prev), 500);
    return () => clearInterval(blink);
  }, []);

  return (
    <motion.section
      id="home"
      className="relative min-h-screen flex items-center text-white font-serif px-6 md:px-16 overflow-hidden"
      aria-label="Hero Section"
      style={{
        backgroundColor: "#050B18",
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
      }}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {/* 🔦 Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: `radial-gradient(350px at ${smoothX.get()}px ${smoothY.get()}px, rgba(255,255,255,0.07), transparent 80%)`,
        }}
      />

      {/* 🔵 Blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div
          className="absolute top-0 left-0 w-80 h-80 bg-indigo-600 rounded-full opacity-30 blur-3xl"
          animate={{ x: [0, 20, -20, 0], y: [0, -15, 15, 0] }}
          transition={{ duration: 25, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-96 h-96 bg-blue-700 rounded-full opacity-30 blur-3xl"
          animate={{ x: [0, 30, -30, 0], y: [0, 20, -20, 0] }}
          transition={{ duration: 35, repeat: Infinity }}
        />
      </div>

      {/* 📄 Main Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center w-full max-w-7xl mx-auto">
        {/* 📝 Text Section */}
        <motion.div
          className="text-center md:text-left space-y-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          variants={container}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold">
            <div className="flex justify-center md:justify-start flex-wrap">
              {titleLine1.split("").map((char, i) => (
                <motion.span key={i} variants={letter}>
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </div>
            <div className="flex justify-center md:justify-start flex-wrap">
              {titleLine2.split("").map((char, i) => (
                <motion.span key={`line2-${i}`} variants={letter}>
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </div>
          </h1>

          {/* ⌨️ Typewriter */}
          <p className="text-2xl md:text-4xl font-extrabold h-12">
            <motion.span
              className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-400 bg-clip-text text-transparent drop-shadow-sm"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 6, repeat: Infinity }}
            >
              {text}
            </motion.span>
            <motion.span
              className="text-purple-200 ml-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: showCursor ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            >
              |
            </motion.span>
          </p>

          {/* 🎯 CTA */}
          <motion.a
            href="#projects"
            className="group inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-semibold shadow-md hover:bg-gradient-to-r hover:from-pink-500 hover:to-indigo-500 hover:text-white transition focus:outline-none"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🚀 View Projects <span className="group-hover:translate-x-1 transition">→</span>
          </motion.a>

          {/* 🌐 Socials */}
          <div className="flex justify-center md:justify-start gap-4 mt-4">
            <motion.a
              href="https://github.com/zaidkid"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-purple-400"
              whileHover={{ scale: 1.15 }}
              transition={{ type: "spring", stiffness: 300 }}
              aria-label="GitHub profile"
            >
              <FaGithub />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/mohd-zaid-kidwai-167892243/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-blue-400"
              whileHover={{ scale: 1.15 }}
              transition={{ type: "spring", stiffness: 300 }}
              aria-label="LinkedIn profile"
            >
              <FaLinkedin />
            </motion.a>
          </div>
        </motion.div>

        {/* 👤 Profile Image */}
        <motion.div
          className="w-full h-[220px] sm:h-[300px] md:h-[400px] flex justify-center items-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.img
            src="/my-photo.jpg"
            alt="Portrait of Zaid Kidwai smiling"
            className="w-40 h-40 sm:w-60 sm:h-60 md:w-72 md:h-72 rounded-full object-cover border-4 border-white shadow-xl"
            whileHover={{ scale: 1.05, rotate: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            loading="lazy"
          />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Hero;
