import { Project } from '../types';

export const projectsData: Project[] = [
  {
    id: 'smart-library-system',
    title: 'Smart Library Resource Management System',
    category: 'Web Development',
    shortDescription: 'A modular web application concept designed for cataloging academic resources, accelerating book discovery, and structuring circulation workflows.',
    problemStatement: 'Academic resource centers and departmental libraries frequently struggle with manual checkouts, fragmented book catalogs, and delayed overdue tracking across semesters.',
    solutionDescription: 'Designing a clear web-based interface with categorized resource searching, structured circulation logging, student account status tracking, and relational database schema architecture.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express', 'SQL'],
    status: 'In Progress',
    featured: true,
    highlights: [
      'Relational schema design for multi-copy inventory and member loans',
      'Instant client-side catalog filtering by subject, author, and availability',
      'Role-oriented views for student self-lookup versus librarian administration'
    ],
    architectureNotes: 'Structured with a componentized React frontend communicating with an Express REST API backed by structured relational SQL queries for inventory consistency.',
    date: '2026'
  },
  {
    id: 'medscribe-ocr',
    title: 'MedScribe',
    category: 'Computer Vision',
    shortDescription: 'An exploratory computer vision and OCR pipeline prototype studying prescription document pre-processing and handwriting bounding boxes.',
    problemStatement: 'Unclear handwriting, varying paper contrast, and uneven lighting present substantial optical character recognition challenges on paper-based medical notes.',
    solutionDescription: 'Building experimental image pre-processing scripts using OpenCV (adaptive binarization, noise reduction, contour orientation correction) combined with Tesseract OCR engine for text extraction analysis. Explored purely as an academic technical experiment without medical clinical guarantees.',
    technologies: ['Python', 'OpenCV', 'Tesseract OCR', 'NumPy', 'Matplotlib'],
    status: 'In Progress',
    featured: true,
    highlights: [
      'Binarization and morphological transforms to isolate noisy document regions',
      'Bounding box identification around distinct handwritten prescription text blocks',
      'Comparative optical recognition benchmarking across different scan resolutions'
    ],
    architectureNotes: 'Multi-stage Python processing pipeline: grayscale conversion → Gaussian blur → OTSU thresholding → contour detection → text extraction.',
    date: '2026'
  },
  {
    id: 'developer-portfolio',
    title: 'Developer & Freelance Portfolio',
    category: 'Web Development',
    shortDescription: 'A high-performance personal portfolio, project gallery, and freelance client inquiry platform engineered with modern editorial web standards.',
    problemStatement: 'Aspiring computer applications students need a credible, authentic digital presence that clearly differentiates exploratory coursework from production work while providing real contact channels.',
    solutionDescription: 'Engineered a responsive portfolio utilizing React, TypeScript, and Tailwind CSS. Features dynamic GitHub REST API repository syncing, dark/light theme switching, accessible modals, and structured freelance inquiries.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'GitHub REST API', 'Lucide Icons'],
    status: 'In Progress',
    featured: true,
    githubUrl: 'https://github.com/manasvisawant',
    highlights: [
      'WCAG AA accessible interaction states, zero-pill metadata typography, and dark/light color system',
      'Live public GitHub repository fetch with sorting, language filters, and rate-limit mitigation',
      'Structured freelance service catalog and validated client inquiry dispatch flow'
    ],
    architectureNotes: 'Modular SPA with typed configurations, client-side state machine for filters/modals, and resilient fallback handling.',
    date: '2026'
  },
  {
    id: 'python-automation-toolkit',
    title: 'Python Automation Toolkit',
    category: 'Automation',
    shortDescription: 'A planned suite of utility scripts designed to automate repetitive filesystem operations, bulk data cleaning, and structured spreadsheet extraction.',
    problemStatement: 'Students and small teams spend disproportionate hours manually renaming messy archives, reorganizing folder hierarchies, and re-formatting CSV datasets.',
    solutionDescription: 'Planning a modular command-line and script library featuring automated file sorting by extension, batch regex renaming, PDF text extraction utilities, and tabular data sanitization scripts.',
    technologies: ['Python', 'Pandas', 'OS / Shutil', 'Regular Expressions', 'CSV Processing'],
    status: 'Planned',
    featured: false,
    highlights: [
      'Automated directory scanner with file category segregation rules',
      'Safe batch renamer with dry-run verification mode to prevent accidental overrides',
      'Tabular dataset normalization scripts for standardizing dates and currency columns'
    ],
    architectureNotes: 'Modular Python packages designed for standalone CLI invocation or reusable script importing.',
    date: 'Planned for late 2026'
  }
];
