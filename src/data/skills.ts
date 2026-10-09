import { SkillCategory } from '../types';

export const skillCategoriesData: SkillCategory[] = [
  {
    category: 'Programming Languages',
    description: 'Core logic, algorithmic reasoning, and object-oriented paradigms.',
    skills: [
      { name: 'Python', level: 'Building Projects', context: 'Used for automation scripts, data parsing, and OpenCV experiments' },
      { name: 'JavaScript (ES6+)', level: 'Learning', context: 'Active study of asynchronous patterns and DOM manipulation' },
      { name: 'HTML5 & CSS3', level: 'Building Projects', context: 'Core strength in responsive layouts, semantics, and styling' },
      { name: 'SQL', level: 'Learning', context: 'Relational query design, normalization, joins, and table schema creation' },
      { name: 'Java', level: 'Learning', context: 'Academic coursework and object-oriented programming foundation' }
    ]
  },
  {
    category: 'Frontend Development',
    description: 'Interface architecture, state management, and user interaction design.',
    skills: [
      { name: 'React', level: 'Building Projects', context: 'Applied in portfolio and web applications; continuous component architecture learning' },
      { name: 'Tailwind CSS', level: 'Building Projects', context: 'Rapid design system implementation and responsive utilities' },
      { name: 'TypeScript', level: 'Learning', context: 'Type safety, interfaces, and strict prop contracts' },
      { name: 'Responsive Web Design', level: 'Building Projects', context: 'Mobile-first fluid grids, media queries, and touch targets' },
      { name: 'UI / UX Fundamentals', level: 'Familiar', context: 'Typography hierarchy, accessible contrast, and zero-clutter layouts' }
    ]
  },
  {
    category: 'Backend & Systems',
    description: 'Server logic, REST endpoints, and structured data handling.',
    skills: [
      { name: 'Node.js & Express', level: 'Learning', context: 'Building lightweight REST API routing and middleware' },
      { name: 'Flask', level: 'Learning', context: 'Planned backend framework for Python-driven web services' },
      { name: 'Relational Databases', level: 'Academic Exposure', context: 'Database design principles, primary/foreign keys, ACID basics' },
      { name: 'RESTful API Principles', level: 'Familiar', context: 'HTTP verbs, JSON payloads, and status code best practices' }
    ]
  },
  {
    category: 'AI / ML & Data Science',
    description: 'Theoretical foundations and introductory models in machine learning.',
    skills: [
      { name: 'Machine Learning Concepts', level: 'Academic Exposure', context: 'Supervised vs. unsupervised models, loss functions, regression' },
      { name: 'Deep Learning', level: 'Academic Exposure', context: 'University coursework covering neural networks and backpropagation' },
      { name: 'NumPy & Pandas', level: 'Learning', context: 'Matrix operations and tabular dataset exploration' },
      { name: 'Data Preprocessing', level: 'Learning', context: 'Handling missing values, feature scaling, and categorical encoding' }
    ]
  },
  {
    category: 'Computer Vision',
    description: 'Digital image processing and pattern identification pipelines.',
    skills: [
      { name: 'OpenCV', level: 'Academic Exposure', context: 'Practiced through MedScribe prototype for binarization & thresholding' },
      { name: 'Tesseract OCR', level: 'Academic Exposure', context: 'Text extraction from preprocessed document images' },
      { name: 'Image Processing Techniques', level: 'Academic Exposure', context: 'Gaussian blurring, edge detection, and morphological filters' }
    ]
  },
  {
    category: 'Cybersecurity & Computer Systems',
    description: 'Operating systems, hardware fundamentals, and security consciousness.',
    skills: [
      { name: 'Computer Architecture', level: 'Academic Exposure', context: 'Memory hierarchy, CPU instruction cycles, and logic gates' },
      { name: 'Operating System Principles', level: 'Academic Exposure', context: 'Process scheduling, concurrency, and virtual memory' },
      { name: 'Web Security Awareness', level: 'Familiar', context: 'Basic awareness of XSS, SQL injection mitigation, and input sanitization' }
    ]
  },
  {
    category: 'Tools & Workflow Platforms',
    description: 'Productivity utilities, source control, and deployment pipelines.',
    skills: [
      { name: 'Git & GitHub', level: 'Building Projects', context: 'Branching, commit discipline, and repository organization' },
      { name: 'VS Code', level: 'Building Projects', context: 'Primary development environment, extensions, and debugging' },
      { name: 'Linux / Bash Basics', level: 'Familiar', context: 'Shell navigation, package installation, and script execution' },
      { name: 'Postman', level: 'Familiar', context: 'Testing and validating REST endpoints and HTTP headers' }
    ]
  }
];
