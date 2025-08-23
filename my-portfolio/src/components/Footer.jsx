// src/components/Footer.jsx
import { FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  const year = new Date().getFullYear();

  const links = [
    { label: "About", href: "/about" },
    { label: "Works", href: "/all-works" },
  ];

  return (
    <footer className="bg-[#0E0E0E] px-4 sm:px-6 lg:px-16 pt-10">
      <div className="max-w-[1600px] mx-auto bg-[#161616] border border-[#232323] rounded-t-3xl">
        {/* Top */}
        <div className="px-6 sm:px-10 md:px-16 py-12 md:py-16">
          <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-start">
            <h2 className="text-white text-3xl sm:text-5xl font-bold leading-tight">
              Turning creativity into
              <br className="hidden sm:block" />
              digital experiences that
              <br className="hidden sm:block" />
              inspire and impress.
            </h2>

            <div className="space-y-6 text-neutral-300">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="mt-1 text-white/80" />
                <p>
                  Rosario, Cavite,
                  Philippines 4106
                </p>
              </div>
              <div className="flex items-start gap-3">
                <FaEnvelope className="mt-1 text-white/80" />
                <a
                  href="mailto:rannielabueg17@gmail.com"
                  className="hover:text-white transition-colors"
                >
                  rannielabueg17@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Divider */}
          <hr className="mt-10 md:mt-14 border-[#2c2b2b]" />

          {/* Bottom */}
          <div className="mt-8 md:mt-10 flex flex-col md:flex-row md:items-center gap-6">
            <nav className="flex flex-wrap gap-x-10 gap-y-3 text-white/90">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="font-medium hover:text-white transition-colors"
                >
                  {l.label}
                </a>
              ))}
              
            </nav>

            <div className="md:ml-auto w-full md:w-auto text-center md:text-right">
              <p className="text-sm text-neutral-300">
                © Copyright {year}, All Rights Reserved
              </p>
              <p className="text-xs text-neutral-400 mt-1">
                This portfolio was developed using{" "}
                <span className="text-white">React</span>,{" "}
                <span className="text-white">Tailwind&nbsp;CSS</span> &{" "}
                <span className="text-white">Vite</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
