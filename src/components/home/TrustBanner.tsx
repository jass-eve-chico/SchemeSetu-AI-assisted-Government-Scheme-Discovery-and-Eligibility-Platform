import React from 'react';
import { ShieldCheck, Lock, UserCheck, FileCheck } from 'lucide-react';
import { Language } from '../../data/translations';

interface TrustBannerProps {
  language: Language;
}

export const TrustBanner: React.FC<TrustBannerProps> = ({ language }) => {
  return (
    <section className="py-12 bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-700 text-emerald-300 text-xs font-semibold">
              <Lock className="w-3.5 h-3.5" />
              <span>Government-Grade Trust Architecture</span>
            </div>
            <h3 className="text-2xl font-bold tracking-tight text-white">
              Zero Silent Submissions. 100% Citizen Control.
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              SchemeSetu strictly assists you with discovery and field mapping. You review and approve every extracted data point before submitting to authentic national portals.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full lg:w-auto">
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10">
              <UserCheck className="w-5 h-5 text-amber-400 shrink-0" />
              <div className="text-left">
                <div className="font-bold text-xs text-white">Citizen Verification</div>
                <div className="text-[11px] text-slate-300">Mandatory Review Gate</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <div className="text-left">
                <div className="font-bold text-xs text-white">Private Document Vault</div>
                <div className="text-[11px] text-slate-300">Encrypted Local Storage</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10">
              <FileCheck className="w-5 h-5 text-teal-400 shrink-0" />
              <div className="text-left">
                <div className="font-bold text-xs text-white">Direct Official Source</div>
                <div className="text-[11px] text-slate-300">Verified Ministry Links</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
