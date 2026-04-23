// components/Footer.jsx
import React, { useState, useEffect } from 'react';
import { 
  FaXTwitter, 
  FaLinkedin, 
  FaGithub, 
  FaTelegram,
  FaEnvelope,
  FaPhone,
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaBriefcase,
  FaCopy,
  FaCheck,
  FaHeart,
  FaArrowUp
} from "react-icons/fa6";
import { 
  SiViber, 
  SiGooglemeet, 
  SiGooglecalendar,
  SiDevpost,
  SiDiscord
} from "react-icons/si";
import { motion, AnimatePresence } from 'framer-motion';

// Language translations (English & Korean only)
const translations = {
  en: {
    phoneNumber: "Phone Number",
    copy: "Copy",
    copied: "Copied!",
    call: "Call",
    close: "Close",
    quote: "Building digital solutions with passion and precision",
    rights: "All rights reserved",
    madeWith: "Made with",
    github: "GitHub",
    linkedin: "LinkedIn",
    email: "Email",
    phone: "Phone",
    facebook: "Facebook",
    instagram: "Instagram",
    twitter: "X (Twitter)",
    tiktok: "TikTok",
    youtube: "YouTube",
    telegram: "Telegram",
    viber: "Viber",
    meet: "Google Meet",
    calendar: "Google Calendar",
    portfolio: "Portfolio",
    devpost: "Devpost",
    discord: "Discord"
  },
  ko: {
    phoneNumber: "전화번호",
    copy: "복사",
    copied: "복사됨",
    call: "전화",
    close: "닫기",
    quote: "열정과 정밀함으로 디지털 솔루션 구축",
    rights: "모든 권리 보유",
    madeWith: "만든",
    github: "깃허브",
    linkedin: "링크드인",
    email: "이메일",
    phone: "전화",
    facebook: "페이스북",
    instagram: "인스타그램",
    twitter: "X (트위터)",
    tiktok: "틱톡",
    youtube: "유튜브",
    telegram: "텔레그램",
    viber: "바이버",
    meet: "구글 미트",
    calendar: "구글 캘린더",
    portfolio: "포트폴리오",
    devpost: "데브포스트",
    discord: "디스코드"
  }
};

