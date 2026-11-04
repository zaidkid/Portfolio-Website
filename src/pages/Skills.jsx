import { motion, useScroll, useSpring, useVelocity } from "framer-motion";
import { FaPython, FaGitAlt, FaGithub, FaHtml5, FaCss3Alt, FaReact } from "react-icons/fa";
import {
  SiJavascript,
  SiMongodb,
  SiNextdotjs,
  SiTailwindcss,
  SiFlask,
  SiDjango,
  SiC,
  SiCplusplus,
  SiSqlite,
  SiHuggingface,
  SiPostman,
} from "react-icons/si";
import { Scene, useT, display } from "./ScrollScene";

// Icons are grey and take their brand colour on hover (card glow + border too).
const CATEGORIES = [
  {
    title: "Languages & Databases",
    shift: 30,
    items: [
      { name: "Python", Icon: FaPython, color: "#3776AB", desc: "Versatile language" },
      { name: "HTML", Icon: FaHtml5, color: "#E34F26", desc: "Markup language" },
      { name: "CSS", Icon: FaCss3Alt, color: "#1572B6", desc: "Styling language" },
      { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E", desc: "Web scripting" },
      { name: "C", Icon: SiC, color: "#A8B9CC", desc: "Low-level language" },
      { name: "C++", Icon: SiCplusplus, color: "#659AD2", desc: "OOP language" },
      { name: "MongoDB", Icon: SiMongodb, color: "#47A248", desc: "NoSQL database" },
      { name: "SQL", Icon: SiSqlite, color: "#0F80CC", desc: "Relational database" },
    ],
  },
  {
    title: "Frameworks & Libraries",
    shift: 24,
    items: [
      { name: "ReactJS", Icon: FaReact, color: "#61DAFB", desc: "UI library" },
      { name: "Next.js", Icon: SiNextdotjs, color: "#FFFFFF", desc: "React framework" },
      { name: "Tailwind", Icon: SiTailwindcss, color: "#38BDF8", desc: "Utility-first CSS" },
      { name: "Flask", Icon: SiFlask, color: "#FFFFFF", desc: "Python web framework" },
      { name: "Django", Icon: SiDjango, color: "#44B78B", desc: "Full-stack Python framework" },
    ],
  },
  {
    title: "Tools & Technologies",
    shift: 28,
    items: [
      { name: "Git", Icon: FaGitAlt, color: "#F1502F", desc: "Version control" },
      { name: "Postman", Icon: SiPostman, color: "#FF6C37", desc: "API testing tool" },
      { name: "Github", Icon: FaGithub, color: "#FFFFFF", desc: "Code hosting platform" },
      { name: "BERT", Icon: SiHuggingface, color: "#FFD21E", desc: "NLP transformer model" },
    ],
  },
];

const pad = (n) => String(n).padStart(2, "0");

/** One marquee row: scroll slides it, scroll speed skews it. Rows alternate direction. */
const Row = ({ p, cat, index, dir, skew, reduce }) => {
  const x = useT(p, [0, 1], dir > 0 ? ["0%", `-${cat.shift}%`] : [`-${cat.shift}%`, "0%"]);
  // Staggered entrance: each row rises into place slightly after the previous one.
  const start = 0.01 + index * 0.03;
  const y = useT(p, [start, start + 0.08], [28, 0]);
  const items = Array.from({ length: reduce ? 1 : 3 }, (_, n) => cat.items.map((s) => ({ ...s, n }))).flat();

  return (
    <motion.div style={reduce ? undefined : { y }}>
      <div className="mb-3 flex items-baseline gap-3 px-6 md:mb-4 md:px-16">
        <span className="font-mono text-xs text-[#6B7280] md:text-sm">{pad(index + 1)}</span>
        <h3 className="text-lg font-semibold text-[#E5E7EB] md:text-2xl">{cat.title}</h3>
        <span className="rounded-full border border-[#3A404A] px-2 py-0.5 text-xs text-[#9CA3AF]">
          {cat.items.length}
        </span>
      </div>

      <div
        className={
          reduce
            ? "px-6"
            : "overflow-hidden py-3 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]"
        }
      >
        <motion.ul
          aria-label={cat.title}
          style={reduce ? undefined : { x, skewX: skew }}
          className={`flex gap-4 md:gap-6 ${reduce ? "flex-wrap" : "w-max"}`}
        >
          {items.map(({ name, Icon, color, desc, n }) => (
            <li
              key={`${name}-${n}`}
              aria-hidden={n ? "true" : undefined}
              style={{ "--c": color }}
              className="group flex h-28 w-32 shrink-0 cursor-default flex-col items-center justify-center gap-1.5 rounded-2xl border border-[#3A404A] bg-[#2F343D]/60 backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:border-[color:var(--c)] hover:bg-[#363C47]/80 hover:shadow-[0_12px_36px_-10px_var(--c)] md:h-[min(10rem,17vh)] md:w-44"
            >
              <Icon className="text-4xl text-[#9CA3AF] transition-all duration-300 group-hover:scale-110 group-hover:text-[color:var(--c)] md:text-5xl" />
              <span className="text-sm font-medium text-[#E5E7EB]">{name}</span>
              <span className="hidden px-2 text-center text-xs text-[#9CA3AF] md:block">{desc}</span>
            </li>
          ))}
        </motion.ul>
      </div>
    </motion.div>
  );
};

function Content({ p, reduce }) {
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { stiffness: 400, damping: 50 });
  const skew = useT(velocity, [-3000, 3000], [-10, 10]);
  const scale = useT(p, [0, 0.08], [0.9, 1]);
  const opacity = useT(p, [0, 0.08], [0, 1]);

  return (
    <motion.div
      style={{ scale, opacity }}
      className={`flex flex-col justify-center gap-4 md:gap-[min(2.25rem,3.5vh)] ${
        reduce ? "relative py-24" : "absolute inset-0 pt-16"
      }`}
    >
      <div className="px-6 md:px-16">
        <h2 className={`text-4xl font-extrabold tracking-tight text-[#F3F4F6] md:text-6xl ${display}`}>
          My Skills
        </h2>
        <p className="mt-2 max-w-xl text-sm text-[#9CA3AF] md:text-base">
          The languages, frameworks and tools I use to build full stack and AI/ML projects.
        </p>
      </div>

      {CATEGORIES.map((cat, i) => (
        <Row key={cat.title} p={p} cat={cat} index={i} dir={i % 2 ? -1 : 1} skew={skew} reduce={reduce} />
      ))}
    </motion.div>
  );
}

const Skills = () => (
  <Scene id="skills" vh={250} className="font-['Inter',sans-serif] text-[#9CA3AF]">
    {(p, reduce) => <Content p={p} reduce={reduce} />}
  </Scene>
);

export default Skills;