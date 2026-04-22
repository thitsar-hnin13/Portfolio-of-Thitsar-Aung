import React, { useState } from "react";
import Header from "../components/Header";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";
import AIChatBot from "../components/AIChatBot"; // .jsx ဖြစ်သွားပေမယ့် ဒီအတိုင်းထားလို့ရပါတယ်

const HomePage = ({ toggleTheme, theme }) => {
  const [language, setLanguage] = useState("en"); // 'en' or 'jp'
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredGallery, setHoveredGallery] = useState(null);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "jp" : "en"));
  };

  // ========== CONTENT ==========
  const content = {
    en: {
      hero: {
        title: "Living & Working in Japan",
        subtitle:
          "From Myanmar to Tokyo — culture, craft, and the beauty of everyday moments. This is my journey.",
        btnExplore: "✨ Explore my story",
        btnContact: "📩 Contact me",
      },
      life: {
        title: "🇯🇵 Life in Japan",
        working: {
          title: "💼 Working",
          desc: "Japanese work ethic, collaboration, and growing as a professional every single day.",
        },
        living: {
          title: "🏠 Living",
          desc: "Convenience stores, quiet train rides, seasonal foods — life flows differently here.",
        },
        learning: {
          title: "📖 Learning",
          desc: "Respect, punctuality, and omotenashi — lessons that change your mindset.",
        },
      },
      work: {
        title: "⚡ What I bring to the table",
        experience: {
          title: "⚙️ Experience",
          desc: "Years of expertise — delivering results with Japanese precision and Myanmar heart.",
        },
        bilingual: {
          title: "🌏 Bilingual",
          desc: "Working seamlessly between Japanese, English and Burmese to bridge cultures.",
        },
        value: {
          title: "📈 Value-driven",
          desc: "I don't just work — I create impact. Testimonials & results speak for themselves.",
        },
      },
      gallery: {
        title: "📸 Visual diary",
      },
      contact: {
        title: "💌 Let's connect",
        location: "📍 Based in Osaka, Japan",
      },
    },
    jp: {
      hero: {
        title: "日本での生活と仕事",
        subtitle:
          "ミャンマーから東京へ — 文化、職人技、そして日常の美しさ。これが私の旅です。",
        btnExplore: "✨ 私のストーリーを見る",
        btnContact: "📩 お問い合わせ",
      },
      life: {
        title: "🇯🇵 日本の生活",
        working: {
          title: "💼 仕事",
          desc: "日本の仕事倫理、協力、そして毎日プロフェッショナルとして成長すること。",
        },
        living: {
          title: "🏠 生活",
          desc: "コンビニ、静かな電車、季節の食べ物 — ここでの生活は特別な流れがあります。",
        },
        learning: {
          title: "📖 学び",
          desc: "尊敬、時間厳守、おもてなし — 考え方を変える教訓。",
        },
      },
      work: {
        title: "⚡ 私の提供できること",
        experience: {
          title: "⚙️ 経験",
          desc: "長年の専門知識 — 日本の正確さとミャンマーの心で結果を届けます。",
        },
        bilingual: {
          title: "🌏 バイリンガル",
          desc: "日本語、英語、ミャンマー語を駆使して文化の橋渡し。",
        },
        value: {
          title: "📈 価値重視",
          desc: "ただ働くだけでなく — 影響を与えます。実績が証明します。",
        },
      },
      gallery: {
        title: "📸 ビジュアル日記",
      },
      contact: {
        title: "💌 お問い合わせ",
        location: "📍 大阪、日本を拠点に活動",
      },
    },
  };

  const t = content[language];

  // Images
  const images = {
    working: "/ta.jpg",
    living: "/phone.jpg",
    learning: "/o.jpg",
    gallery: [
      "/ta.jpg",
      "/my.jpg",
      "/bkk.jpg",
      "/chrry.jpg",
      "/my.jpg",
      "/mt.jpg",
      "/lake.jpg",
      "/arr.jpg",
    ],
  };

  return (
    <>
      <Header
        toggleTheme={toggleTheme}
        theme={theme}
        toggleLanguage={toggleLanguage}
        language={language}
      />

      <main>
        <div className="container">
          {/* HERO SECTION */}
          <div className="hero">
            <h1 className="hero-title">{t.hero.title}</h1>
            <p className="hero-subtitle">{t.hero.subtitle}</p>
            <div className="hero-buttons">
              <button className="btn" onClick={() => scrollToSection("life")}>
                {t.hero.btnExplore}
              </button>
              <button
                className="btn btn-outline"
                onClick={() => scrollToSection("contact")}
              >
                {t.hero.btnContact}
              </button>
            </div>
          </div>
        </div>

        {/* LIFE SECTION */}
        <div className="section" id="life">
          <div className="container">
            <h2 className="section-title">{t.life.title}</h2>
            <div className="grid-3">
              {/* Working Card */}
              <div
                className={`card ${hoveredCard === "working" ? "hovered" : ""}`}
                onMouseEnter={() => setHoveredCard("working")}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="card-image-wrapper">
                  <img src={images.working} alt="Working" />
                  <div className="card-overlay">
                    <span className="overlay-icon">💼</span>
                    <span className="overlay-text">View More</span>
                  </div>
                </div>
                <div className="card-content">
                  <h3>{t.life.working.title}</h3>
                  <p>{t.life.working.desc}</p>
                  <button
                    className="card-btn"
                    onClick={() => scrollToSection("work")}
                  >
                    Learn More →
                  </button>
                </div>
              </div>

              {/* Living Card */}
              <div
                className={`card ${hoveredCard === "living" ? "hovered" : ""}`}
                onMouseEnter={() => setHoveredCard("living")}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="card-image-wrapper">
                  <img src={images.living} alt="Living" />
                  <div className="card-overlay">
                    <span className="overlay-icon">🏠</span>
                    <span className="overlay-text">View More</span>
                  </div>
                </div>
                <div className="card-content">
                  <h3>{t.life.living.title}</h3>
                  <p>{t.life.living.desc}</p>
                  <button
                    className="card-btn"
                    onClick={() => scrollToSection("work")}
                  >
                    Learn More →
                  </button>
                </div>
              </div>

              {/* Learning Card */}
              <div
                className={`card ${hoveredCard === "learning" ? "hovered" : ""}`}
                onMouseEnter={() => setHoveredCard("learning")}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="card-image-wrapper">
                  <img src={images.learning} alt="Learning" />
                  <div className="card-overlay">
                    <span className="overlay-icon">📖</span>
                    <span className="overlay-text">View More</span>
                  </div>
                </div>
                <div className="card-content">
                  <h3>{t.life.learning.title}</h3>
                  <p>{t.life.learning.desc}</p>
                  <button
                    className="card-btn"
                    onClick={() => scrollToSection("work")}
                  >
                    Learn More →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* WORK SECTION */}
        <div className="section section-alt" id="work">
          <div className="container">
            <h2 className="section-title">{t.work.title}</h2>
            <div className="grid-3">
              <div className="card work-card">
                <div className="work-icon">⚙️</div>
                <h3>{t.work.experience.title}</h3>
                <p>{t.work.experience.desc}</p>
                <div className="work-stats">
                  <span>5+ Years</span>
                  <span>20+ Projects</span>
                </div>
              </div>
              <div className="card work-card">
                <div className="work-icon">🌏</div>
                <h3>{t.work.bilingual.title}</h3>
                <p>{t.work.bilingual.desc}</p>
                <div className="work-stats">
                  <span>日本語</span>
                  <span>English</span>
                  <span>မြန်မာ</span>
                </div>
              </div>
              <div className="card work-card">
                <div className="work-icon">📈</div>
                <h3>{t.work.value.title}</h3>
                <p>{t.work.value.desc}</p>
                <div className="work-stats">
                  <span>98% Success</span>
                  <span>50+ Clients</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* GALLERY SECTION */}
        <div className="section" id="gallery">
          <div className="container">
            <h2 className="section-title">{t.gallery.title}</h2>
            <div className="gallery">
              {images.gallery.map((img, index) => (
                <div
                  key={index}
                  className={`gallery-item ${hoveredGallery === index ? "hovered" : ""}`}
                  onMouseEnter={() => setHoveredGallery(index)}
                  onMouseLeave={() => setHoveredGallery(null)}
                >
                  <img src={img} alt={`Gallery ${index + 1}`} />
                  <div className="gallery-overlay">
                    <span className="gallery-icon">🔍</span>
                    <span className="gallery-text">View Photo</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CONTACT SECTION with Google Map */}
        <div className="section section-alt" id="contact">
          <div className="container">
            <h2 className="section-title">{t.contact.title}</h2>
            <p className="location-badge">{t.contact.location}</p>

            <div className="contact-wrapper">
              <div className="contact-form-container">
                <ContactForm language={language} />
              </div>
              <div className="map-container">
                <div className="map-card">
                  <div className="map-header">
                    <span className="map-pin">📍</span>
                    <span>Osaka, Japan</span>
                  </div>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d129192.86631812465!2d135.403636780329!3d34.677711549856824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6000e6553406e2e1%3A0xc55bc16ee46a2fe7!2sOsaka%2C%20Japan!5e1!3m2!1sen!2smm!4v1776782032902!5m2!1sen!2smm"
                    width="100%"
                    height="280"
                    style={{ border: 0, borderRadius: "16px" }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Osaka Japan Map"
                    className="google-map"
                  ></iframe>
                </div>
              </div>
            </div>

            <div className="social-icons">
              <a href="#" className="social-link">
                LinkedIn
              </a>
              <a href="#" className="social-link">
                Instagram
              </a>
              <a href="#" className="social-link">
                GitHub
              </a>
              <a href="#" className="social-link">
                📧 hello@phuethitnge.com
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer language={language} />

      {/* AI Chat Bot */}
      <AIChatBot language={language} />

      {/* Styles for enhanced effects */}
      <style>{`
        /* Hero Title Animation */
        .hero-title {
          animation: fadeInUp 0.8s ease;
          background: linear-gradient(135deg, var(--text-primary) 30%, var(--accent) 80%);
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
        }

        /* Card Image Wrapper */
        .card-image-wrapper {
          position: relative;
          overflow: hidden;
          height: 240px;
        }

        .card-image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1);
        }

        .card.hovered .card-image-wrapper img {
          transform: scale(1.1);
        }

        /* Card Overlay */
        .card-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          opacity: 0;
          transition: all 0.4s ease;
        }

        .card.hovered .card-overlay {
          opacity: 1;
        }

        .overlay-icon {
          font-size: 2rem;
          transform: translateY(20px);
          transition: transform 0.4s ease;
        }

        .overlay-text {
          color: white;
          font-size: 0.9rem;
          font-weight: 500;
          transform: translateY(20px);
          transition: transform 0.4s ease 0.1s;
        }

        .card.hovered .overlay-icon,
        .card.hovered .overlay-text {
          transform: translateY(0);
        }

        /* Card Button */
        .card-btn {
          margin-top: 15px;
          padding: 8px 0;
          background: none;
          border: none;
          color: var(--accent);
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          opacity: 0;
          transform: translateX(-10px);
        }

        .card:hover .card-btn {
          opacity: 1;
          transform: translateX(0);
        }

        .card-btn:hover {
          gap: 8px;
          letter-spacing: 0.5px;
        }

        /* Work Cards */
        .work-card {
          text-align: center;
          transition: all 0.4s ease;
        }

        .work-card:hover {
          transform: translateY(-10px);
          border-color: var(--accent);
        }

        .work-icon {
          font-size: 3rem;
          margin-bottom: 15px;
          transition: transform 0.3s ease;
        }

        .work-card:hover .work-icon {
          transform: scale(1.1) rotate(5deg);
        }

        .work-stats {
          display: flex;
          justify-content: center;
          gap: 15px;
          margin-top: 15px;
          flex-wrap: wrap;
        }

        .work-stats span {
          background: var(--accent-light);
          padding: 5px 12px;
          border-radius: 50px;
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--accent);
        }

        /* Gallery Overlay */
        .gallery-item {
          position: relative;
          overflow: hidden;
          border-radius: 20px;
          cursor: pointer;
        }

        .gallery-item img {
          width: 100%;
          height: 280px;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .gallery-item.hovered img {
          transform: scale(1.08);
        }

        .gallery-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(230, 103, 26, 0.8), rgba(245, 166, 35, 0.8));
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          opacity: 0;
          transition: all 0.4s ease;
        }

        .gallery-item.hovered .gallery-overlay {
          opacity: 1;
        }

        .gallery-icon {
          font-size: 2rem;
          transform: scale(0);
          transition: transform 0.3s ease;
        }

        .gallery-text {
          color: white;
          font-weight: 500;
          transform: translateY(20px);
          transition: transform 0.3s ease;
        }

        .gallery-item.hovered .gallery-icon {
          transform: scale(1);
        }

        .gallery-item.hovered .gallery-text {
          transform: translateY(0);
        }

        /* Contact Section - Map Integration */
        .location-badge {
          text-align: center;
          font-size: 1rem;
          color: var(--accent);
          margin-bottom: 2rem;
          letter-spacing: 0.5px;
        }

        .contact-wrapper {
          display: flex;
          gap: 2rem;
          margin-bottom: 3rem;
          flex-wrap: wrap;
        }

        .contact-form-container {
          flex: 1.2;
          min-width: 280px;
        }

        .map-container {
          flex: 0.8;
          min-width: 280px;
        }

        .map-card {
          background: var(--card-bg);
          border-radius: 24px;
          padding: 1rem;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .map-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 16px 32px rgba(0, 0, 0, 0.12);
        }

        .map-header {
          display: flex;
          align-items: center;
          gap: 8px;
          padding-bottom: 12px;
          margin-bottom: 16px;
          border-bottom: 2px solid var(--border-color);
          font-weight: 600;
          color: var(--text-primary);
        }

        .map-pin {
          font-size: 1.2rem;
        }

        .google-map {
          transition: all 0.3s ease;
          width: 100%;
        }

        .google-map:hover {
          filter: brightness(1.02);
        }

        /* Social Links */
        .social-icons {
          display: flex;
          justify-content: center;
          gap: 2rem;
          flex-wrap: wrap;
          margin-top: 2rem;
        }

        .social-link {
          position: relative;
          text-decoration: none;
          color: var(--text-secondary);
          transition: all 0.3s ease;
          padding: 4px 0;
        }

        .social-link::before {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--accent-gradient);
          transition: width 0.3s ease;
        }

        .social-link:hover::before {
          width: 100%;
        }

        .social-link:hover {
          color: var(--accent);
          transform: translateY(-2px);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .card-image-wrapper {
            height: 200px;
          }
          
          .gallery-item img {
            height: 220px;
          }
          
          .work-stats span {
            font-size: 0.7rem;
            padding: 4px 10px;
          }
          
          .hero-title {
            font-size: 1.8rem;
          }
          
          .hero-subtitle {
            font-size: 0.95rem;
          }

          .contact-wrapper {
            flex-direction: column;
          }

          .map-card {
            padding: 0.8rem;
          }

          .google-map {
            height: 240px !important;
          }

          .social-icons {
            gap: 1rem;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default HomePage;