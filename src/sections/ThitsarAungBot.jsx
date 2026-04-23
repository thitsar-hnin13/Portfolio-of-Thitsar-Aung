import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ThitsarAungChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [language, setLanguage] = useState('en'); // 'en', 'ko'
  const messagesEndRef = useRef(null);
  const audioRef = useRef(null);
  
  // Draggable FAB state
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hasMoved, setHasMoved] = useState(false);
  const fabRef = useRef(null);

  // Generate animated black dots positions
  const [dotPositions, setDotPositions] = useState([]);
  useEffect(() => {
    const positions = Array.from({ length: 50 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 4 + 1.5,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.4 + 0.15,
      xMove: (Math.random() - 0.5) * 60,
      yMove: (Math.random() - 0.5) * 50,
    }));
    setDotPositions(positions);
  }, []);

  // Initialize FAB position on mount (bottom right corner)
  useEffect(() => {
    const updatePosition = () => {
      setPosition({
        x: window.innerWidth - 85,
        y: window.innerHeight - 85,
      });
    };
    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, []);

  // Handle drag start
  const handleDragStart = (e) => {
    e.preventDefault();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    setDragStart({ x: clientX - position.x, y: clientY - position.y });
    setIsDragging(true);
    setHasMoved(false);
  };

  // Handle drag move
  const handleDragMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    let newX = clientX - dragStart.x;
    let newY = clientY - dragStart.y;
    
    // Bound to window edges with padding
    const fabWidth = 70;
    const fabHeight = 70;
    newX = Math.max(10, Math.min(window.innerWidth - fabWidth - 10, newX));
    newY = Math.max(10, Math.min(window.innerHeight - fabHeight - 10, newY));
    
    setPosition({ x: newX, y: newY });
    setHasMoved(true);
  };

  // Handle drag end
  const handleDragEnd = () => {
    setIsDragging(false);
    setTimeout(() => setHasMoved(false), 150);
  };

  // Handle click/tap (only if not dragged)
  const handleClick = (e) => {
    if (!hasMoved) {
      e.stopPropagation();
      setIsOpen(!isOpen);
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
      }
    }
  };

  // Language translations (EN and KO only)
  const translations = {
    en: {
      botName: "Thitsar Aung Bot",
      welcome: "Hello",
      welcomeText: "Select a question below to learn about Thitsar Aung.",
      who: "👤 Who",
      companies: "💼 Companies",
      communities: "👥 Communities",
      teaching: "📚 Teaching",
      mission: "🎯 Mission",
      location: "📍 Location",
      skills: "🛠️ Skills",
      reset: "↻ Reset",
      languageLabel: "Language"
    },
    ko: {
      botName: "띳싸아웅 봇",
      welcome: "안녕하세요",
      welcomeText: "아래 질문을 선택하여 띳싸아웅에 대해 알아보세요.",
      who: "👤 누구",
      companies: "💼 회사",
      communities: "👥 커뮤니티",
      teaching: "📚 가르침",
      mission: "🎯 목표",
      location: "📍 위치",
      skills: "🛠️ 기술",
      reset: "↻ 재설정",
      languageLabel: "언어"
    }
  };

  // Knowledge base
  const aboutThitsar = {
    name: {
      en: "Thitsar Aung",
      ko: "띳싸아웅"
    },
    location: {
      en: "Yangon, Myanmar",
      ko: "양곤, 미얀마"
    },
    roles: {
      en: ["Founder", "Product Builder", "Web Developer"],
      ko: ["창립자", "제품 개발자", "웹 개발자"]
    },
    mission: {
      en: "Building real-world digital solutions and modern web applications",
      ko: "실용적인 디지털 솔루션과 현대적인 웹 애플리케이션 구축"
    },
    companies: [
      {
        name: "Unique Solution Tech",
        description: {
          en: "Tech company building modern websites, digital platforms, and web-based systems",
          ko: "현대적인 웹사이트, 디지털 플랫폼 및 웹 기반 시스템을 구축하는 기술 회사"
        }
      },
      {
        name: "Shwe 13 Solution",
        description: {
          en: "Local brand company focusing on fashion and lifestyle products",
          ko: "패션 및 라이프스타일 제품에 중점을 둔 현지 브랜드 회사"
        }
      }
    ],
    communities: [
      {
        name: "FEARLESS – Fixed Bike Group",
        description: {
          en: "fixed-gear cycling community",
          ko: "픽스드기어 사이클링 커뮤니티"
        }
      },
      {
        name: "T14K",
        description: {
          en: "promoting fixed-gear cycling culture",
          ko: "픽스드기어 사이클링 문화 발전"
        }
      },
      {
        name: "T15H Community Support Group",
        description: {
          en: "community support group",
          ko: "지역사회 지원 그룹"
        }
      }
    ],
    passions: {
      en: ["Web Engineering", "Programming", "Mentorship", "Language Teaching"],
      ko: ["웹 엔지니어링", "프로그래밍", "멘토링", "언어 교육"]
    },
    additionalSkills: {
      en: [
        "📡 Network Design - Basic networking concepts and design",
        "💻 A+ Computer Hardware - Hardware maintenance and troubleshooting",
        "🎨 Graphic Design & Video Editing - Visual content creation",
        "🔐 Cybersecurity - Basic security practices and awareness",
        "💰 Accounting (ACCA, LCCI) - Financial management and bookkeeping",
        "🗣️ Japanese, Korean, English languages"
      ],
      ko: [
        "📡 네트워크 디자인 - 기본 네트워킹 개념 및 설계",
        "💻 A+ 컴퓨터 하드웨어 - 하드웨어 유지보수 및 문제 해결",
        "🎨 그래픽 디자인 및 비디오 편집 - 시각적 콘텐츠 제작",
        "🔐 사이버 보안 - 기본 보안 관행 및 인식",
        "💰 회계(ACCA, LCCI) - 재무 관리 및 부기",
        "🗣️ 일본어, 한국어, 영어"
      ]
    },
    philosophy: {
      en: "Building impactful digital products, growing innovative businesses, and creating communities that inspire people to learn, collaborate, and move forward together",
      ko: "영향력 있는 디지털 제품 구축, 혁신적인 비즈니스 성장, 사람들이 배우고 협력하며 함께 나아갈 수 있도록 영감을 주는 커뮤니티 만들기"
    }
  };

  const getAnswers = (lang) => ({
    about: `${translations[lang].welcome}!\n\nI am ${aboutThitsar.name[lang]}.\n\n${aboutThitsar.roles[lang].join(', ')} living in ${aboutThitsar.location[lang]}.`,
    
    companies: `${translations[lang].companies.replace(/[💼👤👥📚🎯📍🛠️]/g, '').trim()}\n\n▪️ ${aboutThitsar.companies[0].name}\n  ${aboutThitsar.companies[0].description[lang]}\n\n▪️ ${aboutThitsar.companies[1].name}\n  ${aboutThitsar.companies[1].description[lang]}`,
    
    communities: `${translations[lang].communities.replace(/[💼👤👥📚🎯📍🛠️]/g, '').trim()}\n\n▪️ ${aboutThitsar.communities[0].name}\n  ${aboutThitsar.communities[0].description[lang]}\n\n▪️ ${aboutThitsar.communities[1].name}\n  ${aboutThitsar.communities[1].description[lang]}\n\n▪️ ${aboutThitsar.communities[2].name}\n  ${aboutThitsar.communities[2].description[lang]}`,
    
    teach: `${translations[lang].teaching.replace(/[💼👤👥📚🎯📍🛠️]/g, '').trim()}\n\n▪️ ${aboutThitsar.passions[lang].join('\n▪️ ')}`,
    
    mission: `${translations[lang].mission.replace(/[💼👤👥📚🎯📍🛠️]/g, '').trim()}\n\n${aboutThitsar.mission[lang]}\n\n${aboutThitsar.philosophy[lang]}`,
    
    location: `${translations[lang].location.replace(/[💼👤👥📚🎯📍🛠️]/g, '').trim()}\n\n${aboutThitsar.location[lang]}`,
    
    skills: `${translations[lang].skills.replace(/[💼👤👥📚🎯📍🛠️]/g, '').trim()}\n\n${aboutThitsar.additionalSkills[lang].join('\n')}`
  });

  const getQuickQuestions = (lang) => [
    { id: 1, text: translations[lang].who, category: "about" },
    { id: 2, text: translations[lang].companies, category: "companies" },
    { id: 3, text: translations[lang].communities, category: "communities" },
    { id: 4, text: translations[lang].teaching, category: "teach" },
    { id: 5, text: translations[lang].mission, category: "mission" },
    { id: 6, text: translations[lang].location, category: "location" },
    { id: 7, text: translations[lang].skills, category: "skills" }
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleQuestionClick = (question) => {
    setSelectedQuestion(question.id);
    const answers = getAnswers(language);
    const botMessage = {
      id: Date.now(),
      text: answers[question.category],
      sender: 'bot',
      question: question.text
    };
    setMessages(prev => [...prev, botMessage]);
  };

  const handleReset = () => {
    setMessages([]);
    setSelectedQuestion(null);
  };

  const handleClose = () => {
    setIsOpen(false);
    setMessages([]);
    setSelectedQuestion(null);
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
    setMessages([]);
    setSelectedQuestion(null);
  };

  // Pulsing ring animation for FAB
  const ringVariants = {
    animate: {
      scale: [1, 1.3, 1],
      opacity: [0.6, 0, 0.6],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/voice.mp3"
        preload="auto"
      />
      
      {/* Animated Black Dots Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {dotPositions.map((dot, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-black/20"
            style={{
              width: dot.size,
              height: dot.size,
              left: `${dot.left}%`,
              top: `${dot.top}%`,
            }}
            animate={{
              x: [0, dot.xMove, -dot.xMove * 0.5, 0],
              y: [0, dot.yMove, -dot.yMove * 0.3, 0],
              opacity: [dot.opacity, dot.opacity + 0.2, dot.opacity - 0.1, dot.opacity],
              scale: [1, 1.2, 0.8, 1],
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

      {/* Draggable FAB Button with Pulsing Ring */}
      <motion.div
        ref={fabRef}
        className="fixed z-[1000]"
        style={{ 
          left: position.x, 
          top: position.y,
          width: '64px',
          height: '64px',
          touchAction: 'none',
          cursor: isDragging ? 'grabbing' : 'grab'
        }}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
        onClick={handleClick}
        drag={false}
      >
        {/* Pulsing ring effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400 to-yellow-400"
          variants={ringVariants}
          animate="animate"
          style={{ opacity: 0.5 }}
        />
        
        {/* Main button */}
        <motion.div
          className="relative w-full h-full rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 shadow-xl flex items-center justify-center overflow-hidden"
          animate={{ 
            scale: [1, 1.05, 1],
            boxShadow: ["0 0 0 0 rgba(218,165,32,0.4)", "0 0 0 12px rgba(218,165,32,0)", "0 0 0 0 rgba(218,165,32,0.4)"]
          }}
          transition={{ 
            scale: { duration: 2, repeat: Infinity },
            boxShadow: { duration: 2, repeat: Infinity }
          }}
          whileHover={{ 
            scale: 1.1, 
            boxShadow: "0 10px 30px rgba(218,165,32,0.6)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          <img 
            src="/src/assets/p.jpg" 
            alt="Chat Bot" 
            className="w-12 h-12 object-cover rounded-full"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.innerHTML = '<span class="text-3xl"></span>';
            }}
          />
        </motion.div>
      </motion.div>

      {/* Chat Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="fixed bottom-24 right-5 md:bottom-32 md:right-8 w-[calc(100vw-40px)] max-w-[400px] md:w-[420px] h-[70vh] max-h-[600px] md:h-[620px] bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-[1000] border-2 border-amber-400"
            initial={{ opacity: 0, scale: 0.7, y: 50, rotateX: -15 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 50, rotateX: -15 }}
            transition={{ duration: 0.3, type: "spring", damping: 20 }}
          >
            {/* Header with gradient animation */}
            <motion.div 
              className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white p-3 md:p-4 flex justify-between items-center"
              initial={{ backgroundPosition: "0% 50%" }}
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{ backgroundSize: "200% 200%" }}
            >
              <div className="flex items-center gap-2">
                <motion.img 
                  src="/src/assets/uu.jpg" 
                  alt="Bot" 
                  className="w-8 h-8 rounded-full border-2 border-white/50"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <h3 className="text-sm md:text-base font-semibold">
                  {translations[language].botName}
                </h3>
              </div>
              <motion.button 
                className="bg-white/20 backdrop-blur-sm text-white text-base md:text-lg w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 transition-all"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleClose}
              >
                ✕
              </motion.button>
            </motion.div>

            {/* Language Selector - EN and KO only */}
            <div className="flex gap-2 p-2 md:p-3 bg-amber-100/70 border-b border-amber-200 flex-wrap">
              {[
                { code: "en", label: "English", flag: "🇬🇧" },
                { code: "ko", label: "한국어", flag: "🇰🇷" }
              ].map((lang) => (
                <motion.button
                  key={lang.code}
                  whileHover={{ scale: 1.05, backgroundColor: "#d4af37", color: "white", skewX: -3 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => changeLanguage(lang.code)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex-1 max-w-[100px] ${
                    language === lang.code
                      ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-md"
                      : "bg-white/80 text-gray-700 hover:bg-amber-400 hover:text-white border border-amber-300"
                  }`}
                >
                  <span>{lang.flag}</span> <span className="hidden sm:inline ml-1">{lang.label}</span>
                </motion.button>
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 p-3 md:p-5 overflow-y-auto bg-amber-50/30 custom-scroll">
              {/* Welcome Message with animation */}
              <motion.div 
                className="bg-white/90 rounded-2xl p-3 md:p-4 mb-4 border border-amber-200 shadow-sm"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <p className="m-0 text-xs md:text-sm text-gray-700">
                  <motion.strong 
                    className="text-amber-600 inline-block"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {translations[language].welcome}! 👋
                  </motion.strong><br />
                  {translations[language].welcomeText}
                </p>
              </motion.div>

              {/* Question Grid */}
              <div className="grid grid-cols-2 gap-2 md:gap-3 mb-4">
                {getQuickQuestions(language).map((q, idx) => (
                  <motion.button
                    key={q.id}
                    className={`p-2 md:p-3 rounded-xl text-xs md:text-sm font-semibold cursor-pointer transition-all text-center min-h-[55px] md:min-h-[65px] flex items-center justify-center break-words ${
                      selectedQuestion === q.id
                        ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-md"
                        : "bg-white/80 text-gray-700 border-2 border-amber-300 hover:border-amber-500 hover:bg-amber-100 hover:shadow-md"
                    }`}
                    whileHover={{ scale: 1.03, skewX: -2, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => handleQuestionClick(q)}
                  >
                    {q.text}
                  </motion.button>
                ))}
              </div>

              {/* Messages Area */}
              {messages.length > 0 && (
                <div className="flex flex-col gap-2 md:gap-3">
                  {messages.map((msg, idx) => (
                    <motion.div 
                      key={msg.id}
                      className="bg-white/95 rounded-2xl rounded-tl-md p-3 md:p-4 border border-amber-200 max-w-full shadow-sm"
                      initial={{ opacity: 0, x: -30, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      transition={{ delay: idx * 0.1, type: "spring", stiffness: 300 }}
                      whileHover={{ scale: 1.01, boxShadow: "0 5px 15px rgba(0,0,0,0.1)" }}
                    >
                      <div className="text-[10px] md:text-xs text-amber-500 font-bold mb-1 uppercase tracking-wide flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                        {msg.question}
                      </div>
                      <p className="m-0 text-xs md:text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                        {msg.text}
                      </p>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Reset Button - Dark Gray with Skew Effect */}
              {messages.length > 0 && (
                <motion.button 
                  className="w-full mt-4 p-2.5 md:p-3 rounded-full font-semibold text-white bg-gray-700 shadow-md transition-all duration-300 text-sm"
                  whileHover={{ 
                    scale: 1.03, 
                    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                    backgroundColor: "#ffffff",
                    color: "#1f2937",
                    skewX: -5,
                  }}
                  whileTap={{ scale: 0.97 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  onClick={handleReset}
                >
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    {translations[language].reset}
                  </span>
                </motion.button>
              )}
              <div ref={messagesEndRef} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom scrollbar styles */}
      <style jsx>{`
        .custom-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: #fef3c7;
          border-radius: 10px;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #f59e0b, #eab308);
          border-radius: 10px;
        }
        .custom-scroll::-webkit-scrollbar-thumb:hover {
          background: #d97706;
        }
      `}</style>
    </>
  );
};

export default ThitsarAungChat;