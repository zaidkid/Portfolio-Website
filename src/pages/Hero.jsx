import { useEffect } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import Lottie from "lottie-react";
import { FaArrowRight, FaDownload, FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import devAnimation from "../assets/dev-lottie.json";
import { Scene, useT, display, ring } from "./ScrollScene";

// TODO: replace with your real email
const EMAIL = "your.email@example.com";

const SOCIALS = [
  { href: "https://github.com/zaidkid", label: "GitHub profile", Icon: FaGithub },
  { href: "https://www.linkedin.com/in/mohd-zaid-kidwai-167892243/", label: "LinkedIn profile", Icon: FaLinkedin },
  { href: `mailto:${EMAIL}`, label: "Send an email", Icon: FaEnvelope },
];

// A leading * makes a word bold.
const PARAS = [
  "Hi, I’m *Zaid *Kidwai, a developer passionate about building scalable, AI-powered, and impactful digital solutions. I specialize in blending Web Development, Artificial Intelligence, and Data Science.",
  "With hands-on experience in the MERN stack, Next.js, and Python-based AI/ML pipelines, I craft responsive applications backed by intelligent automation and data-driven insights.",
];
const N = PARAS.reduce((n, s) => n + s.split(" ").length, 0);
const SKILLS = ["Next.js", "TailwindCSS", "MongoDB", "Flask", "AI/ML"];

const CARDS = [
  { title: "Frontend", line: "Fast, accessible interfaces with motion that earns its place.", tags: ["Next.js", "React", "Tailwind CSS", "Framer Motion"] },
  { title: "Full stack", line: "APIs and data models that hold up behind the interface.", tags: ["Node.js", "Express", "MongoDB", "MERN"] },
  { title: "AI / ML", line: "Models wired into real apps, not left in notebooks.", tags: ["Python", "Machine learning", "Model-backed apps"] },
];

const dotsOnly = "radial-gradient(#4B5563 1.4px, transparent 1.4px)";
const btn = `inline-flex items-center gap-2.5 rounded-xl px-7 py-4 font-semibold transition-colors ${ring}`;

/** Smoothed cursor position in [-1, 1] for parallax. */
function useMouse() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  useEffect(() => {
    const move = (e) => (x.set((e.clientX / window.innerWidth) * 2 - 1), y.set((e.clientY / window.innerHeight) * 2 - 1));
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);
  const spring = { stiffness: 60, damping: 20 };
  return [useSpring(x, spring), useSpring(y, spring)];
}

/** One ring of the zoom tunnel; each ring grows at its own rate to fake depth. */
const Frame = ({ p, i }) => {
  const scale = useT(p, [0, 0.7], [0.12 + i * 0.16, 2 + i * 1.5]);
  const opacity = useT(p, [0, 0.12, 0.55, 0.75], [0, 1, 1, 0]);
  return (
    <motion.div
      aria-hidden="true"
      style={{ scale, opacity }}
      className="absolute inset-0 m-auto h-[42vh] w-[62vw] rounded-3xl border border-[#4B5563]/70 bg-[#2F343D]/10"
    />
  );
};

/** Each word fades up as scroll progress reaches its slot. */
const Word = ({ p, i, bold, children }) => {
  const a = (i / N) * 0.8;
  const opacity = useT(p, [a, a + 0.15], [0.2, 1]);
  return (
    <motion.span style={{ opacity }} className={`mr-[0.28em] inline-block ${bold ? "font-bold text-white" : ""}`}>
      {children}
    </motion.span>
  );
};

const Actions = ({ center }) => (
  <div className={`flex flex-col gap-5 ${center ? "items-center" : "items-center md:items-start"}`}>
    <div className="flex flex-wrap justify-center gap-4 md:justify-start">
      <motion.a href="#projects" whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }} className={`group ${btn} bg-[#F3F4F6] text-[#14171F] shadow-lg shadow-black/30 hover:bg-white`}>
        View Projects
        <FaArrowRight className="transition-transform group-hover:translate-x-1" />
      </motion.a>
      <motion.a href="/resume.pdf" download whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }} className={`group ${btn} border border-[#4B5563] bg-[#2F343D]/80 text-[#F3F4F6] hover:border-[#F3F4F6]`}>
        Download Resume
        <FaDownload className="transition-transform group-hover:translate-y-0.5" />
      </motion.a>
    </div>
    <div className="flex gap-3">
      {SOCIALS.map(({ href, label, Icon }) => (
        <motion.a
          key={label}
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel="noopener noreferrer"
          aria-label={label}
          whileHover={{ y: -4 }}
          className={`flex h-11 w-11 items-center justify-center rounded-xl border border-[#4B5563] bg-[#2F343D]/80 text-xl text-[#F3F4F6] transition-colors hover:border-white ${ring}`}
        >
          <Icon />
        </motion.a>
      ))}
    </div>
  </div>
);

