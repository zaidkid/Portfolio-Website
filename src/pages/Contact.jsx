import { useState } from "react";
import { motion } from "framer-motion";
import { Scene, Frame, useT, display } from "./ScrollScene";

const field =
  "w-full rounded-xl border border-[#4B5563] bg-[#2F343D]/70 px-4 py-3 text-[#F3F4F6] placeholder-[#9CA3AF] backdrop-blur focus:outline-none focus:ring-2 focus:ring-[#D1D5DB]";

function Content({ p, reduce }) {
  const [sent, setSent] = useState(false);
  const q = useT(p, [0, 0.5], [0.75, 0]); // the tunnel plays backwards: rings collapse to a point
  const scale = useT(p, [0.4, 0.7], [0.4, 1]);
  const opacity = useT(p, [0.4, 0.65], [0, 1]);
  const events = useT(p, [0.5, 0.55], ["none", "auto"]);

  const handleSubmit = () => {
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <>
      {!reduce && (
        <div aria-hidden="true" className="absolute inset-0">
          {[0, 1, 2, 3, 4, 5, 6].map((i) => <Frame key={i} p={q} i={i} />)}
        </div>
      )}

      <motion.div
        style={{ scale, opacity, pointerEvents: events }}
        className={`flex flex-col items-center justify-center px-6 text-center ${reduce ? "relative min-h-screen py-24" : "absolute inset-0 pt-16"}`}
      >
        <h2 className={`mb-3 text-4xl font-extrabold tracking-tight text-[#F3F4F6] md:text-6xl ${display}`}>Get In Touch</h2>
        <p className="mb-6 max-w-xl md:mb-8">
          Have a project in mind or just want to say hello? Fill out the form below and I&apos;ll get back to you soon.
        </p>

        {sent && (
          <p role="status" className="mb-4 rounded-xl bg-[#F3F4F6] px-6 py-3 font-semibold text-[#14171F] shadow-lg">
            Thank you! Your form has been submitted.
          </p>
        )}

        <form action="https://formsubmit.co/zaidkidwai2@gmail.com" method="POST" onSubmit={handleSubmit} className="w-full max-w-xl space-y-4 md:space-y-5">
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_next" value="https://portfolio-website-zaid-kidwais-projects.vercel.app/" />
          <input type="text" name="name" aria-label="Your name" placeholder="Your Name" className={field} required />
          <input type="email" name="email" aria-label="Your email" placeholder="Your Email" className={field} required />
          <textarea name="message" rows={4} aria-label="Your message" placeholder="Your Message" className={field} required />
          <motion.button
            type="submit"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.97 }}
            className="w-full rounded-xl bg-[#F3F4F6] py-3 font-semibold text-[#14171F] shadow-lg shadow-black/30 transition-colors hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D1D5DB] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1E2126]"
          >
            Send Message
          </motion.button>
        </form>
      </motion.div>
    </>
  );
}

const Contact = () => (
  <Scene id="contact" vh={250} fade={false} className="font-['Inter',sans-serif] text-[#9CA3AF]">
    {(p, reduce) => <Content p={p} reduce={reduce} />}
  </Scene>
);

export default Contact;