import React, { useState } from 'react';
import { Scheme, SchemeCategory } from '../../types/scheme';
import { CATEGORIES_LIST } from '../../data/schemesData';
import { X, Plus, Trash2 } from 'lucide-react';

interface SchemeFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (scheme: Scheme) => void;
  initialScheme?: Scheme | null;
}

export const SchemeFormModal: React.FC<SchemeFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialScheme
}) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState<Partial<Scheme>>(
    initialScheme || {
      id: `custom-scheme-${Date.now()}`,
      name: '',
      hindiName: '',
      category: 'Education',
      level: 'Central',
      ministry: '',
      shortDescription: '',
      detailedDescription: '',
      benefits: ['Monthly direct financial grant', 'Tuition support'],
      eligibilitySummary: ['Indian Citizen', 'Annual family income <= ₹3,00,000'],
      eligibilityCriteria: [
        {
          id: 'crit-income',
          field: 'income',
          label: 'Annual Income',
          operator: 'lte',
          value: 300000,
          description: 'Family income ceiling'
        }
      ],
      requiredDocuments: [
        { id: 'doc-1', name: 'Aadhaar Card', type: 'Aadhaar', isMandatory: true, purpose: 'Identity' },
        { id: 'doc-2', name: 'Income Certificate', type: 'Income Certificate', isMandatory: true, purpose: 'Income verification' }
      ],
      applicationProcess: [
        { step: 1, title: 'Portal Registration', description: 'Register online' },
        { step: 2, title: 'Document Scrutiny', description: 'Institutional verification' }
      ],
      importantConditions: ['Must not have availed overlapping scholarship'],
      officialSourceUrl: 'https://india.gov.in',
      applicationUrl: 'https://scholarships.gov.in',
      tags: ['Welfare', 'Assistance'],
      isFeatured: false
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.ministry) {
      onSave(formData as Scheme);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-6 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">
            {initialScheme ? 'Edit Scheme' : 'Add New Government Scheme'}
          </h3>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4 text-xs sm:text-sm">
          <div>
            <label className="block text-slate-700 font-bold mb-1">Scheme Name (English) *</label>
            <input
              type="text"
              required
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-slate-300"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">Scheme Name (Hindi)</label>
            <input
              type="text"
              value={formData.hindiName || ''}
              onChange={(e) => setFormData({ ...formData, hindiName: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-slate-300"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Category *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as SchemeCategory })}
                className="w-full p-2.5 rounded-xl border border-slate-300"
              >
                {CATEGORIES_LIST.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Government Level *</label>
              <select
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: e.target.value as any })}
                className="w-full p-2.5 rounded-xl border border-slate-300"
              >
                <option value="Central">Central</option>
                <option value="State">State</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">Ministry / Department *</label>
            <input
              type="text"
              required
              value={formData.ministry || ''}
              onChange={(e) => setFormData({ ...formData, ministry: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-slate-300"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">Short Description *</label>
            <textarea
              required
              rows={2}
              value={formData.shortDescription || ''}
              onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-slate-300"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Official Portal URL</label>
              <input
                type="url"
                value={formData.officialSourceUrl || ''}
                onChange={(e) => setFormData({ ...formData, officialSourceUrl: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-300"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-bold mb-1">Application URL</label>
              <input
                type="url"
                value={formData.applicationUrl || ''}
                onChange={(e) => setFormData({ ...formData, applicationUrl: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-300"
              />
            </div>
          </div>

          <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-2 -mx-6 -mb-6 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-bold"
            >
              Save Scheme
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
