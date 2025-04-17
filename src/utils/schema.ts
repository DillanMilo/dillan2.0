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
  description: "Creative front-end developer specializing in beautiful, functional websites"
}); 