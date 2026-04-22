import React, { useState } from 'react';

const AIChatBot = ({ language }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const toggleChat = () => setIsOpen(!isOpen);

  // Offline responses - no API needed!
  const getOfflineResponse = (question) => {
    const q = question.toLowerCase();
    
    const responses = {
      en: {
        hello: "Hello! Welcome to my journey from Myanmar to Japan. How can I help you?",
        japan: "Japan is amazing! The culture, food, and work ethic are unique. I love living in Tokyo!",
        myanmar: "Myanmar (Burma) is my home country. Beautiful culture, friendly people, and delicious tea!",
        work: "Working in Japan requires dedication, punctuality, and teamwork. It's challenging but rewarding!",
        life: "Life in Japan is convenient, safe, and organized. Convenience stores, trains, and seasonal events are wonderful!",
        food: "Japanese food is delicious! Sushi, ramen, tempura, and convenience store onigiri are my favorites.",
        language: "I speak Japanese, English, and Burmese. Learning Japanese is key to living well in Japan!",
        culture: "Omotenashi (hospitality), respect, and harmony are core Japanese values I've learned.",
        default: "Thanks for your message! I'm happy to share my experience living and working in Japan. Feel free to ask about culture, work, food, or daily life!"
      },
      jp: {
        hello: "こんにちは！ミャンマーから日本への私の旅へようこそ。何をお手伝いしましょうか？",
        japan: "日本は素晴らしいです！文化、食べ物、仕事の倫理は独特です。東京での生活が大好きです！",
        myanmar: "ミャンマーは私の母国です。美しい文化、親切な人々、そして美味しいお茶があります！",
        work: "日本での仕事は、献身、時間厳守、チームワークが必要です。挑戦的ですが、やりがいがあります！",
        life: "日本の生活は便利で安全で整然としています。コンビニ、電車、季節のイベントは素晴らしいです！",
        food: "日本の食べ物は美味しいです！寿司、ラーメン、天ぷら、コンビニのおにぎりが大好きです。",
        language: "日本語、英語、ミャンマー語を話せます。日本でうまく暮らすには日本語学習が鍵です！",
        culture: "おもてなし、敬意、調和は私が学んだ日本の核となる価値観です。",
        default: "メッセージありがとうございます！日本での生活と仕事の経験を共有できて嬉しいです。文化、仕事、食べ物、日常生活について聞いてくださいね！"
      }
    };

    const res = responses[language];
    
    if (q.includes('hello') || q.includes('hi') || q.includes('hey')) return res.hello;
    if (q.includes('japan') || q.includes('tokyo')) return res.japan;
    if (q.includes('myanmar') || q.includes('burma')) return res.myanmar;
    if (q.includes('work') || q.includes('job')) return res.work;
    if (q.includes('life') || q.includes('live')) return res.life;
    if (q.includes('food') || q.includes('eat')) return res.food;
    if (q.includes('language') || q.includes('speak')) return res.language;
    if (q.includes('culture') || q.includes('tradition')) return res.culture;
    
    return res.default;
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    
    // Get offline response
    const botResponse = getOfflineResponse(input);
    const botMessage = { role: 'assistant', content: botResponse };
    
    setTimeout(() => {
      setMessages(prev => [...prev, botMessage]);
    }, 300);
    
    setInput('');
  };

  return (
    <>
      <button onClick={toggleChat} className="ai-chat-button">
        <img src="/ta.jpg" alt="AI Assistant" className="ai-button-image" />
      </button>

      {isOpen && (
        <div className="ai-chat-window">
          <div className="ai-chat-header">
            <div className="header-title">
              <img src="/ta.jpg" alt="AI" className="header-avatar" />
              <span>AI Assistant (Offline Mode)</span>
            </div>
            <button onClick={toggleChat}>✖</button>
          </div>
          <div className="ai-chat-messages">
            {messages.length === 0 && (
              <div className="welcome-message">
                {language === 'en' 
                  ? '👋 Hi! Ask me about Japan, Myanmar, work, food, culture, or daily life!' 
                  : '👋 こんにちは！日本、ミャンマー、仕事、食べ物、文化、日常生活について聞いてください！'}
              </div>
            )}
            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.role}`}>
                <strong>{msg.role === 'user' ? (language === 'en' ? 'You' : 'あなた') : 'AI'}:</strong>
                <div>{msg.content}</div>
              </div>
            ))}
          </div>
          <div className="ai-chat-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder={language === 'en' ? 'Ask me about Japan...' : '日本について聞いてください...'}
            />
            <button onClick={sendMessage}>➤</button>
          </div>
        </div>
      )}

      <style>{`
        .ai-chat-button {
          position: fixed;
          bottom: 24px;
          right: 24px;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: linear-gradient(135deg, #e6671a, #f5a623);
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
          z-index: 1000;
          transition: transform 0.2s;
          padding: 0;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .ai-chat-button:hover {
          transform: scale(1.05);
        }
        .ai-button-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }
        .ai-chat-window {
          position: fixed;
          bottom: 90px;
          right: 24px;
          width: 350px;
          height: 500px;
          background: white;
          border-radius: 20px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.2);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          z-index: 1000;
        }
        .ai-chat-header {
          background: linear-gradient(135deg, #e6671a, #f5a623);
          color: white;
          padding: 12px 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: bold;
        }
        .header-title {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .header-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid white;
        }
        .ai-chat-header button {
          background: none;
          border: none;
          color: white;
          font-size: 18px;
          cursor: pointer;
        }
        .ai-chat-messages {
          flex: 1;
          padding: 12px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 8px;
          background: #f9f9f9;
        }
        .welcome-message {
          text-align: center;
          color: #888;
          padding: 20px;
          font-size: 14px;
          background: white;
          border-radius: 12px;
          margin: 10px;
        }
        .message {
          padding: 8px 12px;
          border-radius: 16px;
          max-width: 85%;
        }
        .message.user {
          background: #e6671a;
          color: white;
          align-self: flex-end;
        }
        .message.assistant {
          background: white;
          color: #333;
          align-self: flex-start;
          box-shadow: 0 1px 2px rgba(0,0,0,0.1);
        }
        .message strong {
          display: block;
          margin-bottom: 4px;
          font-size: 11px;
          opacity: 0.7;
        }
        .ai-chat-input {
          display: flex;
          padding: 10px;
          border-top: 1px solid #ddd;
          background: white;
          gap: 8px;
        }
        .ai-chat-input input {
          flex: 1;
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 24px;
          outline: none;
          font-size: 14px;
        }
        .ai-chat-input button {
          background: #e6671a;
          border: none;
          color: white;
          border-radius: 50%;
          width: 36px;
          height: 36px;
          cursor: pointer;
          font-size: 16px;
        }
        @media (max-width: 480px) {
          .ai-chat-window {
            width: 300px;
            height: 450px;
            right: 16px;
            bottom: 80px;
          }
        }
      `}</style>
    </>
  );
};

export default AIChatBot;