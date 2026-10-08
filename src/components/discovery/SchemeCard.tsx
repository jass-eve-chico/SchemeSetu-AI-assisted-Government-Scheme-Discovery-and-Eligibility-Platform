import React from 'react';
import { Scheme } from '../../types/scheme';
import { Badge } from '../common/Badge';
import {
  ExternalLink,
  CheckCircle2,
  Bookmark,
  BookmarkCheck,
  FileText,
  Gift,
  Building,
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import { Language, TRANSLATIONS } from '../../data/translations';

interface SchemeCardProps {
  scheme: Scheme;
  language: Language;
  onViewDetails: (scheme: Scheme) => void;
  onCheckEligibility?: (scheme: Scheme) => void;
  isSaved?: boolean;
  onToggleSave?: (schemeId: string) => void;
}

export const SchemeCard: React.FC<SchemeCardProps> = ({
  scheme,
  language,
  onViewDetails,
  onCheckEligibility,
  isSaved = false,
  onToggleSave
}) => {
  const t = TRANSLATIONS[language];

  // Category badge color
  const getCategoryVariant = (category: string) => {
    switch (category) {
      case 'Education': return 'blue';
      case 'Employment': return 'emerald';
      case 'Agriculture': return 'emerald';
      case 'Healthcare': return 'red';
      case 'Housing': return 'amber';
      case 'Women': return 'purple';
      case 'Business': return 'emerald';
      default: return 'slate';
    }
  };

  return (
    <div className="group relative flex flex-col justify-between p-6 bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all duration-200">
      <div>
        {/* Header Badges */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <Badge variant={getCategoryVariant(scheme.category)} size="sm">
              {scheme.category}
            </Badge>
            <Badge variant="slate" size="sm" icon={<Building className="w-3 h-3" />}>
              {scheme.level === 'Central' ? t.centralGovt : `${scheme.state || 'State'} ${t.stateGovt}`}
            </Badge>
            <Badge variant="emerald" size="sm" icon={<CheckCircle2 className="w-3 h-3 text-emerald-600" />}>
              {scheme.matchScore ? `${scheme.matchScore}% Match` : t.potentiallyEligible}
            </Badge>
          </div>

          {onToggleSave && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleSave(scheme.id);
              }}
              title={isSaved ? 'Remove from saved' : 'Save scheme'}
              className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-700 hover:bg-slate-100 transition-colors"
            >
              {isSaved ? (
                <BookmarkCheck className="w-5 h-5 text-emerald-600 fill-emerald-100" />
              ) : (
                <Bookmark className="w-5 h-5" />
              )}
            </button>
          )}
        </div>

        {/* Scheme Title */}
        <h3
          onClick={() => onViewDetails(scheme)}
          className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors cursor-pointer leading-snug mb-1"
        >
          {language === 'hi' && scheme.hindiName ? scheme.hindiName : scheme.name}
        </h3>

        {/* Ministry Sub-heading */}
        <p className="text-xs font-semibold text-slate-600 mb-3 line-clamp-1">
          {scheme.ministry}
        </p>

        {/* Short Description */}
        <p className="text-sm text-slate-600 leading-relaxed mb-4 line-clamp-2">
          {scheme.shortDescription}
        </p>

        {/* Key Benefits Preview */}
        <div className="mb-4 p-3 rounded-xl bg-slate-50 border border-slate-100">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-1.5">
            <Gift className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t.benefitsTitle}</span>
          </div>
          <ul className="space-y-1 text-xs text-slate-600">
            {scheme.benefits.slice(0, 2).map((benefit, idx) => (
              <li key={idx} className="flex items-start gap-1.5 line-clamp-1">
                <span className="text-emerald-600 font-bold">•</span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Required Documents Tags Preview */}
        {/* Required Documents preview */}
        <div className="mb-4">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mb-2">
            <FileText className="w-3.5 h-3.5 text-slate-400" />
            <span>{t.requiredDocsTitle}</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {scheme.requiredDocuments.slice(0, 3).map((doc) => (
              <span
                key={doc.id}
                className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200"
              >
                {doc.name}
              </span>
            ))}
            {scheme.requiredDocuments.length > 3 && (
              <span className="text-[11px] font-medium px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-500">
                +{scheme.requiredDocuments.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Official Portal Apply Button */}
        <div className="pt-3 border-t border-slate-100 mb-3">
          {scheme.applicationUrl ? (
            <a
              href={scheme.applicationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs hover:shadow-md transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] text-slate-300 group-hover:text-emerald-100 uppercase tracking-wider font-bold">
                  Official Portal
                </span>
              </div>
              <div className="flex items-center gap-1 text-emerald-300 group-hover:text-white font-bold text-xs">
                <span>Apply on Official Portal</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </a>
          ) : (
            <div className="w-full flex items-center justify-center py-2 px-3 rounded-xl bg-slate-100 text-slate-400 text-xs font-medium">
              Official portal link unavailable
            </div>
          )}
        </div>
      </div>

      {/* Card Action Buttons (View Details & Eligibility) */}
      <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
        <button
          onClick={() => onViewDetails(scheme)}
          className="flex-1 flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-semibold transition-colors"
        >
          <span>{t.viewDetails}</span>
        </button>

        {onCheckEligibility && (
          <button
            onClick={() => onCheckEligibility(scheme)}
            className="flex-1 flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold shadow-xs hover:shadow-md transition-all active:scale-98"
          >
            <span>{t.checkEligibility}</span>
            <CheckCircle2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
