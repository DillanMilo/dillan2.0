import React, { useEffect } from "react";

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface SEOBreadcrumbsProps {
  items: BreadcrumbItem[];
}

const SEOBreadcrumbs: React.FC<SEOBreadcrumbsProps> = ({ items }) => {
  useEffect(() => {
    // Add breadcrumb structured data
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(breadcrumbSchema);
    script.id = "breadcrumb-schema";

    // Remove existing schema if present
    const existingScript = document.getElementById("breadcrumb-schema");
    if (existingScript) {
      document.head.removeChild(existingScript);
    }

    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [items]);

  return (
    <nav aria-label="Breadcrumb" className="sr-only">
      <ol>
        {items.map((item, index) => (
          <li key={index}>
            <a href={item.url}>{item.name}</a>
            {index < items.length - 1 && <span> / </span>}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default SEOBreadcrumbs;
