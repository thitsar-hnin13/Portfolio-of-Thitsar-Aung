import { useState, useEffect } from "react";
import ParticlesBackground from "../components/ParticlesBackground";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import xi from "../assets/xi.png";

const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;

// Language translations (English & Korean only)
const translations = {
  en: {
    title: "Let's Work Together",
    subtitle: "Have a project in mind? Let's discuss and bring your ideas to life!",
    name: "Your Name",
    email: "Your Email",
    service: "Service Needed",
    budget: "Budget",
    idea: "Explain Your Idea",
    send: "Send Message",
    sending: "Sending...",
    success: "✅ Message sent successfully! I'll get back to you soon.",
    error: "❌ Something went wrong. Please try again.",
    placeholderName: "John Doe",
    placeholderEmail: "john@example.com",
    placeholderBudget: "e.g., $1,000 - $5,000",
    placeholderIdea: "Tell me about your project, goals, and vision...",
    selectService: "Select a service...",
    serviceLocal: "🏷️ Local Brand",
    serviceProduct: "📦 Product",
    serviceWeb: "💻 Web Development",
    serviceMobile: "📱 Mobile Application",
    serviceOthers: "✨ Others",
    required: "This field is required",
    emailContact: "thitsar@example.com",
    phone: "+95 978 1360 700",
    responseTime: "I'll respond within 24 hours",
  },
  ko: {
    title: "함께 작업해요",
    subtitle: "진행 중인 프로젝트가 있나요? 아이디어를 논의하고 실현합시다!",
    name: "이름",
    email: "이메일",
    service: "필요한 서비스",
    budget: "예산",
    idea: "아이디어 설명",
    send: "메시지 보내기",
    sending: "보내는 중...",
    success: "✅ 메시지가 성공적으로 전송되었습니다! 곧 연락드리겠습니다.",
    error: "❌ 문제가 발생했습니다. 다시 시도해주세요.",
    placeholderName: "홍길동",
    placeholderEmail: "hong@example.com",
    placeholderBudget: "예: $1,000 - $5,000",
    placeholderIdea: "프로젝트, 목표 및 비전에 대해 알려주세요...",
    selectService: "서비스를 선택하세요...",
    serviceLocal: "🏷️ 로컬 브랜드",
    serviceProduct: "📦 제품",
    serviceWeb: "💻 웹 개발",
    serviceMobile: "📱 모바일 앱",
    serviceOthers: "✨ 기타",
    required: "필수 입력 항목입니다",
    emailContact: "thitsar@example.com",
    phone: "+95 978 1360 700",
    responseTime: "24시간 이내에 답변드리겠습니다",
  }
};

