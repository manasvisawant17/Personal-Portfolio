import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, ArrowUpRight } from 'lucide-react';
import { siteConfig } from '../data/config';

interface NavbarProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onOpenMobileMenu: () => void;
  onOpenInquiry: (serviceId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  onToggleTheme,
  onOpenMobileMenu,
  onOpenInquiry,
}) => {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['home', 'about', 'projects', 'skills', 'services', 'journey', 'contact'];
      const scrollPos = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Services', href: '#services', id: 'services' },
    { label: 'Journey', href: '#journey', id: 'journey' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-colors duration-200 border-b ${
        isScrolled
          ? 'bg-[#0B0D0F]/90 dark:bg-[#0B0D0F]/90 backdrop-blur-md border-[#292F32]'
          : 'bg-[#0B0D0F] border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark (single line, no descriptors in header) */}
        <a
          href="#home"
          className="text-base sm:text-lg font-bold tracking-tight text-[#F5F5F2] hover:text-[#C7FF4F] transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
          aria-label={`${siteConfig.name} - Return to top`}
        >
          <span className="w-2.5 h-2.5 bg-[#C7FF4F] rounded-sm shrink-0" aria-hidden="true" />
          <span>{siteConfig.name}</span>
        </a>

        {/* Zone 2: 5–6 concise navigation links */}
        <nav
          className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-[#A4AAA9]"
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                className={`transition-colors whitespace-nowrap shrink-0 relative py-1 hover:text-[#F5F5F2] ${
                  isActive ? 'text-[#F5F5F2] font-semibold' : ''
                }`}
              >
                {link.label}
                {isActive && (
                  <span
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C7FF4F] rounded-full"
                    aria-hidden="true"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action + theme toggle + mobile trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-lg border border-[#292F32] bg-[#121518] text-[#A4AAA9] hover:text-[#F5F5F2] hover:border-[#3E4549] transition-colors"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-[#C7FF4F]" />
            ) : (
              <Moon className="w-4 h-4 text-slate-800" />
            )}
          </button>

          <button
            onClick={() => onOpenInquiry()}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-[#0B0D0F] bg-[#C7FF4F] hover:bg-[#B5F237] rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm"
          >
            <span>Let's Talk</span>
            <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
          </button>

          <button
            onClick={onOpenMobileMenu}
            className="md:hidden p-2 rounded-lg border border-[#292F32] bg-[#121518] text-[#A4AAA9] hover:text-[#F5F5F2]"
            aria-label="Open mobile menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};
