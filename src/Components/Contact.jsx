import React, { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 px-4 py-12 flex justify-center items-center">
      <div className="max-w-3xl w-full">
        
        {/* Header Section */}
        <div className="text-center mb-12 px-2 sm:px-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-purple-400 via-purple-300 to-white bg-clip-text text-transparent mb-6">
            Contact Us
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-400 to-purple-600 mx-auto rounded-full mb-6"></div>
          <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-xl mx-auto">
            Have questions about Film Flicks? We'd love to hear from you! 🎬
          </p>
        </div>

        {/* Contact Form */}
        <div className="bg-gray-800/30 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-purple-400/30 shadow-lg">
          <h2 className="text-2xl font-bold text-purple-400 mb-6 text-center">Send us a Message</h2>
          
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-2xl font-bold text-green-400 mb-2">Message Sent!</h3>
              <p className="text-gray-300">Thank you for contacting us. We'll get back to you soon!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-purple-300 mb-2 font-medium">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full p-4 bg-gray-700/50 text-white rounded-lg border border-purple-400/30 focus:border-purple-400 focus:outline-none transition duration-300 focus:ring-2 focus:ring-purple-400/20"
                  placeholder="Your full name"
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-purple-300 mb-2 font-medium">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full p-4 bg-gray-700/50 text-white rounded-lg border border-purple-400/30 focus:border-purple-400 focus:outline-none transition duration-300 focus:ring-2 focus:ring-purple-400/20"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                  <label className="block text-purple-300 mb-2 font-medium">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full p-4 bg-gray-700/50 text-white rounded-lg border border-purple-400/30 focus:border-purple-400 focus:outline-none transition duration-300 focus:ring-2 focus:ring-purple-400/20"
                    placeholder="+91 12345 67890"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-purple-300 mb-2 font-medium">Subject</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full p-4 bg-gray-700/50 text-white rounded-lg border border-purple-400/30 focus:border-purple-400 focus:outline-none transition duration-300 focus:ring-2 focus:ring-purple-400/20"
                >
                  <option value="">Select a topic</option>
                  <option value="general">General Inquiry</option>
                  <option value="technical">Technical Support</option>
                  <option value="billing">Billing Questions</option>
                  <option value="partnership">Partnership</option>
                  <option value="feedback">Feedback</option>
                </select>
              </div>
              
              <div>
                <label className="block text-purple-300 mb-2 font-medium">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full p-4 bg-gray-700/50 text-white rounded-lg border border-purple-400/30 focus:border-purple-400 focus:outline-none transition duration-300 focus:ring-2 focus:ring-purple-400/20 resize-none"
                  placeholder="Tell us how we can help you..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white py-4 rounded-lg font-semibold text-lg transition duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
              >
                Send Message 🚀
              </button>
            </form>
          )}
        </div>

        {/* Footer Note */}
        <div className="text-center mt-12 max-w-xl mx-auto px-2 sm:px-6">
          <p className="text-gray-400 text-sm sm:text-base">
            We typically respond within 24 hours. For urgent matters, please call our support line. 
            Your privacy is important to us - we'll never share your information.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
