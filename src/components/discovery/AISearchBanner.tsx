import React from 'react';
import { Sparkles, X, Tag, IndianRupee, GraduationCap, Briefcase, MapPin, UserCheck, Calendar } from 'lucide-react';
import { ExtractedIntent } from '../../lib/searchEngine';

interface AISearchBannerProps {
  intent: ExtractedIntent;
  rawQuery: string;
  onClear: () => void;
}

export const AISearchBanner: React.FC<AISearchBannerProps> = ({ intent, rawQuery, onClear }) => {
  if (!rawQuery.trim() && intent.keywords.length === 0) return null;

  return (
    <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-slate-50 border border-emerald-200/80 shadow-xs animate-in fade-in slide-in-from-top-1">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-600 text-white shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-900">
              Query Intent Recognized
            </span>
            <span className="text-xs text-slate-500 font-mono hidden md:inline">
              "{rawQuery}"
            </span>
          </div>

          <p className="text-xs sm:text-sm font-medium text-slate-700">
            {intent.explanation}
          </p>

          {/* Structured Chips: Only show attributes actually detected from the query */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            {intent.category && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-white border border-emerald-300 text-emerald-800 text-xs font-semibold shadow-xs">
                <Tag className="w-3 h-3 text-emerald-600" />
                <span>Category: {intent.category}</span>
              </span>
            )}

            {intent.education && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-white border border-blue-300 text-blue-800 text-xs font-semibold shadow-xs">
                <GraduationCap className="w-3 h-3 text-blue-600" />
                <span>Education: {intent.education}</span>
              </span>
            )}

            {intent.occupation && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-white border border-teal-300 text-teal-800 text-xs font-semibold shadow-xs">
                <Briefcase className="w-3 h-3 text-teal-600" />
                <span>Role: {intent.occupation}</span>
              </span>
            )}

            {intent.income_max && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-white border border-amber-300 text-amber-800 text-xs font-semibold shadow-xs">
                <IndianRupee className="w-3 h-3 text-amber-600" />
                <span>Max Income: ≤ ₹{intent.income_max.toLocaleString('en-IN')}</span>
              </span>
            )}

            {intent.state && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-white border border-slate-300 text-slate-800 text-xs font-semibold shadow-xs">
                <MapPin className="w-3 h-3 text-rose-500" />
                <span>State: {intent.state}</span>
              </span>
            )}

            {intent.gender === 'Female' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-white border border-pink-300 text-pink-800 text-xs font-semibold shadow-xs">
                <UserCheck className="w-3 h-3 text-pink-600" />
                <span>Focus: Women / Girl</span>
              </span>
            )}

            {intent.age && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-white border border-purple-300 text-purple-800 text-xs font-semibold shadow-xs">
                <Calendar className="w-3 h-3 text-purple-600" />
                <span>Age: {intent.age}+ Years</span>
              </span>
            )}
          </div>
        </div>

        <button
          onClick={onClear}
          className="self-start sm:self-center flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold transition-all shadow-xs hover:border-slate-300 shrink-0 cursor-pointer"
        >
          <X className="w-3.5 h-3.5 text-slate-500" />
          <span>Clear Search</span>
        </button>
      </div>
    </div>
  );
};
