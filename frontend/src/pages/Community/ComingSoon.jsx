import React, { useState, useEffect } from "react";

const ComingSoon = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2025-02-10T00:00:00"); 
    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      if (difference < 0) {
        clearInterval(timer);
      } else {
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-black text-white h-screen flex flex-col items-center justify-center">
      {/* Title */}
      <h1 className="text-4xl font-bold mb-4">Community Page Coming Soon!</h1>
      <p className="text-lg text-gray-300 mb-8">
        We're building something amazing. Stay tuned!
      </p>

      {/* Countdown Timer */}
      <div className="flex space-x-4 mb-8">
        <div className="text-center">
          <span className="block text-5xl font-bold">{timeLeft.days}</span>
          <span className="text-gray-400">Days</span>
        </div>
        <div className="text-center">
          <span className="block text-5xl font-bold">{timeLeft.hours}</span>
          <span className="text-gray-400">Hours</span>
        </div>
        <div className="text-center">
          <span className="block text-5xl font-bold">{timeLeft.minutes}</span>
          <span className="text-gray-400">Minutes</span>
        </div>
        <div className="text-center">
          <span className="block text-5xl font-bold">{timeLeft.seconds}</span>
          <span className="text-gray-400">Seconds</span>
        </div>
      </div>

      {/* Subscription Form */}
      <div className="w-full max-w-md">
        <form className="flex flex-col sm:flex-row items-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full sm:w-auto flex-1 px-4 py-2 rounded-lg text-gray-900 focus:outline-none"
          />
          <button
            type="submit"
            className="mt-4 sm:mt-0 sm:ml-4 bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-bold"
          >
            Notify Me
          </button>
        </form>
      </div>
    </div>
  );
};

export default ComingSoon;
