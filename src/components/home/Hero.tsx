import React, { useState } from 'react';
import { Search, Sparkles, ArrowRight, ShieldCheck, CheckCircle2, TrendingUp, Users } from 'lucide-react';
import { Language, TRANSLATIONS } from '../../data/translations';

interface HeroProps {
  language: Language;
  onSearch: (query: string) => void;
  onSelectQuery: (query: string) => void;
  onOpenEligibility: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  language,
  onSearch,
  onSelectQuery,
  onOpenEligibility
}) => {
  const [inputValue, setInputValue] = useState('');
  const t = TRANSLATIONS[language];

  const sampleQueries = [
    'I am a B.Tech student and my family income is below 3 lakh. I need a scholarship.',
    'Mudra business loan for starting a grocery shop',
    'PM Kisan financial assistance for small farmers',
    'Ayushman Bharat 5 lakh health insurance card'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSearch(inputValue.trim());
    }
  };

  const handleChipClick = (query: string) => {
    setInputValue(query);
    onSelectQuery(query);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/60 via-slate-50 to-white pt-12 pb-20 border-b border-slate-200/80">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-100/40 via-teal-50/20 to-transparent pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Top Tagline Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-emerald-300 shadow-xs mb-6 text-emerald-800 text-xs sm:text-sm font-semibold animate-in fade-in slide-in-from-top-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="font-bold">🇮🇳 {t.heroBadge}</span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-600 font-medium">NLP & Rule-Engine Assisted</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-6">
          {language === 'en' ? (
            <>
              Discover Government Schemes <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-700 to-emerald-800">
                You Are Truly Eligible For
              </span>
            </>
          ) : (
            <>
              जानिए आप किन सरकारी योजनाओं के लिए <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-700 to-emerald-800">
                वास्तव में पात्र हैं
              </span>
            </>
          )}
        </h1>

        {/* Subtitle */}
        <p className="max-w-3xl mx-auto text-lg sm:text-xl text-slate-600 leading-relaxed mb-10 font-normal">
          {t.heroSubtitle}
        </p>

        {/* Main AI Search Box */}
        <div className="max-w-3xl mx-auto mb-6">
          <form
            onSubmit={handleSubmit}
            className="relative flex flex-col sm:flex-row items-center gap-2 p-2 bg-white rounded-2xl shadow-xl shadow-slate-200/60 border-2 border-emerald-500/40 focus-within:border-emerald-600 transition-all"
          >
            <div className="flex items-center flex-1 w-full px-3">
              <Search className="w-5 h-5 text-emerald-600 shrink-0 mr-3" />
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={t.heroSearchPlaceholder}
                className="w-full text-slate-900 placeholder:text-slate-400 bg-transparent text-sm sm:text-base focus:outline-hidden py-3 font-medium"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all shrink-0 active:scale-98"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{t.searchBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Quick Sample Queries */}
        <div className="max-w-3xl mx-auto flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500 mb-12">
          <span className="font-semibold text-slate-600 mr-1">{t.quickQueriesLabel}</span>
          {sampleQueries.map((query, index) => (
            <button
              key={index}
              onClick={() => handleChipClick(query)}
              className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-300 border border-slate-200/80 text-slate-700 transition-all text-xs font-medium"
            >
              "{query}"
            </button>
          ))}
        </div>

        {/* Trust & Key Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-slate-200/80">
          <div className="flex items-center justify-center gap-2.5 p-3 rounded-xl bg-white/80 border border-slate-200/60 shadow-xs">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <div className="text-left">
              <div className="font-extrabold text-slate-900 text-sm">500+ Schemes</div>
              <div className="text-[11px] text-slate-500 font-medium">Central & State</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2.5 p-3 rounded-xl bg-white/80 border border-slate-200/60 shadow-xs">
            <Users className="w-5 h-5 text-teal-600 shrink-0" />
            <div className="text-left">
              <div className="font-extrabold text-slate-900 text-sm">2.5 Lakh+</div>
              <div className="text-[11px] text-slate-500 font-medium">Citizens Guided</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2.5 p-3 rounded-xl bg-white/80 border border-slate-200/60 shadow-xs">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div className="text-left">
              <div className="font-extrabold text-slate-900 text-sm">98% Accuracy</div>
              <div className="text-[11px] text-slate-500 font-medium">Eligibility Match</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2.5 p-3 rounded-xl bg-white/80 border border-slate-200/60 shadow-xs">
            <TrendingUp className="w-5 h-5 text-amber-600 shrink-0" />
            <div className="text-left">
              <div className="font-extrabold text-slate-900 text-sm">Zero Fee</div>
              <div className="text-[11px] text-slate-500 font-medium">100% Free Public Tool</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
