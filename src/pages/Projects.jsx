import { motion } from "framer-motion";

const projects = [
  {
    title: "AI Legal Research Engine",
    description: "A semantic legal research tool using BERT and NLP to find relevant case law and articles. Built for Indian commercial courts.",
    image: "/images/legal-ai.png", // 📸 Your image path
    tech: ["NextJs", "Flask", "Tailwind CSS", "Sentence-BERT Model"],
  },
  {
    title: "Kodivia Import/Export Website",
    description: "A responsive import/export business website for India–China logistics, featuring product listing, shipping info, and contact tools.",
    image: "/images/kodivia.png", // 📸 Your image path
    tech: ["NextJs", "NodeJs", "MongoDB", "Tailwind CSS", "Responsive Design"],
  },
  {
    title: "Personal Portfolio Website",
    description:
      "My professional portfolio showcasing projects, skills, and experience. Built with modern design, animations, and responsive layout.",
    image: "/images/portfolio.png", // 🔁 Replace with your portfolio image path
    tech: ["ReactJs", "Framer Motion", "Tailwind CSS", "Responsive UI"],
  }
];

const Projects = () => {
  return (
    <section
      id="projects"
      className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white py-20 px-6 overflow-hidden"
    >
      {/* Blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-600 rounded-full opacity-20 blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500 rounded-full opacity-20 blur-3xl animate-blob" />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-500 rounded-full opacity-20 blur-3xl animate-blob animation-delay-4000" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto space-y-24">
        <h2 className="text-4xl font-bold text-center mb-12">🚀 Projects</h2>

        {projects.map((project, i) => (
          <motion.div
            key={i}
            className={`flex flex-col md:flex-row items-center gap-8 ${
              i % 2 !== 0 ? "md:flex-row-reverse" : ""
            }`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: i * 0.2 }}
            viewport={{ once: true }}
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full md:w-1/2 rounded-xl shadow-lg border border-gray-700"
            />
            <div className="md:w-1/2 text-left">
              <h3 className="text-2xl font-semibold text-purple-400 mb-2">
                {project.title}
              </h3>
              <p className="text-gray-300 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, j) => (
                  <span
                    key={j}
                    className="bg-purple-700 bg-opacity-30 text-sm px-3 py-1 rounded-full text-purple-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
