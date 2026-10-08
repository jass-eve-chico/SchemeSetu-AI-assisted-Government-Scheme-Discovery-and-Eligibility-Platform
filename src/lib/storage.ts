import { UserProfile, EligibilityResult } from '../types/user';
import { UserDocument } from '../types/document';
import { Application } from '../types/application';
import { Scheme } from '../types/scheme';
import { INITIAL_USER_PROFILE, INITIAL_DOCUMENTS, INITIAL_APPLICATIONS } from '../data/initialData';
import { SCHEMES_DATA } from '../data/schemesData';
import { Language } from '../data/translations';

const STORAGE_KEYS = {
  USER_PROFILE: 'schemesetu_user_profile',
  DOCUMENTS: 'schemesetu_user_documents',
  APPLICATIONS: 'schemesetu_applications',
  SAVED_SCHEMES: 'schemesetu_saved_schemes',
  CUSTOM_SCHEMES: 'schemesetu_custom_schemes',
  ELIGIBILITY_CHECKS: 'schemesetu_eligibility_checks',
  LANGUAGE: 'schemesetu_language',
};

// Safe JSON parse with fallback
function safeGet<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (err) {
    console.error(`Error reading key ${key} from localStorage`, err);
    return fallback;
  }
}

function safeSet<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Error writing key ${key} to localStorage`, err);
  }
}

export const StorageService = {
  // User Profile
  getUserProfile: (): UserProfile => {
    return safeGet<UserProfile>(STORAGE_KEYS.USER_PROFILE, INITIAL_USER_PROFILE);
  },
  saveUserProfile: (profile: UserProfile): void => {
    safeSet(STORAGE_KEYS.USER_PROFILE, profile);
  },

  // Documents
  getDocuments: (): UserDocument[] => {
    return safeGet<UserDocument[]>(STORAGE_KEYS.DOCUMENTS, INITIAL_DOCUMENTS);
  },
  saveDocuments: (docs: UserDocument[]): void => {
    safeSet(STORAGE_KEYS.DOCUMENTS, docs);
  },
  addDocument: (doc: UserDocument): void => {
    const current = StorageService.getDocuments();
    StorageService.saveDocuments([doc, ...current]);
  },
  removeDocument: (id: string): void => {
    const current = StorageService.getDocuments();
    StorageService.saveDocuments(current.filter((d) => d.id !== id));
  },

  // Applications
  getApplications: (): Application[] => {
    return safeGet<Application[]>(STORAGE_KEYS.APPLICATIONS, INITIAL_APPLICATIONS);
  },
  saveApplications: (apps: Application[]): void => {
    safeSet(STORAGE_KEYS.APPLICATIONS, apps);
  },
  addApplication: (app: Application): void => {
    const current = StorageService.getApplications();
    StorageService.saveApplications([app, ...current]);
  },

  // Saved Schemes (Bookmarks)
  getSavedSchemeIds: (): string[] => {
    return safeGet<string[]>(STORAGE_KEYS.SAVED_SCHEMES, ['post-matric-scholarship', 'ayushman-bharat-pmjay']);
  },
  toggleSavedScheme: (schemeId: string): string[] => {
    const current = StorageService.getSavedSchemeIds();
    let updated: string[];
    if (current.includes(schemeId)) {
      updated = current.filter((id) => id !== schemeId);
    } else {
      updated = [...current, schemeId];
    }
    safeSet(STORAGE_KEYS.SAVED_SCHEMES, updated);
    return updated;
  },

  // Schemes (Builtin + Admin Custom)
  getAllSchemes: (): Scheme[] => {
    const custom = safeGet<Scheme[]>(STORAGE_KEYS.CUSTOM_SCHEMES, []);
    return [...custom, ...SCHEMES_DATA];
  },
  saveCustomScheme: (scheme: Scheme): void => {
    const custom = safeGet<Scheme[]>(STORAGE_KEYS.CUSTOM_SCHEMES, []);
    safeSet(STORAGE_KEYS.CUSTOM_SCHEMES, [scheme, ...custom]);
  },
  deleteCustomScheme: (id: string): void => {
    const custom = safeGet<Scheme[]>(STORAGE_KEYS.CUSTOM_SCHEMES, []);
    safeSet(STORAGE_KEYS.CUSTOM_SCHEMES, custom.filter(s => s.id !== id));
  },

  // Eligibility Checks
  getEligibilityChecks: (): EligibilityResult[] => {
    return safeGet<EligibilityResult[]>(STORAGE_KEYS.ELIGIBILITY_CHECKS, []);
  },
  addEligibilityCheck: (result: EligibilityResult): void => {
    const current = StorageService.getEligibilityChecks();
    safeSet(STORAGE_KEYS.ELIGIBILITY_CHECKS, [result, ...current.slice(0, 19)]);
  },

  // Language
  getLanguage: (): Language => {
    try {
      const lang = localStorage.getItem(STORAGE_KEYS.LANGUAGE) as Language;
      return lang === 'hi' ? 'hi' : 'en';
    } catch {
      return 'en';
    }
  },
  setLanguage: (lang: Language): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
    } catch {}
  }
};
