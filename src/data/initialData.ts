import { UserProfile } from '../types/user';
import { UserDocument } from '../types/document';
import { Application } from '../types/application';

export const INITIAL_USER_PROFILE: UserProfile = {
  name: 'Rahul Sharma',
  email: 'rahul.sharma@example.edu.in',
  phone: '+91 98765 43210',
  age: 20,
  gender: 'Male',
  state: 'Maharashtra',
  district: 'Pune',
  education: 'B.Tech',
  isStudent: true,
  occupation: 'Student',
  annualFamilyIncome: 240000, // ₹2,40,000 (< 3 Lakh)
  socialCategory: 'OBC',
  isDifferentlyAbled: false,
};

export const INITIAL_DOCUMENTS: UserDocument[] = [
  {
    id: 'doc-aadhaar-01',
    name: 'Aadhaar_Card_Rahul.pdf',
    type: 'Aadhaar',
    fileSize: '1.2 MB',
    uploadedAt: '2025-02-15',
    documentNumber: 'XXXX-XXXX-4921',
    isVerified: true,
    status: 'Valid',
    extractedFields: [
      { label: 'Full Name', value: 'Rahul Sharma', confidence: 0.99 },
      { label: 'Date of Birth', value: '14/08/2004', confidence: 0.98 },
      { label: 'Gender', value: 'Male', confidence: 0.99 },
      { label: 'UID Last 4', value: '4921', confidence: 0.99 },
      { label: 'Address State', value: 'Maharashtra', confidence: 0.97 }
    ]
  },
  {
    id: 'doc-income-01',
    name: 'Tahsildar_Income_Certificate_2024.pdf',
    type: 'Income Certificate',
    fileSize: '950 KB',
    uploadedAt: '2025-02-18',
    issueDate: '2024-05-10',
    expiryDate: '2027-03-31',
    documentNumber: 'INC/MH/2024/77812',
    isVerified: true,
    status: 'Valid',
    extractedFields: [
      { label: 'Certificate Holder', value: 'Suresh Sharma (Father)', confidence: 0.98 },
      { label: 'Annual Income', value: '₹2,40,000 (Two Lakh Forty Thousand Only)', confidence: 0.99 },
      { label: 'Issuing Authority', value: 'Office of Tahsildar, Haveli, Pune', confidence: 0.96 },
      { label: 'Validity Period', value: '3 Financial Years (Till March 2027)', confidence: 0.95 }
    ]
  },
  {
    id: 'doc-marksheet-01',
    name: 'Class_12th_HSC_Marksheet.pdf',
    type: 'Marksheet',
    fileSize: '1.8 MB',
    uploadedAt: '2025-02-10',
    documentNumber: 'HSC/2022/99410',
    isVerified: true,
    status: 'Valid',
    extractedFields: [
      { label: 'Student Name', value: 'Rahul Suresh Sharma', confidence: 0.99 },
      { label: 'Exam Board', value: 'Maharashtra State Board of Secondary and Higher Secondary', confidence: 0.97 },
      { label: 'Percentage', value: '84.6%', confidence: 0.99 },
      { label: 'Result Status', value: 'First Class with Distinction', confidence: 0.99 }
    ]
  }
];

export const INITIAL_APPLICATIONS: Application[] = [
  {
    id: 'app-nsp-01',
    schemeId: 'post-matric-scholarship',
    schemeName: 'Post Matric Scholarship for Technical & Higher Education',
    category: 'Education',
    applicationNumber: 'NSP-2025-88392',
    applicantName: 'Rahul Sharma',
    appliedDate: '2025-02-20',
    lastUpdated: '2025-02-28',
    status: 'Under Review',
    currentStage: 'Institute Nodal Officer Verification',
    nextStep: 'State Welfare Officer scrutiny scheduled within 7 working days',
    timeline: [
      { title: 'Application Submitted Online', date: '20 Feb 2025', description: 'Application registered with Aadhaar e-KYC', completed: true },
      { title: 'DigiLocker Document Verification', date: '22 Feb 2025', description: 'Income and 12th marksheet verified automatically', completed: true },
      { title: 'College Nodal Verification', date: 'In Progress', description: 'Institutional bonafide under review by Dean Office', completed: false },
      { title: 'State Welfare Sanction & DBT', date: 'Pending', description: 'Direct bank transfer of ₹65,000 post approval', completed: false }
    ],
    formData: {
      course: 'B.Tech Computer Science & Engineering',
      institution: 'College of Engineering Pune (COEP)',
      academicYear: '2nd Year',
      familyIncome: '₹2,40,000'
    },
    attachedDocumentIds: ['doc-aadhaar-01', 'doc-income-01', 'doc-marksheet-01'],
    officialPortalUrl: 'https://scholarships.gov.in'
  },
  {
    id: 'app-cert-02',
    schemeId: 'pm-jan-dhan-yojana',
    schemeName: 'Pradhan Mantri Jan Dhan Yojana (DBT Seeded Account)',
    category: 'Financial Assistance',
    applicationNumber: 'SBI-JD-449102',
    applicantName: 'Rahul Sharma',
    appliedDate: '2024-11-12',
    lastUpdated: '2024-11-16',
    status: 'Approved',
    currentStage: 'Account Active & NPCI Mapped',
    nextStep: 'RuPay card issued with ₹2L accidental insurance',
    timeline: [
      { title: 'e-KYC Submission', date: '12 Nov 2024', description: 'Biometric Aadhaar authentication at SBI branch', completed: true },
      { title: 'Account Opened', date: '14 Nov 2024', description: 'Zero balance savings account activated', completed: true },
      { title: 'NPCI DBT Seeding', date: '16 Nov 2024', description: 'Successfully mapped for direct government scholarship disbursement', completed: true }
    ],
    formData: {
      accountType: 'BSBDA Zero Balance',
      branch: 'Shivajinagar, Pune'
    },
    attachedDocumentIds: ['doc-aadhaar-01'],
    officialPortalUrl: 'https://pmjdy.gov.in'
  }
];
