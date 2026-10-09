import React from 'react';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { siteConfig } from '../data/config';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0B0D0F] border-t border-[#292F32] py-12 text-xs text-[#A4AAA9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-8 pb-8 border-b border-[#1E2326]">
          {/* Brand & Tagline */}
          <div>
            <div className="flex items-center gap-2 text-sm font-bold text-[#F5F5F2]">
              <span className="w-2 h-2 rounded-sm bg-[#C7FF4F]" aria-hidden="true" />
              <span>{siteConfig.name}</span>
            </div>
            <p className="text-xs text-[#A4AAA9] mt-1 max-w-sm">
              BCA (Hons.) Student at Parul University · Exploring Web Architecture, Practical Python Automation & Computer Vision.
            </p>
          </div>

          {/* Quick Section Nav */}
          <div className="flex flex-wrap items-center gap-6 text-xs">
            <a href="#about" className="hover:text-[#F5F5F2] transition-colors">
              About
            </a>
            <a href="#projects" className="hover:text-[#F5F5F2] transition-colors">
              Projects
            </a>
            <a href="#skills" className="hover:text-[#F5F5F2] transition-colors">
              Skills
            </a>
            <a href="#services" className="hover:text-[#F5F5F2] transition-colors">
              Services
            </a>
            <a href="#journey" className="hover:text-[#F5F5F2] transition-colors">
              Journey
            </a>
            <a href="#contact" className="hover:text-[#F5F5F2] transition-colors">
              Contact
            </a>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 p-2 rounded-lg bg-[#121518] border border-[#292F32] hover:border-[#3E4549] text-[#F5F5F2] transition-colors"
            aria-label="Scroll back to top"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#C7FF4F]" />
          </button>
        </div>

        {/* Bottom credits & copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#6B7280]">
          <div className="flex items-center gap-3">
            <span>© {currentYear} {siteConfig.name}. All rights reserved.</span>
            <span>·</span>
            <span className="italic">Designed with curiosity. Built with code.</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={siteConfig.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F5F5F2] transition-colors"
              aria-label="GitHub Profile"
            >
              GitHub
            </a>
            <a
              href={siteConfig.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F5F5F2] transition-colors"
              aria-label="LinkedIn Profile"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="hover:text-[#F5F5F2] transition-colors"
              aria-label="Email Contact"
            >
              {siteConfig.email}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
