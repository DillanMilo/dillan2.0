import React, { useState, useEffect } from "react";
import { toRoman, formatDate } from "../utils/romanNumerals";

interface CountdownTimerProps {
  targetDate: Date;
  animationDelay?: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ 
  targetDate, 
  animationDelay = "1500ms" 
}) => {
  const [days, setDays] = useState(0);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = targetDate.getTime();
      const difference = target - now;

      if (difference > 0) {
        const daysLeft = Math.floor(difference / (1000 * 60 * 60 * 24));
        setDays(daysLeft);
      } else {
        setDays(0);
      }
    };

    // Calculate immediately
    calculateTimeLeft();

    // Update every hour to ensure accuracy (3600000 ms = 1 hour)
    const interval = setInterval(calculateTimeLeft, 3600000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div
      className="absolute right-5 md:right-10 lg:right-20 top-1/2 -translate-y-1/2 flex flex-col items-end gap-2 md:gap-3 text-white opacity-0 animate-fadeIn z-10"
      style={{ animationDelay }}
    >
      {/* Availability Text */}
      <div className="text-sm md:text-base lg:text-lg text-white font-bebas uppercase tracking-wider text-right mb-1 font-semibold">
        Available for work in
      </div>
      
      {/* Roman Numerals Countdown - Days Only */}
      <div className="flex items-end gap-2 md:gap-3 lg:gap-4">
        <div className="flex flex-col items-end">
          <span 
            className="text-[4rem] md:text-[6rem] lg:text-[8rem] leading-none text-paleRed transform scale-y-200" 
            style={{ 
              fontFamily: '"Times New Roman", "Times", serif',
              fontWeight: 'normal',
              letterSpacing: '0.05em'
            }}
          >
            {toRoman(days)}
          </span>
          <span className="text-sm md:text-base lg:text-lg text-gray-400 font-bebas mt-1 uppercase tracking-wider">Days</span>
        </div>
        
        {/* Date Display */}
        <div className="text-base md:text-xl lg:text-2xl text-gray-300 font-bebas mb-2 md:mb-4 lg:mb-6 tracking-wide transform scale-y-200">
          {formatDate(targetDate)}
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;