/* 1. Fly through the name into the portrait */
function Tunnel({ p, reduce }) {
  const [mx, my] = useMouse();
  const k = reduce ? 0 : 1;
  const px = useT(mx, [-1, 1], [-24 * k, 24 * k]);
  const py = useT(my, [-1, 1], [-16 * k, 16 * k]);
  const rotate = useT(p, [0, 1], [0, 8]);
  const rush = useT(p, [0, 0.7], [1, 4]);
  const rushOpacity = useT(p, [0, 0.1, 0.6, 0.8], [0, 0.9, 0.9, 0]);
  const nScale = useT(p, [0, 0.5], [1, 16]);
  const nOpacity = useT(p, [0.08, 0.38], [1, 0]);
  const nFill = useT(p, [0.02, 0.25], ["rgba(243,244,246,1)", "rgba(243,244,246,0)"]);
  const nStroke = useT(nScale, (v) => `${2 / v}px #F3F4F6`); // keeps the outline thin while zooming
  const blur = useT(p, [0, 0.4], [0, 14]);
  const filter = useMotionTemplate`blur(${blur}px)`;
  const aScale = useT(p, [0.45, 0.8], [0.5, 1]);
  const aOpacity = useT(p, [0.45, 0.72], [0, 1]);
  const aEvents = useT(p, [0.5, 0.55], ["none", "auto"]);
  const hint = useT(p, [0, 0.06], [1, 0]);

  return (
    <>
      <motion.div
        aria-hidden="true"
        style={{ scale: rush, opacity: rushOpacity, backgroundImage: dotsOnly, backgroundSize: "28px 28px" }}
        className="absolute inset-0"
      />
      <motion.div style={{ rotate, x: px, y: py }} className="absolute inset-0" aria-hidden="true">
        {[0, 1, 2, 3, 4, 5, 6].map((i) => <Frame key={i} p={p} i={i} />)}
      </motion.div>

      <motion.div
        aria-hidden="true"
        style={{ scale: nScale, opacity: nOpacity, filter }}
        className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center"
      >
        <motion.span
          style={{ color: nFill, WebkitTextStroke: nStroke }}
          className={`text-[22vw] font-extrabold leading-[0.85] tracking-tighter md:text-[15vw] ${display}`}
        >
          Zaid<br />Kidwai
        </motion.span>
        <span className="mt-6 text-lg md:text-2xl">Full stack developer and AI/ML engineer</span>
      </motion.div>

      <motion.div
        style={{ scale: aScale, opacity: aOpacity, pointerEvents: aEvents }}
        className="absolute inset-0 flex flex-col items-center justify-center gap-10 px-6 md:flex-row md:gap-16"
      >
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.06] blur-3xl" />
        <div className="relative h-[220px] w-[185px] shrink-0 md:h-[320px] md:w-[270px]">
          <div aria-hidden="true" className="absolute inset-0 translate-x-3 translate-y-3 rounded-[28px] bg-gradient-to-br from-[#4B5563] to-[#2F343D]" />
          <img
            src="/my-photo.jpg"
            alt="Portrait of Zaid Kidwai"
            width={270}
            height={320}
            className="absolute inset-0 h-full w-full rounded-[28px] border border-[#4B5563] object-cover shadow-2xl grayscale-[25%] transition duration-500 hover:grayscale-0"
          />
        </div>
        <div className="relative flex max-w-xl flex-col items-center gap-5 text-center md:items-start md:text-left">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-[#3A404A] bg-[#2F343D]/70 px-4 py-2 text-sm font-semibold text-[#E5E7EB]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#D1D5DB] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#D1D5DB]" />
            </span>
            Open to internships 2027
          </span>
          <h1 className={`text-5xl font-extrabold leading-none tracking-tight text-[#F3F4F6] md:text-7xl ${display}`}>Zaid Kidwai</h1>
          <p className="text-lg">B.Tech CSE student. Full stack and AI/ML.</p>
          <Actions />
        </div>
      </motion.div>

      {!reduce && (
        <motion.div aria-hidden="true" style={{ opacity: hint }} className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-sm">
          Scroll
          <motion.span className="h-8 w-px bg-[#9CA3AF]" animate={{ scaleY: [0.2, 1, 0.2] }} transition={{ duration: 1.8, repeat: Infinity }} />
        </motion.div>
      )}
    </>
  );
}

