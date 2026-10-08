import { Scheme } from '../types/scheme';

export const SCHEMES_DATA: Scheme[] = [
  {
    "id": "post-matric-scholarship",
    "name": "Post Matric Scholarship for Technical & Higher Education",
    "hindiName": "तकनीकी एवं उच्च शिक्षा के लिए पोस्ट मैट्रिक छात्रवृत्ति",
    "category": "Education",
    "level": "Central",
    "ministry": "Ministry of Social Justice and Empowerment / MoE",
    "shortDescription": "Financial assistance for students pursuing higher education (including B.Tech, Diploma, Degree) from low-income families.",
    "detailedDescription": "The Post Matric Scholarship scheme provides financial support to meritorious students from economically weaker sections, SC/ST, and OBC categories to pursue post-secondary or higher education. It covers tuition fees, living maintenance allowance, and academic study expenses.",
    "benefits": [
      "Full or subsidized tuition fee reimbursement up to ₹1,20,000/year",
      "Monthly maintenance allowance of ₹1,200 to ₹1,500",
      "One-time book and equipment grant for professional courses (B.Tech/MBBS)",
      "Direct Benefit Transfer (DBT) into Aadhaar-linked bank account"
    ],
    "eligibilitySummary": [
      "Must be enrolled in recognized post-matriculation or degree course (e.g. B.Tech, B.Sc, Diploma)",
      "Family annual income must be below ₹3,00,000 (up to ₹2.5L - ₹3L depending on category)",
      "Minimum 50% marks in the preceding qualifying examination",
      "Indian citizen with verified domicile"
    ],
    "eligibilityCriteria": [
      {
        "id": "pms-income",
        "field": "income",
        "label": "Annual Family Income",
        "operator": "lte",
        "value": 300000,
        "description": "Family income must not exceed ₹3,00,000 per annum."
      },
      {
        "id": "pms-student",
        "field": "student_status",
        "label": "Student Status",
        "operator": "boolean",
        "value": true,
        "description": "Must currently be a regular student enrolled in an accredited institution."
      },
      {
        "id": "pms-education",
        "field": "education",
        "label": "Education Level",
        "operator": "in",
        "value": [
          "B.Tech",
          "Diploma",
          "Graduate",
          "Post Graduate"
        ],
        "description": "Must be pursuing higher technical, undergraduate or postgraduate degree."
      }
    ],
    "requiredDocuments": [
      {
        "id": "doc-aadhaar",
        "name": "Aadhaar Card",
        "type": "Aadhaar",
        "isMandatory": true,
        "purpose": "Identity and DBT linkage"
      },
      {
        "id": "doc-income",
        "name": "Family Income Certificate",
        "type": "Income Certificate",
        "isMandatory": true,
        "purpose": "Income eligibility verification"
      },
      {
        "id": "doc-marksheet",
        "name": "Previous Year Marksheet (12th / Semester)",
        "type": "Marksheet",
        "isMandatory": true,
        "purpose": "Academic merit proof"
      },
      {
        "id": "doc-bonafide",
        "name": "College Bonafide & Fee Receipt",
        "type": "College Bonafide",
        "isMandatory": true,
        "purpose": "Proof of regular enrollment"
      },
      {
        "id": "doc-bank",
        "name": "Bank Passbook / Cancelled Cheque",
        "type": "Bank Document",
        "isMandatory": true,
        "purpose": "DBT bank verification"
      }
    ],
    "applicationProcess": [
      {
        "step": 1,
        "title": "Register on National Scholarship Portal (NSP)",
        "description": "Create an account on scholarships.gov.in using your Aadhaar linked mobile number."
      },
      {
        "step": 2,
        "title": "Complete Online Application",
        "description": "Fill personal, academic, and bank account details. Upload scanned document copies."
      },
      {
        "step": 3,
        "title": "Institute Verification",
        "description": "Institute Nodal Officer verifies bonafide enrollment and forwards to State/Ministry."
      },
      {
        "step": 4,
        "title": "Direct Benefit Transfer (DBT)",
        "description": "Scholarship disbursed directly to NPCI-mapped bank account."
      }
    ],
    "importantConditions": [
      "Bank account must be seeded with Aadhaar in NPCI mapper to receive DBT grant.",
      "Cannot hold more than one government scholarship for the same academic session."
    ],
    "officialSourceUrl": "https://scholarships.gov.in",
    "applicationUrl": "https://scholarships.gov.in",
    "tags": [
      "Scholarship",
      "B.Tech",
      "Higher Education",
      "Tuition Waiver",
      "Post Matric",
      "DBT"
    ],
    "isFeatured": true
  },
  {
    "id": "pm-usp-central-scholarship",
    "name": "PM-USP Central Sector Scholarship for College & University Students",
    "hindiName": "कॉलेज एवं विश्वविद्यालय छात्रों के लिए पीएम-यूएसपी केंद्रीय क्षेत्र छात्रवृत्ति",
    "category": "Education",
    "level": "Central",
    "ministry": "Department of Higher Education, Ministry of Education",
    "shortDescription": "Merit-cum-means scholarship for top 80th percentile students in Class 12 pursuing regular degree courses.",
    "detailedDescription": "The scheme provides financial aid to students who scored above 80th percentile in Class 12 board examination and are pursuing regular degree courses in colleges and universities.",
    "benefits": [
      "₹12,000 per annum for the first three years of undergraduate study",
      "₹20,000 per annum at postgraduate level or 4th/5th year of professional degree (B.Tech)",
      "Direct DBT credit annually for up to 5 years subject to academic renewal"
    ],
    "eligibilitySummary": [
      "Scored above 80th percentile in respective Class 12 state/central board",
      "Pursuing regular full-time undergraduate course in recognized college/university",
      "Gross family annual income must not exceed ₹4,50,000 per annum",
      "Not availing any other central or state scholarship"
    ],
    "eligibilityCriteria": [
      {
        "id": "pmusp-income",
        "field": "income",
        "label": "Annual Family Income",
        "operator": "lte",
        "value": 450000,
        "description": "Gross family annual income must not exceed ₹4,50,000."
      },
      {
        "id": "pmusp-education",
        "field": "education",
        "label": "Education Level",
        "operator": "in",
        "value": [
          "B.Tech",
          "Graduate",
          "Post Graduate"
        ],
        "description": "Regular enrolled student in university/college."
      },
      {
        "id": "pmusp-student",
        "field": "student_status",
        "label": "Student Status",
        "operator": "boolean",
        "value": true,
        "description": "Regular full-time college student."
      }
    ],
    "requiredDocuments": [
      {
        "id": "pmusp-aadhaar",
        "name": "Aadhaar Card",
        "type": "Aadhaar",
        "isMandatory": true,
        "purpose": "Identity and DBT verification"
      },
      {
        "id": "pmusp-marksheet",
        "name": "Class 12th Board Marksheet",
        "type": "Marksheet",
        "isMandatory": true,
        "purpose": "Percentile verification"
      },
      {
        "id": "pmusp-income",
        "name": "Income Certificate (Revenue Authority)",
        "type": "Income Certificate",
        "isMandatory": true,
        "purpose": "Means test verification"
      },
      {
        "id": "pmusp-bonafide",
        "name": "College Admission Bonafide",
        "type": "College Bonafide",
        "isMandatory": true,
        "purpose": "Proof of full-time enrollment"
      }
    ],
    "applicationProcess": [
      {
        "step": 1,
        "title": "Apply on National Scholarship Portal",
        "description": "Submit application under Department of Higher Education on scholarships.gov.in."
      },
      {
        "step": 2,
        "title": "Upload Academic Credentials",
        "description": "Provide Class 12 roll number, board details, and college AISHE code."
      },
      {
        "step": 3,
        "title": "Merit List Generation",
        "description": "State boards publish quota merit lists based on 80th percentile cutoffs."
      }
    ],
    "importantConditions": [
      "Minimum 50% marks in semester examinations required for annual renewal.",
      "Maintenance of minimum 75% attendance in college."
    ],
    "officialSourceUrl": "https://www.education.gov.in",
    "applicationUrl": "https://scholarships.gov.in",
    "tags": [
      "Scholarship",
      "Merit",
      "Undergraduate",
      "B.Tech",
      "NSP",
      "Higher Education"
    ],
    "isFeatured": true
  },
  {
    "id": "pragati-scholarship-girls",
    "name": "AICTE Pragati Scholarship for Girls in Technical Education",
    "hindiName": "तकनीकी शिक्षा में बालिकाओं के लिए एआईसीटीई प्रगति छात्रवृत्ति",
    "category": "Education",
    "level": "Central",
    "ministry": "Ministry of Education / AICTE",
    "shortDescription": "₹50,000 per year assistance for meritorious female students admitted to technical degree (B.Tech) or diploma courses.",
    "detailedDescription": "Pragati is an initiative by AICTE to provide advancement assistance to young women pursuing technical education. It covers college fees, purchase of laptops, books, software, and study equipment.",
    "benefits": [
      "₹50,000 per year lump sum grant for each year of study (up to 4 years for B.Tech)",
      "Covers college tuition fee, computer/laptop purchase, and exam fees",
      "Direct DBT transfer via National Scholarship Portal"
    ],
    "eligibilitySummary": [
      "Female student admitted to 1st year of Degree/Diploma program in an AICTE approved institution",
      "Family income must not exceed ₹8,00,000 per annum",
      "Maximum two girls per family are eligible"
    ],
    "eligibilityCriteria": [
      {
        "id": "pragati-gender",
        "field": "gender",
        "label": "Gender",
        "operator": "eq",
        "value": "Female",
        "description": "Only female applicants are eligible."
      },
      {
        "id": "pragati-income",
        "field": "income",
        "label": "Annual Family Income",
        "operator": "lte",
        "value": 800000,
        "description": "Family income must be below ₹8,00,000."
      },
      {
        "id": "pragati-education",
        "field": "education",
        "label": "Course Type",
        "operator": "in",
        "value": [
          "B.Tech",
          "Diploma"
        ],
        "description": "Admitted to AICTE recognized technical degree/diploma."
      }
    ],
    "requiredDocuments": [
      {
        "id": "pragati-aadhaar",
        "name": "Aadhaar Card",
        "type": "Aadhaar",
        "isMandatory": true,
        "purpose": "Identity verification"
      },
      {
        "id": "pragati-income",
        "name": "Family Income Certificate",
        "type": "Income Certificate",
        "isMandatory": true,
        "purpose": "Income compliance"
      },
      {
        "id": "pragati-allotment",
        "name": "Centralised Admission Allotment Letter",
        "type": "Other",
        "isMandatory": true,
        "purpose": "Proof of merit seat"
      },
      {
        "id": "pragati-marksheet",
        "name": "10th & 12th Marksheet",
        "type": "Marksheet",
        "isMandatory": true,
        "purpose": "Admissions merit"
      }
    ],
    "applicationProcess": [
      {
        "step": 1,
        "title": "Apply on NSP Portal",
        "description": "Choose AICTE Schemes and select Pragati Scholarship Scheme."
      },
      {
        "step": 2,
        "title": "Verification by College",
        "description": "Principal/Head of AICTE institute verifies student registration."
      }
    ],
    "importantConditions": [
      "Institution must be AICTE approved.",
      "Requires passing grade every academic year for renewal."
    ],
    "officialSourceUrl": "https://www.aicte-india.org",
    "applicationUrl": "https://scholarships.gov.in",
    "tags": [
      "Girls",
      "Women in STEM",
      "B.Tech",
      "Scholarship",
      "AICTE",
      "Technical Education"
    ],
    "isFeatured": true
  },
  {
    "id": "saksham-scholarship-pwd",
    "name": "AICTE Saksham Scholarship for Specially Abled Students",
    "hindiName": "दिव्यांग विद्यार्थियों के लिए एआईसीटीई सक्षम छात्रवृत्ति",
    "category": "Education",
    "level": "Central",
    "ministry": "Ministry of Education / AICTE",
    "shortDescription": "₹50,000 per annum grant for specially-abled students pursuing professional technical degrees (B.Tech / Diploma).",
    "detailedDescription": "Saksham scholarship encourages differently-abled youths to pursue technical and engineering careers by easing financial burdens of tuition, adaptive devices, and learning resources.",
    "benefits": [
      "₹50,000 per year for tuition and assistive technology",
      "Direct DBT credit for every year of degree program"
    ],
    "eligibilitySummary": [
      "Specially-abled student with disability not less than 40%",
      "Family income less than ₹8,00,000 per annum",
      "Admitted to 1st year degree or diploma in AICTE approved institution"
    ],
    "eligibilityCriteria": [
      {
        "id": "saksham-pwd",
        "field": "disability",
        "label": "Disability Status",
        "operator": "boolean",
        "value": true,
        "description": "Must have verified disability >= 40%."
      },
      {
        "id": "saksham-income",
        "field": "income",
        "label": "Annual Income",
        "operator": "lte",
        "value": 800000,
        "description": "Income <= ₹8,00,000."
      },
      {
        "id": "saksham-edu",
        "field": "education",
        "label": "Education Level",
        "operator": "in",
        "value": [
          "B.Tech",
          "Diploma"
        ],
        "description": "Technical degree or diploma."
      }
    ],
    "requiredDocuments": [
      {
        "id": "saksham-udid",
        "name": "Disability Certificate / UDID Card",
        "type": "Other",
        "isMandatory": true,
        "purpose": "Proof of disability"
      },
      {
        "id": "saksham-income-doc",
        "name": "Income Certificate",
        "type": "Income Certificate",
        "isMandatory": true,
        "purpose": "Income proof"
      },
      {
        "id": "saksham-aadhaar",
        "name": "Aadhaar Card",
        "type": "Aadhaar",
        "isMandatory": true,
        "purpose": "Identity"
      }
    ],
    "applicationProcess": [
      {
        "step": 1,
        "title": "Online Registration on NSP",
        "description": "Register on scholarships.gov.in under AICTE Saksham."
      }
    ],
    "importantConditions": [
      "Valid government disability certificate issued by competent medical authority."
    ],
    "officialSourceUrl": "https://www.aicte-india.org",
    "applicationUrl": "https://scholarships.gov.in",
    "tags": [
      "Disability",
      "Scholarship",
      "B.Tech",
      "AICTE",
      "Divyangjan"
    ]
  },
  {
    "id": "nmmss-national-merit-scholarship",
    "name": "National Means-cum-Merit Scholarship Scheme (NMMSS)",
    "hindiName": "राष्ट्रीय साधन-सह-योग्यता छात्रवृत्ति योजना",
    "category": "Education",
    "level": "Central",
    "ministry": "Ministry of Education",
    "shortDescription": "₹12,000 annual scholarship for meritorious students from economically weaker sections to prevent secondary dropouts.",
    "detailedDescription": "Awarded to meritorious students studying in Class 9 through Class 12 in government or government-aided schools to incentivize completion of secondary education.",
    "benefits": [
      "₹12,000 per annum (₹1,000/month) credited directly via DBT",
      "Continued support from Class 9 to Class 12"
    ],
    "eligibilitySummary": [
      "Passed Class 8 with minimum 55% marks and cleared state selection exam",
      "Parental income from all sources not exceeding ₹3,50,000 per annum",
      "Studying in government or local body recognized schools"
    ],
    "eligibilityCriteria": [
      {
        "id": "nmmss-income",
        "field": "income",
        "label": "Annual Income",
        "operator": "lte",
        "value": 350000,
        "description": "Family income <= ₹3,50,000."
      },
      {
        "id": "nmmss-student",
        "field": "student_status",
        "label": "Student Status",
        "operator": "boolean",
        "value": true,
        "description": "Enrolled regular school student."
      }
    ],
    "requiredDocuments": [
      {
        "id": "nmmss-aadhaar",
        "name": "Aadhaar Card",
        "type": "Aadhaar",
        "isMandatory": true,
        "purpose": "DBT"
      },
      {
        "id": "nmmss-income-cert",
        "name": "Income Certificate",
        "type": "Income Certificate",
        "isMandatory": true,
        "purpose": "Income"
      },
      {
        "id": "nmmss-marksheet",
        "name": "Class 8 Marksheet",
        "type": "Marksheet",
        "isMandatory": true,
        "purpose": "Merit"
      }
    ],
    "applicationProcess": [
      {
        "step": 1,
        "title": "State Selection Test",
        "description": "Appear in NMMS state exam in Class 8."
      },
      {
        "step": 2,
        "title": "NSP Onboarding",
        "description": "Selected students claim yearly disbursement on scholarships.gov.in."
      }
    ],
    "importantConditions": [
      "Private or Kendriya Vidyalaya students are not eligible."
    ],
    "officialSourceUrl": "https://www.education.gov.in",
    "applicationUrl": "https://scholarships.gov.in",
    "tags": [
      "School",
      "Secondary Education",
      "NSP",
      "Merit-cum-Means"
    ]
  },
  {
    "id": "pm-yasasvi-scholarship",
    "name": "PM Young Achievers Scholarship (PM YASASVI)",
    "hindiName": "पीएम यशस्वी छात्रवृत्ति योजना",
    "category": "Education",
    "level": "Central",
    "ministry": "Ministry of Social Justice and Empowerment",
    "shortDescription": "Top class education scholarship up to ₹1,25,000 per year for OBC, EBC, and DNT school and college students.",
    "detailedDescription": "PM YASASVI provides premier education scholarships to students belonging to OBC, EBC, and De-notified Nomadic Tribes studying in top designated schools and universities across India.",
    "benefits": [
      "Up to ₹75,000 per year for Class 9 & 10 students",
      "Up to ₹1,25,000 per year for Class 11 & 12 students",
      "Full fee waiver for higher education in empanelled institutes"
    ],
    "eligibilitySummary": [
      "Belongs to OBC, EBC, or DNT categories",
      "Annual family income not exceeding ₹2,50,000",
      "Studying in shortlisted top schools / institutes"
    ],
    "eligibilityCriteria": [
      {
        "id": "yasasvi-income",
        "field": "income",
        "label": "Annual Income",
        "operator": "lte",
        "value": 250000,
        "description": "Income <= ₹2,50,000."
      },
      {
        "id": "yasasvi-cat",
        "field": "category",
        "label": "Social Category",
        "operator": "in",
        "value": [
          "OBC",
          "EWS"
        ],
        "description": "OBC / EBC category."
      },
      {
        "id": "yasasvi-student",
        "field": "student_status",
        "label": "Student Status",
        "operator": "boolean",
        "value": true,
        "description": "Regular student."
      }
    ],
    "requiredDocuments": [
      {
        "id": "yasasvi-caste",
        "name": "OBC / Category Certificate",
        "type": "Other",
        "isMandatory": true,
        "purpose": "Category proof"
      },
      {
        "id": "yasasvi-income-doc",
        "name": "Income Certificate",
        "type": "Income Certificate",
        "isMandatory": true,
        "purpose": "Income proof"
      },
      {
        "id": "yasasvi-aadhaar",
        "name": "Aadhaar Card",
        "type": "Aadhaar",
        "isMandatory": true,
        "purpose": "Identity"
      }
    ],
    "applicationProcess": [
      {
        "step": 1,
        "title": "NSP Application",
        "description": "Apply online on National Scholarship Portal (scholarships.gov.in)."
      }
    ],
    "importantConditions": [
      "Income certificate must be verified by Tehsildar or SDM."
    ],
    "officialSourceUrl": "https://socialjustice.gov.in",
    "applicationUrl": "https://scholarships.gov.in",
    "tags": [
      "OBC",
      "Scholarship",
      "NSP",
      "YASASVI",
      "School",
      "College"
    ]
  },
  {
    "id": "ishan-uday-scholarship-ner",
    "name": "Ishan Uday Special Scholarship for North Eastern Region",
    "hindiName": "उत्तर पूर्वी क्षेत्र के लिए ईशान उदय विशेष छात्रवृत्ति",
    "category": "Education",
    "level": "Central",
    "ministry": "University Grants Commission (UGC) / MoE",
    "shortDescription": "₹5,400 to ₹7,800 monthly stipend for students of North Eastern states pursuing general and professional undergraduate degrees.",
    "detailedDescription": "UGC special scholarship scheme to promote higher education among students from Arunachal Pradesh, Assam, Manipur, Meghalaya, Mizoram, Nagaland, Sikkim, and Tripura.",
    "benefits": [
      "₹5,400 per month for general degree courses",
      "₹7,800 per month for technical and professional degree courses (B.Tech, MBBS)",
      "Direct disbursement via DBT for whole course duration"
    ],
    "eligibilitySummary": [
      "Domicile holder of North Eastern states (NER)",
      "Passed Class 12 or equivalent and admitted to 1st year degree program",
      "Parental income from all sources not exceeding ₹4,50,000 per annum"
    ],
    "eligibilityCriteria": [
      {
        "id": "ishan-income",
        "field": "income",
        "label": "Annual Income",
        "operator": "lte",
        "value": 450000,
        "description": "Family income <= ₹4,50,000."
      },
      {
        "id": "ishan-edu",
        "field": "education",
        "label": "Course Level",
        "operator": "in",
        "value": [
          "B.Tech",
          "Graduate"
        ],
        "description": "Degree course."
      },
      {
        "id": "ishan-student",
        "field": "student_status",
        "label": "Student Status",
        "operator": "boolean",
        "value": true,
        "description": "Regular enrolled student."
      }
    ],
    "requiredDocuments": [
      {
        "id": "ishan-domicile",
        "name": "Permanent Resident / Domicile Certificate (NER)",
        "type": "Domicile Certificate",
        "isMandatory": true,
        "purpose": "State verification"
      },
      {
        "id": "ishan-income-doc",
        "name": "Income Certificate",
        "type": "Income Certificate",
        "isMandatory": true,
        "purpose": "Income"
      },
      {
        "id": "ishan-aadhaar",
        "name": "Aadhaar Card",
        "type": "Aadhaar",
        "isMandatory": true,
        "purpose": "DBT"
      }
    ],
    "applicationProcess": [
      {
        "step": 1,
        "title": "Submit on NSP",
        "description": "Apply under UGC schemes on scholarships.gov.in."
      }
    ],
    "importantConditions": [
      "Dual scholarship is strictly prohibited."
    ],
    "officialSourceUrl": "https://www.ugc.gov.in",
    "applicationUrl": "https://scholarships.gov.in",
    "tags": [
      "North East",
      "Scholarship",
      "B.Tech",
      "UGC",
      "Degree"
    ]
  },
  {
    "id": "begum-hazrat-mahal-scholarship",
    "name": "Begum Hazrat Mahal National Scholarship for Minority Girls",
    "hindiName": "अल्पसंख्यक छात्राओं के लिए बेगम हजरत महल राष्ट्रीय छात्रवृत्ति",
    "category": "Education",
    "level": "Central",
    "ministry": "Ministry of Minority Affairs",
    "shortDescription": "Financial assistance for meritorious girl students belonging to notified national minority communities studying in Classes 9 to 12.",
    "detailedDescription": "Aimed at supporting meritorious girl students belonging to Muslim, Christian, Sikh, Buddhist, Jain, and Parsi communities to continue their senior secondary education without dropouts.",
    "benefits": [
      "₹5,000 for Class 9 and 10 per academic year",
      "₹6,000 for Class 11 and 12 per academic year"
    ],
    "eligibilitySummary": [
      "Female student belonging to notified minority communities",
      "Secured at least 50% marks in previous class",
      "Annual family income not exceeding ₹2,00,000"
    ],
    "eligibilityCriteria": [
      {
        "id": "bhm-gender",
        "field": "gender",
        "label": "Gender",
        "operator": "eq",
        "value": "Female",
        "description": "Female students only."
      },
      {
        "id": "bhm-income",
        "field": "income",
        "label": "Annual Income",
        "operator": "lte",
        "value": 200000,
        "description": "Income <= ₹2,00,000."
      },
      {
        "id": "bhm-student",
        "field": "student_status",
        "label": "Student Status",
        "operator": "boolean",
        "value": true,
        "description": "Enrolled regular student."
      }
    ],
    "requiredDocuments": [
      {
        "id": "bhm-aadhaar",
        "name": "Aadhaar Card",
        "type": "Aadhaar",
        "isMandatory": true,
        "purpose": "Identity"
      },
      {
        "id": "bhm-income",
        "name": "Income Certificate",
        "type": "Income Certificate",
        "isMandatory": true,
        "purpose": "Income"
      },
      {
        "id": "bhm-minority",
        "name": "Minority Community Certificate",
        "type": "Other",
        "isMandatory": true,
        "purpose": "Minority status"
      }
    ],
    "applicationProcess": [
      {
        "step": 1,
        "title": "Apply on NSP",
        "description": "Register on scholarships.gov.in."
      }
    ],
    "importantConditions": [
      "Minimum 50% marks in qualifying examination."
    ],
    "officialSourceUrl": "https://www.minorityaffairs.gov.in",
    "applicationUrl": "https://scholarships.gov.in",
    "tags": [
      "Minority",
      "Girls",
      "Scholarship",
      "School",
      "Education"
    ]
  },
  {
    "id": "csis-education-loan-subsidy",
    "name": "Central Sector Interest Subsidy Scheme (CSIS) for Education Loans",
    "hindiName": "शिक्षा ऋण पर केंद्रीय क्षेत्र ब्याज सब्सिडी योजना",
    "category": "Education",
    "level": "Central",
    "ministry": "Ministry of Education",
    "shortDescription": "100% government interest waiver on education loans during moratorium period for professional degrees like B.Tech.",
    "detailedDescription": "CSIS provides full interest subsidy during the moratorium period (course period plus one year) on education loans taken by students from Economically Weaker Sections from scheduled banks.",
    "benefits": [
      "Complete interest waiver during entire degree duration plus 1 year grace period",
      "Covers approved professional and technical degree courses in India"
    ],
    "eligibilitySummary": [
      "Gross family annual income not exceeding ₹4,50,000",
      "Enrolled in professional/technical course in recognized Indian university/institute",
      "Education loan sanctioned under IBA Model Scheme"
    ],
    "eligibilityCriteria": [
      {
        "id": "csis-income",
        "field": "income",
        "label": "Annual Income",
        "operator": "lte",
        "value": 450000,
        "description": "Income <= ₹4,50,000."
      },
      {
        "id": "csis-edu",
        "field": "education",
        "label": "Education Level",
        "operator": "in",
        "value": [
          "B.Tech",
          "Graduate",
          "Post Graduate"
        ],
        "description": "Professional degree course."
      }
    ],
    "requiredDocuments": [
      {
        "id": "csis-income-doc",
        "name": "Income Certificate from Authorized Revenue Officer",
        "type": "Income Certificate",
        "isMandatory": true,
        "purpose": "Income eligibility"
      },
      {
        "id": "csis-loan-sanction",
        "name": "Bank Education Loan Sanction Letter",
        "type": "Bank Document",
        "isMandatory": true,
        "purpose": "Loan verification"
      }
    ],
    "applicationProcess": [
      {
        "step": 1,
        "title": "Apply via Vidya Lakshmi Portal",
        "description": "Register on vidyalakshmi.co.in and claim interest subsidy through loan account bank."
      }
    ],
    "importantConditions": [
      "Available only for professional/technical courses in India."
    ],
    "officialSourceUrl": "https://www.education.gov.in",
    "applicationUrl": "https://www.vidyalakshmi.co.in",
    "tags": [
      "Education Loan",
      "Interest Subsidy",
      "B.Tech",
      "Higher Education"
    ]
  },
  {
    "id": "haryana-post-matric-sc",
    "name": "Haryana State Post Matric Scholarship Scheme for SC & BC Students",
    "hindiName": "हरियाणा राज्य पोस्ट मैट्रिक छात्रवृत्ति योजना (एससी एवं बीसी)",
    "category": "Education",
    "level": "State",
    "state": "Haryana",
    "ministry": "Department of Higher Education, Government of Haryana",
    "shortDescription": "100% tuition reimbursement and maintenance for SC and BC students domiciled in Haryana pursuing B.Tech and higher degrees.",
    "detailedDescription": "Haryana State Government initiative providing financial support to SC/BC students studying in Haryana or other states in recognized higher education institutions.",
    "benefits": [
      "Complete reimbursement of non-refundable tuition and examination fees",
      "Monthly maintenance allowance up to ₹1,200",
      "Direct DBT transfer via Har-Chhatravratti portal"
    ],
    "eligibilitySummary": [
      "Permanent resident / Domicile holder of Haryana",
      "Belongs to Scheduled Caste (SC) or Backward Class (BC)",
      "Annual family income up to ₹2,50,000 (SC) or ₹1,50,000 (BC)"
    ],
    "eligibilityCriteria": [
      {
        "id": "haryanasc-state",
        "field": "state",
        "label": "State Domicile",
        "operator": "eq",
        "value": "Haryana",
        "description": "Must be permanent resident of Haryana."
      },
      {
        "id": "haryanasc-cat",
        "field": "category",
        "label": "Category",
        "operator": "in",
        "value": [
          "SC",
          "OBC"
        ],
        "description": "SC or BC category."
      },
      {
        "id": "haryanasc-income",
        "field": "income",
        "label": "Annual Income",
        "operator": "lte",
        "value": 250000,
        "description": "Income <= ₹2,50,000."
      },
      {
        "id": "haryanasc-edu",
        "field": "education",
        "label": "Education Level",
        "operator": "in",
        "value": [
          "B.Tech",
          "Diploma",
          "Graduate",
          "Post Graduate"
        ],
        "description": "Technical or higher degree."
      }
    ],
    "requiredDocuments": [
      {
        "id": "haryanasc-domicile",
        "name": "Haryana Resident / Parivar Pehchan Patra (PPP)",
        "type": "Domicile Certificate",
        "isMandatory": true,
        "purpose": "Haryana residency"
      },
      {
        "id": "haryanasc-income-doc",
        "name": "Income Certificate",
        "type": "Income Certificate",
        "isMandatory": true,
        "purpose": "Income verification"
      },
      {
        "id": "haryanasc-caste-doc",
        "name": "Caste Certificate",
        "type": "Other",
        "isMandatory": true,
        "purpose": "Caste status"
      }
    ],
    "applicationProcess": [
      {
        "step": 1,
        "title": "Apply on Har-Chhatravratti Portal",
        "description": "Login using PPP Family ID on harchhatravratti.highereduhry.ac.in."
      }
    ],
    "importantConditions": [
      "Mandatory linkage with Haryana Parivar Pehchan Patra (PPP ID)."
    ],
    "officialSourceUrl": "https://highereduhry.ac.in",
    "applicationUrl": "https://harchhatravratti.highereduhry.ac.in",
    "tags": [
      "Haryana",
      "Scholarship",
      "State Scheme",
      "B.Tech",
      "SC/BC"
    ]
  },
  {
    "id": "pm-kisan-samman-nidhi",
    "name": "PM Kisan Samman Nidhi (PM-KISAN)",
    "hindiName": "प्रधानमंत्री किसान सम्मान निधि (पीएम-किसान)",
    "category": "Agriculture",
    "level": "Central",
    "ministry": "Ministry of Agriculture and Farmers Welfare",
    "shortDescription": "Assured annual income support of ₹6,000 in three equal installments of ₹2,000 directly to landholding farmers.",
    "detailedDescription": "PM-KISAN is a central sector scheme providing supplementary financial assistance to cultivable landholding farmer families across India to procure agricultural inputs and meet domestic needs.",
    "benefits": [
      "₹6,000 annual direct income support disbursed in 3 tranches of ₹2,000 each",
      "Direct DBT transfer straight into farmer bank account",
      "Integration with Kisan Credit Card (KCC) for cheap crop credit"
    ],
    "eligibilitySummary": [
      "All landholding farmer families having cultivable land in their names",
      "Aadhaar seeded bank account with e-KYC completed",
      "Excludes institutional landholders and income tax payees"
    ],
    "eligibilityCriteria": [
      {
        "id": "kisan-occ",
        "field": "occupation",
        "label": "Occupation",
        "operator": "eq",
        "value": "Farmer",
        "description": "Must be actively involved in agriculture."
      }
    ],
    "requiredDocuments": [
      {
        "id": "kisan-aadhaar",
        "name": "Aadhaar Card with linked mobile",
        "type": "Aadhaar",
        "isMandatory": true,
        "purpose": "Identity & e-KYC"
      },
      {
        "id": "kisan-land",
        "name": "Land Ownership Records (Khatauni / RoR / 7/12 extract)",
        "type": "Other",
        "isMandatory": true,
        "purpose": "Land verification"
      },
      {
        "id": "kisan-bank",
        "name": "Bank Account Passbook",
        "type": "Bank Document",
        "isMandatory": true,
        "purpose": "DBT routing"
      }
    ],
    "applicationProcess": [
      {
        "step": 1,
        "title": "Self Registration on PM-KISAN Portal",
        "description": "Navigate to Farmers Corner at pmkisan.gov.in and click New Farmer Registration."
      },
      {
        "step": 2,
        "title": "Enter Land & Identity Details",
        "description": "Submit Aadhaar number, state, district, village, and survey/khasra numbers."
      },
      {
        "step": 3,
        "title": "Village Patwari Verification",
        "description": "Local revenue authority inspects land records on digital revenue ledger."
      }
    ],
    "importantConditions": [
      "Annual e-KYC via OTP or biometric face authentication is mandatory.",
      "Constitutional post holders and serving government employees are ineligible."
    ],
    "officialSourceUrl": "https://pmkisan.gov.in",
    "applicationUrl": "https://pmkisan.gov.in",
    "tags": [
      "Farmers",
      "Agriculture",
      "Income Support",
      "Kisan",
      "Direct Benefit Transfer"
    ],
    "isFeatured": true
  },
  {
    "id": "pm-fasal-bima-yojana",
    "name": "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
    "hindiName": "प्रधानमंत्री फसल बीमा योजना (पीएमएफबीवाई)",
    "category": "Agriculture",
    "level": "Central",
    "ministry": "Ministry of Agriculture and Farmers Welfare",
    "shortDescription": "Comprehensive crop insurance with minimal premium (1.5% - 2%) covering yield losses, droughts, and natural calamities.",
    "detailedDescription": "PMFBY provides comprehensive insurance coverage against non-preventable natural risks from pre-sowing to post-harvest stages. Farmers pay nominal premium while government covers the rest.",
    "benefits": [
      "Only 2% premium for Kharif crops, 1.5% for Rabi food/oilseed crops, 5% for commercial/horticultural crops",
      "Immediate mid-season relief and post-harvest localized disaster claims",
      "Claim settlement directly to Aadhaar-linked bank accounts"
    ],
    "eligibilitySummary": [
      "All farmers including sharecroppers and tenant farmers growing notified crops in notified areas",
      "Valid land tenancy / ownership documents"
    ],
    "eligibilityCriteria": [
      {
        "id": "pmfby-occ",
        "field": "occupation",
        "label": "Occupation",
        "operator": "eq",
        "value": "Farmer",
        "description": "Cultivating farmer."
      }
    ],
    "requiredDocuments": [
      {
        "id": "pmfby-land",
        "name": "Land Record (Khasra/Khatauni/Bahi)",
        "type": "Other",
        "isMandatory": true,
        "purpose": "Acreage proof"
      },
      {
        "id": "pmfby-sowing",
        "name": "Sowing Certificate / Patwari verification",
        "type": "Other",
        "isMandatory": true,
        "purpose": "Crop proof"
      },
      {
        "id": "pmfby-bank",
        "name": "Bank Passbook",
        "type": "Bank Document",
        "isMandatory": true,
        "purpose": "Disbursement"
      }
    ],
    "applicationProcess": [
      {
        "step": 1,
        "title": "Apply on PMFBY Portal",
        "description": "Apply online at pmfby.gov.in or through CSC / nearest bank."
      }
    ],
    "importantConditions": [
      "Crop cut experiments and satellite imagery utilized for loss assessment."
    ],
    "officialSourceUrl": "https://pmfby.gov.in",
    "applicationUrl": "https://pmfby.gov.in",
    "tags": [
      "Crop Insurance",
      "Agriculture",
      "Kisan",
      "Fasal Bima"
    ]
  },
  {
    "id": "kisan-credit-card",
    "name": "Kisan Credit Card (KCC) Scheme",
    "hindiName": "किसान क्रेडिट कार्ड (केसीसी) योजना",
    "category": "Agriculture",
    "level": "Central",
    "ministry": "Ministry of Agriculture & Farmers Welfare / RBI",
    "shortDescription": "Concessional institutional crop loans up to ₹3,00,000 at effective interest rate of 4% p.a. for farmers.",
    "detailedDescription": "Provides adequate and timely credit support from the banking system for cultivation, post-harvest expenses, animal husbandry, and fisheries at subsidized interest rates.",
    "benefits": [
      "Credit limit up to ₹3,00,000 at 7% p.a. with 3% prompt repayment incentive (effective rate 4%)",
      "No collateral required for loans up to ₹1,60,000",
      "Flexible withdrawal through ATM-enabled RuPay Kisan Card"
    ],
    "eligibilitySummary": [
      "Owner cultivators, tenant farmers, oral lessees, sharecroppers, and SHGs of farmers",
      "Animal husbandry, dairy, and fisheries farmers are also eligible"
    ],
    "eligibilityCriteria": [
      {
        "id": "kcc-occ",
        "field": "occupation",
        "label": "Occupation",
        "operator": "eq",
        "value": "Farmer",
        "description": "Farmer or agricultural allied worker."
      }
    ],
    "requiredDocuments": [
      {
        "id": "kcc-aadhaar",
        "name": "Aadhaar Card",
        "type": "Aadhaar",
        "isMandatory": true,
        "purpose": "KYC"
      },
      {
        "id": "kcc-land",
        "name": "Land Record / Tenancy Agreement",
        "type": "Other",
        "isMandatory": true,
        "purpose": "Land validation"
      }
    ],
    "applicationProcess": [
      {
        "step": 1,
        "title": "Submit KCC Application",
        "description": "Download one-page form from pmkisan.gov.in or bank portal."
      }
    ],
    "importantConditions": [
      "Prompt repayment before due date triggers 3% interest subvention."
    ],
    "officialSourceUrl": "https://www.myscheme.gov.in/schemes/kcc",
    "applicationUrl": "https://www.myscheme.gov.in/schemes/kcc",
    "tags": [
      "Credit",
      "Loans",
      "Kisan Credit Card",
      "Agriculture",
      "Crop Loan"
    ]
  },
  {
    "id": "pm-krishi-sinchayee-yojana",
    "name": "PM Krishi Sinchayee Yojana (PMKSY - Per Drop More Crop)",
    "hindiName": "प्रधानमंत्री कृषि सिंचाई योजना (पीएमकेएसवाई)",
    "category": "Agriculture",
    "level": "Central",
    "ministry": "Ministry of Agriculture and Farmers Welfare",
    "shortDescription": "Up to 55% capital subsidy for installing drip and sprinkler micro-irrigation systems on farm land.",
    "detailedDescription": "PMKSY promotes efficient water use technologies (Drip and Sprinkler irrigation systems) to improve on-farm water use efficiency and enhance crop productivity.",
    "benefits": [
      "Up to 55% subsidy for small and marginal farmers; 45% for other farmers",
      "Reduces water consumption by up to 50% and electricity cost by 30%"
    ],
    "eligibilitySummary": [
      "Farmers having cultivable land with assured water source",
      "Small and marginal farmers receive higher priority"
    ],
    "eligibilityCriteria": [
      {
        "id": "pmksy-occ",
        "field": "occupation",
        "label": "Occupation",
        "operator": "eq",
        "value": "Farmer",
        "description": "Landholding farmer."
      }
    ],
    "requiredDocuments": [
      {
        "id": "pmksy-aadhaar",
        "name": "Aadhaar Card",
        "type": "Aadhaar",
        "isMandatory": true,
        "purpose": "Identity"
      },
      {
        "id": "pmksy-land",
        "name": "Land Records / Jamabandi",
        "type": "Other",
        "isMandatory": true,
        "purpose": "Proof of land"
      }
    ],
    "applicationProcess": [
      {
        "step": 1,
        "title": "State Agriculture Portal Registration",
        "description": "Apply through state agriculture horticulture portal."
      }
    ],
    "importantConditions": [
      "Installation must be done by empanelled micro-irrigation vendors."
    ],
    "officialSourceUrl": "https://pmksy.gov.in",
    "applicationUrl": "https://pmksy.gov.in",
    "tags": [
      "Irrigation",
      "Agriculture",
      "Subsidy",
      "Drip Irrigation",
      "Farmers"
    ]
  },
  {
    "id": "soil-health-card",
    "name": "Soil Health Card Scheme",
    "hindiName": "मृदा स्वास्थ्य कार्ड योजना",
    "category": "Agriculture",
    "level": "Central",
    "ministry": "Ministry of Agriculture and Farmers Welfare",
    "shortDescription": "Free scientific soil testing report providing customized fertilizer and nutrient dosage recommendations.",
    "detailedDescription": "Provides soil health cards to farmers every 2 years indicating nutrient status of 12 soil parameters and recommendations for dosage to reduce cost of cultivation.",
    "benefits": [
      "Free soil laboratory testing report delivered to farmer",
      "Reduces fertilizer cost by 15-20% and prevents soil degradation"
    ],
    "eligibilitySummary": [
      "Open to all farmers across India holding cultivable land."
    ],
    "eligibilityCriteria": [
      {
        "id": "shc-occ",
        "field": "occupation",
        "label": "Occupation",
        "operator": "eq",
        "value": "Farmer",
        "description": "Cultivating farmer."
      }
    ],
    "requiredDocuments": [
      {
        "id": "shc-land",
        "name": "Land Survey Number Details",
        "type": "Other",
        "isMandatory": true,
        "purpose": "Sample coordinates"
      }
    ],
    "applicationProcess": [
      {
        "step": 1,
        "title": "Soil Sampling",
        "description": "Agriculture extension officers collect soil samples from farm."
      }
    ],
    "importantConditions": [
      "Updated cards issued biennially."
    ],
    "officialSourceUrl": "https://soilhealth.dac.gov.in",
    "applicationUrl": "https://soilhealth.dac.gov.in",
    "tags": [
      "Soil Testing",
      "Agriculture",
      "Fertilizer",
      "Kisan"
    ]
  },
  {
    "id": "enam-national-agriculture-market",
    "name": "National Agriculture Market (e-NAM)",
    "hindiName": "राष्ट्रीय कृषि बाजार (ई-नाम)",
    "category": "Agriculture",
    "level": "Central",
    "ministry": "Ministry of Agriculture and Farmers Welfare",
    "shortDescription": "Pan-India electronic trading portal networking APMC mandis for transparent price discovery and online payments.",
    "detailedDescription": "e-NAM creates a unified national market for agricultural commodities by enabling online bidding, electronic weighing, and direct bank settlement for farmers.",
    "benefits": [
      "Access to competitive buyers nationwide without mandi middleman exploitation",
      "Instant electronic payment straight into farmer's bank account"
    ],
    "eligibilitySummary": [
      "All farmers producing agricultural and horticultural produce."
    ],
    "eligibilityCriteria": [
      {
        "id": "enam-occ",
        "field": "occupation",
        "label": "Occupation",
        "operator": "eq",
        "value": "Farmer",
        "description": "Produce seller."
      }
    ],
    "requiredDocuments": [
      {
        "id": "enam-aadhaar",
        "name": "Aadhaar Card",
        "type": "Aadhaar",
        "isMandatory": true,
        "purpose": "ID"
      },
      {
        "id": "enam-bank",
        "name": "Bank Passbook",
        "type": "Bank Document",
        "isMandatory": true,
        "purpose": "Direct payment"
      }
    ],
    "applicationProcess": [
      {
        "step": 1,
        "title": "Register on e-NAM",
        "description": "Register on enam.gov.in or at the nearest e-NAM enabled APMC mandi."
      }
    ],
    "importantConditions": [
      "Quality assaying is conducted at the mandi entry gate."
    ],
    "officialSourceUrl": "https://enam.gov.in",
    "applicationUrl": "https://enam.gov.in",
    "tags": [
      "Agriculture",
      "Mandi",
      "e-NAM",
      "Trading",
      "Farmers"
    ]
  },
  {
    "id": "paramparagat-krishi-vikas",
    "name": "Paramparagat Krishi Vikas Yojana (PKVY - Organic Farming)",
    "hindiName": "परम्परागत कृषि विकास योजना (पीकेवीवाई)",
    "category": "Agriculture",
    "level": "Central",
    "ministry": "Ministry of Agriculture and Farmers Welfare",
    "shortDescription": "₹50,000 per hectare financial assistance for cluster-based organic farming and PGS organic certification.",
    "detailedDescription": "Supports traditional indigenous agricultural practices and organic farming through Participatory Guarantee System (PGS) certification, bio-fertilizers, and organic marketing.",
    "benefits": [
      "₹50,000 per hectare for 3 years (₹31,000 directly to farmer for organic inputs)",
      "Free group organic certification and market linkage support"
    ],
    "eligibilitySummary": [
      "Farmers willing to form clusters of 20 or more farmers with 50 acres land."
    ],
    "eligibilityCriteria": [
      {
        "id": "pkvy-occ",
        "field": "occupation",
        "label": "Occupation",
        "operator": "eq",
        "value": "Farmer",
        "description": "Farmer in organic cluster."
      }
    ],
    "requiredDocuments": [
      {
        "id": "pkvy-land",
        "name": "Land Record",
        "type": "Other",
        "isMandatory": true,
        "purpose": "Cluster formation"
      }
    ],
    "applicationProcess": [
      {
        "step": 1,
        "title": "Form PGS Cluster",
        "description": "Register farmer cluster with District Agriculture Officer."
      }
    ],
    "importantConditions": [
      "Must commit to zero synthetic chemical pesticide usage."
    ],
    "officialSourceUrl": "https://pgsindia-ncof.gov.in",
    "applicationUrl": "https://pgsindia-ncof.gov.in",
    "tags": [
      "Organic Farming",
      "Agriculture",
      "PKVY",
      "Sustainability"
    ]
  },
  {
    "id": "pm-matsya-sampada",
    "name": "Pradhan Mantri Matsya Sampada Yojana (PMMSY)",
    "hindiName": "प्रधानमंत्री मत्स्य संपदा योजना (पीएमएमएसवाई)",
    "category": "Agriculture",
    "level": "Central",
    "ministry": "Ministry of Fisheries, Animal Husbandry and Dairying",
    "shortDescription": "Up to 60% government subsidy for fish farmers, pond construction, biofloc, and aquaculture equipment.",
    "detailedDescription": "Flagship scheme for sustainable development of fisheries sector covering freshwater aquaculture, marine fishing boats, cold chain, and fish seed hatcheries.",
    "benefits": [
      "60% financial assistance for SC/ST and Women beneficiaries; 40% for General category",
      "Subsidies on feed mills, cold storage, and aquaculture equipment"
    ],
    "eligibilitySummary": [
      "Fishers, fish farmers, fish workers, SHGs, and entrepreneurs."
    ],
    "eligibilityCriteria": [
      {
        "id": "pmmsy-occ",
        "field": "occupation",
        "label": "Occupation",
        "operator": "in",
        "value": [
          "Farmer",
          "Self Employed"
        ],
        "description": "Fish farmer or aquaculture entrepreneur."
      }
    ],
    "requiredDocuments": [
      {
        "id": "pmmsy-land",
        "name": "Water Body / Land Rights Document",
        "type": "Other",
        "isMandatory": true,
        "purpose": "Pond site proof"
      }
    ],
    "applicationProcess": [
      {
        "step": 1,
        "title": "Apply on PMMSY Portal",
        "description": "Submit DPR on pmmsy.dof.gov.in."
      }
    ],
    "importantConditions": [
      "Detailed Project Report (DPR) approved by District Fisheries Development Committee."
    ],
    "officialSourceUrl": "https://pmmsy.dof.gov.in",
    "applicationUrl": "https://pmmsy.dof.gov.in",
    "tags": [
      "Fisheries",
      "Aquaculture",
      "Agriculture",
      "Subsidy"
    ]
  },
  {
    "id": "sub-mission-agri-mechanization",
    "name": "Sub-Mission on Agricultural Mechanization (SMAM)",
    "hindiName": "कृषि यंत्रीकरण पर उप-मिशन (एसएमएएम)",
    "category": "Agriculture",
    "level": "Central",
    "ministry": "Ministry of Agriculture and Farmers Welfare",
    "shortDescription": "40% to 50% subsidy on purchase of agricultural tractors, harvesters, rotavators, and laser land levelers.",
    "detailedDescription": "Promotes modern farm mechanization to reduce labor drudgery and increase timeliness of farming operations through subsidies and Custom Hiring Centres (CHCs).",
    "benefits": [
      "40-50% subsidy on procurement of verified agricultural machinery",
      "Up to ₹10 Lakh subsidy for establishing village Custom Hiring Centre"
    ],
    "eligibilitySummary": [
      "Farmers holding cultivable land in India; preference to Small, Marginal, and SC/ST farmers."
    ],
    "eligibilityCriteria": [
      {
        "id": "smam-occ",
        "field": "occupation",
        "label": "Occupation",
        "operator": "eq",
        "value": "Farmer",
        "description": "Practicing farmer."
      }
    ],
    "requiredDocuments": [
      {
        "id": "smam-land",
        "name": "Land Record (Jamabandi/RoR)",
        "type": "Other",
        "isMandatory": true,
        "purpose": "Land holding"
      },
      {
        "id": "smam-quotation",
        "name": "Machinery Dealer Quotation",
        "type": "Other",
        "isMandatory": true,
        "purpose": "Equipment price"
      }
    ],
    "applicationProcess": [
      {
        "step": 1,
        "title": "Register on Agrimachinery Portal",
        "description": "Apply on agrimachinery.nic.in using Aadhaar."
      }
    ],
    "importantConditions": [
      "Tractor or implement must be procured from registered authorized OEM dealers."
    ],
    "officialSourceUrl": "https://agrimachinery.nic.in",
    "applicationUrl": "https://agrimachinery.nic.in",
    "tags": [
      "Machinery",
      "Tractor Subsidy",
      "Mechanization",
      "Agriculture",
      "Farmers"
    ]
  },
  {
    "id": "haryana-bhavantar-bharpai",
    "name": "Haryana Bhavantar Bharpai Yojana for Farmers",
    "hindiName": "हरियाणा भावांतर भरपाई योजना (बीबीवाई)",
    "category": "Agriculture",
    "level": "State",
    "state": "Haryana",
    "ministry": "Department of Agriculture & Farmers Welfare, Haryana",
    "shortDescription": "Price deficit compensation to Haryana farmers whenever mandi market prices drop below government benchmark prices.",
    "detailedDescription": "Protects vegetable, fruit, and millet farmers in Haryana from market volatility by directly reimbursing price difference (Bhavantar) into bank accounts.",
    "benefits": [
      "Direct compensation for market rate fluctuations below baseline price",
      "Covers potato, tomato, onion, cauliflower, carrots, and bajra"
    ],
    "eligibilitySummary": [
      "Farmers cultivating notified horticultural crops and millet in Haryana",
      "Mandatory registration on Meri Fasal Mera Byora portal"
    ],
    "eligibilityCriteria": [
      {
        "id": "bby-state",
        "field": "state",
        "label": "State Domicile",
        "operator": "eq",
        "value": "Haryana",
        "description": "Farmer in Haryana."
      },
      {
        "id": "bby-occ",
        "field": "occupation",
        "label": "Occupation",
        "operator": "eq",
        "value": "Farmer",
        "description": "Cultivating farmer."
      }
    ],
    "requiredDocuments": [
      {
        "id": "bby-mfmb",
        "name": "Meri Fasal Mera Byora (MFMB) Registration Slip",
        "type": "Other",
        "isMandatory": true,
        "purpose": "Crop verification"
      },
      {
        "id": "bby-bank",
        "name": "Bank Passbook",
        "type": "Bank Document",
        "isMandatory": true,
        "purpose": "DBT"
      }
    ],
    "applicationProcess": [
      {
        "step": 1,
        "title": "Register on Meri Fasal Mera Byora",
        "description": "Register acreage on fasal.haryana.gov.in."
      }
    ],
    "importantConditions": [
      "Crop must be sold in registered Haryana mandis through e-Kharid."
    ],
    "officialSourceUrl": "https://fasal.haryana.gov.in",
    "applicationUrl": "https://fasal.haryana.gov.in",
    "tags": [
      "Haryana",
      "State Scheme",
      "Farmers",
      "Bhavantar",
      "Horticulture"
    ]
  },
  {
    "id": "ayushman-bharat-pmjay",
    "name": "Ayushman Bharat - PM Jan Arogya Yojana (AB-PMJAY)",
    "hindiName": "आयुष्मान भारत - प्रधानमंत्री जन आरोग्य योजना",
    "category": "Healthcare",
    "level": "Central",
    "ministry": "National Health Authority (NHA), MoHFW",
    "shortDescription": "Cashless health cover up to ₹5 Lakh per family per year for secondary and tertiary care hospitalization.",
    "detailedDescription": "The world's largest government-funded health assurance initiative, PM-JAY covers over 12 crore poor and vulnerable families (bottom 40% of population) and all citizens aged 70+ for hospitalizations across empanelled public and private hospitals nationwide.",
    "benefits": [
      "Cashless treatment up to ₹5 Lakhs per family per year",
      "Covers pre-existing diseases from day one of enrollment",
      "Cashless access to 27,000+ empanelled government and private hospitals across India",
      "Universal cover for all citizens aged 70 and above irrespective of income"
    ],
    "eligibilitySummary": [
      "Identified under SECC 2011 database or NFSA Ration Card list",
      "Families living in kutcha houses, landless agricultural workers, destitute families",
      "All citizens aged 70 years and above irrespective of income"
    ],
    "eligibilityCriteria": [
      {
        "id": "pmjay-income",
        "field": "income",
        "label": "Annual Family Income",
        "operator": "lte",
        "value": 300000,
        "description": "Economically vulnerable households or senior citizens."
      }
    ],
    "requiredDocuments": [
      {
        "id": "pmjay-aadhaar",
        "name": "Aadhaar Card",
        "type": "Aadhaar",
        "isMandatory": true,
        "purpose": "KYC and Ayushman Card generation"
      },
      {
        "id": "pmjay-ration",
        "name": "Ration Card (NFSA) / Family ID",
        "type": "Ration Card",
        "isMandatory": true,
        "purpose": "Family unit identification"
      }
    ],
    "applicationProcess": [
      {
        "step": 1,
        "title": "Check Eligibility Online",
        "description": "Visit beneficiary.nha.gov.in and search by Aadhaar or Ration Card number."
      },
      {
        "step": 2,
        "title": "e-KYC Authentication",
        "description": "Complete Aadhaar OTP or facial authentication on the Ayushman app."
      },
      {
        "step": 3,
        "title": "Download Ayushman Card",
        "description": "Download PVC Ayushman Card instantly upon approval."
      }
    ],
    "importantConditions": [
      "No restriction on family size, age, or gender.",
      "Treatment is completely cashless and paperless at empanelled healthcare providers."
    ],
    "officialSourceUrl": "https://nha.gov.in",
    "applicationUrl": "https://beneficiary.nha.gov.in",
    "tags": [
      "Health Insurance",
      "Hospitalization",
      "Free Treatment",
      "Ayushman Card",
      "Cashless"
    ],
    "isFeatured": true
  },
  {
    "id": "pm-suraksha-bima-yojana",
    "name": "Pradhan Mantri Suraksha Bima Yojana (PMSBY)",
    "hindiName": "प्रधानमंत्री सुरक्षा बीमा योजना (पीएमएसबीवाई)",
    "category": "Healthcare",
    "level": "Central",
    "ministry": "Department of Financial Services, Ministry of Finance",
    "shortDescription": "Accidental death and disability insurance cover of ₹2 Lakh for an annual premium of just ₹20.",
    "detailedDescription": "PMSBY offers affordable accidental death and disability coverage to bank account holders aged 18 to 70 with automatic annual debit.",
    "benefits": [
      "₹2 Lakh on accidental death or permanent total disability",
      "₹1 Lakh on permanent partial disability",
      "Nominal premium of only ₹20 per year"
    ],
    "eligibilitySummary": [
      "All Indian citizens aged 18 to 70 years",
      "Having an active savings bank or post office account"
    ],
    "eligibilityCriteria": [
      {
        "id": "pmsby-age",
        "field": "age",
        "label": "Age Range",
        "operator": "gte",
        "value": 18,
        "description": "Age between 18 and 70 years."
      }
    ],
    "requiredDocuments": [
      {
        "id": "pmsby-aadhaar",
        "name": "Aadhaar Card",
        "type": "Aadhaar",
        "isMandatory": true,
        "purpose": "KYC"
      },
      {
        "id": "pmsby-bank",
        "name": "Bank Account Details",
        "type": "Bank Document",
        "isMandatory": true,
        "purpose": "Auto-debit"
      }
    ],
    "applicationProcess": [
      {
        "step": 1,
        "title": "Enroll via Net Banking / Branch",
        "description": "Submit auto-debit consent on jansuraksha.gov.in or at bank branch."
      }
    ],
    "importantConditions": [
      "Auto-debit deduction occurs annually on or before 31st May."
    ],
    "officialSourceUrl": "https://www.jansuraksha.gov.in",
    "applicationUrl": "https://www.jansuraksha.gov.in",
    "tags": [
      "Accident Insurance",
      "Social Security",
      "PMSBY",
      "Healthcare"
    ]
  },
  {
    "id": "pm-jeevan-jyoti-bima",
    "name": "Pradhan Mantri Jeevan Jyoti Bima Yojana (PMJJBY)",
    "hindiName": "प्रधानमंत्री जीवन ज्योति बीमा योजना (पीएमजेजेबीवाई)",
    "category": "Healthcare",
    "level": "Central",
    "ministry": "Department of Financial Services, Ministry of Finance",
    "shortDescription": "Life insurance cover of ₹2 Lakh on death due to any cause for an annual premium of ₹436.",
    "detailedDescription": "Renewable one-year term life cover providing ₹2 Lakh financial protection to the family upon death of the insured citizen due to any medical or natural reason.",
    "benefits": [
      "₹2,00,000 life insurance cover payable to nominee upon death of member due to any cause",
      "Affordable annual premium of ₹436"
    ],
    "eligibilitySummary": [
      "Citizens aged 18 to 50 years holding a savings bank account",
      "Consent for auto-debit"
    ],
    "eligibilityCriteria": [
      {
        "id": "pmjjby-age",
        "field": "age",
        "label": "Age Limit",
        "operator": "lte",
        "value": 50,
        "description": "Age between 18 and 50 years."
      }
    ],
    "requiredDocuments": [
      {
        "id": "pmjjby-aadhaar",
        "name": "Aadhaar Card",
        "type": "Aadhaar",
        "isMandatory": true,
        "purpose": "KYC"
      }
    ],
    "applicationProcess": [
      {
        "step": 1,
        "title": "Bank Consent",
        "description": "Opt-in through net banking or bank branch."
      }
    ],
    "importantConditions": [
      "Risk cover commences after 30-day initial lien period."
    ],
    "officialSourceUrl": "https://www.jansuraksha.gov.in",
    "applicationUrl": "https://www.jansuraksha.gov.in",
    "tags": [
      "Life Insurance",
      "PMJJBY",
      "Social Security",
      "Death Cover"
    ]
  },
  {
    "id": "rashtriya-arogya-nidhi",
    "name": "Rashtriya Arogya Nidhi (RAN - Super Speciality Medical Aid)",
    "hindiName": "राष्ट्रीय आरोग्य निधि (आरएएन)",
    "category": "Healthcare",
    "level": "Central",
    "ministry": "Ministry of Health and Family Welfare",
    "shortDescription": "One-time financial assistance up to ₹15 Lakh for poor patients suffering from life-threatening major diseases at AIIMS and government hospitals.",
    "detailedDescription": "Provides direct financial grants for specialized medical and surgical treatments (cancer, cardiac, organ transplant) in designated central government super-specialty hospitals.",
    "benefits": [
      "Financial assistance up to ₹15 Lakhs for super-specialty treatments and surgeries",
      "Disbursed directly to hospital Medical Superintendent"
    ],
    "eligibilitySummary": [
      "Patients living below the poverty line (BPL)",
      "Suffering from major life-threatening diseases",
      "Not covered under state/central government employee health schemes"
    ],
    "eligibilityCriteria": [
      {
        "id": "ran-income",
        "field": "income",
        "label": "Annual Income",
        "operator": "lte",
        "value": 200000,
        "description": "BPL family income."
      }
    ],
    "requiredDocuments": [
      {
        "id": "ran-income-doc",
        "name": "BPL / Antyodaya Ration Card or Income Certificate",
        "type": "Income Certificate",
        "isMandatory": true,
        "purpose": "BPL proof"
      },
      {
        "id": "ran-hospital",
        "name": "Treating Doctor Medical Certificate & Treatment Estimate",
        "type": "Other",
        "isMandatory": true,
        "purpose": "Cost appraisal"
      }
    ],
    "applicationProcess": [
      {
        "step": 1,
        "title": "Hospital Verification",
        "description": "Form filled by treating doctor at government super-specialty hospital."
      }
    ],
    "importantConditions": [
      "Treatment must be received in recognized central institutions like AIIMS."
    ],
    "officialSourceUrl": "https://main.mohfw.gov.in",
    "applicationUrl": "https://main.mohfw.gov.in",
    "tags": [
      "Critical Illness",
      "Hospital Aid",
      "BPL",
      "Healthcare",
      "Surgery"
    ]
  },
  {
    "id": "ayushman-bharat-digital-mission",
    "name": "Ayushman Bharat Digital Mission (ABHA Health ID)",
    "hindiName": "आयुष्मान भारत डिजिटल मिशन (आभा कार्ड)",
    "category": "Healthcare",
    "level": "Central",
    "ministry": "National Health Authority, MoHFW",
    "shortDescription": "Unique 14-digit digital health ID to store and share paperless medical records, diagnostic reports, and prescriptions.",
    "detailedDescription": "ABHA provides a secure digital identity enabling seamless access to electronic medical records, lab reports, and doctor consultations across hospitals in India.",
    "benefits": [
      "Free 14-digit ABHA ID and digital card",
      "Seamless paperless record access and online tele-consultation"
    ],
    "eligibilitySummary": [
      "Open to all Indian citizens of any age."
    ],
    "eligibilityCriteria": [
      {
        "id": "abha-gen",
        "field": "age",
        "label": "Age",
        "operator": "gte",
        "value": 0,
        "description": "All citizens."
      }
    ],
    "requiredDocuments": [
      {
        "id": "abha-aadhaar",
        "name": "Aadhaar Card",
        "type": "Aadhaar",
        "isMandatory": true,
        "purpose": "Instant generation"
      }
    ],
    "applicationProcess": [
      {
        "step": 1,
        "title": "Create on abha.abdm.gov.in",
        "description": "Enter Aadhaar number and OTP to download ABHA card in 1 minute."
      }
    ],
    "importantConditions": [
      "Citizen has complete consent-based control over sharing health data."
    ],
    "officialSourceUrl": "https://abdm.gov.in",
    "applicationUrl": "https://abha.abdm.gov.in",
    "tags": [
      "Digital Health",
      "ABHA",
      "Health Card",
      "Medical Records"
    ]
  },
  {
    "id": "haryana-chiranjeevi-health",
    "name": "Mukhyamantri Chirayu Haryana Health Assurance",
    "hindiName": "मुख्यमंत्री चिरायु हरियाणा स्वास्थ्य योजना",
    "category": "Healthcare",
    "level": "State",
    "state": "Haryana",
    "ministry": "Haryana Health Department / Ayushman Haryana",
    "shortDescription": "Extended ₹5 Lakh cashless treatment cover for Haryana families with annual verified income between ₹1.8L and ₹3L.",
    "detailedDescription": "Expands Ayushman Bharat coverage to additional Haryana households verified under Parivar Pehchan Patra (PPP) with nominal annual contribution of ₹1,500.",
    "benefits": [
      "₹5 Lakh free cashless treatment per family per year",
      "Treatment across 1,000+ empanelled government and private hospitals in Haryana"
    ],
    "eligibilitySummary": [
      "Haryana residents having verified Parivar Pehchan Patra (PPP)",
      "Annual family income between ₹1,80,000 and ₹3,00,000"
    ],
    "eligibilityCriteria": [
      {
        "id": "chirayu-state",
        "field": "state",
        "label": "State Domicile",
        "operator": "eq",
        "value": "Haryana",
        "description": "Resident of Haryana."
      },
      {
        "id": "chirayu-income",
        "field": "income",
        "label": "Family Income",
        "operator": "lte",
        "value": 300000,
        "description": "PPP income <= ₹3,00,000."
      }
    ],
    "requiredDocuments": [
      {
        "id": "chirayu-ppp",
        "name": "Parivar Pehchan Patra (PPP Family ID)",
        "type": "Other",
        "isMandatory": true,
        "purpose": "Income and domicile validation"
      }
    ],
    "applicationProcess": [
      {
        "step": 1,
        "title": "Apply on Chirayu Haryana Portal",
        "description": "Login using PPP ID on chirayu.haryana.gov.in."
      }
    ],
    "importantConditions": [
      "Nominal annual token contribution of ₹1,500 for income slab ₹1.8L - ₹3L."
    ],
    "officialSourceUrl": "https://chirayu.haryana.gov.in",
    "applicationUrl": "https://chirayu.haryana.gov.in",
    "tags": [
      "Haryana",
      "State Scheme",
      "Healthcare",
      "Chirayu",
      "Cashless"
    ]
  },
  {
    "id": "pm-mudra-yojana",
    "name": "Pradhan Mantri Mudra Yojana (PMMY)",
    "hindiName": "प्रधानमंत्री मुद्रा योजना (पीएमएमवाई)",
    "category": "Business",
    "level": "Central",
    "ministry": "Ministry of Finance",
    "shortDescription": "Collateral-free business loans up to ₹10 Lakh for small enterprises, shops, traders, and manufacturing units.",
    "detailedDescription": "Pradhan Mantri Mudra Yojana enables micro-enterprises to access institutional collateral-free loans categorized into Shishu (up to ₹50k), Kishore (₹50k to ₹5L), and Tarun (up to ₹10L).",
    "benefits": [
      "Shishu Loan: Up to ₹50,000 for seed-stage startups",
      "Kishore Loan: ₹50,001 to ₹5,00,000 for purchasing equipment and stock",
      "Tarun Loan: ₹5,00,001 to ₹10,00,000 for established small businesses",
      "No collateral or third-party guarantee required from the borrower"
    ],
    "eligibilitySummary": [
      "Any Indian citizen aged 18+ with viable business proposal in non-farm sector",
      "Small manufacturing units, shopkeepers, fruits/vegetables vendors, artisans",
      "No previous bank loan defaults"
    ],
    "eligibilityCriteria": [
      {
        "id": "mudra-age",
        "field": "age",
        "label": "Minimum Age",
        "operator": "gte",
        "value": 18,
        "description": "Applicant must be 18+ years old."
      },
      {
        "id": "mudra-occ",
        "field": "occupation",
        "label": "Occupation",
        "operator": "in",
        "value": [
          "Business Owner",
          "Self Employed",
          "Artisan"
        ],
        "description": "Non-corporate micro business."
      }
    ],
    "requiredDocuments": [
      {
        "id": "mudra-aadhaar",
        "name": "Identity Proof (Aadhaar / Voter ID)",
        "type": "Aadhaar",
        "isMandatory": true,
        "purpose": "Identity KYC"
      },
      {
        "id": "mudra-address",
        "name": "Proof of Residence (Electricity bill / Domicile)",
        "type": "Domicile Certificate",
        "isMandatory": true,
        "purpose": "Address proof"
      },
      {
        "id": "mudra-bank",
        "name": "Bank Statement (Last 6 Months)",
        "type": "Bank Document",
        "isMandatory": true,
        "purpose": "Financial assessment"
      }
    ],
    "applicationProcess": [
      {
        "step": 1,
        "title": "Apply on Udyamitra Portal",
        "description": "Visit udyamitra.in or nearest bank branch."
      }
    ],
    "importantConditions": [
      "Loan must be utilized strictly for authorized business equipment or inventory."
    ],
    "officialSourceUrl": "https://www.mudra.org.in",
    "applicationUrl": "https://www.udyamitra.in",
    "tags": [
      "Business Loan",
      "Startup",
      "Micro Finance",
      "Self Employed",
      "Mudra"
    ],
    "isFeatured": true
  },
  {
    "id": "pmegp-business-scheme",
    "name": "Prime Minister's Employment Generation Programme (PMEGP)",
    "hindiName": "प्रधानमंत्री रोजगार सृजन कार्यक्रम (पीएमईजीपी)",
    "category": "Business",
    "level": "Central",
    "ministry": "Ministry of Micro, Small and Medium Enterprises (MSME) / KVIC",
    "shortDescription": "Credit-linked capital subsidy up to 35% on manufacturing projects up to ₹50 Lakh and service units up to ₹20 Lakh.",
    "detailedDescription": "PMEGP provides government margin money capital subsidies to set up new micro-enterprises in manufacturing and service sectors with special subsidies of 35% for rural women and SC/ST.",
    "benefits": [
      "Maximum project cost ₹50 Lakh (Manufacturing) and ₹20 Lakh (Service)",
      "Subsidy up to 35% for Special Categories (Women, SC/ST, Ex-servicemen, Rural)",
      "Bank finances remaining 60-65% as term loan and working capital"
    ],
    "eligibilitySummary": [
      "Any individual aged 18 years and above",
      "At least 8th standard pass for manufacturing units above ₹10 Lakh",
      "Only for new micro-enterprise units"
    ],
    "eligibilityCriteria": [
      {
        "id": "pmegp-age",
        "field": "age",
        "label": "Minimum Age",
        "operator": "gte",
        "value": 18,
        "description": "Must be 18+ years."
      },
      {
        "id": "pmegp-occ",
        "field": "occupation",
        "label": "Target Occupation",
        "operator": "in",
        "value": [
          "Self Employed",
          "Business Owner",
          "Unemployed"
        ],
        "description": "Aspiring entrepreneur."
      }
    ],
    "requiredDocuments": [
      {
        "id": "pmegp-dpr",
        "name": "Detailed Project Report (DPR)",
        "type": "Other",
        "isMandatory": true,
        "purpose": "Viability assessment"
      },
      {
        "id": "pmegp-aadhaar",
        "name": "Aadhaar Card & PAN",
        "type": "Aadhaar",
        "isMandatory": true,
        "purpose": "Identity"
      }
    ],
    "applicationProcess": [
      {
        "step": 1,
        "title": "Online Application on KVIC Portal",
        "description": "Apply on kviconline.gov.in/pmegpeportal."
      }
    ],
    "importantConditions": [
      "Beneficiary must undergo mandatory Entrepreneurship Development Programme (EDP) training."
    ],
    "officialSourceUrl": "https://www.kviconline.gov.in",
    "applicationUrl": "https://www.kviconline.gov.in/pmegpeportal/",
    "tags": [
      "PMEGP",
      "Subsidy",
      "Business",
      "Manufacturing",
      "Startup"
    ]
  },
  {
    "id": "stand-up-india-scheme",
    "name": "Stand-Up India Scheme for Women and SC/ST Entrepreneurs",
    "hindiName": "स्टैंड-अप इंडिया योजना (महिला एवं एससी/एसटी उद्यमी)",
    "category": "Business",
    "level": "Central",
    "ministry": "Department of Financial Services, Ministry of Finance",
    "shortDescription": "Bank loans between ₹10 Lakh and ₹1 Crore to at least one Woman and one SC/ST borrower per bank branch.",
    "detailedDescription": "Facilitates bank loans between ₹10 Lakh and ₹1 Crore to women and SC/ST entrepreneurs for setting up greenfield enterprises in manufacturing, services, or trading.",
    "benefits": [
      "Composite loan (term loan and working capital) from ₹10 Lakh to ₹1 Crore",
      "Repayable over 7 years with maximum 18 months moratorium period"
    ],
    "eligibilitySummary": [
      "SC/ST and/or Woman entrepreneurs above 18 years of age",
      "Greenfield enterprise (first time venture)",
      "In non-individual enterprises, 51% shareholding must be held by SC/ST/Woman"
    ],
    "eligibilityCriteria": [
      {
        "id": "standup-age",
        "field": "age",
        "label": "Age",
        "operator": "gte",
        "value": 18,
        "description": "Age 18+."
      }
    ],
    "requiredDocuments": [
      {
        "id": "standup-pan",
        "name": "PAN & Aadhaar Card",
        "type": "Aadhaar",
        "isMandatory": true,
        "purpose": "KYC"
      },
      {
        "id": "standup-project",
        "name": "Project Proposal & Quotations",
        "type": "Other",
        "isMandatory": true,
        "purpose": "Appraisal"
      }
    ],
    "applicationProcess": [
      {
        "step": 1,
        "title": "Apply on Stand-Up Mitra Portal",
        "description": "Register on standupmitra.in."
      }
    ],
    "importantConditions": [
      "Borrower should not be in default to any bank or financial institution."
    ],
    "officialSourceUrl": "https://www.standupmitra.in",
    "applicationUrl": "https://www.standupmitra.in",
    "tags": [
      "Women Entrepreneurship",
      "SC/ST",
      "Stand Up India",
      "Business Loan",
      "1 Crore"
    ]
  },
  {
    "id": "pm-svanidhi-street-vendor",
    "name": "PM Street Vendor's AtmaNirbhar Nidhi (PM SVANidhi)",
    "hindiName": "पीएम स्वनिधि योजना (स्ट्रीट वेंडर)",
    "category": "Business",
    "level": "Central",
    "ministry": "Ministry of Housing and Urban Affairs (MoHUA)",
    "shortDescription": "Collateral-free working capital micro-loans of ₹10,000, ₹20,000, and ₹50,000 with 7% interest subsidy for street vendors.",
    "detailedDescription": "Affordable credit to street vendors to restart livelihoods post pandemic with cash-back rewards up to ₹1,200 per year on digital transactions.",
    "benefits": [
      "1st tranche loan ₹10,000; 2nd tranche ₹20,000; 3rd tranche ₹50,000",
      "7% interest subsidy directly credited on prompt timely repayment",
      "Cashback up to ₹100 per month on digital UPI transactions"
    ],
    "eligibilitySummary": [
      "Street vendors engaged in vending in urban areas on or before March 2020",
      "Vendors possessing Certificate of Vending or Urban Local Body recommendation"
    ],
    "eligibilityCriteria": [
      {
        "id": "svanidhi-occ",
        "field": "occupation",
        "label": "Occupation",
        "operator": "in",
        "value": [
          "Business Owner",
          "Self Employed"
        ],
        "description": "Street vendor."
      }
    ],
    "requiredDocuments": [
      {
        "id": "svanidhi-aadhaar",
        "name": "Aadhaar Card with linked phone",
        "type": "Aadhaar",
        "isMandatory": true,
        "purpose": "Identity"
      },
      {
        "id": "svanidhi-vending",
        "name": "Certificate of Vending / LOR from Municipality",
        "type": "Other",
        "isMandatory": true,
        "purpose": "Vending proof"
      }
    ],
    "applicationProcess": [
      {
        "step": 1,
        "title": "Apply on PM SVANidhi Portal",
        "description": "Apply online on pmsvanidhi.mohua.gov.in."
      }
    ],
    "importantConditions": [
      "No collateral or mortgage required."
    ],
    "officialSourceUrl": "https://pmsvanidhi.mohua.gov.in",
    "applicationUrl": "https://pmsvanidhi.mohua.gov.in",
    "tags": [
      "Street Vendors",
      "Micro Loan",
      "PM SVANidhi",
      "Cashback",
      "Urban"
    ]
  },
  {
    "id": "cgtmse-credit-guarantee",
    "name": "Credit Guarantee Scheme for Micro & Small Enterprises (CGTMSE)",
    "hindiName": "सूक्ष्म एवं लघु उद्यमों के लिए क्रेडिट गारंटी योजना",
    "category": "Business",
    "level": "Central",
    "ministry": "Ministry of MSME / SIDBI",
    "shortDescription": "Government guarantee cover up to ₹5 Crore enabling collateral-free bank loans for new and expanding MSMEs.",
    "detailedDescription": "Provides guarantee cover up to 85% on credit facilities extended by banks to micro and small enterprises without asking for third party guarantee or collateral security.",
    "benefits": [
      "Guarantees bank loans up to ₹500 Lakhs without personal property mortgage",
      "85% guarantee cover for micro enterprises and women entrepreneurs"
    ],
    "eligibilitySummary": [
      "New and existing Micro and Small Enterprises in manufacturing and service."
    ],
    "eligibilityCriteria": [
      {
        "id": "cgtmse-occ",
        "field": "occupation",
        "label": "Occupation",
        "operator": "in",
        "value": [
          "Business Owner",
          "Self Employed"
        ],
        "description": "MSME promoter."
      }
    ],
    "requiredDocuments": [
      {
        "id": "cgtmse-udyam",
        "name": "Udyam Registration Certificate",
        "type": "Other",
        "isMandatory": true,
        "purpose": "MSME proof"
      }
    ],
    "applicationProcess": [
      {
        "step": 1,
        "title": "Apply through Lending Bank",
        "description": "Request CGTMSE coverage with MSME loan application."
      }
    ],
    "importantConditions": [
      "Modest annual guarantee fee paid by borrower/bank."
    ],
    "officialSourceUrl": "https://www.cgtmse.in",
    "applicationUrl": "https://www.cgtmse.in",
    "tags": [
      "MSME",
      "Credit Guarantee",
      "No Collateral",
      "Business Loan"
    ]
  },
  {
    "id": "msme-udyam-registration",
    "name": "MSME Udyam Registration Portal",
    "hindiName": "एमएसएमई उद्यम पंजीकरण",
    "category": "Business",
    "level": "Central",
    "ministry": "Ministry of Micro, Small and Medium Enterprises",
    "shortDescription": "Zero-cost government registration providing priority sector lending, lower bank interest, and protection against delayed payments.",
    "detailedDescription": "Official portal for paperless registration of micro, small, and medium businesses based on self-declaration with automatic integration of Income Tax and GST systems.",
    "benefits": [
      "Free lifetime Udyam Registration Number & digital certificate",
      "Concession on electricity bills, patent filings, and priority bank credit",
      "Statutory protection against delayed payments from buyers"
    ],
    "eligibilitySummary": [
      "Any business enterprise operating in manufacturing or service sector."
    ],
    "eligibilityCriteria": [
      {
        "id": "udyam-occ",
        "field": "occupation",
        "label": "Occupation",
        "operator": "in",
        "value": [
          "Business Owner",
          "Self Employed"
        ],
        "description": "Enterprise owner."
      }
    ],
    "requiredDocuments": [
      {
        "id": "udyam-aadhaar",
        "name": "Aadhaar Card of Proprietor / Director",
        "type": "Aadhaar",
        "isMandatory": true,
        "purpose": "Identity"
      },
      {
        "id": "udyam-pan",
        "name": "PAN & GSTIN",
        "type": "Other",
        "isMandatory": true,
        "purpose": "Tax data"
      }
    ],
    "applicationProcess": [
      {
        "step": 1,
        "title": "Register on Udyam Registration",
        "description": "Submit online form on udyamregistration.gov.in."
      }
    ],
    "importantConditions": [
      "Completely free of cost; no private agency fee required."
    ],
    "officialSourceUrl": "https://udyamregistration.gov.in",
    "applicationUrl": "https://udyamregistration.gov.in",
    "tags": [
      "MSME",
      "Udyam",
      "Business Registration",
      "Priority Lending"
    ]
  },
  {
    "id": "sukanya-samriddhi-yojana",
    "name": "Sukanya Samriddhi Yojana (SSY)",
    "hindiName": "सुकन्या समृद्धि योजना",
    "category": "Women",
    "level": "Central",
    "ministry": "Ministry of Finance / Department of Posts",
    "shortDescription": "High 8.2% tax-free interest government savings scheme for girl children with complete Section 80C tax exemption.",
    "detailedDescription": "A government-backed small savings scheme under the Beti Bachao Beti Padhao campaign offering highest sovereign interest rate and tax-exempt returns for higher education and marriage of daughters.",
    "benefits": [
      "Government guaranteed 8.2% annual compounded interest rate",
      "Triple tax exemption (EEE) under Section 80C of Income Tax Act",
      "Partial withdrawal permitted up to 50% once girl reaches age 18 for college education",
      "Matures in 21 years or on marriage after attaining 18 years"
    ],
    "eligibilitySummary": [
      "Girl child must be an Indian resident below 10 years of age at the time of opening",
      "Maximum two accounts per family (one for each girl child)"
    ],
    "eligibilityCriteria": [
      {
        "id": "ssy-age",
        "field": "age",
        "label": "Child Age",
        "operator": "lte",
        "value": 10,
        "description": "Account opened before child turns 10."
      },
      {
        "id": "ssy-gender",
        "field": "gender",
        "label": "Child Gender",
        "operator": "eq",
        "value": "Female",
        "description": "Girl child beneficiary."
      }
    ],
    "requiredDocuments": [
      {
        "id": "ssy-birth",
        "name": "Girl Child Birth Certificate",
        "type": "Other",
        "isMandatory": true,
        "purpose": "Age proof"
      },
      {
        "id": "ssy-parent-aadhaar",
        "name": "Parent/Guardian Aadhaar and PAN",
        "type": "Aadhaar",
        "isMandatory": true,
        "purpose": "Guardian KYC"
      }
    ],
    "applicationProcess": [
      {
        "step": 1,
        "title": "Visit Post Office or Bank",
        "description": "Submit account opening form at any India Post Office or commercial bank branch."
      }
    ],
    "importantConditions": [
      "Minimum deposit of ₹250 per financial year required to keep account active."
    ],
    "officialSourceUrl": "https://www.indiapost.gov.in",
    "applicationUrl": "https://www.indiapost.gov.in",
    "tags": [
      "Girl Child",
      "Savings",
      "Tax Free",
      "8.2% Interest",
      "Women Empowerment"
    ],
    "isFeatured": true
  },
  {
    "id": "mahila-samman-savings",
    "name": "Mahila Samman Savings Certificate (MSSC)",
    "hindiName": "महिला सम्मान बचत प्रमाणपत्र",
    "category": "Women",
    "level": "Central",
    "ministry": "Ministry of Finance",
    "shortDescription": "Guaranteed 7.5% p.a. fixed interest 2-year deposit scheme exclusively for women and girls up to ₹2 Lakh.",
    "detailedDescription": "Special small savings scheme for women offering high fixed interest rate of 7.5% compounded quarterly for a 2-year tenure with partial withdrawal facility.",
    "benefits": [
      "7.5% per annum fixed interest compounded quarterly",
      "Deposit from ₹1,000 up to ₹2,00,000",
      "Partial withdrawal up to 40% allowed after 1 year"
    ],
    "eligibilitySummary": [
      "Open to any woman or girl child (opened by guardian)",
      "Available across all Post Offices and authorized banks"
    ],
    "eligibilityCriteria": [
      {
        "id": "mssc-gender",
        "field": "gender",
        "label": "Gender",
        "operator": "eq",
        "value": "Female",
        "description": "Female applicants only."
      }
    ],
    "requiredDocuments": [
      {
        "id": "mssc-aadhaar",
        "name": "Aadhaar Card",
        "type": "Aadhaar",
        "isMandatory": true,
        "purpose": "KYC"
      },
      {
        "id": "mssc-pan",
        "name": "PAN Card",
        "type": "Other",
        "isMandatory": true,
        "purpose": "Tax KYC"
      }
    ],
    "applicationProcess": [
      {
        "step": 1,
        "title": "Apply at Post Office",
        "description": "Fill Form-1 at any Post Office or bank."
      }
    ],
    "importantConditions": [
      "Tenure is 2 years from date of deposit."
    ],
    "officialSourceUrl": "https://www.indiapost.gov.in",
    "applicationUrl": "https://www.indiapost.gov.in",
    "tags": [
      "Women",
      "Savings",
      "Fixed Deposit",
      "High Interest"
    ]
  },
  {
    "id": "pm-matru-vandana-yojana",
    "name": "Pradhan Mantri Matru Vandana Yojana (PMMVY)",
    "hindiName": "प्रधानमंत्री मातृ वंदना योजना",
    "category": "Women",
    "level": "Central",
    "ministry": "Ministry of Women and Child Development",
    "shortDescription": "Direct cash maternity incentive of ₹5,000 to ₹6,000 for pregnant women and lactating mothers.",
    "detailedDescription": "PMMVY provides financial incentive directly to mothers' bank accounts for safe institutional delivery, nutrition, and vaccination of infants.",
    "benefits": [
      "₹5,000 for 1st child (disbursed in two installments)",
      "₹6,000 for 2nd child if newborn is a girl child",
      "Direct DBT to Aadhaar-seeded bank account"
    ],
    "eligibilitySummary": [
      "Pregnant women and lactating mothers aged 19 years and above",
      "Excludes regular central/state government employees"
    ],
    "eligibilityCriteria": [
      {
        "id": "pmmvy-gender",
        "field": "gender",
        "label": "Gender",
        "operator": "eq",
        "value": "Female",
        "description": "Women only."
      },
      {
        "id": "pmmvy-age",
        "field": "age",
        "label": "Age",
        "operator": "gte",
        "value": 19,
        "description": "Age 19+."
      }
    ],
    "requiredDocuments": [
      {
        "id": "pmmvy-mcp",
        "name": "Mother and Child Protection (MCP) Card",
        "type": "Other",
        "isMandatory": true,
        "purpose": "Pregnancy record"
      },
      {
        "id": "pmmvy-aadhaar",
        "name": "Aadhaar Card of Mother",
        "type": "Aadhaar",
        "isMandatory": true,
        "purpose": "Identity"
      }
    ],
    "applicationProcess": [
      {
        "step": 1,
        "title": "Register on PMMVY Portal",
        "description": "Apply online at pmmvy.wcd.gov.in or through local Anganwadi centre."
      }
    ],
    "importantConditions": [
      "Registration must be done within prescribed timeframe from Last Menstrual Period (LMP)."
    ],
    "officialSourceUrl": "https://pmmvy.wcd.gov.in",
    "applicationUrl": "https://pmmvy.wcd.gov.in",
    "tags": [
      "Maternity",
      "Mother & Child",
      "Nutrition",
      "Women",
      "DBT"
    ]
  },
  {
    "id": "lakhpati-didi-initiative",
    "name": "Lakhpati Didi Initiative for Rural Women SHGs",
    "hindiName": "लखपति दीदी योजना",
    "category": "Women",
    "level": "Central",
    "ministry": "Ministry of Rural Development / Deendayal Antyodaya Yojana - NRLM",
    "shortDescription": "Empowers women in Self-Help Groups (SHGs) to earn at least ₹1 Lakh per year through micro-enterprises and digital skills.",
    "detailedDescription": "Skill development, interest-subvented bank loans, drone training, and market linkages to help 3 crore rural women achieve sustainable livelihood income of ₹1 Lakh+ annually.",
    "benefits": [
      "Collateral-free credit through Women SHG Community Investment Funds",
      "Free technical training in solar, drones, organic agriculture, and food processing",
      "Market linkage via government e-Marketplace (GeM)"
    ],
    "eligibilitySummary": [
      "Rural women member of an active Self-Help Group (SHG)",
      "Registered under Deendayal Antyodaya Yojana - NRLM"
    ],
    "eligibilityCriteria": [
      {
        "id": "lakhpati-gender",
        "field": "gender",
        "label": "Gender",
        "operator": "eq",
        "value": "Female",
        "description": "Female member."
      },
      {
        "id": "lakhpati-occ",
        "field": "occupation",
        "label": "Occupation",
        "operator": "in",
        "value": [
          "Self Employed",
          "Artisan",
          "Farmer",
          "Unemployed"
        ],
        "description": "SHG member."
      }
    ],
    "requiredDocuments": [
      {
        "id": "lakhpati-shg",
        "name": "SHG Member Passbook / ID",
        "type": "Other",
        "isMandatory": true,
        "purpose": "SHG membership"
      },
      {
        "id": "lakhpati-aadhaar",
        "name": "Aadhaar Card",
        "type": "Aadhaar",
        "isMandatory": true,
        "purpose": "Identity"
      }
    ],
    "applicationProcess": [
      {
        "step": 1,
        "title": "Apply through SHG Federation",
        "description": "Contact Gram Panchayat Village Organization or NRLM cluster."
      }
    ],
    "importantConditions": [
      "Must participate in micro-enterprise business planning."
    ],
    "officialSourceUrl": "https://nrlm.gov.in",
    "applicationUrl": "https://nrlm.gov.in",
    "tags": [
      "SHG",
      "Rural Women",
      "Micro Enterprise",
      "Livelihood",
      "Women"
    ]
  },
  {
    "id": "udyam-sakhi-women-portal",
    "name": "Udyam Sakhi Women Entrepreneurship Support",
    "hindiName": "उद्यम सखी पोर्टल",
    "category": "Women",
    "level": "Central",
    "ministry": "Ministry of Micro, Small and Medium Enterprises",
    "shortDescription": "Financial assistance, business mentorship, and marketing support exclusively for women entrepreneurs.",
    "detailedDescription": "A network dedicated to handholding women entrepreneurs to start, build, and grow micro businesses with access to subsidies, bank schemes, and exhibitions.",
    "benefits": [
      "One-stop access to women business loan schemes and subsidies",
      "Mentorship and DPR project preparation support"
    ],
    "eligibilitySummary": [
      "Any Indian woman aspiring to start or expand a micro or small enterprise."
    ],
    "eligibilityCriteria": [
      {
        "id": "usakhi-gender",
        "field": "gender",
        "label": "Gender",
        "operator": "eq",
        "value": "Female",
        "description": "Women only."
      }
    ],
    "requiredDocuments": [
      {
        "id": "usakhi-aadhaar",
        "name": "Aadhaar Card",
        "type": "Aadhaar",
        "isMandatory": true,
        "purpose": "Identity"
      }
    ],
    "applicationProcess": [
      {
        "step": 1,
        "title": "Register on Udyam Sakhi",
        "description": "Register on udyam-sakhi.com."
      }
    ],
    "importantConditions": [
      "Available across manufacturing, service, and trading sectors."
    ],
    "officialSourceUrl": "https://udyam-sakhi.com",
    "applicationUrl": "https://udyam-sakhi.com",
    "tags": [
      "Women Entrepreneur",
      "MSME",
      "Startup",
      "Women"
    ]
  },
  {
    "id": "haryana-matrushakti-udyamita",
    "name": "Haryana Matrushakti Udyamita Scheme",
    "hindiName": "हरियाणा मातृशक्ति उद्यमिता योजना",
    "category": "Women",
    "level": "State",
    "state": "Haryana",
    "ministry": "Haryana Women Development Corporation (HWDC)",
    "shortDescription": "Soft business loans up to ₹3 Lakh with 7% interest rebate for women entrepreneurs in Haryana.",
    "detailedDescription": "Financial assistance scheme by Haryana Government providing subsidised credit to women from low-income families to establish self-employment ventures.",
    "benefits": [
      "Term loan up to ₹3,00,000 through scheduled banks",
      "7% interest rebate subvention paid by Haryana Government for 3 years",
      "Zero processing fees"
    ],
    "eligibilitySummary": [
      "Permanent resident of Haryana with Parivar Pehchan Patra (PPP)",
      "Family annual income not exceeding ₹5,00,000",
      "Woman aged 18 to 60 years"
    ],
    "eligibilityCriteria": [
      {
        "id": "hrymatru-state",
        "field": "state",
        "label": "State Domicile",
        "operator": "eq",
        "value": "Haryana",
        "description": "Resident of Haryana."
      },
      {
        "id": "hrymatru-gender",
        "field": "gender",
        "label": "Gender",
        "operator": "eq",
        "value": "Female",
        "description": "Women only."
      },
      {
        "id": "hrymatru-income",
        "field": "income",
        "label": "Annual Income",
        "operator": "lte",
        "value": 500000,
        "description": "Income <= ₹5,00,000."
      },
      {
        "id": "hrymatru-age",
        "field": "age",
        "label": "Age",
        "operator": "gte",
        "value": 18,
        "description": "Age 18 to 60."
      }
    ],
    "requiredDocuments": [
      {
        "id": "hrymatru-ppp",
        "name": "Parivar Pehchan Patra (PPP)",
        "type": "Other",
        "isMandatory": true,
        "purpose": "Residency and income proof"
      },
      {
        "id": "hrymatru-project",
        "name": "Project Proposal / Activity Details",
        "type": "Other",
        "isMandatory": true,
        "purpose": "Business appraisal"
      }
    ],
    "applicationProcess": [
      {
        "step": 1,
        "title": "Apply through HWDC District Office",
        "description": "Submit application to District Manager, Haryana Women Development Corporation."
      }
    ],
    "importantConditions": [
      "Interest rebate disbursed provided loan installments are serviced regularly."
    ],
    "officialSourceUrl": "https://haryana.gov.in",
    "applicationUrl": "https://haryana.gov.in",
    "tags": [
      "Haryana",
      "Women Loan",
      "Interest Rebate",
      "State Scheme"
    ]
  },
  {
    "id": "ignoaps-old-age-pension",
    "name": "Indira Gandhi National Old Age Pension Scheme (IGNOAPS)",
    "hindiName": "इंदिरा गांधी राष्ट्रीय वृद्धावस्था पेंशन योजना",
    "category": "Senior Citizens",
    "level": "Central",
    "ministry": "Ministry of Rural Development / NSAP",
    "shortDescription": "Monthly social security pension for senior citizens aged 60+ belonging to Below Poverty Line (BPL) households.",
    "detailedDescription": "Provides monthly financial assistance to elderly citizens aged 60 and above who are living below the poverty line to ensure dignity and social security.",
    "benefits": [
      "Monthly pension of ₹1,000 to ₹3,000 (Central component topped up by State Government)",
      "Direct monthly bank credit via Direct Benefit Transfer (DBT)"
    ],
    "eligibilitySummary": [
      "Indian citizen aged 60 years or older",
      "Belongs to a household living Below the Poverty Line (BPL) under SECC"
    ],
    "eligibilityCriteria": [
      {
        "id": "ignoaps-age",
        "field": "age",
        "label": "Minimum Age",
        "operator": "gte",
        "value": 60,
        "description": "Age 60 years or above."
      },
      {
        "id": "ignoaps-income",
        "field": "income",
        "label": "Annual Income",
        "operator": "lte",
        "value": 200000,
        "description": "BPL family income ceiling."
      }
    ],
    "requiredDocuments": [
      {
        "id": "ignoaps-aadhaar",
        "name": "Aadhaar Card / Voter ID (Age Proof)",
        "type": "Aadhaar",
        "isMandatory": true,
        "purpose": "Age verification"
      },
      {
        "id": "ignoaps-bpl",
        "name": "BPL Ration Card / Income Certificate",
        "type": "Income Certificate",
        "isMandatory": true,
        "purpose": "BPL status"
      },
      {
        "id": "ignoaps-bank",
        "name": "Bank / Post Office Passbook",
        "type": "Bank Document",
        "isMandatory": true,
        "purpose": "Pension credit"
      }
    ],
    "applicationProcess": [
      {
        "step": 1,
        "title": "Apply on NSAP Portal or Tehsil",
        "description": "Apply online at nsap.nic.in or through local Block Development Officer (BDO)."
      }
    ],
    "importantConditions": [
      "Annual digital life certificate (Jeevan Pramaan) required."
    ],
    "officialSourceUrl": "https://nsap.nic.in",
    "applicationUrl": "https://nsap.nic.in",
    "tags": [
      "Senior Citizens",
      "Old Age Pension",
      "Pension",
      "BPL",
      "Social Security"
    ],
    "isFeatured": true
  },
  {
    "id": "senior-citizen-savings-scheme",
    "name": "Senior Citizen Savings Scheme (SCSS - 8.2% Interest)",
    "hindiName": "वरिष्ठ नागरिक बचत योजना",
    "category": "Senior Citizens",
    "level": "Central",
    "ministry": "Ministry of Finance / Department of Posts",
    "shortDescription": "Sovereign guaranteed 8.2% p.a. quarterly interest payout deposit scheme for citizens aged 60+ up to ₹30 Lakh.",
    "detailedDescription": "Government-backed retirement income scheme offering highest safe quarterly interest returns of 8.2% with Section 80C tax deduction benefits.",
    "benefits": [
      "8.2% per annum guaranteed sovereign interest rate paid quarterly",
      "Maximum deposit limit up to ₹30,00,000 per individual",
      "Section 80C tax deduction up to ₹1.5 Lakh per year"
    ],
    "eligibilitySummary": [
      "Individual aged 60 years or older on date of account opening",
      "Retired personnel aged 55+ under VRS can also open within 1 month of retirement benefits"
    ],
    "eligibilityCriteria": [
      {
        "id": "scss-age",
        "field": "age",
        "label": "Age",
        "operator": "gte",
        "value": 60,
        "description": "Age 60 years or above."
      }
    ],
    "requiredDocuments": [
      {
        "id": "scss-aadhaar",
        "name": "Aadhaar Card & PAN",
        "type": "Aadhaar",
        "isMandatory": true,
        "purpose": "Identity"
      },
      {
        "id": "scss-age-proof",
        "name": "Age Proof (Passport / Voter ID / Pension Card)",
        "type": "Other",
        "isMandatory": true,
        "purpose": "Age verification"
      }
    ],
    "applicationProcess": [
      {
        "step": 1,
        "title": "Open at Post Office or Bank",
        "description": "Visit any Post Office or public bank branch with cheque and KYC."
      }
    ],
    "importantConditions": [
      "Tenure of 5 years, extendable by 3 years."
    ],
    "officialSourceUrl": "https://www.indiapost.gov.in",
    "applicationUrl": "https://www.indiapost.gov.in",
    "tags": [
      "Senior Citizens",
      "SCSS",
      "8.2% Interest",
      "Retirement",
      "Safe Investment"
    ]
  },
  {
    "id": "rashtriya-vayoshri-yojana",
    "name": "Rashtriya Vayoshri Yojana (RVY - Assisted Living Devices)",
    "hindiName": "राष्ट्रीय वयोश्री योजना",
    "category": "Senior Citizens",
    "level": "Central",
    "ministry": "Ministry of Social Justice and Empowerment",
    "shortDescription": "Free distribution of wheelchairs, hearing aids, walking sticks, and spectacles for senior citizens from low-income families.",
    "detailedDescription": "Assists elderly citizens suffering from age-related infirmities by providing physical aids and assisted living devices manufactured by ALIMCO free of cost.",
    "benefits": [
      "Free high-quality assisted living devices (Wheelchairs, Hearing Aids, Spectacles, Dentures, Walking Sticks)",
      "Free medical assessment camp and device fitting"
    ],
    "eligibilitySummary": [
      "Senior citizen aged 60 years or above",
      "Monthly family income up to ₹15,000 or BPL card holder"
    ],
    "eligibilityCriteria": [
      {
        "id": "rvy-age",
        "field": "age",
        "label": "Age",
        "operator": "gte",
        "value": 60,
        "description": "Age 60+."
      },
      {
        "id": "rvy-income",
        "field": "income",
        "label": "Income",
        "operator": "lte",
        "value": 180000,
        "description": "Income <= ₹1,80,000."
      }
    ],
    "requiredDocuments": [
      {
        "id": "rvy-aadhaar",
        "name": "Aadhaar Card",
        "type": "Aadhaar",
        "isMandatory": true,
        "purpose": "Age proof"
      },
      {
        "id": "rvy-income-doc",
        "name": "BPL / Income Certificate",
        "type": "Income Certificate",
        "isMandatory": true,
        "purpose": "Income verification"
      }
    ],
    "applicationProcess": [
      {
        "step": 1,
        "title": "District ALIMCO Assessment Camp",
        "description": "Register at district health camp organized by ALIMCO."
      }
    ],
    "importantConditions": [
      "Devices distributed after on-spot clinical verification."
    ],
    "officialSourceUrl": "https://alimco.in",
    "applicationUrl": "https://alimco.in",
    "tags": [
      "Senior Citizens",
      "Assistive Devices",
      "Hearing Aid",
      "Wheelchair",
      "ALIMCO"
    ]
  },
  {
    "id": "atal-pension-yojana",
    "name": "Atal Pension Yojana (APY - Guaranteed Pension)",
    "hindiName": "अटल पेंशन योजना",
    "category": "Senior Citizens",
    "level": "Central",
    "ministry": "Pension Fund Regulatory and Development Authority (PFRDA)",
    "shortDescription": "Guaranteed lifetime monthly pension of ₹1,000 to ₹5,000 from age 60 for unorganized sector workers.",
    "detailedDescription": "Government-guaranteed pension scheme for workers in the unorganized sector with auto-debit contribution starting as low as ₹42 per month.",
    "benefits": [
      "Guaranteed monthly pension of ₹1,000, ₹2,000, ₹3,000, ₹4,000, or ₹5,000 after age 60",
      "Same pension payable to spouse upon subscriber's death, and return of full corpus to nominee"
    ],
    "eligibilitySummary": [
      "Indian citizen aged between 18 and 40 years",
      "Not an income tax payer",
      "Possessing a savings bank account"
    ],
    "eligibilityCriteria": [
      {
        "id": "apy-age",
        "field": "age",
        "label": "Joining Age",
        "operator": "lte",
        "value": 40,
        "description": "Joining age 18 to 40."
      }
    ],
    "requiredDocuments": [
      {
        "id": "apy-aadhaar",
        "name": "Aadhaar Card",
        "type": "Aadhaar",
        "isMandatory": true,
        "purpose": "KYC"
      },
      {
        "id": "apy-bank",
        "name": "Savings Bank Passbook",
        "type": "Bank Document",
        "isMandatory": true,
        "purpose": "Auto-debit"
      }
    ],
    "applicationProcess": [
      {
        "step": 1,
        "title": "Enroll via Bank",
        "description": "Register on net banking or submit form at bank branch."
      }
    ],
    "importantConditions": [
      "Must not be an income tax payer under current rules."
    ],
    "officialSourceUrl": "https://enps.nsdl.com",
    "applicationUrl": "https://enps.nsdl.com",
    "tags": [
      "Pension",
      "Retirement",
      "Atal Pension",
      "Guaranteed",
      "Social Security"
    ]
  },
  {
    "id": "pm-awas-yojana-urban",
    "name": "Pradhan Mantri Awas Yojana - Urban (PMAY-U 2.0)",
    "hindiName": "प्रधानमंत्री आवास योजना - शहरी (पीएमएवाई-यू)",
    "category": "Housing",
    "level": "Central",
    "ministry": "Ministry of Housing and Urban Affairs",
    "shortDescription": "Up to ₹2.50 Lakh financial subsidy for constructing or purchasing pucca houses in municipal urban areas.",
    "detailedDescription": "PMAY-U provides central financial assistance and interest subsidies to economically weaker sections (EWS) and lower income groups (LIG) living in urban areas.",
    "benefits": [
      "Up to ₹2.50 Lakh central assistance under Beneficiary-Led Construction (BLC)",
      "Interest subsidy on home loans for first-time pucca house buyers"
    ],
    "eligibilitySummary": [
      "Beneficiary family should not own a pucca house anywhere in India",
      "EWS family income up to ₹3,00,000; LIG family income up to ₹6,00,000",
      "Female ownership or co-ownership of house is mandatory"
    ],
    "eligibilityCriteria": [
      {
        "id": "pmayu-income",
        "field": "income",
        "label": "Annual Income",
        "operator": "lte",
        "value": 600000,
        "description": "Family income <= ₹6,00,000."
      }
    ],
    "requiredDocuments": [
      {
        "id": "pmayu-aadhaar",
        "name": "Aadhaar Card of all family members",
        "type": "Aadhaar",
        "isMandatory": true,
        "purpose": "Identity"
      },
      {
        "id": "pmayu-income",
        "name": "Income Certificate",
        "type": "Income Certificate",
        "isMandatory": true,
        "purpose": "Income classification"
      },
      {
        "id": "pmayu-land",
        "name": "Land Title / Registry / Patta",
        "type": "Other",
        "isMandatory": true,
        "purpose": "Land ownership"
      }
    ],
    "applicationProcess": [
      {
        "step": 1,
        "title": "Apply Online on PMAYMIS",
        "description": "Submit application on pmaymis.gov.in or at Common Services Centre (CSC)."
      }
    ],
    "importantConditions": [
      "House property must be registered in the name of the female head or joint ownership."
    ],
    "officialSourceUrl": "https://pmaymis.gov.in",
    "applicationUrl": "https://pmaymis.gov.in",
    "tags": [
      "Housing",
      "PMAY",
      "Pucca House",
      "Urban Subsidy",
      "Home Loan"
    ],
    "isFeatured": true
  },
  {
    "id": "pm-awas-yojana-gramin",
    "name": "Pradhan Mantri Awas Yojana - Gramin (PMAY-G)",
    "hindiName": "प्रधानमंत्री आवास योजना - ग्रामीण",
    "category": "Housing",
    "level": "Central",
    "ministry": "Ministry of Rural Development",
    "shortDescription": "Direct financial grant of ₹1.20 Lakh to ₹1.30 Lakh for building pucca houses in rural villages.",
    "detailedDescription": "Provides direct financial grants to rural households living in kutcha or dilapidated houses along with 90-95 days of unskilled labor wages under MGNREGA.",
    "benefits": [
      "₹1,20,000 grant in plain areas; ₹1,30,000 in hilly/difficult states",
      "Additional ₹12,000 grant for toilet construction under Swachh Bharat Mission",
      "90 days MGNREGA wages (approx ₹20,000) for construction labor"
    ],
    "eligibilitySummary": [
      "Houseless families or living in zero, one, or two-room kutcha houses",
      "Deprived households verified under Awaas+ survey list"
    ],
    "eligibilityCriteria": [
      {
        "id": "pmayg-income",
        "field": "income",
        "label": "Annual Income",
        "operator": "lte",
        "value": 200000,
        "description": "Rural low-income family."
      }
    ],
    "requiredDocuments": [
      {
        "id": "pmayg-aadhaar",
        "name": "Aadhaar Card",
        "type": "Aadhaar",
        "isMandatory": true,
        "purpose": "Identity"
      },
      {
        "id": "pmayg-bank",
        "name": "Bank Passbook",
        "type": "Bank Document",
        "isMandatory": true,
        "purpose": "Direct DBT installment"
      }
    ],
    "applicationProcess": [
      {
        "step": 1,
        "title": "AwaasSoft Selection",
        "description": "Gram Sabha validates beneficiary priority list on pmayg.nic.in."
      }
    ],
    "importantConditions": [
      "Geo-tagged photographs required at foundation, plinth, and lintel stages for installment releases."
    ],
    "officialSourceUrl": "https://pmayg.nic.in",
    "applicationUrl": "https://pmayg.nic.in",
    "tags": [
      "Rural Housing",
      "PMAY-G",
      "Pucca Ghar",
      "Gramin"
    ]
  },
  {
    "id": "swachh-bharat-ihhl-subsidy",
    "name": "Swachh Bharat Mission Individual Household Latrine (IHHL)",
    "hindiName": "स्वच्छ भारत मिशन व्यक्तिगत शौचालय अनुदान",
    "category": "Housing",
    "level": "Central",
    "ministry": "Ministry of Jal Shakti / MoHUA",
    "shortDescription": "Direct incentive grant of ₹12,000 for constructing an individual household toilet in rural and urban homes.",
    "detailedDescription": "Provides ₹12,000 direct subsidy to families lacking sanitation facilities to build safe hygienic household pour-flush latrines.",
    "benefits": [
      "₹12,000 direct benefit transfer in two installments",
      "Promotes hygiene and stops open defecation"
    ],
    "eligibilitySummary": [
      "Households without an existing toilet facility."
    ],
    "eligibilityCriteria": [
      {
        "id": "ihhl-gen",
        "field": "age",
        "label": "Age",
        "operator": "gte",
        "value": 18,
        "description": "Adult householder."
      }
    ],
    "requiredDocuments": [
      {
        "id": "ihhl-aadhaar",
        "name": "Aadhaar Card",
        "type": "Aadhaar",
        "isMandatory": true,
        "purpose": "Identity"
      },
      {
        "id": "ihhl-bank",
        "name": "Bank Passbook",
        "type": "Bank Document",
        "isMandatory": true,
        "purpose": "DBT"
      }
    ],
    "applicationProcess": [
      {
        "step": 1,
        "title": "Apply on SBM Portal",
        "description": "Register on sbm.gov.in."
      }
    ],
    "importantConditions": [
      "Geo-tagged photograph of completed toilet required."
    ],
    "officialSourceUrl": "https://sbm.gov.in",
    "applicationUrl": "https://sbm.gov.in",
    "tags": [
      "Sanitation",
      "Swachh Bharat",
      "Toilet Subsidy",
      "Housing"
    ]
  },
  {
    "id": "adip-scheme-disability",
    "name": "ADIP Scheme for Assistance to Disabled Persons",
    "hindiName": "दिव्यांगजनों को सहायता के लिए एडिप योजना",
    "category": "Disability",
    "level": "Central",
    "ministry": "Department of Empowerment of Persons with Disabilities",
    "shortDescription": "100% free distribution of motorized tricycles, braille kits, prosthetics, and cochlear implants for Divyangjan.",
    "detailedDescription": "ADIP assists needy persons with disabilities in procuring durable, modern, standard aids and appliances (motorized tricycles, smart canes, digital hearing aids, cochlear implants up to ₹6 Lakh) to promote independent living.",
    "benefits": [
      "Free motorized tricycles for persons with severe locomotor disability",
      "Full cost coverage of cochlear implant surgery for deaf children up to ₹6 Lakh",
      "Smart canes, DAISY players, and laptops with screen readers for visually impaired"
    ],
    "eligibilitySummary": [
      "Indian citizen with benchmark disability of 40% or more",
      "Monthly family income not exceeding ₹30,000 (100% grant up to ₹22,500; 50% grant up to ₹30,000)"
    ],
    "eligibilityCriteria": [
      {
        "id": "adip-disability",
        "field": "disability",
        "label": "Disability Percentage",
        "operator": "boolean",
        "value": true,
        "description": "Benchmark disability >= 40%."
      },
      {
        "id": "adip-income",
        "field": "income",
        "label": "Annual Income",
        "operator": "lte",
        "value": 360000,
        "description": "Monthly income <= ₹30,000."
      }
    ],
    "requiredDocuments": [
      {
        "id": "adip-udid",
        "name": "UDID Card or Disability Certificate",
        "type": "Other",
        "isMandatory": true,
        "purpose": "Disability authentication"
      },
      {
        "id": "adip-income",
        "name": "Income Certificate",
        "type": "Income Certificate",
        "isMandatory": true,
        "purpose": "Income compliance"
      }
    ],
    "applicationProcess": [
      {
        "step": 1,
        "title": "Register on ALIMCO / Swavlamban Portal",
        "description": "Apply on swavlambancard.gov.in or attend ALIMCO district camp."
      }
    ],
    "importantConditions": [
      "Aids can be provided again to the same beneficiary after an interval of 3 years."
    ],
    "officialSourceUrl": "https://disabilityaffairs.gov.in",
    "applicationUrl": "https://www.swavlambancard.gov.in",
    "tags": [
      "Divyangjan",
      "Disability",
      "Tricycle",
      "Hearing Aid",
      "Swavlamban"
    ],
    "isFeatured": true
  },
  {
    "id": "swavlamban-udid-card",
    "name": "Unique Disability ID (UDID) Card & Universal Pass",
    "hindiName": "विशिष्ट दिव्यांगता पहचान पत्र (यूडीआईडी)",
    "category": "Disability",
    "level": "Central",
    "ministry": "Department of Empowerment of Persons with Disabilities",
    "shortDescription": "Single national digital card for persons with disabilities to unlock railway concessions, bus passes, and scholarships.",
    "detailedDescription": "UDID project creates a national database and single unified smart card eliminating the need to carry multiple medical certificates across states.",
    "benefits": [
      "Nationally accepted digital identity and medical disability record",
      "Direct entitlement to railway travel concessions (up to 75% off) and bus passes",
      "Seamless eligibility for all central and state welfare benefits"
    ],
    "eligibilitySummary": [
      "Any Indian citizen with certified benchmark disability."
    ],
    "eligibilityCriteria": [
      {
        "id": "udid-pwd",
        "field": "disability",
        "label": "Disability",
        "operator": "boolean",
        "value": true,
        "description": "Certified disability."
      }
    ],
    "requiredDocuments": [
      {
        "id": "udid-aadhaar",
        "name": "Aadhaar Card",
        "type": "Aadhaar",
        "isMandatory": true,
        "purpose": "Identity"
      },
      {
        "id": "udid-medical",
        "name": "Medical Hospital Assessment Slip",
        "type": "Other",
        "isMandatory": true,
        "purpose": "Evaluation"
      }
    ],
    "applicationProcess": [
      {
        "step": 1,
        "title": "Apply on Swavlamban Portal",
        "description": "Apply online at swavlambancard.gov.in."
      }
    ],
    "importantConditions": [
      "Digital verification performed by government District Medical Board."
    ],
    "officialSourceUrl": "https://www.swavlambancard.gov.in",
    "applicationUrl": "https://www.swavlambancard.gov.in",
    "tags": [
      "UDID",
      "Disability Card",
      "Divyang",
      "Concessions"
    ]
  },
  {
    "id": "national-fellowship-pwd",
    "name": "National Fellowship for Persons with Disabilities (NFPwD)",
    "hindiName": "दिव्यांग विद्यार्थियों के लिए राष्ट्रीय फेलोशिप",
    "category": "Disability",
    "level": "Central",
    "ministry": "Department of Empowerment of Persons with Disabilities / UGC",
    "shortDescription": "₹37,000 monthly fellowship plus contingency grants for specially-abled students pursuing M.Phil and Ph.D. degrees.",
    "detailedDescription": "Awarded to 200 disabled students annually to pursue higher research degrees leading to M.Phil and Ph.D. in Sciences, Engineering, and Humanities.",
    "benefits": [
      "Junior Research Fellowship (JRF): ₹37,000 per month for initial 2 years",
      "Senior Research Fellowship (SRF): ₹42,000 per month for remaining 3 years",
      "Escort / Reader allowance of ₹3,000/month for blind candidates"
    ],
    "eligibilitySummary": [
      "Persons with benchmark disability of 40% or more",
      "Enrolled in regular full-time Ph.D. or M.Phil program in recognized university"
    ],
    "eligibilityCriteria": [
      {
        "id": "nfpwd-dis",
        "field": "disability",
        "label": "Disability Status",
        "operator": "boolean",
        "value": true,
        "description": "Disability >= 40%."
      },
      {
        "id": "nfpwd-edu",
        "field": "education",
        "label": "Education Level",
        "operator": "in",
        "value": [
          "Post Graduate",
          "Doctorate"
        ],
        "description": "M.Phil / Ph.D. researcher."
      }
    ],
    "requiredDocuments": [
      {
        "id": "nfpwd-udid",
        "name": "UDID Card",
        "type": "Other",
        "isMandatory": true,
        "purpose": "Disability proof"
      },
      {
        "id": "nfpwd-admission",
        "name": "University Ph.D. Admission Letter",
        "type": "College Bonafide",
        "isMandatory": true,
        "purpose": "Research enrollment"
      }
    ],
    "applicationProcess": [
      {
        "step": 1,
        "title": "Apply on NSP",
        "description": "Submit application under DEPwD on scholarships.gov.in."
      }
    ],
    "importantConditions": [
      "Fellowship awarded for maximum 5 years."
    ],
    "officialSourceUrl": "https://disabilityaffairs.gov.in",
    "applicationUrl": "https://scholarships.gov.in",
    "tags": [
      "Ph.D.",
      "Fellowship",
      "Disability",
      "Research",
      "Higher Education"
    ]
  },
  {
    "id": "pm-vishwakarma-yojana",
    "name": "PM Vishwakarma Scheme for Artisans and Craftspeople",
    "hindiName": "पीएम विश्वकर्मा योजना (कारीगर एवं शिल्पकार)",
    "category": "Employment",
    "level": "Central",
    "ministry": "Ministry of Micro, Small and Medium Enterprises",
    "shortDescription": "Free modern toolkits worth ₹15,000, 5-day skill training with ₹500/day stipend, and 5% concessional enterprise loans up to ₹3 Lakh.",
    "detailedDescription": "End-to-end holistic support for traditional artisans and craftspersons across 18 family trades (carpenters, blacksmiths, goldsmiths, potters, sculptors, cobblers, tailors) to scale their craft.",
    "benefits": [
      "PM Vishwakarma Certificate & Digital ID Card recognition",
      "₹15,000 e-voucher toolkit grant for modern equipment",
      "Skill training with daily stipend of ₹500 during basic (5-7 days) and advanced (15 days) training",
      "Collateral-free enterprise credit: 1st tranche up to ₹1,00,000 at 5% interest; 2nd tranche up to ₹2,00,000",
      "Incentives for digital transactions (₹1 per transaction up to 100 transactions/month)"
    ],
    "eligibilitySummary": [
      "Artisan or craftsperson working with hands and tools in one of the 18 recognized family trades",
      "Minimum age 18 years on date of application",
      "Applicant should not have availed loans under PMEGP or Mudra in past 5 years"
    ],
    "eligibilityCriteria": [
      {
        "id": "vishwa-age",
        "field": "age",
        "label": "Minimum Age",
        "operator": "gte",
        "value": 18,
        "description": "Age 18+."
      },
      {
        "id": "vishwa-occ",
        "field": "occupation",
        "label": "Occupation",
        "operator": "in",
        "value": [
          "Artisan",
          "Self Employed"
        ],
        "description": "Traditional artisan or trade worker."
      }
    ],
    "requiredDocuments": [
      {
        "id": "vishwa-aadhaar",
        "name": "Aadhaar Card with linked phone",
        "type": "Aadhaar",
        "isMandatory": true,
        "purpose": "Biometric verification"
      },
      {
        "id": "vishwa-bank",
        "name": "Bank Account Passbook",
        "type": "Bank Document",
        "isMandatory": true,
        "purpose": "Stipend and toolkit credit"
      },
      {
        "id": "vishwa-ration",
        "name": "Ration Card / Family Proof",
        "type": "Ration Card",
        "isMandatory": true,
        "purpose": "One member per family rule"
      }
    ],
    "applicationProcess": [
      {
        "step": 1,
        "title": "Biometric Enrolment at CSC",
        "description": "Visit local Common Services Centre (CSC) with trade verification."
      },
      {
        "step": 2,
        "title": "Three-tier Verification",
        "description": "Grama Panchayat / Urban Local Body verifies trade practice."
      },
      {
        "step": 3,
        "title": "Skill Training & Toolkit Grant",
        "description": "Complete training at ITI/training center and receive toolkit grant."
      }
    ],
    "importantConditions": [
      "Benefit restricted to one member per household family.",
      "Active practice of trade verified by local municipal/panchayat committee."
    ],
    "officialSourceUrl": "https://pmvishwakarma.gov.in",
    "applicationUrl": "https://pmvishwakarma.gov.in",
    "tags": [
      "Artisans",
      "Craftspeople",
      "Skill Development",
      "Toolkits",
      "Concessional Loan"
    ],
    "isFeatured": true
  },
  {
    "id": "pmkvy-skill-india",
    "name": "Pradhan Mantri Kaushal Vikas Yojana (PMKVY 4.0)",
    "hindiName": "प्रधानमंत्री कौशल विकास योजना (पीएमकेवीवाई)",
    "category": "Employment",
    "level": "Central",
    "ministry": "Ministry of Skill Development and Entrepreneurship (MSDE)",
    "shortDescription": "100% free industry-aligned skill certification, on-job training, and job placement assistance for youth across 300+ job roles.",
    "detailedDescription": "Flagship skill certification scheme of MSDE to enable Indian youth to take up industry-relevant skill training including emerging tech like AI, robotics, IoT, and drones with complete government sponsorship.",
    "benefits": [
      "Completely free skill certification training aligned to National Skill Qualification Framework (NSQF)",
      "Daily conveyance allowance and assessment certification",
      "Direct job placement drives and apprenticeship linkages"
    ],
    "eligibilitySummary": [
      "Indian citizen aged between 15 and 45 years",
      "Unemployed youth, school/college dropouts, or jobseekers"
    ],
    "eligibilityCriteria": [
      {
        "id": "pmkvy-age",
        "field": "age",
        "label": "Age",
        "operator": "gte",
        "value": 15,
        "description": "Age 15 to 45."
      },
      {
        "id": "pmkvy-occ",
        "field": "occupation",
        "label": "Occupation",
        "operator": "in",
        "value": [
          "Unemployed",
          "Student",
          "Self Employed"
        ],
        "description": "Youth jobseeker."
      }
    ],
    "requiredDocuments": [
      {
        "id": "pmkvy-aadhaar",
        "name": "Aadhaar Card",
        "type": "Aadhaar",
        "isMandatory": true,
        "purpose": "Identity"
      },
      {
        "id": "pmkvy-bank",
        "name": "Bank Passbook",
        "type": "Bank Document",
        "isMandatory": true,
        "purpose": "Direct incentive"
      }
    ],
    "applicationProcess": [
      {
        "step": 1,
        "title": "Register on Skill India Digital",
        "description": "Register on skillindiadigital.gov.in or pmkvyofficial.org."
      }
    ],
    "importantConditions": [
      "Mandatory 70% attendance required to appear for NSQF assessment."
    ],
    "officialSourceUrl": "https://www.pmkvyofficial.org",
    "applicationUrl": "https://www.pmkvyofficial.org",
    "tags": [
      "Skill India",
      "PMKVY",
      "Free Training",
      "Placement",
      "Youth Employment"
    ]
  }
];

export const CATEGORIES_LIST = [
  "Education",
  "Employment",
  "Agriculture",
  "Healthcare",
  "Housing",
  "Women",
  "Disability",
  "Business",
  "Financial Assistance",
  "Skill Development",
  "Senior Citizens",
  "Rural Development",
  "Student Welfare"
] as const;
