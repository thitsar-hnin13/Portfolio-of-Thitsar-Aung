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
  FaBriefcase, // Better for portfolio
  FaFolderOpen, // Alternative portfolio icon
  FaUserTie, // Professional alternative
} from "react-icons/fa6";
import {
  SiGooglecalendar,
  SiGooglemeet,
  SiViber,
  SiDevpost,
  SiDiscord,
  SiAboutdotme,
} from "react-icons/si";
import { MdWork, MdPortrait, MdBusinessCenter } from "react-icons/md";
import { RiFolderUserLine, RiUserSettingsLine } from "react-icons/ri";
import home from "../assets/home.png";

// Language translations (English & Korean only)
const translations = {
  en: {
    role1: "Professional Web Developer",
    role2: "Professional React Developer",
    role3: "Professional Frontend Developer",
    hello: "Hello I'm",
    name: "Thitsar Aung",
    description:
      "I am a passionate Web Developer focused on building modern and responsive websites. I specialize in React, Tailwind CSS, and creating clean, intuitive UI/UX designs to deliver smooth and engaging user experiences.",
    viewWork: "View my work",
    resume: "My Resume",
    phoneNumber: "Phone Number",
    copy: "Copy",
    copied: "Copied!",
    call: "Call",
    close: "Close",
    // Social labels
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
  },
  ko: {
    role1: "전문 웹 개발자",
    role2: "전문 React 개발자",
    role3: "전문 프론트엔드 개발자",
    hello: "안녕하세요, 저는",
    name: "띳싸아웅",
    description:
      "저는 현대적이고 반응형 웹사이트를 구축하는 데 열정을 가진 웹 개발자입니다. React, Tailwind CSS를 전문으로 하며 깔끔하고 직관적인 UI/UX 디자인을 만들어 부드럽고 매력적인 사용자 경험을 제공합니다.",
    viewWork: "내 작업 보기",
    resume: "이력서",
    phoneNumber: "전화번호",
    copy: "복사",
    copied: "복사됨",
    call: "전화",
    close: "닫기",
    // Social labels
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
    discord: "디스코드",
  },
};

