import React, { useEffect } from 'react';
import { X, Download, Printer, CheckCircle2, FileText, ExternalLink } from 'lucide-react';
import { siteConfig } from '../data/config';
import { projectsData } from '../data/projects';
import { skillCategoriesData } from '../data/skills';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onToast: (type: 'success' | 'error' | 'info', title: string, desc?: string) => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose, onToast }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Generate clean text resume export
    const resumeText = `MANASVI SAWANT
BCA (Hons.) Student | Aspiring AI/ML & Web Developer
Email: ${siteConfig.email}
GitHub: ${siteConfig.githubUrl}
LinkedIn: ${siteConfig.linkedinUrl}

============================================================
EDUCATION
============================================================
Bachelor of Computer Applications (BCA Hons.)
Parul University — Vadodara, Gujarat, India
Status: 3rd Year · Semester 5 (Graduation: Expected 2028)
Relevant Coursework: Data Structures, Database Systems (SQL),
Operating Systems, Object-Oriented Programming (Java/Python),
Computer Networks, Introductory Deep Learning & Computer Vision.

============================================================
TECHNICAL SKILLS
============================================================
Languages: Python, JavaScript (ES6+), HTML5, CSS3, SQL, Java (Introductory)
Web Development: React, Tailwind CSS, TypeScript, Express, REST APIs
Data & AI/ML: OpenCV, Tesseract OCR, NumPy, Pandas, Data Preprocessing
Developer Tools: Git, GitHub, VS Code, Linux/Bash basics, Postman

============================================================
SELECTED PROJECTS
============================================================
1. Smart Library Resource Management System [In Progress]
   - Stack: React, TypeScript, Node.js, Express, Relational SQL
   - Built catalog indexing, inventory copy management, and member loan tracking.

2. MedScribe [Computer Vision & OCR Prototype - In Progress]
   - Stack: Python, OpenCV, Tesseract OCR, NumPy
   - Image pre-processing (adaptive thresholding, Gaussian filters) to isolate prescription text.

3. Developer & Freelance Portfolio [In Progress]
   - Stack: React, TypeScript, Tailwind CSS, GitHub REST API
   - Engineered responsive SPA with live repository syncing, dark/light themes, and WCAG AA contrast.

4. Python Automation Toolkit [Planned]
   - Stack: Python, OS/Shutil, Pandas, Regular Expressions
   - Planned directory sorter and spreadsheet extraction scripts.

============================================================
AVAILABILITY
============================================================
Open for Summer 2027/2028 Software Engineering & Web Internships,
and well-scoped freelance client web projects.
`;

    const blob = new Blob([resumeText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Manasvi_Sawant_Resume_Profile.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    onToast('success', 'Resume Downloaded', 'Summary profile saved as text document. Use the Print button for PDF formatting.');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-dialog-title"
    >
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-3xl bg-[#121518] border border-[#292F32] rounded-2xl shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-[#292F32] bg-[#171B1F] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-[#C7FF4F]" />
            <div>
              <h2 id="resume-dialog-title" className="text-lg font-bold text-[#F5F5F2]">
                Resume & Academic Profile Summary
              </h2>
              <p className="text-xs text-[#A4AAA9]">
                Verified information for internship recruiters and hiring managers
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 text-[#A4AAA9] hover:text-[#F5F5F2] hover:bg-[#1D2228] rounded-lg transition-colors border border-[#292F32]"
              title="Print / Save to PDF"
              aria-label="Print resume"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={handleDownload}
              className="p-2 text-[#0B0D0F] bg-[#C7FF4F] hover:bg-[#B5F237] rounded-lg transition-colors font-medium text-xs flex items-center gap-1.5"
              title="Download text resume"
              aria-label="Download resume"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Download</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-[#A4AAA9] hover:text-[#F5F5F2] rounded-lg border border-transparent hover:border-[#292F32]"
              aria-label="Close resume dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Structured Resume Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-xs sm:text-sm text-[#A4AAA9]">
          {/* Identity Header */}
          <div className="border-b border-[#292F32] pb-6">
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#F5F5F2]">
              {siteConfig.name}
            </h3>
            <p className="text-xs font-mono-code text-[#C7FF4F] mt-1">
              BCA (Hons.) Student · Aspiring AI/ML Developer · Web Developer
            </p>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#A4AAA9]">
              <span>Email: <a href={`mailto:${siteConfig.email}`} className="text-[#F5F5F2] underline">{siteConfig.email}</a></span>
              <span>GitHub: <a href={siteConfig.githubUrl} target="_blank" rel="noreferrer" className="text-[#F5F5F2] underline">@{siteConfig.githubUsername}</a></span>
              <span>Institution: Parul University</span>
            </div>
          </div>

          {/* Education */}
          <div>
            <h4 className="text-xs font-mono-code uppercase tracking-wider text-[#F5F5F2] mb-3">
              Education
            </h4>
            <div className="bg-[#171B1F] p-4 rounded-xl border border-[#292F32]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
                <span className="font-bold text-[#F5F5F2]">
                  Bachelor of Computer Applications (BCA Hons.)
                </span>
                <span className="text-xs font-mono-code text-[#C7FF4F]">
                  2024 – 2028 (In Progress · Semester 5)
                </span>
              </div>
              <p className="text-xs text-[#A4AAA9]">
                Parul University, Vadodara, Gujarat
              </p>
              <p className="text-xs text-[#A4AAA9] mt-2 leading-relaxed">
                Core coursework: Data Structures, Database Systems (Relational SQL), Operating Systems Architecture, Object-Oriented Programming (Java/Python), Web Technologies, Foundations of Computer Vision and Deep Learning.
              </p>
            </div>
          </div>

          {/* Technical Skills */}
          <div>
            <h4 className="text-xs font-mono-code uppercase tracking-wider text-[#F5F5F2] mb-3">
              Technical Proficiencies
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 bg-[#171B1F] rounded-xl border border-[#292F32]">
                <span className="font-bold text-[#F5F5F2] block mb-1">Languages & Systems</span>
                <p className="text-xs text-[#A4AAA9]">Python, JavaScript (ES6+), HTML5, CSS3, SQL, Java (coursework)</p>
              </div>
              <div className="p-3.5 bg-[#171B1F] rounded-xl border border-[#292F32]">
                <span className="font-bold text-[#F5F5F2] block mb-1">Web & Frontend</span>
                <p className="text-xs text-[#A4AAA9]">React, Tailwind CSS, TypeScript, Express REST APIs, Responsive Layouts</p>
              </div>
              <div className="p-3.5 bg-[#171B1F] rounded-xl border border-[#292F32]">
                <span className="font-bold text-[#F5F5F2] block mb-1">AI / ML & Computer Vision</span>
                <p className="text-xs text-[#A4AAA9]">OpenCV, Tesseract OCR, NumPy, Pandas, Data Preprocessing</p>
              </div>
              <div className="p-3.5 bg-[#171B1F] rounded-xl border border-[#292F32]">
                <span className="font-bold text-[#F5F5F2] block mb-1">Workflow & Platforms</span>
                <p className="text-xs text-[#A4AAA9]">Git, GitHub, VS Code, Linux/Bash basic shell, Postman</p>
              </div>
            </div>
          </div>

          {/* Key Projects */}
          <div>
            <h4 className="text-xs font-mono-code uppercase tracking-wider text-[#F5F5F2] mb-3">
              Selected Practical Projects
            </h4>
            <div className="space-y-3">
              {projectsData.map((p) => (
                <div key={p.id} className="p-3.5 bg-[#171B1F] rounded-xl border border-[#292F32]">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#F5F5F2]">{p.title}</span>
                    <span className="text-[11px] font-mono-code text-[#C7FF4F]">{p.status}</span>
                  </div>
                  <p className="text-xs text-[#A4AAA9] mt-1">
                    {p.shortDescription}
                  </p>
                  <p className="text-[11px] font-mono-code text-[#6B7280] mt-1.5">
                    Technologies: {p.technologies.join(', ')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#292F32] bg-[#171B1F] flex items-center justify-between text-xs text-[#6B7280]">
          <span>To configure your official PDF link, replace {siteConfig.resumeFileName} in /src/data/config.ts</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#121518] hover:bg-[#1D2228] text-[#F5F5F2] border border-[#292F32]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
