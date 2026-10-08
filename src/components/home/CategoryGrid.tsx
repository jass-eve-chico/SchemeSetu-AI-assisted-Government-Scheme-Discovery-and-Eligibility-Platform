import React from 'react';
import {
  GraduationCap,
  Briefcase,
  Sprout,
  HeartPulse,
  Home,
  Users,
  Accessibility,
  Building2,
  Coins,
  ArrowRight
} from 'lucide-react';
import { Language, TRANSLATIONS } from '../../data/translations';
import { SchemeCategory } from '../../types/scheme';

interface CategoryGridProps {
  language: Language;
  onSelectCategory: (category: SchemeCategory) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({ language, onSelectCategory }) => {
  const t = TRANSLATIONS[language];

  const categoriesConfig: {
    id: SchemeCategory;
    title: string;
    desc: string;
    icon: React.ElementType;
    schemesCount: number;
    colorClass: string;
    bgClass: string;
  }[] = [
    {
      id: 'Education',
      title: t.catEducation,
      desc: 'Scholarships, fee waivers, technical degree grants for students.',
      icon: GraduationCap,
      schemesCount: 42,
      colorClass: 'text-blue-600',
      bgClass: 'bg-blue-50 group-hover:bg-blue-100',
    },
    {
      id: 'Employment',
      title: t.catEmployment,
      desc: 'Skill development, artisan toolkits, vocational apprenticeships.',
      icon: Briefcase,
      schemesCount: 38,
      colorClass: 'text-emerald-600',
      bgClass: 'bg-emerald-50 group-hover:bg-emerald-100',
    },
    {
      id: 'Agriculture',
      title: t.catAgriculture,
      desc: 'Income support, crop insurance, farm subsidies, and equipment.',
      icon: Sprout,
      schemesCount: 55,
      colorClass: 'text-green-600',
      bgClass: 'bg-green-50 group-hover:bg-green-100',
    },
    {
      id: 'Healthcare',
      title: t.catHealthcare,
      desc: 'Cashless hospital treatment, medical insurance, maternity support.',
      icon: HeartPulse,
      schemesCount: 29,
      colorClass: 'text-rose-600',
      bgClass: 'bg-rose-50 group-hover:bg-rose-100',
    },
    {
      id: 'Housing',
      title: t.catHousing,
      desc: 'Pucca house financial grants, home loan interest subsidies.',
      icon: Home,
      schemesCount: 18,
      colorClass: 'text-amber-600',
      bgClass: 'bg-amber-50 group-hover:bg-amber-100',
    },
    {
      id: 'Women',
      title: t.catWomen,
      desc: 'Girl child education savings, maternal health, women entrepreneurship.',
      icon: Users,
      schemesCount: 34,
      colorClass: 'text-purple-600',
      bgClass: 'bg-purple-50 group-hover:bg-purple-100',
    },
    {
      id: 'Disability',
      title: t.catDisability,
      desc: 'Assistive devices, motorized tricycles, cochlear implants, pensions.',
      icon: Accessibility,
      schemesCount: 22,
      colorClass: 'text-indigo-600',
      bgClass: 'bg-indigo-50 group-hover:bg-indigo-100',
    },
    {
      id: 'Business',
      title: t.catBusiness,
      desc: 'Collateral-free Mudra credit, PMEGP capital subsidies, MSME funds.',
      icon: Building2,
      schemesCount: 46,
      colorClass: 'text-teal-600',
      bgClass: 'bg-teal-50 group-hover:bg-teal-100',
    },
    {
      id: 'Financial Assistance',
      title: t.catFinancial,
      desc: 'Zero-balance accounts, pension security, direct DBT transfers.',
      icon: Coins,
      schemesCount: 31,
      colorClass: 'text-orange-600',
      bgClass: 'bg-orange-50 group-hover:bg-orange-100',
    },
  ];

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
          {t.categoriesTitle}
        </h2>
        <p className="mt-3 text-base sm:text-lg text-slate-600">
          {t.categoriesSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoriesConfig.map((cat) => {
          const Icon = cat.icon;
          return (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="group relative p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-lg hover:border-emerald-300 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${cat.bgClass}`}>
                    <Icon className={`w-6 h-6 ${cat.colorClass}`} />
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                    {cat.schemesCount} Schemes
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors mb-2">
                  {cat.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {cat.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-700 group-hover:text-emerald-800">
                <span>Explore Schemes</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
