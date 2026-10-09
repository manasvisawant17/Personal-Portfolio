import React, { useEffect } from 'react';
import { X, Github, ExternalLink, CheckCircle, Info, Layers } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-2xl bg-[#121518] border border-[#292F32] rounded-2xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-[#292F32] bg-[#171B1F]">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#A4AAA9] mb-1.5 font-mono-code">
              <span>{project.category}</span>
              <span>·</span>
              <span className="text-[#C7FF4F]">{project.status}</span>
              <span>·</span>
              <span>{project.date}</span>
            </div>
            <h2
              id="modal-project-title"
              className="text-xl sm:text-2xl font-bold text-[#F5F5F2]"
            >
              {project.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#A4AAA9] hover:text-[#F5F5F2] hover:bg-[#1D2228] rounded-lg transition-colors border border-transparent hover:border-[#292F32]"
            aria-label="Close project modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-[#A4AAA9]">
          {/* Problem Statement */}
          <div>
            <h3 className="text-xs font-mono-code uppercase tracking-wider text-[#F5F5F2] mb-1.5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
              The Problem Context
            </h3>
            <p className="leading-relaxed bg-[#171B1F] p-4 rounded-xl border border-[#292F32] text-xs sm:text-sm">
              {project.problemStatement}
            </p>
          </div>

          {/* Solution & Implementation */}
          <div>
            <h3 className="text-xs font-mono-code uppercase tracking-wider text-[#F5F5F2] mb-1.5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#C7FF4F] rounded-full" />
              Solution & Engineering Approach
            </h3>
            <p className="leading-relaxed bg-[#171B1F] p-4 rounded-xl border border-[#292F32] text-xs sm:text-sm">
              {project.solutionDescription}
            </p>
          </div>

          {/* Technical Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div>
              <h3 className="text-xs font-mono-code uppercase tracking-wider text-[#F5F5F2] mb-2">
                Key Technical Highlights
              </h3>
              <ul className="space-y-2">
                {project.highlights.map((highlight, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-[#F5F5F2]"
                  >
                    <CheckCircle className="w-4 h-4 text-[#C7FF4F] shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Architecture Notes */}
          {project.architectureNotes && (
            <div className="p-4 rounded-xl bg-[#0B0D0F] border border-[#292F32]">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#F5F5F2] mb-1 font-mono-code">
                <Layers className="w-3.5 h-3.5 text-[#C7FF4F]" />
                <span>Architecture Specification</span>
              </div>
              <p className="text-xs text-[#A4AAA9] leading-relaxed">
                {project.architectureNotes}
              </p>
            </div>
          )}

          {/* Technologies Stack */}
          <div>
            <h3 className="text-xs font-mono-code uppercase tracking-wider text-[#F5F5F2] mb-2">
              Technology Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-xs font-medium rounded-md bg-[#171B1F] border border-[#292F32] text-[#F5F5F2]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 border-t border-[#292F32] bg-[#171B1F] flex items-center justify-between flex-wrap gap-3">
          <div className="text-xs text-[#6B7280] font-mono-code">
            Verified Educational Project Entry
          </div>

          <div className="flex items-center gap-3">
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-xs font-semibold text-[#F5F5F2] bg-[#121518] hover:bg-[#1D2228] border border-[#292F32] rounded-lg transition-colors flex items-center gap-2"
              >
                <Github className="w-4 h-4" />
                <span>View on GitHub</span>
              </a>
            ) : (
              <span className="text-xs text-[#6B7280] italic">
                (Repository in active private development)
              </span>
            )}

            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-xs font-semibold text-[#0B0D0F] bg-[#C7FF4F] hover:bg-[#B5F237] rounded-lg transition-colors flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Demo</span>
              </a>
            )}

            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-[#A4AAA9] hover:text-[#F5F5F2] transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
