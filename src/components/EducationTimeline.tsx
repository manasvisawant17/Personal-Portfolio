import React from 'react';
import { Calendar, BookOpen, Layers, CheckCircle2 } from 'lucide-react';
import { educationJourneyData, learningWorkflow } from '../data/education';

export const EducationTimeline: React.FC = () => {
  return (
    <section id="journey" className="py-20 border-b border-[#292F32]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <span className="text-xs font-mono-code uppercase tracking-wider text-[#C7FF4F]">
            06. Academic Path & Engineering Process
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#F5F5F2] mt-2">
            Education & Learning Journey
          </h2>
          <p className="text-sm sm:text-base text-[#A4AAA9] mt-2 max-w-2xl leading-relaxed">
            A grounded chronological progression documenting undergraduate study at Parul University, self-directed research, and intentional milestones.
          </p>
        </div>

        {/* Education Timeline */}
        <div className="space-y-8 relative before:absolute before:inset-0 before:left-4 md:before:left-1/2 before:w-0.5 before:bg-[#292F32] mb-20">
          {educationJourneyData.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={item.title}
                className={`relative flex flex-col md:flex-row gap-6 md:gap-12 items-start ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline node badge */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#121518] border-2 border-[#C7FF4F] flex items-center justify-center text-[#C7FF4F] z-10">
                  <Calendar className="w-3.5 h-3.5" />
                </div>

                {/* Content Card */}
                <div
                  className={`w-full md:w-[calc(50%-3rem)] pl-12 md:pl-0 ${
                    isEven ? 'md:text-right' : 'md:text-left'
                  }`}
                >
                  <div className="bg-[#171B1F] border border-[#292F32] rounded-2xl p-6 transition-colors hover:border-[#3E4549]">
                    <div className="flex flex-wrap items-center gap-2 mb-2 font-mono-code text-xs text-[#A4AAA9]">
                      <span className="text-[#C7FF4F] font-semibold">{item.period}</span>
                      <span>·</span>
                      <span>{item.institution}</span>
                    </div>

                    <h3 className="text-lg font-bold text-[#F5F5F2] mb-1">
                      {item.title}
                    </h3>

                    <p className="text-xs text-[#A4AAA9] font-medium mb-3">
                      {item.status}
                    </p>

                    <p className="text-xs sm:text-sm text-[#A4AAA9] leading-relaxed mb-4">
                      {item.description}
                    </p>

                    {/* Key focus areas list */}
                    <div className="pt-3 border-t border-[#242A2E]">
                      <span className="text-[11px] font-mono-code uppercase text-[#6B7280] block mb-2">
                        Core Subjects & Focus Areas:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {item.focusAreas.map((area) => (
                          <span
                            key={area}
                            className="px-2 py-0.5 text-[11px] rounded bg-[#121518] border border-[#292F32] text-[#F5F5F2]"
                          >
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* "How I Build" Engineering Process (Understand → Plan → Build → Test → Improve) */}
        <div className="bg-[#121518] border border-[#292F32] rounded-2xl p-6 sm:p-8">
          <div className="mb-6">
            <span className="text-xs font-mono-code uppercase text-[#C7FF4F]">
              Engineering Discipline
            </span>
            <h3 className="text-xl font-bold text-[#F5F5F2] mt-1">
              "How I Build" — Development Workflow
            </h3>
            <p className="text-xs sm:text-sm text-[#A4AAA9] mt-1">
              A disciplined, reproducible cycle practiced across every academic project, script, and website.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {learningWorkflow.map((item) => (
              <div
                key={item.step}
                className="bg-[#171B1F] border border-[#292F32] rounded-xl p-4 flex flex-col justify-between"
              >
                <div>
                  <div className="font-mono-code text-sm font-bold text-[#C7FF4F] mb-1.5">
                    {item.step}
                  </div>
                  <h4 className="text-sm font-semibold text-[#F5F5F2] mb-1.5">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#A4AAA9] leading-relaxed">
                    {item.summary}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
