export const getPersonSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://dillanmilo.com/#person",
  name: "Dillan Milosevich",
  jobTitle: "Front-End Developer",
  url: "https://dillanmilo.com",
  sameAs: [
    "https://www.linkedin.com/in/dillan-milosevich-9a817891/",
    "https://twitter.com/dillanx1x",
    "https://github.com/DillanMilo"
  ],
  image: "https://dillanmilo.com/path-to-your-profile-image.jpg", // Update this path if you have a profile image
  description: "Creative front-end developer specializing in beautiful, functional websites",
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
        title: "Game Hub",
        description: "A web application showcasing video games across platforms, featuring dynamic content loading and interactive game discovery.",
        url: "https://game-hub-x.vercel.app/",
      })
    },
    {
      "@type": "ListItem",
      position: 2,
      item: getProjectSchema({
        title: "Professional Bio Platform",
        description: "Collection of impactful, bespoke single-page applications for professionals, featuring modern design and seamless user experience.",
        url: "https://richard-nell.vercel.app", // Using one of your examples
      })
    },
    {
      "@type": "ListItem",
      position: 3,
      item: getProjectSchema({
        title: "Reddit Mini",
        description: "A streamlined Reddit experience with dynamic content loading, offering efficient content browsing and interaction.",
        url: "https://reddit-mini-app.vercel.app/",
      })
    }
  ]
}); 