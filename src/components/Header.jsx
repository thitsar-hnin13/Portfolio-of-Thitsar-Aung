import React, { useState, useEffect } from 'react';

const Header = ({ toggleTheme, theme, toggleLanguage, language }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileMenuOpen(false);
    }
  };

  const navItems = [
    { id: 'life', labelEn: 'Life', labelJp: '生活', icon: '🌸' },
    { id: 'work', labelEn: 'Work', labelJp: '仕事', icon: '⚡' },
    { id: 'gallery', labelEn: 'Gallery', labelJp: 'ギャラリー', icon: '🎨' },
    { id: 'contact', labelEn: 'Connect', labelJp: '連絡', icon: '📧' },
  ];

  return (
    <>
      <header className={scrolled ? 'scrolled' : ''}>
        <div className="container">
          <nav>
            {/* Logo - Left Side */}
            <div className="logo">🇯🇵 phuethitnge.com</div>
            
            {/* Desktop Navigation - Hidden on Mobile */}
            <ul className="nav-links desktop-nav">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a onClick={() => scrollToSection(item.id)}>
                    {language === 'en' ? item.labelEn : item.labelJp}
                  </a>
                </li>
              ))}
            </ul>
            
            {/* Right Side Actions - All in one row on mobile */}
            <div className="header-actions">
              {/* Language Toggle Button */}
              <button className="lang-toggle" onClick={toggleLanguage}>
                <span className={language === 'en' ? 'active' : ''}>EN</span>
                <span className="lang-divider">/</span>
                <span className={language === 'jp' ? 'active' : ''}>JP</span>
              </button>
              
              {/* Theme Toggle Button */}
              <button className="theme-toggle" onClick={toggleTheme}>
                {theme === 'light' ? '🌙' : '☀️'}
              </button>
              
              {/* Hamburger Button */}
              <button 
                className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Menu"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'active' : ''}`}>
        <div className="mobile-menu-container">
          <div className="mobile-menu-header">
            <div className="mobile-logo">🇯🇵 phuthitnge.com</div>
            <button className="mobile-close" onClick={() => setMobileMenuOpen(false)}>✕</button>
          </div>
          
          <ul className="mobile-nav-links">
            {navItems.map((item, index) => (
              <li key={item.id} style={{ animationDelay: `${index * 0.1}s` }}>
                <button onClick={() => scrollToSection(item.id)}>
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">
                    {language === 'en' ? item.labelEn : item.labelJp}
                  </span>
                  <span className="nav-arrow">→</span>
                </button>
              </li>
            ))}
          </ul>
          
          <div className="mobile-menu-footer">
            <div className="mobile-social">
              <a href="#">Instagram</a>
              <a href="#">LinkedIn</a>
              <a href="#">GitHub</a>
            </div>
            <p className="mobile-copyright">© 2026 · Life in Japan</p>
          </div>
        </div>
      </div>

      <style>{`
        header {
          padding: 16px 0;
          border-bottom: 1px solid var(--border-color);
          background-color: var(--header-bg);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          position: sticky;
          top: 0;
          z-index: 100;
          transition: all 0.3s ease;
        }

        header.scrolled {
          padding: 10px 0;
          box-shadow: var(--shadow-md);
        }

        nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }

        /* Logo */
        .logo {
          font-size: 1.2rem;
          font-weight: 700;
          background: var(--accent-gradient);
          background-size: 200% auto;
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          animation: shimmer 3s linear infinite;
          white-space: nowrap;
        }

        @keyframes shimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        /* Desktop Navigation */
        .desktop-nav {
          display: flex;
          gap: 32px;
          list-style: none;
        }

        .desktop-nav a {
          text-decoration: none;
          font-weight: 500;
          color: var(--text-primary);
          cursor: pointer;
          position: relative;
          font-size: 0.95rem;
        }

        .desktop-nav a::before {
          content: "";
          position: absolute;
          bottom: -6px;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--accent-gradient);
          transition: width 0.3s ease;
          border-radius: 2px;
        }

        .desktop-nav a:hover::before {
          width: 100%;
        }

        .desktop-nav a:hover {
          color: var(--accent);
        }

        /* Header Actions - All in one row */
        .header-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        /* Language Toggle Button */
        .lang-toggle {
          background: var(--accent-light);
          border: 1px solid var(--border-color);
          border-radius: 40px;
          padding: 7px 12px;
          cursor: pointer;
          font-size: 0.75rem;
          font-weight: 600;
          transition: all 0.3s ease;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          gap: 2px;
        }

        .lang-toggle span {
          transition: all 0.2s ease;
        }

        .lang-toggle span.active {
          color: var(--accent);
          font-weight: 700;
        }

        .lang-divider {
          margin: 0 2px;
          color: var(--text-secondary);
          font-size: 0.7rem;
        }

        .lang-toggle:hover {
          transform: scale(1.05);
          background: var(--accent);
          color: white;
        }

        .lang-toggle:hover span.active {
          color: white;
        }

        /* Theme Toggle Button */
        .theme-toggle {
          background: var(--accent-light);
          border: 1px solid var(--border-color);
          border-radius: 40px;
          padding: 7px 12px;
          cursor: pointer;
          font-size: 1rem;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .theme-toggle:hover {
          transform: scale(1.05);
          background: var(--accent);
          color: white;
        }

        /* Hamburger Menu */
        .hamburger {
          display: none;
          flex-direction: column;
          justify-content: space-between;
          width: 26px;
          height: 18px;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0;
        }

        .hamburger span {
          width: 100%;
          height: 2px;
          background: var(--text-primary);
          border-radius: 2px;
          transition: all 0.3s ease;
        }

        .hamburger.active span:nth-child(1) {
          transform: translateY(8px) rotate(45deg);
        }

        .hamburger.active span:nth-child(2) {
          opacity: 0;
        }

        .hamburger.active span:nth-child(3) {
          transform: translateY(-8px) rotate(-45deg);
        }

        /* Mobile Menu Overlay */
        .mobile-menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(5px);
          z-index: 200;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
        }

        .mobile-menu-overlay.active {
          opacity: 1;
          visibility: visible;
        }

        .mobile-menu-container {
          position: fixed;
          top: 0;
          right: 0;
          width: 80%;
          max-width: 320px;
          height: 100%;
          background: var(--bg-primary);
          box-shadow: -5px 0 30px rgba(0, 0, 0, 0.2);
          transform: translateX(100%);
          transition: transform 0.4s cubic-bezier(0.2, 0.9, 0.4, 1.1);
          display: flex;
          flex-direction: column;
        }

        .mobile-menu-overlay.active .mobile-menu-container {
          transform: translateX(0);
        }

        .mobile-menu-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          border-bottom: 1px solid var(--border-color);
        }

        .mobile-logo {
          font-size: 1rem;
          font-weight: 700;
          background: var(--accent-gradient);
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
        }

        .mobile-close {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--accent-light);
          border: none;
          font-size: 1.2rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .mobile-close:hover {
          background: var(--accent);
          color: white;
          transform: rotate(90deg);
        }

        .mobile-nav-links {
          flex: 1;
          list-style: none;
          padding: 20px;
          margin: 0;
        }

        .mobile-nav-links li {
          margin-bottom: 8px;
          animation: slideInRight 0.4s ease forwards;
          opacity: 0;
          transform: translateX(30px);
        }

        @keyframes slideInRight {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .mobile-nav-links button {
          width: 100%;
          padding: 16px 20px;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: 16px;
          display: flex;
          align-items: center;
          gap: 15px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: inherit;
        }

        .mobile-nav-links button:hover {
          background: var(--accent-light);
          border-color: var(--accent);
          transform: translateX(5px);
        }

        .nav-icon {
          font-size: 1.3rem;
        }

        .nav-label {
          flex: 1;
          font-size: 1rem;
          font-weight: 500;
          color: var(--text-primary);
          text-align: left;
        }

        .nav-arrow {
          color: var(--accent);
          opacity: 0;
          transform: translateX(-10px);
          transition: all 0.3s ease;
        }

        .mobile-nav-links button:hover .nav-arrow {
          opacity: 1;
          transform: translateX(0);
        }

        .mobile-menu-footer {
          padding: 20px;
          border-top: 1px solid var(--border-color);
          text-align: center;
        }

        .mobile-social {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-bottom: 15px;
        }

        .mobile-social a {
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 0.85rem;
          transition: all 0.3s ease;
        }

        .mobile-social a:hover {
          color: var(--accent);
        }

        .mobile-copyright {
          font-size: 0.7rem;
          color: var(--text-secondary);
          margin: 0;
        }

        /* ========== RESPONSIVE ========== */
        /* Mobile View (max-width: 768px) */
        @media (max-width: 768px) {
          .desktop-nav {
            display: none;
          }

          .hamburger {
            display: flex;
          }

          .logo {
            font-size: 0.95rem;
            max-width: 150px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .header-actions {
            gap: 8px;
          }

          .lang-toggle {
            padding: 6px 10px;
            font-size: 0.7rem;
          }

          .theme-toggle {
            padding: 6px 10px;
            font-size: 0.9rem;
          }

          .hamburger {
            width: 24px;
            height: 16px;
          }

          .hamburger.active span:nth-child(1) {
            transform: translateY(7px) rotate(45deg);
          }

          .hamburger.active span:nth-child(3) {
            transform: translateY(-7px) rotate(-45deg);
          }
        }

        /* Small Mobile (max-width: 480px) */
        @media (max-width: 480px) {
          .logo {
            font-size: 0.85rem;
            max-width: 130px;
          }

          .lang-toggle {
            padding: 5px 8px;
            font-size: 0.65rem;
          }

          .theme-toggle {
            padding: 5px 8px;
            font-size: 0.85rem;
          }

          .header-actions {
            gap: 6px;
          }
        }

        /* Tablet View (769px - 1024px) */
        @media (min-width: 769px) and (max-width: 1024px) {
          .desktop-nav {
            gap: 20px;
          }
          
          .desktop-nav a {
            font-size: 0.85rem;
          }
          
          .logo {
            font-size: 1rem;
          }
        }
      `}</style>
    </>
  );
};

export default Header;
