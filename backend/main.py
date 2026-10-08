import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from schemas import SearchRequest, IntentResponse, EligibilityCheckRequest, ChatRequest, ChatResponse

load_dotenv()

app = FastAPI(
    title="SchemeSetu API",
    description="Backend API for SchemeSetu AI Citizen Assistance Platform",
    version="1.0.0"
)

# Enable CORS for Vite frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")

@app.get("/")
def read_root():
    return {
        "status": "healthy",
        "service": "SchemeSetu Government Welfare AI Assistant",
        "gemini_active": bool(GEMINI_API_KEY)
    }

@app.post("/api/search", response_model=IntentResponse)
def parse_intent(req: SearchRequest):
    query = req.query.lower()
    
    # Deterministic NLP Intent Parsing (100% reliable fallback)
    category = None
    occupation = None
    education = None
    income_max = None
    keywords = []
    
    if "b.tech" in query or "engineering" in query:
        education = "B.Tech"
        occupation = "Student"
        keywords.append("B.Tech")
    elif "student" in query:
        occupation = "Student"
        keywords.append("Student")
        
    if "3 lakh" in query or "300000" in query or "3l" in query:
        income_max = 300000.0
        keywords.append("Income <= 3L")
        
    if "scholarship" in query or "chatravriti" in query:
        category = "Education"
        keywords.append("Scholarship")
    elif "mudra" in query or "business" in query:
        category = "Employment"
        keywords.append("Business Loan")
    elif "kisan" in query or "farmer" in query:
        category = "Agriculture"
        keywords.append("Farmer Support")
    elif "health" in query or "ayushman" in query:
        category = "Healthcare"
        keywords.append("Health Cover")
        
    explanation = f"Intent recognized: {category or 'General'} Welfare for {occupation or 'Citizen'}"
    
    return IntentResponse(
        category=category,
        occupation=occupation,
        education=education,
        income_max=income_max,
        keywords=keywords,
        explanation=explanation
    )

