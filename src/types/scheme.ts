export type SchemeCategory =
  | 'Education'
  | 'Employment'
  | 'Agriculture'
  | 'Healthcare'
  | 'Housing'
  | 'Women'
  | 'Disability'
  | 'Business'
  | 'Financial Assistance'
  | 'Skill Development'
  | 'Senior Citizens'
  | 'Rural Development'
  | 'Student Welfare';

export type GovernmentType = 'Central' | 'State';

export interface EligibilityCriterion {
  id: string;
  field: 'age' | 'income' | 'education' | 'occupation' | 'gender' | 'category' | 'state' | 'disability' | 'student_status';
  label: string;
  operator: 'lte' | 'gte' | 'eq' | 'in' | 'boolean';
  value: any;
  description: string;
}

export interface DocumentRequirement {
  id: string;
  name: string;
  type: string;
  isMandatory: boolean;
  purpose: string;
}

export interface Scheme {
  id: string;
  name: string;
  hindiName?: string;
  category: SchemeCategory;
  level: GovernmentType;
  state?: string; // null or specific state
  ministry: string;
  shortDescription: string;
  detailedDescription: string;
  benefits: string[];
  eligibilitySummary: string[];
  eligibilityCriteria: EligibilityCriterion[];
  requiredDocuments: DocumentRequirement[];
  applicationProcess: {
    step: number;
    title: string;
    description: string;
  }[];
  importantConditions: string[];
  officialSourceUrl: string;
  applicationUrl: string;
  tags: string[];
  beneficiaryTypes?: string[];
  educationLevels?: string[];
  occupations?: string[];
  matchScore?: number; // Calculated dynamic match percentage
  matchReasons?: string[];
  isFeatured?: boolean;
}
