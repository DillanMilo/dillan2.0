export const getPersonSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://dillanmilo.com/#person",
  name: "Dillan Milosevich",
  jobTitle: "Software Developer",
  url: "https://dillanmilo.com",
  sameAs: [
    "https://www.linkedin.com/in/dillan-milosevich-9a817891/",
    "https://twitter.com/dillanx1x",
    "https://github.com/DillanMilo"
  ],
  image: "https://dillanmilo.com/3B82C20B-8F01-4D2B-8EAF-1B5FD4F9EBCE.PNG",
  description: "Creative software developer specializing in beautiful, functional websites",
  address: {
    "@type": "PostalAddress",
    "addressLocality": "Tomball",
    "addressRegion": "TX",
    "addressCountry": "US"
  },
  areaServed: {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": 30.0972,
      "longitude": -95.6161
    },
    "geoRadius": "50000"
  }
});

export const getProjectSchema = (project: {
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: project.title,
  description: project.description,
  url: project.url,
  applicationCategory: "WebApplication",
  operatingSystem: "Any",
  author: {
    "@type": "Person",
    "@id": "https://dillanmilo.com/#person",
    name: "Dillan Milosevich"
  },
  ...(project.image && { image: project.image }),
  ...(project.datePublished && { datePublished: project.datePublished })
});

export const getProjectsSchema = () => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: getProjectSchema({
        title: "A5 Rail",
        description: "Next-level AR/VR training for rail professionals featuring secure, fast, and engaging compliance training solutions.",
        url: "https://www.a5rail.com",
      })
    },
    {
      "@type": "ListItem",
      position: 2,
      item: getProjectSchema({
        title: "Africa Wild Ventures",
        description: "High-performance safari and adventure booking platform with optimized load times and exceptional user experience.",
        url: "https://africa-wild-ventures.vercel.app",
      })
    },
    {
      "@type": "ListItem",
      position: 3,
      item: getProjectSchema({
        title: "Professional Bio Platform",
        description: "Collection of impactful, bespoke single-page applications for professionals, featuring modern design and seamless user experience.",
        url: "https://richard-nell.vercel.app",
      })
    },
    {
      "@type": "ListItem",
      position: 4,
      item: getProjectSchema({
        title: "Game Hub",
        description: "A web application showcasing video games across platforms, featuring dynamic content loading and interactive game discovery.",
        url: "https://game-hub-x.vercel.app/",
      })
    }
  ]
});

export const getWebsiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://dillanmilo.com/#website",
  url: "https://dillanmilo.com",
  name: "Dillan Milosevich - Creative Software Developer",
  description: "Portfolio website of Dillan Milosevich, a creative software developer specializing in beautiful, functional websites and web applications.",
  publisher: {
    "@id": "https://dillanmilo.com/#person"
  },
  potentialAction: {
    "@type": "SearchAction",
    target: "https://dillanmilo.com/#work?query={search_term_string}",
    "query-input": "required name=search_term_string"
  },
  inLanguage: "en-US"
});

export const getOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://dillanmilo.com/#organization",
  name: "Dillan Milosevich - Software Development Services",
  alternateName: "DM Dev",
  url: "https://dillanmilo.com",
  logo: "https://dillanmilo.com/3B82C20B-8F01-4D2B-8EAF-1B5FD4F9EBCE.PNG",
  image: "https://dillanmilo.com/3B82C20B-8F01-4D2B-8EAF-1B5FD4F9EBCE.PNG",
  description: "Professional software development services specializing in creative web solutions, front-end development, and custom automation systems.",
  founder: {
    "@id": "https://dillanmilo.com/#person"
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Tomball",
    addressRegion: "TX",
    addressCountry: "US"
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 30.0972,
    longitude: -95.6161
  },
  areaServed: [
    {
      "@type": "State",
      name: "Texas"
    },
    {
      "@type": "Country",
      name: "United States"
    }
  ],
  serviceType: [
    "Web Development",
    "Front-End Development", 
    "Software Development",
    "UI/UX Design",
    "Automation Systems",
    "Custom AI Solutions"
  ],
  priceRange: "$$"
}); 