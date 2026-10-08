import { Scheme, SchemeCategory } from '../types/scheme';
import { FilterState } from '../components/discovery/FilterSidebar';
import {
  normalizeCategory,
  normalizeEducation,
  normalizeOccupation,
  cleanText,
  matchValues
} from './normalize';

export interface ExtractedIntent {
  category?: SchemeCategory;
  occupation?: string;
  education?: string;
  income_max?: number;
  state?: string | null;
  age?: number;
  gender?: 'Male' | 'Female';
  keywords: string[];
  rawQuery: string;
  explanation: string;
}

export interface ScoredScheme {
  scheme: Scheme;
  score: number;
  matchReasons: string[];
}

function matchesWordOrPhrase(text: string, term: string): boolean {
  if (term.length <= 4) {
    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`(^|\\s|[^a-zA-Z0-9])${escaped}($|\\s|[^a-zA-Z0-9])`, 'i').test(text);
  }
  return text.includes(term);
}

// Synonyms & Aliases Map for broad intelligent matching
const EDUCATION_SYNONYMS: Record<string, string[]> = {
  'B.Tech': [
    'b.tech', 'b tech', 'b-tech', 'btech', 'engineering', 'b.e', 'b.e.', 'bachelor of technology',
    'technical degree', 'undergraduate technical', 'bachelor of engineering'
  ],
  'Diploma': ['diploma', 'polytechnic'],
  '12th Pass': ['12th', '12 pass', 'intermediate', 'hsc', 'plus two', '+2'],
  '10th Pass': ['10th', '10 pass', 'matric', 'ssc', 'high school'],
  'Graduate': ['graduate', 'graduation', 'degree', 'b.sc', 'bsc', 'b.a', 'b.com', 'bcom', 'undergraduate'],
  'Post Graduate': ['post graduate', 'postgraduate', 'masters', 'm.tech', 'mtech', 'msc', 'mba', 'm.a']
};

const OCCUPATION_SYNONYMS: Record<string, string[]> = {
  'Student': ['student', 'students', 'college', 'school', 'scholar', 'learner', 'chhatra', 'padhai', 'study', 'studying'],
  'Farmer': ['farmer', 'farmers', 'kisan', 'kheti', 'krishi', 'crop', 'agriculture', 'cultivator', 'landholder'],
  'Artisan': ['artisan', 'artisans', 'karigar', 'craft', 'craftsperson', 'carpenter', 'blacksmith', 'tailor', 'weaver', 'potter', 'vishwakarma'],
  'Business Owner': ['business', 'vyapar', 'shop', 'dukan', 'startup', 'entrepreneur', 'self-employed', 'self employed', 'trader', 'vendor', 'msme', 'commercial'],
  'Unemployed': ['unemployed', 'berojgar', 'jobseeker', 'seeking job', 'employment']
};

const CATEGORY_KEYWORDS: Record<SchemeCategory, string[]> = {
  'Education': ['education', 'scholarship', 'scholarships', 'chhatravritti', 'chatravriti', 'fee', 'fees', 'tuition', 'study', 'academic', 'fellowship', 'b.tech', 'b tech', 'b-tech', 'btech', 'student', 'college', 'school'],
  'Agriculture': ['agriculture', 'farmer', 'farmers', 'kisan', 'krishi', 'kheti', 'crop', 'fertilizer', 'irrigation', 'sinchayee', 'fasal', 'farming', 'mandir'],
  'Healthcare': ['healthcare', 'health', 'hospital', 'medical', 'insurance', 'ayushman', 'pmjay', 'treatment', 'ilaj', 'doctor', 'clinic', 'medicine', 'arogya'],
  'Business': ['business', 'loan', 'mudra', 'pmegp', 'enterprise', 'startup', 'vyapar', 'shop', 'msme', 'entrepreneur', 'stand up india', 'credit', 'commercial'],
  'Women': ['women', 'woman', 'mahila', 'girl', 'beti', 'ladki', 'female', 'matru', 'sukanya', 'maternity', 'widow', 'nari'],
  'Senior Citizens': ['senior citizen', 'senior citizens', 'elderly', 'old age', 'vridha', 'bujurg', 'pension', 'retirement', '60', '65', '70'],
  'Housing': ['housing', 'awas', 'makan', 'ghar', 'shelter', 'home loan', 'flat', 'pucca house', 'pmay'],
  'Disability': ['disability', 'divyang', 'divyangjan', 'handicap', 'disabled', 'pwd', 'wheelchair', 'hearing aid', 'assistive device', 'adip', 'udid'],
  'Employment': ['employment', 'jobs', 'rozgar', 'skill', 'training', 'apprenticeship', 'placement', 'vishwakarma', 'pmkvy'],
  'Financial Assistance': ['financial assistance', 'pension', 'dbt', 'direct benefit', 'jan dhan', 'subsidy', 'grant', 'financial'],
  'Skill Development': ['skill', 'training', 'vocational', 'kaushal', 'pmkvy', 'apprentice'],
  'Rural Development': ['rural', 'gramin', 'panchayat', 'village', 'rural development'],
  'Student Welfare': ['student welfare', 'merit', 'scholarship', 'hostel', 'stipend']
};

