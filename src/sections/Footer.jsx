// components/Footer.jsx
import React, { useState } from 'react';
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
  FaGoogle,
  FaCopy,
  FaCheck
} from "react-icons/fa6";
import { 
  SiViber, 
  SiGooglemeet, 
  SiGooglecalendar 
} from "react-icons/si";
import { motion, AnimatePresence } from 'framer-motion';

// Phone Popup Component (reuse from Home)
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
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 animate-pulse"></div>
              
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
                  <h3 className="text-white text-xl font-bold">{t.phoneNumber}</h3>
                </div>
              </div>
              
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
                
                <div className="grid grid-cols-2 gap-3">
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href={`tel:${phoneNumber.replace(/\s/g, '')}`}
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

const Footer = ({ language = 'en' }) => {
  const [showPhonePopup, setShowPhonePopup] = useState(false);
  const [selectedPhone, setSelectedPhone] = useState("");

  // Footer translations
  const translations = {
    en: {
      phoneNumber: "Phone Number",
      copy: "Copy",
      copied: "Copied!",
      call: "Call",
      close: "Close",
      quote: "Success is when preparation meets opportunity",
      rights: "All rights reserved",
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
      portfolio: "Portfolio"
    },
    my: {
      phoneNumber: "ဖုန်းနံပါတ်",
      copy: "ကူးယူရန်",
      copied: "ကူးယူပြီး",
      call: "ခေါ်ဆိုရန်",
      close: "ပိတ်ရန်",
      quote: "အောင်မြင်ခြင်းဆိုတာ ပြင်ဆင်မှုနဲ့ အခွင့်အလမ်းတွေ့ဆုံတဲ့နေရာပါ",
      rights: "မူပိုင်ခွင့်များ",
      github: "ဂစ်ဟပ်",
      linkedin: "လင့်ဒ်အင်း",
      email: "အီးမေးလ်",
      phone: "ဖုန်း",
      facebook: "ဖေ့စ်ဘွတ်ခ်",
      instagram: "အင်စတာဂရမ်",
      twitter: "X (တွစ်တာ)",
      tiktok: "တစ်တော့ခ်",
      youtube: "ယူကျု့",
      telegram: "တယ်လီဂရမ်",
      viber: "ဗိုင်ဘာ",
      meet: "ဂူဂယ်မီး",
      calendar: "ဂူဂယ်ကယ်လန်ဒါ",
      portfolio: "ပို့တ်ဖိုလီယို"
    },
    ko: {
      phoneNumber: "전화번호",
      copy: "복사",
      copied: "복사됨",
      call: "전화",
      close: "닫기",
      quote: "성공은 준비와 기회가 만나는 곳입니다",
      rights: "모든 권리 보유",
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
      portfolio: "포트폴리오"
    }
  };

  const t = translations[language];

  const socials = [
    {
      Icon: FaGithub,
      label: "github",
      href: "https://github.com/thitsar-hnin13",
      color: "#333",
      hoverColor: "#6e5494"
    },
    {
      Icon: FaLinkedin,
      label: "linkedin",
      href: "https://www.linkedin.com/in/thitsar-aung-2425083b3/",
      color: "#0077b5",
      hoverColor: "#00a0dc"
    },
    {
      Icon: FaEnvelope,
      label: "email",
      href: "mailto:thitsar.aung@example.com",
      color: "#ea4335",
      hoverColor: "#fbbc04"
    },
    { 
      Icon: FaPhone, 
      label: "phone", 
      href: "#",
      isPhone: true,
      phoneNumber: "09 781360700",
      color: "#34a853",
      hoverColor: "#0f9d58"
    },
    {
      Icon: FaFacebook,
      label: "facebook",
      href: "https://www.facebook.com/profile.php?id=61578864863833",
      color: "#1877f2",
      hoverColor: "#4267b2"
    },
    {
      Icon: FaInstagram,
      label: "instagram",
      href: "https://www.instagram.com/thitsaraung471/?hl=en",
      color: "#e4405f",
      hoverColor: "#c32aa3"
    },
    {
      Icon: FaXTwitter,
      label: "twitter",
      href: "https://x.com/AungThitsa43678",
      color: "#1da1f2",
      hoverColor: "#1da1f2"
    },
    {
      Icon: FaTiktok,
      label: "tiktok",
      href: "https://tiktok.com/@thitsar_314200",
      color: "#69c9d0",
      hoverColor: "#25f4ee"
    },
    {
      Icon: FaYoutube,
      label: "youtube",
      href: "https://youtube.com/@ThitsarAung_3142",
      color: "#ff0000",
      hoverColor: "#ff4444"
    },
    {
      Icon: FaTelegram,
      label: "telegram",
      href: "https://t.me/ipcomtuninpertsalh1_3thankubN17",
      color: "#0088cc",
      hoverColor: "#00aced"
    },
    { 
      Icon: SiViber, 
      label: "viber", 
      href: "viber://chat?number=+959458763330",
      color: "#665cac",
      hoverColor: "#7b6db0"
    },
    {
      Icon: SiGooglemeet,
      label: "meet",
      href: "https://meet.google.com/wfc-mwyp-ywk",
      color: "#00897b",
      hoverColor: "#00acc1"
    },
    {
      Icon: SiGooglecalendar,
      label: "calendar",
      href: "https://calendar.google.com/calendar/u/0/embed?src=thitsar.aung%40gmail.com&pli=1",
      color: "#4285f4",
      hoverColor: "#5a95f5"
    },
    {
      Icon: FaGoogle,
      label: "portfolio",
      href: "https://thitsarprotfolio.vercel.app/",
      color: "#4285f4",
      hoverColor: "#34a853"
    },
  ];

  const glowVariants = {
    initial: { scale: 1, y: 0, filter: "drop-shadow(0 0 0 rgba(0,0,0,0))" },
    hover: (color) => ({
      scale: 1.2,
      y: -3,
      filter: `drop-shadow(0 0 8px ${color}) drop-shadow(0 0 18px ${color})`,
      transition: { type: "spring", stiffness: 300, damping: 15 }
    }),
    tap: {
      scale: 0.95,
      y: 0,
      transition: { duration: 0.08 }
    }
  };

  const handlePhoneClick = (e, phoneNumber) => {
    e.preventDefault();
    setSelectedPhone(phoneNumber);
    setShowPhonePopup(true);
  };

  return (
    <>
      <footer className='relative overflow-hidden bg-black py-16 md:py-20'>
        {/* Background gradients */}
        <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(55%_60%_at_70%_35%,rgba(13,88,202,0.35),transparent_70%)]'/>
        <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(50%_55%_at_30%_70%,rgba(16,185,129,0.30),transparent_70%)]'/>

        <motion.div 
          className="relative z-10 px-4 sm:px-8 lg:px-10 flex flex-col items-center text-center space-y-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h1 
            className="font-semibold leading-none text-red-400 text-center select-none"
            style={{ 
              fontSize: "clamp(3rem, 8vw, 8rem)", 
              letterSpacing: "0.02em", 
              lineHeight: 0.9, 
              padding: "0 3vw", 
              textShadow: "0 2px 18px rgba(0,0,0,0.45)",
              whiteSpace: "normal",
              wordBreak: "break-word"
            }}
          >
            Thitsar Aung
          </h1>
          
          <div className='h-[3px] w-24 md:w-32 rounded-full bg-gradient-to-r from-[#0d58cc] via-red-500 to-red-400' />
          
          <div className='flex flex-wrap gap-5 text-2xl md:text-3xl items-center justify-center max-w-4xl'>
            {socials.map(({ Icon, label, href, isPhone, phoneNumber, color, hoverColor }) => (
              <motion.a 
                href={isPhone ? "#" : href}
                key={label}
                aria-label={t[label]}
                target={isPhone ? "_self" : "_blank"}
                rel="noopener noreferrer"
                custom={hoverColor || color}
                variants={glowVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                className='text-gray-400 hover:text-white transition-colors duration-200 inline-flex items-center justify-center relative group'
                style={{ color: color }}
                onClick={(e) => isPhone && handlePhoneClick(e, phoneNumber)}
              >
                <Icon />
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs bg-gray-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg z-20">
                  {t[label]}
                </span>
              </motion.a>
            ))}
          </div>

          <p className='text-blue-300 italic max-w-xl mt-6'>
            "{t.quote}"
          </p>
          
          <p className="text-xs text-blue-400/80 mt-4">
            &copy; {new Date().getFullYear()} Thitsar Aung. {t.rights}.
          </p>
        </motion.div>
      </footer>

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