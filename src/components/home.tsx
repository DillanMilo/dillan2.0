import React from "react";
import bgImage from "../assets/IMG_07154.jpg"; // Import the image

const Home: React.FC = () => {
  return (
    <div
      id="home"
      className="relative h-screen w-screen flex items-center justify-start px-20 text-white overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-0 animate-fadeIn"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>

      {/* Content */}
      <div className="relative z-10">
        <h2 className="text-2xl text-white font-bebas opacity-0 animate-fadeIn delay-200">
          Heya, my name is
        </h2>

        {/* Name Animation */}
        <h1 className="text-[15rem] font-bebas font-bold tracking-wide transform scale-y-200 opacity-0 animate-fadeIn delay-500 flex">
          {"Dillan".split("").map((letter, index) => (
            <span
              key={index}
              className="inline-block opacity-0 animate-slideUp"
              style={{ animationDelay: `${index * 250}ms` }}
            >
              {letter}
            </span>
          ))}
        </h1>

        {/* Description */}
        <p className="text-lg text-gray-300 font-bebas tracking-wide opacity-0 animate-slideInLeft delay-700">
          I build stuff and make things look nice on the web.
        </p>
      </div>

      {/* Intro Description */}
      <p className="absolute bottom-10 right-10 text-right text-lg text-white font-bebas max-w-md opacity-0 animate-slideInRight delay-1000">
        I’m a creative UI and UX developer who loves crafting beautiful and
        functional websites. My passion lies in blending art with code to
        deliver engaging user experiences.
      </p>
    </div>
  );
};

export default Home;
