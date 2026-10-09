/**
 * =========================================================================
 * MANASVI SAWANT — PORTFOLIO CONFIGURATION
 * =========================================================================
 * Centralized configuration file for personal details, contact points,
 * availability status, and social profiles.
 * 
 * Replace placeholders or update values here without altering UI code.
 */

import { SiteProfile } from '../types';

export const siteConfig: SiteProfile = {
  name: "Manasvi Sawant",
  role: "BCA (Hons.) Student · Aspiring AI/ML Developer · Web Developer",
  headline: "Building Digital Experiences. Exploring Intelligent Technology.",
  heroSubtext: "I'm a computer applications student passionate about building useful web experiences, solving problems with code, and exploring AI and automation. I turn ideas into practical projects while continuously improving my technical skills.",
  
  aboutStory: [
    "I am currently pursuing my Bachelor of Computer Applications (BCA Hons.) at Parul University, currently in my third year (Semester 5). My focus is at the intersection of solid software fundamentals, responsive web technologies, and practical AI/ML applications.",
    "Rather than treating technology as abstract theory, I prioritize hands-on, project-based learning: architecting full-stack applications, experimenting with computer vision and OCR pipelines using Python, and writing clean, maintainable user interfaces.",
    "My objective is to contribute to real-world software products through meaningful internships, collaborative open-source work, and well-scoped freelance development engagements."
  ],
  
  educationBrief: "BCA (Hons.) · Parul University (Expected 2028, Semester 5)",
  
  // Real contact email (derived from environment account)
  email: "manasvisawant840@gmail.com",
  
  // Configurable GitHub Username.
  // Update this to your exact GitHub handle to load public repositories and stats.
  githubUsername: "manasvisawant",
  githubUrl: "https://github.com/manasvisawant",
  
  // Professional LinkedIn Profile URL (Update with your live handle)
  linkedinUrl: "https://linkedin.com/in/manasvi-sawant",
  
  // Optional Instagram or secondary profile
  instagramUrl: "",
  
  // Availability status indicator (Can be toggled here or via live settings)
  isAvailableForWork: true,
  availabilityNote: "Open for Summer 2027/2028 Internships & Select Freelance Web Projects",
  
  // Name of the resume document if placed in public folder or downloadable
  resumeFileName: "Manasvi_Sawant_Resume.pdf"
};
