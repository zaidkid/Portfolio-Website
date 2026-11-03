import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { FaArrowRight, FaDownload, FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";

// TODO: replace with your real email
const EMAIL = "your.email@example.com";

const SOCIALS = [
  { href: "https://github.com/zaidkid", label: "GitHub profile", Icon: FaGithub },
  { href: "https://www.linkedin.com/in/mohd-zaid-kidwai-167892243/", label: "LinkedIn profile", Icon: FaLinkedin },
  { href: `mailto:${EMAIL}`, label: "Send an email", Icon: FaEnvelope },
];

const CARDS = [
  { title: "Frontend", line: "Fast, accessible interfaces with motion that earns its place.", tags: ["Next.js", "React", "Tailwind CSS", "Framer Motion"] },
  { title: "Full stack", line: "APIs and data models that hold up behind the interface.", tags: ["Node.js", "Express", "MongoDB", "MERN"] },
  { title: "AI / ML", line: "Models wired into real apps, not left in notebooks.", tags: ["Python", "Machine learning", "Model-backed apps"] },
];

const STORY =
  "I build full stack apps and AI/ML systems. Next.js on the front, Node and Python behind it, and models wherever they make the product better.";

const dots = "radial-gradient(#363B43 1.2px, transparent 1.2px)";
const ring = "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D1D5DB] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1E2126]";
const btn = `inline-flex items-center gap-2.5 rounded-xl px-7 py-4 font-semibold transition-colors ${ring}`;
const display = "font-['Plus_Jakarta_Sans',sans-serif]";

const useT = (p, input, output) => useTransform(p, input, output);

/** Pinned scene: tall section + sticky viewport. Passes scroll progress (0 to 1) to children. */
function Scene({ id, vh, rest = 1, className = "", children }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const still = useMotionValue(rest);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section id={id} ref={ref} style={{ height: reduce ? "auto" : `${vh}vh` }}>
      <div
        className={`${reduce ? "min-h-screen" : "sticky top-0 h-screen"} relative overflow-hidden ${className}`}
        style={{ backgroundImage: dots, backgroundSize: "28px 28px" }}
      >
        {children(reduce ? still : scrollYProgress, reduce)}
      </div>
    </section>
  );
}

/** One ring of the tunnel; each ring grows at its own rate to fake depth. */
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

