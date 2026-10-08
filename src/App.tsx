import React, { useState, useEffect } from 'react';
import { Navbar, ActiveTab } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ToastContainer, ToastMessage } from './components/common/Toast';
import { Hero } from './components/home/Hero';
import { CategoryGrid } from './components/home/CategoryGrid';
import { FeaturedSchemes } from './components/home/FeaturedSchemes';
import { HowItWorks } from './components/home/HowItWorks';
import { TrustBanner } from './components/home/TrustBanner';
import { SchemeDiscovery } from './components/discovery/SchemeDiscovery';
import { SchemeDetailsModal } from './components/discovery/SchemeDetailsModal';
import { EligibilityCheckerModal } from './components/eligibility/EligibilityCheckerModal';
import { DocumentVault } from './components/documents/DocumentVault';
import { FormAssistant } from './components/form_assistant/FormAssistant';
import { ApplicationTracker } from './components/tracker/ApplicationTracker';
import { UserDashboard } from './components/dashboard/UserDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { Scheme, SchemeCategory } from './types/scheme';
import { UserProfile } from './types/user';
import { UserDocument } from './types/document';
import { Application } from './types/application';
import { StorageService } from './lib/storage';
import { Language } from './data/translations';

export const App: React.FC = () => {
  // Navigation State
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [language, setLanguage] = useState<Language>(StorageService.getLanguage());

  // Data Store
  const [schemes, setSchemes] = useState<Scheme[]>(StorageService.getAllSchemes());
  const [userProfile, setUserProfile] = useState<UserProfile>(StorageService.getUserProfile());
  const [userDocuments, setUserDocuments] = useState<UserDocument[]>(StorageService.getDocuments());
  const [applications, setApplications] = useState<Application[]>(StorageService.getApplications());
  const [savedSchemeIds, setSavedSchemeIds] = useState<string[]>(StorageService.getSavedSchemeIds());

  // Active Search Query for Discovery
  const [discoveryQuery, setDiscoveryQuery] = useState('');
  const [discoveryCategory, setDiscoveryCategory] = useState<SchemeCategory | 'All'>('All');

  // Modals & Drawers
  const [selectedSchemeForDetails, setSelectedSchemeForDetails] = useState<Scheme | null>(null);
  const [selectedSchemeForEligibility, setSelectedSchemeForEligibility] = useState<Scheme | null>(null);

  // Toast feedback
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (type: 'success' | 'error' | 'info', message: string) => {
    const id = `toast-${Date.now()}`;
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    StorageService.setLanguage(newLang);
    showToast('info', newLang === 'hi' ? 'भाषा हिन्दी में बदल दी गई है' : 'Language changed to English');
  };

  const handleHeroSearch = (query: string) => {
    setDiscoveryQuery(query);
    setActiveTab('discover');
  };

  const handleCategorySelect = (category: SchemeCategory) => {
    setDiscoveryCategory(category);
    setActiveTab('discover');
  };

  const handleToggleSaveScheme = (schemeId: string) => {
    const updated = StorageService.toggleSavedScheme(schemeId);
    setSavedSchemeIds(updated);
    const isSaved = updated.includes(schemeId);
    showToast('success', isSaved ? 'Scheme saved to your Dashboard' : 'Scheme removed from saved list');
  };

  const handleAddDocument = (newDoc: UserDocument) => {
    StorageService.addDocument(newDoc);
    setUserDocuments(StorageService.getDocuments());
    showToast('success', `Document "${newDoc.name}" uploaded and verified via OCR!`);
  };

  const handleRemoveDocument = (id: string) => {
    StorageService.removeDocument(id);
    setUserDocuments(StorageService.getDocuments());
    showToast('info', 'Document removed from vault');
  };

  const handleCreateApplication = (newApp: Application) => {
    StorageService.addApplication(newApp);
    setApplications(StorageService.getApplications());
    showToast('success', `Application ${newApp.applicationNumber} recorded in My Applications`);
    setActiveTab('tracker');
  };

  const handleAddScheme = (scheme: Scheme) => {
    StorageService.saveCustomScheme(scheme);
    setSchemes(StorageService.getAllSchemes());
    showToast('success', `Scheme "${scheme.name}" added to public catalog!`);
  };

  const handleDeleteScheme = (id: string) => {
    StorageService.deleteCustomScheme(id);
    setSchemes(StorageService.getAllSchemes());
    showToast('info', 'Scheme deleted from catalog');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      {/* Toast Notification Layer */}
      <ToastContainer
        toasts={toasts}
        onDismiss={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))}
      />

      {/* Main Sticky Navbar */}
      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        language={language}
        onLanguageChange={handleLanguageChange}
        onOpenSearch={() => {
          setActiveTab('discover');
        }}
        savedCount={savedSchemeIds.length}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* VIEW: HOME */}
        {activeTab === 'home' && (
          <div>
            <Hero
              language={language}
              onSearch={handleHeroSearch}
              onSelectQuery={handleHeroSearch}
              onOpenEligibility={() => {
                setSelectedSchemeForEligibility(schemes[0]);
              }}
            />

            <CategoryGrid
              language={language}
              onSelectCategory={handleCategorySelect}
            />

            <FeaturedSchemes
              schemes={schemes}
              language={language}
              onViewDetails={setSelectedSchemeForDetails}
              onCheckEligibility={setSelectedSchemeForEligibility}
              onExploreAll={() => setActiveTab('discover')}
              savedSchemeIds={savedSchemeIds}
              onToggleSave={handleToggleSaveScheme}
            />

            <HowItWorks language={language} />

            <TrustBanner language={language} />
          </div>
        )}

        {/* VIEW: SCHEME DISCOVERY */}
        {activeTab === 'discover' && (
          <SchemeDiscovery
            schemes={schemes}
            language={language}
            onCheckEligibility={setSelectedSchemeForEligibility}
            savedSchemeIds={savedSchemeIds}
            onToggleSave={handleToggleSaveScheme}
            initialQuery={discoveryQuery}
            initialCategory={discoveryCategory}
          />
        )}

        {/* VIEW: ELIGIBILITY CHECKER */}
        {activeTab === 'eligibility' && (
          <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-extrabold text-slate-900">Interactive Eligibility Assessment</h2>
              <p className="text-slate-600 mt-2">Select any scheme below to evaluate your criteria breakdown</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {schemes.map((s) => (
                <div
                  key={s.id}
                  onClick={() => setSelectedSchemeForEligibility(s)}
                  className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-emerald-500 hover:shadow-md cursor-pointer transition-all"
                >
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 mb-2 inline-block">
                    {s.category}
                  </span>
                  <h4 className="font-bold text-slate-900 mb-1">{s.name}</h4>
                  <p className="text-xs text-slate-500 line-clamp-2">{s.shortDescription}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW: DOCUMENT VAULT */}
        {activeTab === 'documents' && (
          <DocumentVault
            documents={userDocuments}
            onAddDocument={handleAddDocument}
            onRemoveDocument={handleRemoveDocument}
            language={language}
          />
        )}

        {/* VIEW: FORM ASSISTANT */}
        {activeTab === 'form_assistant' && (
          <FormAssistant
            schemes={schemes}
            userDocuments={userDocuments}
            onApplicationCreated={handleCreateApplication}
            language={language}
          />
        )}

        {/* VIEW: APPLICATION TRACKER */}
        {activeTab === 'tracker' && (
          <ApplicationTracker
            applications={applications}
            language={language}
            onExploreSchemes={() => setActiveTab('discover')}
          />
        )}

        {/* VIEW: USER DASHBOARD */}
        {activeTab === 'dashboard' && (
          <UserDashboard
            schemes={schemes}
            userProfile={userProfile}
            onUpdateProfile={(p) => {
              setUserProfile(p);
              StorageService.saveUserProfile(p);
              showToast('success', 'Profile updated successfully!');
            }}
            savedSchemeIds={savedSchemeIds}
            onToggleSave={handleToggleSaveScheme}
            userDocuments={userDocuments}
            applications={applications}
            onViewDetails={setSelectedSchemeForDetails}
            onCheckEligibility={setSelectedSchemeForEligibility}
            language={language}
          />
        )}

        {/* VIEW: ADMIN DASHBOARD */}
        {activeTab === 'admin' && (
          <AdminDashboard
            schemes={schemes}
            onAddScheme={handleAddScheme}
            onDeleteScheme={handleDeleteScheme}
            language={language}
          />
        )}
      </main>

      {/* Global Details Modal */}
      <SchemeDetailsModal
        scheme={selectedSchemeForDetails}
        isOpen={Boolean(selectedSchemeForDetails)}
        onClose={() => setSelectedSchemeForDetails(null)}
        language={language}
        onCheckEligibility={setSelectedSchemeForEligibility}
      />

      {/* Global Eligibility Checker Modal */}
      <EligibilityCheckerModal
        scheme={selectedSchemeForEligibility}
        isOpen={Boolean(selectedSchemeForEligibility)}
        onClose={() => setSelectedSchemeForEligibility(null)}
        language={language}
        onOpenDocuments={() => setActiveTab('documents')}
        onOpenFormAssistant={() => setActiveTab('form_assistant')}
      />


      {/* Footer */}
      <Footer
        language={language}
        onCategorySelect={(cat) => {
          setDiscoveryCategory(cat as SchemeCategory);
          setActiveTab('discover');
        }}
      />
    </div>
  );
};

export default App;