@app.post("/api/chat", response_model=ChatResponse)
def handle_chat(req: ChatRequest):
    msg = req.message.lower().strip()
    
    # 1. Greetings
    if msg in ["hello", "hi", "hey", "namaste", "pranam"] or any(msg.startswith(g) for g in ["hello ", "hi ", "namaste "]):
        return ChatResponse(
            reply="Namaste! Mai SchemeSetu AI assistant hoon. Aap mujhse kisi bhi central ya state government scheme ke baare me pooch sakte hain.",
            short_explanation="SchemeSetu connects you to 500+ Indian government schemes with clear eligibility and document roadmaps.",
            eligibility_points=["Available to all Indian citizens across states", "Students, farmers, women entrepreneurs, and senior citizens"],
            required_documents=["Aadhaar Card", "Income Certificate"],
            next_action="Ask about scholarships, PM-KISAN, business loans, or check your eligibility."
        )

    # 2. Documents inquiry
    if "document" in msg or "documents" in msg or "kagaz" in msg or "certificate" in msg:
        if "scholarship" in msg or "student" in msg:
            return ChatResponse(
                reply="Scholarship aavedan ke liye yeh mukhya documents aavashyak hain:\n1. Aadhaar Card (Aadhaar-seeded bank account)\n2. Parivarik Aay Praman Patra (≤ ₹3 Lakh p.a.)\n3. Pichli Kaksha ki Marksheet (Class 12th / Semester)\n4. College Bonafide Certificate & Fee Receipt\n5. Domicile Certificate (if state-specific)",
                short_explanation="Mandatory document checklist for NSP & state post-matric scholarships.",
                eligibility_points=["Income certificate must be valid for current FY", "Bonafide issued by registered college/institute"],
                required_documents=["Aadhaar Card", "Income Certificate", "Class 12th Marksheet", "College Bonafide", "Bank Passbook"],
                next_action="Upload and verify these files in the Document Vault."
            )
        return ChatResponse(
            reply="Sarkari yojanaon ke aavedan me aamtaur par Aadhaar Card, Aay Praman Patra (Income Certificate), Niwas Praman Patra (Domicile), aur Bank Passbook ki aavashyakta hoti hai.",
            short_explanation="Core documents required for most central & state government welfare schemes.",
            eligibility_points=["Aadhaar must be linked to active bank account (NPCI-seeded)"],
            required_documents=["Aadhaar Card", "Income Certificate", "Domicile Certificate", "Bank Passbook"],
            next_action="Upload documents in the Document Vault to check compliance."
        )

    # 3. Farmer / PM-Kisan
    if "kisan" in msg or "farmer" in msg or "kheti" in msg:
        return ChatResponse(
            reply="Kisano ke liye mukhya central scheme hai **PM-KISAN Samman Nidhi Yojana**.\n• Labh: ₹6,000 varshik direct bank transfer (3 installments of ₹2,000)\n• Patrata: Sabhi bhoomi-dharak kisan parivar (except institutional landholders & high taxpayers)\n• Portal: pmkisan.gov.in",
            short_explanation="Direct financial assistance of ₹6,000/year to landholding farmer families across India.",
            eligibility_points=["Landholding farmer family in state revenue records", "Active Aadhaar-seeded DBT bank account", "Completed eKYC on PM-KISAN portal"],
            required_documents=["Aadhaar Card", "Land Ownership Documents (Khatauni / Khasra / Jamabandi)", "Bank Passbook"],
            next_action="Check status or register fresh on pmkisan.gov.in."
        )

    # 4. Ayushman Bharat / Healthcare
    if "ayushman" in msg or "health" in msg or "ilaj" in msg or "hospital" in msg:
        return ChatResponse(
            reply="**Ayushman Bharat PM-JAY (Pradhan Mantri Jan Arogya Yojana)**:\n• Labh: Har eligible parivar ko ₹5,00,000 varshik cash-less secondary aur tertiary hospital cover.\n• Patrata: SECC 2011 me listed rural/urban poor parivar aur sabhi 70+ varshiya varishth nagrik.\n• Hospital: Empanelled public & private hospital me cash-free ilaj.",
            short_explanation="Annual cashless health coverage of up to ₹5,00,000 per family for hospitalization.",
            eligibility_points=["Deprived household identified under SECC database", "All senior citizens aged 70+ irrespective of income"],
            required_documents=["Aadhaar Card", "Ration Card (NFSA) / PM-JAY Family ID"],
            next_action="Check your name on beneficiaries.nha.gov.in and download your Ayushman Card."
        )

    # 5. Women Entrepreneurship / Business Loans / Mudra
    if "woman" in msg or "women" in msg or "mahila" in msg or "business" in msg or "mudra" in msg or "startup" in msg or "loan" in msg:
        return ChatResponse(
            reply="Mahila udyamiyon aur business shuru karne ke liye mukhya yojanaayein:\n1. **PM Mudra Yojana**: Shishu (₹50k), Kishore (₹5L), Tarun (₹10L) bina kisi collateral ke.\n2. **PMEGP Scheme**: 25% se 35% tak government capital subsidy nayi manufacturing ya service unit ke liye.\n3. **Stand-Up India**: SC/ST aur Mahila udyamiyon ke liye ₹10 Lakh se ₹1 Crore tak loan.",
            short_explanation="Collateral-free business loans and up to 35% capital subsidy for women and micro-entrepreneurs.",
            eligibility_points=["Age 18+ years", "Viable business project / enterprise", "Valid identity & address proof"],
            required_documents=["Aadhaar Card", "PAN Card", "Business Project Proposal / Quotation", "Bank Statement (6 months)"],
            next_action="Apply on official Udyamitra portal (udyamitra.in) or KVIC PMEGP portal."
        )

    # 6. Senior Citizens (60+ / 65+)
    if "60" in msg or "65" in msg or "70" in msg or "senior" in msg or "elderly" in msg or "vriddha" in msg or "pension" in msg:
        return ChatResponse(
            reply="Varishth nagrikon (Senior Citizens) ke liye pramukh yojanaayein:\n1. **Ayushman Bharat PM-JAY**: Sabhi 70+ varshiya nagrikon ke liye ₹5 Lakh health cover.\n2. **Indira Gandhi National Old Age Pension Scheme (IGNOAPS)**: BPL parivaron ke 60+ varshiya nagrikon ko monthly pension.\n3. **Senior Citizen Savings Scheme (SCSS)**: 8.2% p.a. guaranteed interest rate post-office scheme.",
            short_explanation="Guaranteed social security pensions, high-interest savings, and universal free healthcare.",
            eligibility_points=["Age 60 years or above", "Valid age and identity proof"],
            required_documents=["Aadhaar Card / Voter ID", "Age Proof", "Bank Passbook / Post Office Account", "Income Certificate (for pensions)"],
            next_action="Apply through your State Social Welfare portal or local Post Office."
        )

    # 7. Scholarship / Students (B.Tech, College)
    if "scholarship" in msg or "b.tech" in msg or "student" in msg or "padhai" in msg or "engineering" in msg:
        return ChatResponse(
            reply="B.Tech aur College students ke liye National Scholarship Portal (NSP) par mukhya scholarships:\n1. **Post-Matric Scholarship Scheme**: Full tuition reimbursement aur monthly maintenance allowance (Family income ≤ ₹2.5L-₹3L).\n2. **PM-USP Central Sector Scheme**: ₹12,000/year (UG) aur ₹20,000/year (PG) for top 80th percentile students (Family income ≤ ₹4.5L).\n• Apply on: scholarships.gov.in",
            short_explanation="Tuition reimbursement and academic stipends up to ₹1,20,000 p.a. via Direct Benefit Transfer.",
            eligibility_points=[
                "B.Tech / Degree student enrolled in regular recognized institution",
                "Family income below Rs 3,00,000 p.a. (Post-Matric) or Rs 4,50,000 p.a. (PM-USP)",
                "Minimum 50% qualifying marks in Class 12th"
            ],
            required_documents=[
                "Aadhaar Card (Aadhaar-seeded bank account)",
                "Income Certificate (Current FY)",
                "Class 12th Marksheet",
                "College Bonafide Certificate & Fee Receipt"
            ],
            next_action="Register on National Scholarship Portal (scholarships.gov.in) and use Form Assistant to auto-fill."
        )

    # 8. General fallback
    return ChatResponse(
        reply="Namaste! Mai SchemeSetu AI assistant hoon. Aap mujhse kisi bhi central ya state scheme ke baare me pooch sakte hain.",
        short_explanation="SchemeSetu connects you to 500+ Indian government schemes with clear document roadmaps.",
        eligibility_points=["All Indian citizens"],
        required_documents=["Aadhaar Card", "Income Certificate"],
        next_action="Use our Eligibility Checker to analyze your personalized match."
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
