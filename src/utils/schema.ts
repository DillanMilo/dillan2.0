export const getPersonSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://www.dillanmilo.com/#person",
  name: "Dillan Milosevich",
  jobTitle: "Software Developer & Web Development Specialist",
  url: "https://www.dillanmilo.com",
  sameAs: [
    "https://www.linkedin.com/in/dillan-milosevich-9a817891/",
    "https://twitter.com/dillanx1x",
    "https://github.com/DillanMilo"
  ],
  image: "https://www.dillanmilo.com/3B82C20B-8F01-4D2B-8EAF-1B5FD4F9EBCE.PNG",
  description: "Software developer serving The Woodlands, Tomball, Houston, and Montgomery County. Specializing in custom web development, AI automation, and small business software.",
  address: {
    "@type": "PostalAddress",
    "addressLocality": "The Woodlands",
    "addressRegion": "TX",
    "postalCode": "77380",
    "addressCountry": "US"
  },
  areaServed: [
    {
      "@type": "City",
      "name": "The Woodlands",
      "containedIn": {
        "@type": "State",
        "name": "Texas"
      }
    },
    {
      "@type": "City",
      "name": "Creekside",
      "containedIn": {
        "@type": "State",
        "name": "Texas"
      }
    },
    {
      "@type": "City",
      "name": "Tomball",
      "containedIn": {
        "@type": "State",
        "name": "Texas"
      }
    },
    {
      "@type": "City",
      "name": "Spring",
      "containedIn": {
        "@type": "State",
        "name": "Texas"
      }
    },
    {
      "@type": "City",
      "name": "Magnolia",
      "containedIn": {
        "@type": "State",
        "name": "Texas"
      }
    },
    {
      "@type": "City",
      "name": "Conroe",
      "containedIn": {
        "@type": "State",
        "name": "Texas"
      }
    },
    {
      "@type": "City",
      "name": "Houston",
      "containedIn": {
        "@type": "State",
        "name": "Texas"
      }
    }
  ]
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
    "@id": "https://www.dillanmilo.com/#person",
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
        title: "LastCallIQ",
        description: "AI-powered inventory management SaaS for food and beverage businesses across Texas.",
        url: "https://www.lastcalliq.com",
      })
    },
    {
      "@type": "ListItem",
      position: 3,
      item: getProjectSchema({
        title: "Africa WildVentures",
        description: "Safari and adventure booking platform built for direct bookings and a strong user experience.",
        url: "https://www.africawildventures.com",
      })
    },
    {
      "@type": "ListItem",
      position: 4,
      item: getProjectSchema({
        title: "FORME",
        description: "Modern website for a regenerative medicine clinic specializing in PRP treatments, featuring clean design and intuitive user experience.",
        url: "https://www.formeprp.com",
      })
    },
    {
      "@type": "ListItem",
      position: 5,
      item: getProjectSchema({
        title: "Professional Bios",
        description: "Collection of impactful, bespoke single-page applications for professionals, featuring modern design and seamless user experience.",
        url: "https://richard-nell.vercel.app",
      })
    },
  ]
});

export const getWebsiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.dillanmilo.com/#website",
  url: "https://www.dillanmilo.com",
  name: "Dillan Milosevich",
  description: "Custom web development, AI automation, workflow automation, and small business software in The Woodlands, Tomball, Houston, and Montgomery County.",
  publisher: {
    "@id": "https://www.dillanmilo.com/#person"
  },
  inLanguage: "en-US"
});

export const getOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://www.dillanmilo.com/#organization",
  name: "Dillan Milosevich - Software Development Services",
  alternateName: "DM Dev",
  url: "https://www.dillanmilo.com",
  logo: "https://www.dillanmilo.com/3B82C20B-8F01-4D2B-8EAF-1B5FD4F9EBCE.PNG",
  image: "https://www.dillanmilo.com/og-image.png",
  description: "Custom websites, business automation, AI-powered tools, and small business software for local companies in The Woodlands, Tomball, Houston, and Montgomery County.",
  founder: {
    "@id": "https://www.dillanmilo.com/#person"
  },
  telephone: "+1-281-210-8139",
  email: "dillan@creativecurrents.io",
  address: {
    "@type": "PostalAddress",
    addressLocality: "The Woodlands",
    addressRegion: "TX",
    postalCode: "77380",
    addressCountry: "US"
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 30.1658,
    longitude: -95.4613
  },
  areaServed: [
    {
      "@type": "City",
      name: "The Woodlands",
      containedIn: {
        "@type": "AdministrativeArea",
        name: "Montgomery County"
      }
    },
    {
      "@type": "City",
      name: "Creekside"
    },
    {
      "@type": "City",
      name: "Tomball"
    },
    {
      "@type": "City",
      name: "Spring"
    },
    {
      "@type": "City",
      name: "Magnolia"
    },
    {
      "@type": "City",
      name: "Conroe"
    },
    {
      "@type": "City",
      name: "Houston"
    },
    {
      "@type": "AdministrativeArea",
      name: "Montgomery County"
    },
    {
      "@type": "State",
      name: "Texas"
    }
  ],
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday"
    ],
    opens: "09:00",
    closes: "18:00"
  },
  sameAs: [
    "https://www.linkedin.com/in/dillan-milosevich-9a817891/",
    "https://twitter.com/dillanx1x",
    "https://github.com/DillanMilo"
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Web Development Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Custom Website Development",
          description: "Tailored web solutions for businesses in The Woodlands and Houston area"
        }
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "E-Commerce Development",
          description: "Online store development with secure payment processing"
        }
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AI Automation Solutions",
          description: "Business automation using artificial intelligence to optimize operations"
        }
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Website Optimization",
          description: "Performance optimization and SEO services"
        }
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Workflow Automation",
          description: "Custom automation workflows to streamline business operations and save time"
        }
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Small Business Software",
          description: "Tailored software solutions designed specifically for small and medium businesses"
        }
      }
    ]
  },
  serviceType: [
    "Custom Web Development",
    "E-Commerce Development",
    "React Development",
    "Front-End Development", 
    "Full-Stack Development",
    "UI/UX Design",
    "Business Automation",
    "Workflow Automation",
    "AI Integration",
    "AI-Powered Solutions",
    "Custom AI Solutions",
    "Small Business Software",
    "Website Optimization",
    "Digital Transformation",
    "Mobile-Responsive Design"
  ],
  priceRange: "$$",
  slogan: "Beautiful, Functional Websites That Work",
  knowsAbout: [
    "Web Development",
    "Software Engineering",
    "React",
    "TypeScript",
    "AI Automation",
    "Business Optimization",
    "UI/UX Design"
  ]
});
