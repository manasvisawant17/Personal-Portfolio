import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0"
      role="region"
      aria-live="polite"
      aria-label="Notifications"
    >
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-xl transition-all duration-200 animate-in fade-in slide-in-from-bottom-2 ${
              isSuccess
                ? 'bg-[#171B1F] border-[#292F32] text-[#F5F5F2]'
                : isError
                ? 'bg-[#1F1717] border-[#4A2020] text-[#FFC7C7]'
                : 'bg-[#171B1F] border-[#292F32] text-[#F5F5F2]'
            }`}
          >
            {isSuccess && (
              <CheckCircle2 className="w-5 h-5 text-[#C7FF4F] shrink-0 mt-0.5" aria-hidden="true" />
            )}
            {isError && (
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" aria-hidden="true" />
            )}
            {!isSuccess && !isError && (
              <Info className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" aria-hidden="true" />
            )}

            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#F5F5F2]">{toast.title}</p>
              {toast.description && (
                <p className="text-xs text-[#A4AAA9] mt-0.5 leading-relaxed">
                  {toast.description}
                </p>
              )}
            </div>

            <button
              onClick={() => onDismiss(toast.id)}
              className="text-[#A4AAA9] hover:text-[#F5F5F2] p-1 rounded-md transition-colors shrink-0"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
