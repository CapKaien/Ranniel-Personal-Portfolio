import { useRef, useEffect } from "react";
import { FaGithub, FaLinkedin, FaInstagram, FaFacebook, FaRegIdBadge } from "react-icons/fa";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";

export default function About({ scrollRef }) {
  // Locomotive Scroll for About page


  return (
<main className="w-full min-h-screen flex flex-col md:flex-row bg-[#0E0E0E] text-white px-3 sm:px-6 md:px-20 py-8 md:py-12 box-border">
      
  {/* Mobile Header: visible only on mobile */}
  <div className="flex flex-col lg:hidden w-full px-2 sm:px-6 pt-6 pb-4 items-center text-center">
    {/* Profile Image */}
    <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-neutral-700 shadow-md mb-4">
      <img
        src="/assets/1752769186406.jpg" // replace with your image path
        alt="Ranniel Abueg"
        className="w-full h-full object-cover"
      />
    </div>

    <h1 className="text-4xl sm:text-5xl font-extrabold mb-2 text-white">
      Ranniel Abueg
    </h1>
    <h2 className="text-xl sm:text-2xl font-semibold text-neutral-300 mb-3">
      Front End Designer/Developer
    </h2>
    <p className="text-base text-neutral-400 mb-6">
      I build responsive, accessible, and user-friendly web applications
      using modern technologies like React and Tailwind CSS.
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

  {/* Left column: only name, title, socials */}
  <aside className="hidden lg:flex w-full lg:max-w-lg flex-col justify-start items-center text-center px-4 sm:px-8 lg:px-12 pt-12 lg:pt-24 pb-8 lg:pb-10 z-10 bg-transparent">
    {/* Profile Image */}
    <div className="w-52 h-52 rounded-full overflow-hidden border-4 border-neutral-700 shadow-md mb-6">
      <img
        src="/assets/1752769186406.jpg" // replace with your image path
        alt="Ranniel Abueg"
        className="w-full h-full object-cover"
      />
    </div>

    <h1 className="text-4xl sm:text-5xl font-extrabold mb-2 text-white">
      Ranniel Abueg
    </h1>
    <h2 className="text-xl sm:text-2xl font-semibold text-neutral-300 mb-3">
      Front End Designer/Developer
    </h2>
    <p className="text-base text-neutral-400 mb-10">
      I build responsive, accessible, and user-friendly web applications
      using modern technologies like React and Tailwind CSS.
    </p>

    {/* Socials */}
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


      {/* Scroll container: always rendered for Locomotive Scroll */}
      <section
        ref={scrollRef}
        data-scroll-container
        className="flex-1 px-2 sm:px-6 md:px-12 py-8 md:py-24"
        style={{
          minWidth: 0,
          background: "transparent",
        }}
      >
        {/* About Section */}
        <div
          id="about"
          className="mb-10 md:mb-16"
          data-scroll-section
        >
          <p className="text-base sm:text-lg md:text-lg text-neutral-300 leading-relaxed max-w-2xl">
            I'm a front-end developer passionate about crafting clean,
            responsive, and accessible user interfaces using modern tools like
            React, Vite, and Tailwind CSS. I love building digital experiences
            that are both visually appealing and user-friendly.
            <br />
            <br />
            Recently, I completed my internship at{" "}
            <span className="font-semibold text-[#38BDF8]">
              Leentech Network Solutions
            </span>
            , where I worked on designing and developing interfaces for a job
            portal using Tailwind CSS and React. I focused on building
            components that adapt well across different devices and screen
            sizes.
            <br />
            <br />I also led the development of{" "}
            <span className="font-bold text-white">ReadSpeak</span>, a
            speech-based learning platform designed to help elementary students
            improve their reading and comprehension. Through this project, I
            deepened my experience in API integration, UI/UX design, and
            accessibility.
            <br />
            <br />
            In my spare time, I enjoy exploring web animations, refining
            layouts, and learning new tech to level up my skills.
          </p>
        </div>
        {/* Experience Section */}
        <div
          id="experience"
          className="mb-10 md:mb-16 mt-10 md:mt-16 py-8"
          data-scroll-section
        >
          {/* Experience Label with icon and horizontal line */}
          <div className="relative w-full max-w-2xl mx-auto mb-8">
            <hr className="border-t border-[#2c2b2b]" />
            <span className="absolute right-4 md:right-8 -top-7 bg-[#F8F6ED] rounded-full w-14 h-14 flex items-center justify-center shadow-md border border-[#FFB545]">
              <FaRegIdBadge size={28} className="text-[#1e1e1e]" />
            </span>
          </div>
          <div className="text-sm text-neutral-400 mb-2">June 2024 — August 2024</div>
          <div className="font-semibold text-lg text-white mb-1">
            Frontend Developer Intern · Leentech Network Solutions
          </div>
          <div className="text-base text-neutral-300 mb-2">
            Designed and developed responsive UI components for a job portal
            using React and Tailwind CSS. Collaborated with designers and
            developers to implement clean, accessible layouts, and contributed
            to improving the overall user experience of the platform.
          </div>
          <div className="flex gap-2 flex-wrap mt-2">
            <span className="bg-[#1e293b] text-[#38BDF8] px-3 py-1 rounded-full text-xs font-semibold">
              JavaScript
            </span>
            <span className="bg-[#1e293b] text-[#38BDF8] px-3 py-1 rounded-full text-xs font-semibold">
              React
            </span>
            <span className="bg-[#1e293b] text-[#38BDF8] px-3 py-1 rounded-full text-xs font-semibold">
              Tailwind CSS
            </span>
            <span className="bg-[#1e293b] text-[#38BDF8] px-3 py-1 rounded-full text-xs font-semibold">
              Figma
            </span>
          </div>
        </div>
        {/* Projects Section */}
        <div
          id="projects"
          className="mb-16"
          data-scroll-section
        >
          <p className="text-base text-neutral-400 leading-relaxed max-w-2xl">
            Loosely designed in{" "}
            <span className="font-semibold text-white">Figma</span> and coded in{" "}
            <span className="font-semibold text-white">Visual Studio Code</span> by
            yours truly. Built with{" "}
            <span className="font-semibold text-white">ReactJS+Vite</span> and{" "}
            <span className="font-semibold text-white">Tailwind CSS</span>, deployed
            with <span className="font-semibold text-white">Vercel</span>. All text
            is set in the{" "}
            <span className="font-semibold text-white">Inter</span> typeface.
          </p>
        </div>
      </section>
    </main>
  );
}
