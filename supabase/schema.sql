-- ==============================================================================
-- SCHEMESETU: DATABASE SCHEMA MIGRATION (Supabase PostgreSQL)
-- Description: Complete schema for SchemeSetu citizen assistance platform
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE (Linked with Supabase Auth users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    age INTEGER CHECK (age >= 0),
    gender TEXT CHECK (gender IN ('Male', 'Female', 'Other', 'Prefer not to say')),
    state TEXT NOT NULL,
    district TEXT NOT NULL,
    education TEXT NOT NULL,
    is_student BOOLEAN DEFAULT false,
    occupation TEXT NOT NULL,
    annual_family_income NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    social_category TEXT CHECK (social_category IN ('General', 'OBC', 'SC', 'ST', 'EWS')),
    is_differently_abled BOOLEAN DEFAULT false,
    disability_percentage NUMERIC(5, 2),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. SCHEMES TABLE (Central and State Government Schemes Catalog)
CREATE TABLE IF NOT EXISTS public.schemes (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    hindi_name TEXT,
    category TEXT NOT NULL CHECK (category IN (
        'Education', 'Employment', 'Agriculture', 'Healthcare',
        'Housing', 'Women', 'Disability', 'Business', 'Financial Assistance'
    )),
    level TEXT NOT NULL CHECK (level IN ('Central', 'State')),
    state TEXT,
    ministry TEXT NOT NULL,
    short_description TEXT NOT NULL,
    detailed_description TEXT NOT NULL,
    benefits JSONB NOT NULL DEFAULT '[]'::jsonb,
    eligibility_summary JSONB NOT NULL DEFAULT '[]'::jsonb,
    application_process JSONB NOT NULL DEFAULT '[]'::jsonb,
    important_conditions JSONB NOT NULL DEFAULT '[]'::jsonb,
    official_source_url TEXT NOT NULL,
    application_url TEXT NOT NULL,
    tags TEXT[] DEFAULT ARRAY[]::TEXT[],
    is_featured BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. SCHEME ELIGIBILITY RULES TABLE
CREATE TABLE IF NOT EXISTS public.scheme_eligibility_rules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    scheme_id TEXT NOT NULL REFERENCES public.schemes(id) ON DELETE CASCADE,
    field TEXT NOT NULL, -- 'income', 'education', 'occupation', 'age', 'gender', etc.
    label TEXT NOT NULL,
    operator TEXT NOT NULL CHECK (operator IN ('lte', 'gte', 'eq', 'in', 'boolean')),
    value JSONB NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. SCHEME DOCUMENTS REQUIREMENT TABLE
CREATE TABLE IF NOT EXISTS public.scheme_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    scheme_id TEXT NOT NULL REFERENCES public.schemes(id) ON DELETE CASCADE,
    document_name TEXT NOT NULL,
    document_type TEXT NOT NULL,
    is_mandatory BOOLEAN DEFAULT true,
    purpose TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. SAVED SCHEMES (Citizen Bookmarks)
CREATE TABLE IF NOT EXISTS public.saved_schemes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    scheme_id TEXT NOT NULL REFERENCES public.schemes(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, scheme_id)
);

-- 6. ELIGIBILITY CHECKS (Audit Log of Evaluation Runs)
CREATE TABLE IF NOT EXISTS public.eligibility_checks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    scheme_id TEXT NOT NULL REFERENCES public.schemes(id) ON DELETE CASCADE,
    match_score INTEGER NOT NULL CHECK (match_score >= 0 AND match_score <= 100),
    overall_status TEXT NOT NULL, -- 'Potentially Eligible', 'Needs Verification', 'Likely Ineligible'
    breakdown JSONB NOT NULL,
    checked_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. DOCUMENTS TABLE (Citizen Encrypted Document Vault)
CREATE TABLE IF NOT EXISTS public.documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    file_name TEXT NOT NULL,
    document_type TEXT NOT NULL,
    file_url TEXT,
    document_number TEXT,
    issue_date DATE,
    expiry_date DATE,
    is_verified BOOLEAN DEFAULT false,
    extracted_fields JSONB DEFAULT '[]'::jsonb,
    status TEXT DEFAULT 'Valid' CHECK (status IN ('Valid', 'Needs Review', 'Expired')),
    uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. APPLICATIONS TABLE (My Applications Tracker)
CREATE TABLE IF NOT EXISTS public.applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    scheme_id TEXT NOT NULL REFERENCES public.schemes(id) ON DELETE RESTRICT,
    application_number TEXT UNIQUE NOT NULL,
    applicant_name TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Submitted' CHECK (status IN (
        'Draft', 'Submitted', 'Under Review', 'Documents Verified', 'Approved', 'Action Required', 'Disbursed'
    )),
    current_stage TEXT NOT NULL,
    next_step TEXT NOT NULL,
    timeline JSONB NOT NULL DEFAULT '[]'::jsonb,
    form_data JSONB NOT NULL DEFAULT '{}'::jsonb,
    official_portal_url TEXT,
    applied_date DATE DEFAULT CURRENT_DATE,
    last_updated TIMESTAMPTZ DEFAULT NOW()
);

-- 9. NOTIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('application_update', 'new_scheme', 'document_expiry', 'system')),
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. AUDIT REPORTS & INQUIRIES TABLE
CREATE TABLE IF NOT EXISTS public.reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    scheme_id TEXT REFERENCES public.schemes(id) ON DELETE SET NULL,
    report_type TEXT NOT NULL,
    description TEXT NOT NULL,
    status TEXT DEFAULT 'Pending' CHECK (status IN ('Pending', 'Investigating', 'Resolved')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. CHAT SESSIONS & MESSAGES (AI Assistant History)
CREATE TABLE IF NOT EXISTS public.chat_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL DEFAULT 'New Conversation',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.chat_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID NOT NULL REFERENCES public.chat_sessions(id) ON DELETE CASCADE,
    sender TEXT NOT NULL CHECK (sender IN ('user', 'assistant', 'system')),
    content TEXT NOT NULL,
    structured_data JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.schemes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scheme_eligibility_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scheme_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_schemes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.eligibility_checks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- Schemes & Rules: Public read access
CREATE POLICY "Public read schemes" ON public.schemes FOR SELECT USING (true);
CREATE POLICY "Public read scheme rules" ON public.scheme_eligibility_rules FOR SELECT USING (true);
CREATE POLICY "Public read scheme docs" ON public.scheme_documents FOR SELECT USING (true);

-- User Private Data: Strict owner-only access
CREATE POLICY "Users read own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users access own documents" ON public.documents FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users access own applications" ON public.applications FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users access own saved schemes" ON public.saved_schemes FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users access own notifications" ON public.notifications FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users access own chat history" ON public.chat_sessions FOR ALL USING (auth.uid() = user_id);
