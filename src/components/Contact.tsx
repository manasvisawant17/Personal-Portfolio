import React, { useState } from 'react';
import { Mail, Copy, Check, ArrowUpRight, Github, Linkedin, MessageSquare } from 'lucide-react';
import { siteConfig } from '../data/config';

interface ContactProps {
  onOpenInquiry: () => void;
  onToast: (type: 'success' | 'error' | 'info', title: string, desc?: string) => void;
}

export const Contact: React.FC<ContactProps> = ({ onOpenInquiry, onToast }) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);
      onToast('success', 'Email Copied', `${siteConfig.email} copied to clipboard.`);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      onToast('info', 'Copy Failed', `Please manually select: ${siteConfig.email}`);
    }
  };

  return (
    <section id="contact" className="py-20 border-b border-[#292F32]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#121518] border border-[#292F32] rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden">
          {/* Subtle architectural gradient accent in corner */}
          <div
            className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none opacity-10"
            style={{
              background: 'radial-gradient(circle, #C7FF4F 0%, transparent 70%)',
            }}
            aria-hidden="true"
          />

          <div className="max-w-2xl relative z-10">
            <span className="text-xs font-mono-code uppercase tracking-wider text-[#C7FF4F]">
              08. Connect & Collaborate
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#F5F5F2] mt-3 leading-tight">
              Let's Discuss Internships, Projects, or Code.
            </h2>
            <p className="text-sm sm:text-base text-[#A4AAA9] mt-4 leading-relaxed">
              Whether you are recruiting for software engineering or web internships, seeking a responsive landing page for your brand, or looking to discuss computer vision projects—I would be delighted to connect.
            </p>

            {/* Direct Email Action Strip */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href={`mailto:${siteConfig.email}`}
                className="px-5 py-3.5 text-xs sm:text-sm font-semibold text-[#0B0D0F] bg-[#C7FF4F] hover:bg-[#B5F237] rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <Mail className="w-4 h-4" />
                <span>Email: {siteConfig.email}</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <button
                onClick={handleCopyEmail}
                className="px-4 py-3.5 text-xs font-medium text-[#F5F5F2] bg-[#171B1F] hover:bg-[#1D2228] border border-[#292F32] rounded-xl transition-colors flex items-center justify-center gap-2"
                aria-label="Copy email address to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-[#C7FF4F]" />
                    <span className="text-[#C7FF4F]">Copied to Clipboard</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[#A4AAA9]" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>

              <button
                onClick={onOpenInquiry}
                className="px-4 py-3.5 text-xs font-semibold text-[#F5F5F2] bg-[#171B1F] hover:bg-[#1D2228] border border-[#292F32] rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-[#C7FF4F]" />
                <span>Open Project Brief Form</span>
              </button>
            </div>

            {/* Verified Social Profiles Strip */}
            <div className="mt-10 pt-8 border-t border-[#292F32] flex flex-wrap items-center gap-6 text-xs text-[#A4AAA9]">
              <span className="font-mono-code text-[#6B7280]">Verified Profiles:</span>

              {siteConfig.githubUrl && (
                <a
                  href={siteConfig.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-[#F5F5F2] transition-colors"
                >
                  <Github className="w-4 h-4 text-[#C7FF4F]" />
                  <span>GitHub (@{siteConfig.githubUsername})</span>
                </a>
              )}

              {siteConfig.linkedinUrl && (
                <a
                  href={siteConfig.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-[#F5F5F2] transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-[#C7FF4F]" />
                  <span>LinkedIn (Manasvi Sawant)</span>
                </a>
              )}

              {siteConfig.instagramUrl && (
                <a
                  href={siteConfig.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-[#F5F5F2] transition-colors"
                >
                  <span>Instagram</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
