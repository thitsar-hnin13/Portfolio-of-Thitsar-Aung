import { motion } from 'framer-motion'
import React, { useState, useEffect } from 'react'
import p from '../assets/p.jpg'

// Language translations
const translations = {
  en: {
    // Stats
    experience: "Experience",
    experienceValue: "4+ years",
    specialty: "Specialty",
    specialtyValue: "Professional Web Developer",
    focus: "Focus",
    focusValue: "Performance & UX",
    
    // Name and description
    name: "Thitsar Aung",
    description1: "I am the Founder of Unique Solution Company and a passionate Web Developer. I have experience working with different companies and contributing to various web development projects. I am a motivated Professional Web Developer with knowledge of Django, React, and REST API development. I enjoy learning new technologies and building real-world projects while continuously improving my skills.",
    description2: "I am passionate about improving my development skills and contributing to innovative projects while collaborating with development teams and supporting other companies with web solutions.",
    
    // Buttons
    viewProjects: "View Projects",
    viewPortfolio: "View Portfolio",
    
    // About section
    aboutTitle: "About",
    aboutDesc1: "My additional skills include Network Design and A+ Computer Hardware, where I understand basic networking concepts, system troubleshooting, and computer maintenance. I also have experience in Graphic Design and Video Editing, allowing me to create visual content and multimedia materials for digital platforms. In addition, I have foundational knowledge of Cybersecurity, including basic security practices and awareness of online threats.",
    aboutDesc2: "I also have accounting knowledge through ACCA and LCCI studies, which has given me an understanding of financial management, bookkeeping, and business processes. Furthermore, I am familiar with Japanese and Korean languages, enabling me to communicate and learn from diverse international resources and communities."
  },
  my: {
    // Stats
    experience: "အတွေ့အကြုံ",
    experienceValue: "၄+ နှစ်",
    specialty: "အထူးပြု",
    specialtyValue: "ပရော်ဖက်ရှင်နယ် ဝဘ်ဒီဗလောပါ",
    focus: "အာရုံစိုက်မှု",
    focusValue: "စွမ်းဆောင်ရည်နှင့် UX",
    
    // Name and description
    name: "သစ္စာအောင်",
    description1: "ကျွန်တော်သည် Unique Solution ကုမ္ပဏီကို တည်ထောင်သူဖြစ်ပြီး ဝါသနာပါတဲ့ ဝဘ်ဒီဗလောပါတစ်ယောက်ဖြစ်ပါတယ်။ ကုမ္ပဏီအမျိုးမျိုးနဲ့ အလုပ်လုပ်ဖူးပြီး ဝဘ်ဖွံ့ဖြိုးရေး ပရောဂျက်အမျိုးမျိုးမှာ ပါဝင်ကူညီခဲ့ပါတယ်။ ကျွန်တော်သည် Django၊ React နဲ့ REST API ဖွံ့ဖြိုးရေးတို့ကို သိရှိထားတဲ့ စိတ်အားထက်သန်တဲ့ ပရော်ဖက်ရှင်နယ် ဝဘ်ဒီဗလောပါတစ်ယောက်ဖြစ်ပါတယ်။ နည်းပညာအသစ်တွေကို လေ့လာရတာနဲ့ လက်တွေ့ပရောဂျက်တွေ တည်ဆောက်ရတာကို နှစ်သက်ပြီး ကျွန်တော့်ရဲ့စွမ်းရည်တွေကို အဆက်မပြတ် မြှင့်တင်နေပါတယ်။",
    description2: "ကျွန်တော့်ရဲ့ ဖွံ့ဖြိုးရေးစွမ်းရည်တွေကို မြှင့်တင်ရင်းနဲ့ ဆန်းသစ်တဲ့ ပရောဂျက်တွေမှာ ပါဝင်ကူညီရတာ၊ ဖွံ့ဖြိုးရေးအဖွဲ့တွေနဲ့ ပူးပေါင်းဆောင်ရွက်ရတာနဲ့ အခြားကုမ္ပဏီတွေကို ဝဘ်ဆိုင်ရာဖြေရှင်းနည်းတွေနဲ့ ကူညီရတာတွေကို စိတ်အားထက်သန်ပါတယ်။",
    
    // Buttons
    viewProjects: "ပရောဂျက်များ",
    viewPortfolio: "ပို့တ်ဖိုလီယို",
    
    // About section
    aboutTitle: "အကြောင်း",
    aboutDesc1: "ကျွန်တော့်ရဲ့ အခြားသောစွမ်းရည်တွေကတော့ Network Design နဲ့ A+ Computer Hardware တို့ဖြစ်ပြီး အခြေခံကွန်ရက်သဘောတရားတွေ၊ စနစ်ပြဿနာရှာဖွေခြင်းနဲ့ ကွန်ပျူတာပြုပြင်ထိန်းသိမ်းခြင်းတို့ကို နားလည်ထားပါတယ်။ Graphic Design နဲ့ Video Editing မှာလည်း အတွေ့အကြုံရှိပြီး ဒစ်ဂျစ်တယ်ပလက်ဖောင်းတွေအတွက် ရုပ်ပုံဆိုင်ရာအကြောင်းအရာတွေနဲ့ မာလ်တီမီဒီယာပစ္စည်းတွေကို ဖန်တီးနိုင်ပါတယ်။ ထို့အပြင် Cybersecurity အခြေခံအသိပညာ၊ အခြေခံလုံခြုံရေးအလေ့အကျင့်တွေနဲ့ အွန်လိုင်းခြိမ်းခြောက်မှုတွေအကြောင်းကိုလည်း နားလည်ထားပါတယ်။",
    aboutDesc2: "ACCA နဲ့ LCCI လေ့လာမှုတွေကနေ စာရင်းကိုင်အသိပညာလည်းရှိပြီး ဘဏ္ဍာရေးစီမံခန့်ခွဲမှု၊ စာရင်းကိုင်ခြင်းနဲ့ စီးပွားရေးလုပ်ငန်းစဉ်တွေကို နားလည်ထားပါတယ်။ ထို့ပြင် ဂျပန်နဲ့ ကိုရီးယားဘာသာစကားတွေကိုလည်း ရင်းနှီးပြီး နိုင်ငံတကာက အရင်းအမြစ်တွေနဲ့ အသိုင်းအဝိုင်းတွေကနေ ဆက်သွယ်သင်ယူနိုင်ပါတယ်။"
  },
  ko: {
    // Stats
    experience: "경력",
    experienceValue: "4+ 년",
    specialty: "전문 분야",
    specialtyValue: "전문 웹 개발자",
    focus: "초점",
    focusValue: "성능 및 UX",
    
    // Name and description
    name: "띳싸아웅",
    description1: "저는 Unique Solution 회사의 창립자이자 열정적인 웹 개발자입니다. 다양한 회사에서 근무한 경험이 있으며 여러 웹 개발 프로젝트에 기여했습니다. 저는 Django, React 및 REST API 개발에 대한 지식을 갖춘 동기부여된 전문 웹 개발자입니다. 새로운 기술을 배우고 실제 프로젝트를 구축하며 지속적으로 기술을 향상시키는 것을 즐깁니다.",
    description2: "저는 개발 팀과 협력하고 다른 회사에 웹 솔루션을 지원하면서 개발 기술을 향상시키고 혁신적인 프로젝트에 기여하는 것에 열정을 가지고 있습니다.",
    
    // Buttons
    viewProjects: "프로젝트 보기",
    viewPortfolio: "포트폴리오",
    
    // About section
    aboutTitle: "소개",
    aboutDesc1: "제 추가 기술에는 네트워크 설계 및 A+ 컴퓨터 하드웨어가 포함되며, 기본 네트워킹 개념, 시스템 문제 해결 및 컴퓨터 유지보수를 이해하고 있습니다. 그래픽 디자인 및 비디오 편집 경험도 있어 디지털 플랫폼을 위한 시각적 콘텐츠와 멀티미디어 자료를 만들 수 있습니다. 또한 사이버보안에 대한 기초 지식, 기본 보안 관행 및 온라인 위협에 대한 인식을 갖추고 있습니다.",
    aboutDesc2: "ACCA 및 LCCI 학습을 통해 회계 지식도 보유하고 있어 재무 관리, 부기 및 비즈니스 프로세스를 이해하고 있습니다. 또한 일본어와 한국어에 익숙하여 다양한 국제 자원과 커뮤니티에서 소통하고 배울 수 있습니다."
  }
};

