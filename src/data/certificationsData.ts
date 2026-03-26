export interface Certification {
  id: string;
  name: string;
  issuer: string;
  type: 'hackathon' | 'skill';
  image: string;
  description: string;
  date: string;
  hoursSpent?: number;
  learningOutcomes?: string[];
  skillsGained?: string[];
}

export const hackathons: Certification[] = [
  { 
    id: "ace-hack-4", 
    name: "Ace Hack 4.0", 
    issuer: "Ace Hack", 
    type: 'hackathon', 
    image: "/certificate/Ace hack 4.0.jpg.jpeg", 
    description: "Participated in Ace Hack 4.0, working on innovative solutions.",
    date: "2024"
  },
  { 
    id: "code-verse", 
    name: "Code Verse", 
    issuer: "Code Verse", 
    type: 'hackathon', 
    image: "/certificate/Code verse.jpg.jpeg", 
    description: "Collaborated with a team to build a unique web application.",
    date: "2024"
  },
  { 
    id: "coding-challenge-united", 
    name: "Coding Challenge of United", 
    issuer: "United Institute of Management", 
    type: 'hackathon', 
    image: "/certificate/Coding challenge of United.png", 
    description: "Competed in a rigorous coding challenge focused on algorithms.",
    date: "2024"
  },
  { 
    id: "hack-with-up", 
    name: "Hack with Uttar Pradesh", 
    issuer: "Government of UP", 
    type: 'hackathon', 
    image: "/certificate/Hack with Utterpredesh.png", 
    description: "Developed a solution for local governance challenges.",
    date: "2023"
  },
  { 
    id: "hackshatra", 
    name: "Hackshatra", 
    issuer: "Hackshatra", 
    type: 'hackathon', 
    image: "/certificate/Hackshatra.jpg.jpeg", 
    description: "Participated in a 24-hour hackathon focusing on AI/ML.",
    date: "2023"
  },
  { 
    id: "kode-kalesh", 
    name: "Kode Kalesh", 
    issuer: "Kode Kalesh", 
    type: 'hackathon', 
    image: "/certificate/Kode Kalesh.png", 
    description: "Participated in an intense coding competition.",
    date: "2023"
  },
  { 
    id: "namespace", 
    name: "Namespace", 
    issuer: "Namespace", 
    type: 'hackathon', 
    image: "/certificate/Namespace.jpg.jpeg", 
    description: "Explored advanced web technologies during this event.",
    date: "2023"
  },
  { 
    id: "hackerground", 
    name: "Hackerground", 
    issuer: "Hackerground", 
    type: 'hackathon', 
    image: "/certificate/hackerground.jpg", 
    description: "Participated in a high-energy tech event.",
    date: "2023"
  },
  { 
    id: "bnb-chain", 
    name: "BNB Chain", 
    issuer: "BNB Chain", 
    type: 'hackathon', 
    image: "/certificate/BNB chan.jpg.jpeg", 
    description: "Explored blockchain technology and decentralized apps.",
    date: "2023"
  },
  { 
    id: "vibe", 
    name: "Vibe", 
    issuer: "Vibe", 
    type: 'hackathon', 
    image: "/certificate/Vibe.jpg", 
    description: "Participated in a creative tech competition.",
    date: "2025"
  },
];

export const skillCertifications: Certification[] = [
  {
    id: "Introduction to Claude Cowork",
    name: "Introduction to Claude Cowork",
    issuer: "Skill Certification",
    type: 'skill',
    image: "/certificate/certificate-9arazvxunxzx-1774098995.jpg",
    description: "Certified in Introduction to Claude Cowork, covering MongoDB, Express.js, React, and Node.js.",
    date: "2026",
    skillsGained: ["React", "Node.js", "Express", "MongoDB"]
  },
  {
    id: "Claude code in Action",
    name: "Claude code in Action",
    issuer: "Skill Certification",
    type: 'skill',
    image: "/certificate/certificate-my593etp9jjw-1774098842.jpg",
    description: "Completed a comprehensive Claude code in Actionfocusing on modern frontend and backend technologies.",
    date: "2026",
    skillsGained: ["HTML", "CSS", "JavaScript", "React"]
  },
  { 
    id: "aws-cloud-practitioner", 
    name: "AWS Cloud Practitioner", 
    issuer: "Amazon Web Services", 
    type: 'skill', 
    image: "/certificate/AWS.png", 
    description: "Foundational knowledge of AWS Cloud platform and services.",
    date: "2024",
    hoursSpent: 40,
    learningOutcomes: [
      "Understanding of AWS Global Infrastructure",
      "Core AWS Services (EC2, S3, RDS, Lambda)",
      "AWS Security & Compliance basics",
      "Cloud Economics and Billing"
    ],
    skillsGained: ["Cloud Computing", "AWS", "Infrastructure as Service"]
  },
  { 
    id: "accenture-developer", 
    name: "Accenture Developer Program", 
    issuer: "Accenture", 
    type: 'skill', 
    image: "/certificate/Accenture.png", 
    description: "Gained practical experience in modern software development workflows.",
    date: "2024",
    hoursSpent: 25,
    learningOutcomes: [
      "Agile Methodology and Scrum",
      "Continuous Integration & Deployment",
      "Code Review practices",
      "Unit testing and Quality Assurance"
    ],
    skillsGained: ["Agile", "DevOps", "Software Engineering"]
  },
  { 
    id: "tata-digital-skills", 
    name: "TATA Digital Skills", 
    issuer: "TATA", 
    type: 'skill', 
    image: "/certificate/TATA.png", 
    description: "Mastered essential digital skills for the modern workplace.",
    date: "2024",
    hoursSpent: 15,
    learningOutcomes: [
      "Digital Transformation concepts",
      "Data Analytics basics",
      "Cybersecurity awareness",
      "Design Thinking principles"
    ],
    skillsGained: ["Digital Strategy", "Data Literacy", "Problem Solving"]
  },
  { 
    id: "freecodecamp-js", 
    name: "FreeCodeCamp JavaScript", 
    issuer: "FreeCodeCamp", 
    type: 'skill', 
    image: "/certificate/Free code camp.png", 
    description: "Deep dive into JavaScript algorithms and data structures.",
    date: "2023",
    hoursSpent: 300,
    learningOutcomes: [
      "Basic & Intermediate JavaScript",
      "Object-Oriented Programming",
      "Functional Programming",
      "Algorithms and Data Structures"
    ],
    skillsGained: ["JavaScript", "Problem Solving", "Logic"]
  },
];

export const allCertifications = [...hackathons, ...skillCertifications];
