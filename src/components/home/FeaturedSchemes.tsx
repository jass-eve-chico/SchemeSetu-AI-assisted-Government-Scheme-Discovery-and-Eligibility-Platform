import React from 'react';
import { Scheme } from '../../types/scheme';
import { SchemeCard } from '../discovery/SchemeCard';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Language } from '../../data/translations';

interface FeaturedSchemesProps {
  schemes: Scheme[];
  language: Language;
  onViewDetails: (scheme: Scheme) => void;
  onCheckEligibility: (scheme: Scheme) => void;
  onExploreAll: () => void;
  savedSchemeIds: string[];
  onToggleSave: (schemeId: string) => void;
}

export const FeaturedSchemes: React.FC<FeaturedSchemesProps> = ({
  schemes,
  language,
  onViewDetails,
  onCheckEligibility,
  onExploreAll,
  savedSchemeIds,
  onToggleSave
}) => {
  const featured = schemes.filter((s) => s.isFeatured).slice(0, 6);

  return (
    <section className="py-16 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>Flagship National Programs</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Featured Government Schemes
            </h2>
            <p className="mt-2 text-slate-600 text-base max-w-2xl">
              High-impact welfare schemes providing maximum financial, educational, and medical coverage across India.
            </p>
          </div>

          <button
            onClick={onExploreAll}
            className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-800 hover:underline"
          >
            <span>View all 500+ schemes</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featured.map((scheme) => (
            <SchemeCard
              key={scheme.id}
              scheme={scheme}
              language={language}
              onViewDetails={onViewDetails}
              onCheckEligibility={onCheckEligibility}
              isSaved={savedSchemeIds.includes(scheme.id)}
              onToggleSave={onToggleSave}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
