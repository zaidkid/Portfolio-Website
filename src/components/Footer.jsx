import { FaGithub, FaLinkedin, } from "react-icons/fa";
import { MdEmail } from "react-icons/md";


const Footer = () => (
  <footer className="bg-gray-950 text-gray-400 py-8 px-6 text-center mt-auto">
    <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} Zaid Kidwai. All rights reserved.
      </p>

      <div className="flex gap-6 text-xl justify-center">
        <a
          href="https://github.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition"
        >
          <FaGithub />
        </a>
        <a
          href="https://linkedin.com/in/yourprofile"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition"
        >
          <FaLinkedin />
        </a>
        <a
          href="mailto:zaidkidwai2@gmail.com"
          className="hover:text-white transition"
        >
          <MdEmail />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
