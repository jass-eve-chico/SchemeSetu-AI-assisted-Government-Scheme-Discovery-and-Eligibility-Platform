import React, { useState } from 'react';
import { UserDocument } from '../../types/document';
import { DocumentChecklist } from './DocumentChecklist';
import { DocumentUploader } from './DocumentUploader';
import {
  FileText,
  Upload,
  CheckCircle2,
  AlertCircle,
  Trash2,
  Eye,
  ShieldCheck,
  Calendar,
  Lock
} from 'lucide-react';
import { Language, TRANSLATIONS } from '../../data/translations';

interface DocumentVaultProps {
  documents: UserDocument[];
  onAddDocument: (doc: UserDocument) => void;
  onRemoveDocument: (id: string) => void;
  language: Language;
}

export const DocumentVault: React.FC<DocumentVaultProps> = ({
  documents,
  onAddDocument,
  onRemoveDocument,
  language
}) => {
  const t = TRANSLATIONS[language];
  const [uploaderOpen, setUploaderOpen] = useState(false);
  const [targetMissingType, setTargetMissingType] = useState<any>('Domicile Certificate');
  const [selectedDocDetails, setSelectedDocDetails] = useState<UserDocument | null>(null);

  const handleUploadMissing = (missingDocName: string) => {
    setTargetMissingType(missingDocName.includes('Domicile') ? 'Domicile Certificate' : 'Other');
    setUploaderOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Vault Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-2">
            <Lock className="w-3.5 h-3.5 text-emerald-700" />
            <span>Encrypted Citizen Locker</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {t.docVaultTitle}
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            {t.docVaultSubtitle}
          </p>
        </div>

        <button
          onClick={() => {
            setTargetMissingType('Domicile Certificate');
            setUploaderOpen(true);
          }}
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all active:scale-98 self-start sm:self-center"
        >
          <Upload className="w-4 h-4" />
          <span>{t.uploadDocument}</span>
        </button>
      </div>

      {/* Document Readiness Checklist Comparison */}
      <DocumentChecklist
        userDocuments={documents}
        onUploadMissing={handleUploadMissing}
      />

      {/* Stored Documents Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">
            Stored Certificates & Identification ({documents.length})
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-emerald-800 bg-emerald-100/60 px-2 py-0.5 rounded-md">
                        {doc.type}
                      </span>
                      <p className="text-xs text-slate-400 mt-0.5 font-medium">
                        {doc.fileSize || '1.2 MB'}
                      </p>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>OCR Verified</span>
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-900 line-clamp-1 mb-1">
                  {doc.name}
                </h4>

                {doc.documentNumber && (
                  <p className="text-xs font-mono text-slate-600 mb-3">
                    ID: {doc.documentNumber}
                  </p>
                )}

                {/* Extracted Fields Highlights */}
                {doc.extractedFields && doc.extractedFields.length > 0 && (
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1 mb-4 text-xs">
                    {doc.extractedFields.slice(0, 2).map((field, idx) => (
                      <div key={idx} className="flex justify-between text-slate-600">
                        <span className="text-slate-400">{field.label}:</span>
                        <span className="font-semibold text-slate-800">{field.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{doc.uploadedAt}</span>
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onRemoveDocument(doc.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Delete document"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upload Modal */}
      <DocumentUploader
        isOpen={uploaderOpen}
        onClose={() => setUploaderOpen(false)}
        onDocumentUploaded={(newDoc) => {
          onAddDocument(newDoc);
        }}
        defaultDocType={targetMissingType}
      />
    </div>
  );
};