// Updated socials with real links including Devpost and Discord
const socials = [
  // Professional & Work
  {
    Icon: FaGithub,
    labelKey: "github",
    href: "https://github.com/thitsar-hnin13",
    color: "#333",
    hoverColor: "#6e5494",
  },
  {
    Icon: FaLinkedin,
    labelKey: "linkedin",
    href: "https://www.linkedin.com/in/thitsar-aung-2425083b3/",
    color: "#0077b5",
    hoverColor: "#00a0dc",
  },
  {
    Icon: FaEnvelope,
    labelKey: "email",
    href: "https://mail.google.com/mail/u/1/#inbox",
    color: "#ea4335",
    hoverColor: "#fbbc04",
  },
  {
    Icon: FaPhone,
    labelKey: "phone",
    href: "#",
    isPhone: true,
    phoneNumber: "09 781360700",
    color: "#34a853",
    hoverColor: "#0f9d58",
  },

  // Social Media
  {
    Icon: FaFacebook,
    labelKey: "facebook",
    href: "https://www.facebook.com/profile.php?id=61578864863833",
    color: "#1877f2",
    hoverColor: "#4267b2",
  },
  {
    Icon: FaInstagram,
    labelKey: "instagram",
    href: "https://www.instagram.com/thitsaraung471/?hl=en",
    color: "#e4405f",
    hoverColor: "#c32aa3",
  },
  {
    Icon: FaXTwitter,
    labelKey: "twitter",
    href: "https://x.com/AungThitsa43678",
    color: "#1da1f2",
    hoverColor: "#1da1f2",
  },
  {
    Icon: FaTiktok,
    labelKey: "tiktok",
    href: "https://tiktok.com/@thitsar_314200",
    color: "#69c9d0",
    hoverColor: "#25f4ee",
  },
  {
    Icon: FaYoutube,
    labelKey: "youtube",
    href: "https://youtube.com/@ThitsarAung_3142",
    color: "#ff0000",
    hoverColor: "#ff4444",
  },

  // Communication Apps
  {
    Icon: FaTelegram,
    labelKey: "telegram",
    href: "https://t.me/ipcomtuninpertsalh1_3thankubN17",
    color: "#0088cc",
    hoverColor: "#00aced",
  },
  {
    Icon: SiViber,
    labelKey: "viber",
    href: "viber://chat?number=+959458763330",
    color: "#665cac",
    hoverColor: "#7b6db0",
  },
  {
    Icon: SiGooglemeet,
    labelKey: "meet",
    href: "https://meet.google.com/wfc-mwyp-ywk",
    color: "#00897b",
    hoverColor: "#00acc1",
  },
  {
    Icon: SiGooglecalendar,
    labelKey: "calendar",
    href: "https://calendar.google.com/calendar/u/0/embed?src=your-email@gmail.com&pli=1",
    color: "#4285f4",
    hoverColor: "#5a95f5",
  },

  // New Links: Devpost & Discord
  {
    Icon: SiDevpost,
    labelKey: "devpost",
    href: "https://devpost.com/thitsar-hnin13?ref_content=user-portfolio&ref_feature=portfolio&ref_medium=global-nav",
    color: "#003E54",
    hoverColor: "#0A6B8C",
  },
  {
    Icon: SiDiscord,
    labelKey: "discord",
    href: "https://discord.com/channels/1483857742539132943/1483857743671726142",
    color: "#5865F2",
    hoverColor: "#7289da",
  },

  // Portfolio - Using FaBriefcase instead of FaGoogle for better representation
  {
    Icon: FaBriefcase, // Changed from FaGoogle to FaBriefcase
    labelKey: "portfolio",
    href: "https://thitsarprotfolio.vercel.app/",
    color: "#8B5CF6", // Purple color for portfolio
    hoverColor: "#A78BFA",
  },

  // You can also try these alternatives - just uncomment one and comment out the above:

  // Alternative 1: Folder Open Icon
  // {
  //   Icon: FaFolderOpen,
  //   labelKey: "portfolio",
  //   href: "https://thitsarprotfolio.vercel.app/",
  //   color: "#F59E0B", // Amber color
  //   hoverColor: "#FBBF24"
  // },

  // Alternative 2: User Tie Icon (Professional)
  // {
  //   Icon: FaUserTie,
  //   labelKey: "portfolio",
  //   href: "https://thitsarprotfolio.vercel.app/",
  //   color: "#10B981", // Emerald color
  //   hoverColor: "#34D399"
  // },

  // Alternative 3: Work Icon from react-icons/md
  // {
  //   Icon: MdWork,
  //   labelKey: "portfolio",
  //   href: "https://thitsarprotfolio.vercel.app/",
  //   color: "#3B82F6", // Blue color
  //   hoverColor: "#60A5FA"
  // },

  // Alternative 4: Business Center Icon
  // {
  //   Icon: MdBusinessCenter,
  //   labelKey: "portfolio",
  //   href: "https://thitsarprotfolio.vercel.app/",
  //   color: "#8B5CF6", // Purple
  //   hoverColor: "#A78BFA"
  // },

  // Alternative 5: About.me Icon (Very Professional)
  // {
  //   Icon: SiAboutdotme,
  //   labelKey: "portfolio",
  //   href: "https://thitsarprotfolio.vercel.app/",
  //   color: "#333333", // Dark gray
  //   hoverColor: "#4B5563"
  // },

  // Alternative 6: Folder User Icon
  // {
  //   Icon: RiFolderUserLine,
  //   labelKey: "portfolio",
  //   href: "https://thitsarprotfolio.vercel.app/",
  //   color: "#EC4899", // Pink
  //   hoverColor: "#F472B6"
  // },

  // Alternative 7: User Settings Icon
  // {
  //   Icon: RiUserSettingsLine,
  //   labelKey: "portfolio",
  //   href: "https://thitsarprotfolio.vercel.app/",
  //   color: "#14B8A6", // Teal
  //   hoverColor: "#2DD4BF"
  // },
];

