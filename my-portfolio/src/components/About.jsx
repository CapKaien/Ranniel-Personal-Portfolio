import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaFacebook,
  FaRegIdBadge,
  FaCertificate,
} from "react-icons/fa";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
import gsap from "gsap";

export default function About({ scrollRef }) {
  // Locomotive Scroll for About page
  const [showCert, setShowCert] = useState(false);

  // add this for certifications hover preview
  const [hoverCert, setHoverCert] = useState(null);

  useEffect(() => {
    const els = Array.from(document.querySelectorAll(".cert-title"));

    els.forEach((el) => {
      const onEnter = () =>
        gsap.to(el, { color: "#38BDF8", duration: 0.28, ease: "power1.out" });
      const onLeave = () =>
        gsap.to(el, { color: "#FFFFFF", duration: 0.18, ease: "power1.out" });

      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("focus", onEnter);
      el.addEventListener("mouseleave", onLeave);
      el.addEventListener("blur", onLeave);

      // keep refs for cleanup
      el._onEnter = onEnter;
      el._onLeave = onLeave;
    });

    return () => {
      els.forEach((el) => {
        el.removeEventListener("mouseenter", el._onEnter);
        el.removeEventListener("focus", el._onEnter);
        el.removeEventListener("mouseleave", el._onLeave);
        el.removeEventListener("blur", el._onLeave);
        delete el._onEnter;
        delete el._onLeave;
      });
    };
  }, []);

  /* -------------------------
     PreviewPortal - renders the floating preview into document.body
     ------------------------- */
  function PreviewPortal({ anchorRef, visible, img, title, date }) {
    const [style, setStyle] = useState({
      left: 0,
      top: 0,
      width: 288,
      height: 180,
    });

    useEffect(() => {
      if (!visible) return;

      function update() {
        const a = anchorRef?.current;
        if (!a || typeof window === "undefined") return;
        const rect = a.getBoundingClientRect();
        // preview dimensions (match md:w-72 => 288px, but clamp to viewport)
        const maxWidth = Math.min(320, Math.floor(window.innerWidth * 0.9));
        const previewWidth = Math.min(288, maxWidth);
        const previewHeight = 180;

        // try placing to the right of anchor
        let left = rect.right + 12;
        let top = rect.top;

        // if placing to the right would overflow, place to the left
        if (left + previewWidth > window.innerWidth - 12) {
          left = rect.left - previewWidth - 12;
        }
        // clamp top to viewport
        if (top + previewHeight > window.innerHeight - 12) {
          top = window.innerHeight - previewHeight - 12;
        }
        if (top < 12) top = 12;

        // ensure within bounds
        left = Math.max(12, Math.min(left, window.innerWidth - previewWidth - 12));

        setStyle({
          left,
          top,
          width: previewWidth,
          height: previewHeight,
        });
      }

      update();
      window.addEventListener("resize", update);
      // capture scroll events to reposition when container scrolls
      window.addEventListener("scroll", update, true);
      return () => {
        window.removeEventListener("resize", update);
        window.removeEventListener("scroll", update, true);
      };
    }, [anchorRef, visible, img]);

    if (!visible || typeof document === "undefined") return null;

    return createPortal(
      <div
        role="dialog"
        aria-hidden={!visible}
        style={{
          position: "fixed",
          left: style.left,
          top: style.top,
          zIndex: 9999,
          width: style.width,
          borderRadius: 8,
          overflow: "hidden",
          boxShadow: "0 8px 24px rgba(0,0,0,0.6)",
          background: "#0b0b0b",
          border: "1px solid #2c2b2b",
          transition: "opacity 180ms, transform 180ms",
          opacity: visible ? 1 : 0,
          transform: visible ? "scale(1)" : "scale(0.98)",
          pointerEvents: "none", // keep same pointer behavior as original preview
        }}
      >
        <div
          style={{
            width: "100%",
            height: style.height,
            background: "#111",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={img}
            alt={`${title} preview`}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>
        <div style={{ padding: 10, fontSize: 12, color: "#cfcfcf" }}>
          <div style={{ fontWeight: 600, color: "#fff", fontSize: 13 }}>{title}</div>
          <div style={{ marginTop: 6, color: "#9aa0a6" }}>{date}</div>
        </div>
      </div>,
      document.body
    );
  }

  /* -------------------------
     CertItem - list item that holds anchorRef for portal positioning
     ------------------------- */
  function CertItem({ c, i }) {
    const anchorRef = useRef(null);

    return (
      <div key={i} className="relative md:flex md:items-start md:gap-6 py-4">
        <div className="flex-1">
          {c.img ? (
            <a
              ref={anchorRef}
              href={c.img}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setHoverCert(i)}
              onMouseLeave={() => setHoverCert(null)}
              onFocus={() => setHoverCert(i)}
              onBlur={() => setHoverCert(null)}
              className="cert-title inline-block text-white font-semibold text-lg hover:text-[#38BDF8] transition-colors"
            >
              {c.title}
            </a>
          ) : (
            <span className="cert-title inline-block text-white font-semibold text-lg">{c.title}</span>
          )}

          <div className="text-sm text-neutral-400 mt-1">{c.date}</div>
          <p className="text-base text-neutral-300 mt-3">{c.desc}</p>
        </div>

        {/* Preview rendered as portal (not clipped by ancestors) */}
        {c.img && (
          <PreviewPortal
            anchorRef={anchorRef}
            visible={hoverCert === i}
            img={c.img}
            title={c.title}
            date={c.date}
          />
        )}
      </div>
    );
  }

  /* -------------------------
     Data array (kept inline like original)
     ------------------------- */
  const certs = [
    {
      title: "SAP Business One Certification – SAP Business One",
      date: "May 2022",
      desc: "Gained foundational knowledge in enterprise resource planning using SAP’s business management software.",
      img: "/assets/SAP.jpg",
    },
    {
      title: "Networking Basics - Cisco",
      date: "December 2024",
      desc: "Learned core networking concepts including protocols, IP addressing, and network troubleshooting.",
      img: "/assets/Cisco.jpg",
    },
    {
      title: "Full Stack Web Development Bootcamp - Udemy",
      date: "July 2025",
      desc: "Completed hands-on training in frontend and backend development using HTML, CSS, JavaScript, Node.js, and databases.",
      img: "/assets/Full Stack.jpg",
    },
    {
      title: "Node.js Developer Course - Udemy",
      date: "July 2025",
      desc: "Built server-side applications with Node.js, working with APIs, asynchronous patterns, and real-world projects.",
      img: "/assets/NodeJS.jpg",
    },
    {
      title: "Angular – 2025 Edition – Udemy",
      date: "July 2025",
      desc: "Explored modern Angular development, including components, services, routing, and reactive programming.",
      img: "/assets/Angular.jpg",
    },
    {
      title: "Learn Visual Studio Code (2020) – Udemy",
      date: "July 2025",
      desc: "Learned how to efficiently use Visual Studio Code, including extensions, debugging, integrated terminal, and workflow customization for development.",
      img: "/assets/VS Code.jpg",
    },
  ];

  return (
    // top-level overflow-x-hidden is safe because previews are portalled to body
    <main className="w-full min-h-screen flex flex-col md:flex-row bg-[#0E0E0E] text-white px-3 sm:px-6 md:px-20 py-8 md:py-12 box-border overflow-x-hidden">
      {/* Mobile Header */}
      <div className="flex flex-col lg:hidden w-full px-2 sm:px-6 pt-6 pb-4 items-center text-center">
        <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-neutral-700 shadow-md mb-4">
          <img src="/assets/1752769186406.jpg" alt="Ranniel Abueg" className="w-full h-full object-cover" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-2 text-white">Ranniel Abueg</h1>
        <h2 className="text-xl sm:text-2xl font-semibold text-neutral-300 mb-3">Front End Designer/Developer</h2>
        <p className="text-base text-neutral-400 mb-6">
          I build responsive, accessible, and user-friendly web applications using modern technologies like React and Tailwind CSS.
        </p>
        {/* Socials */}
        <div className="flex gap-4 mt-2 mb-2 text-[#c7c7c7]">
          <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
            <FaFacebook className="text-2xl" />
          </a>
          <a href="https://github.com/CapKaien" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
            <FaGithub className="text-2xl" />
          </a>
          <a href="https://www.linkedin.com/in/ranniel-abueg-a082a636a/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
            <FaLinkedin className="text-2xl" />
          </a>
          <a href="https://www.instagram.com/ran_abueg/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
            <FaInstagram className="text-2xl" />
          </a>
        </div>
      </div>

      {/* Left column */}
      <aside className="hidden lg:flex w-full lg:max-w-lg flex-col justify-start items-center text-center px-4 sm:px-8 lg:px-12 pt-12 lg:pt-24 pb-8 lg:pb-10 z-10 bg-transparent">
        <div className="w-52 h-52 rounded-full overflow-hidden border-4 border-neutral-700 shadow-md mb-6">
          <img src="/assets/1752769186406.jpg" alt="Ranniel Abueg" className="w-full h-full object-cover" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-2 text-white">Ranniel Abueg</h1>
        <h2 className="text-xl sm:text-2xl font-semibold text-neutral-300 mb-3">Front End Designer/Developer</h2>
        <p className="text-base text-neutral-400 mb-10">
          I build responsive, accessible, and user-friendly web applications using modern technologies like React and Tailwind CSS.
        </p>
        <div className="flex gap-4 mt-4 mb-6 text-[#c7c7c7]">
          <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
            <FaFacebook className="text-2xl" />
          </a>
          <a href="https://github.com/CapKaien" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
            <FaGithub className="text-2xl" />
          </a>
          <a href="https://www.linkedin.com/in/ranniel-abueg-a082a636a/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
            <FaLinkedin className="text-2xl" />
          </a>
          <a href="https://www.instagram.com/ran_abueg/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
            <FaInstagram className="text-2xl" />
          </a>
        </div>
      </aside>

      {/* Scroll container */}
      <section ref={scrollRef} data-scroll-container className="flex-1 px-2 sm:px-6 md:px-12 py-8 md:py-24">
        {/* About Section */}
        <div id="about" className="mb-10 md:mb-16" data-scroll-section>
          <p className="text-base sm:text-lg md:text-lg text-neutral-300 leading-relaxed max-w-2xl">
            I'm a front-end developer passionate about crafting clean, responsive, and accessible user interfaces using modern tools like React, Vite, and Tailwind CSS. I love building digital experiences that are both visually appealing and user-friendly.
            <br />
            <br />
            Recently, I completed my internship at{" "}
            <span className="font-semibold text-[#38BDF8]">Leentech Network Solutions</span>, where I worked on designing and developing interfaces for a job portal using Tailwind CSS and React.
            <br />
            <br />I also led the development of <span className="font-bold text-white">ReadSpeak</span>, a speech-based learning platform.
            <br />
            <br />
            In my spare time, I enjoy exploring web animations, refining layouts, and learning new tech.
          </p>
        </div>

        {/* Experience Section */}
        <div id="experience" className="mb-10 md:mb-16 mt-10 md:mt-16 py-8" data-scroll-section>
          {/* --- Experience divider (replace existing block) --- */}
          <div className="relative w-full mb-8">
            <hr className="border-t border-[#2c2b2b] mx-auto w-full max-w-2xl lg:max-w-none" />
            <span className="absolute -top-7 right-4 md:right-8 bg-[#F8F6ED] rounded-full w-14 h-14 flex items-center justify-center shadow-md border border-[#FFB545]">
              <FaRegIdBadge size={28} className="text-[#1e1e1e]" />
            </span>
          </div>
          <div className="text-sm text-neutral-400 mb-2">300hrs | June 2024 — August 2024</div>
          <div className="font-semibold text-lg text-white mb-3">Front End Developer Intern · Leentech Network Solutions</div>
          <div className="flex gap-2 flex-wrap mb-4">
            <span className="bg-[#1e293b] text-[#38BDF8] px-3 py-1 rounded-full text-xs font-semibold">JavaScript</span>
            <span className="bg-[#1e293b] text-[#38BDF8] px-3 py-1 rounded-full text-xs font-semibold">React</span>
            <span className="bg-[#1e293b] text-[#38BDF8] px-3 py-1 rounded-full text-xs font-semibold">Tailwind CSS</span>
            <span className="bg-[#1e293b] text-[#38BDF8] px-3 py-1 rounded-full text-xs font-semibold">Figma</span>
          </div>
          <div className="text-base text-neutral-300 mb-6">
            Designed and developed responsive UI components for a job portal using React and Tailwind CSS. Collaborated with designers and developers to implement clean, accessible layouts.
          </div>
          {/* Certificate CTA */}
          <div className="max-w-2xl mb-8">
            <div className="relative inline-block">
              <a
                href="/assets/AbuegCOC.png"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setShowCert(true)}
                onMouseLeave={() => setShowCert(false)}
                className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-indigo-600 hover:to-sky-500 transition-all duration-300 transform hover:scale-105 text-white font-medium shadow-md"
              >
                View certificate
              </a>
              {showCert && (
                <div className="absolute z-50 left-0 top-full mt-3 w-64 md:w-80 rounded-lg overflow-hidden border border-[#2c2b2b] bg-[#0b0b0b] shadow-xl">
                  <img src="/assets/ABUEG_COC.png" alt="Certificate preview" className="w-full h-40 md:h-52 object-cover" />
                  <div className="p-3 text-xs text-neutral-300">
                    <div className="font-semibold text-white text-sm">Certificate of Completion</div>
                    <div className="mt-1">Issued by Leentech Network Solutions · August 2024</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* --- Certifications Section (centered, wider content) --- */}
        <div id="certifications" className="mb-10 md:mb-16 mt-10 md:mt-16 py-8" data-scroll-section>
          {/* Divider (full width on lg) */}
          <div className="relative w-full mb-8">
            <hr className="border-t border-[#2c2b2b] mx-auto w-full max-w-2xl lg:max-w-none" />
            <span className="absolute -top-7 right-4 md:right-8 bg-[#F8F6ED] rounded-full w-14 h-14 flex items-center justify-center shadow-md border border-[#FFB545]">
              <FaCertificate size={28} className="text-[#1e1e1e]" />
            </span>
          </div>

          {/* Centered content: no max width so content can expand */}
          <div className="mx-auto space-y-8 px-2">
            {certs.map((c, i) => (
              <CertItem key={i} c={c} i={i} />
            ))}
          </div>
        </div>
         {/* Projects Section */}
        <div id="projects" className="mb-16" data-scroll-section>
          <p className="text-base text-neutral-400 leading-relaxed max-w-2xl">
            Loosely designed in <span className="font-semibold text-white">Figma</span> and coded in{" "}
            <span className="font-semibold text-white">Visual Studio Code</span> by yours truly. Built with{" "}
            <span className="font-semibold text-white">ReactJS+Vite</span> and{" "}
            <span className="font-semibold text-white">Tailwind CSS</span>, deployed with{" "}
            <span className="font-semibold text-white">Vercel</span>. All text is set in the{" "}
            <span className="font-semibold text-white">Inter</span> typeface.
          </p>
        </div>
      </section>
    </main>
  );
}