const About = () => {
  const [language, setLanguage] = useState("en");
  const t = translations[language];

  // Language selector buttons
  const LanguageSelector = () => (
    <div className="absolute top-5 right-5 z-50 flex gap-2">
      {[
        { code: "en", label: "EN", flag: "🇬🇧" },
        { code: "my", label: "မြန်မာ", flag: "🇲🇲" },
        { code: "ko", label: "한국어", flag: "🇰🇷" }
      ].map((lang) => (
        <motion.button
          key={lang.code}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setLanguage(lang.code)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
            language === lang.code
              ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
              : "bg-gray-800/80 text-gray-300 hover:bg-gray-700 backdrop-blur-sm"
          }`}
        >
          <span>{lang.flag}</span>
          <span>{lang.label}</span>
        </motion.button>
      ))}
    </div>
  );

  const states = [
    { label: t.experience, value: t.experienceValue },
    { label: t.specialty, value: t.specialtyValue },
    { label: t.focus, value: t.focusValue },
  ];
  
  const glows = [
    '-top-10 -left-10 w-[360px] h-[360px] opacity-20 blur-[120px]',
    'bottom-0 right-10 w-[420px] h-[420px] opacity-15 blur-[140px] delay-300',
    'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] opacity-10 blur-[100px]',
  ];

  return (
    <div id='about' className="min-h-screen w-full flex items-center justify-center relative bg-black text-red-500 overflow-hidden">
      {/* Language Selector */}
      <LanguageSelector />

      <div className="absolute inset-0 pointer-events-none">
        {glows.map((c, i) => (
          <div className={`absolute rounded-full bg-gradient-to-r from-[#302d63] via-[#bf0020] to-[#d81c83] animate-pulse ${c}`} key={i}>
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-6xl w-full mx-auto px-6 md:px-10 lg:px-12 py-20 flex flex-col gap-12">
        <motion.div 
          className="flex flex-col md:flex-row items-center md:items-stretch gap-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.div 
            className='relative w-[160px] h-[160px] md:w-[200px] md:h-[200px] rounded-2xl overflow-hidden shadow-2xl'
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
          >
            <img src={p} alt="profile" className='absolute inset-0 object-cover w-full h-full' />
          </motion.div>

          <div className="flex-1 flex-col justify-center text-center md:text-left">
            <h2 className='text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#302d63] via-[#bf0029] to-[#910018]'>
              {t.name}
            </h2>

            <p className="mt-4 text-blue-300 leading-relaxed text-base sm:text-lg max-w-2xl md:max-w-3xl">
              {t.description1}
              <p className="mt-4 text-blue-400 text-base sm:text-lg">
                {t.description2}
              </p>
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-xl mx-auto md:mx-0">
              {states.map((state, i) => (
                <motion.div 
                  className="rounded-xl border border-red-300/10 bg-blue-300/5 px-4 py-3 text-center" 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 * i, duration: 0.4 }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <div className="text-sm text-gray-400">{state.label}</div>
                  <div className="text-lg font-semibold text-white">{state.value}</div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start text-lg font-medium">
              <a 
                href="#projects" 
                className='inline-flex items-center justify-center rounded-lg bg-blue-300 text-black font-semibold px-5 py-3 hover:bg-red-300 transition'
              >
                {t.viewProjects}
              </a>
              <a 
                href="https://thitsarprotfolio.vercel.app/" 
                target="_blank"
                rel="noopener noreferrer"
                className='inline-flex items-center justify-center rounded-lg border border-white/20 text-blue-500 bg-white/10 font-semibold px-5 py-3 hover:bg-white/20 transition'
              >
                {t.viewPortfolio}
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className='text-center md:text-left'
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <h3 className='text-2xl sm:text-3xl font-bold text-red-500 mb-3'>{t.aboutTitle}</h3>
          <p className='text-blue-300 leading-relaxed text-base sm:text-lg'>
            {t.aboutDesc1}
          </p>
          <p className='mt-4 text-blue-400 text-base sm:text-lg'>
            {t.aboutDesc2}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default About;