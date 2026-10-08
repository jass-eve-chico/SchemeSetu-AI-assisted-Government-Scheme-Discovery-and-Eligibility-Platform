import React, { useState, useMemo, useEffect } from 'react';
import { Scheme, SchemeCategory } from '../../types/scheme';
import { SchemeCard } from './SchemeCard';
import { FilterSidebar, FilterState } from './FilterSidebar';
import { AISearchBanner } from './AISearchBanner';
import { SchemeDetailsModal } from './SchemeDetailsModal';
import { Search, SlidersHorizontal, AlertCircle, ChevronDown, RotateCcw, X } from 'lucide-react';
import { searchAndFilterSchemes, ScoredScheme } from '../../lib/searchEngine';
import { Language, TRANSLATIONS } from '../../data/translations';

interface SchemeDiscoveryProps {
  schemes: Scheme[];
  language: Language;
  onCheckEligibility: (scheme: Scheme) => void;
  savedSchemeIds: string[];
  onToggleSave: (schemeId: string) => void;
  initialQuery?: string;
  initialCategory?: SchemeCategory | 'All';
}

const PAGE_SIZE = 12;

export const SchemeDiscovery: React.FC<SchemeDiscoveryProps> = ({
  schemes,
  language,
  onCheckEligibility,
  savedSchemeIds,
  onToggleSave,
  initialQuery = '',
  initialCategory = 'All'
}) => {
  const t = TRANSLATIONS[language];
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const [filters, setFilters] = useState<FilterState>({
    category: initialCategory,
    level: 'All',
    education: 'All',
    occupation: 'All',
    maxIncome: 1000000
  });

  // Sync prop changes (e.g. from CategoryGrid on Home or Footer navigation)
  useEffect(() => {
    if (initialCategory) {
      setFilters((prev) => ({ ...prev, category: initialCategory }));
    }
  }, [initialCategory]);

  useEffect(() => {
    if (initialQuery !== undefined) {
      setSearchQuery(initialQuery);
    }
  }, [initialQuery]);

  // Execute intelligent search & additive relevance scoring pipeline
  const { results: scoredResults, intent, totalBeforeFilters } = useMemo(() => {
    return searchAndFilterSchemes(schemes, searchQuery, filters);
  }, [schemes, searchQuery, filters]);

  // Extract schemes from scored results for display
  const filteredSchemes = useMemo(() => {
    return scoredResults.map((item) => ({
      ...item.scheme,
      // Attach match reasons for display if relevant
      matchReasons: item.matchReasons.length > 0 ? item.matchReasons : item.scheme.matchReasons
    }));
  }, [scoredResults]);

  // Reset pagination when filters or query change
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [filters, searchQuery]);

  const displayedSchemes = useMemo(() => {
    return filteredSchemes.slice(0, visibleCount);
  }, [filteredSchemes, visibleCount]);

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleResetFiltersOnly = () => {
    setFilters({
      category: 'All',
      level: 'All',
      education: 'All',
      occupation: 'All',
      maxIncome: 1000000
    });
  };

  const handleResetAll = () => {
    setSearchQuery('');
    handleResetFiltersOnly();
  };

  const hasActiveManualFilters =
    filters.category !== 'All' ||
    filters.level !== 'All' ||
    filters.education !== 'All' ||
    filters.occupation !== 'All' ||
    filters.maxIncome < 1000000;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Top Search Bar */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-600" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='Try: "B.Tech", "farmer", "scholarship", "business loan", "senior citizen", "health"...'
              className="w-full pl-12 pr-10 py-3.5 rounded-2xl border border-slate-300 bg-white shadow-xs focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-sm sm:text-base font-medium text-slate-800"
            />
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-lg"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="lg:hidden flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-white border border-slate-300 text-slate-700 font-semibold text-sm shadow-xs w-full sm:w-auto"
          >
            <SlidersHorizontal className="w-4 h-4 text-emerald-600" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Query Intent Recognized Banner (shows only genuinely detected fields) */}
      <AISearchBanner
        intent={intent}
        rawQuery={searchQuery}
        onClear={handleClearSearch}
      />

      {/* Main Content Layout (Sidebar + Cards) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Filter Sidebar */}
        <div className={`lg:block ${mobileFilterOpen ? 'block' : 'hidden'}`}>
          <div className="sticky top-24">
            <FilterSidebar
              filters={filters}
              onChange={setFilters}
              onReset={handleResetFiltersOnly}
              language={language}
            />
          </div>
        </div>

        {/* Right Schemes Grid */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-sm font-semibold text-slate-700">
                Showing <span className="text-emerald-800 font-extrabold">{displayedSchemes.length}</span> of{' '}
                <span className="text-slate-900 font-extrabold">{filteredSchemes.length}</span> schemes
                {filteredSchemes.length !== schemes.length && (
                  <span className="text-xs text-slate-500 font-normal ml-1">
                    (filtered from {schemes.length} total government schemes)
                  </span>
                )}
              </p>

              {searchQuery && (
                <span className="text-xs px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-semibold">
                  Sorted by relevance
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              {(searchQuery || hasActiveManualFilters) && (
                <button
                  onClick={handleResetAll}
                  className="text-xs text-slate-500 hover:text-emerald-700 font-medium inline-flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset All Filters</span>
                </button>
              )}

              {filteredSchemes.length > displayedSchemes.length && (
                <button
                  onClick={() => setVisibleCount(filteredSchemes.length)}
                  className="text-xs text-emerald-700 hover:text-emerald-900 font-bold underline cursor-pointer"
                >
                  View all {filteredSchemes.length} schemes
                </button>
              )}
            </div>
          </div>

          {filteredSchemes.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                <AlertCircle className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">
                No schemes found matching your criteria
              </h3>

              {searchQuery && totalBeforeFilters > 0 ? (
                <p className="text-sm text-slate-500 max-w-md mx-auto">
                  We found <span className="font-bold text-slate-800">{totalBeforeFilters} schemes</span> matching "{searchQuery}", but your active sidebar filters excluded them. Try clearing your category or sidebar filters.
                </p>
              ) : (
                <p className="text-sm text-slate-500 max-w-md mx-auto">
                  Try broader search terms like <span className="font-semibold text-emerald-700">"scholarship"</span>, <span className="font-semibold text-emerald-700">"farmer"</span>, or <span className="font-semibold text-emerald-700">"business loan"</span>.
                </p>
              )}

              <div className="flex items-center justify-center gap-3 pt-2">
                {hasActiveManualFilters && (
                  <button
                    onClick={handleResetFiltersOnly}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-colors cursor-pointer"
                  >
                    Clear Sidebar Filters
                  </button>
                )}
                {searchQuery && (
                  <button
                    onClick={handleClearSearch}
                    className="px-4 py-2 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-semibold text-xs transition-colors cursor-pointer"
                  >
                    Clear Search Query
                  </button>
                )}
                <button
                  onClick={handleResetAll}
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-semibold text-xs shadow-xs hover:bg-emerald-700 transition-colors cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {displayedSchemes.map((scheme) => (
                  <SchemeCard
                    key={scheme.id}
                    scheme={scheme}
                    language={language}
                    onViewDetails={setSelectedScheme}
                    onCheckEligibility={onCheckEligibility}
                    isSaved={savedSchemeIds.includes(scheme.id)}
                    onToggleSave={onToggleSave}
                  />
                ))}
              </div>

              {/* Load More Pagination */}
              {visibleCount < filteredSchemes.length && (
                <div className="pt-8 text-center flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={() => setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, filteredSchemes.length))}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border border-slate-300 hover:border-emerald-500 hover:text-emerald-700 text-slate-800 text-sm font-bold shadow-xs hover:shadow-md transition-all cursor-pointer"
                  >
                    <span>Load More Schemes</span>
                    <ChevronDown className="w-4 h-4 text-emerald-600" />
                  </button>

                  <button
                    onClick={() => setVisibleCount(filteredSchemes.length)}
                    className="inline-flex items-center gap-1.5 px-4 py-3 rounded-2xl text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                  >
                    <span>Show All ({filteredSchemes.length})</span>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Scheme Details Modal */}
      <SchemeDetailsModal
        scheme={selectedScheme}
        isOpen={Boolean(selectedScheme)}
        onClose={() => setSelectedScheme(null)}
        language={language}
        onCheckEligibility={onCheckEligibility}
      />
    </div>
  );
};
