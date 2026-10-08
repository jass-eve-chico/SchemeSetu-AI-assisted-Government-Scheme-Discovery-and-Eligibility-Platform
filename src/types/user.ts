export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other' | 'Prefer not to say';
  state: string;
  district: string;
  education: '10th Pass' | '12th Pass' | 'Diploma' | 'B.Tech' | 'Graduate' | 'Post Graduate' | 'Doctorate' | 'Below 10th';
  isStudent: boolean;
  occupation: 'Student' | 'Farmer' | 'Artisan' | 'Salaried' | 'Self Employed' | 'Unemployed' | 'Business Owner';
  annualFamilyIncome: number; // in INR
  socialCategory: 'General' | 'OBC' | 'SC' | 'ST' | 'EWS';
  isDifferentlyAbled: boolean;
  disabilityPercentage?: number;
  maritalStatus?: 'Single' | 'Married' | 'Widowed' | 'Divorced';
  landHoldingAcres?: number;
}

export interface EligibilityResult {
  schemeId: string;
  schemeName: string;
  isEligible: boolean;
  overallStatus: 'Potentially Eligible' | 'Needs Verification' | 'Likely Ineligible';
  matchScore: number; // e.g. 95%
  breakdown: {
    criterionId: string;
    label: string;
    userValue: any;
    requiredValue: any;
    status: 'matched' | 'unmatched' | 'needs_verification' | 'not_applicable';
    reason: string;
  }[];
  checkedAt: string;
}
