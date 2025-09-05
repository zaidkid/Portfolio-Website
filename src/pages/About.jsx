"use client";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import devAnimation from "../assets/dev-lottie.json";

const jumpVariants = {
  animate: {
    y: [0, -20, 0],
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
  },
};

const floatVariants = {
  initial: { y: 0 },
  animate: {
    y: [0, -15, 0],
    transition: { repeat: Infinity, duration: 4, ease: "easeInOut" },
  },
};

const fadeIn = (direction: "left" | "right", delay: number) => ({
  hidden: { opacity: 0, x: direction === "left" ? -60 : 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay } },
});

const About = () => {
  return (
    <section
      id="about"
      className="relative bg-gradient-to-br from-[#0a0a0f] via-[#111827] to-[#1f1f2e] text-white py-24 px-6 overflow-hidden"
    >
      {/* Decorative Background Layer */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/3 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Floating Blobs */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 bg-purple-500/30 rounded-full blur-2xl"
        variants={floatVariants}
        initial="initial"
        animate="animate"
      />
      <motion.div
        className="absolute bottom-16 right-10 w-20 h-20 bg-pink-500/30 rounded-full blur-2xl"
        variants={floatVariants}
        initial="initial"
        animate="animate"
      />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
        {/* Text Section */}
        <motion.div
          variants={fadeIn("left", 0.2)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-6 text-left"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-serif bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg">
            About Me
          </h2>

          <p className="text-gray-300 text-lg leading-relaxed font-serif">
            Hi, I’m{" "}
            <span className="text-white font-semibold">Zaid Kidwai</span>, a
            developer passionate about building{" "}
            <span className="text-purple-300 font-medium">scalable</span>,{" "}
            <span className="text-purple-300 font-medium">AI-powered</span>, and{" "}
            <span className="text-purple-300 font-medium">impactful</span>{" "}
            digital solutions. I specialize in blending{" "}
            <span className="text-purple-300">Web Development</span>,{" "}
            <span className="text-purple-300">Artificial Intelligence</span>, and{" "}
            <span className="text-purple-300">Data Science</span>.
          </p>

          <p className="text-gray-400 text-base font-serif">
            With experience in the{" "}
            <span className="text-purple-300">MERN stack</span>,{" "}
            <span className="text-purple-300">Next.js</span>, and{" "}
            <span className="text-purple-300">Python</span>-based AI/ML
            pipelines, I craft responsive applications backed by intelligent
            automation and data-driven insights.
          </p>

          {/* Skills */}
          <motion.div
            className="flex flex-wrap gap-3 pt-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {["Next.js", "TailwindCSS", "MongoDB", "Flask", "AI/ML"].map(
              (skill, i) => (
                <motion.span
                  key={skill}
                  variants={fadeIn("left", 0.3 + i * 0.1)}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 text-purple-300 text-sm font-medium hover:scale-105 hover:from-purple-600/40 hover:to-pink-600/40 transition-transform shadow-md"
                >
                  {skill}
                </motion.span>
              )
            )}
          </motion.div>
        </motion.div>

        {/* Animation Section */}
        <motion.div
          variants={jumpVariants}
          animate="animate"
          className="w-full h-[400px] md:h-[480px] flex justify-center items-center"
          whileHover={{ scale: 1.05, rotate: 1 }}
          transition={{ type: "spring", stiffness: 120 }}
        >
          <Lottie
            animationData={devAnimation}
            loop
            className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(168,85,247,0.5)]"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default About;
