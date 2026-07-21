export const siteUrl = "https://www.dillanmilo.com/";

export const serviceAreas = [
  "The Woodlands",
  "Tomball",
  "Spring",
  "Conroe",
  "Magnolia",
  "Houston",
  "Montgomery County",
] as const;

export const services = [
  {
    name: "Custom Website Development",
    shortName: "Web Development",
    description:
      "Responsive websites and web experiences designed to look distinctive, load quickly, and make the next step clear.",
  },
  {
    name: "AI Automation Solutions",
    shortName: "AI & Automation",
    description:
      "AI-powered tools and automation workflows that reduce repetitive work, surface bottlenecks, and support day-to-day operations.",
  },
  {
    name: "Small Business Software",
    shortName: "Business Software",
    description:
      "Custom dashboards, internal tools, and web applications shaped around how a small business actually works.",
  },
  {
    name: "Website Optimization",
    shortName: "Optimization",
    description:
      "Performance, accessibility, usability, and technical SEO improvements for websites that need to work harder.",
  },
] as const;

export interface Project {
  title: string;
  description: string;
  outcome: string;
  link: string;
  schemaUrl: string;
  schemaType: "CreativeWork" | "SoftwareApplication";
  gradient: string;
  accentColor: string;
  tag: string;
  desktopVideo?: string;
  mobileVideo?: string;
  poster?: string;
  isDropdown?: boolean;
  dropdownItems?: Array<{ name: string; link: string }>;
}

export const projects: Project[] = [
  {
    title: "Elijah Hourrides",
    description:
      "A fashion editorial portfolio with full-on runway attitude — full-bleed film, bold type, and motion that struts down the page. Front-row energy, no ticket required.",
    outcome:
      "Eight years of hair artistry, styled into a portfolio built to book the next show.",
    link: "https://www.elijahxx.com",
    schemaUrl: "https://www.elijahxx.com",
    schemaType: "CreativeWork",
    gradient:
      "radial-gradient(ellipse at 40% 30%, #0a0a0a 0%, #1a0a0f 40%, #4c0519 100%)",
    accentColor: "#e11d48",
    tag: "Editorial",
    desktopVideo: "/videos/elijah-desktop.webm",
    mobileVideo: "/videos/elijah-mobile.webm",
    poster: "/videos/elijah-poster.webp",
  },
  {
    title: "A5 Rail",
    description:
      "Next-level AR/VR training for rail pros. Slick, fast, secure — looks so good you might actually enjoy compliance.",
    outcome:
      "Rebuilt from scratch, now serves enterprise rail clients across North America.",
    link: "https://www.a5rail.com",
    schemaUrl: "https://www.a5rail.com",
    schemaType: "CreativeWork",
    gradient:
      "radial-gradient(ellipse at 30% 20%, #1a1a2e 0%, #16213e 40%, #0f3460 100%)",
    accentColor: "#0f3460",
    tag: "AR / VR",
    desktopVideo: "/videos/a5rail-desktop.webm",
    mobileVideo: "/videos/a5rail-mobile.webm",
    poster: "/videos/a5rail-poster.webp",
  },
  {
    title: "LastCallIQ",
    description:
      "AI-powered inventory management SaaS — built, owned, and actively used by real clients.",
    outcome: "Currently serving Food & Beverage businesses across Texas.",
    link: "https://www.lastcalliq.com",
    schemaUrl: "https://www.lastcalliq.com",
    schemaType: "SoftwareApplication",
    gradient:
      "radial-gradient(ellipse at 40% 60%, #0a1a0a 0%, #1a2e1a 40%, #2d5a3d 100%)",
    accentColor: "#22c55e",
    tag: "SaaS",
    desktopVideo: "/videos/ScreenRecording_03-05-2026 11-43-17_1.webm",
    mobileVideo: "/videos/ScreenRecording_03-05-2026 11-43-17_1.webm",
    poster: "/videos/lastcalliq-poster.webp",
  },
  {
    title: "FORME",
    description:
      "Regenerative medicine meets pixel-perfect design. Your platelets deserve a website this good.",
    outcome:
      "Built to convert from day one — ready to launch and start filling appointments.",
    link: "https://www.formeprp.com",
    schemaUrl: "https://www.formeprp.com",
    schemaType: "CreativeWork",
    gradient:
      "radial-gradient(ellipse at 50% 30%, #0a0a0a 0%, #1a1a1a 40%, #2d1f3d 100%)",
    accentColor: "#8b5cf6",
    tag: "Medical",
    desktopVideo: "/videos/forme-desktop.webm",
    mobileVideo: "/videos/forme-mobile.webm",
    poster: "/videos/forme-poster.webp",
  },
  {
    title: "Africa WildVentures",
    description:
      "Elephantine performance with cheetah-fast load times. Africa's calling, and it has great UX.",
    outcome:
      "Brought a premium African safari brand to life online, driving direct bookings.",
    link: "https://www.africawildventures.com",
    schemaUrl: "https://www.africawildventures.com",
    schemaType: "CreativeWork",
    gradient:
      "radial-gradient(ellipse at 70% 80%, #1a120b 0%, #3c2a21 40%, #d4a574 100%)",
    accentColor: "#d4a574",
    tag: "Travel",
    desktopVideo: "/videos/africawild-desktop.webm",
    mobileVideo: "/videos/africawild-mobile.webm",
    poster: "/videos/africawild-poster.webp",
  },
  {
    title: "Professional Bios",
    description:
      "Impactful, bespoke single-page applications for professionals. Coz business cards are lame.",
    outcome:
      "Replaced outdated profiles with pages that land clients and speaking gigs.",
    link: "#",
    schemaUrl: `${siteUrl}#work`,
    schemaType: "CreativeWork",
    gradient:
      "radial-gradient(ellipse at 20% 50%, #0f0f0f 0%, #1c1917 40%, #44403c 100%)",
    accentColor: "#f59e0b",
    tag: "Branding",
    desktopVideo: "/videos/bios-desktop.webm",
    mobileVideo: "/videos/bios-mobile.webm",
    poster: "/videos/bios-poster.webp",
    isDropdown: true,
    dropdownItems: [
      { name: "Carly Milo", link: "https://carly-milo.com" },
      { name: "Chad Hanekom", link: "https://chadhanekom.com" },
      { name: "Richard Nell", link: "https://richard-nell.vercel.app" },
    ],
  },
];
