import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

// List of projects
const projects = [
  {
    title: "AI Legal Research Engine",
    description: "A semantic legal research tool using BERT and NLP to find relevant case law and articles. Built for Indian commercial courts.",
    image: "/images/legal-ai.png",
    tech: ["NextJs", "Flask", "Tailwind CSS", "Sentence-BERT Model"],
    github: "https://github.com/zaidkid/AI-Legal-Research-Engine",
    vercel: "https://ai-legal-research-engine.vercel.app/",
  },
  {
    title: "Kodivia Import/Export Website",
    description: "A responsive import/export business website for India–China logistics, featuring product listing, shipping info, and contact tools.",
    image: "/images/kodivia.png",
    tech: ["NextJs", "NodeJs", "MongoDB", "Tailwind CSS", "Responsive Design"],
    github: "https://github.com/zaidkid/Kodivia-Exports",
    vercel: "https://kodivia-exports.vercel.app/",
  },
  {
    title: "Personal Portfolio Website",
    description: "My professional portfolio showcasing projects, skills, and experience. Built with modern design, animations, and responsive layout.",
    image: "/images/portfolio.png",
    tech: ["ReactJs", "Framer Motion", "Tailwind CSS", "Responsive UI"],
    github: "https://github.com/zaidkid/Portfolio-Website",
    vercel: "https://portfolio-zaidkidwai.vercel.app/",
  },
  {
    title: "Jewellery Website",
    description: "A modern, responsive jewellery e-commerce site with product showcases, shopping cart, and contact features.",
    image: "/images/Jewelora.png",
    tech: ["NextJs", "NodeJs", "Tailwind CSS", "Responsive UI"],
    github: "https://github.com/zaidkid/Jewellery-website",
    vercel: "https://jewellery-website-weld.vercel.app/",
  }
];

// Motion variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.3 },
  }),
};

const Projects = () => {
  return (
    <section
      id="projects"
      className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white py-20 px-6 overflow-hidden"
    >
      {/* Background Blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-600 rounded-full opacity-20 blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500 rounded-full opacity-20 blur-3xl animate-blob" />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-500 rounded-full opacity-20 blur-3xl animate-blob animation-delay-4000" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto space-y-24">
        <h2 className="text-4xl font-bold text-center mb-12">🚀 Projects</h2>

        {projects.map((project, i) => (
          <motion.div
            key={i}
            className={`flex flex-col md:flex-row items-center gap-8 ${
              i % 2 !== 0 ? "md:flex-row-reverse" : ""
            }`}
            custom={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Image */}
            <motion.img
              src={project.image}
              alt={project.title}
              className="w-full md:w-1/2 rounded-xl shadow-lg border border-gray-700"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            />

            {/* Text Content */}
            <div className="md:w-1/2 text-left space-y-4">
              <h3 className="text-2xl font-semibold text-purple-400">
                {project.title}
              </h3>
              <p className="text-gray-300">{project.description}</p>

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

              {/* Action Buttons */}
              <div className="flex gap-4 pt-2">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-md text-sm transition duration-200"
                  >
                    <FaGithub /> GitHub
                  </a>
                )}
                {project.vercel && (
                  <a
                    href={project.vercel}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-md text-sm transition duration-200"
                  >
                    <FaExternalLinkAlt /> Live Site
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
