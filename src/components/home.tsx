import React from "react";
import bgImage from "../assets/IMG_07154.jpg"; // Import background image

const Home: React.FC = () => {
  return (
    <div
      id="home"
      className="relative h-screen w-screen flex items-center justify-start px-5 text-white overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-0 animate-fadeIn"
        style={{ backgroundImage: `url(${bgImage})`, animationDelay: "2500ms" }}
      ></div>

      {/* Content */}
      <div
        className="relative z-10 opacity-0 animate-fadeIn"
        style={{ animationDelay: "200ms" }}
      >
        <h2
          className="text-5xl text-white font-bebas opacity-0 animate-fadeIn mb-20"
          style={{ animationDelay: "200ms" }}
        >
          Heya, my name is
        </h2>

        {/* Name Animation */}
        <h1 className="text-[15rem] font-bebas font-bold tracking-wide transform scale-y-200 opacity-0 animate-fadeIn flex">
          {"Dillan".split("").map((letter, index) => (
            <span
              key={index}
              className="inline-block opacity-0 animate-slideUp"
              style={{ animationDelay: `${index * 150 + 500}ms` }} // Adjusted stagger timing
            >
              {letter}
            </span>
          ))}
        </h1>

        {/* Description */}
        <p
          className="text-3xl text-gray-300 font-bebas tracking-wide opacity-0 animate-slideInLeft"
          style={{ animationDelay: "1200ms" }}
        >
          I build stuff and make things look nice on the web.
        </p>
      </div>

      {/* Intro Description (Loads in Last) */}
      <p
        className="absolute bottom-10 right-10 text-right text-4xl text-white font-bebas max-w-md opacity-0 animate-slideInRight"
        style={{ animationDelay: "2000ms" }}
      >
        I’m a creative UI and UX developer who loves crafting beautiful and
        functional websites. My passion lies in blending art with code to
        deliver engaging user experiences.
      </p>
    </div>
  );
};

export default Home;
