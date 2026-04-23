import React, { useEffect, useState } from 'react'
import m1 from '../assets/l3.jpg'
import m2 from '../assets/l2.jpg'
import m3 from '../assets/l.jpg'
import m4 from '../assets/l1.jpg'
import { motion } from 'framer-motion'

// Language translations (English & Korean only)
const translations = {
  en: {
    title: "What People Say",
    viewMore: "View All Testimonials",
  },
  ko: {
    title: "사람들의 이야기",
    viewMore: "모든 후기 보기",
  }
};

const testimonials = [
  {
    name: "Moe Kaung",
    role: "Full Stack Developer",
    review: "Working with this team was a fantastic experience. The project management and technical guidance helped me grow professionally.",
    image: m1,
  },
  {
    name: "Min Wai Tun",
    role: "Frontend Developer",
    review: "I truly appreciate the supportive work environment. Collaboration here leads to innovative solutions every day.",
    image: m2,
  },
  {
    name: "Nay Lin Soe",
    role: "Backend Developer",
    review: "The mentorship and learning opportunities were amazing. I could tackle complex projects confidently.",
    image: m3,
  },
  {
    name: "Naing Ye Thway",
    role: "Backend Developer",
    review: "Every day brought new challenges and learning moments. The culture encourages growth and creativity.",
    image: m4,
  },
]

const Testimonials = () => {
  const [language, setLanguage] = useState("en");
  const t = translations[language];

  // Generate animated black dots positions
  const [dotPositions, setDotPositions] = useState([]);
  useEffect(() => {
    const positions = Array.from({ length: 50 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 4 + 1.5,
      duration: Math.random() * 12 + 8,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.35 + 0.15,
      xMove: (Math.random() - 0.5) * 50,
      yMove: (Math.random() - 0.5) * 40,
    }));
    setDotPositions(positions);
  }, []);

  // Language selector - English & Korean only
  const LanguageSelector = () => (
    <div className="fixed top-5 right-5 z-50 flex gap-2">
      {[
        { code: "en", label: "English", flag: "🇬🇧" },
        { code: "ko", label: "한국어", flag: "🇰🇷" }
      ].map((lang) => (
        <motion.button
          key={lang.code}
          whileHover={{ scale: 1.05, y: -2, boxShadow: "0 5px 20px rgba(212,175,55,0.3)" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setLanguage(lang.code)}
          className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all flex items-center gap-1 sm:gap-2 ${
            language === lang.code
              ? "bg-gradient-to-r from-amber-500 to-yellow-600 text-white shadow-md"
              : "bg-white/80 text-gray-700 hover:bg-amber-400 hover:text-white backdrop-blur-sm border border-amber-300"
          }`}
        >
          <span>{lang.flag}</span>
          <span className="hidden sm:inline">{lang.label}</span>
          <span className="sm:hidden">{lang.code.toUpperCase()}</span>
        </motion.button>
      ))}
    </div>
  );

  return (
    <div id='testimonials' className="relative min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 flex flex-col items-center justify-center px-5 sm:px-6 py-16 sm:py-20 overflow-hidden">
      
      {/* Language Selector */}
      <LanguageSelector />

      {/* Gold Background Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-amber-200/40 blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-yellow-100/40 blur-3xl animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-amber-100/30 blur-3xl" />
        <div className="absolute top-40 right-1/4 w-48 h-48 rounded-full bg-yellow-50/50 blur-2xl animate-pulse delay-1000" />
      </div>

      {/* Animated Black Dots */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {dotPositions.map((dot, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-black"
            style={{
              width: dot.size,
              height: dot.size,
              left: `${dot.left}%`,
              top: `${dot.top}%`,
              opacity: dot.opacity,
            }}
            animate={{
              x: [0, dot.xMove, -dot.xMove * 0.5, 0],
              y: [0, dot.yMove, -dot.yMove * 0.3, 0],
              opacity: [dot.opacity, dot.opacity + 0.2, dot.opacity - 0.1, dot.opacity],
            }}
            transition={{
              duration: dot.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: dot.delay,
            }}
          />
        ))}
      </div>

      <motion.h2 
        className='text-3xl sm:text-4xl md:text-5xl font-bold mb-12 sm:mb-16 text-center relative z-10'
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <span className="bg-gradient-to-r from-amber-600 via-yellow-600 to-purple-700 bg-clip-text text-transparent">
          {t.title}
        </span>
        <motion.span 
          className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: 80 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          viewport={{ once: true }}
        />
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-6xl w-full relative z-10">
        {testimonials.map((tItem, i) => (
          <motion.div 
            key={tItem.name + i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{ 
              y: -8,
              transition: { type: "spring", stiffness: 300 }
            }}
            className='group bg-white/90 backdrop-blur-sm rounded-2xl p-5 sm:p-6 flex flex-col items-center text-center shadow-lg hover:shadow-2xl transition-all duration-300 border border-amber-200'
          >
            {/* Image with gold ring on hover */}
            <motion.div 
              className="relative mb-4"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md" />
              <img 
                src={tItem.image} 
                alt={tItem.name} 
                className='w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-amber-200 group-hover:border-amber-400 transition-all duration-300 object-cover relative z-10' 
                loading='lazy'
              />
            </motion.div>
            
            {/* Review text */}
            <motion.p 
              className="text-gray-600 italic mb-4 leading-relaxed text-sm sm:text-base px-2"
              initial={{ opacity: 0.8 }}
              whileHover={{ opacity: 1 }}
            >
              "{tItem.review}"
            </motion.p>
            
            {/* Name with purple accent (secondary color) */}
            <motion.h3 
              className='text-base sm:text-lg font-semibold text-gray-800 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-amber-600 group-hover:to-purple-700 transition-all duration-300'
            >
              {tItem.name}
            </motion.h3>
            
            {/* Role with gold color */}
            <p className="text-xs sm:text-sm text-amber-600 font-medium">
              {tItem.role}
            </p>
            
            {/* Secondary accent color element (deep purple) */}
            <div className="mt-2 flex items-center gap-1">
              <span className="text-[10px] sm:text-xs text-purple-500 bg-purple-50 px-2 py-0.5 rounded-full">✨ Developer</span>
            </div>
            
            {/* Decorative quote icon */}
            <motion.div 
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-3xl sm:text-4xl text-amber-200 opacity-50 group-hover:opacity-100 group-hover:text-amber-300 transition-all duration-300"
              initial={{ rotate: 0 }}
              whileHover={{ rotate: 10, scale: 1.1 }}
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Dark Gray Button with Skew Hover Effect */}
      <motion.div 
        className="mt-12 sm:mt-16 z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        viewport={{ once: true }}
      >
        <motion.a
          href="#contact"
          className="inline-block px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold text-white bg-gray-700 shadow-md transition-all duration-300 text-sm sm:text-base"
          whileHover={{ 
            scale: 1.05, 
            boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
            backgroundColor: "#ffffff",
            color: "#1f2937",
            skewX: -8,
          }}
          whileTap={{ scale: 0.95 }}
        >
          {t.viewMore}
        </motion.a>
      </motion.div>

      {/* Decorative bottom dots */}
      <motion.div 
        className="mt-12 sm:mt-16 flex gap-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        viewport={{ once: true }}
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-amber-400"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}
      </motion.div>
    </div>
  )
}

export default Testimonials;