/* 2. About: content arrives from depth, words light up, Lottie spins in */
function About({ p, reduce }) {
  const r = useT(p, [0.1, 0.75], [0, 1]);
  const scale = useT(p, [0, 0.12], [0.85, 1]);
  const opacity = useT(p, [0, 0.12], [0, 1]);
  const lScale = useT(p, [0, 0.2], [0.3, 1]);
  const lRotate = useT(p, [0, 0.2], [-12, 0]);
  const lY = useT(p, [0, 1], [60, -60]);
  const pillsOpacity = useT(p, [0.65, 0.8], [0, 1]);
  const pillsY = useT(p, [0.65, 0.8], [20, 0]);
  let k = 0;

  return (
    <motion.div
      style={{ scale, opacity }}
      className="absolute inset-0 mx-auto grid max-w-6xl grid-cols-1 content-center items-center gap-6 px-6 md:grid-cols-2 md:gap-14 md:px-16"
    >
      <div className="space-y-4 md:space-y-6">
        <h2 className={`text-4xl font-extrabold tracking-tight text-[#F3F4F6] md:text-6xl ${display}`}>About Me</h2>
        {PARAS.map((para, pi) => (
          <p key={pi} className={pi ? "text-sm leading-relaxed md:text-base" : `text-lg font-semibold leading-snug text-[#E5E7EB] md:text-3xl ${display}`}>
            {para.split(" ").map((w) => (
              <Word key={k} p={r} i={k++} bold={w.startsWith("*")}>
                {w.replace("*", "")}
              </Word>
            ))}
          </p>
        ))}
        <motion.ul style={{ opacity: pillsOpacity, y: pillsY }} className="flex flex-wrap gap-2 pt-2 md:gap-3">
          {SKILLS.map((s) => (
            <li key={s} className="rounded-full border border-[#4B5563] bg-[#2F343D]/70 px-4 py-1.5 text-sm font-medium text-[#E5E7EB]">
              {s}
            </li>
          ))}
        </motion.ul>
      </div>

      <motion.div style={{ scale: lScale, rotate: lRotate, y: lY }} className="flex h-[130px] items-center justify-center md:h-[480px]">
        <Lottie animationData={devAnimation} loop={!reduce} className="h-full w-full object-contain grayscale drop-shadow-[0_0_30px_rgba(255,255,255,0.08)]" />
      </motion.div>
    </motion.div>
  );
}

/* 3. Vertical scroll drives a horizontal rail */
function Rail({ p, reduce }) {
  const x = useT(p, [0, 1], ["0%", "-60%"]);
  const bgX = useT(p, [0, 1], ["15%", "-35%"]);

  return (
    <div className="absolute inset-0 flex items-center">
      <motion.span
        aria-hidden="true"
        style={{ x: bgX }}
        className={`pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[32vw] font-extrabold leading-none text-[#22262C] ${display}`}
      >
        What I use
      </motion.span>
      <motion.ul style={{ x }} className={`relative flex items-center gap-[5vw] px-[15vw] ${reduce ? "flex-wrap" : "w-max"}`}>
        {CARDS.map((c) => (
          <motion.li
            key={c.title}
            whileHover={{ y: -8 }}
            className="flex h-[60vh] w-[70vw] flex-col justify-between rounded-3xl border border-[#3A404A] bg-[#2F343D]/60 p-8 backdrop-blur md:p-12"
          >
            <h2 className={`text-5xl font-extrabold tracking-tight text-[#F3F4F6] md:text-8xl ${display}`}>{c.title}</h2>
            <div className="flex flex-col gap-6">
              <p className="max-w-md text-lg md:text-2xl">{c.line}</p>
              <ul className="flex flex-wrap gap-2">
                {c.tags.map((t) => (
                  <li key={t} className="rounded-full border border-[#4B5563] px-4 py-1.5 text-sm text-[#E5E7EB]">{t}</li>
                ))}
              </ul>
            </div>
          </motion.li>
        ))}
      </motion.ul>
      <motion.div aria-hidden="true" style={{ scaleX: p }} className="absolute inset-x-[15vw] bottom-10 h-px origin-left bg-[#9CA3AF]" />
    </div>
  );
}

/* 4. Outro */
function Outro({ p }) {
  const scale = useT(p, [0, 0.5], [0.7, 1]);
  const opacity = useT(p, [0, 0.35], [0, 1]);
  const bgX = useT(p, [0, 1], ["5%", "-45%"]);

  return (
    <>
      <motion.span
        aria-hidden="true"
        style={{ x: bgX }}
        className={`pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[18vw] font-extrabold leading-none text-[#22262C] ${display}`}
      >
        Next.js React Node.js MongoDB Python ML
      </motion.span>
      <motion.div style={{ scale, opacity }} className="absolute inset-0 flex flex-col items-center justify-center gap-10 px-6 text-center">
        <h2 className={`text-6xl font-extrabold leading-[0.95] tracking-tight text-[#F3F4F6] md:text-9xl ${display}`}>
          Let&apos;s build<br />something.
        </h2>
        <Actions center />
        <p className="text-sm">&copy; 2026 Zaid Kidwai</p>
      </motion.div>
    </>
  );
}

const Hero = () => (
  <main className="bg-[#15171B] font-['Inter',sans-serif] text-[#9CA3AF]">
    <Scene id="home" vh={450}>{(p, reduce) => <Tunnel p={p} reduce={reduce} />}</Scene>
    <Scene id="about" vh={350}>{(p, reduce) => <About p={p} reduce={reduce} />}</Scene>
    <Scene id="skills" vh={400} rest={0}>{(p, reduce) => <Rail p={p} reduce={reduce} />}</Scene>
    <Scene id="contact" vh={220} fade={false}>{(p) => <Outro p={p} />}</Scene>
  </main>
);

export default Hero;