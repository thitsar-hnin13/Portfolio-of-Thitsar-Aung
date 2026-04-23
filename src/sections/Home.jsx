import React, { useEffect, useMemo, useState } from "react";
import ParticlesBackground from "../components/ParticlesBackground";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaXTwitter,
  FaTelegram,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaPhone,
  FaEnvelope,
  FaCopy,
  FaCheck,
  FaBriefcase,
} from "react-icons/fa6";
import {
  SiGooglecalendar,
  SiGooglemeet,
  SiViber,
  SiDevpost,
  SiDiscord,
} from "react-icons/si";
import home from "../assets/home.png";

// Language translations (English & Korean only)
const translations = {
  en: {
    role1: "Professional Web Developer",
    role2: "Professional React Developer",
    role3: "Professional Frontend Developer",
    hello: "Hello I'm",
    name: "Thitsar Aung",
    description: "I build modern, responsive websites with clean design and smooth user experiences.",
    viewWork: "View my work",
    resume: "My Resume",
    phoneNumber: "Phone Number",
    copy: "Copy",
    copied: "Copied!",
    call: "Call",
    close: "Close",
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
    discord: "Discord",
    jobTitle: "Founder ",
    // companyDesc: "Currently working at a food manufacturing company in Japan",
    travelLove: "✈️ React, Tailwind CSS, and creating clean, intuitive UI/UX ",
    personalNote: "I am a passionate Web Developer focused on building modern and responsive websites.",
  },
  ko: {
    role1: "전문 웹 개발자",
    role2: "전문 React 개발자",
    role3: "전문 프론트엔드 개발자",
    hello: "안녕하세요, 저는",
    name: "싯사르 아웅",
    description: "깔끔한 디자인과 부드러운 사용자 경험을 갖춘 현대적이고 반응형 웹사이트를 구축합니다.",
    viewWork: "내 작업 보기",
    resume: "이력서",
    phoneNumber: "전화번호",
    copy: "복사",
    copied: "복사됨!",
    call: "전화",
    close: "닫기",
    github: "GitHub",
    linkedin: "LinkedIn",
    email: "이메일",
    phone: "전화",
    facebook: "Facebook",
    instagram: "Instagram",
    twitter: "X (Twitter)",
    tiktok: "TikTok",
    youtube: "YouTube",
    telegram: "Telegram",
    viber: "Viber",
    meet: "Google Meet",
    calendar: "Google Calendar",
    portfolio: "포트폴리오",
    devpost: "Devpost",
    discord: "Discord",
    jobTitle: "Founder ",
    // companyDesc: "Currently working at a food manufacturing company in Japan",
    travelLove: "✈️ React, Tailwind CSS, and creating clean, intuitive UI/UX ",
    personalNote: "I am a passionate Web Developer focused on building modern and responsive websites.",
  },
};

