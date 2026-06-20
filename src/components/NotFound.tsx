import React, { useEffect } from "react";
import { updateMetaTags } from "../utils/metaUtils";

const NotFound: React.FC = () => {
  useEffect(() => {
    // Update meta tags for 404 page
    const metaTags = {
      robots: "noindex, nofollow", // Prevent indexing of 404 page
      description: "Page not found - Dillan Milosevich's portfolio",
      "og:title": "404 - Page Not Found | Dillan Milosevich",
      "og:description": "The requested page could not be found.",
      canonical: "https://www.dillanmilo.com/", // Point canonical to homepage
    };

    updateMetaTags(metaTags, "404 - Page Not Found | Dillan Milosevich");
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
