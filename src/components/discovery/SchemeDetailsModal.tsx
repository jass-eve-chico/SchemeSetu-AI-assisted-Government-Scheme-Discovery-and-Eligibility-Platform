import React from 'react';
import { Scheme } from '../../types/scheme';
import { Badge } from '../common/Badge';
import {
  X,
  ExternalLink,
  ShieldAlert,
  CheckCircle2,
  FileText,
  Gift,
  Building,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Info
} from 'lucide-react';
import { Language, TRANSLATIONS } from '../../data/translations';

interface SchemeDetailsModalProps {
  scheme: Scheme | null;
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onCheckEligibility: (scheme: Scheme) => void;
}

export const SchemeDetailsModal: React.FC<SchemeDetailsModalProps> = ({
  scheme,
  isOpen,
  onClose,
  language,
  onCheckEligibility
}) => {
  if (!isOpen || !scheme) return null;
  const t = TRANSLATIONS[language];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-emerald-50 via-teal-50 to-white border-b border-slate-200">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="blue" size="sm">
                  {scheme.category}
                </Badge>
                <Badge variant="slate" size="sm" icon={<Building className="w-3 h-3" />}>
                  {scheme.level === 'Central' ? t.centralGovt : `${scheme.state || 'State'} ${t.stateGovt}`}
                </Badge>
                <Badge variant="emerald" size="sm" icon={<CheckCircle2 className="w-3 h-3 text-emerald-600" />}>
                  {t.potentiallyEligible}
                </Badge>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug">
                {language === 'hi' && scheme.hindiName ? scheme.hindiName : scheme.name}
              </h2>

              <p className="text-sm font-semibold text-emerald-800">
                {scheme.ministry}
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* Official vs AI Distinction Alert */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-start gap-3 text-xs sm:text-sm text-amber-900 leading-relaxed">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Official Disclaimer:</p>
              <p className="mt-0.5 text-amber-800">
                {t.officialPortalNotice} All criteria and summaries shown below are compiled by SchemeSetu AI for guidance.
              </p>
            </div>
          </div>

          {/* Section: Overview */}
          <div>
            <h3 className="text-base font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Info className="w-4 h-4 text-emerald-600" />
              <span>{t.schemeOverview}</span>
            </h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {scheme.detailedDescription}
            </p>
          </div>

          {/* Section: Benefits */}
          <div>
            <h3 className="text-base font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Gift className="w-4 h-4 text-emerald-600" />
              <span>Key Benefits</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {scheme.benefits.map((benefit, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-100 text-xs sm:text-sm text-slate-800"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Eligibility */}
          <div>
            <h3 className="text-base font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{t.eligibilityCriteria}</span>
            </h3>
            <ul className="space-y-2 text-sm text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
              {scheme.eligibilitySummary.map((summary, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span>{summary}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section: Required Documents */}
          <div>
            <h3 className="text-base font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-600" />
              <span>{t.documentsRequired}</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {scheme.requiredDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm text-slate-900">{doc.name}</span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                        doc.isMandatory
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {doc.isMandatory ? 'Mandatory' : 'Optional'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">{doc.purpose}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Application Process */}
          <div>
            <h3 className="text-base font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>{t.applicationRoadmap}</span>
            </h3>
            <div className="space-y-3">
              {scheme.applicationProcess.map((step) => (
                <div
                  key={step.step}
                  className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 border border-slate-200/80"
                >
                  <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    {step.step}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 mb-0.5">{step.title}</h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Important Conditions */}
          {scheme.importantConditions && scheme.importantConditions.length > 0 && (
            <div>
              <h3 className="text-base font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-600" />
                <span>{t.importantConditions}</span>
              </h3>
              <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600">
                {scheme.importantConditions.map((cond, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold">⚠️</span>
                    <span>{cond}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <a
            href={scheme.officialSourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-emerald-700"
          >
            <span>{t.officialSource}: {scheme.officialSourceUrl}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={() => {
                onClose();
                onCheckEligibility(scheme);
              }}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{t.runEligibilityCheck}</span>
            </button>

            {scheme.applicationUrl ? (
              <a
                href={scheme.applicationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all group cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Apply on Official Portal</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
            ) : (
              <button
                disabled
                className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-200 text-slate-500 font-semibold text-sm cursor-not-allowed"
              >
                <span>Official portal link unavailable</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
