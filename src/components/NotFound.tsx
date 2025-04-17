import React, { useEffect } from "react";

const NotFound: React.FC = () => {
  useEffect(() => {
    // Update meta tags for 404 page
    const metaTags = {
      robots: "noindex, nofollow", // Prevent indexing of 404 page
      description: "Page not found - Dillan Milosevich's portfolio",
      "og:title": "404 - Page Not Found | Dillan Milosevich",
      "og:description": "The requested page could not be found.",
      canonical: window.location.origin, // Point canonical to homepage
    };

    // Update meta tags
    Object.entries(metaTags).forEach(([name, content]) => {
      let metaTag =
        document.querySelector(`meta[name='${name}']`) ||
        document.querySelector(`meta[property='${name}']`);

      if (metaTag) {
        metaTag.setAttribute("content", content);
      } else {
        metaTag = document.createElement("meta");
        if (name.startsWith("og:")) {
          metaTag.setAttribute("property", name);
        } else {
          metaTag.setAttribute("name", name);
        }
        metaTag.setAttribute("content", content);
        document.head.appendChild(metaTag);
      }
    });

    document.title = "404 - Page Not Found | Dillan Milosevich";

    // Cleanup
    return () => {
      // Remove noindex meta tag when leaving 404 page
      const robotsTag = document.querySelector("meta[name='robots']");
      if (robotsTag) document.head.removeChild(robotsTag);
    };
  }, []);

  return (
    <section className="h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bebas text-red-600">404</h1>
        <p className="text-2xl text-white mt-4">Page not found</p>
        <a href="/" className="text-red-600 hover:text-red-400 mt-8 block">
          Return Home
        </a>
      </div>
    </section>
  );
};

export default NotFound;
