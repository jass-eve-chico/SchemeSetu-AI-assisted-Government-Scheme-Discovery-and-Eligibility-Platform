from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class SearchRequest(BaseModel):
    query: str
    language: Optional[str] = "en"

class IntentResponse(BaseModel):
    category: Optional[str] = None
    occupation: Optional[str] = None
    education: Optional[str] = None
    income_max: Optional[float] = None
    state: Optional[str] = None
    intent: Optional[str] = None
    keywords: List[str] = []
    explanation: str

class EligibilityCheckRequest(BaseModel):
    scheme_id: str
    age: int
    gender: str
    state: str
    district: str
    education: str
    is_student: bool
    occupation: str
    annual_family_income: float
    social_category: str
    is_differently_abled: bool

class ChatRequest(BaseModel):
    message: str
    language: Optional[str] = "en"

class ChatResponse(BaseModel):
    reply: str
    short_explanation: Optional[str] = None
    eligibility_points: Optional[List[str]] = None
    required_documents: Optional[List[str]] = None
    next_action: Optional[str] = None
