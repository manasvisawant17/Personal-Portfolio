import { InquiryFormData } from '../types';
import { siteConfig } from '../data/config';

export interface SubmitResult {
  success: boolean;
  message: string;
  inquiryId?: string;
  fallbackMailtoUrl?: string;
  isBackendSaved: boolean;
}

const LOCAL_STORAGE_KEY = 'ms_inquiries_log';
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute between submissions
let lastSubmissionTime = 0;

export async function submitProjectInquiry(formData: InquiryFormData): Promise<SubmitResult> {
  // 1. Basic Rate-Limiting Protection
  const now = Date.now();
  if (now - lastSubmissionTime < RATE_LIMIT_WINDOW_MS) {
    const waitSecs = Math.ceil((RATE_LIMIT_WINDOW_MS - (now - lastSubmissionTime)) / 1000);
    return {
      success: false,
      message: `Please wait ${waitSecs} seconds before submitting another inquiry to prevent spam.`,
      isBackendSaved: false
    };
  }

  // 2. Field Validation
  if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
    return { success: false, message: 'Please enter your full name (minimum 2 characters).', isBackendSaved: false };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
    return { success: false, message: 'Please enter a valid email address.', isBackendSaved: false };
  }

  if (!formData.projectDescription.trim() || formData.projectDescription.trim().length < 15) {
    return { success: false, message: 'Please provide a project description with at least 15 characters.', isBackendSaved: false };
  }

  // Generate fallback mailto link
  const subject = encodeURIComponent(`Project Inquiry: ${formData.serviceId} – ${formData.fullName}`);
  const bodyText = `Name: ${formData.fullName}
Email: ${formData.email}
Company: ${formData.company || 'N/A'}
Service: ${formData.serviceId}
Budget Range: ${formData.budgetRange}
Desired Deadline: ${formData.desiredDeadline}
Reference URL: ${formData.referenceUrl || 'N/A'}

Project Scope:
${formData.projectDescription}

Additional Notes:
${formData.additionalRequirements || 'N/A'}`;

  const mailtoUrl = `mailto:${siteConfig.email}?subject=${subject}&body=${encodeURIComponent(bodyText)}`;

  // 3. Attempt Server API Submission
  try {
    const res = await fetch('/api/inquiry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        submittedAt: new Date().toISOString(),
      }),
    });

    if (res.ok) {
      const data = await res.json();
      lastSubmissionTime = now;
      return {
        success: true,
        message: 'Your inquiry has been received and recorded. Manasvi will review your specifications and reply via email.',
        inquiryId: data.inquiryId || `INQ-${Date.now().toString(36).toUpperCase()}`,
        isBackendSaved: true
      };
    }
  } catch {
    // API not running or network offline
  }

  // 4. Client-side local persistence fallback + mailto fallback
  try {
    const existing = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
    const inquiryRecord = {
      ...formData,
      id: `LOCAL-${Date.now()}`,
      submittedAt: new Date().toISOString()
    };
    existing.push(inquiryRecord);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existing));
    lastSubmissionTime = now;

    return {
      success: true,
      message: 'Inquiry details prepared successfully! A pre-filled draft has also been created to dispatch directly to Manasvi\'s email inbox.',
      inquiryId: inquiryRecord.id,
      fallbackMailtoUrl: mailtoUrl,
      isBackendSaved: false
    };
  } catch {
    return {
      success: true,
      message: 'Please send your inquiry details directly to Manasvi via email.',
      fallbackMailtoUrl: mailtoUrl,
      isBackendSaved: false
    };
  }
}
