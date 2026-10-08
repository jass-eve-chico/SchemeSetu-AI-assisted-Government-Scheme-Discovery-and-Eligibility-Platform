import React from 'react';
import { Search, BrainCircuit, FileCheck, ShieldAlert, ArrowRight } from 'lucide-react';
import { Language } from '../../data/translations';

interface HowItWorksProps {
  language: Language;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ language }) => {
  const steps = [
    {
      num: '01',
      title: 'State Your Requirement',
      desc: 'Describe your background, education, and needs in natural conversational Hindi, English, or Hinglish.',
      icon: Search,
      badge: 'Natural NLP',
      color: 'bg-blue-500'
    },
    {
      num: '02',
      title: 'Structured Rule Matching',
      desc: 'Our engine extracts parameters (income, degree, category) and computes transparent eligibility criteria.',
      icon: BrainCircuit,
      badge: 'Deterministic Rules',
      color: 'bg-emerald-600'
    },
    {
      num: '03',
      title: 'Verify Required Documents',
      desc: 'Upload certificates for OCR metadata validation. Get alerted instantly if any certificate is missing or expired.',
      icon: FileCheck,
      badge: 'Document Vault',
      color: 'bg-amber-500'
    },
    {
      num: '04',
      title: 'Form Assistance & Safe Redirection',
      desc: 'Review auto-mapped fields line by line before being safely redirected to the official government portal.',
      icon: ShieldAlert,
      badge: 'Human In Loop',
      color: 'bg-teal-600'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold mb-3">
            <span>Simplified Welfare Journey</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            How SchemeSetu Works
          </h2>
          <p className="mt-3 text-lg text-slate-600">
            A transparent 4-stage pipeline that eliminates confusing bureaucratic jargon without compromising your data privacy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative p-6 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-2xl font-black text-slate-300 font-mono">
                      {step.num}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700">
                      {step.badge}
                    </span>
                  </div>

                  <div className={`w-12 h-12 rounded-xl ${step.color} text-white flex items-center justify-center mb-5 shadow-sm`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
