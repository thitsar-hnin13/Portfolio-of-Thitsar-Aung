import React from 'react'
import { FaXTwitter, FaLinkedin, FaGithub } from "react-icons/fa6"
import { clamp, motion } from 'framer-motion'
const Footer = () => {
  const socials = [
    { Icon: FaXTwitter, label: "X", href: "https://twitter.com/yourprofile" },
    { Icon: FaLinkedin, label: "LinkedIn", href: "https://linkedin.com/in/yourprofile" },
    { Icon: FaGithub, label: "Github", href: "https://github.com/yourprofile" },
  ]
  const glowVariants = {
    inertia: { scale: 1, y: 0, filter: "drop-shadow(0 0 0 rgba(0,0,0,0))" },
    hover: {
      scale: 1.2, y: -3,
      filter: "drop-shadow(0 0 8px rgba(13,88,204,0.9)) drop-shadow(0 0 18px rgba(16,185,129,0.8))",
      transition: { type: "spring", stiffness: 300, damping: 15 }

    },
    tap: {
      scale: 0.95, y: 0,
      transition: { duration: 0.08 }
    }
  }

  return (
    <div className='relative overflow-hidden bg-black'>
      <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(55%_60%_at_70%_35%,rgba(13,88,202,0.35),transparent_70%)]'/>
      <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(50%_55%_at_30%_70%,rgba(16,185,129,0.30),transparent_70%)]'/>

      <motion.div className="relative z-10 px-4 sm:px-8 lg:px-10 md:py-20 flex flex-col items-center text-center space-y-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="font-semibold leading-none text-white text-center select-none"
          style={{ fontSize: "clamp(3rem,5vw,14rem)", letterSpacing: "0.02em", lineHeight: 0.9, padding: "0 3vw", whiteSpace: "nowarp", textShadow: "0 2px 18px rgba(0,0,0,0.45)" }}
        >
          Moe Kaung
        </h1>
        <div className='h-[3px] w-24 md:w-32 rounded-full bg-gradient-to-r from-[#0d58cc] via-cyan-300 to-emerald-400' />
        <div className='flex gap-5 text-2xl md:text-3xl'>
          {socials.map(({ Icon, label, href }) => (
            <motion.a href={href}
              key={label}
              aria-label={label}
              target='_blank'
              rel="noopener noreferrer"
              variants={glowVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              className='text-gray-300 transition-colors duration-200 inline-flex items-center justify-center'
            >
              <Icon />
            </motion.a>

          ))}


        </div>
        <p className='text-gray-300 italic max-w-xl'>
          "Success is when preparation meets opportunity"

        </p>
        <p className="text-xs text-gray-400">
          &copy;{new Date().getFullYear() } Moe Kaung . All rights reserved.
        </p>

      </motion.div>

    </div>
  )
}

export default Footer