// Phone Popup Component
const PhonePopup = ({ isOpen, onClose, phoneNumber, t }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(phoneNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 50 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-md"
          >
            <div className="bg-white rounded-2xl shadow-2xl border border-amber-200 overflow-hidden">
              <div className="relative bg-gradient-to-r from-amber-500 to-yellow-600 p-6">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-xl"
                />
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <FaPhone className="text-white text-2xl" />
                  </motion.div>
                  <h3 className="text-white text-xl font-bold">{t.phoneNumber}</h3>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex flex-col sm:flex-row items-center justify-between bg-gray-50 rounded-xl p-4 mb-4 border border-gray-200 gap-3">
                  <motion.span 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-gray-800 text-xl sm:text-2xl font-mono tracking-wider"
                  >
                    {phoneNumber}
                  </motion.span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-600 text-white rounded-lg hover:shadow-lg transition-all"
                  >
                    {copied ? (
                      <>
                        <FaCheck className="text-green-300" />
                        <span>{t.copied}</span>
                      </>
                    ) : (
                      <>
                        <FaCopy />
                        <span>{t.copy}</span>
                      </>
                    )}
                  </motion.button>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href={`tel:${phoneNumber.replace(/\s/g, '')}`}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-amber-500 to-yellow-600 text-white rounded-lg hover:shadow-lg transition-all"
                  >
                    <FaPhone />
                    <span>{t.call}</span>
                  </motion.a>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                    className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all"
                  >
                    {t.close}
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const Footer = ({ language = 'en' }) => {
  const [currentLanguage, setCurrentLanguage] = useState(language);
  const [showPhonePopup, setShowPhonePopup] = useState(false);
  const [selectedPhone, setSelectedPhone] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);

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

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const t = translations[currentLanguage];

  const socials = [
    { Icon: FaGithub, label: "github", href: "https://github.com/thitsar-hnin13", color: "#333", hoverColor: "#d4af37" },
    { Icon: FaLinkedin, label: "linkedin", href: "https://www.linkedin.com/in/thitsar-aung-2425083b3/", color: "#0077b5", hoverColor: "#d4af37" },
    { Icon: FaEnvelope, label: "email", href: "mailto:thitsar.aung@example.com", color: "#ea4335", hoverColor: "#d4af37" },
    { Icon: FaPhone, label: "phone", href: "#", isPhone: true, phoneNumber: "09 781360700", color: "#34a853", hoverColor: "#d4af37" },
    { Icon: FaFacebook, label: "facebook", href: "https://www.facebook.com/profile.php?id=61578864863833", color: "#1877f2", hoverColor: "#d4af37" },
    { Icon: FaInstagram, label: "instagram", href: "https://www.instagram.com/thitsaraung471/?hl=en", color: "#e4405f", hoverColor: "#d4af37" },
    { Icon: FaXTwitter, label: "twitter", href: "https://x.com/AungThitsa43678", color: "#1da1f2", hoverColor: "#d4af37" },
    { Icon: FaTiktok, label: "tiktok", href: "https://tiktok.com/@thitsar_314200", color: "#69c9d0", hoverColor: "#d4af37" },
    { Icon: FaYoutube, label: "youtube", href: "https://youtube.com/@ThitsarAung_3142", color: "#ff0000", hoverColor: "#d4af37" },
    { Icon: FaTelegram, label: "telegram", href: "https://t.me/ipcomtuninpertsalh1_3thankubN17", color: "#0088cc", hoverColor: "#d4af37" },
    { Icon: SiViber, label: "viber", href: "viber://chat?number=+959458763330", color: "#665cac", hoverColor: "#d4af37" },
    { Icon: SiGooglemeet, label: "meet", href: "https://meet.google.com/wfc-mwyp-ywk", color: "#00897b", hoverColor: "#d4af37" },
    { Icon: SiGooglecalendar, label: "calendar", href: "https://calendar.google.com/calendar", color: "#4285f4", hoverColor: "#d4af37" },
    { Icon: SiDevpost, label: "devpost", href: "https://devpost.com/thitsar-hnin13", color: "#003E54", hoverColor: "#d4af37" },
    { Icon: SiDiscord, label: "discord", href: "https://discord.com/channels/1483857742539132943", color: "#5865F2", hoverColor: "#d4af37" },
    { Icon: FaBriefcase, label: "portfolio", href: "https://thitsarprotfolio.vercel.app/", color: "#8B5CF6", hoverColor: "#d4af37" }
  ];

  const glowVariants = {
    initial: { scale: 1, y: 0 },
    hover: (color) => ({
      scale: 1.2,
      y: -3,
      color: color,
      transition: { type: "spring", stiffness: 300, damping: 15 }
    }),
    tap: { scale: 0.95, transition: { duration: 0.08 } }
  };

  const handlePhoneClick = (e, phoneNumber) => {
    e.preventDefault();
    setSelectedPhone(phoneNumber);
    setShowPhonePopup(true);
  };

  // Language selector - English & Korean only
  const LanguageSelector = () => (
    <div className="absolute top-5 right-5 z-50 flex gap-2">
      {[
        { code: "en", label: "English", flag: "🇬🇧" },
        { code: "ko", label: "한국어", flag: "🇰🇷" }
      ].map((lang) => (
        <motion.button
          key={lang.code}
          whileHover={{ scale: 1.05, y: -2, boxShadow: "0 5px 20px rgba(212,175,55,0.3)" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setCurrentLanguage(lang.code)}
          className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all flex items-center gap-1 sm:gap-2 ${
            currentLanguage === lang.code
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
    <>
      <footer className='relative overflow-hidden bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 py-12 sm:py-16 md:py-20'>
        {/* Language Selector */}
        <LanguageSelector />

        {/* Gold Background Gradients */}
        <div className='pointer-events-none absolute inset-0'>
          <motion.div 
            className='absolute top-0 left-0 w-96 h-96 rounded-full bg-amber-200/40 blur-3xl'
            animate={{ scale: [1, 1.2, 1], x: [0, 50, 0] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          <motion.div 
            className='absolute bottom-0 right-0 w-96 h-96 rounded-full bg-yellow-100/40 blur-3xl'
            animate={{ scale: [1, 1.3, 1], x: [0, -50, 0] }}
            transition={{ duration: 12, repeat: Infinity, delay: 2 }}
          />
          <motion.div 
            className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-amber-100/30 blur-3xl'
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
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
                opacity: dot.opacity * 0.6,
              }}
              animate={{
                x: [0, dot.xMove, -dot.xMove * 0.5, 0],
                y: [0, dot.yMove, -dot.yMove * 0.3, 0],
                opacity: [dot.opacity * 0.6, dot.opacity * 0.8, dot.opacity * 0.4, dot.opacity * 0.6],
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

        <motion.div 
          className="relative z-10 px-5 sm:px-8 lg:px-10 flex flex-col items-center text-center space-y-5 sm:space-y-6 max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Name with Gold/Purple Gradient */}
          <motion.h1 
            className="font-bold leading-tight text-center select-none bg-gradient-to-r from-amber-600 via-yellow-600 to-purple-700 bg-clip-text text-transparent"
            style={{ 
              fontSize: "clamp(2rem, 7vw, 5rem)", 
              letterSpacing: "0.02em", 
              lineHeight: 1.1,
              whiteSpace: "normal",
              wordBreak: "break-word"
            }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            Thitsar Aung
          </motion.h1>
          
          {/* Animated Underline */}
          <motion.div 
            className='h-[3px] w-20 sm:w-24 md:w-32 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500'
            initial={{ width: 0 }}
            whileInView={{ width: "5rem" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />
          
          {/* Social Icons with Gold Hover */}
          <motion.div 
            className='flex flex-wrap gap-4 sm:gap-5 text-xl sm:text-2xl md:text-3xl items-center justify-center max-w-4xl'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {socials.map(({ Icon, label, href, isPhone, phoneNumber }) => (
              <motion.a 
                href={isPhone ? "#" : href}
                key={label}
                aria-label={t[label]}
                target={isPhone ? "_self" : "_blank"}
                rel="noopener noreferrer"
                variants={glowVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                custom="#d4af37"
                className='text-gray-500 hover:text-amber-500 transition-colors duration-200 inline-flex items-center justify-center relative group'
                onClick={(e) => isPhone && handlePhoneClick(e, phoneNumber)}
              >
                <Icon />
                <span className="absolute -bottom-7 sm:-bottom-8 left-1/2 transform -translate-x-1/2 text-[10px] sm:text-xs bg-gray-700 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg z-20 pointer-events-none">
                  {t[label]}
                </span>
              </motion.a>
            ))}
          </motion.div>

          {/* Quote with Gold/Amber Color */}
          <motion.p 
            className='text-amber-600 italic max-w-xl mt-4 sm:mt-6 text-sm sm:text-base px-4'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <span className="text-xl sm:text-2xl mr-1 opacity-70">"</span>{t.quote}<span className="text-xl sm:text-2xl ml-1 opacity-70">"</span>
          </motion.p>
          
          {/* Dark Gray Button with Skew Hover Effect */}
          <motion.button
            onClick={scrollToTop}
            className="mt-4 sm:mt-6 inline-flex items-center gap-2 px-5 sm:px-6 py-2 sm:py-2.5 rounded-full font-semibold text-white bg-gray-700 shadow-md transition-all duration-300 text-sm sm:text-base"
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
              backgroundColor: "#ffffff",
              color: "#1f2937",
              skewX: -5,
            }}
            whileTap={{ scale: 0.95 }}
          >
            <FaArrowUp className="text-sm sm:text-base" />
            <span>Back to Top</span>
          </motion.button>
          
          {/* Copyright with Heart Animation */}
          <motion.p 
            className="text-xs text-gray-500 mt-4 sm:mt-6 flex items-center justify-center gap-1 flex-wrap px-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            &copy; {new Date().getFullYear()} Thitsar Aung. {t.madeWith}{' '}
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <FaHeart className="text-rose-400 inline-block text-xs" />
            </motion.span>{' '}
            {t.rights}.
          </motion.p>
        </motion.div>
      </footer>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ 
              scale: 1.1, 
              boxShadow: "0 5px 20px rgba(212,175,55,0.4)",
              backgroundColor: "#ffffff",
              color: "#1f2937",
              skewX: -5,
            }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-700 text-white shadow-lg transition-all flex items-center justify-center cursor-pointer"
          >
            <FaArrowUp className="text-sm sm:text-base" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Phone Popup */}
      <PhonePopup 
        isOpen={showPhonePopup}
        onClose={() => setShowPhonePopup(false)}
        phoneNumber={selectedPhone}
        t={t}
      />
    </>
  );
};

export default Footer;