import { motion, useMotionTemplate } from "framer-motion";
import { Scene, useT, display } from "./ScrollScene";

// Oldest first: the scroll travels forward in time.
const EDUCATION = [
  {
    degree: "Secondary (Class 10th)",
    institution: "St.Anthony's School, Barabanki",
    year: "2020",
    details: "Studied science and mathematics, which later helped me develop problem-solving skills.",
  },
  {
    degree: "Higher Secondary (Class 12th)",
    institution: "St.Anthony's School, Barabanki",
    year: "2022",
    details: "Studied PCM with Computer Science. Developed interest in programming and problem-solving.",
  },
  {
    degree: "B.Tech Computer Science Engineering (CSE)",
    institution: "Bennett University, Noida",
    year: "2023 - 2027",
    details: "Specialized in AI/ML, and Web Development. Completed projects on semantic search and full-stack websites.",
  },
];
const LAST = EDUCATION.length - 1;

const Info = ({ e }) => (
  <>
    <h3 className={`text-xl font-bold text-[#F3F4F6] md:text-2xl ${display}`}>{e.degree}</h3>
    <p className="mt-1 text-[#D1D5DB]">{e.institution}</p>
    <span className="text-sm italic">{e.year}</span>
    <p className="mt-3">{e.details}</p>
  </>
);

/** Card i: cross-fades in/out around its slice of the scroll. */
const Card = ({ p, i, e }) => {
  const a = i / EDUCATION.length;
  const b = (i + 1) / EDUCATION.length;
  const input = [...(i ? [a - 0.05, a + 0.05] : [0]), ...(i < LAST ? [b - 0.05, b + 0.05] : [1])];
  const win = (enter, hold, exit) => [...(i ? [enter, hold] : [hold]), ...(i < LAST ? [hold, exit] : [hold])];
  const opacity = useT(p, input, win(0, 1, 0));
  const y = useT(p, input, win(30, 0, -30));
  const blur = useT(p, input, win(8, 0, 8));
  const filter = useMotionTemplate`blur(${blur}px)`;

  return (
    <motion.li style={{ opacity, y, filter }} className="absolute inset-0 rounded-3xl border border-[#3A404A] bg-[#2F343D]/60 p-6 backdrop-blur md:p-8">
      <Info e={e} />
    </motion.li>
  );
};

/** Rail dot: lights up once its card is reached. */
const Dot = ({ p, i }) => {
  const at = i / EDUCATION.length + (i ? 0 : 0.02);
  const scale = useT(p, [at - 0.04, at], [0.6, 1]);
  const color = useT(p, [at - 0.04, at], ["#4B5563", "#F3F4F6"]);
  return (
    <motion.span
      aria-hidden="true"
      style={{ scale, backgroundColor: color, top: `${(i / LAST) * 100}%` }}
      className="absolute -left-[5px] h-[11px] w-[11px] -translate-y-1/2 rounded-full"
    />
  );
};

function Content({ p, reduce }) {
  const scale = useT(p, [0, 0.08], [0.9, 1]);
  const opacity = useT(p, [0, 0.08], [0, 1]);
  const stops = EDUCATION.map((_, i) => i / EDUCATION.length);
  const years = useT(p, [0.1, 0.25, 0.42, 0.58, 0.75, 0.9], [2020, 2020, 2022, 2022, 2023, 2023]);
  const year = useT(years, Math.round); // ticks 2020, 2021, 2022, 2023
  const line = useT(p, [0.02, ...stops.slice(1)], [0, 0.5, 1]);

  return (
    <motion.div
      style={{ scale, opacity }}
      className={`mx-auto grid max-w-6xl content-center items-center gap-8 px-6 py-16 md:grid-cols-[1fr_1.2fr] md:gap-14 md:px-16 ${reduce ? "" : "absolute inset-0"}`}
    >
      <div>
        <h2 className={`text-4xl font-extrabold tracking-tight text-[#F3F4F6] md:text-6xl ${display}`}>Education</h2>
        {!reduce && (
          <motion.span
            aria-hidden="true"
            className={`mt-4 block text-[26vw] font-extrabold leading-none tracking-tighter tabular-nums text-[#F3F4F6]/90 md:text-[13vw] ${display}`}
          >
            {year}
          </motion.span>
        )}
      </div>

      {reduce ? (
        <ol className="space-y-8">
          {EDUCATION.map((e) => (
            <li key={e.degree} className="border-l border-[#3A404A] pl-6"><Info e={e} /></li>
          ))}
        </ol>
      ) : (
        <div className="relative flex h-[290px] gap-8 md:h-[300px]">
          <div className="relative w-px self-stretch bg-[#3A404A]">
            <motion.div style={{ scaleY: line }} className="h-full origin-top bg-[#F3F4F6]" />
            {EDUCATION.map((_, i) => <Dot key={i} p={p} i={i} />)}
          </div>
          <ol className="relative flex-1">
            {EDUCATION.map((e, i) => <Card key={e.degree} p={p} i={i} e={e} />)}
          </ol>
        </div>
      )}
    </motion.div>
  );
}

const Education = () => (
  <Scene id="education" vh={300} className="font-['Inter',sans-serif] text-[#9CA3AF]">
    {(p, reduce) => <Content p={p} reduce={reduce} />}
  </Scene>
);

export default Education;