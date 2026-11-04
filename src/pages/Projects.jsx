import { motion, useMotionTemplate } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { Scene, useT, display, ring } from "./ScrollScene";

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
  },
];

const N = projects.length;
const SLOT = 0.72 / (N - 1);
const win = (i) => [0.08 + (i - 1) * SLOT, 0.08 + (i - 0.25) * SLOT]; // scroll range in which card i slides in (i >= 1)
const clamp01 = (x) => Math.min(1, Math.max(0, x));

const link = `flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${ring}`;

const Body = ({ pr, i, imgScale }) => (
  <div className="grid h-full grid-cols-1 content-center gap-4 md:grid-cols-2 md:gap-10">
    <div className={`h-[110px] min-h-[110px] overflow-hidden rounded-2xl border border-[#3A404A] md:h-full md:min-h-[220px] ${i % 2 ? "md:order-2" : ""}`}>
      <motion.img src={pr.image} alt={pr.title} style={{ scale: imgScale }} className="h-full w-full object-cover" />
    </div>
    <div className="flex flex-col justify-center gap-3 md:gap-4">
      <h3 className={`text-2xl font-extrabold tracking-tight text-[#F3F4F6] md:text-4xl ${display}`}>{pr.title}</h3>
      <p className="text-sm md:text-base">{pr.description}</p>
      <ul className="flex flex-wrap gap-2">
        {pr.tech.map((t) => (
          <li key={t} className="rounded-full border border-[#4B5563] px-3 py-1 text-xs text-[#E5E7EB] md:text-sm">{t}</li>
        ))}
      </ul>
      <div className="flex gap-3 pt-1">
        <a href={pr.github} target="_blank" rel="noopener noreferrer" className={`${link} border border-[#4B5563] bg-[#2F343D]/80 text-[#F3F4F6] hover:border-[#F3F4F6]`}>
          <FaGithub /> GitHub
        </a>
        <a href={pr.vercel} target="_blank" rel="noopener noreferrer" className={`${link} bg-[#F3F4F6] text-[#14171F] hover:bg-white`}>
          <FaExternalLinkAlt /> Live Site
        </a>
      </div>
    </div>
  </div>
);

/** Card i slides up over the stack; cards beneath it shrink, lift and dim. */
const Card = ({ p, i, pr }) => {
  const [a, b] = i ? win(i) : [0, 1];
  const y = useT(p, [a, b], i ? ["105vh", "0vh"] : ["0vh", "0vh"]);
  const imgScale = useT(p, [a, b], i ? [1.2, 1] : [1, 1]);
  const depth = useT(p, (v) => projects.reduce((d, _, j) => (j > i ? d + clamp01((v - win(j)[0]) / (win(j)[1] - win(j)[0])) : d), 0));
  const scale = useT(depth, (d) => 1 - d * 0.06);
  const lift = useT(depth, (d) => -d * 26);
  const dim = useT(depth, (d) => 1 - d * 0.3);
  const filter = useMotionTemplate`brightness(${dim})`;

  return (
    <motion.li style={{ y, zIndex: i }} className="absolute inset-0">
      <motion.div style={{ scale, y: lift, filter }} className="h-full origin-top overflow-hidden rounded-3xl border border-[#3A404A] bg-[#2A2E35] p-5 shadow-2xl shadow-black/40 md:p-8">
        <Body pr={pr} i={i} imgScale={imgScale} />
      </motion.div>
    </motion.li>
  );
};

function Stage({ p, reduce }) {
  const scale = useT(p, [0, 0.08], [0.92, 1]);
  const opacity = useT(p, [0, 0.08], [0, 1]);
  const current = useT(p, (v) => 1 + projects.reduce((n, _, j) => (j && v > (win(j)[0] + win(j)[1]) / 2 ? n + 1 : n), 0));
  const counter = useT(current, (c) => `0${c} / 0${N}`);
  const title = `text-4xl font-extrabold tracking-tight text-[#F3F4F6] md:text-6xl ${display}`;

  if (reduce)
    return (
      <div className="mx-auto max-w-6xl space-y-8 px-6 py-24 md:px-16">
        <h2 className={title}>Projects</h2>
        {projects.map((pr, i) => (
          <div key={pr.title} className="rounded-3xl border border-[#3A404A] bg-[#2A2E35] p-5 md:p-8">
            <Body pr={pr} i={i} />
          </div>
        ))}
      </div>
    );

  return (
    <motion.div style={{ scale, opacity }} className="absolute inset-0 mx-auto max-w-6xl">
      <div className="absolute inset-x-6 top-24 flex items-end justify-between md:inset-x-16">
        <h2 className={title}>Projects</h2>
        <motion.span aria-hidden="true" className={`text-sm tabular-nums text-[#D1D5DB] ${display}`}>{counter}</motion.span>
      </div>
      <ol className="absolute inset-x-6 bottom-6 top-40 md:inset-x-16">
        {projects.map((pr, i) => <Card key={pr.title} p={p} i={i} pr={pr} />)}
      </ol>
    </motion.div>
  );
}

const Projects = () => (
  <Scene id="projects" vh={100 + N * 100} className="font-['Inter',sans-serif] text-[#9CA3AF]">
    {(p, reduce) => <Stage p={p} reduce={reduce} />}
  </Scene>
);

export default Projects;