const INDIAN_STATES = [
  'Haryana', 'Maharashtra', 'Uttar Pradesh', 'Bihar', 'Rajasthan',
  'Karnataka', 'Tamil Nadu', 'Gujarat', 'Delhi', 'Madhya Pradesh',
  'Punjab', 'West Bengal', 'Kerala', 'Telangana', 'Andhra Pradesh',
  'Odisha', 'Assam', 'Jharkhand', 'Chhattisgarh', 'Uttarakhand', 'Himachal Pradesh'
];

/**
 * Extracts structured intent attributes from user query.
 * IMPORTANT: Only returns attributes that were genuinely detected in the user input.
 * No generic fallbacks like "Citizen" or "General Welfare".
 */
export function parseSearchIntent(query: string): ExtractedIntent {
  const cleanQ = query.trim();
  const lower = cleanQ.toLowerCase();
  const keywords: string[] = [];

  let category: SchemeCategory | undefined = undefined;
  let education: string | undefined = undefined;
  let occupation: string | undefined = undefined;
  let income_max: number | undefined = undefined;
  let state: string | null = null;
  let age: number | undefined = undefined;
  let gender: 'Male' | 'Female' | undefined = undefined;

  if (!cleanQ) {
    return {
      keywords: [],
      rawQuery: '',
      explanation: ''
    };
  }

  // 1. Education detection
  for (const [canonicalEdu, synList] of Object.entries(EDUCATION_SYNONYMS)) {
    if (synList.some((syn) => matchesWordOrPhrase(lower, syn))) {
      education = canonicalEdu;
      occupation = 'Student'; // Academic inquiries imply student status
      category = 'Education';
      keywords.push(canonicalEdu);
      break;
    }
  }

  // Explicit student keyword if education was not set
  if (!education && (matchesWordOrPhrase(lower, 'student') || matchesWordOrPhrase(lower, 'college') || matchesWordOrPhrase(lower, 'scholarship') || matchesWordOrPhrase(lower, 'chhatra'))) {
    occupation = 'Student';
    category = 'Education';
    keywords.push('Student');
  }

  // 2. Occupation detection
  for (const [canonicalOcc, synList] of Object.entries(OCCUPATION_SYNONYMS)) {
    if (synList.some((syn) => matchesWordOrPhrase(lower, syn))) {
      occupation = canonicalOcc;
      keywords.push(canonicalOcc);
      if (canonicalOcc === 'Farmer') category = category || 'Agriculture';
      if (canonicalOcc === 'Artisan') category = category || 'Employment';
      if (canonicalOcc === 'Business Owner') category = category || 'Business';
      break;
    }
  }

  // 3. Category detection
  for (const [cat, synList] of Object.entries(CATEGORY_KEYWORDS)) {
    if (synList.some((syn) => matchesWordOrPhrase(lower, syn))) {
      if (!category) {
        category = cat as SchemeCategory;
        keywords.push(cat);
      }
      break;
    }
  }

  // 4. Gender detection
  if (
    matchesWordOrPhrase(lower, 'woman') ||
    matchesWordOrPhrase(lower, 'women') ||
    matchesWordOrPhrase(lower, 'mahila') ||
    matchesWordOrPhrase(lower, 'girl') ||
    matchesWordOrPhrase(lower, 'female') ||
    matchesWordOrPhrase(lower, 'beti') ||
    matchesWordOrPhrase(lower, 'ladki')
  ) {
    gender = 'Female';
    category = category || 'Women';
    keywords.push('Women');
  } else if (matchesWordOrPhrase(lower, 'man') || matchesWordOrPhrase(lower, 'male') || matchesWordOrPhrase(lower, 'purush')) {
    gender = 'Male';
  }

  // 5. Senior citizen / Age detection
  const ageMatch = lower.match(/\b(\d{1,2})\s*(?:years|year|yr|saal|sal|age)\b/) || lower.match(/\bage\s*(?:is|of)?\s*(\d{1,2})\b/);
  if (ageMatch && ageMatch[1]) {
    age = parseInt(ageMatch[1], 10);
    keywords.push(`Age: ${age}`);
    if (age >= 60) category = category || 'Senior Citizens';
  } else if (
    matchesWordOrPhrase(lower, 'senior citizen') ||
    matchesWordOrPhrase(lower, 'senior citizens') ||
    matchesWordOrPhrase(lower, 'elderly') ||
    matchesWordOrPhrase(lower, 'vridha') ||
    matchesWordOrPhrase(lower, 'bujurg') ||
    matchesWordOrPhrase(lower, 'old age')
  ) {
    age = 65;
    category = category || 'Senior Citizens';
    keywords.push('Senior Citizen');
  }

  // 6. Income detection (e.g. "2.5 lakh", "3 lakh", "under 3 lakh", "below 2.5L", "300000")
  const lakhMatch = lower.match(/(\d+(?:\.\d+)?)\s*(?:lakh|lakhs|lac|lacs|l)\b/);
  if (lakhMatch && lakhMatch[1]) {
    income_max = Math.round(parseFloat(lakhMatch[1]) * 100000);
    keywords.push(`Income ≤ ₹${income_max.toLocaleString('en-IN')}`);
  } else {
    const rawNumberMatch = lower.match(/\b([1-9]\d{4,6})\b/);
    if (rawNumberMatch && rawNumberMatch[1]) {
      income_max = parseInt(rawNumberMatch[1], 10);
      keywords.push(`Income ≤ ₹${income_max.toLocaleString('en-IN')}`);
    }
  }

  // 7. State detection
  for (const st of INDIAN_STATES) {
    if (new RegExp(`\\b${st.toLowerCase()}\\b`, 'i').test(lower)) {
      state = st;
      keywords.push(st);
      break;
    }
  }

  // Formulation of clean query explanation showing only detected attributes
  const detectedChips: string[] = [];
  if (category) detectedChips.push(`Category: ${category}`);
  if (education) detectedChips.push(`Education: ${education}`);
  if (occupation) detectedChips.push(`Role: ${occupation}`);
  if (income_max) detectedChips.push(`Max Income: ≤ ₹${(income_max / 100000).toFixed(1)}L`);
  if (state) detectedChips.push(`State: ${state}`);
  if (gender === 'Female') detectedChips.push('Women Specific');
  if (age) detectedChips.push(`Age: ${age}+`);

  const explanation =
    detectedChips.length > 0
      ? `Recognized Intent • ${detectedChips.join(' • ')}`
      : `Broad Search for "${cleanQ}" across central & state schemes`;

  return {
    category,
    occupation,
    education,
    income_max,
    state,
    age,
    gender,
    keywords,
    rawQuery: cleanQ,
    explanation
  };
}

