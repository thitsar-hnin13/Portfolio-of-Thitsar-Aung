import { useTransform, motion, useScroll } from 'framer-motion';
import React, { useEffect, useMemo, useRef, useState } from 'react';

// Language translations
const translations = {
  en: {
    role: "Web Developer",
    company: "Brain Mentors",
    duration: "2026",
    description: "Built Applications",
    experience: "Experience",
    // Add bio translations here
    bio: {
      title: "Founder, Product Builder & Web Developer",
      intro: "I am Thitsar Aung, a passionate web developer, entrepreneur, and product builder based in Yangon, Myanmar. I focus on building real-world digital solutions and modern web applications that help businesses grow, operate efficiently, and adapt to the digital era. My work combines technology, creativity, and business thinking to turn ideas into practical and impactful products.",
      uniqueSol: "As the founder of Unique Solution Tech, I lead a technology company dedicated to building modern websites, digital platforms, and web-based systems. We design and develop scalable web solutions that help businesses improve their online presence, manage their operations digitally, and reach more customers.",
      shwe13: "My passion for building extends beyond technology. I am also the founder of Shwe 13 Solution, a local brand focused on fashion and lifestyle products. The brand aims to promote creativity, quality, and local entrepreneurship while building products that reflect modern style and a unique local identity.",
      fearless: "Beyond business, I am deeply committed to building communities and supporting creative culture. I founded FEARLESS – Fixed Bike Group, a fixed-gear cycling community that brings together riders who share a passion for cycling, discipline, and performance. This community encourages teamwork, friendship, and an active lifestyle. To further promote this culture, I also launched T14K, a fixed bike initiative dedicated to supporting riders and encouraging more people to experience the unique spirit of fixed-gear bikes.",
      t15h: "My drive to contribute to society led me to create the T15H Community Support Group, a social initiative designed to support people in need and organize community-based activities, encouraging collective support and responsibility.",
      education: "Alongside my entrepreneurial and community work, I am passionate about education and mentorship. I teach web engineering and programming, helping students and aspiring developers master modern web technologies. I also support learning opportunities in Japanese, Korean, and English, believing that language and technology together can open doors to global opportunities.",
      mission: "My mission is to build impactful digital products, grow innovative businesses, and create communities that inspire people to learn, collaborate, and move forward together. Through technology, entrepreneurship, education, and community, I strive to make a positive impact and help shape a more connected and beautiful world."
    }
  },
  ko: {
    role: "웹 개발자",
    company: "브레인 멘토스",
    duration: "2026",
    description: "애플리케이션 개발",
    experience: "경력",
    bio: {
      title: "창립자, 제품 개발자 및 웹 개발자",
      intro: "저는 미얀마 양곤에 기반을 둔 열정적인 웹 개발자, 기업가 및 제품 개발자 티차 아웅입니다. 저는 비즈니스 성장, 효율적 운영 및 디지털 시대 적응을 돕는 실제 디지털 솔루션과 현대 웹 애플리케이션 구축에 집중하고 있습니다. 제 작업은 기술, 창의성 및 비즈니스 사고를 결합하여 아이디어를 실용적이고 영향력 있는 제품으로 전환합니다.",
      uniqueSol: "Unique Solution Tech의 창립자로서 저는 현대적인 웹사이트, 디지털 플랫폼 및 웹 기반 시스템 구축에 전념하는 기술 회사를 이끌고 있습니다. 우리는 기업의 온라인 존재감 향상, 디지털 운영 관리 및 더 많은 고객 도달을 돕는 확장 가능한 웹 솔루션을 설계하고 개발합니다.",
      shwe13: "제 구축에 대한 열정은 기술을 넘어 확장됩니다. 저는 패션 및 라이프스타일 제품에 중점을 둔 현지 브랜드 Shwe 13 Solution의 창립자이기도 합니다. 이 브랜드는 현대적 스타일과 독특한 지역 정체성을 반영하는 제품을 만들면서 창의성, 품질 및 지역 기업가 정신을 증진하는 것을 목표로 합니다.",
      fearless: "비즈니스를 넘어, 저는 커뮤니티 구축과 창의적 문화 지원에 깊이 헌신하고 있습니다. 저는 사이클링, 규율 및 퍼포먼스에 대한 열정을 공유하는 라이더들을 모으는 고정 기어 사이클링 커뮤니티인 FEARLESS – Fixed Bike Group을 설립했습니다. 이 커뮤니티는 팀워크, 우정 및 활동적인 라이프스타일을 장려합니다. 이 문화를 더욱 홍보하기 위해 라이더를 지원하고 더 많은 사람들이 고정 기어 자전거의 독특한 정신을 경험하도록 장려하는 T14K 이니셔티브도 시작했습니다.",
      t15h: "사회에 기여하려는 제 의지는 도움이 필요한 사람들을 지원하고 지역사회 기반 활동을 조직하며 집단적 지원과 책임을 장려하는 사회적 이니셔티브인 T15H Community Support Group을 만들게 했습니다.",
      education: "기업가 정신 및 커뮤니티 활동과 함께, 저는 교육과 멘토십에 열정적입니다. 저는 웹 엔지니어링과 프로그래밍을 가르치며 학생들과 예비 개발자들이 현대 웹 기술을 습득하도록 돕고 있습니다. 또한 일본어, 한국어, 영어 학습 기회를 지원하며, 언어와 기술이 함께 글로벌 기회의 문을 열 수 있다고 믿습니다.",
      mission: "제 사명은 영향력 있는 디지털 제품을 구축하고, 혁신적인 비즈니스를 성장시키며, 사람들이 배우고, 협력하고, 함께 나아가도록 영감을 주는 커뮤니티를 만드는 것입니다. 기술, 기업가 정신, 교육 및 커뮤니티를 통해 저는 긍정적인 영향을 미치고 더 연결되고 아름다운 세상을 만드는 데 기여하기 위해 노력하고 있습니다."
    }
  },
  my: {
    role: "ဝဘ် ဒီဇိုင်နာ",
    company: "Brain Mentors",
    duration: "၂၀၂၆",
    description: "အက်ပလီကေးရှင်းများ တည်ဆောက်ခြင်း",
    experience: "အတွေ့အကြုံ",
    bio: {
      title: "တည်ထောင်သူ၊ ထုတ်ကုန်တည်ဆောက်သူနှင့် ဝဘ်ဒီဇိုင်နာ",
      intro: "ကျွန်တော်ကတော့ ရန်ကုန်မြို့အခြေစိုက် ဝဘ်ဒီဇိုင်နာ၊ စွန့်ဦးတီထွင်သူနှင့် ထုတ်ကုန်တည်ဆောက်သူ Thitsar Aung ဖြစ်ပါတယ်။ လုပ်ငန်းတွေ ကြီးထွားလာစေရန်၊ ထိရောက်စွာလည်ပတ်နိုင်ရန်နှင့် ဒစ်ဂျစ်တယ်ခေတ်နှင့် လိုက်လျောညီထွေဖြစ်စေရန် ကူညီပေးမယ့် လက်တွေ့ကမ္ဘာသုံး ဒစ်ဂျစ်တယ်ဖြေရှင်းချက်များနှင့် ခေတ်မီဝဘ်အက်ပလီကေးရှင်းများကို တည်ဆောက်ခြင်းကို အာရုံစိုက်လုပ်ဆောင်နေပါတယ်။ ကျွန်တော့်အလုပ်ဟာ နည်းပညာ၊ တီထွင်ဖန်တီးမှုနှင့် စီးပွားရေးဆိုင်ရာ အတွေးအခေါ်တို့ကို ပေါင်းစပ်ပြီး စိတ်ကူးစိတ်သန်းများကို လက်တွေ့ကျပြီး အကျိုးသက်ရောက်မှုရှိတဲ့ ထုတ်ကုန်များအဖြစ် ပြောင်းလဲပေးပါတယ်။",
      uniqueSol: "Unique Solution Tech ရဲ့ တည်ထောင်သူအနေနဲ့ ခေတ်မီဝဘ်ဆိုဒ်များ၊ ဒစ်ဂျစ်တယ်ပလက်ဖောင်းများနှင့် ဝဘ်အခြေပြုစနစ်များကို တည်ဆောက်ရန် ရည်ရွယ်ထားတဲ့ နည်းပညာကုမ္ပဏီတစ်ခုကို ဦးဆောင်နေပါတယ်။ လုပ်ငန်းများရဲ့ အွန်လိုင်းတည်ရှိမှုကို မြှင့်တင်ရန်၊ ၎င်းတို့၏ လုပ်ငန်းဆောင်တာများကို ဒစ်ဂျစ်တယ်စနစ်ဖြင့် စီမံခန့်ခွဲရန်နှင့် သုံးစွဲသူများထံ ပိုမိုရောက်ရှိစေရန် ကူညီပေးမယ့် ချဲ့ထွင်နိုင်သော ဝဘ်ဖြေရှင်းချက်များကို ကျွန်တော်တို့ ဒီဇိုင်းဆွဲပြီး တည်ဆောက်ပေးပါတယ်။",
      shwe13: "တည်ဆောက်ခြင်းအပေါ် ကျွန်တော့်ရဲ့ စိတ်အားထက်သန်မှုဟာ နည်းပညာထက်မက ကျယ်ပြန့်ပါတယ်။ ကျွန်တော်ဟာ ဖက်ရှင်နှင့် လူနေမှုပုံစံ ထုတ်ကုန်များကို အဓိကထားတဲ့ ဒေသတွင်းအမှတ်တံဆိပ်ဖြစ်တဲ့ Shwe 13 Solution ကိုလည်း တည်ထောင်ခဲ့သူဖြစ်ပါတယ်။ ဒီအမှတ်တံဆိပ်ဟာ ခေတ်မီစတိုင်နှင့် ထူးခြားတဲ့ ဒေသဆိုင်ရာ ဝိသေသလက္ခဏာကို ရောင်ပြန်ဟပ်တဲ့ ထုတ်ကုန်များကို တည်ဆောက်ရင်း တီထွင်ဖန်တီးမှု၊ အရည်အသွေးနှင့် ဒေသတွင်း စွန့်ဦးတီထွင်မှုကို မြှင့်တင်ရန် ရည်ရွယ်ပါတယ်။",
      fearless: "စီးပွားရေးလုပ်ငန်းထက်မက ကျွန်တော်ဟာ အသိုင်းအဝိုင်းများ တည်ဆောက်ခြင်းနှင့် တီထွင်ဖန်တီးမှု ယဉ်ကျေးမှုကို ပံ့ပိုးခြင်းအတွက် နက်ရှိုင်းစွာ ကတိပြုထားပါတယ်။ စက်ဘီးစီးခြင်း၊ စည်းကမ်းနှင့် စွမ်းဆောင်ရည်အပေါ် ဝါသနာတူညီကြတဲ့ စီးနင်းသူများကို စုစည်းပေးတဲ့ fixed-gear စက်ဘီးစီးအသိုက်အဝန်း FEARLESS – Fixed Bike Group ကို တည်ထောင်ခဲ့ပါတယ်။ ဒီအသိုက်အဝန်းဟာ အဖွဲ့လိုက်လုပ်ဆောင်မှု၊ ခင်မင်ရင်းနှီးမှုနှင့် တက်ကြွသော လူနေမှုပုံစံကို အားပေးပါတယ်။ ဒီယဉ်ကျေးမှုကို ပိုမိုမြှင့်တင်ရန် စီးနင်းသူများကို ပံ့ပိုးရန်နှင့် လူအများကို fixed-gear စက်ဘီးများ၏ ထူးခြားသော စိတ်ဓာတ်ကို ခံစားခွင့်ရရှိစေရန် အားပေးတဲ့ T14K အစီအစဉ်ကိုလည်း စတင်ခဲ့ပါတယ်။",
      t15h: "လူ့အဖွဲ့အစည်းအတွက် ပံ့ပိုးကူညီလိုတဲ့ ကျွန်တော့်ရဲ့ စေ့ဆော်မှုဟာ လိုအပ်နေသူများကို ကူညီရန်နှင့် ရပ်ရွာအခြေပြု လှုပ်ရှားမှုများ စီစဉ်ရန်၊ စုပေါင်းပံ့ပိုးမှုနှင့် တာဝန်ယူမှုကို အားပေးရန် ရည်ရွယ်တဲ့ လူမှုအဖွဲ့အစည်းဆိုင်ရာ အစပျိုးမှုတစ်ခုဖြစ်တဲ့ T15H Community Support Group ကို ဖန်တီးဖြစ်စေခဲ့ပါတယ်။",
      education: "စွန့်ဦးတီထွင်မှုနှင့် ရပ်ရွာလုပ်ငန်းများနှင့်အတူ ကျွန်တော်ဟာ ပညာရေးနှင့် လမ်းညွှန်မှုအပေါ် စိတ်အားထက်သန်ပါတယ်။ ကျွန်တော်ဟာ ဝဘ်အင်ဂျင်နီယာနှင့် ပရိုဂရမ်မိင်ကို သင်ကြားပေးပြီး ကျောင်းသားများနှင့် ဝါသနာပါသော developer များကို ခေတ်မီဝဘ်နည်းပညာများ ကျွမ်းကျင်စွာ တတ်မြောက်လာစေရန် ကူညီပေးနေပါတယ်။ ဂျပန်၊ ကိုရီးယားနှင့် အင်္ဂလိပ်ဘာသာစကားများအတွက် သင်ယူခွင့်များကိုလည်း ပံ့ပိုးပေးပြီး ဘာသာစကားနှင့် နည်းပညာတို့ ပေါင်းစပ်ခြင်းဟာ ကမ္ဘာလုံးဆိုင်ရာ အခွင့်အလမ်းများဆီသို့ တံခါးဖွင့်ပေးနိုင်တယ်လို့ ယုံကြည်ပါတယ်။",
      mission: "ကျွန်တော့်ရဲ့ ရည်မှန်းချက်ကတော့ သက်ရောက်မှုရှိတဲ့ ဒစ်ဂျစ်တယ်ထုတ်ကုန်များ တည်ဆောက်ရန်၊ ဆန်းသစ်သော စီးပွားရေးလုပ်ငန်းများ ကြီးထွားလာစေရန်နှင့် လူများကို သင်ယူရန်၊ ပူးပေါင်းဆောင်ရွက်ရန်နှင့် အတူတကွ ရှေ့သို့တက်လှမ်းရန် လှုံ့ဆော်ပေးမယ့် အသိုင်းအဝိုင်းများ ဖန်တီးရန် ဖြစ်ပါတယ်။ နည်းပညာ၊ စွန့်ဦးတီထွင်မှု၊ ပညာရေးနှင့် အသိုင်းအဝိုင်းတို့မှတစ်ဆင့် အပြုသဘောဆောင်တဲ့ အကျိုးသက်ရောက်မှုတစ်ခု ဖန်တီးရန်နှင့် ပိုမိုချိတ်ဆက်ပြီး လှပတဲ့ကမ္ဘာတစ်ခု ပုံဖော်ရန် ကြိုးပမ်းနေပါတယ်။"
    }
  }
};

