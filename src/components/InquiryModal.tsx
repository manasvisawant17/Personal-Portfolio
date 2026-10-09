import React, { useState, useEffect } from 'react';
import { X, Send, Mail, CheckCircle2, AlertCircle, ExternalLink, Loader2 } from 'lucide-react';
import { servicesData } from '../data/services';
import { InquiryFormData } from '../types';
import { submitProjectInquiry, SubmitResult } from '../services/inquiryService';

interface InquiryModalProps {
  isOpen: boolean;
  preselectedServiceId?: string;
  onClose: () => void;
  onToast: (type: 'success' | 'error' | 'info', title: string, desc?: string) => void;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  preselectedServiceId,
  onClose,
  onToast,
}) => {
  const [formData, setFormData] = useState<InquiryFormData>({
    fullName: '',
    email: '',
    company: '',
    serviceId: preselectedServiceId || servicesData[0].id,
    projectDescription: '',
    budgetRange: '₹5,000 – ₹15,000 / Flexible',
    desiredDeadline: '2–3 Weeks',
    referenceUrl: '',
    additionalRequirements: '',
  });

  const [honeypot, setHoneypot] = useState<string>(''); // Anti-bot honeypot
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submissionResult, setSubmissionResult] = useState<SubmitResult | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    if (preselectedServiceId) {
      setFormData((prev) => ({ ...prev, serviceId: preselectedServiceId }));
    }
  }, [preselectedServiceId]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    // Bot detection check
    if (honeypot.trim()) {
      return;
    }

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      setValidationError('Please enter your full name (minimum 2 characters).');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      setValidationError('Please provide a valid contact email address.');
      return;
    }

    if (!formData.projectDescription.trim() || formData.projectDescription.trim().length < 15) {
      setValidationError('Please write a brief project description of at least 15 characters.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await submitProjectInquiry(formData);
      setSubmissionResult(res);
      if (res.success) {
        onToast('success', 'Inquiry Submitted', res.message);
      } else {
        onToast('error', 'Submission Failed', res.message);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Submission failed unexpectedly.';
      setValidationError(msg);
      onToast('error', 'Error', msg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmissionResult(null);
    setFormData({
      fullName: '',
      email: '',
      company: '',
      serviceId: servicesData[0].id,
      projectDescription: '',
      budgetRange: '₹5,000 – ₹15,000 / Flexible',
      desiredDeadline: '2–3 Weeks',
      referenceUrl: '',
      additionalRequirements: '',
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="inquiry-modal-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-xl bg-[#121518] border border-[#292F32] rounded-2xl shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#292F32] bg-[#171B1F]">
          <div>
            <span className="text-xs font-mono-code uppercase text-[#C7FF4F]">Client Engagement</span>
            <h2 id="inquiry-modal-title" className="text-xl font-bold text-[#F5F5F2]">
              Project Scope & Inquiry Form
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#A4AAA9] hover:text-[#F5F5F2] hover:bg-[#1D2228] rounded-lg transition-colors border border-transparent hover:border-[#292F32]"
            aria-label="Close inquiry dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto">
          {submissionResult?.success ? (
            /* Success confirmation screen */
            <div className="py-6 text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-[#C7FF4F] mx-auto" />
              <h3 className="text-lg font-bold text-[#F5F5F2]">Inquiry Dispatched Successfully</h3>
              <p className="text-xs sm:text-sm text-[#A4AAA9] max-w-md mx-auto leading-relaxed">
                {submissionResult.message}
              </p>

              {submissionResult.inquiryId && (
                <div className="inline-block p-2 rounded-lg bg-[#171B1F] border border-[#292F32] text-xs font-mono-code text-[#C7FF4F]">
                  Reference ID: {submissionResult.inquiryId}
                </div>
              )}

              {/* Mailto fallback launcher button if client needs to send email directly */}
              {submissionResult.fallbackMailtoUrl && (
                <div className="pt-2">
                  <a
                    href={submissionResult.fallbackMailtoUrl}
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#0B0D0F] bg-[#C7FF4F] rounded-lg hover:bg-[#B5F237] transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Open Pre-filled Email Client</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}

              <div className="pt-6 border-t border-[#292F32]">
                <button
                  onClick={handleReset}
                  className="px-5 py-2 text-xs font-medium text-[#F5F5F2] bg-[#171B1F] hover:bg-[#1D2228] border border-[#292F32] rounded-lg transition-colors"
                >
                  Done & Close
                </button>
              </div>
            </div>
          ) : (
            /* Submission Form */
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Validation alert */}
              {validationError && (
                <div className="p-3 rounded-lg bg-[#2A1515] border border-[#522323] text-red-300 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <p>{validationError}</p>
                </div>
              )}

              {/* Honeypot field (hidden from humans, catches bots) */}
              <input
                type="text"
                name="user_confirm_token"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-[#A4AAA9] mb-1 font-medium">
                    Full Name <span className="text-[#C7FF4F]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={100}
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Alex Johnson"
                    className="w-full px-3 py-2 bg-[#171B1F] border border-[#292F32] rounded-lg text-[#F5F5F2] placeholder-[#6B7280] focus:border-[#C7FF4F] focus:outline-none"
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-[#A4AAA9] mb-1 font-medium">
                    Email Address <span className="text-[#C7FF4F]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    maxLength={100}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@example.com"
                    className="w-full px-3 py-2 bg-[#171B1F] border border-[#292F32] rounded-lg text-[#F5F5F2] placeholder-[#6B7280] focus:border-[#C7FF4F] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Company Name */}
                <div>
                  <label className="block text-[#A4AAA9] mb-1 font-medium">
                    Company / Organization (Optional)
                  </label>
                  <input
                    type="text"
                    maxLength={100}
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Acme Studio"
                    className="w-full px-3 py-2 bg-[#171B1F] border border-[#292F32] rounded-lg text-[#F5F5F2] placeholder-[#6B7280] focus:border-[#C7FF4F] focus:outline-none"
                  />
                </div>

                {/* Service Selection */}
                <div>
                  <label className="block text-[#A4AAA9] mb-1 font-medium">
                    Service Required <span className="text-[#C7FF4F]">*</span>
                  </label>
                  <select
                    value={formData.serviceId}
                    onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                    className="w-full px-3 py-2 bg-[#171B1F] border border-[#292F32] rounded-lg text-[#F5F5F2] focus:border-[#C7FF4F] focus:outline-none"
                  >
                    {servicesData.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.title}
                      </option>
                    ))}
                    <option value="Custom Inquiry">Other / Custom Inquiry</option>
                  </select>
                </div>
              </div>

              {/* Project Description */}
              <div>
                <label className="block text-[#A4AAA9] mb-1 font-medium">
                  Project Description & Problem Statement <span className="text-[#C7FF4F]">*</span>
                </label>
                <textarea
                  rows={3}
                  required
                  maxLength={3000}
                  value={formData.projectDescription}
                  onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                  placeholder="Describe what you are trying to build, key pages/features, or the specific workflow you wish to automate..."
                  className="w-full px-3 py-2 bg-[#171B1F] border border-[#292F32] rounded-lg text-[#F5F5F2] placeholder-[#6B7280] focus:border-[#C7FF4F] focus:outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Budget Range */}
                <div>
                  <label className="block text-[#A4AAA9] mb-1 font-medium">
                    Budget Range
                  </label>
                  <select
                    value={formData.budgetRange}
                    onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                    className="w-full px-3 py-2 bg-[#171B1F] border border-[#292F32] rounded-lg text-[#F5F5F2] focus:border-[#C7FF4F] focus:outline-none"
                  >
                    <option value="Under ₹5,000 / Student budget">Under ₹5,000 (Small script / review)</option>
                    <option value="₹5,000 – ₹15,000">₹5,000 – ₹15,000 (Landing / Portfolio)</option>
                    <option value="₹15,000 – ₹30,000">₹15,000 – ₹30,000 (Multi-section / Custom)</option>
                    <option value="To be discussed / Flexible">To be discussed / Scope-dependent</option>
                  </select>
                </div>

                {/* Desired Deadline */}
                <div>
                  <label className="block text-[#A4AAA9] mb-1 font-medium">
                    Desired Timeline
                  </label>
                  <select
                    value={formData.desiredDeadline}
                    onChange={(e) => setFormData({ ...formData, desiredDeadline: e.target.value })}
                    className="w-full px-3 py-2 bg-[#171B1F] border border-[#292F32] rounded-lg text-[#F5F5F2] focus:border-[#C7FF4F] focus:outline-none"
                  >
                    <option value="Within 1 Week">Within 1 Week (Urgent)</option>
                    <option value="2–3 Weeks">2–3 Weeks (Standard)</option>
                    <option value="1 Month+">1 Month+ (Flexible)</option>
                    <option value="Open Timeline">No Rush / Ongoing</option>
                  </select>
                </div>
              </div>

              {/* Reference URL */}
              <div>
                <label className="block text-[#A4AAA9] mb-1 font-medium">
                  Reference Website or Design Link (Optional)
                </label>
                <input
                  type="url"
                  maxLength={300}
                  value={formData.referenceUrl}
                  onChange={(e) => setFormData({ ...formData, referenceUrl: e.target.value })}
                  placeholder="https://example.com or Figma URL"
                  className="w-full px-3 py-2 bg-[#171B1F] border border-[#292F32] rounded-lg text-[#F5F5F2] placeholder-[#6B7280] focus:border-[#C7FF4F] focus:outline-none"
                />
              </div>

              {/* Additional Requirements */}
              <div>
                <label className="block text-[#A4AAA9] mb-1 font-medium">
                  Additional Notes (Optional)
                </label>
                <input
                  type="text"
                  maxLength={500}
                  value={formData.additionalRequirements}
                  onChange={(e) => setFormData({ ...formData, additionalRequirements: e.target.value })}
                  placeholder="Preferred communication channel, special tech stack, etc."
                  className="w-full px-3 py-2 bg-[#171B1F] border border-[#292F32] rounded-lg text-[#F5F5F2] placeholder-[#6B7280] focus:border-[#C7FF4F] focus:outline-none"
                />
              </div>

              {/* Privacy Reassurance */}
              <p className="text-[11px] text-[#6B7280] leading-relaxed pt-2">
                Your contact details are strictly used to reply to this project brief. No payment cards or passwords are ever requested.
              </p>

              {/* Submit Button */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#292F32]">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-medium text-[#A4AAA9] hover:text-[#F5F5F2] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 text-xs font-semibold text-[#0B0D0F] bg-[#C7FF4F] hover:bg-[#B5F237] rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Project Inquiry</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
