import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const titleLine1 = "Hey there!";
const titleLine2 = "I'm Zaid Kidwai";
const typewriterPhrases = ["Web Developer", "AI Enthusiast", "Freelancer"];

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const letter = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
};

const Hero = () => {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  const currentPhrase = typewriterPhrases[index];

  useEffect(() => {
    const typingSpeed = isDeleting ? 50 : 100;
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
    <section
      id="home"
      className="relative min-h-screen flex items-center bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white px-6 md:px-16 overflow-hidden"
    >
      {/* Background Blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-600 rounded-full opacity-30 blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500 rounded-full opacity-30 blur-3xl animate-blob" />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-500 rounded-full opacity-30 blur-3xl animate-blob animation-delay-4000" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center w-full max-w-7xl mx-auto">
        {/* Text Section */}
        <div className="text-center md:text-left space-y-6">
          <motion.h1
            className="text-4xl md:text-6xl font-bold"
            variants={container}
            initial="hidden"
            animate="visible"
          >
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
          </motion.h1>

          {/* Typewriter Text */}
          <p className="text-2xl md:text-4xl font-extrabold h-12">
            <span className="inline-block bg-gradient-to-r from-purple-400 via-pink-500 to-red-400 bg-clip-text text-transparent drop-shadow-md">
              {text}
            </span>
            <span className="text-purple-200 animate-pulse ml-1">
              {showCursor ? "|" : " "}
            </span>
          </p>

          {/* 🚀 View Projects Button */}
          <motion.a
            href="#projects"
            className="group inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-semibold shadow-lg transition-transform duration-300 transform hover:scale-110 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.5 }}
          >
            🚀 View Projects
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </motion.a>

          {/* Social Icons */}
          <div className="flex justify-center md:justify-start gap-4 mt-4">
            <a
              href="https://github.com/zaidkid"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-purple-400 transition-transform transform hover:scale-110"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/mohd-zaid-kidwai-167892243/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-blue-400 transition-transform transform hover:scale-110"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>

        {/* Image Section */}
        <div className="w-full h-[400px] flex justify-center items-center">
          <motion.img
            src="/my-photo.jpg"
            alt="Zaid Kidwai"
            className="w-64 h-64 md:w-72 md:h-72 rounded-full object-cover border-4 shadow-xl border-white hover:scale-105 hover:rotate-1 transition-all duration-500 ease-in-out"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05, rotate: 1 }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
