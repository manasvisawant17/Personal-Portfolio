/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { MobileMenu } from './components/MobileMenu';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { ProjectGallery } from './components/ProjectGallery';
import { ProjectModal } from './components/ProjectModal';
import { GitHubSection } from './components/GitHubSection';
import { Skills } from './components/Skills';
import { Services } from './components/Services';
import { InquiryModal } from './components/InquiryModal';
import { EducationTimeline } from './components/EducationTimeline';
import { JournalSection } from './components/JournalSection';
import { ResumeModal } from './components/ResumeModal';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ToastContainer, ToastMessage } from './components/Toast';
import { ConfigGuideDrawer } from './components/ConfigGuideDrawer';
import { Project } from './types';
import { Settings2 } from 'lucide-react';

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isInquiryOpen, setIsInquiryOpen] = useState<boolean>(false);
  const [inquiryServiceId, setInquiryServiceId] = useState<string | undefined>(undefined);
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);
  const [isConfigGuideOpen, setIsConfigGuideOpen] = useState<boolean>(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Initialize theme from storage or default to dark
  useEffect(() => {
    const savedTheme = localStorage.getItem('ms_theme') as 'dark' | 'light' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
      document.documentElement.classList.toggle('light', savedTheme === 'light');
    } else {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('ms_theme', nextTheme);
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
    document.documentElement.classList.toggle('light', nextTheme === 'light');
  };

  const addToast = (type: 'success' | 'error' | 'info', title: string, description?: string) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, type, title, description }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleOpenInquiry = (serviceId?: string) => {
    setInquiryServiceId(serviceId);
    setIsInquiryOpen(true);
  };

  const handleExploreProjects = () => {
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0D0F] text-[#F5F5F2] selection:bg-[#C7FF4F] selection:text-[#0B0D0F] transition-colors duration-200">
      {/* Sticky Navigation Bar */}
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        onOpenInquiry={handleOpenInquiry}
      />

      {/* Mobile Navigation Drawer */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenInquiry={handleOpenInquiry}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* A. Hero Screen */}
        <Hero
          onOpenInquiry={() => handleOpenInquiry()}
          onExploreProjects={handleExploreProjects}
        />

        {/* B. About Me */}
        <About
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenInquiry={() => handleOpenInquiry()}
        />

        {/* C. Featured Projects */}
        <ProjectGallery
          onSelectProject={(project) => setSelectedProject(project)}
        />

        {/* D. GitHub Integration */}
        <GitHubSection />

        {/* E. Skills Profile */}
        <Skills />

        {/* F. Freelance Services */}
        <Services
          onSelectService={(serviceId) => handleOpenInquiry(serviceId)}
        />

        {/* I. Education & Learning Journey */}
        <EducationTimeline />

        {/* J. Developer Journal */}
        <JournalSection />

        {/* H. Contact Section */}
        <Contact
          onOpenInquiry={() => handleOpenInquiry()}
          onToast={addToast}
        />
      </main>

      {/* L. Footer */}
      <Footer />

      {/* Modals & Dialogs */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <InquiryModal
        isOpen={isInquiryOpen}
        preselectedServiceId={inquiryServiceId}
        onClose={() => setIsInquiryOpen(false)}
        onToast={addToast}
      />

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        onToast={addToast}
      />

      <ConfigGuideDrawer
        isOpen={isConfigGuideOpen}
        onClose={() => setIsConfigGuideOpen(false)}
        onToast={addToast}
      />

      {/* Accessible Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Floating Configuration Guide Trigger */}
      <button
        onClick={() => setIsConfigGuideOpen(true)}
        className="fixed bottom-5 left-5 z-40 p-2.5 rounded-xl bg-[#171B1F] border border-[#292F32] hover:border-[#3E4549] text-[#A4AAA9] hover:text-[#C7FF4F] shadow-lg transition-colors flex items-center gap-2 text-xs font-mono-code group"
        aria-label="Open portfolio configuration guide"
        title="Customization Checklist & Configuration Guide"
      >
        <Settings2 className="w-4 h-4 text-[#C7FF4F] group-hover:rotate-45 transition-transform" />
        <span className="hidden sm:inline">Setup Guide</span>
      </button>
    </div>
  );
}
