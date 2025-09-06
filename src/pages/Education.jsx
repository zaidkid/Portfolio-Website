import { motion } from "framer-motion";

const educationData = [
  {
    degree: "B.Tech Computer Science Engineering(CSE)",
    institution: "Bennett University, Noida",
    year: "2023 - 2027",
    details:
      "Specialized in AI/ML, and Web Development. Completed projects on semantic search and full-stack websites.",
  },
  {
    degree: "Higher Secondary (Class 12th)",
    institution: "St.Anthony's School, Barabanki",
    year: "2022",
    details:
      "Studied PCM with Computer Science. Developed interest in programming and problem-solving.",
  },
  {
    degree: "Secondary (Class 10th)",
    institution: "St.Anthony's School, Barabanki",
    year: "2020",
    details:
      "Studied science and mathematics, which later helped me develop problem-solving skills.",
  },
];

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2 },
  }),
};

const Education = () => {
  return (
    <section
      id="education"
      className="min-h-screen bg-gradient-to-b from-[#111827] to-[#0f0f0f] text-white py-20 px-6"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center text-purple-400">
          🎓 Education
        </h2>

        <div className="space-y-10">
          {educationData.map((edu, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={itemVariants}
              className="border-l-4 border-purple-500 pl-6 relative"
            >
              <div className="absolute -left-2 top-1 w-4 h-4 bg-purple-500 rounded-full" />
              <h3 className="text-xl font-semibold text-purple-300">
                {edu.degree}
              </h3>
              <p className="text-gray-300">{edu.institution}</p>
              <span className="text-sm text-gray-400 italic">{edu.year}</span>
              <p className="text-gray-400 mt-2">{edu.details}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
