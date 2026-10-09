import React, { useState, useEffect } from 'react';
import { Sliders, X, Check, Copy, FileCode, ExternalLink, Sparkles } from 'lucide-react';
import { siteConfig } from '../data/config';

interface ConfigGuideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onToast: (type: 'success' | 'error' | 'info', title: string, desc?: string) => void;
}

export const ConfigGuideDrawer: React.FC<ConfigGuideDrawerProps> = ({
  isOpen,
  onClose,
  onToast,
}) => {
  const [copiedFile, setCopiedFile] = useState<string | null>(null);

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

  const handleCopy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedFile(label);
      onToast('success', 'Path Copied', `${label} copied to clipboard.`);
      setTimeout(() => setCopiedFile(null), 2000);
    } catch {
      onToast('info', 'Copy Failed', text);
    }
  };

  const checklistItems = [
    {
      file: 'src/data/config.ts',
      purpose: 'Central profile info, email, GitHub handle, LinkedIn, and availability status.',
      status: 'Current email set to: ' + siteConfig.email
    },
    {
      file: 'src/data/projects.ts',
      purpose: 'Add, update or re-order your personal projects, live demos, and GitHub repositories.',
      status: '4 Initial projects configured (Smart Library, MedScribe, Portfolio, Python Automation)'
    },
    {
      file: 'src/data/skills.ts',
      purpose: 'Edit skill categories and honest proficiency labels (Building Projects, Learning, etc.).',
      status: '7 Categories configured with authentic student learning tiers'
    },
    {
      file: 'src/data/services.ts',
      purpose: 'Set your freelance service rates, turnaround times, and problem descriptions.',
      status: '6 Freelance services configured with custom quote notices'
    },
    {
      file: 'src/data/education.ts',
      purpose: 'Update Parul University semester, graduation date, and focus subjects.',
      status: 'Semester 5 (3rd Year), expected 2028'
    },
    {
      file: 'src/data/journal.ts',
      purpose: 'Add your own learning logs, debugging takeaways, and OpenCV/Python notes.',
      status: '3 Authored technical articles included'
    }
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="config-guide-title"
    >
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-2xl bg-[#121518] border border-[#292F32] rounded-2xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-[#292F32] bg-[#171B1F] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Sliders className="w-5 h-5 text-[#C7FF4F]" />
            <div>
              <h2 id="config-guide-title" className="text-lg font-bold text-[#F5F5F2]">
                Portfolio Configuration Guide
              </h2>
              <p className="text-xs text-[#A4AAA9]">
                Easily personalize and customize all data without rewriting UI components
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#A4AAA9] hover:text-[#F5F5F2] rounded-lg border border-transparent hover:border-[#292F32]"
            aria-label="Close configuration guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs">
          <div className="p-3.5 rounded-xl bg-[#171B1F] border border-[#292F32] text-[#A4AAA9] leading-relaxed">
            <strong className="text-[#F5F5F2] block mb-1">Architecture Note:</strong>
            All text, projects, educational milestones, and freelance options are completely decoupled from UI views. To customize or add projects later, simply edit the designated file below.
          </div>

          <div className="space-y-3">
            {checklistItems.map((item) => (
              <div
                key={item.file}
                className="p-4 rounded-xl bg-[#171B1F] border border-[#292F32] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <FileCode className="w-3.5 h-3.5 text-[#C7FF4F]" />
                    <code className="text-xs font-mono-code font-bold text-[#F5F5F2]">
                      {item.file}
                    </code>
                  </div>
                  <p className="text-[#A4AAA9] mb-1">{item.purpose}</p>
                  <p className="text-[11px] font-mono-code text-[#6B7280]">{item.status}</p>
                </div>

                <button
                  onClick={() => handleCopy(item.file, item.file)}
                  className="px-2.5 py-1.5 rounded-lg bg-[#121518] hover:bg-[#1D2228] border border-[#292F32] text-[#A4AAA9] hover:text-[#F5F5F2] transition-colors flex items-center gap-1.5 shrink-0 self-start sm:self-auto text-[11px]"
                >
                  {copiedFile === item.file ? (
                    <>
                      <Check className="w-3 h-3 text-[#C7FF4F]" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy Path</span>
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#292F32] bg-[#171B1F] flex items-center justify-between text-xs text-[#A4AAA9]">
          <span>Ready for GitHub deployment and production hosting</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#C7FF4F] text-[#0B0D0F] font-semibold hover:bg-[#B5F237] transition-colors"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
