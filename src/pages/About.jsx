import { motion } from "framer-motion";
import Lottie from "lottie-react";
import devAnimation from "../assets/dev-lottie.json"; // Replace with your animation

const floatVariants = {
  initial: { y: 0 },
  animate: {
    y: [0, -15, 0],
    transition: { repeat: Infinity, duration: 4, ease: "easeInOut" },
  },
};

const About = () => {
  return (
    <section
      id="about"
      className="relative bg-gradient-to-br from-[#0f0f0f] via-[#111827] to-[#1f2937] text-white py-24 px-6 overflow-hidden"
    >
      {/* Floating Background Shapes */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 bg-purple-500/30 rounded-full blur-2xl"
        variants={floatVariants}
        initial="initial"
        animate="animate"
      />
      <motion.div
        className="absolute bottom-16 right-10 w-20 h-20 bg-pink-500/20 rounded-full blur-2xl"
        variants={floatVariants}
        initial="initial"
        animate="animate"
      />

      {/* Main Grid */}
      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="space-y-6 text-left"
        >
          <h2 className="text-4xl font-bold text-purple-400 relative inline-block">
            About Me
            <span className="absolute left-0 bottom-0 w-full h-1 bg-purple-600 rounded-full blur-sm opacity-40 -z-10"></span>
          </h2>

          <p className="text-gray-300 text-lg leading-relaxed">
            I’m <span className="text-white font-semibold">Zaid Kidwai</span>, a full-stack web developer with a strong command of the{" "}
            <span className="text-purple-300 font-medium">MERN stack</span> and a passion for building smart, scalable digital experiences.
          </p>

          <p className="text-gray-400 text-base">
            I specialize in creating modern UIs with <span className="text-purple-300">Next.js</span> and{" "}
            <span className="text-purple-300">Tailwind CSS</span>, and I integrate intelligent backend features using{" "}
            <span className="text-purple-300">Python</span>, <span className="text-purple-300">Flask</span>, and{" "}
            <span className="text-purple-300">MongoDB</span>. Whether developing a legal AI engine or a personal portfolio, I aim to build solutions that are clean, fast, and impactful.
          </p>
        </motion.div>

        {/* Lottie Animation */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="w-full h-[400px] md:h-[480px] overflow-hidden"
        >
          <Lottie
            animationData={devAnimation}
            loop={true}
            className="w-full h-full object-contain"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default About;
