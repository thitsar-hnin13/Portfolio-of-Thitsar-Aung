import { motion } from 'framer-motion'
import React, { useState, useEffect } from 'react'
import p from '../assets/p.jpg'

// Language translations (English & Korean only)
const translations = {
  en: {
    // Stats
    experience: "Experience",
    experienceValue: "4+ years",
    specialty: "Specialty",
    specialtyValue: "Full-Stack Developer",
    focus: "Focus",
    focusValue: "Performance & UX",
    
    // Buttons
    viewProjects: "View Projects",
    viewPortfolio: "View Portfolio",
    
    // Name
    name: "Thitsar Aung",
    
    // Main description
    mainDescription: "I'm a passionate founder, product builder, and full-stack developer dedicated to creating real-world digital solutions and modern web applications. With a strong background in web development and a keen eye for design, I strive to build impactful digital experiences that resonate with users and make a difference.",
    
    // Awara Brand Section
    awaraTitle: "✨ Awara - Creative Digital Service Brand",
    awaraDescription: "Awara is a creative digital service brand focused on designing beautiful, meaningful, and modern websites for individuals and businesses. We specialize in creating elegant portfolio websites for special moments such as weddings, lamaran, birthday parties, anniversaries, and graduation ceremonies. Our goal is to turn your memories into stunning digital experiences that you can share and preserve forever.",
    awaraBusiness: "In addition, Awara supports local businesses and entrepreneurs by building professional business websites. Whether you are starting a local brand, running a bag business, or managing a traditional craft business, we help bring your vision to life and grow your presence online.",
    awaraServices: "Beyond web design, Awara also provides access to curated opportunities for those who want to study Korean, Japanese, and English languages, connecting you with suitable schools and learning options. We also offer a range of premium digital services, including access to tools such as ChatGPT, Gemini, Telegram AI bots, Canvas tools, and VPN services, helping you stay ahead in the digital world.",
    awaraMission: "At Awara, our mission is simple: to combine creativity and technology to build impactful and visually stunning digital experiences for everyone.",
    
    // Personal mission
    // personalMission: "🎯 My mission is to blend elegant design with robust engineering — delivering gold-standard experiences that make a difference.",
    


    // Japan Work & Travel Section
    workInJapan: "Awara is a creative ",
    companyType: "digital brand specializing in beautiful and modern websites.",
    jobDescription: "We design elegant portfolio websites for weddings, birthdays, anniversaries, and special moments—turning your memories into stunning digital experiences.",
    travelLove: "Love Traveling!",
    travelDescription: "I absolutely love traveling and exploring new places! Japan has so many beautiful destinations - from the historic streets of Kyoto to the bustling city of Tokyo, from the majestic Mount Fuji to the peaceful beaches of Okinawa. Every trip brings new experiences, delicious local foods, and unforgettable memories."
  },
  ko: {
    // Stats
    experience: "경력",
    experienceValue: "4년 이상",
    specialty: "전문 분야",
    specialtyValue: "풀스택 개발자",
    focus: "초점",
    focusValue: "성능 및 UX",
    
    // Buttons
    viewProjects: "프로젝트 보기",
    viewPortfolio: "포트폴리오 보기",
    
    // Name
    name: "싯사르 아웅",
    
    // Main description
    mainDescription: "저는 실제 디지털 솔루션과 현대 웹 애플리케이션을 만드는 데 전념하는 열정적인 창업자, 제품 빌더, 풀스택 개발자입니다. 웹 개발에 대한 강력한 배경과 디자인에 대한 예리한 안목을 바탕으로 사용자에게 공감을 주고 변화를 만드는 영향력 있는 디지털 경험을 구축하기 위해 노력합니다.",
    
    // Awara Brand Section
    awaraTitle: "✨ 아와라 - 창의적 디지털 서비스 브랜드",
    awaraDescription: "아와라는 개인과 비즈니스를 위한 아름답고 의미 있는 현대적인 웹사이트 디자인에 중점을 둔 창의적인 디지털 서비스 브랜드입니다. 우리는 웨딩, 청첩장, 생일 파티, 기념일, 졸업식과 같은 특별한 순간을 위한 우아한 포트폴리오 웹사이트를 전문으로 만듭니다. 우리의 목표는 당신의 추억을 공유하고 영원히 보존할 수 있는 놀라운 디지털 경험으로 바꾸는 것입니다.",
    awaraBusiness: "또한 아와라는 전문 비즈니스 웹사이트를 구축하여 지역 비즈니스와 기업가를 지원합니다. 지역 브랜드를 시작하든, 가방 비즈니스를 운영하든, 전통 공예 비즈니스를 관리하든, 우리는 당신의 비전을 실현하고 온라인에서 당신의 존재감을 키울 수 있도록 돕습니다.",
    awaraServices: "웹 디자인 외에도 아와라는 한국어, 일본어, 영어를 공부하려는 사람들을 위해 엄선된 기회를 제공하여 적합한 학교와 학습 옵션을 연결해 드립니다. 또한 ChatGPT, Gemini, Telegram AI 봇, Canvas 도구, VPN 서비스와 같은 도구에 대한 액세스를 포함한 다양한 프리미엄 디지털 서비스를 제공하여 디지털 세계에서 앞서 나갈 수 있도록 도와드립니다.",
    awaraMission: "아와라의 미션은 간단합니다: 창의성과 기술을 결합하여 모든 사람을 위한 영향력 있고 시각적으로 놀라운 디지털 경험을 구축하는 것입니다.",
    
    // Personal mission
    personalMission: "🎯 저의 미션은 우아한 디자인과 강력한 엔지니어링을 결합하여 변화를 만드는 골드 스탠다드 경험을 제공하는 것입니다.",
    
    // Japan Work & Travel Section
    workInJapan: "🇯🇵 일본에서 근무",
    companyType: "식품 제조 회사",
    jobDescription: "현재 일본의 식품 제조 회사에서 근무하며 고품질 식품 생산과 안전 기준 유지를 돕고 있습니다. 이 경험은 규율, 세부 사항에 대한 주의, 빠른 환경에서 팀워크의 중요성을 가르쳐 주었습니다.",
    travelLove: "✈️ 여행 사랑!",
    travelDescription: "저는 여행과 새로운 장소 탐험을 정말 좋아합니다! 일본에는 교토의 역사적인 거리부터 도쿄의 번화가, 웅장한 후지산부터 오키나와의 평화로운 해변까지 정말 아름다운 장소가 많습니다. 매 여행마다 새로운 경험, 맛있는 현지 음식, 잊지 못할 추억을 가져다줍니다."
  }
};

