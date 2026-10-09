import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, FolderGit2 } from 'lucide-react';
import { projectsData } from '../data/projects';
import { Project, ProjectCategory } from '../types';
import { ProjectCard } from './ProjectCard';

interface ProjectGalleryProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectGallery: React.FC<ProjectGalleryProps> = ({ onSelectProject }) => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'newest'>('featured');

  const categories: ProjectCategory[] = [
    'All',
    'Web Development',
    'Python',
    'AI/ML',
    'Computer Vision',
    'Automation',
  ];

  const filteredProjects = useMemo(() => {
    return projectsData
      .filter((project) => {
        // Category filter
        if (selectedCategory !== 'All') {
          if (selectedCategory === 'Python') {
            const hasPython = project.technologies.some((t) => t.toLowerCase().includes('python'));
            if (!hasPython) return false;
          } else if (selectedCategory === 'AI/ML') {
            const isAi = project.category === 'AI/ML' || project.technologies.some((t) => /ai|ml|learning|ocr/i.test(t));
            if (!isAi) return false;
          } else if (project.category !== selectedCategory) {
            return false;
          }
        }

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesTitle = project.title.toLowerCase().includes(q);
          const matchesDesc = project.shortDescription.toLowerCase().includes(q) || project.problemStatement.toLowerCase().includes(q);
          const matchesTech = project.technologies.some((t) => t.toLowerCase().includes(q));
          if (!matchesTitle && !matchesDesc && !matchesTech) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'featured') {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
        }
        return b.id.localeCompare(a.id);
      });
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <section id="projects" className="py-20 border-b border-[#292F32]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-xs font-mono-code uppercase tracking-wider text-[#C7FF4F]">
              02. Selected Work
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#F5F5F2] mt-2">
              Featured Projects & Experiments
            </h2>
            <p className="text-sm sm:text-base text-[#A4AAA9] mt-2 max-w-2xl">
              Practical software implementations, computer vision investigations, and planned automated pipelines. Accurately categorized by verified development status.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto text-xs text-[#A4AAA9] font-mono-code">
            <span>Showing:</span>
            <span className="text-[#F5F5F2] font-semibold">{filteredProjects.length}</span>
            <span>of {projectsData.length} projects</span>
          </div>
        </div>

        {/* Filter Bar & Search Controls */}
        <div className="bg-[#121518] border border-[#292F32] rounded-xl p-4 mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Category Segmented Controls (interactive buttons) */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                      isActive
                        ? 'bg-[#F5F5F2] text-[#0B0D0F] shadow-sm font-semibold'
                        : 'text-[#A4AAA9] hover:text-[#F5F5F2] hover:bg-[#171B1F]'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Search and Sort */}
            <div className="flex items-center gap-3 w-full lg:w-auto">
              <div className="relative flex-1 lg:w-64">
                <Search className="w-3.5 h-3.5 text-[#6B7280] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter by keyword or stack..."
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#171B1F] border border-[#292F32] rounded-lg text-[#F5F5F2] placeholder-[#6B7280] focus:border-[#C7FF4F] focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#A4AAA9]" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'featured' | 'newest')}
                  className="bg-[#171B1F] border border-[#292F32] rounded-lg px-2.5 py-1.5 text-xs text-[#F5F5F2] focus:border-[#C7FF4F] focus:outline-none"
                  aria-label="Sort projects"
                >
                  <option value="featured">Featured First</option>
                  <option value="newest">Recent First</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Project Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onViewDetails={onSelectProject}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-[#121518] border border-[#292F32] rounded-2xl p-12 text-center max-w-md mx-auto">
            <FolderGit2 className="w-8 h-8 text-[#A4AAA9] mx-auto mb-3 opacity-60" />
            <h3 className="text-base font-semibold text-[#F5F5F2]">No projects match your filter</h3>
            <p className="text-xs text-[#A4AAA9] mt-1.5 mb-5">
              Try adjusting your search keywords or reset category filters to view all entries.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 text-xs font-semibold text-[#0B0D0F] bg-[#C7FF4F] hover:bg-[#B5F237] rounded-lg transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
