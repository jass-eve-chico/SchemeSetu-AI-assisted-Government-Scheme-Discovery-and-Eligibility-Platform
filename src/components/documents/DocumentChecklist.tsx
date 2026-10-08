import React from 'react';
import { UserDocument } from '../../types/document';
import { Scheme } from '../../types/scheme';
import { CheckCircle2, XCircle, AlertCircle, FileText, ArrowRight } from 'lucide-react';

interface DocumentChecklistProps {
  scheme?: Scheme;
  userDocuments: UserDocument[];
  onUploadMissing: (missingDocName: string) => void;
}

export const DocumentChecklist: React.FC<DocumentChecklistProps> = ({
  scheme,
  userDocuments,
  onUploadMissing
}) => {
  // Required documents (default to Post-Matric Scholarship checklist if none specified)
  const requiredList = scheme?.requiredDocuments || [
    { id: '1', name: 'Aadhaar Card', type: 'Aadhaar', isMandatory: true, purpose: 'Identity & DBT' },
    { id: '2', name: 'Previous Year Marksheet', type: 'Marksheet', isMandatory: true, purpose: 'Merit verification' },
    { id: '3', name: 'Income Certificate', type: 'Income Certificate', isMandatory: true, purpose: 'Means testing' },
    { id: '4', name: 'Domicile Certificate', type: 'Domicile Certificate', isMandatory: true, purpose: 'State residency proof' },
  ];

  // Map checklist
  const checklist = requiredList.map((req) => {
    const found = userDocuments.find((d) => d.type === req.type);
    return {
      req,
      isAvailable: Boolean(found),
      document: found
    };
  });

  const missingCount = checklist.filter((item) => !item.isAvailable && item.req.isMandatory).length;

  return (
    <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-600" />
            <span>Document Readiness Checklist</span>
          </h3>
          <p className="text-xs text-slate-500">
            {scheme ? `Required for: ${scheme.name}` : 'Standard Higher Education & Scholarship Checklist'}
          </p>
        </div>

        <div>
          {missingCount === 0 ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>All Documents Ready</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span>{missingCount} document{missingCount > 1 ? 's' : ''} may be missing</span>
            </span>
          )}
        </div>
      </div>

      {/* Checklist Items */}
      <div className="space-y-3">
        {checklist.map((item, idx) => {
          return (
            <div
              key={idx}
              className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 transition-colors ${
                item.isAvailable
                  ? 'bg-emerald-50/50 border-emerald-200/80 text-slate-900'
                  : 'bg-rose-50/40 border-rose-200/80 text-slate-700'
              }`}
            >
              <div className="flex items-center gap-3">
                {item.isAvailable ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : (
                  <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                )}

                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs sm:text-sm text-slate-900">
                      {item.req.name}
                    </span>
                    {item.req.isMandatory && (
                      <span className="text-[10px] font-semibold text-rose-600">
                        *Required
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500">
                    {item.isAvailable
                      ? `Uploaded: ${item.document?.name} (Verified via OCR)`
                      : `Missing • ${item.req.purpose}`}
                  </p>
                </div>
              </div>

              {!item.isAvailable && (
                <button
                  onClick={() => onUploadMissing(item.req.name)}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-colors shrink-0"
                >
                  Upload
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
