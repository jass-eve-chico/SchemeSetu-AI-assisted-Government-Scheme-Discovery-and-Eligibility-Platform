# SchemeSetu (स्कीमसेतु) — "Government Schemes, Simplified."

> **AI-Powered Indian Citizen Assistance Platform**  
> Recreating government welfare accessibility for every citizen through natural language discovery, deterministic eligibility evaluation, document verification, and human-in-the-loop application assistance.

---

## 🏛️ Key Features

1. **Natural Language AI Search & Intent Extraction**
   - Citizen enters: *"I am a B.Tech student and my family income is below 3 lakh. I need a scholarship."*
   - Engine parses structured filters: `{ category: "Education", occupation: "Student", education: "B.Tech", income_max: 300000 }` and renders structured badges.

2. **Scheme Discovery & Rich Catalog**
   - 12+ realistic flagship central & state schemes across all 9 categories (Education, Employment, Agriculture, Healthcare, Housing, Women, Disability, Business, Financial Assistance).
   - Clear distinction between AI assistance and official government links.
   - Transparent disclaimer: *"Verify final eligibility on the official government portal."*

3. **Interactive Eligibility Checker**
   - Multi-step wizard (Demographics, Academic & Occupation, Financial & Social Category).
   - Evaluates criteria with breakdown:
     - `✓ Education requirement matches (B.Tech)`
     - `✓ Income requirement matches (≤ ₹3,00,000)`
     - `✓ Student status matches`
     - `⚠ Additional condition requires institutional verification`
   - Score calculation (e.g. `92% Match - Potentially Eligible`).

4. **Citizen Document Vault & OCR Scanner**
   - Compares uploaded user documents against scheme requirements.
   - Dynamic checklist:
     - `✓ Aadhaar Card`
     - `✓ Marksheet`
     - `✓ Income Certificate`
     - `✗ Domicile Certificate (1 document may be missing)`
   - Drag-and-drop simulated OCR scanner extracting certificate holder, issue dates, and expiry dates.

5. **Human-In-The-Loop Form Assistant**
   - Automatically maps extracted document fields to government form fields.
   - Interactive field-by-field review.
   - Strict verification gate: **Zero silent submissions**.

6. **"My Applications" Real-Time Tracker**
   - Tracks application numbers, submission dates, current stages, and next required steps with milestone roadmaps.

7. **Multilingual AI Assistant (SchemeSaathi)**
   - Conversational assistance supporting English, Hindi, and Hinglish.
   - Quick prompts: *"Mujhe scholarship chahiye"*, *"Income certificate kahan use hota hai?"*, *"Is scheme ke liye kaunse documents chahiye?"*.

8. **User & Admin Dashboards**
   - User Dashboard: Personalized greeting, ranked recommendations with *"Why this is recommended"* insights, and saved bookmarks.
   - Admin Dashboard: KPI metrics, analytics on popular categories, and catalog CRUD management.

---

## 🚀 Quick Start Guide

### Frontend (React + Vite + TypeScript + Tailwind CSS)
```bash
cd schemesetu
npm install
npm run dev
```
The application will launch at `http://localhost:3000`.

To create a production bundle:
```bash
npm run build
```

### Backend (FastAPI)
```bash
cd schemesetu/backend
pip install -r requirements.txt
python main.py
```
FastAPI runs on `http://localhost:8000` with Swagger docs at `http://localhost:8000/docs`.

### Database (Supabase PostgreSQL)
Run the SQL migration script located in `supabase/schema.sql` inside your Supabase SQL editor. It defines all 11 tables with Row Level Security (RLS) policies.

---

## 🎯 Step-by-Step Hackathon Demo Walkthrough

1. **Open SchemeSetu**: Start on the Homepage with the national portal companion header.
2. **Natural Language Search**: Enter `"I am a B.Tech student and my family income is below 3 lakh. I need a scholarship."`
3. **AI Recognizes Intent**: Notice the green intent banner with chips (`Education: B.Tech`, `Student`, `Max Income: ₹3,00,000`).
4. **Matching Schemes**: See *Post Matric Scholarship* and *PM-USP Central Sector Scholarship*.
5. **View Details**: Open *Post Matric Scholarship* to read the official ministry overview, benefits, and documents.
6. **Check Eligibility**: Click *"Check Eligibility"*.
7. **Fill Profile**: Step through demographics, academic status (B.Tech), and family income (₹2,40,000).
8. **View Breakdown**: Inspect the criteria breakdown (`✓ Education matches`, `✓ Income matches`, `⚠ Institutional verification`).
9. **Open Document Checklist**: Notice that *Domicile Certificate* is marked as missing (*"1 document may be missing"*).
10. **Upload Document**: Click *"Upload"*, drop the Domicile certificate, watch the AI OCR scan extract the authority and certificate number, and add it to the vault.
11. **Form Assistant**: Open Form Assistant to see auto-populated fields from verified documents.
12. **Review & Confirm**: Review the populated fields, click *"Confirm Details"*, and inspect the confirmation gate.
13. **Application Tracker**: View the newly tracked application under *"My Applications"* with timeline milestones.
14. **Test SchemeSaathi AI**: Open the AI chat drawer, click *"Mujhe scholarship chahiye"*, and read the structured Hinglish response.
15. **Multilingual Toggle**: Click the language switcher in the header to switch between English and हिन्दी.
