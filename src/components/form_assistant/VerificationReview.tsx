import React from 'react';
import {
  ShieldCheck,
  AlertTriangle,
  ExternalLink,
  CheckCircle2,
  X,
  FileCheck
} from 'lucide-react';
import { Language, TRANSLATIONS } from '../../data/translations';

interface VerificationReviewProps {
  isOpen: boolean;
  onClose: () => void;
  schemeName: string;
  officialUrl: string;
  formData: Record<string, string>;
  onConfirmAndRedirect: () => void;
  language: Language;
}

export const VerificationReview: React.FC<VerificationReviewProps> = ({
  isOpen,
  onClose,
  schemeName,
  officialUrl,
  formData,
  onConfirmAndRedirect,
  language
}) => {
  if (!isOpen) return null;
  const t = TRANSLATIONS[language];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-emerald-50 via-teal-50 to-white border-b border-slate-200 flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
                Pre-Submission Verification Gate
              </span>
              <h3 className="text-xl font-bold text-slate-900">
                Confirm Verified Application Data
              </h3>
            </div>
          </div>

          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Strict Human-in-the-loop alert */}
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200/80 flex items-start gap-3 text-xs sm:text-sm text-amber-900 leading-relaxed">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Human Verification Obligation:</p>
              <p className="mt-0.5 text-amber-800">
                SchemeSetu has prepared these values from your verified documents. Please confirm that all details are accurate before continuing to the official government portal.
              </p>
            </div>
          </div>

          {/* Form summary */}
          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Populated Fields Summary ({schemeName}):
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 p-4 rounded-2xl bg-slate-50 border border-slate-200">
              {Object.entries(formData).map(([key, val]) => (
                <div key={key} className="text-xs">
                  <span className="text-slate-500 font-medium block">{key}:</span>
                  <span className="font-bold text-slate-900">{val || '—'}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Citizen Declaration Checkbox */}
          <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              I acknowledge that I have reviewed the populated data, verified its authenticity against my original government certificates, and am proceeding to submit my application directly on the official portal.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-700 text-xs sm:text-sm font-semibold hover:bg-slate-100"
          >
            Go Back & Edit
          </button>

          <button
            onClick={onConfirmAndRedirect}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-98"
          >
            <span>Confirm & Open Official Portal</span>
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
