import React from 'react';

const Footer = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const footerLinks = [
    { 
      title: "Explore", 
      links: [
        { name: "🇯🇵 Life", action: () => scrollToSection('life') },
        { name: "💼 Work", action: () => scrollToSection('work') },
        { name: "📸 Gallery", action: () => scrollToSection('gallery') },
        { name: "💌 Connect", action: () => scrollToSection('contact') }
      ]
    },
    { 
      title: "Resources", 
      links: [
        { name: "Blog", url: "#" },
        { name: "Travel Tips", url: "#" },
        { name: "Japanese Culture", url: "#" },
        { name: "FAQ", url: "#" }
      ]
    },
    { 
      title: "Social", 
      links: [
        { name: "Instagram", url: "#" },
        { name: "LinkedIn", url: "#" },
        { name: "GitHub", url: "#" },
        { name: "Twitter", url: "#" }
      ]
    },
    { 
      title: "Contact", 
      links: [
        { name: "📧 hello@phuethitnge.com", url: "mailto:hello@phuthitnge.com" },
        { name: "📍 Tokyo, Japan", url: "#" },
        { name: "📱 +81 XX-XXXX-XXXX", url: "#" }
      ]
    }
  ];

  return (
    <footer className="premium-footer">
      <div className="container">
        {/* Footer Grid */}
        <div className="footer-grid">
          {footerLinks.map((column, idx) => (
            <div key={idx} className="footer-col">
              <h4>{column.title}</h4>
              <ul>
                {column.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    {link.action ? (
                      <button onClick={link.action} className="footer-btn">
                        {link.name}
                      </button>
                    ) : (
                      <a href={link.url} target="_blank" rel="noopener noreferrer">
                        {link.name}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="footer-newsletter">
          <p>✨ Subscribe to my newsletter</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Your email address" />
            <button>Subscribe</button>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <p>© 2026 Phue Thit Nge · Based in Japan · 人生は旅だ</p>
          <div className="footer-legal">
            <a href="#">Privacy</a>
            <span>•</span>
            <a href="#">Terms</a>
            <span>•</span>
            <a href="#">Cookies</a>
          </div>
        </div>
      </div>

      <style>{`
        .premium-footer {
          background: var(--bg-secondary);
          border-top: 1px solid var(--border-color);
          padding: 50px 0 30px;
          margin-top: 40px;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 40px;
          margin-bottom: 50px;
        }

        .footer-col h4 {
          color: var(--accent);
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 20px;
          position: relative;
          display: inline-block;
        }

        .footer-col h4::after {
          content: '';
          position: absolute;
          bottom: -6px;
          left: 0;
          width: 35px;
          height: 2px;
          background: var(--accent-gradient);
          border-radius: 2px;
          transition: width 0.3s ease;
        }

        .footer-col:hover h4::after {
          width: 60px;
        }

        .footer-col ul {
          list-style: none;
          padding: 0;
        }

        .footer-col li {
          margin-bottom: 12px;
        }

        .footer-col a,
        .footer-btn {
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 0.9rem;
          transition: all 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1);
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          font-family: inherit;
        }

        .footer-col a:hover,
        .footer-btn:hover {
          color: var(--accent);
          transform: translateX(6px);
          display: inline-block;
        }

        /* Newsletter Section */
        .footer-newsletter {
          text-align: center;
          padding: 30px 0;
          border-top: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
          margin-bottom: 30px;
        }

        .footer-newsletter p {
          color: var(--text-primary);
          font-weight: 500;
          margin-bottom: 15px;
        }

        .newsletter-form {
          display: flex;
          justify-content: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .newsletter-form input {
          padding: 12px 20px;
          border-radius: 50px;
          border: 1px solid var(--border-color);
          background: var(--bg-primary);
          color: var(--text-primary);
          width: 260px;
          font-family: inherit;
          transition: all 0.3s ease;
        }

        .newsletter-form input:focus {
          outline: none;
          border-color: var(--accent);
          box-shadow: 0 0 0 3px rgba(230, 103, 26, 0.1);
        }

        .newsletter-form button {
          padding: 12px 28px;
          border-radius: 50px;
          border: none;
          background: var(--accent-gradient);
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .newsletter-form button:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(230, 103, 26, 0.3);
        }

        /* Bottom Section */
        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 15px;
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .footer-legal {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .footer-legal a {
          color: var(--text-secondary);
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .footer-legal a:hover {
          color: var(--accent);
        }

        .footer-legal span {
          color: var(--accent);
          opacity: 0.5;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .premium-footer {
            padding: 40px 0 25px;
          }
          
          .footer-grid {
            gap: 30px;
            text-align: center;
          }
          
          .footer-col h4::after {
            left: 50%;
            transform: translateX(-50%);
          }
          
          .footer-col a:hover,
          .footer-btn:hover {
            transform: translateX(0) scale(1.05);
          }
          
          .footer-bottom {
            flex-direction: column;
            text-align: center;
          }
          
          .newsletter-form input {
            width: 100%;
            max-width: 280px;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;