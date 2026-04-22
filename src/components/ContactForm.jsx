import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ show: false, message: '', type: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ show: false, message: '', type: '' });

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      to_name: 'Phu Thit Nge',
      reply_to: formData.email,
    };

    try {
      await emailjs.send(
        'service_wmjc5s8',
        'template_692sl7m',
        templateParams,
        'OlFzfkvfW7uyjpwUQ'
      );
      setStatus({
        show: true,
        message: '✅ Message sent successfully! I will reply within 24 hours. ကျေးဇူးပါ။',
        type: 'success',
      });
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus({ show: false, message: '', type: '' }), 5000);
    } catch (error) {
      console.error('EmailJS error:', error);
      setStatus({
        show: true,
        message: '❌ Failed to send. Please try again or contact directly at hello@phuthitnge.com',
        type: 'error',
      });
      setTimeout(() => setStatus({ show: false, message: '', type: '' }), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <input
        type="text"
        id="name"
        placeholder="သင့်နာမည် *"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        id="email"
        placeholder="သင့် Gmail လိပ်စာ *"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <textarea
        id="message"
        rows="5"
        placeholder="သင်ပြောချင်တဲ့စကား..."
        value={formData.message}
        onChange={handleChange}
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Sending... ✈️' : 'Send message →'}
      </button>
      {status.show && (
        <div className={`status-message status-${status.type}`} style={{ display: 'block' }}>
          {status.message}
        </div>
      )}
    </form>
  );
};

export default ContactForm;