// Enhanced glow variants with color support
const glowVariants = {
  inertia: { scale: 1, y: 0, filter: "drop-shadow(0 0 0 rgba(0,0,0,0))" },
  hover: (color) => ({
    scale: 1.3,
    y: -5,
    filter: `drop-shadow(0 0 12px ${color}) drop-shadow(0 0 25px ${color})`,
    transition: { type: "spring", stiffness: 400, damping: 12 },
  }),
  tap: {
    scale: 0.9,
    y: 0,
    transition: { duration: 0.1 },
  },
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
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 50 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-md"
          >
            <div className="bg-gradient-to-br from-gray-900 via-purple-900/30 to-gray-900 rounded-2xl shadow-2xl border border-purple-500/30 overflow-hidden">
              {/* Animated Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 animate-pulse"></div>

              {/* Header */}
              <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-6">
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
                  <h3 className="text-white text-xl font-bold">
                    {t.phoneNumber}
                  </h3>
                </div>
              </div>

              {/* Content */}
              <div className="relative p-6">
                <div className="flex items-center justify-between bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 mb-4 border border-gray-700">
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-white text-2xl font-mono tracking-wider"
                  >
                    {phoneNumber}
                  </motion.span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
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

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href={`tel:${phoneNumber.replace(/\s/g, "")}`}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all"
                  >
                    <FaPhone />
                    <span>{t.call}</span>
                  </motion.a>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                    className="px-4 py-3 bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-lg hover:shadow-lg transition-all"
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
  const [brightness, setBrightness] = useState(() => {
    const saved = localStorage.getItem("brightness");
    return saved ? parseFloat(saved) : 1;
  });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "system";
  });

  // resolve system theme
  const effectiveTheme =
    theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme;

  useEffect(() => {
    localStorage.setItem("theme", theme);
    localStorage.setItem("brightness", brightness);

    // ✅ smooth transition
    document.documentElement.style.transition = "filter 0.4s ease";

    // ✅ safe brightness
    const safeBrightness = Math.min(Math.max(brightness, 0.6), 1.4);

    // ✅ apply ONLY ONCE
    document.documentElement.style.filter = `brightness(${safeBrightness})`;

    // theme
    if (effectiveTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme, brightness, effectiveTheme]);

  useEffect(() => {
    const current = roles[index];
    const timeout = setTimeout(
      () => {
        if (!deleting && subIndex < current.length) setSubIndex((v) => v + 1);
        else if (!deleting && subIndex === current.length)
          setTimeout(() => setDeleting(true), 1200);
        else if (deleting && subIndex > 0) setSubIndex((v) => v - 1);
        else if (deleting && subIndex === 0) {
          setDeleting(false);
          setIndex((p) => (p + 1) % roles.length);
        }
      },
      deleting ? 40 : 150,
    );

    return () => clearTimeout(timeout);
  }, [subIndex, index, deleting, roles]);

  // Reset typing animation when language changes
  useEffect(() => {
    setIndex(0);
    setSubIndex(0);
    setDeleting(false);
  }, [language]);

  const handlePhoneClick = (phoneNumber) => {
    setSelectedPhone(phoneNumber);
    setShowPhonePopup(true);
  };

  // Split socials into two rows for better display
  const firstRowSocials = socials.slice(0, 8);
  const secondRowSocials = socials.slice(8);

  return (
    <section
      id="home"
      className="w-full h-screen relative bg-black overflow-hidden"
    >
      <ParticlesBackground />

      {/* Language Selector - English & Korean only */}
      <div className="absolute top-5 right-5 z-50 flex gap-2">
        {/* ✅ Vertical Brightness Slider */}
        <input
          type="range"
          min="0.6"
          max="1.4"
          step="0.01"
          value={brightness}
          onChange={(e) => setBrightness(parseFloat(e.target.value))}
          className="w-32 h-1.5 bg-gradient-to-r from-orange-300 to-orange-600 rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #fb923c ${((brightness - 0.6) / 0.8) * 100}%, #4b5563 ${((brightness - 0.6) / 0.8) * 100}%)`,
            transform: "rotate(-60deg)",
            WebkitAppearance: "none",
          }}
        />

        {/* Add this CSS to your global CSS or in a style tag for better styling */}
        <style>{`
  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: linear-gradient(135deg, #fb923c, #ea580c);
    cursor: pointer;
    box-shadow: 0 0 6px rgba(251, 146, 60, 0.6);
    transition: all 0.2s ease;
  }
  
  input[type="range"]::-webkit-slider-thumb:hover {
    transform: scale(1.2);
    box-shadow: 0 0 12px rgba(251, 146, 60, 0.8);
  }
  
  input[type="range"]::-moz-range-thumb {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: linear-gradient(135deg, #fb923c, #ea580c);
    cursor: pointer;
    border: none;
    box-shadow: 0 0 6px rgba(251, 146, 60, 0.6);
  }
  
  input[type="range"]::-moz-range-thumb:hover {
    transform: scale(1.2);
    box-shadow: 0 0 12px rgba(251, 146, 60, 0.8);
  }
  
  input[type="range"]:focus {
    outline: none;
  }
`}</style>
        {[
          { code: "en", label: "English", flag: "🇬🇧" },
          { code: "ko", label: "한국어", flag: "🇰🇷" },
        ].map((lang) => (
          <motion.button
            key={lang.code}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setLanguage(lang.code)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
              language === lang.code
                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                : "bg-gray-800/80 text-gray-300 hover:bg-red-700 backdrop-blur-sm"
            }`}
          >
            <span>{lang.flag}</span>
            <span>{lang.label}</span>
          </motion.button>
        ))}
        <div className="absolute top-5 right-5 z-50 flex flex-col items-end gap-2"></div>
      </div>

      <div className="absolute inset-0">
        <div
          className="absolute -top-32 -left-32 w-[50vw] sm:w-[z-300w] md:w-[20vw] h-[50vw] sm:h-[50vw] md:h-[30vw] max-w-[400px] max-h-[400px] rounded-full bg-gradient-to-r from-[#aca9eb] via-[#70080d] to-[#9e0022] opacity-30 
        sm:opacity-20 md:opacity-10 blur-[100px] sm:blur-[130px] md:blur-[150px] animate-pulse"
        ></div>
        <div
          className="absolute bottom-0 right-0 w-[50vw] sm:w-[z-300w] md:w-[20vw] h-[50vw] sm:h-[50vw] md:h-[30vw] max-w-[400px] max-h-[400px] rounded-full bg-gradient-to-r from-[#302d63] via-[#bf006f] to-[#75000a] opacity-30 
        sm:opacity-20 md:opacity-10 blur-[100px] sm:blur-[130px] md:blur-[150px] animate-pulse delay-500"
        ></div>
      </div>

      <div className="relative z-10 h-full w-full max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col justify-center h-full text-center lg:text-left relative ">
          <div className="w-full lg:pr-24 lg:p-20 mx-auto max-w-[40rem]">
            <motion.div
              className="mb-3 text-xl sm:text-xl md:text-2xl lg:text-2xl font-semibold text-blue-300 tracking-wide min-h-[1.6em]"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span> {roles[index].substring(0, subIndex)}</span>
              <span
                className="inline-block w-[2px] ml-1 bg-blue-300 animate-pulse align-middle "
                style={{ height: "1em" }}
              >
                {" "}
              </span>
            </motion.div>
            <motion.h1
              className="text-3xl sm:text5xl md:text-6xl lg:text:7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff1870] via-[#00b2bf] to-[#302b63] drop-shadow-lg "
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              {t.hello}
              <br />
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl lg:whitespace-nowrap"
                animate={{
                  backgroundPosition: ["0%", "100%", "0%"],
                }}
                transition={{ duration: 5, repeat: Infinity }}
                style={{ backgroundSize: "200%" }}
              >
                {t.name}
              </motion.span>
            </motion.h1>
            <motion.p
              className="mt-6 text-base sm:text-lg md:text-xl text-blue-300 max-w-2xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              {t.description}
            </motion.p>
            <motion.div
              className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <motion.a
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 30px rgba(168, 85, 247, 0.6)",
                }}
                whileTap={{ scale: 0.95 }}
                href="#projects"
                className="px-6 py-3 rounded-full font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg hover:shadow-xl transition-all"
              >
                {t.viewWork}
              </motion.a>
              <motion.a
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 30px rgba(236, 72, 153, 0.6)",
                }}
                whileTap={{ scale: 0.95 }}
                href="/cv.pdf"
                download
                className="px-6 py-3 rounded-full text-lg font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg hover:shadow-xl transition-all"
              >
                {t.resume}
              </motion.a>
            </motion.div>

            {/* First row of social icons */}
            <div className="mt-8 flex flex-wrap gap-5 text-2xl md:text-3xl justify-center lg:justify-start">
              {firstRowSocials.map(
                ({
                  Icon,
                  labelKey,
                  href,
                  isPhone,
                  phoneNumber,
                  color,
                  hoverColor,
                }) => (
                  <motion.a
                    key={labelKey}
                    href={isPhone ? "#" : href}
                    target={isPhone ? "_self" : "_blank"}
                    rel="noopener noreferrer"
                    aria-label={t[labelKey]}
                    custom={hoverColor}
                    variants={glowVariants}
                    initial="inertia"
                    whileHover="hover"
                    whileTap="tap"
                    onClick={(e) => {
                      if (isPhone) {
                        e.preventDefault();
                        handlePhoneClick(phoneNumber);
                      }
                    }}
                    className="transition-colors relative group"
                    title={t[labelKey]}
                    style={{ color: color }}
                  >
                    <Icon />
                    <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs bg-gray-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
                      {t[labelKey]}
                    </span>
                  </motion.a>
                ),
              )}
            </div>

            {/* Second row of social icons - includes new Devpost, Discord, and Portfolio with briefcase icon */}
            <div className="mt-4 flex flex-wrap gap-5 text-2xl md:text-3xl justify-center lg:justify-start">
              {secondRowSocials.map(
                ({ Icon, labelKey, href, color, hoverColor }) => (
                  <motion.a
                    key={labelKey}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t[labelKey]}
                    custom={hoverColor}
                    variants={glowVariants}
                    initial="inertia"
                    whileHover="hover"
                    whileTap="tap"
                    className="transition-colors relative group"
                    title={t[labelKey]}
                    style={{ color: color }}
                  >
                    <Icon />
                    <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs bg-gray-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
                      {t[labelKey]}
                    </span>
                  </motion.a>
                ),
              )}
            </div>
          </div>
        </div>

        <div className="relative hidden lg:block">
          <div
            className="absolute top-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              right: "10px",
              width: "min(22vw,410px)",
              height: "min(40vw , 768px)",
              borderRadius: "50%",
              filter: "blur(30px)",
              opacity: 0.32,
              background:
                "conic-gradient(from 0deg , #1cd8d2 , #00bf8f, #302b63, #1cd8d2)",
            }}
          />
          <motion.img
            src={home}
            alt="Home"
            className="absolute top-1/2 -translate-y-1/2 object-contain select-none pointer-events-none"
            style={{
              right: "-250px",
              width: "min(45vw,768px)",
              maxHeight: "90vh",
            }}
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1 }}
          />
        </div>
      </div>

      {/* Phone Popup */}
      <PhonePopup
        isOpen={showPhonePopup}
        onClose={() => setShowPhonePopup(false)}
        phoneNumber={selectedPhone}
        t={t}
      />
    </section>
  );
};
export default Home;