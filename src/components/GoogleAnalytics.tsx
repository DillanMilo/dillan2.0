import { useEffect } from "react";

// GA4 measurement ID (property 527258687)
const GA_MEASUREMENT_ID = "G-SL5CG1FVGQ";

/**
 * Loads Google Analytics 4 (gtag.js) for the whole app.
 *
 * Mounted once at the app root so it runs on every page/section. The tag is
 * only injected in production builds (import.meta.env.PROD) so local
 * development traffic is never tracked.
 */
function GoogleAnalytics() {
  useEffect(() => {
    // Never load analytics during local development.
    if (!import.meta.env.PROD) return;

    const scriptSrc = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;

    // Avoid injecting the loader more than once.
    if (!document.querySelector(`script[src="${scriptSrc}"]`)) {
      const loaderScript = document.createElement("script");
      loaderScript.async = true;
      loaderScript.src = scriptSrc;
      document.head.appendChild(loaderScript);
    }

    window.dataLayer = window.dataLayer || [];
    window.gtag =
      window.gtag ||
      function gtag(...args: unknown[]) {
        window.dataLayer.push(args);
      };
    window.gtag("js", new Date());
    window.gtag("config", GA_MEASUREMENT_ID);
  }, []);

  return null;
}

export default GoogleAnalytics;
