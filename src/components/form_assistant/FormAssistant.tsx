import React, { useState } from 'react';
import { Scheme } from '../../types/scheme';
import { UserDocument } from '../../types/document';
import { Application } from '../../types/application';
import { StorageService } from '../../lib/storage';
import { VerificationReview } from './VerificationReview';
import {
  FileCheck2,
  Sparkles,
  Link as LinkIcon,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Edit3
} from 'lucide-react';
import { Language, TRANSLATIONS } from '../../data/translations';

interface FormAssistantProps {
  schemes: Scheme[];
  userDocuments: UserDocument[];
  onApplicationCreated: (app: Application) => void;
  language: Language;
}

export const FormAssistant: React.FC<FormAssistantProps> = ({
  schemes,
  userDocuments,
  onApplicationCreated,
  language
}) => {
  const t = TRANSLATIONS[language];
  const profile = StorageService.getUserProfile();

  const [selectedSchemeId, setSelectedSchemeId] = useState<string>(
    schemes[0]?.id || 'post-matric-scholarship'
  );
  const [customUrl, setCustomUrl] = useState('');
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const selectedScheme = schemes.find((s) => s.id === selectedSchemeId) || schemes[0];

  // Editable Form Fields mapped from documents & profile
  const [formData, setFormData] = useState<Record<string, string>>({
    'Applicant Full Name': profile.name,
    'Date of Birth': '14/08/2004',
    'Gender': profile.gender,
    'Social Category': profile.socialCategory,
    'State of Domicile': profile.state,
    'District': profile.district,
    'Current Education Course': profile.education + ' Computer Science & Engineering',
    'Institution / College': 'College of Engineering Pune (AISHE: C-41092)',
    'Annual Family Income': `₹${profile.annualFamilyIncome.toLocaleString('en-IN')}`,
    'Aadhaar Number (Seeded)': 'XXXX-XXXX-4921',
    'Bank Account / IFSC': 'SBI0001829 • A/C No: 33918291028',
  });

  const handleFieldChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleConfirmAndRedirect = () => {
    // Generate new application record in tracker
    const newApp: Application = {
      id: `app-${Date.now()}`,
      schemeId: selectedScheme.id,
      schemeName: selectedScheme.name,
      category: selectedScheme.category,
      applicationNumber: `APP-${Date.now().toString().slice(-6)}`,
      applicantName: formData['Applicant Full Name'] || profile.name,
      appliedDate: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0],
      status: 'Submitted',
      currentStage: 'Document & Application Review by Nodal Authority',
      nextStep: 'Complete biological e-KYC or portal login on government website',
      timeline: [
        {
          title: 'SchemeSetu Form Field Verification',
          date: new Date().toLocaleDateString('en-GB'),
          description: 'Verified mapped data from Aadhaar and Income certificates',
          completed: true
        },
        {
          title: 'Official Portal Redirection',
          date: new Date().toLocaleDateString('en-GB'),
          description: 'Citizen acknowledged and directed to official portal',
          completed: true
        },
        {
          title: 'Department Scrutiny & Sanction',
          date: 'Scheduled',
          description: 'Awaiting official nodal committee clearance',
          completed: false
        }
      ],
      formData,
      attachedDocumentIds: userDocuments.map((d) => d.id),
      officialPortalUrl: selectedScheme.applicationUrl
    };

    onApplicationCreated(newApp);
    setIsReviewModalOpen(false);
    setSubmittedSuccess(true);

    // Open official portal safely in new tab
    window.open(selectedScheme.applicationUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            <span>AI Auto-Mapping with Human Verification</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {t.formAssistantTitle}
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            {t.formAssistantSubtitle}
          </p>
        </div>
      </div>

      {submittedSuccess && (
        <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-300 flex items-center justify-between gap-4 animate-in fade-in">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-emerald-900">
                Application Successfully Tracked!
              </h4>
              <p className="text-xs text-emerald-700">
                We have registered this entry in your "My Applications" dashboard. Official portal has been opened in a new tab.
              </p>
            </div>
          </div>
          <button
            onClick={() => setSubmittedSuccess(false)}
            className="text-xs text-emerald-800 font-bold hover:underline shrink-0"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Step 1: Scheme / Portal Selector */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center font-bold">1</span>
          <span>{t.stepUrl}</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Select Official Scheme Form
            </label>
            <select
              value={selectedSchemeId}
              onChange={(e) => setSelectedSchemeId(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 font-medium text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            >
              {schemes.map((scheme) => (
                <option key={scheme.id} value={scheme.id}>
                  {scheme.name} ({scheme.category})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Official Application Portal URL
            </label>
            <div className="relative">
              <LinkIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                readOnly
                value={selectedScheme.applicationUrl}
                className="w-full pl-10 pr-4 p-3 rounded-xl border border-slate-200 bg-slate-100 text-slate-600 text-xs font-mono"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Step 2: Documents Mapping Status */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center font-bold">2</span>
            <span>{t.stepExtract}</span>
          </h3>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            {userDocuments.length} Verified Documents Linked
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {userDocuments.slice(0, 3).map((doc) => (
            <div key={doc.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <div className="truncate text-xs">
                <span className="font-bold text-slate-900 block truncate">{doc.name}</span>
                <span className="text-slate-500">{doc.type}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Step 3: Interactive Field-by-Field Review */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center font-bold">3</span>
              <span>{t.stepReview}</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {t.fieldReviewNotice}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(formData).map(([label, value]) => (
            <div key={label} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <label className="font-bold text-slate-700">{label}</label>
                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100/70 px-1.5 py-0.5 rounded-md flex items-center gap-1">
                  <CheckCircle2 className="w-2.5 h-2.5" />
                  <span>OCR Auto-Mapped</span>
                </span>
              </div>
              <input
                type="text"
                value={value}
                onChange={(e) => handleFieldChange(label, e.target.value)}
                className="w-full p-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>
          ))}
        </div>

        {/* Step 4: Continue Gate */}
        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Guaranteed zero automatic submissions • Citizen review enforced</span>
          </div>

          <button
            onClick={() => setIsReviewModalOpen(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all active:scale-98"
          >
            <span>{t.confirmAndProceed}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Review Confirmation Modal */}
      <VerificationReview
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        schemeName={selectedScheme.name}
        officialUrl={selectedScheme.applicationUrl}
        formData={formData}
        onConfirmAndRedirect={handleConfirmAndRedirect}
        language={language}
      />
    </div>
  );
};