const socials = [
  { Icon: FaGithub, labelKey: "github", href: "https://github.com/thitsar-hnin13", color: "#333", hoverColor: "#d4af37" },
  { Icon: FaLinkedin, labelKey: "linkedin", href: "https://www.linkedin.com/in/thitsar-aung-2425083b3/", color: "#0077b5", hoverColor: "#d4af37" },
  { Icon: FaEnvelope, labelKey: "email", href: "https://mail.google.com/mail/u/1/#inbox", color: "#ea4335", hoverColor: "#d4af37" },
  { Icon: FaPhone, labelKey: "phone", href: "#", isPhone: true, phoneNumber: "09 781360700", color: "#34a853", hoverColor: "#d4af37" },
  { Icon: FaFacebook, labelKey: "facebook", href: "https://www.facebook.com/profile.php?id=61578864863833", color: "#1877f2", hoverColor: "#d4af37" },
  { Icon: FaInstagram, labelKey: "instagram", href: "https://www.instagram.com/thitsaraung471/?hl=en", color: "#e4405f", hoverColor: "#d4af37" },
  { Icon: FaXTwitter, labelKey: "twitter", href: "https://x.com/AungThitsa43678", color: "#1da1f2", hoverColor: "#d4af37" },
  { Icon: FaTiktok, labelKey: "tiktok", href: "https://tiktok.com/@thitsar_314200", color: "#69c9d0", hoverColor: "#d4af37" },
  { Icon: FaYoutube, labelKey: "youtube", href: "https://youtube.com/@ThitsarAung_3142", color: "#ff0000", hoverColor: "#d4af37" },
  { Icon: FaTelegram, labelKey: "telegram", href: "https://t.me/ipcomtuninpertsalh1_3thankubN17", color: "#0088cc", hoverColor: "#d4af37" },
  { Icon: SiViber, labelKey: "viber", href: "viber://chat?number=+959458763330", color: "#665cac", hoverColor: "#d4af37" },
  { Icon: SiGooglemeet, labelKey: "meet", href: "https://meet.google.com/wfc-mwyp-ywk", color: "#00897b", hoverColor: "#d4af37" },
  { Icon: SiGooglecalendar, labelKey: "calendar", href: "https://calendar.google.com/calendar", color: "#4285f4", hoverColor: "#d4af37" },
  { Icon: SiDevpost, labelKey: "devpost", href: "https://devpost.com/thitsar-hnin13", color: "#003E54", hoverColor: "#d4af37" },
  { Icon: SiDiscord, labelKey: "discord", href: "https://discord.com/channels/1483857742539132943", color: "#5865F2", hoverColor: "#d4af37" },
  { Icon: FaBriefcase, labelKey: "portfolio", href: "https://thitsarprotfolio.vercel.app/", color: "#8B5CF6", hoverColor: "#d4af37" },
];

const glowVariants = {
  inertia: { scale: 1, y: 0 },
  hover: (color) => ({
    scale: 1.2,
    y: -3,
    color: color,
    transition: { type: "spring", stiffness: 400, damping: 12 },
  }),
  tap: { scale: 0.9, transition: { duration: 0.1 } },
};

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
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-md"
          >
            <div className="bg-white rounded-2xl shadow-2xl border border-amber-200 overflow-hidden">
              <div className="relative bg-gradient-to-r from-amber-500 to-yellow-600 p-6">
                <div className="flex items-center gap-3">
                  <FaPhone className="text-white text-2xl" />
                  <h3 className="text-white text-xl font-bold">{t.phoneNumber}</h3>
                </div>
              </div>
              <div className="p-6">
                <div className="flex flex-col sm:flex-row items-center justify-between bg-gray-50 rounded-xl p-4 mb-4 border border-gray-200 gap-3">
                  <span className="text-gray-800 text-xl sm:text-2xl font-mono tracking-wider">{phoneNumber}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-600 text-white rounded-lg"
                  >
                    {copied ? <><FaCheck /><span>{t.copied}</span></> : <><FaCopy /><span>{t.copy}</span></>}
                  </motion.button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href={`tel:${phoneNumber.replace(/\s/g, "")}`}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-amber-500 to-yellow-600 text-white rounded-lg"
                  >
                    <FaPhone /><span>{t.call}</span>
                  </motion.a>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                    className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
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

