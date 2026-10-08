import React, { useState } from 'react';
import {
  Compass,
  CheckCircle,
  FileText,
  FileCheck2,
  Clock,
  LayoutDashboard,
  ShieldCheck,
  Globe,
  Menu,
  X,
  Search,
  Bell
} from 'lucide-react';
import { Language, TRANSLATIONS } from '../../data/translations';

export type ActiveTab =
  | 'home'
  | 'discover'
  | 'eligibility'
  | 'documents'
  | 'form_assistant'
  | 'tracker'
  | 'dashboard'
  | 'admin';

interface NavbarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenSearch?: () => void;
  savedCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  language,
  onLanguageChange,
  onOpenSearch,
  savedCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = TRANSLATIONS[language];

  const navItems = [
    { id: 'discover' as ActiveTab, label: t.navDiscover, icon: Compass },
    { id: 'eligibility' as ActiveTab, label: t.navEligibility, icon: CheckCircle },
    { id: 'documents' as ActiveTab, label: t.navDocuments, icon: FileText },
    { id: 'form_assistant' as ActiveTab, label: t.navFormAssistant, icon: FileCheck2 },
    { id: 'tracker' as ActiveTab, label: t.navTracker, icon: Clock },
    { id: 'dashboard' as ActiveTab, label: t.navDashboard, icon: LayoutDashboard },
    { id: 'admin' as ActiveTab, label: t.navAdmin, icon: ShieldCheck },
  ];

  const handleNavClick = (tab: ActiveTab) => {
    onTabChange(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Gov Companion Stripe */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 text-white text-xs py-1 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 font-medium">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            <span>{t.govCompanionBadge}</span>
            <span className="hidden sm:inline text-emerald-200">|</span>
            <span className="hidden sm:inline text-emerald-100">{t.appTagline}</span>
          </div>
          <div className="flex items-center gap-4 text-emerald-100 text-xs">
            <span className="hidden md:inline">{t.officialDisclaimer}</span>
            <button
              onClick={() => onLanguageChange(language === 'en' ? 'hi' : 'en')}
              className="flex items-center gap-1.5 bg-emerald-900/60 hover:bg-emerald-900 px-2.5 py-0.5 rounded-full font-semibold text-white transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-amber-300" />
              <span>{language === 'en' ? 'हिन्दी में बदलें' : 'Switch to English'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Nav Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center justify-center text-white shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
              <span className="text-xl font-black font-sans tracking-tight">🏛️</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
                  {t.appName}
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-300/60 uppercase tracking-wider">
                  AI Assisting
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">
                {t.appTagline}
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-800 font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-700' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons & AI Assistant Trigger */}
          <div className="flex items-center gap-2.5">
            {/* Quick Search Shortcut */}
            <button
              onClick={() => {
                if (onOpenSearch) onOpenSearch();
                else handleNavClick('discover');
              }}
              title="Search schemes"
              className="p-2 text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors hidden sm:flex items-center gap-1.5 text-xs font-medium border border-slate-200"
            >
              <Search className="w-4 h-4 text-slate-500" />
              <span className="text-slate-400">Search</span>
              <kbd className="hidden lg:inline px-1.5 py-0.5 text-[10px] bg-slate-100 rounded text-slate-500 border border-slate-200">
                ⌘K
              </kbd>
            </button>


            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-slate-700 hover:text-emerald-700 hover:bg-slate-100 rounded-lg"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-1 shadow-xl">
          <div className="grid grid-cols-1 gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-left text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-800 font-bold border-l-4 border-emerald-600'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-700' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">Language</span>
            <button
              onClick={() => onLanguageChange(language === 'en' ? 'hi' : 'en')}
              className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700"
            >
              <Globe className="w-4 h-4 text-emerald-600" />
              <span>{language === 'en' ? 'Switch to हिन्दी' : 'Switch to English'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
