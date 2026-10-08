import React from 'react';
import { EligibilityResult } from '../../types/user';
import { Badge } from '../common/Badge';
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowRight,
  FileCheck2,
  FileText,
  RotateCcw
} from 'lucide-react';
import { Language, TRANSLATIONS } from '../../data/translations';

interface EligibilityReportProps {
  result: EligibilityResult;
  language: Language;
  onOpenDocuments: () => void;
  onOpenFormAssistant: () => void;
  onRecheck: () => void;
}

export const EligibilityReport: React.FC<EligibilityReportProps> = ({
  result,
  language,
  onOpenDocuments,
  onOpenFormAssistant,
  onRecheck
}) => {
  const t = TRANSLATIONS[language];

  const getStatusBadge = () => {
    switch (result.overallStatus) {
      case 'Potentially Eligible':
        return (
          <Badge variant="emerald" size="md" icon={<CheckCircle2 className="w-4 h-4 text-emerald-600" />}>
            {result.overallStatus} ({result.matchScore}% Criteria Match)
          </Badge>
        );
      case 'Needs Verification':
        return (
          <Badge variant="amber" size="md" icon={<AlertTriangle className="w-4 h-4 text-amber-600" />}>
            {result.overallStatus} ({result.matchScore}% Match)
          </Badge>
        );
      default:
        return (
          <Badge variant="red" size="md" icon={<XCircle className="w-4 h-4 text-rose-600" />}>
            {result.overallStatus} ({result.matchScore}% Match)
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Top Result Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-white border border-emerald-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 block mb-1">
              Eligibility Assessment Result
            </span>
            <h3 className="text-xl font-bold text-slate-900">
              {result.schemeName}
            </h3>
          </div>
          <div>{getStatusBadge()}</div>
        </div>

        <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden mb-2">
          <div
            className="bg-emerald-600 h-2.5 rounded-full transition-all duration-1000"
            style={{ width: `${result.matchScore}%` }}
          />
        </div>
        <p className="text-xs text-slate-500 font-medium">
          Criteria Score: {result.matchScore}% of target prerequisites satisfied.
        </p>
      </div>

      {/* Mandatory Official Disclaimer */}
      <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3 text-xs text-amber-900">
        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="font-bold">Important Notice: </strong>
          {t.resultDisclaimer} Official approvals are solely determined by designated government nodal verification officers upon submission of original documents.
        </p>
      </div>

      {/* Detailed Criteria Checklist Breakdown */}
      <div>
        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
          Detailed Criteria Breakdown
        </h4>

        <div className="space-y-2.5">
          {result.breakdown.map((item, index) => {
            const isMatched = item.status === 'matched';
            const isVerification = item.status === 'needs_verification';
            const isNotApplicable = item.status === 'not_applicable';

            return (
              <div
                key={index}
                className={`p-3.5 rounded-xl border flex items-start gap-3 transition-colors ${
                  isMatched
                    ? 'bg-emerald-50/40 border-emerald-200/80 text-slate-800'
                    : isVerification
                    ? 'bg-amber-50/40 border-amber-200/80 text-slate-800'
                    : isNotApplicable
                    ? 'bg-slate-50 border-slate-200 text-slate-600'
                    : 'bg-rose-50/40 border-rose-200/80 text-slate-800'
                }`}
              >
                {isMatched && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />}
                {isVerification && <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />}
                {isNotApplicable && <span className="w-5 h-5 text-slate-400 font-bold text-center shrink-0 mt-0.5">—</span>}
                {!isMatched && !isVerification && !isNotApplicable && <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />}

                <div className="flex-1 text-xs sm:text-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{item.label}</span>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                        isMatched
                          ? 'bg-emerald-100 text-emerald-800'
                          : isVerification
                          ? 'bg-amber-100 text-amber-800'
                          : isNotApplicable
                          ? 'bg-slate-200 text-slate-700'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {isMatched
                        ? '✓ Matched'
                        : isVerification
                        ? '⚠ Needs Verification'
                        : isNotApplicable
                        ? '— Not Applicable'
                        : '✗ Not Matched'}
                    </span>
                  </div>
                  <p className="mt-1 text-slate-600 leading-relaxed font-normal">
                    {item.reason}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Next Step Recommendations */}
      <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
        <button
          onClick={onRecheck}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 p-2"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Adjust Profile Answers</span>
        </button>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <button
            onClick={onOpenDocuments}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-semibold transition-colors"
          >
            <FileText className="w-4 h-4 text-emerald-700" />
            <span>Document Checklist</span>
          </button>

          <button
            onClick={onOpenFormAssistant}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-md transition-all active:scale-98"
          >
            <FileCheck2 className="w-4 h-4" />
            <span>Form Assistance</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
