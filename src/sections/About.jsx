import { motion } from 'framer-motion'
import React from 'react'
import p from '../assets/p.jpg'

const About = () => {

  const states = [
    { label: "Experience", value: "1+ years" },
    { label: "Speciality", value: " Junior Web Developer" },
    { label: "Focus", value: "Performance & UX" },
  ];
  const glows = [
    '-top-10 -left-10 w-[360px] h-[360px] opacity-20 blur-[120px]',
    'bottom-0 right-10 w-[420px] h-[420px] opacity-15 blur-[140px] delay-300',
    'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] opacity-10 blur-[100px]',
  ]


  return (
    <div id='about' className="min-h-screen w-full flex items-center justify-center relative bg-black text-white overflow-hidden" >

      <div className="absolute inset-0 pointer-events-none">
        {glows.map((c, i) => (

          <div className={`absolute rounded-full bg-gradient-to-r from-[#302d63] via-[#00bf8f] to-[#1cd8d2] animate-pulse ${c}`} key={i} >

          </div>
        ))

        }

      </div>
      <div className="relative z-10 max-w-6xl w-full mx-auto px-6 md:px-10 lg:px-12 py-20 flex flex-col gap-12">
        <motion.div className="flex flex-col md:flex-row items-center md:items-stretch gap-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.div className='relative w-[160px] h-[160px] md:[200px]  rounded-2xl overflow-hidden shadow-2xl  '
          whileHover={{scale:1.02}}
          transition={{type:"spring" ,stiffness:200,damping:18 }}
          >
            <img src={p} alt="profile" className='absolute inset-0  ' />
          </motion.div>
          <div className="flex-1 flex-col justify-center text-center md:text-left ">
            <h2 className=' text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent 
      bg-gradient-to-r  from-[#302d63] via-[#00bf8f] to-[#1cd8d2]
      '>
              Moe kaung

            </h2>
            <p className="mt-2 text-lg sm:text-xl text-white/90 font-semibold">
              UNIQUE SOLUTION COMPANY & T13H COMPANY
            </p>
            <p className="mt-4 text-gary-300 leading-relaxed text-base sm:text-lg max-w-2xl md:max-w-3xl">
              I am a motivated Junior Web Developer with basic knowledge of
              Django, React, and REST API development.
              I enjoy learning new technologies and building real-world projects.
              I am looking for an opportunity to grow my skills and contribute
              to a development team.
            </p>
            <div className="mt-6 grid grid-row-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-xl ">
              {states.map((state, i) => (
                
                  <motion.div className="rounded-xl border  border-white/10 bg-white/5 px-4 py-3 text-center " key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 * i, duration: 0.4 }}
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    <div className="text-sm  text-gary-400 ">{state.label}</div>
                    <div className="text-lg font-semibold">{state.value}</div>
                  </motion.div>
                
              ))}

            </div>
            <div className=" mt-6 flex flex-col sm:flex-row  gap-3 sm:gap-4 justify-center md:justify-start text-lg font-medium">
              <a href="#projects" className='inline-flex items-center justify-center rounded-lg bg-white text-black font-semibold px-5 py-3 hover:bg-gray-200 transition'>View Projects</a>
              <a href="#contact" className='inline-flex items-center justify-center rounded-lg border  border-white/20 text-white bg-white/10 font-semibold px-5 py-3 hover:bg-white/20 transition'>Get in Touch </a>
            </div>

          </div>
        </motion.div>
        <motion.div className='text-center md:text-left'
        initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.4 }}
        
        >
          <h3 className='text-2xl sm:text-3xl font-bold text-white  mb-3'>About</h3>
          <p className='text-gray-300 leading-relaxed text-base sm:text-lg'>
            I am a motivated Junior Web Developer with basic knowledge of
              Django, React, and REST API development.
              I enjoy learning new technologies and building real-world projects.
          </p>
          <p className='mt-4 text-gray-400  text-base sm:text-lg'>
            I am looking for an opportunity to grow my skills and contribute
              to a development team.
          </p>
        </motion.div>

      </div>
    </div>
  )
}

export default About