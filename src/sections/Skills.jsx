import React, {  useEffect, useRef, useState } from 'react'
import { motion, useMotionValue } from 'framer-motion'
import { FaReact } from 'react-icons/fa6';
import { RiTailwindCssFill } from "react-icons/ri";
import { FaPython } from 'react-icons/fa6';
import { IoLogoJavascript } from "react-icons/io5";
import { DiDjango } from "react-icons/di";
import { FaBootstrap } from "react-icons/fa";
import { FaPhp } from "react-icons/fa";
import { FaLaravel } from "react-icons/fa";
import { SiMysql } from "react-icons/si";
import { SiMongodb } from "react-icons/si";
import { FaGit } from "react-icons/fa";
import { MdLan, MdSecurity, MdDesignServices, MdVideoLibrary, MdAccountBalance, MdLanguage } from "react-icons/md";


const Skills = () => {
  const skills = [
    { icon: <FaReact />, name: "React" },
    { icon: <RiTailwindCssFill />, name: "Tailwind CSS" },
    { icon: <FaPython />, name: "Python" },
    { icon: <IoLogoJavascript />, name: "JavaScript" },
    { icon: <DiDjango />, name: "Django" },
    { icon: <FaBootstrap />, name: "Bootstrap" },
    { icon: <FaPhp />, name: "PHP" },
    { icon: <FaLaravel />, name: "Laravel" },
    { icon: <SiMysql />, name: "MySQL" },
    { icon: <SiMongodb />, name: "MongoDB" },
    { icon: <FaGit />, name: "Git" },

    { icon: <MdLan />, name: "Network Design" },
  { icon: <MdSecurity />, name: "Cybersecurity" },
  { icon: <MdDesignServices />, name: "Graphic Design" },
  { icon: <MdVideoLibrary />, name: "Video Editing" },
  { icon: <MdAccountBalance />, name: "Accounting" },
  { icon: <MdLanguage />, name: "Japanese" },
  { icon: <MdLanguage />, name: "Korean" },
  ];
  const repeated = [...skills, ...skills];

  const [dir, setDir] = useState(-1);
  const [active, setActive] = useState(false);
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const touchY = useRef(null);
  const x = useMotionValue(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(([entry]) => {
      setActive(entry.isIntersecting && entry.intersectionRatio > 0.1); 
    } ,
    { threshold: [0.1] }
  )
  io.observe(el);
  return () => io.disconnect();
  },[])

useEffect(() => {
  if(!active) return; 
  const onWheel = (e) => setDir(e.deltaY > 0 ? -1 : 1);
  const onTouchStart = (e) => (touchY.current = e.touches[0].clientY);
  const onTouchMove = (e) => {
    if (touchY.current == null) return;
    const delta = e.touches[0].clientY - touchY.current;
    setDir(delta > 0 ? 1 : -1);
    touchY.current = e.touches[0].clientY;
  }
  window.addEventListener("wheel", onWheel, { passive: true });
  window.addEventListener("touchstart", onTouchStart, { passive: true });
  window.addEventListener("touchmove", onTouchMove, { passive: true }); 
  return () => {
    window.removeEventListener("wheel", onWheel);
    window.removeEventListener("touchstart", onTouchStart);
    window.removeEventListener("touchmove", onTouchMove);
  }
},[active]);

useEffect(() => {
  let id;
  let last = performance.now();
  
  const SPEED = 80;


  const tick = (now) => {
    const dt = (now - last) / 1000;
    last = now;
    let next = x.get() + SPEED * dir * dt;
    const loop = trackRef.current?.scrollWidth/2 || 0;
    if (loop){
      if (next <= -loop) next += loop;
      if (next >= 0) next -= loop;
    }
    x.set(next);  
    id = requestAnimationFrame(tick);
   
  }
  id = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(id);
  
}, [dir, x]);




  return (
    <div id="skills"
      ref={sectionRef}
      className='h-1/2 w-full pb-8 flex flex-col items-center justify-center relative bg-yellow-100 text-white overflow-hidden'>
      <div className="absolute inset-0 pointer-events-none">
        <div className='absolute top-1/4 left-0 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-[#632d2d] via-[#ff995e] to-[#ffcc6f]  
        opacity-20 blur-[120px] animate-pulse' />
        <div className='absolute bottom-1/4 right-0 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-[#302d63] via-[#bf0050] to-[#d81c3b]  
        opacity-20 blur-[120px] animate-pulse delay-500' />
      </div>
      <motion.h2 className='text-4xl mt-5 sm:text-5xl font-bold bg-clip-text text-transparent  bg-gradient-to-r from-[#d81c4b] via-[#bf0010] to-[#302b63] z-10'
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        My skills
      </motion.h2>
      <motion.p className='mt-2 mb-8 text-blue-300/90 text-base sm:text-lg z-10 '
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        Here are some of the technologies I work with:
      </motion.p>
      <div className="relative w-full overflow-hidden">
        <motion.div
          ref={trackRef}
          style={{x,whiteSpace:"nowrap" , willChange:"transform"}}
          className='flex gap-10 text-6xl text-[#cf124b] '>
          {repeated.map((s, i) => (
            <div className="flex flex-col items-center gap-2 min-w-[120px]" key={i}
              title={s.name}
              aria-label={s.name}>
              <span className='hover:scale-125 transition-transform duration-300'>{s.icon}</span>
              <p className="text-sm">{s.name}</p>
            </div>
          ))}

        </motion.div>

      </div>
    </div>
  )
}

export default Skills