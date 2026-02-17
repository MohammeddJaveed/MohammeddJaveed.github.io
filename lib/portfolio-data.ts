export const skillCategories = [
  {
    title: "Mobile",
    items: ["React Native", "SwiftUI", "Android"]
  },
  {
    title: "Frontend",
    items: ["React", "Angular"]
  },
  {
    title: "Backend",
    items: ["Django (Python)", "Node.js", ".NET"]
  },
  {
    title: "Databases",
    items: ["SQL", "MongoDB", "Firebase"]
  },
  {
    title: "Cloud & DevOps",
    items: ["AWS", "Docker", "CI/CD"]
  },
  {
    title: "Tools & Practices",
    items: ["XCode","Android Studio","App Store","Play Store","Firebase","Postman", "Terraform","oneSignal","Figma","REST APIs", "Git", "Responsive UI", "State Management"]
  }
] as const;

export const marqueeSkills = [
  "React Native",
  "SwiftUI",
  "React",
  "Angular",
  "Django",
  "Node.js",
  ".NET",
  "SQL",
  "MongoDB",
  "Firebase",
  "AWS",
  "Docker",
  "CI/CD",
  "REST APIs",
  "Git",
  "Responsive UI",
  "State Management"
] as const;

export const professionalExperience = [
  {
    role: "Software Engineer",
    company: "Reach (Bengaluru, India)",
    duration: "Apr 2022 – Aug 2024",
    points: [
      "Developed full-stack mobile and web applications with React and React Native.",
      "Implemented new features, optimized performance, and improved app reliability.",
      "Worked collaboratively with QA and product teams to drive releases.",
      "Contributed to backend API development and database management.",
      "Participated in code reviews and implemented best practices for maintainability.",
      "Pushed updates to production and monitored app performance post-release."
    ]
  }
] as const;

export const certifications = [
  {
    title: "Front-End Development",
    issuer: "Professional Certification",
    year: "2022"
  },
  {
    title: "Android Development",
    issuer: "Professional Certification",
    year: "2022"
  },
  {
    title: "Machine Learning",
    issuer: "Professional Certification",
    year: "2021"
  },
  {
    title: "Personal Excellence",
    issuer: "Professional Certification",
    year: "2021"
  }
] as const;

export const achievements = [
  {
    title: "2nd Place – Dublin 30-Hour Hackathon",
    year: "2025",
    description:
      "Participated in an intensive 30-hour hackathon in Dublin and secured second place by co-designing and building a production-minded solution under strict time constraints. Recognized for strong technical execution, collaboration, and clear product delivery."
  }
] as const;

export const projects = [
  {
    title: "earnMate (React Native App)",
    description:
      "A smart mobile app for part-time workers to track shifts, earnings, and savings goals.",
    highlights: [
      "Shift scheduling & earnings calculator",
      "Interactive progress charts (bar & line)",
      "Goal-based savings tracker"
    ],
    stack: ["React Native", "Async Storage", "Chart Libraries"],
    impact: "Helps users manage work-life balance and financial tracking.",
    href: "https://github.com/MohammeddJaveed"
  },
  {
    title: "Dublin Bus + Weather App",
    description:
      "Combines real-time Dublin Bus tracking with live weather updates.",
    highlights: [
      "Live tracking using GTFS-Realtime API",
      "Interactive map with bus routes & stops",
      "Weather insights based on location"
    ],
    stack: ["React Native", "TypeScript", "Axios", "Maps"],
    impact: "Practical utility app for daily commuters.",
    href: "https://github.com/MohammeddJaveed/DublinBus-Weather"
  },
  {
    title: "Movie Tonight",
    description:
      "Discover movies and share favorite picks with social interaction features.",
    highlights: [
      "TMDB integration for dynamic movie data",
      "Save and share lists with friends",
      "Localized & engaging UI"
    ],
    stack: ["React Native (Expo)", "Axios", "Async Storage"],
    impact: "Enhances entertainment discovery experiences.",
    href: "https://github.com/MohammeddJaveed/MoviesApp"
  },
  {
    title: "Best Route Website (Web App)",
    description:
      "A responsive CRUD web platform for finding optimal travel routes.",
    highlights: [
      "Database-driven backend",
      "User-friendly frontend with route insights"
    ],
    stack: ["React", "Node.js", "SQL", "SQL Workbench"],
    impact: "Helps users plan efficient travel paths online.",
    href: "https://github.com/MohammeddJaveed"
  },
  {
    title: "Full-Stack React Native App (Authentication + Deployment)",
    description:
      "Complete mobile solution with secure login, cloud backend, and scalable APIs.",
    highlights: [
      "Implemented JWT authentication",
      "Optimized backend sync",
      "Set up CI/CD deployment pathways"
    ],
    stack: ["React Native", "Node.js", "Express", "Firebase"],
    impact: "Foundation for scalable authenticated experiences.",
    href: "https://github.com/MohammeddJaveed/FullStackApplication"
  },
  {
    title: "E-Commerce App (In Progress)",
    description:
      "Full-stack shopping platform with robust backend and responsive web frontend.",
    highlights: [
      "Backend architecture",
      "UI/UX design",
      "Secure payments"
    ],
    stack: [".NET", "Angular", "Docker", "MySQL"],
    impact: "Under active development.",
    href: "https://github.com/MohammeddJaveed"
  }
] as const;

export const education = [
  {
    degree: "MSc, Information Systems with Computing",
    institution: "Dublin Business School",
    duration: "2024 – 2025"
  },
  {
    degree: "Bachelor's in Computer Programming",
    institution: "MS Ramaiah College",
    duration: "2019 – 2022"
  }
] as const;

export const contactInfo = {
  email: "mdjaveed9108@gmail.com",
  phone: "+353 89 409 4920",
  linkedin: "https://linkedin.com/in/mohammed-javee-",
  github: "https://github.com/MohammeddJaveed"
} as const;

export const socialLinks = [
  { label: "GitHub", href: "https://github.com/MohammeddJaveed" },
  { label: "LinkedIn", href: "https://linkedin.com/in/mohammed-javee-" }
] as const;