/**
 * Additive Relevance Scoring Engine for a single Scheme
 */
export function scoreScheme(
  scheme: Scheme,
  rawQuery: string,
  intent: ExtractedIntent
): ScoredScheme {
  const cleanQ = rawQuery.trim().toLowerCase();
  if (!cleanQ) {
    return { scheme, score: 0, matchReasons: [] };
  }

  let score = 0;
  const matchReasons: string[] = [];

  const nameLower = scheme.name.toLowerCase();
  const hindiNameLower = scheme.hindiName ? scheme.hindiName.toLowerCase() : '';
  const descLower = `${scheme.shortDescription} ${scheme.detailedDescription}`.toLowerCase();
  const tagsLower = scheme.tags.map((t) => t.toLowerCase());
  const benefitsText = scheme.benefits.join(' ').toLowerCase();

  const queryTokens = cleanQ.split(/\s+/).filter((t) => t.length > 1);

  // 1. EXACT / PHRASE SCHEME NAME MATCH (+40)
  if (nameLower.includes(cleanQ) || (hindiNameLower && hindiNameLower.includes(cleanQ))) {
    score += 40;
    matchReasons.push('Exact scheme name match (+40)');
  } else if (queryTokens.length > 1 && queryTokens.every((token) => nameLower.includes(token))) {
    score += 35;
    matchReasons.push('Full title keywords match (+35)');
  } else {
    // Partial token hits in name
    const tokensInName = queryTokens.filter((token) => nameLower.includes(token));
    if (tokensInName.length > 0) {
      const pts = Math.min(tokensInName.length * 10, 30);
      score += pts;
      matchReasons.push(`Title keywords matched (+${pts})`);
    }
  }

  // 2. CATEGORY MATCH (+25)
  const normSchemeCat = normalizeCategory(scheme.category);
  if (intent.category && normalizeCategory(intent.category) === normSchemeCat) {
    score += 25;
    matchReasons.push(`Category match: ${scheme.category} (+25)`);
  } else {
    // Check if query matches category keywords
    const catKeywords = CATEGORY_KEYWORDS[scheme.category] || [];
    if (catKeywords.some((kw) => matchesWordOrPhrase(cleanQ, kw) || queryTokens.includes(kw))) {
      score += 25;
      matchReasons.push(`Category keyword matched: ${scheme.category} (+25)`);
    }
  }

  // 3. BENEFICIARY / OCCUPATION PROFILE MATCH (+25)
  if (intent.occupation) {
    const normOcc = normalizeOccupation(intent.occupation);
    const occCrit = scheme.eligibilityCriteria.find((c) => c.field === 'occupation');
    const studentCrit = scheme.eligibilityCriteria.find((c) => c.field === 'student_status');

    let occMatched = false;
    if (normOcc === 'Student' && (studentCrit?.value === true || scheme.category === 'Education' || scheme.category === 'Student Welfare')) {
      occMatched = true;
    } else if (occCrit) {
      if (Array.isArray(occCrit.value)) {
        occMatched = occCrit.value.some((v) => matchValues(v, normOcc));
      } else {
        occMatched = matchValues(occCrit.value, normOcc);
      }
    } else if (scheme.occupations && scheme.occupations.some((o) => matchValues(o, normOcc))) {
      occMatched = true;
    } else if (tagsLower.some((t) => matchValues(t, normOcc))) {
      occMatched = true;
    }

    if (occMatched) {
      score += 25;
      matchReasons.push(`Beneficiary / Role matched: ${intent.occupation} (+25)`);
    }
  }

  // 4. EDUCATION LEVEL MATCH (+25)
  if (intent.education) {
    const normEdu = normalizeEducation(intent.education);
    const eduCrit = scheme.eligibilityCriteria.find((c) => c.field === 'education');

    let eduMatched = false;
    if (eduCrit) {
      if (Array.isArray(eduCrit.value)) {
        eduMatched = eduCrit.value.some((v) => matchValues(v, normEdu));
      } else {
        eduMatched = matchValues(eduCrit.value, normEdu);
      }
    } else if (scheme.educationLevels && scheme.educationLevels.some((e) => matchValues(e, normEdu))) {
      eduMatched = true;
    } else if (tagsLower.some((t) => matchValues(t, normEdu))) {
      eduMatched = true;
    } else if (
      (normEdu === 'B.Tech' || normEdu === 'Graduate') &&
      (scheme.category === 'Education' || tagsLower.includes('scholarship') || tagsLower.includes('b.tech'))
    ) {
      eduMatched = true;
    }

    if (eduMatched) {
      score += 25;
      matchReasons.push(`Education level matched: ${intent.education} (+25)`);
    }
  }

  // 5. KEYWORD / TAG MATCH (+15 to +30)
  const matchingTags = tagsLower.filter((tag) => {
    return (
      cleanQ.includes(tag) ||
      tag.includes(cleanQ) ||
      queryTokens.some((tok) => tag.includes(tok) || tok.includes(tag))
    );
  });

  if (matchingTags.length > 0) {
    const tagPoints = matchingTags.length >= 2 ? 25 : 15;
    score += tagPoints;
    matchReasons.push(`Tags matched: ${matchingTags.slice(0, 3).join(', ')} (+${tagPoints})`);
  }

  // 6. DESCRIPTION / BENEFITS MATCH (+10)
  if (descLower.includes(cleanQ) || benefitsText.includes(cleanQ)) {
    score += 10;
    matchReasons.push('Description or benefits match (+10)');
  } else {
    const descMatches = queryTokens.filter((token) => descLower.includes(token) || benefitsText.includes(token));
    if (descMatches.length >= 2) {
      score += 10;
      matchReasons.push('Multiple query keywords matched in description (+10)');
    } else if (descMatches.length === 1) {
      score += 5;
    }
  }

  // 7. SPECIFIC STATE MATCH BOOST (+15)
  if (intent.state) {
    if (scheme.state && scheme.state.toLowerCase() === intent.state.toLowerCase()) {
      score += 15;
      matchReasons.push(`State specific match: ${intent.state} (+15)`);
    } else if (scheme.level === 'Central') {
      score += 5; // Central schemes apply across states
    }
  }

  // 8. GENDER MATCH BOOST (+15)
  if (intent.gender === 'Female') {
    const genderCrit = scheme.eligibilityCriteria.find((c) => c.field === 'gender');
    if (scheme.category === 'Women' || (genderCrit && genderCrit.value === 'Female') || tagsLower.includes('women') || tagsLower.includes('girl')) {
      score += 15;
      matchReasons.push('Women-focused initiative match (+15)');
    }
  }

  return { scheme, score, matchReasons };
}

