export const getPersonSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://dillanmilo.com/#person",
  name: "Dillan Milosevich",
  jobTitle: "Software Developer & Web Development Specialist",
  url: "https://dillanmilo.com",
  sameAs: [
    "https://www.linkedin.com/in/dillan-milosevich-9a817891/",
    "https://twitter.com/dillanx1x",
    "https://github.com/DillanMilo"
  ],
  image: "https://dillanmilo.com/3B82C20B-8F01-4D2B-8EAF-1B5FD4F9EBCE.PNG",
  description: "Professional software developer serving The Woodlands, Creekside, Tomball, and Houston TX. Specializing in custom web development, AI automation, and business optimization solutions.",
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
        title: "Africa WildVentures",
        description: "High-performance safari and adventure booking platform with optimized load times and exceptional user experience.",
        url: "https://www.africawildventures.com",
      })
    },
    {
      "@type": "ListItem",
      position: 3,
      item: getProjectSchema({
        title: "FORME",
        description: "Modern website for a regenerative medicine clinic specializing in PRP treatments, featuring clean design and intuitive user experience.",
        url: "https://www.formeprp.com",
      })
    },
    {
      "@type": "ListItem",
      position: 4,
      item: getProjectSchema({
        title: "Professional Bio Platform",
        description: "Collection of impactful, bespoke single-page applications for professionals, featuring modern design and seamless user experience.",
        url: "https://richard-nell.vercel.app",
      })
    },
    {
      "@type": "ListItem",
      position: 5,
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
  description: "Leading software development services in The Woodlands, Creekside, Tomball, and Houston TX. Specializing in custom web development, business automation, AI solutions, and digital transformation for local businesses.",
  founder: {
    "@id": "https://dillanmilo.com/#person"
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "The Woodlands",
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

export const getLocalBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://dillanmilo.com/#localbusiness",
  name: "Dillan Milosevich - Web Development Services",
  image: "https://dillanmilo.com/3B82C20B-8F01-4D2B-8EAF-1B5FD4F9EBCE.PNG",
  telephone: "+1-281-210-8139",
  email: "creativecurrentsx@gmail.com",
  url: "https://dillanmilo.com",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "The Woodlands",
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
  description: "Professional software development and web design services in The Woodlands, Creekside, Tomball, and Houston TX. Specializing in custom websites, React applications, AI automation, and business optimization solutions for local businesses.",
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
  areaServed: [
    "The Woodlands, TX",
    "Creekside, TX", 
    "Tomball, TX",
    "Spring, TX",
    "Magnolia, TX",
    "Conroe, TX",
    "Houston, TX",
    "Montgomery County, TX"
  ],
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
  }
}); 