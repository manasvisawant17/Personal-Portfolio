import React from 'react';
import { ExternalLink, Github, ArrowRight, Layers, Eye } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  onViewDetails: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onViewDetails }) => {
  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'Completed':
        return 'text-[#C7FF4F]';
      case 'In Progress':
        return 'text-amber-400';
      case 'Planned':
        return 'text-sky-400';
    }
  };

  return (
    <article className="group bg-[#171B1F] border border-[#292F32] hover:border-[#3E4549] rounded-2xl p-6 flex flex-col justify-between transition-all duration-200">
      <div>
        {/* Card Header & Unboxed Metadata */}
        <div className="flex items-center justify-between text-xs text-[#A4AAA9] mb-3">
          <div className="flex items-center gap-2">
            <span className="font-medium text-[#F5F5F2]">{project.category}</span>
            <span aria-hidden="true">·</span>
            <span>{project.date}</span>
          </div>

          <div className="flex items-center gap-1.5 font-mono-code text-[11px]">
            <span className={`w-1.5 h-1.5 rounded-full ${project.status === 'Completed' ? 'bg-[#C7FF4F]' : project.status === 'In Progress' ? 'bg-amber-400' : 'bg-sky-400'}`} />
            <span className={getStatusColor(project.status)}>{project.status}</span>
          </div>
        </div>

        {/* Technical Vector Preview Thumbnail */}
        <div className="h-36 w-full rounded-xl bg-[#0B0D0F] border border-[#242A2E] p-4 mb-5 flex flex-col justify-between relative overflow-hidden group-hover:border-[#2F373C] transition-colors">
          <div className="flex items-center justify-between text-[11px] font-mono-code text-[#6B7280]">
            <span>id: {project.id}</span>
            {project.featured && (
              <span className="text-[#C7FF4F] font-semibold">Featured Work</span>
            )}
          </div>

          {/* Abstract dynamic wireframe illustration based on project type */}
          <div className="flex items-center justify-center py-2 text-[#A4AAA9]/70">
            {project.category === 'Computer Vision' ? (
              <svg viewBox="0 0 160 60" className="w-full h-12" fill="none">
                <rect x="10" y="5" width="140" height="50" rx="4" stroke="#292F32" strokeWidth="1.5" strokeDasharray="3 3" />
                <rect x="30" y="15" width="40" height="30" rx="2" stroke="#C7FF4F" strokeWidth="1.5" />
                <rect x="80" y="20" width="60" height="15" rx="2" stroke="#292F32" strokeWidth="1" />
                <circle cx="50" cy="30" r="3" fill="#C7FF4F" />
                <text x="35" y="40" fill="#C7FF4F" fontSize="8" fontFamily="monospace">OCR.scan</text>
              </svg>
            ) : project.category === 'Automation' ? (
              <svg viewBox="0 0 160 60" className="w-full h-12" fill="none">
                <circle cx="30" cy="30" r="14" stroke="#C7FF4F" strokeWidth="1.5" />
                <line x1="44" y1="30" x2="76" y2="30" stroke="#292F32" strokeWidth="2" strokeDasharray="4 2" />
                <rect x="76" y="16" width="28" height="28" rx="3" stroke="#292F32" strokeWidth="1.5" />
                <line x1="104" y1="30" x2="136" y2="30" stroke="#292F32" strokeWidth="2" strokeDasharray="4 2" />
                <circle cx="136" cy="30" r="8" fill="#C7FF4F" />
                <text x="82" y="33" fill="#A4AAA9" fontSize="8" fontFamily="monospace">.py</text>
              </svg>
            ) : (
              <svg viewBox="0 0 160 60" className="w-full h-12" fill="none">
                <rect x="15" y="10" width="130" height="42" rx="4" stroke="#292F32" strokeWidth="1.5" />
                <line x1="15" y1="22" x2="145" y2="22" stroke="#292F32" strokeWidth="1" />
                <circle cx="23" cy="16" r="2" fill="#C7FF4F" />
                <circle cx="31" cy="16" r="2" fill="#A4AAA9" />
                <line x1="25" y1="32" x2="90" y2="32" stroke="#C7FF4F" strokeWidth="1.5" />
                <line x1="25" y1="40" x2="120" y2="40" stroke="#292F32" strokeWidth="1.5" />
              </svg>
            )}
          </div>

          <div className="flex items-center justify-between text-[10px] text-[#A4AAA9] font-mono-code">
            <span>MOD: {project.category.toUpperCase()}</span>
            <span className="text-[#C7FF4F] flex items-center gap-1">
              <Eye className="w-3 h-3" /> Inspect Spec
            </span>
          </div>
        </div>

        {/* Project Title */}
        <h3 className="text-lg font-bold text-[#F5F5F2] group-hover:text-[#C7FF4F] transition-colors mb-2">
          {project.title}
        </h3>

        {/* Short Problem / Solution snippet */}
        <p className="text-xs sm:text-sm text-[#A4AAA9] leading-relaxed mb-4 line-clamp-3">
          {project.shortDescription}
        </p>

        {/* Technologies as clean unboxed typography */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#A4AAA9] mb-6 pt-3 border-t border-[#242A2E]">
          <span className="text-[#6B7280] font-mono-code text-[11px]">Stack:</span>
          {project.technologies.map((tech, i) => (
            <React.Fragment key={tech}>
              <span className="text-[#F5F5F2] font-medium">{tech}</span>
              {i < project.technologies.length - 1 && <span className="text-[#3E4549]">/</span>}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-[#292F32]">
        <button
          onClick={() => onViewDetails(project)}
          className="text-xs font-semibold text-[#F5F5F2] hover:text-[#C7FF4F] transition-colors flex items-center gap-1.5 py-1"
        >
          <span>View Details</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <div className="flex items-center gap-3">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#A4AAA9] hover:text-[#F5F5F2] transition-colors p-1"
              aria-label={`GitHub repo for ${project.title}`}
              title="GitHub repository"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
          {project.liveDemoUrl && (
            <a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#A4AAA9] hover:text-[#C7FF4F] transition-colors p-1"
              aria-label={`Live demo for ${project.title}`}
              title="Live preview"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
};