const Home = () => {
  const [language, setLanguage] = useState("en");
  const [showPhonePopup, setShowPhonePopup] = useState(false);
  const [selectedPhone, setSelectedPhone] = useState("");
  const t = translations[language];
  const roles = useMemo(() => [t.role1, t.role2, t.role3], [language]);
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

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
    const current = roles[index];
    const timeout = setTimeout(() => {
      if (!deleting && subIndex < current.length) setSubIndex(v => v + 1);
      else if (!deleting && subIndex === current.length) setTimeout(() => setDeleting(true), 1200);
      else if (deleting && subIndex > 0) setSubIndex(v => v - 1);
      else if (deleting && subIndex === 0) {
        setDeleting(false);
        setIndex(p => (p + 1) % roles.length);
      }
    }, deleting ? 40 : 150);
    return () => clearTimeout(timeout);
  }, [subIndex, index, deleting, roles]);

  useEffect(() => {
    setIndex(0);
    setSubIndex(0);
    setDeleting(false);
  }, [language]);

  const handlePhoneClick = (phoneNumber) => {
    setSelectedPhone(phoneNumber);
    setShowPhonePopup(true);
  };

  const firstRowSocials = socials.slice(0, 8);
  const secondRowSocials = socials.slice(8);

  return (
    <section id="home" className="w-full min-h-screen relative bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 overflow-hidden">
      <ParticlesBackground />

      {/* Gold Background Circles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-amber-200/40 blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-yellow-100/50 blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-amber-100/30 blur-3xl" />
        <div className="absolute top-40 left-1/4 w-48 h-48 rounded-full bg-yellow-50/60 blur-2xl animate-pulse delay-700" />
        <div className="absolute bottom-40 right-1/3 w-56 h-56 rounded-full bg-amber-100/30 blur-2xl animate-pulse delay-500" />
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

      {/* Language Selector - English & Korean only */}
      <div className="absolute top-5 right-5 z-50 flex gap-2">
        {[
          // { code: "en", label: "English", flag: "🇬🇧" },
          // { code: "ko", label: "한국어", flag: "🇰🇷" },
        ].map((lang) => (
          <motion.button
            key={lang.code}
            whileHover={{ scale: 1.05, y: -2, boxShadow: "0 5px 20px rgba(212,175,55,0.3)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setLanguage(lang.code)}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all flex items-center gap-1 sm:gap-2 ${
              language === lang.code
                ? "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-md"
                : "bg-white/80 text-gray-700 hover:bg-yellow-400 hover:text-white backdrop-blur-sm border border-yellow-300"
            }`}
          >
            <span>{lang.flag}</span>
            <span className="hidden sm:inline">{lang.label}</span>
            <span className="sm:hidden">{lang.code.toUpperCase()}</span>
          </motion.button>
        ))}
      </div>

      <div className="relative z-10 h-full w-full max-w-7xl mx-auto px-5 sm:px-6 py-16 sm:py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
        <div className="flex flex-col justify-center text-center lg:text-left">
          {/* Typing Animation */}
          <motion.div
            className="mb-2 sm:mb-3 text-base sm:text-xl md:text-2xl font-semibold text-yellow-600 tracking-wide min-h-[2rem] sm:min-h-[2.5rem]"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span>{roles[index].substring(0, subIndex)}</span>
            <span className="inline-block w-[2px] ml-1 bg-yellow-500 animate-pulse align-middle" style={{ height: "1.2em" }} />
          </motion.div>

          {/* Name with Gradient - Secondary accent color deep purple */}
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="text-gray-800">{t.hello}</span>
            <br />
            <motion.span
              className="bg-gradient-to-r from-yellow-600 via-yellow-600 to-purple-700 bg-clip-text text-transparent font-bold"
              animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{ backgroundSize: "200%" }}
            >
              {t.name}
            </motion.span>
          </motion.h1>

          {/* Japan Work Section */}
          <motion.div
            className="mt-4 sm:mt-6 space-y-2 sm:space-y-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="flex items-center justify-center lg:justify-start gap-2 flex-wrap">
              <motion.span 
                className="px-2.5 sm:px-3 py-0.5 sm:py-1 bg-amber-100 text-amber-700 rounded-full text-xs sm:text-sm font-medium border border-amber-300"
                whileHover={{ scale: 1.05, backgroundColor: "#fef3c7", borderColor: "#fcd34d" }}
              >
                🍱 {t.jobTitle}
              </motion.span>
              {/* Secondary accent color element (deep purple) */}
              <motion.span 
                className="px-2.5 sm:px-3 py-0.5 sm:py-1 bg-purple-100 text-purple-700 rounded-full text-xs sm:text-sm font-medium border border-purple-300"
                whileHover={{ scale: 1.05, backgroundColor: "#f3e8ff", borderColor: "#d8b4fe" }}
              >
                ✨ Full-Stack Developer
              </motion.span>
            </div>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0">{t.companyDesc}</p>
            <p className="text-sm sm:text-base lg:text-lg text-amber-600 max-w-2xl mx-auto lg:mx-0 font-medium">{t.travelLove}</p>
            <p className="text-xs sm:text-sm lg:text-base text-gray-500 max-w-2xl mx-auto lg:mx-0 leading-relaxed">{t.personalNote}</p>
          </motion.div>

          <motion.p
            className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {t.description}
          </motion.p>

          {/* Dark Gray Buttons with Skew Hover Effect */}
          <motion.div
            className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <motion.a
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
                backgroundColor: "#ffffff",
                color: "#1f2937",
                skewX: -6,
              }}
              whileTap={{ scale: 0.95 }}
              href="#projects"
              className="inline-block px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold text-white bg-gray-700 shadow-md transition-all duration-300 text-sm sm:text-base"
            >
              {t.viewWork}
            </motion.a>
            
            <motion.a
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                backgroundColor: "#ffffff",
                color: "#1f2937",
                skewX: 6,
              }}
              whileTap={{ scale: 0.95 }}
              href="/cv.pdf"
              download
              className="inline-block px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold text-gray-700 bg-gray-100 border border-gray-300 transition-all duration-300 text-sm sm:text-base"
            >
              {t.resume}
            </motion.a>
          </motion.div>

          {/* Social Icons - Responsive */}
          <div className="mt-8 sm:mt-10">
            <div className="flex flex-wrap gap-4 sm:gap-5 text-xl sm:text-2xl justify-center lg:justify-start">
              {firstRowSocials.map(({ Icon, labelKey, href, isPhone, phoneNumber }) => (
                <motion.a
                  key={labelKey}
                  href={isPhone ? "#" : href}
                  target={isPhone ? "_self" : "_blank"}
                  rel="noopener noreferrer"
                  variants={glowVariants}
                  initial="inertia"
                  whileHover="hover"
                  whileTap="tap"
                  custom="#d4af37"
                  onClick={(e) => {
                    if (isPhone) {
                      e.preventDefault();
                      handlePhoneClick(phoneNumber);
                    }
                  }}
                  className="relative group text-gray-500 hover:text-amber-600 transition-colors"
                  title={t[labelKey]}
                >
                  <Icon />
                  <span className="absolute -bottom-7 sm:-bottom-8 left-1/2 transform -translate-x-1/2 text-[10px] sm:text-xs bg-gray-700 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                    {t[labelKey]}
                  </span>
                </motion.a>
              ))}
            </div>
            <div className="flex flex-wrap gap-4 sm:gap-5 text-xl sm:text-2xl justify-center lg:justify-start mt-3 sm:mt-4">
              {secondRowSocials.map(({ Icon, labelKey, href }) => (
                <motion.a
                  key={labelKey}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={glowVariants}
                  initial="inertia"
                  whileHover="hover"
                  whileTap="tap"
                  custom="#d4af37"
                  className="relative group text-gray-500 hover:text-amber-600 transition-colors"
                  title={t[labelKey]}
                >
                  <Icon />
                  <span className="absolute -bottom-7 sm:-bottom-8 left-1/2 transform -translate-x-1/2 text-[10px] sm:text-xs bg-gray-700 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                    {t[labelKey]}
                  </span>
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side Image - Hidden on mobile */}
        <div className="relative hidden lg:flex items-center justify-center">
          <div className="absolute w-[300px] md:w-[400px] h-[300px] md:h-[400px] rounded-full bg-gradient-to-r from-amber-200/40 to-yellow-200/30 blur-3xl animate-pulse" />
          <motion.img
            src={home}
            alt="Home"
            className="relative object-contain w-full max-w-md lg:max-w-lg z-10"
            initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, type: "spring", stiffness: 100 }}
            whileHover={{ scale: 1.02, rotate: 2 }}
          />
        </div>
      </div>

      <PhonePopup isOpen={showPhonePopup} onClose={() => setShowPhonePopup(false)} phoneNumber={selectedPhone} t={t} />
    </section>
  );
};

export default Home;