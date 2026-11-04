import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";

export const display = "font-['Plus_Jakarta_Sans',sans-serif]";
export const ring = "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D1D5DB] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1E2126]";
export const useT = (p, input, output) => useTransform(p, input, output);

const bg = "radial-gradient(#363B43 1.2px, transparent 1.2px), linear-gradient(135deg, #2A2D33, #1E2126 50%, #15171B)";

/** Pinned scene: tall section + sticky viewport. Children get smoothed scroll progress (0 to 1). */
export function Scene({ id, vh, rest = 1, fade = true, children }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const still = useMotionValue(rest);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.0005 });
  const p = reduce ? still : smooth;
  const opacity = useT(p, [0.93, 1], [1, fade && !reduce ? 0 : 1]); // dissolve into the next scene

  return (
    <section id={id} ref={ref} style={{ height: reduce ? "auto" : `${vh}vh` }}>
      <div
        className={`${reduce ? "min-h-screen" : "sticky top-0 h-screen"} relative overflow-hidden font-['Inter',sans-serif] text-[#9CA3AF]`}
        style={{ backgroundImage: bg, backgroundSize: "28px 28px, auto" }}
      >
        <motion.div style={{ opacity }} className={reduce ? "" : "absolute inset-0"}>{children(p, reduce)}</motion.div>
      </div>
    </section>
  );
}

/** One ring of the zoom tunnel; each ring grows at its own rate to fake depth. */
export const Frame = ({ p, i }) => {
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