const experiences = [
  {
    role: "Web Developer",
    company: "Brain Mentors",
    duration: "2026",
    description: "Built Applications",
  },
  {
    role: "Local Brand Founder",
    company: "Brain Mentors",
    duration: "2026",
    description: "Built local brand",
  },
  {
    role: "Product Builder",
    company: "Brain Mentors",
    duration: "2026",
    description: "Built local brand and products",
  },
];

function ExperienceItem({ exp, idx, start, end, scrollYProgress, layout, language }) {
  const scale = useTransform(scrollYProgress, [start, end], [0, 1]);
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  const y = useTransform(scrollYProgress, [start, end], [idx % 2 === 0 ? 30 : -30, 0]);
  const x = useTransform(scrollYProgress, [start, end], [-24, 0]);

  const t = translations[language];

  if (layout === "desktop") {
    return (
      <div className="relative flex flex-1 justify-center items-center min-w-0">
        <motion.div
          className="z-10 w-7 h-7 rounded-full bg-blue-300 shadow-[0_0_0_8px_rgba(255,255,255,0.1)]"
          style={{ scale, opacity }}
        />
        <motion.div
          className={`absolute ${idx % 2 === 0 ? "-top-8" : "-bottom-8"} w-[3px] bg-red-600/40`}
          style={{ height: 40, opacity }}
        />
        <motion.article
          className={`absolute ${idx % 2 === 0 ? "bottom-12" : "top-12"} bg-gray-900/80 backdrop-blur border border-gray-700/70 rounded-xl p-7 w-[320px] shadow-lg`}
          style={{ opacity, y, maxWidth: "90vw" }}
          transition={{ duration: 0.4, delay: idx * 0.10 }}
        >
          <h3 className='text-xl font-semibold text-white'>{exp.role}</h3>
          <p className='text-md text-blue-400 mb-3'>
            {exp.company} | {exp.duration}
          </p>
          <p className="text-md text-blue-300 break-words">{exp.description}</p>
        </motion.article>
      </div>
    );
  }

  return (
    <div className="relative flex items-start">
      <motion.div
        className='absolute -left-[14px] top-3 z-10 w-7 h-7 rounded-full bg-blue-300 shadow-[0_0_0_8px_rgba(255,255,255,0.1)]'
        style={{ scale, opacity }}
      />
      <motion.article
        className='bg-gray-900/80 backdrop-blur border border-gray-700/70 rounded-xl p-5 w-[90vw] max-w-sm ml-6 shadow-lg'
        style={{ opacity, x }}
        transition={{ duration: 0.4, delay: idx * 0.10 }}
      >
        <h3 className="text-lg font-semibold break-words text-white">{exp.role}</h3>
        <p className="text-sm text-blue-400 mb-2 break-words">
          {exp.company} | {exp.duration}
        </p>
        <p className='text-sm text-blue-300 break-words'>{exp.description}</p>
      </motion.article>
    </div>
  );
}

