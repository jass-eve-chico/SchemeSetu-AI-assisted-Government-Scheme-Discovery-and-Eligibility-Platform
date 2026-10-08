import React, { useState } from 'react';
import { DocumentType, UserDocument } from '../../types/document';
import {
  UploadCloud,
  FileCheck2,
  AlertCircle,
  X,
  ScanLine,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface DocumentUploaderProps {
  isOpen: boolean;
  onClose: () => void;
  onDocumentUploaded: (doc: UserDocument) => void;
  defaultDocType?: DocumentType;
}

export const DocumentUploader: React.FC<DocumentUploaderProps> = ({
  isOpen,
  onClose,
  onDocumentUploaded,
  defaultDocType = 'Domicile Certificate'
}) => {
  if (!isOpen) return null;

  const [docType, setDocType] = useState<DocumentType>(defaultDocType);
  const [fileName, setFileName] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [extractedPreview, setExtractedPreview] = useState<any>(null);

  const docTypes: DocumentType[] = [
    'Aadhaar',
    'Income Certificate',
    'Marksheet',
    'Domicile Certificate',
    'Caste Certificate',
    'Bank Document',
    'Disability Certificate',
    'College Bonafide',
    'Ration Card'
  ];

  const handleSimulateUpload = () => {
    const selectedName = fileName || `${docType.replace(/\s+/g, '_')}_Official.pdf`;
    setFileName(selectedName);
    setIsScanning(true);

    // Simulate AI OCR scanning
    setTimeout(() => {
      let fields: any[] = [];
      let docNumber = '';

      switch (docType) {
        case 'Domicile Certificate':
          docNumber = 'DOM/MH/2023/88192';
          fields = [
            { label: 'Citizen Name', value: 'Rahul Sharma', confidence: 0.99 },
            { label: 'Permanent Resident Of', value: 'Maharashtra, India', confidence: 0.98 },
            { label: 'Issuing Officer', value: 'Sub-Divisional Magistrate, Pune', confidence: 0.96 },
            { label: 'Issue Date', value: '18/11/2023', confidence: 0.97 }
          ];
          break;

        case 'Aadhaar':
          docNumber = 'XXXX-XXXX-4921';
          fields = [
            { label: 'Full Name', value: 'Rahul Sharma', confidence: 0.99 },
            { label: 'DOB', value: '14/08/2004', confidence: 0.98 },
            { label: 'Gender', value: 'Male', confidence: 0.99 }
          ];
          break;

        case 'Income Certificate':
          docNumber = 'INC/MH/2024/99104';
          fields = [
            { label: 'Household Head', value: 'Suresh Sharma', confidence: 0.98 },
            { label: 'Certified Income', value: '₹2,40,000 p.a.', confidence: 0.99 },
            { label: 'Expiry Date', value: '31/03/2027', confidence: 0.95 }
          ];
          break;

        default:
          docNumber = `DOC/${Math.floor(100000 + Math.random() * 900000)}`;
          fields = [
            { label: 'Holder Name', value: 'Rahul Sharma', confidence: 0.97 },
            { label: 'Document Category', value: docType, confidence: 0.98 },
            { label: 'Verification Status', value: 'Authentic Stamp Detected', confidence: 0.95 }
          ];
      }

      const newDoc: UserDocument = {
        id: `doc-${Date.now()}`,
        name: selectedName,
        type: docType,
        fileSize: '1.4 MB',
        uploadedAt: new Date().toISOString().split('T')[0],
        documentNumber: docNumber,
        isVerified: true,
        status: 'Valid',
        extractedFields: fields
      };

      setExtractedPreview(newDoc);
      setIsScanning(false);
      setScanComplete(true);
    }, 1200);
  };

  const handleSaveToVault = () => {
    if (extractedPreview) {
      onDocumentUploaded(extractedPreview);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-emerald-50 to-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-600 text-white">
              <ScanLine className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Upload & AI OCR Scan Document
              </h3>
              <p className="text-xs text-slate-500">
                Extract certificate fields & verify checklist readiness
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {!scanComplete ? (
            <>
              {/* Document Type Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Select Document Category
                </label>
                <select
                  value={docType}
                  onChange={(e) => setDocType(e.target.value as any)}
                  className="w-full p-3 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 font-medium text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                >
                  {docTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Drag & Drop Upload Zone */}
              <div
                onClick={handleSimulateUpload}
                className="border-2 border-dashed border-emerald-300 hover:border-emerald-500 rounded-2xl p-8 text-center bg-emerald-50/30 hover:bg-emerald-50/60 transition-colors cursor-pointer group"
              >
                <div className="w-14 h-14 rounded-full bg-white shadow-xs text-emerald-600 flex items-center justify-center mx-auto mb-3 group-hover:scale-105 transition-transform">
                  <UploadCloud className="w-7 h-7" />
                </div>
                <p className="text-sm font-bold text-slate-800 mb-1">
                  Click to select sample file or drag here
                </p>
                <p className="text-xs text-slate-500">
                  Supports PDF, JPG, PNG (Max 5MB) • Client-side OCR encrypted
                </p>
              </div>

              {isScanning && (
                <div className="p-4 rounded-xl bg-slate-900 text-white flex items-center gap-3 animate-pulse">
                  <Sparkles className="w-5 h-5 text-amber-400 animate-spin" />
                  <div className="text-xs font-medium">
                    AI OCR Scanning document layers & verifying government stamps...
                  </div>
                </div>
              )}
            </>
          ) : (
            /* Scanning Completed Preview */
            <div className="space-y-4 animate-in fade-in">
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-emerald-900">
                    Document Successfully Identified!
                  </h4>
                  <p className="text-xs text-emerald-700">
                    Type: <span className="font-semibold">{extractedPreview.type}</span> • Status: Valid
                  </p>
                </div>
              </div>

              {/* Extracted Fields */}
              <div>
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                  Extracted Metadata (AI OCR):
                </span>
                <div className="space-y-2 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  {extractedPreview.extractedFields.map((f: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-medium">{f.label}:</span>
                      <span className="font-bold text-slate-900">{f.value}</span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-200/60">
                    <span className="text-slate-500">Document No:</span>
                    <span className="font-mono font-bold text-emerald-700">{extractedPreview.documentNumber}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-2.5">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-200 text-xs sm:text-sm font-semibold"
          >
            Cancel
          </button>

          {!scanComplete ? (
            <button
              onClick={handleSimulateUpload}
              disabled={isScanning}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-xs transition-colors"
            >
              {isScanning ? 'Scanning...' : 'Upload & Scan'}
            </button>
          ) : (
            <button
              onClick={handleSaveToVault}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-md transition-colors"
            >
              Save to Document Vault
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
