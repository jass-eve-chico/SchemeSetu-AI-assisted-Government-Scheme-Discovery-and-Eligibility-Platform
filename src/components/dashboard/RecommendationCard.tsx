import React from 'react';
import { Scheme } from '../../types/scheme';
import { Badge } from '../common/Badge';
import { Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

interface RecommendationCardProps {
  scheme: Scheme;
  matchScore: number;
  matchReason: string;
  onViewDetails: (scheme: Scheme) => void;
  onCheckEligibility: (scheme: Scheme) => void;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  scheme,
  matchScore,
  matchReason,
  onViewDetails,
  onCheckEligibility
}) => {
  return (
    <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <Badge variant="blue" size="sm">
            {scheme.category}
          </Badge>
          <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            <span>{matchScore}% High Match</span>
          </span>
        </div>

        <h4 className="text-base font-bold text-slate-900 mb-1 leading-snug">
          {scheme.name}
        </h4>
        <p className="text-xs font-medium text-slate-500 mb-3">
          {scheme.ministry}
        </p>

        {/* Why this is recommended */}
        <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200/80 mb-4">
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900 mb-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
            <span>Why this is recommended:</span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed font-medium">
            {matchReason}
          </p>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
        <button
          onClick={() => onViewDetails(scheme)}
          className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
        >
          View Details
        </button>
        <button
          onClick={() => onCheckEligibility(scheme)}
          className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-1"
        >
          <span>Check Match</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
