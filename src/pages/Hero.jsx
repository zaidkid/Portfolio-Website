import { useEffect, useState } from "react";
import { motion } from "framer-motion";

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

  // Typewriter logic
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

  // Cursor blinking
  useEffect(() => {
    const blink = setInterval(() => setShowCursor((prev) => !prev), 500);
    return () => clearInterval(blink);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white px-6 md:px-16 overflow-hidden"
    >
      {/* Floating Background Blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-600 rounded-full opacity-30 blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500 rounded-full opacity-30 blur-3xl animate-blob" />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-500 rounded-full opacity-30 blur-3xl animate-blob animation-delay-4000" />
      </div>

      {/* Main Content Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center w-full max-w-7xl mx-auto">
        {/* 👉 TEXT SECTION */}
        <div className="text-left space-y-6">
          <motion.h1
            className="text-4xl md:text-6xl font-bold"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            <div className="flex flex-wrap">
              {titleLine1.split("").map((char, i) => (
                <motion.span key={i} variants={letter}>
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </div>
            <div className="flex flex-wrap">
              {titleLine2.split("").map((char, i) => (
                <motion.span key={`line2-${i}`} variants={letter}>
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </div>
          </motion.h1>

          <p className="text-xl md:text-2xl text-gray-300 h-8">
            {text}
            <span className="text-white">{showCursor ? "|" : " "}</span>
          </p>

          <motion.a
            href="#projects"
            className="bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition inline-block"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 2.5 }}
          >
            🚀 View Projects
          </motion.a>
        </div>

        {/* 👉 IMAGE SECTION */}
        <div className="w-full h-[400px] flex justify-center items-center">
          <motion.img
            src="/my-photo.jpg"
            alt="Zaid Kidwai"
            className="w-72 h-72 rounded-full object-cover border-4 shadow-xl border-white/100 hover:scale-105 hover:rotate-1 transition-all duration-500 ease-in-out"
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
