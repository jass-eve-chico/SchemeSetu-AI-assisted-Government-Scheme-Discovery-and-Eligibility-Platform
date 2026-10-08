import React, { useState } from 'react';
import { Scheme } from '../../types/scheme';
import { SchemeFormModal } from './SchemeFormModal';
import {
  Users,
  FileCheck2,
  CheckCircle2,
  Sparkles,
  Plus,
  Trash2,
  Edit,
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  FolderOpen
} from 'lucide-react';
import { Language, TRANSLATIONS } from '../../data/translations';

interface AdminDashboardProps {
  schemes: Scheme[];
  onAddScheme: (scheme: Scheme) => void;
  onDeleteScheme: (id: string) => void;
  language: Language;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  schemes,
  onAddScheme,
  onDeleteScheme,
  language
}) => {
  const t = TRANSLATIONS[language];
  const [modalOpen, setModalOpen] = useState(false);
  const [editingScheme, setEditingScheme] = useState<Scheme | null>(null);

  const metrics = [
    { label: t.totalUsers, value: '2,54,190', change: '+14% this month', icon: Users, color: 'text-blue-600 bg-blue-50' },
    { label: t.totalSchemes, value: schemes.length.toString(), change: 'Central & State Gazette', icon: FolderOpen, color: 'text-emerald-600 bg-emerald-50' },
    { label: t.totalChecks, value: '84,310', change: '98% criteria hit rate', icon: CheckCircle2, color: 'text-amber-600 bg-amber-50' },
    { label: t.totalAssisted, value: '39,400', change: 'Zero silent submission', icon: FileCheck2, color: 'text-teal-600 bg-teal-50' },
  ];

  const categoryBreakdown = [
    { cat: 'Education & Scholarships', percentage: 38, count: '96.5k checks' },
    { cat: 'Employment & Mudra Loans', percentage: 26, count: '66.1k checks' },
    { cat: 'Agriculture & PM-KISAN', percentage: 18, count: '45.7k checks' },
    { cat: 'Healthcare & Ayushman Bharat', percentage: 12, count: '30.5k checks' },
    { cat: 'Housing & Financial Inclusion', percentage: 6, count: '15.2k checks' },
  ];

  const handleEdit = (scheme: Scheme) => {
    setEditingScheme(scheme);
    setModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingScheme(null);
    setModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Nodal Officer & Administrative Console</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {t.adminTitle}
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            {t.adminSubtitle}
          </p>
        </div>

        <button
          onClick={handleAddNew}
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all active:scale-98 self-start sm:self-center"
        >
          <Plus className="w-4 h-4" />
          <span>{t.addNewScheme}</span>
        </button>
      </div>

      {/* Analytics KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {metrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{m.label}</span>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${m.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="text-3xl font-extrabold text-slate-900">{m.value}</div>
              <div className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                <TrendingUp className="w-3 h-3 text-emerald-600" />
                <span>{m.change}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Popular Categories Analytics */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-5">
        <h3 className="text-base font-bold text-slate-900">
          Popular Citizen Search Categories
        </h3>
        <div className="space-y-3">
          {categoryBreakdown.map((cat, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-slate-700">
                <span>{cat.cat}</span>
                <span className="text-slate-500">{cat.count} ({cat.percentage}%)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-emerald-600 h-2 rounded-full"
                  style={{ width: `${cat.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scheme Management Table */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-5">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <h3 className="text-base font-bold text-slate-900">
            Catalog Scheme Management ({schemes.length})
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[11px] font-bold">
              <tr>
                <th className="p-3 rounded-l-xl">Scheme Name</th>
                <th className="p-3">Category</th>
                <th className="p-3">Level</th>
                <th className="p-3">Ministry</th>
                <th className="p-3">Official Link</th>
                <th className="p-3 rounded-r-xl text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {schemes.map((scheme) => (
                <tr key={scheme.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="p-3 font-bold text-slate-900 max-w-xs truncate">
                    {scheme.name}
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-semibold text-xs">
                      {scheme.category}
                    </span>
                  </td>
                  <td className="p-3 text-slate-600 font-medium">{scheme.level}</td>
                  <td className="p-3 text-slate-500 text-xs max-w-[200px] truncate">{scheme.ministry}</td>
                  <td className="p-3">
                    <a
                      href={scheme.officialSourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 hover:underline flex items-center gap-1 text-xs"
                    >
                      <span>Link</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                  <td className="p-3 text-right space-x-2">
                    <button
                      onClick={() => handleEdit(scheme)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
                      title="Edit scheme"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDeleteScheme(scheme.id)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Delete scheme"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Scheme Form Modal */}
      <SchemeFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={(newScheme) => {
          onAddScheme(newScheme);
        }}
        initialScheme={editingScheme}
      />
    </div>
  );
};
