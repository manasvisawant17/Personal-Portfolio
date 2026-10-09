import React, { useEffect } from 'react';
import { X, ArrowUpRight, Github, Linkedin, Mail, FileText } from 'lucide-react';
import { siteConfig } from '../data/config';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenInquiry: (serviceId?: string) => void;
  onOpenResume: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  onOpenInquiry,
  onOpenResume,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const links = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Services', href: '#services' },
    { label: 'Learning Journey', href: '#journey' },
    { label: 'Technical Notes', href: '#journal' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (href: string) => {
    onClose();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 md:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-[#121518] border-l border-[#292F32] p-6 flex flex-col justify-between shadow-2xl overflow-y-auto">
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-[#292F32]">
            <span className="text-base font-bold text-[#F5F5F2]">{siteConfig.name}</span>
            <button
              onClick={onClose}
              className="p-2 text-[#A4AAA9] hover:text-[#F5F5F2] rounded-lg border border-[#292F32] transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav links */}
          <nav className="mt-6 flex flex-col gap-3">
            {links.map((link) => (
              <button
                key={link.href}
                onClick={() => handleLinkClick(link.href)}
                className="text-left py-2 px-3 text-base font-medium text-[#A4AAA9] hover:text-[#F5F5F2] hover:bg-[#171B1F] rounded-lg transition-colors"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Quick Actions */}
          <div className="mt-6 pt-6 border-t border-[#292F32] flex flex-col gap-2.5">
            <button
              onClick={() => {
                onClose();
                onOpenInquiry();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-[#0B0D0F] bg-[#C7FF4F] hover:bg-[#B5F237] rounded-lg transition-colors"
            >
              <span>Discuss a Project</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenResume();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-medium text-[#F5F5F2] bg-[#171B1F] hover:bg-[#1D2228] border border-[#292F32] rounded-lg transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-[#C7FF4F]" />
              <span>View Resume Summary</span>
            </button>
          </div>
        </div>

        {/* Footer info */}
        <div className="pt-6 border-t border-[#292F32] text-xs text-[#A4AAA9]">
          <div className="flex items-center gap-4 mb-3">
            <a
              href={siteConfig.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F5F5F2] transition-colors"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={siteConfig.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F5F5F2] transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="hover:text-[#F5F5F2] transition-colors"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
          <p className="text-[11px] text-[#6B7280]">
            BCA (Hons.) · Parul University
          </p>
        </div>
      </div>
    </div>
  );
};
