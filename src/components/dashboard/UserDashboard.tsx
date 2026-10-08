import React, { useState, useMemo } from 'react';
import { Scheme } from '../../types/scheme';
import { UserProfile, EligibilityResult } from '../../types/user';
import { UserDocument } from '../../types/document';
import { Application } from '../../types/application';
import { RecommendationCard } from './RecommendationCard';
import { SchemeCard } from '../discovery/SchemeCard';
import { StorageService } from '../../lib/storage';
import { evaluateEligibility } from '../../lib/eligibilityEngine';
import {
  User,
  Sparkles,
  Bookmark,
  CheckCircle2,
  FileText,
  Clock,
  ShieldCheck,
  Edit2,
  Bell,
  ArrowRight
} from 'lucide-react';
import { Language, TRANSLATIONS } from '../../data/translations';

interface UserDashboardProps {
  schemes: Scheme[];
  userProfile: UserProfile;
  onUpdateProfile: (profile: UserProfile) => void;
  savedSchemeIds: string[];
  onToggleSave: (id: string) => void;
  userDocuments: UserDocument[];
  applications: Application[];
  onViewDetails: (scheme: Scheme) => void;
  onCheckEligibility: (scheme: Scheme) => void;
  language: Language;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({
  schemes,
  userProfile,
  onUpdateProfile,
  savedSchemeIds,
  onToggleSave,
  userDocuments,
  applications,
  onViewDetails,
  onCheckEligibility,
  language
}) => {
  const t = TRANSLATIONS[language];
  const [activeTab, setActiveTab] = useState<'recommended' | 'saved' | 'checks' | 'profile'>('recommended');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState<UserProfile>(userProfile);

  // Time of day greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  // Saved schemes
  const savedSchemes = schemes.filter((s) => savedSchemeIds.includes(s.id));

  // Eligibility check history
  const eligibilityChecks = StorageService.getEligibilityChecks();

  // Recommendations calculated dynamically based on user profile
  const recommendedList = useMemo(() => {
    const scored = schemes.map((scheme) => {
      const res = evaluateEligibility(scheme, userProfile);
      let matchReason = '';
      if (res.overallStatus === 'Potentially Eligible') {
        const topReasons = res.breakdown
          .filter((b) => b.status === 'matched')
          .map((b) => b.reason)
          .slice(0, 2);
        matchReason = topReasons.join(' ') || scheme.shortDescription;
      } else {
        const unmatched = res.breakdown.find((b) => b.status === 'unmatched');
        matchReason = unmatched?.reason || scheme.shortDescription;
      }

      return {
        scheme,
        matchScore: res.matchScore,
        matchReason
      };
    });

    // Sort by match score descending
    scored.sort((a, b) => b.matchScore - a.matchScore);

    return scored.slice(0, 6);
  }, [schemes, userProfile]);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(profileForm);
    setIsEditingProfile(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Personalized Citizen Greeting Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-700/60 text-emerald-200 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>AI Personalized Welfare Hub</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              {getGreeting()}, {userProfile.name}!
            </h1>
            <p className="text-sm sm:text-base text-emerald-100/90 max-w-2xl">
              {t.dashboardSubtitle} We continuously monitor central and state Gazette notifications matching your profile.
            </p>
          </div>

          {/* Quick Profile Summary Badge */}
          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-xs space-y-1.5 shrink-0">
            <div className="flex justify-between gap-4">
              <span className="text-emerald-200">Education:</span>
              <span className="font-bold">{userProfile.education} ({userProfile.occupation})</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-emerald-200">Annual Income:</span>
              <span className="font-bold">₹{userProfile.annualFamilyIncome.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-emerald-200">Social Category:</span>
              <span className="font-bold">{userProfile.socialCategory}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-emerald-200">State:</span>
              <span className="font-bold">{userProfile.state}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Sub-navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        {[
          { id: 'recommended', label: t.recommendedSchemes, icon: Sparkles, count: recommendedList.length },
          { id: 'saved', label: t.savedSchemes, icon: Bookmark, count: savedSchemes.length },
          { id: 'checks', label: t.recentChecks, icon: CheckCircle2, count: eligibilityChecks.length },
          { id: 'profile', label: 'My Citizen Profile', icon: User }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-300 shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-700' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  isActive ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: RECOMMENDED SCHEMES */}
      {activeTab === 'recommended' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">
              Personalized Recommendations (Ranked by Match Score)
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedList.map((item, idx) => (
              <RecommendationCard
                key={idx}
                scheme={item.scheme}
                matchScore={item.matchScore}
                matchReason={item.matchReason}
                onViewDetails={onViewDetails}
                onCheckEligibility={onCheckEligibility}
              />
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: SAVED SCHEMES */}
      {activeTab === 'saved' && (
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-slate-900">
            Bookmarked Government Schemes ({savedSchemes.length})
          </h3>

          {savedSchemes.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-white border border-slate-200 text-slate-500 text-sm">
              No schemes bookmarked yet. Click the bookmark icon on any scheme card to save it here.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {savedSchemes.map((scheme) => (
                <SchemeCard
                  key={scheme.id}
                  scheme={scheme}
                  language={language}
                  onViewDetails={onViewDetails}
                  onCheckEligibility={onCheckEligibility}
                  isSaved={true}
                  onToggleSave={onToggleSave}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: ELIGIBILITY CHECKS HISTORY */}
      {activeTab === 'checks' && (
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-slate-900">
            Recorded Eligibility Evaluations ({eligibilityChecks.length})
          </h3>

          {eligibilityChecks.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-white border border-slate-200 text-slate-500 text-sm">
              You haven't run any eligibility checks yet. Open any scheme and click "Check Eligibility" to see the breakdown recorded here.
            </div>
          ) : (
            <div className="space-y-4">
              {eligibilityChecks.map((chk, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm sm:text-base">{chk.schemeName}</h4>
                    <span className="text-xs text-slate-500">Evaluated on: {new Date(chk.checkedAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                      {chk.overallStatus} ({chk.matchScore}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: PROFILE */}
      {activeTab === 'profile' && (
        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-6 max-w-2xl">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Citizen Profile Information</h3>
              <p className="text-xs text-slate-500">Used strictly locally for calculating your eligibility rules</p>
            </div>
            {!isEditingProfile && (
              <button
                onClick={() => setIsEditingProfile(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold hover:bg-emerald-100"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit Profile</span>
              </button>
            )}
          </div>

          {!isEditingProfile ? (
            <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm">
              <div>
                <span className="text-slate-400 block">Full Name:</span>
                <span className="font-bold text-slate-800">{userProfile.name}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Email:</span>
                <span className="font-bold text-slate-800">{userProfile.email}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Phone:</span>
                <span className="font-bold text-slate-800">{userProfile.phone}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Age:</span>
                <span className="font-bold text-slate-800">{userProfile.age} Years</span>
              </div>
              <div>
                <span className="text-slate-400 block">Education:</span>
                <span className="font-bold text-slate-800">{userProfile.education}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Occupation:</span>
                <span className="font-bold text-slate-800">{userProfile.occupation}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Annual Family Income:</span>
                <span className="font-bold text-slate-800">₹{userProfile.annualFamilyIncome.toLocaleString('en-IN')}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Social Category:</span>
                <span className="font-bold text-slate-800">{userProfile.socialCategory}</span>
              </div>
              <div>
                <span className="text-slate-400 block">State:</span>
                <span className="font-bold text-slate-800">{userProfile.state}</span>
              </div>
              <div>
                <span className="text-slate-400 block">District:</span>
                <span className="font-bold text-slate-800">{userProfile.district}</span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Full Name</label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Annual Family Income (₹)</label>
                  <input
                    type="number"
                    value={profileForm.annualFamilyIncome}
                    onChange={(e) => setProfileForm({ ...profileForm, annualFamilyIncome: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setIsEditingProfile(false)}
                  className="px-4 py-2 rounded-xl border text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-bold"
                >
                  Save Profile
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
};
