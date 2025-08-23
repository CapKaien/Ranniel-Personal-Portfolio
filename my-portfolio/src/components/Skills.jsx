import { motion } from "framer-motion";
import {
  FaPencilRuler,
  FaMobileAlt,
  FaPalette,
  FaBolt,        // used for "Development" card + REST API logo
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaBootstrap,
  FaGithub,
} from "react-icons/fa";

import {
  SiTailwindcss,
  SiFigma,
  SiCanva,
  SiMysql,
  SiPython,
  SiWebflow,     // ✅ Webflow logo
  SiGreensock,   // ✅ GSAP logo
} from "react-icons/si";


export default function Details() {
  const cards = [
    {
      icon: <FaPencilRuler size={40} style={{ color: "#17F1D1" }} />,
      title: "UI & UX",
      desc: "Designing interfaces that are intuitive, efficient, and enjoyable to use.",
      color: "#17F1D1",
    },
    {
      icon: <FaMobileAlt size={40} style={{ color: "#A374FF" }} />,
      title: "Web & Mobile App",
      desc: "Transforming ideas into exceptional web and mobile app experiences.",
      color: "#A374FF",
    },
    {
      icon: <FaPalette size={40} style={{ color: "#F1C069" }} />,
      title: "Design & Creative",
      desc: "Crafting visually stunning design that connects deeply with your audience.",
      color: "#F1C069",
    },
    {
      icon: <FaBolt size={40} style={{ color: "#FFB545" }} />,
      title: "Development",
      desc: "Bringing your vision to life with the latest technology and design trends.",
      color: "#FFB545",
    },
  ];

  const skills = [
    { icon: <FaHtml5 size={48} color="#E44D26" />, label: "HTML" },
    { icon: <FaCss3Alt size={48} color="#1572B6" />, label: "CSS" },
    { icon: <FaJs size={48} color="#F7DF1E" />, label: "JavaScript" },
    { icon: <SiPython size={48} color="#3776AB" />, label: "Python" },
    { icon: <FaReact size={48} color="#61DAFB" />, label: "React" },
    { icon: <SiTailwindcss size={48} color="#38BDF8" />, label: "Tailwind" },
    { icon: <FaBootstrap size={48} color="#7952B3" />, label: "Bootstrap" },
    { icon: <SiFigma size={48} color="#F24E1E" />, label: "Figma" },
    { icon: <SiCanva size={48} color="#00C4CC" />, label: "Canva" },
    { icon: <SiMysql size={48} color="#00758F" />, label: "MySQL" },
    { icon: <FaGithub size={48} color="#FFFFFF" />, label: "GitHub" },

    // ✅ New logos
    { icon: <SiGreensock size={48} color="#88CE02" />, label: "GSAP" },
    { icon: <FaBolt size={48} color="#FFB545" />, label: "REST API" },
    { icon: <SiWebflow size={48} color="#146EF5" />, label: "Webflow" },
  ];

  // Duplicate the skills array for seamless infinite scroll effect
  const scrollingSkills = [...skills, ...skills];

  return (
    <div>
      <section className="w-full py-8 flex flex-col items-center bg-[#0E0E0E]">
        {/* Divider with thunderbolt icon above the heading */}
        <div className="relative w-full max-w-[1600px] mx-auto mb-10">
          <hr className="border-t border-[#2c2b2b]" />
          <span className="absolute right-8 -top-7 bg-[#F8F6ED] rounded-full w-14 h-14 flex items-center justify-center shadow-md border border-[#FFB545]">
            <FaBolt size={28} className="text-[#1e1e1e]" />
          </span>
        </div>
        <h2 className="text-center text-3xl sm:text-4xl font-extrabold text-white mb-12 tracking-wide uppercase">
          WHAT I DO
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 w-full max-w-[1600px] mx-auto px-4 mb-16">
          {cards.map((card, idx) => (
            <motion.div
              key={card.title}
              className="bg-[#161616] border border-[#232323] rounded-xl flex flex-col justify-end items-start min-h-[340px] h-[340px] p-10 w-full hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 cursor-pointer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true, amount: 0.5 }}
              whileHover={{
                boxShadow: `0 8px 32px 0 ${card.color}33`,
                y: -8,
              }}
            >
              <div className="mb-6">{card.icon}</div>
              <div className="font-semibold text-lg mb-2" style={{ color: card.color }}>
                {card.title}
              </div>
              <div className="text-base text-neutral-300">{card.desc}</div>
            </motion.div>
          ))}
        </div>

        {/* Software Skills Section */}
        <div className="w-full max-w-[1400px] mx-auto mt-12">
          <div className="text-center mb-2 tracking-widest text-[#38BDF8] font-semibold text-base">
            EXPERTISE
          </div>
          <div className="text-center text-3xl sm:text-4xl font-extrabold text-white mb-10 tracking-wide uppercase">
            TECH SKILLS
          </div>
          {/* Animated horizontal scroll */}
          <div className="relative overflow-hidden w-full">
            <motion.div
              className="flex gap-8 py-4"
              style={{ width: "max-content" }}
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              }}
            >
              {scrollingSkills.map((skill, idx) => (
                <div
                  key={idx}
                  className="group bg-[#181818] border border-[#232323] rounded-xl flex flex-col items-center justify-center w-28 h-32 md:w-32 md:h-36 shadow transition"
                >
                  {skill.icon}
                  <span className="mt-2 text-[10px] md:text-xs text-neutral-300 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {skill.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
