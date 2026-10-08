export type DocumentType =
  | 'Aadhaar'
  | 'Income Certificate'
  | 'Marksheet'
  | 'Domicile Certificate'
  | 'Caste Certificate'
  | 'Bank Document'
  | 'Disability Certificate'
  | 'Ration Card'
  | 'College Bonafide'
  | 'Other';

export interface ExtractedField {
  label: string;
  value: string;
  confidence: number;
}

export interface UserDocument {
  id: string;
  name: string;
  type: DocumentType;
  fileUrl?: string;
  fileSize?: string;
  uploadedAt: string;
  issueDate?: string;
  expiryDate?: string;
  isVerified: boolean;
  documentNumber?: string;
  extractedFields: ExtractedField[];
  missingFieldsWarning?: string[];
  status: 'Valid' | 'Needs Review' | 'Expired';
}
