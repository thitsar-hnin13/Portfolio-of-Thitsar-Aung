import React, { useState, useRef, useEffect } from 'react';

const ThitsarAungChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [language, setLanguage] = useState('my'); // 'my', 'en', 'ko'
  const messagesEndRef = useRef(null);

  // Language translations
  const translations = {
    my: {
      botName: "သစ္စာအောင် Bot",
      welcome: "မင်္ဂလာပါ",
      welcomeText: "ကျွန်တော် သစ္စာအောင်အကြောင်း သိချင်တာလေးတွေ အောက်က မေးခွန်းလေးတွေထဲက ရွေးမေးလိုက်ပါ။",
      who: "👤 ဘယ်သူလဲ",
      companies: "💼 ကုမ္ပဏီ",
      communities: "👥 အသိုက်အဝန်း",
      teaching: "📚 သင်ကြားရေး",
      mission: "🎯 ရည်မှန်းချက်",
      location: "📍 နေရာ",
      skills: "🛠️ အခြားကျွမ်းကျင်မှုများ",
      reset: "↻ အသစ်ပြန်မေးမည်",
      languageLabel: "ဘာသာစကား"
    },
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
      skills: "🛠️ Additional Skills",
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
      skills: "🛠️ 추가 기술",
      reset: "↻ 재설정",
      languageLabel: "언어"
    }
  };

  // ကိုယ်ရေးအချက်အလက် knowledge base (ကိုရီးယားနာမည် ပြင်ထား)
  const aboutThitsar = {
    name: {
      my: "သစ္စာအောင်",
      en: "Thitsar Aung",
      ko: "띳싸아웅"
    },
    location: {
      my: "ရန်ကုန်၊ မြန်မာ",
      en: "Yangon, Myanmar",
      ko: "양곤, 미얀마"
    },
    roles: {
      my: ["တည်ထောင်သူ", "ထုတ်ကုန်ဖန်တီးသူ", "ဝဘ်ဆော့ဖ်ဝဲရေး"],
      en: ["Founder", "Product Builder", "Web Developer"],
      ko: ["창립자", "제품 개발자", "웹 개발자"]
    },
    mission: {
      my: "တကယ့်လက်တွေ့ကမ္ဘာသုံး ဒစ်ဂျစ်တယ်ဖြေရှင်းချက်တွေနဲ့ ခေတ်မီ web application တွေကို တည်ဆောက်ပေးခြင်း",
      en: "Building real-world digital solutions and modern web applications",
      ko: "실용적인 디지털 솔루션과 현대적인 웹 애플리케이션 구축"
    },
    companies: [
      {
        name: "Unique Solution Tech",
        description: {
          my: "ခေတ်မီ website တွေ၊ digital platform တွေနဲ့ web-based စနစ်တွေကို တည်ဆောက်ပေးတဲ့ နည်းပညာကုမ္ပဏီ",
          en: "Tech company building modern websites, digital platforms, and web-based systems",
          ko: "현대적인 웹사이트, 디지털 플랫폼 및 웹 기반 시스템을 구축하는 기술 회사"
        }
      },
      {
        name: "Shwe 13 Solution",
        description: {
          my: "ဖက်ရှင်နဲ့ လူနေမှုဘဝဆိုင်ရာ ထုတ်ကုန်တွေကို အာရုံစိုက်တဲ့ ဒေသခံအမှတ်တံဆိပ်ကုမ္ပဏီ",
          en: "Local brand company focusing on fashion and lifestyle products",
          ko: "패션 및 라이프스타일 제품에 중점을 둔 현지 브랜드 회사"
        }
      }
    ],
    communities: [
      {
        name: "FEARLESS – Fired Bike Group",
        description: {
          my: "fixed-gear စက်ဘီးအသိုက်အဝန်း",
          en: "fixed-gear cycling community",
          ko: "픽스드기어 사이클링 커뮤니티"
        }
      },
      {
        name: "T14K",
        description: {
          my: "fixed-gear စက်ဘီးစီးယဉ်ကျေးမှုကို မြှင့်တင်ရေး",
          en: "promoting fixed-gear cycling culture",
          ko: "픽스드기어 사이클링 문화 발전"
        }
      },
      {
        name: "T15H Community Support Group",
        description: {
          my: "လူမှုကူညီရေးအဖွဲ့",
          en: "community support group",
          ko: "지역사회 지원 그룹"
        }
      }
    ],
    passions: {
      my: ["Web Engineering", "Programming", "Mentorship", "ဘာသာစကား သင်ကြားရေး"],
      en: ["Web Engineering", "Programming", "Mentorship", "Language Teaching"],
      ko: ["웹 엔지니어링", "프로그래밍", "멘토링", "언어 교육"]
    },
    additionalSkills: {
      my: [
        "📡 Network Design - ကွန်ရက်ဒီဇိုင်းနှင့် အခြေခံသဘောတရားများ",
        "💻 A+ Computer Hardware - ကွန်ပျူတာ ဟာ့ဒ်ဝဲ ပြုပြင်ထိန်းသိမ်းမှု",
        "🎨 Graphic Design & Video Editing - ဂရပ်ဖစ်ဒီဇိုင်းနှင့် ဗီဒီယိုတည်းဖြတ်ခြင်း",
        "🔐 Cybersecurity - ဆိုက်ဘာလုံခြုံရေး အခြေခံအသိပညာများ",
        "💰 Accounting (ACCA, LCCI) - စာရင်းကိုင်ပညာနှင့် ငွေကြေးစီမံခန့်ခွဲမှု",
        "🗣️ ဂျပန်၊ ကိုရီးယား၊ အင်္ဂလိပ်ဘာသာစကား"
      ],
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
      my: "ထိရောက်တဲ့ ဒစ်ဂျစ်တယ်ထုတ်ကုန်တွေ တည်ဆောက်ခြင်း၊ ဆန်းသစ်တဲ့ စီးပွားရေးလုပ်ငန်းတွေ ဖွံ့ဖြိုးအောင်လုပ်ခြင်း၊ လူတွေကို သင်ယူဖို့၊ ပူးပေါင်းဆောင်ရွက်ဖို့၊ အတူတကွ ရှေ့သို့တိုးဖို့ လှုံ့ဆော်ပေးတဲ့ အသိုက်အဝန်းတွေ ဖန်တီးခြင်း",
      en: "Building impactful digital products, growing innovative businesses, and creating communities that inspire people to learn, collaborate, and move forward together",
      ko: "영향력 있는 디지털 제품 구축, 혁신적인 비즈니스 성장, 사람들이 배우고 협력하며 함께 나아갈 수 있도록 영감을 주는 커뮤니티 만들기"
    }
  };

  // အမေးအဖြေ dictionary
  const getAnswers = (lang) => ({
    about: `${translations[lang].welcome}!\n\n저는 ${aboutThitsar.name[lang]}입니다.\n\n${aboutThitsar.roles[lang].join(', ')}이며 ${aboutThitsar.location[lang]}에 살고 있습니다.`,
    
    companies: `${translations[lang].companies.replace(/[💼👤👥📚🎯📍🛠️]/g, '').trim()}\n\n▪️ ${aboutThitsar.companies[0].name}\n  ${aboutThitsar.companies[0].description[lang]}\n\n▪️ ${aboutThitsar.companies[1].name}\n  ${aboutThitsar.companies[1].description[lang]}`,
    
    communities: `${translations[lang].communities.replace(/[💼👤👥📚🎯📍🛠️]/g, '').trim()}\n\n▪️ ${aboutThitsar.communities[0].name}\n  ${aboutThitsar.communities[0].description[lang]}\n\n▪️ ${aboutThitsar.communities[1].name}\n  ${aboutThitsar.communities[1].description[lang]}\n\n▪️ ${aboutThitsar.communities[2].name}\n  ${aboutThitsar.communities[2].description[lang]}`,
    
    teach: `${translations[lang].teaching.replace(/[💼👤👥📚🎯📍🛠️]/g, '').trim()}\n\n▪️ ${aboutThitsar.passions[lang].join('\n▪️ ')}`,
    
    mission: `${translations[lang].mission.replace(/[💼👤👥📚🎯📍🛠️]/g, '').trim()}\n\n${aboutThitsar.mission[lang]}\n\n${aboutThitsar.philosophy[lang]}`,
    
    location: `${translations[lang].location.replace(/[💼👤👥📚🎯📍🛠️]/g, '').trim()}\n\n${aboutThitsar.location[lang]}`,
    
    skills: `${translations[lang].skills.replace(/[💼👤👥📚🎯📍🛠️]/g, '').trim()}\n\n${aboutThitsar.additionalSkills[lang].join('\n')}`
  });

  // အဆင်သင့်မေးခွန်း ၇ ခု
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

  // Dark Mode Colors
  const darkColors = {
    bg: '#0A0A0F',
    surface: '#14141F',
    textBlue: '#4A9EFF',
    textBlueLight: '#7AB8FF',
    borderRed: '#FF4D4D',
    borderRedLight: '#FF7777',
    accentPurple: '#9D4DFF',
    textWhite: '#FFFFFF'
  };

  // Responsive Styles
  const chatStyles = {
    fab: {
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      width: '56px',
      height: '56px',
      borderRadius: '50%',
      background: darkColors.accentPurple,
      color: darkColors.textWhite,
      border: 'none',
      cursor: 'pointer',
      boxShadow: '0 4px 15px rgba(157, 77, 255, 0.4)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '24px',
      transition: 'all 0.3s ease',
      zIndex: 1000,
      '@media (min-width: 768px)': {
        bottom: '30px',
        right: '30px',
        width: '60px',
        height: '60px',
        fontSize: '28px',
      }
    },
    popup: {
      position: 'fixed',
      bottom: '80px',
      right: '20px',
      width: 'calc(100vw - 40px)',
      maxWidth: '400px',
      height: '70vh',
      maxHeight: '600px',
      background: darkColors.bg,
      borderRadius: '20px',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)',
      display: isOpen ? 'flex' : 'none',
      flexDirection: 'column',
      overflow: 'hidden',
      zIndex: 1000,
      animation: 'slideIn 0.25s ease-out',
      border: `2px solid ${darkColors.borderRed}`,
      '@media (min-width: 768px)': {
        bottom: '100px',
        right: '30px',
        width: '400px',
        height: '600px',
      }
    },
    header: {
      background: darkColors.surface,
      color: darkColors.textBlue,
      padding: '12px 16px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: `1px solid ${darkColors.borderRed}`,
      '@media (min-width: 768px)': {
        padding: '16px 20px',
      }
    },
    headerTitle: {
      margin: 0,
      fontSize: '16px',
      fontWeight: '600',
      letterSpacing: '0.3px',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      color: darkColors.textBlue,
      '@media (min-width: 768px)': {
        fontSize: '18px',
        gap: '8px',
      }
    },
    closeBtn: {
      background: 'transparent',
      border: `1px solid ${darkColors.borderRed}`,
      color: darkColors.textBlue,
      fontSize: '18px',
      cursor: 'pointer',
      padding: '0',
      width: '28px',
      height: '28px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.2s',
      '@media (min-width: 768px)': {
        width: '32px',
        height: '32px',
        fontSize: '20px',
      }
    },
    languageBar: {
      display: 'flex',
      gap: '6px',
      padding: '8px 16px',
      background: darkColors.surface,
      borderBottom: `1px solid ${darkColors.borderRed}`,
      flexWrap: 'wrap',
      '@media (min-width: 768px)': {
        gap: '8px',
        padding: '10px 20px',
      }
    },
    languageBtn: (lang) => ({
      background: language === lang ? darkColors.borderRed : 'transparent',
      border: `1px solid ${darkColors.borderRed}`,
      color: language === lang ? darkColors.textWhite : darkColors.textBlue,
      padding: '4px 10px',
      borderRadius: '14px',
      fontSize: '11px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s',
      flex: '1',
      maxWidth: '70px',
      '@media (min-width: 768px)': {
        padding: '4px 12px',
        fontSize: '12px',
        maxWidth: '80px',
      }
    }),
    content: {
      flex: 1,
      padding: '16px',
      overflowY: 'auto',
      background: darkColors.bg,
      color: darkColors.textBlue,
      '@media (min-width: 768px)': {
        padding: '20px',
      }
    },
    welcomeMessage: {
      background: darkColors.surface,
      padding: '14px',
      borderRadius: '14px',
      marginBottom: '16px',
      border: `1px solid ${darkColors.borderRed}`,
      color: darkColors.textBlue,
      '@media (min-width: 768px)': {
        padding: '16px',
        marginBottom: '20px',
      }
    },
    welcomeText: {
      margin: 0,
      fontSize: '13px',
      lineHeight: '1.6',
      color: darkColors.textBlue,
      '@media (min-width: 768px)': {
        fontSize: '14px',
      }
    },
    questionGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '10px',
      marginBottom: '16px',
      '@media (min-width: 768px)': {
        gap: '12px',
        marginBottom: '20px',
      }
    },
    questionButton: (isSelected) => ({
      padding: '10px 6px',
      border: `2px solid ${isSelected ? darkColors.borderRed : darkColors.borderRedLight}`,
      borderRadius: '12px',
      background: isSelected ? darkColors.borderRed : 'transparent',
      color: isSelected ? darkColors.textWhite : darkColors.textBlue,
      fontSize: '11px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s',
      boxShadow: isSelected ? `0 4px 10px ${darkColors.borderRed}40` : 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      minHeight: '50px',
      lineHeight: '1.3',
      backdropFilter: 'blur(5px)',
      wordBreak: 'break-word',
      '@media (min-width: 768px)': {
        padding: '12px 8px',
        fontSize: '13px',
        minHeight: '65px',
      }
    }),
    messagesArea: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      '@media (min-width: 768px)': {
        gap: '12px',
      }
    },
    botMessage: {
      background: darkColors.surface,
      padding: '12px 14px',
      borderRadius: '16px 16px 16px 4px',
      border: `1px solid ${darkColors.borderRed}`,
      maxWidth: '100%',
      alignSelf: 'flex-start',
      position: 'relative',
      color: darkColors.textBlue,
      '@media (min-width: 768px)': {
        padding: '14px 16px',
      }
    },
    botMessageQuestion: {
      fontSize: '9px',
      color: darkColors.borderRed,
      fontWeight: '700',
      marginBottom: '6px',
      textTransform: 'uppercase',
      letterSpacing: '0.4px',
      '@media (min-width: 768px)': {
        fontSize: '10px',
        marginBottom: '8px',
      }
    },
    botMessageText: {
      margin: 0,
      fontSize: '12px',
      color: darkColors.textBlue,
      lineHeight: '1.6',
      whiteSpace: 'pre-wrap',
      '@media (min-width: 768px)': {
        fontSize: '13px',
        lineHeight: '1.7',
      }
    },
    resetButton: {
      background: 'transparent',
      border: `2px solid ${darkColors.borderRed}`,
      color: darkColors.textBlue,
      padding: '10px 16px',
      borderRadius: '24px',
      fontSize: '13px',
      fontWeight: '600',
      cursor: 'pointer',
      marginTop: '14px',
      width: '100%',
      transition: 'all 0.2s',
      letterSpacing: '0.3px',
      '@media (min-width: 768px)': {
        padding: '12px 18px',
        fontSize: '14px',
        marginTop: '16px',
      }
    }
  };

  // Media query styles ကို style tag ထဲမှာ ထည့်မယ်
  const mediaStyles = `
    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(15px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    * {
      scrollbar-width: thin;
      scrollbar-color: ${darkColors.borderRed} ${darkColors.surface};
    }
    
    *::-webkit-scrollbar {
      width: 4px;
    }
    
    *::-webkit-scrollbar-track {
      background: ${darkColors.surface};
    }
    
    *::-webkit-scrollbar-thumb {
      background-color: ${darkColors.borderRed};
      border-radius: 20px;
    }

    @media (min-width: 768px) {
      *::-webkit-scrollbar {
        width: 6px;
      }
    }
  `;

  return (
    <>
      <style>{mediaStyles}</style>

      <button 
        style={chatStyles.fab}
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = `0 6px 20px ${darkColors.borderRed}80`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 15px rgba(157, 77, 255, 0.4)';
        }}
      >
        {isOpen ? '✕' : '💬'}
      </button>

      <div style={chatStyles.popup}>
        <div style={chatStyles.header}>
          <h3 style={chatStyles.headerTitle}>
            <span>⚡</span> {translations[language].botName}
          </h3>
          <button 
            style={chatStyles.closeBtn} 
            onClick={handleClose}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = darkColors.borderRed;
              e.currentTarget.style.color = darkColors.textWhite;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = darkColors.textBlue;
            }}
          >
            ✕
          </button>
        </div>

        {/* Language Selector */}
        <div style={chatStyles.languageBar}>
          <button 
            style={chatStyles.languageBtn('my')}
            onClick={() => changeLanguage('my')}
          >
            မြန်မာ
          </button>
          <button 
            style={chatStyles.languageBtn('en')}
            onClick={() => changeLanguage('en')}
          >
            English
          </button>
          <button 
            style={chatStyles.languageBtn('ko')}
            onClick={() => changeLanguage('ko')}
          >
            한국어
          </button>
        </div>

        <div style={chatStyles.content}>
          <div style={chatStyles.welcomeMessage}>
            <p style={chatStyles.welcomeText}>
              <strong>{translations[language].welcome}</strong><br />
              {translations[language].welcomeText}
            </p>
          </div>

          <div style={chatStyles.questionGrid}>
            {getQuickQuestions(language).map(q => (
              <button
                key={q.id}
                style={chatStyles.questionButton(selectedQuestion === q.id)}
                onClick={() => handleQuestionClick(q)}
                onMouseEnter={(e) => {
                  if (selectedQuestion !== q.id) {
                    e.currentTarget.style.borderColor = darkColors.borderRed;
                    e.currentTarget.style.background = darkColors.surface;
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedQuestion !== q.id) {
                    e.currentTarget.style.borderColor = darkColors.borderRedLight;
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                {q.text}
              </button>
            ))}
          </div>

          {messages.length > 0 && (
            <div style={chatStyles.messagesArea}>
              {messages.map(msg => (
                <div key={msg.id} style={chatStyles.botMessage}>
                  <div style={chatStyles.botMessageQuestion}>
                    {msg.question}
                  </div>
                  <p style={chatStyles.botMessageText}>{msg.text}</p>
                </div>
              ))}
            </div>
          )}

          {messages.length > 0 && (
            <button 
              style={chatStyles.resetButton}
              onClick={handleReset}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = darkColors.borderRed;
                e.currentTarget.style.color = darkColors.textWhite;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = darkColors.textBlue;
              }}
            >
              {translations[language].reset}
            </button>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
    </>
  );
};

export default ThitsarAungChat;