/**
 * Evaluates whether a scheme satisfies manual sidebar filters.
 * Note: If a scheme has no restriction on a field, it remains accessible.
 */
export function matchesManualFilters(scheme: Scheme, filters: FilterState): boolean {
  // 1. Category Filter
  if (filters.category && filters.category !== 'All') {
    const targetCat = normalizeCategory(filters.category);
    const schemeCat = normalizeCategory(scheme.category);
    if (schemeCat !== targetCat && !scheme.tags.some((t) => normalizeCategory(t) === targetCat)) {
      return false;
    }
  }

  // 2. Government Level Filter
  if (filters.level && filters.level !== 'All') {
    if (scheme.level !== filters.level) {
      return false;
    }
  }

  // 3. Education Filter
  if (filters.education && filters.education !== 'All') {
    const normEdu = normalizeEducation(filters.education);
    const crit = scheme.eligibilityCriteria.find((c) => c.field === 'education');
    if (crit) {
      if (Array.isArray(crit.value)) {
        if (!crit.value.some((val) => matchValues(val, normEdu))) return false;
      } else if (!matchValues(crit.value, normEdu)) {
        return false;
      }
    }
  }

  // 4. Occupation Filter
  if (filters.occupation && filters.occupation !== 'All') {
    const normOcc = normalizeOccupation(filters.occupation);
    const crit = scheme.eligibilityCriteria.find((c) => c.field === 'occupation');
    if (crit) {
      if (Array.isArray(crit.value)) {
        if (!crit.value.some((val) => matchValues(val, normOcc))) return false;
      } else if (!matchValues(crit.value, normOcc)) {
        return false;
      }
    }
  }

  // 5. Max Income Filter
  if (filters.maxIncome && filters.maxIncome < 1000000) {
    const crit = scheme.eligibilityCriteria.find((c) => c.field === 'income');
    if (crit && filters.maxIncome > crit.value) {
      return false;
    }
  }

  return true;
}

