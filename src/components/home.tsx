import React, { useEffect } from "react";
import bgImageMobile from "../assets/IMG_07154.jpg"; // Mobile Background

const Home: React.FC = () => {
  useEffect(() => {
    // Set the document title for the Home page
    document.title = "Home - Dillan Milosevich";

    // Define the meta description content for the Home page
    const homeDescription =
      "Welcome to Dillan Milosevich's personal website. Explore creative projects and learn about a dedicated UI/UX developer who builds engaging, functional websites.";

    // Find an existing meta description tag, or create one if it doesn't exist
    let metaDescription = document.querySelector("meta[name='description']");
    if (metaDescription) {
      metaDescription.setAttribute("content", homeDescription);
    } else {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      metaDescription.setAttribute("content", homeDescription);
      document.head.appendChild(metaDescription);
    }
  }, []);

  return (
    <div
      id="home"
      className="relative h-screen w-full flex flex-col items-start justify-center px-5 md:px-10 lg:px-20 text-white overflow-x-hidden"
    >
      {/* ✅ Mobile Overlay Background (Only for Mobile) */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-0 animate-fadeIn md:hidden"
        style={{
          // Combine a dimming gradient with the mobile background image
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${bgImageMobile})`,
          animationDelay: "2500ms",
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 text-left">
        <h2
          className="text-4xl md:text-5xl lg:text-6xl text-white font-bebas opacity-0 animate-fadeIn mb-10 md:mb-14"
          style={{ animationDelay: "200ms" }}
        >
          Heya, my name is
        </h2>

        {/* Name Animation */}
        <h1 className="text-[6rem] md:text-[10rem] lg:text-[15rem] font-bebas font-bold tracking-wide transform scale-y-200 opacity-0 animate-fadeIn flex">
          {"Dillan".split("").map((letter, index) => (
            <span
              key={index}
              className="inline-block opacity-0 animate-slideUp"
              style={{ animationDelay: `${index * 150 + 500}ms` }}
            >
              {letter}
            </span>
          ))}
        </h1>

        {/* Description */}
        <p
          className="text-xl md:text-2xl mb-30 lg:text-3xl text-gray-300 font-bebas tracking-wide opacity-0 animate-slideInLeft mt-5 md:mt-8 max-w-lg"
          style={{ animationDelay: "1200ms" }}
        >
          I build stuff and make things look nice on the web.
        </p>
      </div>

      {/* Intro Description (Loads in Last) */}
      <p
        className="absolute bottom-25 md:bottom-10 right-5 md:right-10 text-right text-xl md:text-2xl lg:text-3xl text-white font-bebas max-w-xs md:max-w-md opacity-0 animate-slideInRight"
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
