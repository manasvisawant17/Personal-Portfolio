import React from 'react';
import { GraduationCap, Code, Compass, FileText, ArrowUpRight } from 'lucide-react';
import { siteConfig } from '../data/config';

interface AboutProps {
  onOpenResume: () => void;
  onOpenInquiry: () => void;
}

export const About: React.FC<AboutProps> = ({ onOpenResume, onOpenInquiry }) => {
  return (
    <section id="about" className="py-20 border-b border-[#292F32]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <span className="text-xs font-mono-code uppercase tracking-wider text-[#C7FF4F]">
            01. Background & Philosophy
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#F5F5F2] mt-2">
            About Manasvi Sawant
          </h2>
          <p className="text-sm sm:text-base text-[#A4AAA9] mt-2 max-w-2xl">
            A transparent overview of my undergraduate journey, core technical interests, and pragmatic approach to software development.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Authentic narrative & philosophy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4 text-base text-[#A4AAA9] leading-relaxed">
              {siteConfig.aboutStory.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-[#292F32]">
              <div className="p-4 rounded-xl bg-[#171B1F] border border-[#292F32]">
                <GraduationCap className="w-5 h-5 text-[#C7FF4F] mb-2" />
                <h3 className="text-sm font-semibold text-[#F5F5F2]">Formal Foundation</h3>
                <p className="text-xs text-[#A4AAA9] mt-1 leading-normal">
                  BCA (Hons.) at Parul University covering data structures, OS, DBMS, and algorithms.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#171B1F] border border-[#292F32]">
                <Code className="w-5 h-5 text-[#C7FF4F] mb-2" />
                <h3 className="text-sm font-semibold text-[#F5F5F2]">Applied Execution</h3>
                <p className="text-xs text-[#A4AAA9] mt-1 leading-normal">
                  Reinforcing university lectures by shipping tangible web apps and Python utilities.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#171B1F] border border-[#292F32]">
                <Compass className="w-5 h-5 text-[#C7FF4F] mb-2" />
                <h3 className="text-sm font-semibold text-[#F5F5F2]">Growth Trajectory</h3>
                <p className="text-xs text-[#A4AAA9] mt-1 leading-normal">
                  Pursuing summer internships, open collaborative repos, and well-scoped freelance work.
                </p>
              </div>
            </div>

            {/* Resume and Collaboration CTA */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenResume}
                className="px-4 py-2.5 text-xs font-semibold text-[#F5F5F2] bg-[#171B1F] hover:bg-[#1D2228] border border-[#292F32] hover:border-[#3E4549] rounded-lg transition-colors flex items-center gap-2"
              >
                <FileText className="w-4 h-4 text-[#C7FF4F]" />
                <span>View & Download Resume</span>
              </button>

              <button
                onClick={onOpenInquiry}
                className="px-4 py-2.5 text-xs font-semibold text-[#0B0D0F] bg-[#C7FF4F] hover:bg-[#B5F237] rounded-lg transition-colors flex items-center gap-2"
              >
                <span>Discuss Collaboration</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Profile identity card */}
          <div className="lg:col-span-5">
            <div className="bg-[#121518] border border-[#292F32] rounded-2xl p-6 sm:p-8 space-y-6">
              {/* Profile Monogram / Visual Brand Mark */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-[#171B1F] border border-[#292F32] flex items-center justify-center text-xl font-bold font-mono-code text-[#C7FF4F]">
                  MS
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#F5F5F2]">{siteConfig.name}</h3>
                  <p className="text-xs text-[#A4AAA9]">{siteConfig.role}</p>
                  <p className="text-xs text-[#6B7280] font-mono-code mt-0.5">Vadodara / Gujarat, India</p>
                </div>
              </div>

              {/* Verified academic facts */}
              <div className="divide-y divide-[#292F32] text-xs">
                <div className="py-2.5 flex justify-between items-center">
                  <span className="text-[#A4AAA9]">University</span>
                  <span className="font-medium text-[#F5F5F2]">Parul University</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="text-[#A4AAA9]">Degree Program</span>
                  <span className="font-medium text-[#F5F5F2]">BCA (Honours)</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="text-[#A4AAA9]">Current Semester</span>
                  <span className="font-medium text-[#F5F5F2]">Semester 5 (3rd Year)</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="text-[#A4AAA9]">Target Graduation</span>
                  <span className="font-medium text-[#F5F5F2]">2028 (Scheduled)</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="text-[#A4AAA9]">Primary Language</span>
                  <span className="font-medium text-[#F5F5F2]">Python · JavaScript · SQL</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="text-[#A4AAA9]">Exploratory Domains</span>
                  <span className="font-medium text-[#F5F5F2]">Computer Vision · Web Apps</span>
                </div>
              </div>

              {/* Honesty Reassurance Box */}
              <div className="p-3.5 rounded-lg bg-[#171B1F] border border-[#292F32] text-[11px] text-[#A4AAA9] leading-relaxed">
                <span className="font-semibold text-[#F5F5F2] block mb-1">Authentic Profile Guarantee:</span>
                All projects, educational milestones, and skill proficiencies documented here reflect actual student coursework and ongoing learning without exaggerated claims or simulated senior experience.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
