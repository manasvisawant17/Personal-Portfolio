import { EducationMilestone } from '../types';

export const educationJourneyData: EducationMilestone[] = [
  {
    period: '2024 – 2028 (In Progress)',
    title: 'Bachelor of Computer Applications (BCA Hons.)',
    institution: 'Parul University',
    status: 'Current Stage: 3rd Year · Semester 5',
    description: 'Pursuing comprehensive undergraduate coursework in computer applications, software engineering principles, algorithm design, and applied technologies.',
    focusAreas: [
      'Data Structures & Algorithm Fundamentals',
      'Database Management Systems & Relational Modeling',
      'Object-Oriented Programming (Java & Python)',
      'Web Application Architecture & Client-Side Design',
      'Operating Systems & System Architecture Concepts',
      'Introductory Deep Learning & Computer Vision Foundations'
    ]
  },
  {
    period: 'Current Focus (2026)',
    title: 'Self-Directed Applied Development',
    institution: 'Independent Projects & Laboratory Practice',
    status: 'Active Milestone: Building & Documenting',
    description: 'Bridging academic coursework with practical project implementation by constructing complete user interfaces, writing automated scripts, and exploring computer vision pipelines.',
    focusAreas: [
      'Full-stack project prototyping (React + Node.js + SQL)',
      'Digital image processing & OCR pipelines using OpenCV and Tesseract',
      'Version control discipline, Git branching, and repository architecture',
      'Responsive design systems using Tailwind CSS and TypeScript'
    ]
  },
  {
    period: 'Upcoming Milestone (2027 – 2028)',
    title: 'Industry Internship & Capstone Project',
    institution: 'Undergraduate Program Milestone',
    status: 'Targeted Milestone: Industry Immersion',
    description: 'Preparing for industry internships to contribute to real-world codebases, collaborate in cross-functional teams, and deploy production software.',
    focusAreas: [
      'Internship applications in software engineering & web development',
      'Advanced machine learning & model integration pipelines',
      'Production code review, automated testing, and CI/CD pipelines',
      'Senior capstone software development project'
    ]
  }
];

export const learningWorkflow = [
  {
    step: '01',
    title: 'Understand',
    summary: 'Deconstruct the underlying problem, examine constraints, and specify clear requirements before writing code.'
  },
  {
    step: '02',
    title: 'Plan',
    summary: 'Design data structures, diagram application architecture, and establish interface hierarchies.'
  },
  {
    step: '03',
    title: 'Build',
    summary: 'Implement functional components cleanly using TypeScript, modern frameworks, and responsive design systems.'
  },
  {
    step: '04',
    title: 'Test',
    summary: 'Verify edge cases, test keyboard accessibility and contrast, inspect responsive breakpoints, and handle network states.'
  },
  {
    step: '05',
    title: 'Improve',
    summary: 'Refactor logic, optimize bundle footprints, refine developer documentation, and collect actionable feedback.'
  }
];
