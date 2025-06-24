import { useState } from "react";
import { motion } from "framer-motion";

const Contact = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e) => {
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
    }, 3000);
  };

  return (
    <section
      id="contact"
      className="min-h-screen bg-black text-white px-6 py-20 flex flex-col items-center justify-center text-center"
    >
      <motion.h2
        className="text-4xl font-bold mb-4"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        Get In Touch
      </motion.h2>

      <motion.p
        className="text-gray-400 mb-10 max-w-xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        Have a project in mind or just want to say hello? Fill out the form below — I'll get back to you soon!
      </motion.p>

      {/* ✅ Success Toast */}
      {formSubmitted && (
        <div className="bg-green-600 text-white px-6 py-3 rounded mb-6 shadow-md animate-bounce">
          ✅ Thank you! Your form has been submitted.
        </div>
      )}

      {/* ✅ FormSubmit integrated form */}
      <motion.form
        action="https://formsubmit.co/zaidkidwai2@gmail.com"
        method="POST"
        className="w-full max-w-xl space-y-6"
        onSubmit={handleSubmit}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
      >
        {/* Required FormSubmit Hidden Inputs */}
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_next" value="https://portfolio-website-zaid-kidwais-projects.vercel.app/" />

        <input
          type="text"
          name="name"
          placeholder="Your Name"
          className="w-full px-4 py-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          className="w-full px-4 py-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          required
        />
        <textarea
          name="message"
          rows="5"
          placeholder="Your Message"
          className="w-full px-4 py-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          required
        ></textarea>

        <button
          type="submit"
          className="w-full bg-white text-black font-semibold py-3 rounded hover:bg-gray-200 transition"
        >
          Send Message 🚀
        </button>
      </motion.form>
    </section>
  );
};

export default Contact;