const Experience = () => {
  const sceneRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [language, setLanguage] = useState('en'); // 'en', 'ko', 'my'

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const SCENE_HEIGHT_VH = isMobile ? 200 * experiences.length : 180 * experiences.length;
  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start end", "end start"]
  });

  const thresholds = useMemo(() => experiences.map((_, i) => (i + 1) / experiences.length), []);
  const lineSize = useTransform(scrollYProgress, (v) => `${v * 110}%`);

  const t = translations[language];

  return (
    <>
      {/* Bio Section with Title and Language Toggle */}
      <section className="bg-black text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold text-center bg-gradient-to-r from-blue-400 to-red-400 bg-clip-text text-transparent">
              {t.bio.title}
            </h1>
            
            {/* Language toggle buttons - positioned next to title */}
            <div className="flex gap-2 bg-gray-900/80 backdrop-blur border border-gray-700 rounded-lg p-1">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  language === 'en' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('ko')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  language === 'ko' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white'
                }`}
              >
                KO
              </button>
              <button
                onClick={() => setLanguage('my')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  language === 'my' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white'
                }`}
              >
                မြန်မာ
              </button>
            </div>
          </div>
          
          <div className="space-y-6 text-gray-300 leading-relaxed">
            <p>{t.bio.intro}</p>
            
            <div className="border-l-4 border-blue-500 pl-6">
              <h2 className="text-xl font-semibold text-blue-400 mb-2">Unique Solution Tech</h2>
              <p>{t.bio.uniqueSol}</p>
            </div>
            
            <div className="border-l-4 border-red-500 pl-6">
              <h2 className="text-xl font-semibold text-red-400 mb-2">Shwe 13 Solution</h2>
              <p>{t.bio.shwe13}</p>
            </div>
            
            <div className="border-l-4 border-green-500 pl-6">
              <h2 className="text-xl font-semibold text-green-400 mb-2">FEARLESS & T14K</h2>
              <p>{t.bio.fearless}</p>
            </div>
            
            <div className="border-l-4 border-yellow-500 pl-6">
              <h2 className="text-xl font-semibold text-yellow-400 mb-2">T15H Community Support Group</h2>
              <p>{t.bio.t15h}</p>
            </div>
            
            <div className="border-l-4 border-purple-500 pl-6">
              <h2 className="text-xl font-semibold text-purple-400 mb-2">{language === 'en' ? 'Education & Mentorship' : language === 'ko' ? '교육 및 멘토링' : 'ပညာရေးနှင့် လမ်းညွှန်မှု'}</h2>
              <p>{t.bio.education}</p>
            </div>
            
            <div className="mt-8 p-6 bg-gray-900/50 rounded-xl border border-gray-800">
              <p className="text-lg text-blue-300 italic">{t.bio.mission}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <div id='experience' className="relative bg-black">
        <motion.div ref={sceneRef} className="relative" style={{ height: `${SCENE_HEIGHT_VH}vh`, minHeight: "140vh" }}>
          <div className="sticky top-5 h-screen flex flex-col">
            <h2 className='text-4xl sm:text-5xl font-semibold mt-5 text-center text-red-500'>
              {t.experience}
            </h2>
            <div className="flex flex-1 items-center justify-center px-6 pb-10">
              {!isMobile && (
                <div className="relative w-full max-w-5xl">
                  <div className="relative h-[6px] bg-white/15 rounded">
                    <motion.div
                      className='absolute left-0 top-0 h-[6px] bg-red-600 rounded origin-left'
                      style={{ width: lineSize }}
                    />
                  </div>
                  <div className="relative flex justify-between mt-0">
                    {experiences.map((exp, idx) => (
                      <ExperienceItem
                        key={idx}
                        exp={exp}
                        idx={idx}
                        start={idx === 0 ? 0 : thresholds[idx - 1]}
                        end={thresholds[idx]}
                        scrollYProgress={scrollYProgress}
                        layout="desktop"
                        language={language}
                      />
                    ))}
                  </div>
                </div>
              )}
              {isMobile && (
                <div className="relative w-full max-w-md">
                  <div className="absolute left-0 top-0 bottom-0 w-[6px] bg-white/15 rounded">
                    <motion.div
                      className="absolute top-0 left-0 w-[6px] bg-white rounded origin-top"
                      style={{ height: lineSize }}
                    />
                  </div>
                  <div className="relative flex flex-col gap-10 ml-10 mt-6 pb-28">
                    {experiences.map((exp, idx) => (
                      <ExperienceItem
                        key={idx}
                        exp={exp}
                        idx={idx}
                        start={idx === 0 ? 0 : thresholds[idx - 1]}
                        end={thresholds[idx]}
                        scrollYProgress={scrollYProgress}
                        layout="mobile"
                        language={language}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Experience;