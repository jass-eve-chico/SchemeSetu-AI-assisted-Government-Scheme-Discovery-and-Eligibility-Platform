/**
 * Data Normalization & Alias Resolver Utility for SchemeSetu
 * Ensures consistent matching between user inputs, filter states, and scheme metadata.
 */

export const CATEGORY_ALIASES: Record<string, string> = {
  education: 'Education',
  scholarship: 'Education',
  scholarships: 'Education',
  student: 'Education',
  students: 'Education',
  study: 'Education',
  college: 'Education',
  agriculture: 'Agriculture',
  kisan: 'Agriculture',
  farmer: 'Agriculture',
  farming: 'Agriculture',
  krishi: 'Agriculture',
  crop: 'Agriculture',
  healthcare: 'Healthcare',
  health: 'Healthcare',
  medical: 'Healthcare',
  hospital: 'Healthcare',
  ayushman: 'Healthcare',
  employment: 'Employment',
  jobs: 'Employment',
  rozaar: 'Employment',
  skill: 'Employment',
  training: 'Employment',
  business: 'Business',
  msme: 'Business',
  startup: 'Business',
  enterprise: 'Business',
  loan: 'Business',
  mudra: 'Business',
  women: 'Women',
  woman: 'Women',
  mahila: 'Women',
  girl: 'Women',
  female: 'Women',
  housing: 'Housing',
  awas: 'Housing',
  shelter: 'Housing',
  home: 'Housing',
  disability: 'Disability',
  divyang: 'Disability',
  pwd: 'Disability',
  handicapped: 'Disability',
  'financial assistance': 'Financial Assistance',
  finance: 'Financial Assistance',
  pension: 'Financial Assistance',
  dbt: 'Financial Assistance',
  'senior citizens': 'Senior Citizens',
  senior: 'Senior Citizens',
  elderly: 'Senior Citizens',
  vriddha: 'Senior Citizens',
  'rural development': 'Rural Development',
  rural: 'Rural Development',
  gramin: 'Rural Development'
};

export const EDUCATION_ALIASES: Record<string, string> = {
  'b.tech': 'B.Tech',
  btech: 'B.Tech',
  engineering: 'B.Tech',
  'b.e.': 'B.Tech',
  'bachelor of technology': 'B.Tech',
  'b.tech / technical degree': 'B.Tech',
  diploma: 'Diploma',
  polytechnic: 'Diploma',
  '12th': '12th Pass',
  '12th pass': '12th Pass',
  intermediate: '12th Pass',
  hsc: '12th Pass',
  '10th': '10th Pass',
  '10th pass': '10th Pass',
  matric: '10th Pass',
  ssc: '10th Pass',
  graduate: 'Graduate',
  graduation: 'Graduate',
  degree: 'Graduate',
  'b.a.': 'Graduate',
  'b.sc': 'Graduate',
  'b.com': 'Graduate',
  'post graduate': 'Post Graduate',
  postgraduate: 'Post Graduate',
  masters: 'Post Graduate',
  'm.tech': 'Post Graduate',
  msc: 'Post Graduate',
  mba: 'Post Graduate',
  doctorate: 'Doctorate',
  phd: 'Doctorate',
  'below 10th': 'Below 10th',
  primary: 'Below 10th',
  middle: 'Below 10th'
};

export const OCCUPATION_ALIASES: Record<string, string> = {
  student: 'Student',
  studying: 'Student',
  scholar: 'Student',
  learner: 'Student',
  farmer: 'Farmer',
  kisan: 'Farmer',
  cultivator: 'Farmer',
  agriculturist: 'Farmer',
  artisan: 'Artisan',
  craftsperson: 'Artisan',
  karigar: 'Artisan',
  weaver: 'Artisan',
  carpenter: 'Artisan',
  'business owner': 'Business Owner',
  businessman: 'Business Owner',
  businesswoman: 'Business Owner',
  entrepreneur: 'Business Owner',
  shopkeeper: 'Business Owner',
  trader: 'Business Owner',
  vendor: 'Business Owner',
  'self employed': 'Self Employed',
  freelancer: 'Self Employed',
  unemployed: 'Unemployed',
  jobseeker: 'Unemployed',
  homemaker: 'Homemaker',
  housewife: 'Homemaker',
  salaried: 'Salaried',
  employee: 'Salaried'
};

/**
 * Normalizes text to lowercase trimmed string
 */
export function cleanText(input?: string | null): string {
  if (!input) return '';
  return input.trim().toLowerCase();
}

/**
 * Resolves category string to canonical form
 */
export function normalizeCategory(category?: string | null): string {
  if (!category || category === 'All') return 'All';
  const clean = cleanText(category);
  return CATEGORY_ALIASES[clean] || category.trim();
}

/**
 * Resolves education string to canonical form
 */
export function normalizeEducation(education?: string | null): string {
  if (!education || education === 'All') return 'All';
  const clean = cleanText(education);
  return EDUCATION_ALIASES[clean] || education.trim();
}

/**
 * Resolves occupation string to canonical form
 */
export function normalizeOccupation(occupation?: string | null): string {
  if (!occupation || occupation === 'All') return 'All';
  const clean = cleanText(occupation);
  return OCCUPATION_ALIASES[clean] || occupation.trim();
}

/**
 * Compares two values for equality with case-insensitivity & aliases
 */
export function matchValues(valA: any, valB: any): boolean {
  if (valA === valB) return true;
  if (!valA || !valB) return false;

  const aStr = String(valA).trim().toLowerCase();
  const bStr = String(valB).trim().toLowerCase();

  if (aStr === bStr) return true;

  // Check alias maps
  if (CATEGORY_ALIASES[aStr] && CATEGORY_ALIASES[aStr] === CATEGORY_ALIASES[bStr]) return true;
  if (EDUCATION_ALIASES[aStr] && EDUCATION_ALIASES[aStr] === EDUCATION_ALIASES[bStr]) return true;
  if (OCCUPATION_ALIASES[aStr] && OCCUPATION_ALIASES[aStr] === OCCUPATION_ALIASES[bStr]) return true;

  return false;
}
