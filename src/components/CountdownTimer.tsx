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
    <>
      {/* Mobile Layout - Top left, between navbar and hero title */}
      <div
        className="absolute top-16 left-5 md:hidden flex flex-col items-start gap-2 text-white opacity-0 animate-fadeIn z-10"
        style={{ animationDelay }}
      >
        {/* Availability Text */}
        <div className="text-sm text-white font-bebas uppercase tracking-wider text-left font-semibold">
          Available for work in
        </div>
        
        {/* Days Label - Mobile */}
        <div className="text-sm text-white font-bebas uppercase tracking-wider font-semibold">
          Days ({days})
        </div>
        
        {/* Roman Numerals Countdown - Mobile */}
        <div className="flex flex-col items-start gap-3 mt-1">
          <span 
            className="text-[3rem] leading-none text-paleRed transform scale-y-200" 
            style={{ 
              fontFamily: '"Times New Roman", "Times", serif',
              fontWeight: 'normal',
              letterSpacing: '0.05em'
            }}
          >
            {toRoman(days)}
          </span>
          {/* Date Display - Mobile */}
          <div className="text-sm text-gray-300 font-bebas tracking-wide">
            {formatDate(targetDate)}
          </div>
        </div>
      </div>

      {/* Desktop Layout - Right side */}
      <div
        className="hidden md:flex absolute right-10 lg:right-20 top-1/2 -translate-y-1/2 flex-col items-end gap-2 md:gap-3 text-white opacity-0 animate-fadeIn z-10"
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
              className="text-[6rem] lg:text-[8rem] leading-none text-paleRed transform scale-y-200" 
              style={{ 
                fontFamily: '"Times New Roman", "Times", serif',
                fontWeight: 'normal',
                letterSpacing: '0.05em'
              }}
            >
              {toRoman(days)}
            </span>
          </div>
          
          {/* Date Display */}
          <div className="text-xl lg:text-2xl text-gray-300 font-bebas mb-2 md:mb-4 lg:mb-6 tracking-wide transform scale-y-200">
            {formatDate(targetDate)}
          </div>
        </div>
        
        {/* Days Label */}
        <div className="text-sm md:text-base lg:text-lg text-white font-bebas uppercase tracking-wider text-right font-semibold">
          Days ({days})
        </div>
      </div>
    </>
  );
};

export default CountdownTimer;

