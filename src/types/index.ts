export type ProjectStatus = 'Planned' | 'In Progress' | 'Completed';

export type ProjectCategory = 'All' | 'Web Development' | 'Python' | 'AI/ML' | 'Computer Vision' | 'Automation';

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  shortDescription: string;
  problemStatement: string;
  solutionDescription: string;
  technologies: string[];
  status: ProjectStatus;
  featured: boolean;
  githubUrl?: string; // empty if not public
  liveDemoUrl?: string; // empty if not public
  highlights: string[];
  architectureNotes?: string;
  date: string;
}

export type SkillProficiency = 'Familiar' | 'Learning' | 'Building Projects' | 'Academic Exposure';

export interface SkillItem {
  name: string;
  level: SkillProficiency;
  context?: string;
}

export interface SkillCategory {
  category: string;
  description: string;
  skills: SkillItem[];
}

export interface FreelanceService {
  id: string;
  title: string;
  clientProblem: string;
  deliverables: string[];
  technologies: string[];
  turnaroundTime: string; // e.g. "Estimated 1–2 weeks" or "To be discussed"
  startingPrice: string; // e.g. "Custom quote based on scope"
  popular?: boolean;
}

export interface EducationMilestone {
  period: string;
  title: string;
  institution: string;
  status: string;
  description: string;
  focusAreas: string[];
}

export interface JournalPost {
  id: string;
  title: string;
  date: string;
  readTime: string;
  topic: string;
  summary: string;
  content: string;
  tags: string[];
  relatedProjectId?: string;
}

export interface GitHubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
  location?: string | null;
  blog?: string | null;
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  topics?: string[];
  fork: boolean;
}

export interface InquiryFormData {
  fullName: string;
  email: string;
  company?: string;
  serviceId: string;
  projectDescription: string;
  budgetRange: string;
  desiredDeadline: string;
  referenceUrl?: string;
  additionalRequirements?: string;
}

export interface SiteProfile {
  name: string;
  role: string;
  headline: string;
  heroSubtext: string;
  aboutStory: string[];
  educationBrief: string;
  email: string;
  githubUsername: string;
  githubUrl: string;
  linkedinUrl: string;
  instagramUrl?: string;
  isAvailableForWork: boolean;
  availabilityNote: string;
  resumeFileName?: string;
}
