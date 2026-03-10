import { Mail, ArrowUpRight, ChevronDown, ChevronUp, X } from "lucide-react";
import { FaEnvelope, FaPhone, FaFacebook, FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Hamburger({ open }) {
  return (
    <div className="w-6 h-6 flex flex-col justify-center items-center relative">
      <span
        className={`block h-0.5 w-6 bg-[#c7c7c7] rounded transition-all duration-300 ${
          open ? "rotate-45 translate-y-2" : ""
        }`}
      />
      <span
        className={`block h-0.5 w-6 bg-[#c7c7c7] rounded my-1 transition-all duration-300 ${
          open ? "opacity-0" : ""
        }`}
      />
      <span
        className={`block h-0.5 w-6 bg-[#c7c7c7] rounded transition-all duration-300 ${
          open ? "-rotate-45 -translate-y-2" : ""
        }`}
      />
    </div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleWorkClick = (e) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/", { replace: false });
      // Wait for navigation, then scroll (using a timeout or event)
      setTimeout(() => {
        const event = new CustomEvent("scrollToWork");
        window.dispatchEvent(event);
      }, 100); // Adjust timeout as needed
    } else {
      const event = new CustomEvent("scrollToWork");
      window.dispatchEvent(event);
    }
  };

  return (
    <header className="flex justify-between items-center px-6 py-4 border-b border-neutral-800 text-white bg-[#0E0E0E] z-50 relative">
      <Link to="/" className="text-lg font-semibold hover:underline">
        RannCreations
      </Link>
      {/* Desktop nav */}
      <div className="hidden sm:flex items-center gap-6 ml-auto">
        <nav className="flex gap-6 text-sm">
          <Link
            to="/about"
            className="text-[#c7c7c7] hover:underline hover:text-[#c7c7c7]"
          >
            About
          </Link>
          <a
            href="/assets/Abueg_Resume.pdf"
            download="Abueg_Resume.pdf"
            className="text-[#c7c7c7] hover:underline hover:text-[#c7c7c7]"
          >
            Resumé
          </a>
        </nav>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setShowModal(true);
          }}
          className="border px-4 py-1 rounded-full text-sm flex items-center gap-1 hover:bg-white hover:text-black transition text-[#c7c7c7] border-[#c7c7c7]"
        >
          Contact Me <ArrowUpRight size={14} />
        </a>

        {showModal && (
          <div className="fixed inset-0 backdrop-blur-sm bg-black/70 flex items-center justify-center z-50">
            <div className="bg-[#181818] p-8 rounded-2xl shadow-2xl text-white w-96 relative">
              {/* Close icon button */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-white hover:text-[#c7c7c7] transition"
                aria-label="Close modal"
              >
                <X size={26} />
              </button>
              <h2 className="text-2xl font-bold mb-8 mt-4 text-center">
                Contact Me
              </h2>
              <div className="flex flex-col gap-6 mb-8">
                <div className="flex items-center gap-4">
                  <FaEnvelope className="text-[#c7c7c7]" size={22} />
                  <span className="break-all text-base">rannielabueg17@gmail.com</span>
                </div>
                <div className="flex items-center gap-4">
                  <FaPhone className="text-[#c7c7c7]" size={22} />
                  <span className="text-base">+63 926 025 4625</span>
                </div>
              </div>
              <div className="flex gap-7 justify-center mt-4">
                <a href="https://www.facebook.com/rannnn17" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <FaFacebook size={26} className="hover:text-[#c7c7c7] transition" />
                </a>
                <a href="https://www.instagram.com/ran_abueg/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <FaInstagram size={26} className="hover:text-[#c7c7c7] transition" />
                </a>
                <a href="https://github.com/CapKaien" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <FaGithub size={26} className="hover:text-[#c7c7c7] transition" />
                </a>
                <a href="https://www.linkedin.com/in/ranniel-abueg-a082a636a/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <FaLinkedin size={26} className="hover:text-[#c7c7c7] transition" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Mobile nav */}
      <div className="flex sm:hidden ml-auto">
        <button
          onClick={() => setOpen(!open)}
          className="border px-4 py-2 rounded-full text-sm flex items-center gap-2 text-[#c7c7c7] border-[#c7c7c7] bg-transparent"
          aria-label="Open menu"
        >
          <Hamburger open={open} />
        </button>
        {open && (
          <div className="absolute top-16 right-6 bg-[#181818] border border-[#2c2b2b] rounded-xl shadow-lg flex flex-col w-40 z-50">
            <Link
              to="/about"
              className="px-4 py-2 text-[#c7c7c7] hover:bg-neutral-800"
            >
              About
            </Link>
            <a
              href="/assets/Abueg_CV.pdf"
              download="Abueg_CV.pdf"
              className="px-4 py-2 text-[#c7c7c7] hover:bg-neutral-800"
            >
              Resume
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
