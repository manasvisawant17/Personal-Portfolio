import React, { useState } from 'react';
import { skillCategoriesData } from '../data/skills';
import { SkillProficiency } from '../types';

export const Skills: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const categoriesList = ['All', ...skillCategoriesData.map((c) => c.category)];

  const displayedCategories = activeFilter === 'All'
    ? skillCategoriesData
    : skillCategoriesData.filter((c) => c.category === activeFilter);

  const getLevelBadgeClass = (level: SkillProficiency) => {
    switch (level) {
      case 'Building Projects':
        return 'text-[#C7FF4F]';
      case 'Learning':
        return 'text-amber-400';
      case 'Academic Exposure':
        return 'text-sky-400';
      case 'Familiar':
        return 'text-[#A4AAA9]';
    }
  };

  return (
    <section id="skills" className="py-20 border-b border-[#292F32]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10">
          <span className="text-xs font-mono-code uppercase tracking-wider text-[#C7FF4F]">
            04. Technical Capabilities
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#F5F5F2] mt-2">
            Skills & Knowledge Profile
          </h2>
          <p className="text-sm sm:text-base text-[#A4AAA9] mt-2 max-w-2xl leading-relaxed">
            Honest breakdown of competencies structured around active projects and undergraduate coursework. No arbitrary percentage bars or exaggerated claims.
          </p>
        </div>

        {/* Category Filter Pills (interactive controls) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categoriesList.map((cat) => {
            const isActive = activeFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-[#F5F5F2] text-[#0B0D0F] font-semibold'
                    : 'bg-[#121518] border border-[#292F32] text-[#A4AAA9] hover:text-[#F5F5F2] hover:bg-[#171B1F]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Legend for transparency */}
        <div className="mb-8 p-3 rounded-lg bg-[#121518] border border-[#292F32] flex flex-wrap items-center gap-6 text-xs text-[#A4AAA9] font-mono-code">
          <span className="text-[#6B7280]">Proficiency Tiers:</span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#C7FF4F]" />
            <strong className="text-[#F5F5F2]">Building Projects</strong> (Active application in codebases)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <strong className="text-[#F5F5F2]">Learning</strong> (Hands-on study & exercises)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-sky-400" />
            <strong className="text-[#F5F5F2]">Academic Exposure</strong> (University syllabus / theory)
          </span>
        </div>

        {/* Grid of Skill Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedCategories.map((group) => (
            <div
              key={group.category}
              className="bg-[#171B1F] border border-[#292F32] rounded-2xl p-6 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-base font-bold text-[#F5F5F2] mb-1">
                  {group.category}
                </h3>
                <p className="text-xs text-[#A4AAA9] mb-5 leading-normal">
                  {group.description}
                </p>

                <div className="space-y-3.5 divide-y divide-[#242A2E]">
                  {group.skills.map((skill, idx) => (
                    <div
                      key={skill.name}
                      className={`flex flex-col gap-1 ${idx > 0 ? 'pt-3.5' : ''}`}
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-[#F5F5F2]">{skill.name}</span>
                        <span
                          className={`font-mono-code text-[11px] font-medium ${getLevelBadgeClass(
                            skill.level
                          )}`}
                        >
                          {skill.level}
                        </span>
                      </div>

                      {skill.context && (
                        <p className="text-[11px] text-[#A4AAA9] leading-tight">
                          {skill.context}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
