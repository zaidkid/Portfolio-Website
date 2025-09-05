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

const floatVariants = (duration) => ({
  initial: { y: 0 },
  animate: {
    y: [0, -15, 0],
    transition: { repeat: Infinity, duration, ease: "easeInOut" },
  },
});

const fadeIn = (direction, delay) => ({
  hidden: { opacity: 0, x: direction === "left" ? -60 : 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay } },
});

const About = () => {
  return (
    <section
      id="about"
      className="relative bg-gradient-to-br from-[#0b0415] via-[#161018] to-[#02192b] text-white py-24 px-6 overflow-hidden"
    >
      {/* 🔵 Background Glow Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/3 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* 🌐 Floating Blobs */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl"
        variants={floatVariants(6)}
        initial="initial"
        animate="animate"
      />
      <motion.div
        className="absolute bottom-16 right-10 w-24 h-24 bg-cyan-400/20 rounded-full blur-2xl"
        variants={floatVariants(8)}
        initial="initial"
        animate="animate"
      />

      {/* 📄 Content */}
      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
        {/* 📝 Text Section */}
        <motion.div
          variants={fadeIn("left", 0.2)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-6 text-left"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-serif tracking-tight text-white">
            About Me
          </h2>

          <p className="text-purple-100/90 text-lg leading-relaxed font-serif">
            Hi, I’m{" "}
            <span className="text-white font-semibold">Zaid Kidwai</span>, a
            developer passionate about building{" "}
            <span className="text-blue-200">scalable</span>,{" "}
            <span className="text-blue-200">AI-powered</span>, and{" "}
            <span className="text-blue-200">impactful</span> digital solutions.
            I specialize in blending{" "}
            <span className="text-blue-200">Web Development</span>,{" "}
            <span className="text-blue-200">Artificial Intelligence</span>, and{" "}
            <span className="text-blue-200">Data Science</span>.
          </p>

          <p className="text-blue-200/80 text-base font-serif">
            With hands-on experience in the{" "}
            <span className="text-blue-100">MERN stack</span>,{" "}
            <span className="text-blue-100">Next.js</span>, and{" "}
            <span className="text-blue-100">Python</span>-based AI/ML pipelines,
            I craft responsive applications backed by intelligent automation and
            data-driven insights.
          </p>

          {/* 🔧 Skills */}
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
                  className="px-4 py-2 rounded-full bg-blue-600/10 border border-blue-400/30 text-blue-100 text-sm font-medium hover:bg-blue-500/20 transition shadow-md"
                >
                  {skill}
                </motion.span>
              )
            )}
          </motion.div>
        </motion.div>

        {/* 🎥 Lottie Animation */}
        <motion.div
          variants={jumpVariants}
          animate="animate"
          className="w-full h-[400px] md:h-[480px] flex justify-center items-center"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 120 }}
        >
          <Lottie
            animationData={devAnimation}
            loop
            className="w-full h-full object-contain drop-shadow-[0_0_25px_rgba(0,150,255,0.3)]"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default About;
