import React from 'react';
import { ArrowDown, ArrowUpRight, Github, Code2, Sparkles, Terminal } from 'lucide-react';
import { siteConfig } from '../data/config';

interface HeroProps {
  onOpenInquiry: () => void;
  onExploreProjects: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenInquiry, onExploreProjects }) => {
  return (
    <section
      id="home"
      className="relative pt-12 pb-16 md:pt-20 md:pb-24 border-b border-[#292F32] overflow-hidden"
    >
      {/* Background architectural grid lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #F5F5F2 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Typographic Narrative */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Availability Indicator */}
            {siteConfig.isAvailableForWork && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#171B1F] border border-[#292F32] text-xs text-[#A4AAA9] mb-6">
                <span className="w-2 h-2 rounded-full bg-[#C7FF4F]" aria-hidden="true" />
                <span className="font-medium text-[#F5F5F2]">{siteConfig.availabilityNote}</span>
              </div>
            )}

            {/* Sub-kicker */}
            <div className="text-xs uppercase tracking-wider font-mono-code text-[#A4AAA9] mb-3">
              BCA (Hons.) Student · Parul University
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#F5F5F2] leading-[1.1] mb-6 max-w-2xl text-balance">
              Building Digital Experiences. Exploring Intelligent Technology.
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-[#A4AAA9] leading-relaxed max-w-xl mb-8">
              I'm Manasvi, a BCA (Hons.) student interested in software development, AI/ML, and practical technology. I enjoy learning by building projects and turning ideas into working solutions.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              {/* Primary CTA */}
              <button
                onClick={onExploreProjects}
                className="w-full sm:w-auto px-5 py-3 text-sm font-semibold text-[#0B0D0F] bg-[#C7FF4F] hover:bg-[#B5F237] rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Explore My Work</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              {/* Secondary CTA */}
              <button
                onClick={onOpenInquiry}
                className="w-full sm:w-auto px-5 py-3 text-sm font-semibold text-[#F5F5F2] bg-[#171B1F] hover:bg-[#1D2228] border border-[#292F32] hover:border-[#3E4549] rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <span>Let's Work Together</span>
                <ArrowUpRight className="w-4 h-4 text-[#C7FF4F]" />
              </button>

              {/* Third CTA: View GitHub */}
              <a
                href={siteConfig.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-4 py-3 text-sm font-medium text-[#A4AAA9] hover:text-[#F5F5F2] hover:bg-[#121518] rounded-lg transition-colors flex items-center justify-center gap-2 border border-transparent hover:border-[#292F32]"
              >
                <Github className="w-4 h-4" />
                <span>View My GitHub</span>
              </a>
            </div>
          </div>

          {/* Right Column: Tasteful Technical Computational Artwork */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-md bg-[#121518] border border-[#292F32] rounded-2xl p-6 relative overflow-hidden shadow-2xl">
              {/* Header bar of technical widget */}
              <div className="flex items-center justify-between pb-4 border-b border-[#292F32] mb-6 text-xs text-[#A4AAA9] font-mono-code">
                <div className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-[#C7FF4F]" />
                  <span>system.runtime / dev</span>
                </div>
                <span className="text-[#6B7280]">parul.edu.in</span>
              </div>

              {/* Interactive Vector Geometry Artwork */}
              <div className="relative h-64 rounded-xl bg-[#0B0D0F] border border-[#292F32] p-4 flex flex-col justify-between overflow-hidden">
                <svg
                  viewBox="0 0 320 200"
                  className="w-full h-full text-[#A4AAA9]"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Grid Lines */}
                  <line x1="20" y1="20" x2="300" y2="20" stroke="#1F2428" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="20" y1="70" x2="300" y2="70" stroke="#1F2428" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="20" y1="120" x2="300" y2="120" stroke="#1F2428" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="20" y1="170" x2="300" y2="170" stroke="#1F2428" strokeWidth="1" strokeDasharray="4 4" />

                  <line x1="60" y1="10" x2="60" y2="190" stroke="#1F2428" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="160" y1="10" x2="160" y2="190" stroke="#1F2428" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="260" y1="10" x2="260" y2="190" stroke="#1F2428" strokeWidth="1" strokeDasharray="4 4" />

                  {/* Geometric Computational Graph */}
                  <path
                    d="M 40 140 Q 90 60, 160 90 T 280 40"
                    stroke="#C7FF4F"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    className="transition-all duration-700"
                  />
                  <path
                    d="M 40 160 Q 110 110, 180 130 T 280 70"
                    stroke="#292F32"
                    strokeWidth="2"
                    strokeDasharray="6 4"
                  />

                  {/* Pipeline Nodes */}
                  <circle cx="40" cy="140" r="5" fill="#171B1F" stroke="#C7FF4F" strokeWidth="2" />
                  <circle cx="160" cy="90" r="5" fill="#171B1F" stroke="#C7FF4F" strokeWidth="2" />
                  <circle cx="280" cy="40" r="5" fill="#C7FF4F" />

                  {/* Monospace Labels inside Vector */}
                  <text x="45" y="130" fill="#A4AAA9" fontSize="9" fontFamily="monospace">input.data</text>
                  <text x="165" y="80" fill="#C7FF4F" fontSize="9" fontFamily="monospace">model.eval()</text>
                  <text x="235" y="30" fill="#F5F5F2" fontSize="9" fontFamily="monospace">inference.ok</text>
                </svg>

                {/* Live parameter readout */}
                <div className="flex items-center justify-between text-[11px] font-mono-code text-[#A4AAA9] pt-2 border-t border-[#1F2428]">
                  <span>ARCH: Hybrid Client / Py</span>
                  <span className="text-[#C7FF4F]">STATUS: Active</span>
                </div>
              </div>

              {/* Micro technical details */}
              <div className="mt-5 space-y-2">
                <div className="flex items-center justify-between text-xs text-[#A4AAA9]">
                  <span className="flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5 text-[#C7FF4F]" />
                    <span>Focus Stack</span>
                  </span>
                  <span className="text-[#F5F5F2] font-mono-code text-[11px]">React · Python · OpenCV</span>
                </div>
                <div className="flex items-center justify-between text-xs text-[#A4AAA9]">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#C7FF4F]" />
                    <span>Approach</span>
                  </span>
                  <span className="text-[#F5F5F2] font-mono-code text-[11px]">Iterative Project-Based</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width context / proof strip below the hero split */}
        <div className="mt-14 pt-8 border-t border-[#292F32] grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
          <div>
            <p className="text-xs text-[#A4AAA9] uppercase font-mono-code">Academic Degree</p>
            <p className="text-base font-semibold text-[#F5F5F2] mt-1">BCA (Hons.)</p>
            <p className="text-xs text-[#6B7280]">Parul University</p>
          </div>
          <div>
            <p className="text-xs text-[#A4AAA9] uppercase font-mono-code">Current Standing</p>
            <p className="text-base font-semibold text-[#F5F5F2] mt-1">3rd Year · Sem 5</p>
            <p className="text-xs text-[#6B7280]">Graduating 2028</p>
          </div>
          <div>
            <p className="text-xs text-[#A4AAA9] uppercase font-mono-code">Specialization</p>
            <p className="text-base font-semibold text-[#F5F5F2] mt-1">Web & AI / ML</p>
            <p className="text-xs text-[#6B7280]">Computer Vision & Systems</p>
          </div>
          <div>
            <p className="text-xs text-[#A4AAA9] uppercase font-mono-code">Engagement</p>
            <p className="text-base font-semibold text-[#F5F5F2] mt-1">Internships & Web</p>
            <p className="text-xs text-[#6B7280]">Freelance Inquiries</p>
          </div>
        </div>
      </div>
    </section>
  );
};
