const isLocalhost = ["localhost", "127.0.0.1"].includes(window.location.hostname);

if (!isLocalhost) {
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", "G-SL5CG1FVGQ", { send_page_view: true });

  const analyticsScript = document.createElement("script");
  analyticsScript.async = true;
  analyticsScript.src = "https://www.googletagmanager.com/gtag/js?id=G-SL5CG1FVGQ";
  document.head.appendChild(analyticsScript);
}
