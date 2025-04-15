import React, { useEffect } from "react";

const NotFound: React.FC = () => {
  useEffect(() => {
    document.title = "404 - Page Not Found | Dillan Milosevich";
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