/**
 * Main Search and Filter Pipeline
 * Returns ranked schemes with additive relevance scoring and manual filter intersections.
 */
export function searchAndFilterSchemes(
  schemes: Scheme[],
  searchQuery: string,
  filters: FilterState
): {
  results: ScoredScheme[];
  intent: ExtractedIntent;
  totalBeforeFilters: number;
} {
  const cleanQ = searchQuery.trim();
  const intent = parseSearchIntent(cleanQ);

  if (!cleanQ) {
    // No search query: score = 0, apply manual filters directly
    const filtered = schemes.filter((s) => matchesManualFilters(s, filters));
    return {
      results: filtered.map((scheme) => ({ scheme, score: 0, matchReasons: [] })),
      intent,
      totalBeforeFilters: schemes.length
    };
  }

  // Calculate additive relevance score for every scheme
  const scoredAll = schemes.map((s) => scoreScheme(s, cleanQ, intent));

  // Only keep schemes with score > 0
  const relevantSchemes = scoredAll.filter((item) => item.score > 0);

  // Apply manual sidebar filters on top of scored relevant schemes
  const filteredAndScored = relevantSchemes.filter((item) =>
    matchesManualFilters(item.scheme, filters)
  );

  // Sort descending by relevance score, tiebreaking by isFeatured and scheme name
  filteredAndScored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    if (b.scheme.isFeatured && !a.scheme.isFeatured) return 1;
    if (!b.scheme.isFeatured && a.scheme.isFeatured) return -1;
    return a.scheme.name.localeCompare(b.scheme.name);
  });

  return {
    results: filteredAndScored,
    intent,
    totalBeforeFilters: relevantSchemes.length
  };
}