const Contact = () => {
  const [language, setLanguage] = useState("en");
  const t = translations[language];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    budget: "",
    idea: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "budget" && value < 0 && !/^\d*$/.test(value)) return;
    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const validateForm = () => {
    const required = ["name", "email", "service", "idea"];
    const newErrors = {};
    required.forEach(
      (f) => !formData[f].trim() && (newErrors[f] = t.required),
    );
    if (formData.service !== "Others" && !formData.budget.trim())
      newErrors.budget = t.required;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setStatus("sending");

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: formData.name,
          reply_to: formData.email,
          service: formData.service,
          budget: formData.budget,
          idea: formData.idea,
        },
        PUBLIC_KEY,
      );

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        service: "",
        budget: "",
        idea: "",
      });
      setTimeout(() => setStatus(""), 5000);
    } catch (err) {
      console.error("EMAILJS Error", err);
      setStatus("error");
      setTimeout(() => setStatus(""), 5000);
    }
  };

  // Language selector - English & Korean only
  const LanguageSelector = () => (
    <div className="fixed top-5 right-5 z-50 flex gap-2">
      {[
        { code: "en", label: "English", flag: "🇬🇧" },
        { code: "ko", label: "한국어", flag: "🇰🇷" }
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

  return (
    <div
      id="contact"
      className="w-full min-h-screen relative bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 overflow-hidden py-16 sm:py-20 px-5 sm:px-6 md:px-10 flex flex-col md:flex-row items-center gap-8 md:gap-10"
    >
      {/* Language Selector */}
      <LanguageSelector />

      {/* Gold Background Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-amber-200/40 blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-yellow-100/40 blur-3xl animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-amber-100/30 blur-3xl" />
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

      <div className="relative z-10 w-full flex flex-col md:flex-row items-center gap-8 md:gap-10 max-w-6xl mx-auto">
        {/* Left Side - Image */}
        <motion.div
          className="w-full md:w-1/2 flex justify-center"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.img
            src={xi}
            alt="contact"
            className="w-56 sm:w-64 md:w-80 lg:w-96 rounded-2xl shadow-xl object-cover"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 20px 40px rgba(212,175,55,0.25)",
            }}
          />
        </motion.div>

        {/* Right Side - Contact Form */}
        <motion.div
          className="w-full md:w-1/2 bg-white/90 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-xl border border-amber-200"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-amber-600 to-purple-700 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {t.title}
          </motion.h2>
          <motion.p
            className="text-gray-500 mb-6 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {t.subtitle}
          </motion.p>

          <form className="flex flex-col gap-4 sm:gap-5" onSubmit={handleSubmit}>
            {/* Name Field */}
            <motion.div
              className="flex flex-col"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <label className="mb-1 sm:mb-2 text-xs sm:text-sm font-medium text-gray-700">
                {t.name} <span className="text-amber-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder={t.placeholderName}
                value={formData.name}
                onChange={handleChange}
                className={`p-2.5 sm:p-3 rounded-xl bg-gray-50 border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-400/50 text-gray-800 text-sm sm:text-base
                ${errors.name ? "border-red-400 bg-red-50/30" : "border-gray-200 focus:border-amber-400"} hover:border-amber-300`}
              />
              {errors.name && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-amber-500 text-xs mt-1"
                >
                  {errors.name}
                </motion.p>
              )}
            </motion.div>

            {/* Email Field */}
            <motion.div
              className="flex flex-col"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label className="mb-1 sm:mb-2 text-xs sm:text-sm font-medium text-gray-700">
                {t.email} <span className="text-amber-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder={t.placeholderEmail}
                value={formData.email}
                onChange={handleChange}
                className={`p-2.5 sm:p-3 rounded-xl bg-gray-50 border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-400/50 text-gray-800 text-sm sm:text-base
                ${errors.email ? "border-red-400 bg-red-50/30" : "border-gray-200 focus:border-amber-400"} hover:border-amber-300`}
              />
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-amber-500 text-xs mt-1"
                >
                  {errors.email}
                </motion.p>
              )}
            </motion.div>

            {/* Service Field */}
            <motion.div
              className="flex flex-col"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label className="mb-1 sm:mb-2 text-xs sm:text-sm font-medium text-gray-700">
                {t.service} <span className="text-amber-500">*</span>
              </label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className={`p-2.5 sm:p-3 rounded-xl bg-gray-50 border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-400/50 text-gray-800 cursor-pointer text-sm sm:text-base
                ${errors.service ? "border-red-400 bg-red-50/30" : "border-gray-200 focus:border-amber-400"} hover:border-amber-300`}
              >
                <option value="" disabled className="text-gray-400">
                  {t.selectService}
                </option>
                <option value="Local Brand" className="text-gray-800">
                  {t.serviceLocal}
                </option>
                <option value="Product" className="text-gray-800">
                  {t.serviceProduct}
                </option>
                <option value="Web Development" className="text-gray-800">
                  {t.serviceWeb}
                </option>
                <option value="Mobile Application" className="text-gray-800">
                  {t.serviceMobile}
                </option>
                <option value="Others" className="text-gray-800">
                  {t.serviceOthers}
                </option>
              </select>
              {errors.service && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-amber-500 text-xs mt-1"
                >
                  {errors.service}
                </motion.p>
              )}
            </motion.div>

            {/* Budget Field - Conditional */}
            {formData.service && formData.service !== "Others" && (
              <motion.div
                className="flex flex-col"
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <label className="mb-1 sm:mb-2 text-xs sm:text-sm font-medium text-gray-700">
                  {t.budget} <span className="text-amber-500">*</span>
                </label>
                <input
                  type="text"
                  name="budget"
                  placeholder={t.placeholderBudget}
                  onChange={handleChange}
                  value={formData.budget}
                  className={`p-2.5 sm:p-3 rounded-xl bg-gray-50 border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-400/50 text-gray-800 text-sm sm:text-base
                  ${errors.budget ? "border-red-400 bg-red-50/30" : "border-gray-200 focus:border-amber-400"} hover:border-amber-300`}
                />
                {errors.budget && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-amber-500 text-xs mt-1"
                  >
                    {errors.budget}
                  </motion.p>
                )}
              </motion.div>
            )}

            {/* Idea Field */}
            <motion.div
              className="flex flex-col"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className="mb-1 sm:mb-2 text-xs sm:text-sm font-medium text-gray-700">
                {t.idea} <span className="text-amber-500">*</span>
              </label>
              <textarea
                name="idea"
                rows={4}
                placeholder={t.placeholderIdea}
                value={formData.idea}
                onChange={handleChange}
                className={`p-2.5 sm:p-3 rounded-xl bg-gray-50 border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-400/50 text-gray-800 resize-none text-sm sm:text-base
                ${errors.idea ? "border-red-400 bg-red-50/30" : "border-gray-200 focus:border-amber-400"} hover:border-amber-300`}
              />
              {errors.idea && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-amber-500 text-xs mt-1"
                >
                  {errors.idea}
                </motion.p>
              )}
            </motion.div>

            {/* Status Message */}
            {status && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-xs sm:text-sm text-center py-2 rounded-lg ${
                  status === "success" 
                    ? "text-green-600 bg-green-50" 
                    : status === "error" 
                      ? "text-red-600 bg-red-50" 
                      : "text-amber-600 bg-amber-50"
                }`}
              >
                {status === "sending"
                  ? "⏳ " + t.sending
                  : status === "success"
                    ? t.success
                    : t.error}
              </motion.p>
            )}

            {/* Dark Gray Submit Button with Skew Hover Effect */}
            <motion.button
              className="relative overflow-hidden bg-gray-700 text-white py-2.5 sm:py-3 rounded-xl font-semibold transition-all duration-300 shadow-md"
              whileHover={{ 
                scale: 1.02, 
                boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
                backgroundColor: "#ffffff",
                color: "#1f2937",
                skewX: -5,
              }}
              whileTap={{ scale: 0.98 }}
              disabled={status === "sending"}
              type="submit"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <span className="relative z-10 text-sm sm:text-base">
                {status === "sending" ? "⏳ " + t.sending : "📨 " + t.send}
              </span>
            </motion.button>
          </form>

          {/* Contact Info Footer */}
          <motion.div
            className="mt-6 pt-4 border-t border-amber-200 text-center text-xs sm:text-sm text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <p>📧 {t.emailContact} | 📞 {t.phone}</p>
            <p className="mt-1 text-[11px] sm:text-xs">{t.responseTime}</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;