const About = () => {
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

  // Language selector buttons - English & Korean only
  const LanguageSelector = () => (
    <div className="fixed top-5 right-5 z-50 flex gap-2">
      {[
        // { code: "en", label: "English", flag: "🇬🇧" },
        // { code: "ko", label: "한국어", flag: "🇰🇷" }
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

  const states = [
    { label: t.experience, value: t.experienceValue },
    { label: t.specialty, value: t.specialtyValue },
    { label: t.focus, value: t.focusValue },
  ];

  return (
    <div id='about' className="min-h-screen w-full flex items-center justify-center relative bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 overflow-hidden">
      
      {/* Language Selector */}
      <LanguageSelector />

      {/* Gold Background Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className='absolute top-1/4 left-0 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-amber-200 via-yellow-200 to-amber-300 opacity-30 blur-[120px] animate-pulse' />
        <div className='absolute bottom-1/4 right-0 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-yellow-200 via-amber-200 to-orange-200 opacity-30 blur-[120px] animate-pulse delay-500' />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-amber-100/40 blur-3xl" />
        <div className="absolute top-1/3 right-0 w-80 h-80 rounded-full bg-yellow-100/40 blur-3xl animate-pulse delay-700" />
        <div className="absolute bottom-1/3 left-0 w-96 h-96 rounded-full bg-amber-100/30 blur-3xl animate-pulse delay-1000" />
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

      <div className="relative z-10 max-w-6xl w-full mx-auto px-5 sm:px-6 md:px-8 lg:px-12 py-16 sm:py-20 flex flex-col gap-10 sm:gap-12">
        
        {/* Profile Section */}
        <motion.div 
          className="flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.div 
            className='relative w-[140px] h-[140px] sm:w-[160px] sm:h-[160px] md:w-[200px] md:h-[200px] rounded-2xl overflow-hidden shadow-xl flex-shrink-0'
            whileHover={{ scale: 1.03, boxShadow: "0 20px 40px rgba(212,175,55,0.25)" }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
          >
            <img src={p} alt="profile" className='absolute inset-0 object-cover w-full h-full' />
          </motion.div>

          <div className="flex-1 text-center md:text-left">
            <h2 className='text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700'>
              {t.name}
            </h2>

            <p className="mt-3 sm:mt-4 text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg">
              {t.mainDescription}
            </p>

            {/* Stats Cards */}
            <div className="mt-5 sm:mt-6 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 md:gap-4 max-w-xl mx-auto md:mx-0">
              {states.map((state, i) => (
                <motion.div 
                  className="rounded-xl bg-amber-50/60 border border-amber-200 px-3 sm:px-4 py-2.5 sm:py-3 text-center shadow-sm hover:shadow-md transition-shadow" 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 * i, duration: 0.4 }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <div className="text-xs sm:text-sm text-amber-600">{state.label}</div>
                  <div className="text-base sm:text-lg font-semibold text-gray-800">{state.value}</div>
                </motion.div>
              ))}
            </div>

            {/* Dark Gray Buttons with Skew Effect */}
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
              <motion.a 
                href="#projects" 
                className='inline-flex items-center justify-center rounded-full bg-gray-700 text-white font-semibold px-5 sm:px-6 py-2.5 sm:py-3 shadow-md transition-all duration-300 text-sm sm:text-base'
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
                  backgroundColor: "#ffffff",
                  color: "#1f2937",
                  skewX: -6,
                }}
                whileTap={{ scale: 0.95 }}
              >
                {t.viewProjects}
              </motion.a>
              <motion.a 
                href="https://thitsarprotfolio.vercel.app/" 
                target="_blank"
                rel="noopener noreferrer"
                className='inline-flex items-center justify-center rounded-full border border-gray-300 text-gray-700 bg-gray-100 font-semibold px-5 sm:px-6 py-2.5 sm:py-3 transition-all duration-300 text-sm sm:text-base'
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                  backgroundColor: "#ffffff",
                  color: "#1f2937",
                  skewX: 6,
                }}
                whileTap={{ scale: 0.95 }}
              >
                {t.viewPortfolio}
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Awara Brand Section */}
        <motion.div 
          className='bg-gradient-to-br from-white to-amber-50/70 rounded-2xl p-5 sm:p-6 md:p-8 border border-amber-200 shadow-lg hover:shadow-xl'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true, amount: 0.4 }}
          whileHover={{ scale: 1.01, borderColor: "#d4af37" }}
        >
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <motion.span className="text-2xl sm:text-3xl" whileHover={{ scale: 1.1, rotate: 5 }}>✨</motion.span>
            <h3 className='text-xl sm:text-2xl md:text-3xl font-bold text-amber-600'>{t.awaraTitle}</h3>
          </div>
          <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-3">{t.awaraDescription}</p>
          <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-3">{t.awaraBusiness}</p>
          <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-3">{t.awaraServices}</p>
          <p className="text-amber-700 font-semibold leading-relaxed text-sm sm:text-base italic mt-2 pt-2 border-t border-amber-200">{t.awaraMission}</p>
        </motion.div>

        {/* Personal Mission */}
        <motion.div 
          className='text-center md:text-left bg-amber-100/40 rounded-xl p-4 sm:p-5 border border-amber-200'
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <p className='text-gray-800 leading-relaxed text-base sm:text-lg font-medium'>
            {t.personalMission}
          </p>
        </motion.div>

        {/* Japan Work & Travel Section */}
        <motion.div 
          className='grid md:grid-cols-2 gap-5 sm:gap-6'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          {/* Work in Japan Card */}
          <motion.div 
            className='bg-gradient-to-br from-white to-amber-50/70 rounded-2xl p-5 sm:p-6 border border-amber-200 shadow-lg hover:shadow-xl'
            whileHover={{ scale: 1.02, borderColor: "#d4af37", boxShadow: "0 20px 40px rgba(212,175,55,0.15)" }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <motion.span className="text-3xl sm:text-4xl" whileHover={{ scale: 1.1, rotate: 5 }}>🇯🇵</motion.span>
              <h3 className='text-lg sm:text-xl md:text-2xl font-bold text-amber-600'>{t.workInJapan}</h3>
            </div>
            <div className="mb-2 sm:mb-3">
              <motion.span 
                className="inline-block px-2.5 sm:px-3 py-0.5 sm:py-1 bg-amber-100 text-amber-600 rounded-full text-xs sm:text-sm"
                whileHover={{ scale: 1.02, backgroundColor: "#fef3c7" }}
              >
                🍱 {t.companyType}
              </motion.span>
            </div>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{t.jobDescription}</p>
          </motion.div>

          {/* Travel Love Card */}
          <motion.div 
            className='bg-gradient-to-br from-white to-amber-50/70 rounded-2xl p-5 sm:p-6 border border-amber-200 shadow-lg hover:shadow-xl'
            whileHover={{ scale: 1.02, borderColor: "#d4af37", boxShadow: "0 20px 40px rgba(212,175,55,0.15)" }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <motion.span className="text-3xl sm:text-4xl" whileHover={{ scale: 1.1, rotate: -5 }}>✈️</motion.span>
              <h3 className='text-lg sm:text-xl md:text-2xl font-bold text-amber-600'>{t.travelLove}</h3>
            </div>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{t.travelDescription}</p>
          </motion.div>
        </motion.div>

        {/* Decorative Bottom Line */}
        <motion.div 
          className="mt-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="w-20 h-1 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 rounded-full mx-auto"></div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;