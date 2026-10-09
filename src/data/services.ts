import { FreelanceService } from '../types';

export const servicesData: FreelanceService[] = [
  {
    id: 'landing-pages',
    title: 'Landing Page Development',
    clientProblem: 'Creators and local ventures often lack an engaging, high-converting digital front door that communicates their value clearly on mobile and desktop devices.',
    deliverables: [
      'Responsive, mobile-optimized landing page',
      'Clear call-to-action sections and contact touchpoints',
      'Clean semantic code and fast load times',
      'Deployment assistance to Vercel, Netlify, or GitHub Pages'
    ],
    technologies: ['React / Vite', 'Tailwind CSS', 'HTML5 & CSS3', 'JavaScript'],
    turnaroundTime: 'Scope-dependent (typically 5–10 business days)',
    startingPrice: 'Custom quote based on scope',
    popular: true
  },
  {
    id: 'portfolio-websites',
    title: 'Personal Portfolio Websites',
    clientProblem: 'Students, researchers, and early-career developers struggle to stand out with generic cookie-cutter templates that fail to showcase projects authentically.',
    deliverables: [
      'Customized personal branding and project showcase gallery',
      'GitHub integration & downloadable resume drawer',
      'Contact form & email integration',
      'Responsive design across phones, tablets, and desktops'
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Lucide Icons'],
    turnaroundTime: 'Scope-dependent (typically 7–14 business days)',
    startingPrice: 'Custom quote based on scope',
    popular: true
  },
  {
    id: 'business-websites',
    title: 'Basic Informational Websites',
    clientProblem: 'Small service providers need a clean, credible web presence detailing services, hours, locations, and inquiries without cumbersome CMS bloat.',
    deliverables: [
      'Multi-section informational website (Services, About, FAQ, Contact)',
      'Accessible typography and high-contrast styling',
      'Direct contact or inquiry form routing',
      'Domain and hosting setup guidance'
    ],
    technologies: ['HTML / CSS / JS', 'React', 'Tailwind CSS'],
    turnaroundTime: 'Scope-dependent (typically 1–2 weeks)',
    startingPrice: 'Custom quote based on scope'
  },
  {
    id: 'python-automation',
    title: 'Python Scripting & Automation',
    clientProblem: 'Manual administrative routines like renaming files, combining spreadsheet exports, or extracting text consume hours of repetitive labor.',
    deliverables: [
      'Targeted Python scripts for file sorting and directory restructuring',
      'Automated CSV / Excel cleanup and column merging',
      'Step-by-step setup documentation and execution commands',
      'Error logging to safeguard against accidental overwrites'
    ],
    technologies: ['Python 3', 'Pandas', 'OS / Shutil', 'Regular Expressions'],
    turnaroundTime: 'Scope-dependent (typically 3–7 business days)',
    startingPrice: 'Custom quote based on scope'
  },
  {
    id: 'github-presentation',
    title: 'GitHub & Project Presentation',
    clientProblem: 'Well-written code often goes unnoticed because repository READMEs lack visual hierarchy, installation steps, and live preview links.',
    deliverables: [
      'Polished markdown READMEs with architecture diagrams & instructions',
      'Clear project metadata, badges, and license configurations',
      'Repository restructuring and clean branch guidance',
      'Portfolio-ready screenshot framing and highlights'
    ],
    technologies: ['Markdown', 'Git', 'GitHub Workflows', 'Documentation'],
    turnaroundTime: 'Scope-dependent (typically 2–4 business days)',
    startingPrice: 'Custom quote based on scope'
  },
  {
    id: 'data-dashboards',
    title: 'Basic Data Cleaning & Visualization',
    clientProblem: 'Messy datasets from forms or surveys need systematic sanitization and clear chart summaries for presentations or reports.',
    deliverables: [
      'Data cleaning pipeline for missing or mismatched records',
      'Summary visualizations (bar charts, distribution graphs, trend curves)',
      'Exported clean CSV/Excel datasets and documentation report'
    ],
    technologies: ['Python', 'Pandas', 'Matplotlib / Seaborn', 'Jupyter'],
    turnaroundTime: 'Scope-dependent (typically 5–10 business days)',
    startingPrice: 'Custom quote based on scope'
  }
];
