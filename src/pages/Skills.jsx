import { motion } from "framer-motion";
import {
  FaPython, FaGitAlt, FaGithub, FaHtml5, FaCss3Alt, FaReact, FaJava,
} from "react-icons/fa";
import {
  SiJavascript, SiMongodb, SiNextdotjs, SiTailwindcss,
  SiFlask, SiDjango, SiC, SiCplusplus, SiSqlite, SiOpenai, SiPostman,
} from "react-icons/si";

const skillCategories = [
  {
    title: "Languages & Databases",
    items: [
      { name: "Python", icon: <FaPython className="text-[#3776AB]" />, desc: "Versatile language" },
      { name: "HTML", icon: <FaHtml5 className="text-[#E34F26]" />, desc: "Markup language" },
      { name: "CSS", icon: <FaCss3Alt className="text-[#1572B6]" />, desc: "Styling language" },
      { name: "JavaScript", icon: <SiJavascript className="text-[#F7DF1E]" />, desc: "Web scripting" },
      { name: "C", icon: <SiC className="text-[#A8B9CC]" />, desc: "Low-level language" },
      { name: "C++", icon: <SiCplusplus className="text-[#00599C]" />, desc: "OOP Language" },
      { name: "Java", icon: <FaJava className="text-[#007396]" />, desc: "Enterprise language" },
      { name: "MongoDB", icon: <SiMongodb className="text-[#47A248]" />, desc: "NoSQL Database" },
      { name: "SQL", icon: <SiSqlite className="text-[#003B57]" />, desc: "Relational Database" },
    ],
  },
  {
    title: "Frameworks & Libraries",
    items: [
      { name: "ReactJS", icon: <FaReact className="text-[#61DAFB]" />, desc: "UI library" },
      { name: "Next.js", icon: <SiNextdotjs className="text-white" />, desc: "React framework" },
      { name: "Tailwind", icon: <SiTailwindcss className="text-[#38BDF8]" />, desc: "CSS utility classes" },
      { name: "Flask", icon: <SiFlask className="text-white" />, desc: "Python web framework" },
      { name: "Django", icon: <SiDjango className="text-white" />, desc: "Full-stack Python framework" },
    ],
  },
  {
    title: "Tools & Technologies",
    items: [
      { name: "Git", icon: <FaGitAlt className="text-[#F1502F]" />, desc: "Version control" },
      { name: "Postman", icon: <SiPostman className="text-[#FF6C37]"/>, desc: "API testing tool"},
      { name: "Github", icon: <FaGithub className="text-white"/>, desc: "Code hosting platform"},
      { name: "BERT", icon: <SiOpenai className="text-[#7E22CE]" />, desc: "NLP transformer model" },
    ],
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 60 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

const Skills = () => {
  return (
    <section
      id="skills"
      className="min-h-screen bg-gradient-to-b from-[#111827] to-black text-white py-20 px-6"
    >
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-16">🧠 My Skills</h2>

        <div className="space-y-20">
          {skillCategories.map((category, index) => (
            <div key={index}>
              <h3 className="text-2xl font-semibold mb-10 text-purple-400 text-center">
                {category.title}
              </h3>

              <motion.div
                className="flex flex-wrap gap-10 justify-center items-center"
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                {category.items.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    variants={item}
                    whileHover={{ scale: 1.15 }}
                    className="group relative flex flex-col items-center w-24"
                  >
                    <div className="text-6xl mb-2">{skill.icon}</div>
                    <span className="text-sm text-gray-200">{skill.name}</span>

                    {/* Tooltip on hover */}
                    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition duration-300 bg-black bg-opacity-80 px-2 py-1 text-xs rounded text-white whitespace-nowrap z-20 shadow-lg">
                      {skill.desc}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
