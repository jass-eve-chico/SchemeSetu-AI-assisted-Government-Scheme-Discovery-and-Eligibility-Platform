import React from 'react';
import { ShieldCheck, ExternalLink, Heart, AlertTriangle } from 'lucide-react';
import { Language, TRANSLATIONS } from '../../data/translations';

interface FooterProps {
  language: Language;
  onCategorySelect?: (cat: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ language, onCategorySelect }) => {
  const t = TRANSLATIONS[language];

  const categories = [
    t.catEducation,
    t.catEmployment,
    t.catAgriculture,
    t.catHealthcare,
    t.catHousing,
    t.catWomen,
    t.catDisability,
    t.catBusiness,
    t.catFinancial,
  ];

  const officialLinks = [
    { name: 'National Scholarship Portal (NSP)', url: 'https://scholarships.gov.in' },
    { name: 'PM-KISAN Samman Nidhi', url: 'https://pmkisan.gov.in' },
    { name: 'Ayushman Bharat Beneficiary Portal', url: 'https://beneficiary.nha.gov.in' },
    { name: 'Pradhan Mantri Awas Yojana (PMAY)', url: 'https://pmaymis.gov.in' },
    { name: 'Udyamitra MSME / Mudra Loans', url: 'https://www.udyamitra.in' },
    { name: 'DigiLocker Digital Document Repository', url: 'https://www.digilocker.gov.in' },
  ];

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold text-lg">
                🏛️
              </div>
              <span className="font-extrabold text-2xl text-white tracking-tight">
                {t.appName}
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              {t.appTagline} An assistive AI companion bridging Indian citizens with central and state government welfare schemes, eligibility rules, and application roadmaps.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/70 border border-emerald-800 text-emerald-300 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Smart India Hackathon Prototype</span>
            </div>
          </div>

          {/* Welfare Categories */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              {t.categoriesTitle}
            </h4>
            <ul className="grid grid-cols-1 gap-2 text-sm text-slate-400">
              {categories.map((cat, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => onCategorySelect && onCategorySelect(cat)}
                    className="hover:text-emerald-400 transition-colors text-left"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Official Portals */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Official Government Portals
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              {officialLinks.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors group"
                  >
                    <span className="truncate">{link.name}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 shrink-0" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Official Disclaimer & Citizen Trust Notice */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Citizen Advisory & Safety
            </h4>
            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2 text-xs text-slate-300 leading-relaxed">
              <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Notice to Citizens</span>
              </div>
              <p>
                SchemeSetu operates strictly as an educational and procedural assistance platform. We do not claim official eligibility or charge fees. All final applications must be verified on official government portals.
              </p>
            </div>
            <div className="text-xs text-slate-400">
              <p className="font-semibold text-slate-300">National Citizen Toll-Free Help:</p>
              <p>1800-11-2024 / support@schemesetu.gov-demo.in</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} SchemeSetu. Built for Indian Citizen Welfare & Inclusion.</p>
          <div className="flex items-center gap-6">
            <span>Aadhaar & Data Privacy Compliant</span>
            <span>WCAG 2.1 Accessible</span>
            <span className="flex items-center gap-1">
              Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for India
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
