import React from 'react';
import { Filter, RotateCcw } from 'lucide-react';
import { SchemeCategory } from '../../types/scheme';
import { CATEGORIES_LIST } from '../../data/schemesData';
import { Language, TRANSLATIONS } from '../../data/translations';

export interface FilterState {
  category: SchemeCategory | 'All';
  level: 'All' | 'Central' | 'State';
  education: string;
  occupation: string;
  maxIncome: number;
}

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
  language: Language;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onChange,
  onReset,
  language
}) => {
  const t = TRANSLATIONS[language];

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-emerald-600" />
          <h3 className="text-sm font-bold text-slate-900">Filter Schemes</h3>
        </div>
        <button
          onClick={onReset}
          className="text-xs text-slate-500 hover:text-emerald-700 flex items-center gap-1 font-medium"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Category Filter */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Category
        </label>
        <select
          value={filters.category}
          onChange={(e) => onChange({ ...filters, category: e.target.value as any })}
          className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 font-medium focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
        >
          <option value="All">{t.allCategories}</option>
          {CATEGORIES_LIST.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Level Filter (Central / State) */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Government Level
        </label>
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-xl text-xs font-semibold">
          {(['All', 'Central', 'State'] as const).map((lvl) => (
            <button
              key={lvl}
              onClick={() => onChange({ ...filters, level: lvl })}
              className={`py-1.5 rounded-lg transition-all ${
                filters.level === lvl
                  ? 'bg-white text-emerald-800 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Education Filter */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Education Level
        </label>
        <select
          value={filters.education}
          onChange={(e) => onChange({ ...filters, education: e.target.value })}
          className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 font-medium focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
        >
          <option value="All">All Education Levels</option>
          <option value="B.Tech">B.Tech / Technical Degree</option>
          <option value="Diploma">Diploma / Polytechnic</option>
          <option value="Graduate">Graduate (Any Stream)</option>
          <option value="Post Graduate">Post Graduate / Masters</option>
          <option value="Doctorate">Doctorate / Ph.D.</option>
          <option value="12th Pass">12th Pass</option>
          <option value="10th Pass">10th Pass</option>
        </select>
      </div>

      {/* Occupation Filter */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Occupation / Profile
        </label>
        <select
          value={filters.occupation}
          onChange={(e) => onChange({ ...filters, occupation: e.target.value })}
          className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 font-medium focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
        >
          <option value="All">All Profiles</option>
          <option value="Student">Student</option>
          <option value="Farmer">Farmer</option>
          <option value="Artisan">Artisan / Craftsperson</option>
          <option value="Business Owner">Business Owner / Shopkeeper</option>
          <option value="Self Employed">Self Employed</option>
          <option value="Unemployed">Unemployed</option>
        </select>
      </div>

      {/* Max Family Income Slider */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Max Family Income
          </label>
          <span className="text-xs font-bold text-emerald-700">
            {filters.maxIncome >= 1000000
              ? 'No Limit'
              : `≤ ₹${(filters.maxIncome / 100000).toFixed(1)} Lakh`}
          </span>
        </div>
        <input
          type="range"
          min="100000"
          max="1000000"
          step="50000"
          value={filters.maxIncome}
          onChange={(e) => onChange({ ...filters, maxIncome: Number(e.target.value) })}
          className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
        />
        <div className="flex justify-between text-[10px] text-slate-400 mt-1">
          <span>₹1L</span>
          <span>₹3L</span>
          <span>₹5L</span>
          <span>Any</span>
        </div>
      </div>
    </div>
  );
};
