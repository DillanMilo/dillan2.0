export const updateMetaTags = (metaTags: Record<string, string>, pageTitle: string) => {
  document.title = pageTitle;

  const updateMetaTag = (name: string, content: string) => {
    let metaTag = document.querySelector(`meta[name='${name}']`) || 
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
  };

  // Create or update canonical link
  let canonicalLink = document.querySelector("link[rel='canonical']");
  if (!canonicalLink) {
    canonicalLink = document.createElement("link");
    canonicalLink.setAttribute("rel", "canonical");
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute("href", metaTags.canonical);

  // Apply all meta tags
  Object.entries(metaTags).forEach(([name, content]) => {
    updateMetaTag(name, content);
  });
}; 