import {
  FaReact, FaNodeJs, FaPython, FaGitAlt, FaDocker, FaFigma,
  FaGithub, FaLinkedin, FaTwitter
} from 'react-icons/fa';
import {
  SiJavascript, SiTypescript, SiTailwindcss, SiMongodb,
  SiPostgresql, SiFirebase, SiNextdotjs, SiThreedotjs,
  SiGraphql, SiRedux, SiVite, SiVercel
} from 'react-icons/si';

import eduaiImage from '../assets/images/ai-education.png';
import smarthireImage from '../assets/images/smarthire.png';
import ecommerce from '../assets/images/ecommerceweb.png';

/* ─────────────────────────────────────────
   All color values are now monochrome:
   white (#ffffff) or grey shades only.
   No colored accents remain.
───────────────────────────────────────── */

export const navLinks = [
  { id: 'about', title: 'About' },
  { id: 'skills', title: 'Skills' },
  { id: 'projects', title: 'Projects' },
  { id: 'certificates', title: 'Certificates' },
  { id: 'education', title: 'Education' },
  { id: 'experience', title: 'Experience' },
  { id: 'contact', title: 'Contact' },
];

export const heroData = {
  greeting: "Hello, I'm",
  name: 'Ashay Thorat',
  title: 'Full Stack Developer',
  tagline: 'Building digital experiences that push the boundaries of web technology.',
  cta: {
    primary: 'View Projects',
    secondary: 'Contact Me',
  },
};

export const aboutData = {
  intro: `I'm a passionate full-stack developer with 2+ years of experience crafting \
performant web applications and immersive digital experiences. I specialize in modern \
JavaScript frameworks, 3D web technologies, and building products that users love.`,
  highlights: [
    { label: 'Years Experience', value: '2+' },
    { label: 'Projects Completed', value: '3+' },
    { label: 'Happy Clients', value: '10+' },
    { label: 'Technologies', value: '15+' },
  ],
};

/* Skills — icons only, no per-skill accent colors */
export const skills = {
  frontend: [
    { name: 'React', icon: FaReact, level: 95 },
    { name: 'Next.js', icon: SiNextdotjs, level: 88 },
    { name: 'JavaScript', icon: SiJavascript, level: 92 },
    { name: 'TypeScript', icon: SiTypescript, level: 85 },
    { name: 'Tailwind CSS', icon: SiTailwindcss, level: 90 },
    { name: 'Three.js', icon: SiThreedotjs, level: 78 },
  ],
  backend: [
    { name: 'Node.js', icon: FaNodeJs, level: 90 },
    { name: 'Python', icon: FaPython, level: 82 },
    { name: 'GraphQL', icon: SiGraphql, level: 80 },
    { name: 'MongoDB', icon: SiMongodb, level: 85 },
    { name: 'PostgreSQL', icon: SiPostgresql, level: 78 },
    { name: 'Firebase', icon: SiFirebase, level: 83 },
  ],
  tools: [
    { name: 'Git', icon: FaGitAlt, level: 92 },
    { name: 'Docker', icon: FaDocker, level: 75 },
    { name: 'Figma', icon: FaFigma, level: 80 },
    { name: 'Redux', icon: SiRedux, level: 85 },
    { name: 'Vite', icon: SiVite, level: 88 },
    { name: 'Vercel', icon: SiVercel, level: 82 },
  ],
};

/* Projects — color field removed; no longer used by card components */
export const projects = [
  {
    title: 'EduAI — AI-Powered Smart Learning Platform',
    image: eduaiImage,
    description: 'A full-stack EdTech platform with AI-driven course generation, interactive tutoring, and visual doubt solving. Students get personalized quizzes, smart notes, and gamified streaks. Instructors can build courses manually or let AI auto-generate entire syllabi. Built with offline-resilient AI fallbacks for 100% uptime.',
    tags: ['Next.js', 'Express', 'Typescript', 'Neon PostgreSQL', 'Firebase Auth', 'Prisma', 'Gemini'],
    github: 'https://github.com/ashay-thorat/Ai-powered-Educational-Platform',
    live: 'https://ai-powered-educational-platform.vercel.app/',
  },
  {
    title: 'SmartHire —AI-powered Job Platform',
    image: smarthireImage,
    description: 'Candidates upload resumes for AI-driven job matching and recommendations. Recruiters post jobs, score applicants across 4 AI dimensions (Skills, Experience, Education, ATS), and manage their pipeline via a Kanban board. Admin tools provide user management and analytics. Built with React 19, Express, PostgreSQL — deployed on Vercel + Render',
    tags: ['React', 'Tailwind CSS', 'Node.js', 'Express', 'Neon PostgreSQL (Serverless)', 'Firebase', 'Jwt', 'RapidAPI'],
    github: 'https://github.com/ashay-thorat/SmartHire',
    live: 'https://smart-hire-omega-five.vercel.app/',
  },
  {
    title: 'ShopHub - E-Commerce Platform',
    image: ecommerce,
    description: 'A full-stack MERN e-commerce application with JWT authentication, product browsing, shopping cart, secure checkout, and Razorpay payment integration.Includes user features like profile management, order tracking, reviews, password reset, and a responsive shopping experience.Features a comprehensive admin dashboard for managing products, orders, users, Cloudinary image uploads, and sales analytics.',
    tags: ['React', 'Tailwind CSS', 'Node.js', 'Express', 'Mongodb'],
    github: 'https://github.com/ashay-thorat/E-commerce-web',
    live: 'https://codesoft-e-commerce-web.vercel.app/',
  },
];

/* Experiences — color field removed */
export const experiences = [
  {
    title: 'Android Developer Trainee',
    company: 'Mountreach Solution Pvt.ltd.',
    date: 'June 2024 - July 2024',
    points: [
      'Gained hands-on experience in Android app development using Java, Android Studio, and Android SDK to build responsive applications.',
      'Implemented user authentication, REST API integration, local storage, and Material Design UI components.',
      'Improved app performance through debugging, code optimization, and memory management.',
    ],
  },
  {
    title: 'Web Development Intern ',
    company: 'CODSOFT.',
    date: 'June 2026 — July 2026',
    points: [
      'Successfully completed a Web Development Internship at CODSOFT, working on real-world web development projects.',
      'Strengthened my full-stack development skills by building applications using React.js and Node.js while following industry-standard development practices.',
      'Gained hands-on experience that bridged the gap between academic knowledge and professional software development, enhancing my problem-solving and collaboration skills.',
    ],
  },
  {
    title: 'Backend AI Engineering Intern ',
    company: 'FlyRank AI',
    date: 'July 2026 present',
    points: [
      'Selected as a Backend AI Engineering Intern at FlyRank AI, contributing to AI-driven backend development and scalable software solutions.',
      'Working with backend technologies, AI workflows, and modern development practices while gaining hands-on experience in real-world engineering projects.',
      'Collaborating with the engineering team to build, learn, and enhance AI-powered applications, strengthening my skills in backend development and machine learning.',
    ],
  },
];

export const socialLinks = [
  { platform: 'GitHub', url: 'https://github.com/ashay-thorat', icon: FaGithub },
  { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/ashay-thorat-37612025a/', icon: FaLinkedin },
];

export const contactData = {
  email: 'ashaythorat26@gmail.com',
  heading: "Let's Build Something Amazing",
  subheading: "Have a project in mind? I'd love to hear about it. Drop me a message and let's create something extraordinary together.",
};
