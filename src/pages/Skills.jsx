import { motion } from "framer-motion";
import { FaReact, FaPython, FaGitAlt } from "react-icons/fa";
import {
  SiTailwindcss,
  SiJavascript,
  SiFlask,
  SiMongodb,
  SiNextdotjs,
  SiOpenai,
} from "react-icons/si";
import { TbSql } from "react-icons/tb";

const skills = [
  {
    name: "React",
    icon: <FaReact className="text-[#61DAFB]" />,
    desc: "JavaScript library for UI",
  },
  {
    name: "Tailwind CSS",
    icon: <SiTailwindcss className="text-[#38BDF8]" />,
    desc: "Utility-first CSS framework",
  },
  {
    name: "JavaScript",
    icon: <SiJavascript className="text-[#F7DF1E]" />,
    desc: "Core scripting language",
  },
  {
    name: "Python",
    icon: <FaPython className="text-[#3776AB]" />,
    desc: "Versatile programming language",
  },
  {
    name: "Flask",
    icon: <SiFlask className="text-white" />,
    desc: "Lightweight Python web framework",
  },
  {
    name: "Next.js",
    icon: <SiNextdotjs className="text-white" />,
    desc: "React-based full stack framework",
  },
  {
    name: "Git",
    icon: <FaGitAlt className="text-[#F1502F]" />,
    desc: "Version control system",
  },
  {
    name: "BERT",
    icon: <SiOpenai className="text-[#7E22CE]" />,
    desc: "Transformer-based NLP model",
  },
  {
    name: "SQL",
    icon: <TbSql className="text-[#4479A1]" />,
    desc: "Structured Query Language",
  },
  {
    name: "MongoDB",
    icon: <SiMongodb className="text-[#47A248]" />,
    desc: "NoSQL document database",
  },
];

const Skills = () => {
  return (
    <section
      id="skills"
      className="min-h-screen bg-gradient-to-b from-[#111827] to-[#0f0f0f] text-white py-20 px-6 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12 text-white">🧠 My Skills</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 justify-items-center">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="group bg-[#1f2937] p-6 rounded-xl border border-gray-700 shadow-md hover:shadow-lg hover:-translate-y-1 transition duration-300 w-full flex flex-col items-center justify-center text-center relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl mb-2">{skill.icon}</div>
              <span className="text-sm text-gray-200">{skill.name}</span>

              {/* Tooltip */}
              <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition duration-300 bg-black px-3 py-1 text-xs rounded shadow z-10 text-gray-300">
                {skill.desc}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
