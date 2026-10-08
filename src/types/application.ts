export type ApplicationStatus =
  | 'Draft'
  | 'Submitted'
  | 'Under Review'
  | 'Documents Verified'
  | 'Approved'
  | 'Action Required'
  | 'Disbursed';

export interface TimelineEvent {
  title: string;
  date: string;
  description: string;
  completed: boolean;
}

export interface Application {
  id: string;
  schemeId: string;
  schemeName: string;
  category: string;
  applicationNumber: string;
  applicantName: string;
  appliedDate: string;
  lastUpdated: string;
  status: ApplicationStatus;
  currentStage: string;
  nextStep: string;
  timeline: TimelineEvent[];
  formData: Record<string, any>;
  attachedDocumentIds: string[];
  officialPortalUrl?: string;
  remarks?: string;
}