const Word = ({ p, w, i, n }) => {
  const a = (i / n) * 0.7;
  const opacity = useT(p, [a, a + 0.15], [0.15, 1]);
  return <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">{w}</motion.span>;
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

const Hero = () => {
  const { scrollYProgress } = useScroll();
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const words = STORY.split(" ");

  return (
    <main id="home" className="bg-[#15171B] font-['Inter',sans-serif] text-[#9CA3AF]">
      <motion.div aria-hidden="true" style={{ scaleX: bar }} className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-[#F3F4F6]" />


      {/* 1. Fly through the name into the portrait */}
      <Scene vh={450} rest={1} className="bg-gradient-to-br from-[#2A2D33] via-[#1E2126] to-[#15171B]">
        {(p, reduce) => <Tunnel p={p} reduce={reduce} />}
      </Scene>

      {/* 2. Words light up as you scroll */}
      <Scene id="about" vh={300} className="flex items-center bg-[#1A1D22] px-6 md:px-16">
        {(p) => (
          <p className={`mx-auto max-w-5xl text-4xl font-extrabold leading-[1.15] tracking-tight text-[#F3F4F6] md:text-7xl ${display}`}>
            {words.map((w, i) => <Word key={i} p={p} w={w} i={i} n={words.length} />)}
          </p>
        )}
      </Scene>

      {/* 3. Vertical scroll drives a horizontal rail */}
      <Scene id="skills" vh={400} rest={0} className="flex items-center bg-gradient-to-b from-[#1A1D22] to-[#15171B]">
        {(p, reduce) => <Rail p={p} reduce={reduce} />}
      </Scene>

      {/* 4. Outro */}
      <Scene id="contact" vh={220} className="flex items-center justify-center bg-[#1A1D22] px-6">
        {(p) => <Outro p={p} />}
      </Scene>
    </main>
  );
};

function Tunnel({ p, reduce }) {
  const rotate = useT(p, [0, 1], [0, 8]);
  const nScale = useT(p, [0, 0.5], [1, 16]);
  const nOpacity = useT(p, [0.08, 0.38], [1, 0]);
  const blur = useT(p, [0, 0.4], [0, 14]);
  const filter = useMotionTemplate`blur(${blur}px)`;
  const aScale = useT(p, [0.45, 0.8], [0.5, 1]);
  const aOpacity = useT(p, [0.45, 0.72], [0, 1]);
  const aEvents = useT(p, [0.5, 0.55], ["none", "auto"]);
  const hint = useT(p, [0, 0.06], [1, 0]);

  return (
    <>
      <motion.div style={{ rotate }} className="absolute inset-0" aria-hidden="true">
        {[0, 1, 2, 3, 4, 5, 6].map((i) => <Frame key={i} p={p} i={i} />)}
      </motion.div>

      <motion.div
        aria-hidden="true"
        style={{ scale: nScale, opacity: nOpacity, filter }}
        className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center"
      >
        <span className={`text-[22vw] font-extrabold leading-[0.85] tracking-tighter text-[#F3F4F6] md:text-[15vw] ${display}`}>
          Zaid<br />Kidwai
        </span>
        <span className="mt-6 text-lg md:text-2xl">Full stack developer and AI/ML engineer</span>
      </motion.div>

      <motion.div
        style={{ scale: aScale, opacity: aOpacity, pointerEvents: aEvents }}
        className="absolute inset-0 flex flex-col items-center justify-center gap-10 px-6 md:flex-row md:gap-16"
      >
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
        <div className="flex max-w-xl flex-col items-center gap-5 text-center md:items-start md:text-left">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-[#3A404A] bg-[#2F343D]/70 px-4 py-2 text-sm font-semibold text-[#E5E7EB]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#D1D5DB] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#D1D5DB]" />
            </span>
            Open to internships 2027
          </span>
          <h1 className={`text-5xl font-extrabold leading-none tracking-tight text-[#F3F4F6] md:text-7xl ${display}`}>Zaid Kidwai</h1>
          <p className="text-lg leading-relaxed">
            B.Tech CSE student building full stack apps and AI/ML systems with Next.js, the MERN stack and Python.
          </p>
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

function Rail({ p, reduce }) {
  const x = useT(p, [0, 1], ["0%", "-60%"]);
  const bgX = useT(p, [0, 1], ["15%", "-35%"]);

  return (
    <>
      <motion.span
        aria-hidden="true"
        style={{ x: bgX }}
        className={`pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[32vw] font-extrabold leading-none text-[#22262C] ${display}`}
      >
        What I use
      </motion.span>
      <motion.ul style={{ x }} className={`relative flex items-center gap-[5vw] px-[15vw] ${reduce ? "flex-wrap" : "w-max"}`}>
        {CARDS.map((c) => (
          <li key={c.title} className="flex h-[60vh] w-[70vw] flex-col justify-between rounded-3xl border border-[#3A404A] bg-[#2F343D]/60 p-8 backdrop-blur md:p-12">
            <h2 className={`text-5xl font-extrabold tracking-tight text-[#F3F4F6] md:text-8xl ${display}`}>{c.title}</h2>
            <div className="flex flex-col gap-6">
              <p className="max-w-md text-lg md:text-2xl">{c.line}</p>
              <ul className="flex flex-wrap gap-2">
                {c.tags.map((t) => (
                  <li key={t} className="rounded-full border border-[#4B5563] px-4 py-1.5 text-sm text-[#E5E7EB]">{t}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </motion.ul>
    </>
  );
}

function Outro({ p }) {
  const scale = useT(p, [0, 0.5], [0.7, 1]);
  const opacity = useT(p, [0, 0.35], [0, 1]);

  return (
    <motion.div style={{ scale, opacity }} className="flex flex-col items-center gap-10 text-center">
      <h2 className={`text-6xl font-extrabold leading-[0.95] tracking-tight text-[#F3F4F6] md:text-9xl ${display}`}>
        Let&apos;s build<br />something.
      </h2>
      <Actions center />
      <p className="text-sm">&copy; 2026 Zaid Kidwai</p>
    </motion.div>
  );
}

export default Hero;