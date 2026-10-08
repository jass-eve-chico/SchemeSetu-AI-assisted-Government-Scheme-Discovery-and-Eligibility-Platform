import React, { useState } from 'react';
import { Scheme } from '../../types/scheme';
import { UserProfile, EligibilityResult } from '../../types/user';
import { evaluateEligibility } from '../../lib/eligibilityEngine';
import { StorageService } from '../../lib/storage';
import { EligibilityReport } from './EligibilityReport';
import {
  X,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  User,
  GraduationCap,
  IndianRupee,
  ShieldCheck
} from 'lucide-react';
import { Language, TRANSLATIONS } from '../../data/translations';

interface EligibilityCheckerModalProps {
  scheme: Scheme | null;
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onOpenDocuments: () => void;
  onOpenFormAssistant: () => void;
}

export const EligibilityCheckerModal: React.FC<EligibilityCheckerModalProps> = ({
  scheme,
  isOpen,
  onClose,
  language,
  onOpenDocuments,
  onOpenFormAssistant
}) => {
  if (!isOpen || !scheme) return null;
  const t = TRANSLATIONS[language];

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [profile, setProfile] = useState<UserProfile>(StorageService.getUserProfile());
  const [result, setResult] = useState<EligibilityResult | null>(null);

  const handleAnalyze = () => {
    // Save updated profile
    StorageService.saveUserProfile(profile);

    // Run evaluation engine
    const res = evaluateEligibility(scheme, profile);
    setResult(res);

    // Save check in history
    StorageService.addEligibilityCheck(res);

    setCurrentStep(4);
  };

  const handleResetCheck = () => {
    setResult(null);
    setCurrentStep(1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="p-6 bg-gradient-to-r from-emerald-50 via-teal-50 to-white border-b border-slate-200">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="p-1 rounded-md bg-emerald-600 text-white">
                  <ShieldCheck className="w-4 h-4" />
                </span>
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                  {t.eligibilityTitle}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                {scheme.name}
              </h2>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Stepper Indicator */}
          {currentStep < 4 && (
            <div className="flex items-center gap-2 mt-5">
              {[
                { step: 1, label: t.step1Demographics, icon: User },
                { step: 2, label: t.step2EducationWork, icon: GraduationCap },
                { step: 3, label: t.step3IncomeCategory, icon: IndianRupee }
              ].map((s) => {
                const Icon = s.icon;
                const isActive = currentStep === s.step;
                const isPassed = currentStep > s.step;
                return (
                  <div
                    key={s.step}
                    className={`flex-1 flex items-center gap-2 py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-white border-emerald-500 text-emerald-800 shadow-xs'
                        : isPassed
                        ? 'bg-emerald-100/60 border-emerald-200 text-emerald-800'
                        : 'bg-slate-50 border-slate-200 text-slate-400'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span className="hidden sm:inline">{s.label}</span>
                    <span className="sm:hidden">Step {s.step}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          {/* STEP 1: DEMOGRAPHICS */}
          {currentStep === 1 && (
            <div className="space-y-5 animate-in fade-in">
              <h3 className="text-base font-bold text-slate-900">
                1. Personal Demographics
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    {t.labelAge}
                  </label>
                  <input
                    type="number"
                    value={profile.age}
                    onChange={(e) => setProfile({ ...profile, age: Number(e.target.value) })}
                    className="w-full p-3 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 font-medium text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    {t.labelGender}
                  </label>
                  <select
                    value={profile.gender}
                    onChange={(e) => setProfile({ ...profile, gender: e.target.value as any })}
                    className="w-full p-3 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 font-medium text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    {t.labelState}
                  </label>
                  <select
                    value={profile.state}
                    onChange={(e) => setProfile({ ...profile, state: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 font-medium text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  >
                    {['Maharashtra', 'Uttar Pradesh', 'Bihar', 'Rajasthan', 'Karnataka', 'Tamil Nadu', 'Delhi', 'Madhya Pradesh', 'Gujarat'].map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    {t.labelDistrict}
                  </label>
                  <input
                    type="text"
                    value={profile.district}
                    onChange={(e) => setProfile({ ...profile, district: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 font-medium text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: EDUCATION & OCCUPATION */}
          {currentStep === 2 && (
            <div className="space-y-5 animate-in fade-in">
              <h3 className="text-base font-bold text-slate-900">
                2. Academic & Employment Status
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    {t.labelEducation}
                  </label>
                  <select
                    value={profile.education}
                    onChange={(e) => setProfile({ ...profile, education: e.target.value as any })}
                    className="w-full p-3 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 font-medium text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="B.Tech">B.Tech / Engineering Degree</option>
                    <option value="Diploma">Diploma / Polytechnic</option>
                    <option value="12th Pass">12th Pass</option>
                    <option value="10th Pass">10th Pass</option>
                    <option value="Graduate">Graduate (BA, BSc, BCom, etc.)</option>
                    <option value="Post Graduate">Post Graduate</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    {t.labelOccupation}
                  </label>
                  <select
                    value={profile.occupation}
                    onChange={(e) => setProfile({ ...profile, occupation: e.target.value as any })}
                    className="w-full p-3 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 font-medium text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Student">Student</option>
                    <option value="Farmer">Farmer</option>
                    <option value="Artisan">Artisan / Craftsperson</option>
                    <option value="Business Owner">Business Owner / Shopkeeper</option>
                    <option value="Self Employed">Self Employed</option>
                    <option value="Unemployed">Unemployed</option>
                  </select>
                </div>

                <div className="sm:col-span-2 p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-slate-900">{t.labelStudentStatus}</div>
                    <div className="text-xs text-slate-500">Enrolled full-time in an accredited school, college or university</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={profile.isStudent}
                    onChange={(e) => setProfile({ ...profile, isStudent: e.target.checked })}
                    className="w-5 h-5 text-emerald-600 rounded-md focus:ring-emerald-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: INCOME & SOCIAL CATEGORY */}
          {currentStep === 3 && (
            <div className="space-y-5 animate-in fade-in">
              <h3 className="text-base font-bold text-slate-900">
                3. Financial & Social Category
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    {t.labelIncome}
                  </label>
                  <input
                    type="number"
                    value={profile.annualFamilyIncome}
                    onChange={(e) => setProfile({ ...profile, annualFamilyIncome: Number(e.target.value) })}
                    className="w-full p-3 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 font-medium text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    Current value: ₹{profile.annualFamilyIncome.toLocaleString('en-IN')} / year
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    {t.labelSocialCategory}
                  </label>
                  <select
                    value={profile.socialCategory}
                    onChange={(e) => setProfile({ ...profile, socialCategory: e.target.value as any })}
                    className="w-full p-3 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 font-medium text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="General">General / Open</option>
                    <option value="OBC">OBC (Other Backward Class)</option>
                    <option value="SC">SC (Scheduled Caste)</option>
                    <option value="ST">ST (Scheduled Tribe)</option>
                    <option value="EWS">EWS (Economically Weaker Section)</option>
                  </select>
                </div>

                <div className="sm:col-span-2 p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-slate-900">{t.labelDisability}</div>
                    <div className="text-xs text-slate-500">Certified by district medical authority with UDID</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={profile.isDifferentlyAbled}
                    onChange={(e) => setProfile({ ...profile, isDifferentlyAbled: e.target.checked })}
                    className="w-5 h-5 text-emerald-600 rounded-md focus:ring-emerald-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: ELIGIBILITY BREAKDOWN RESULT */}
          {currentStep === 4 && result && (
            <EligibilityReport
              result={result}
              language={language}
              onOpenDocuments={() => {
                onClose();
                onOpenDocuments();
              }}
              onOpenFormAssistant={() => {
                onClose();
                onOpenFormAssistant();
              }}
              onRecheck={handleResetCheck}
            />
          )}
        </div>

        {/* Modal Stepper Buttons */}
        {currentStep < 4 && (
          <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
            {currentStep > 1 ? (
              <button
                onClick={() => setCurrentStep((currentStep - 1) as any)}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-700 text-xs sm:text-sm font-semibold hover:bg-slate-100"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {currentStep < 3 ? (
              <button
                onClick={() => setCurrentStep((currentStep + 1) as any)}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-xs"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleAnalyze}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-md active:scale-98"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>{t.analyzeEligibilityBtn}</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
