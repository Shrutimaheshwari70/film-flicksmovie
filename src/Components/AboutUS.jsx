import React, { useState } from 'react';

function AboutUs() {
  const [showContact, setShowContact] = useState(false);

  const team = {
    name: "Rajesh Kumar",
    role: "Founder, Film Flicks",
    bio: "With 15+ years in cinema, Rajesh leads the vision of Film Flicks."
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-purple-950 text-white flex items-center justify-center px-4 py-12">
      <div className="bg-gray-900/70 border border-purple-500 rounded-3xl p-8 md:p-10 w-full max-w-5xl shadow-2xl backdrop-blur-md">

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-purple-400 mb-6 animate-fade-in">
          About Us
        </h1>

        <p className="text-base sm:text-lg md:text-lg text-gray-300 text-center max-w-xl sm:max-w-3xl mx-auto mb-10 leading-relaxed">
          Welcome to <span className="text-purple-300 font-semibold">Film Flicks</span> — a premium streaming platform made by movie lovers, for movie lovers. Dive into a curated library of world-class cinema, enjoy seamless streaming, and get personalized recommendations for your film journey.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 mb-12">
          <div className="bg-gray-800 p-6 rounded-xl border border-purple-400 shadow-md max-w-full">
            <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-2">Meet Our Founder</h3>
            <h4 className="text-lg sm:text-xl font-bold text-purple-300">{team.name}</h4>
            <p className="text-xs sm:text-sm text-gray-400">{team.role}</p>
            <p className="text-sm sm:text-base text-gray-300 mt-3">{team.bio}</p>
          </div>

          <div className="flex flex-col gap-4 justify-center items-center max-w-full">
            <button
              onClick={() => setShowContact(!showContact)}
              className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white px-6 sm:px-8 py-3 rounded-full font-medium transition transform hover:scale-105 shadow-lg"
            >
              {showContact ? 'Hide Contact Form' : 'Contact Us'} 📧
            </button>

            <button className="w-full sm:w-auto border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-black px-6 sm:px-8 py-3 rounded-full font-medium transition transform hover:scale-105 shadow">
              Browse Movies 🍿
            </button>
          </div>
        </div>

        {showContact && (
          <form className="max-w-full sm:max-w-2xl mx-auto bg-gray-800 p-6 sm:p-8 rounded-2xl border border-purple-400 animate-slide-down space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-purple-300 text-center">Get in Touch</h3>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 bg-gray-700 text-white rounded-lg border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 bg-gray-700 text-white rounded-lg border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <textarea
              placeholder="Your Message"
              rows={4}
              className="w-full p-3 bg-gray-700 text-white rounded-lg border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-medium transition transform hover:scale-105"
            >
              Send Message 🚀
            </button>
          </form>
        )}
      </div>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-slide-down {
          animation: slide-down 0.4s ease-out;
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}

export default AboutUs;
