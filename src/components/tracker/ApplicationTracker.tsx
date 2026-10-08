import React from 'react';
import { Application, ApplicationStatus } from '../../types/application';
import { Badge } from '../common/Badge';
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Calendar,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Send
} from 'lucide-react';
import { Language, TRANSLATIONS } from '../../data/translations';

interface ApplicationTrackerProps {
  applications: Application[];
  language: Language;
  onExploreSchemes: () => void;
}

export const ApplicationTracker: React.FC<ApplicationTrackerProps> = ({
  applications,
  language,
  onExploreSchemes
}) => {
  const t = TRANSLATIONS[language];

  const getStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case 'Approved':
        return (
          <Badge variant="emerald" size="sm" icon={<CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}>
            {t.statusApproved}
          </Badge>
        );
      case 'Under Review':
        return (
          <Badge variant="blue" size="sm" icon={<Clock className="w-3.5 h-3.5 text-blue-600" />}>
            {t.statusUnderReview}
          </Badge>
        );
      case 'Submitted':
        return (
          <Badge variant="amber" size="sm" icon={<Send className="w-3.5 h-3.5 text-amber-600" />}>
            {t.statusSubmitted}
          </Badge>
        );
      case 'Action Required':
        return (
          <Badge variant="red" size="sm" icon={<AlertCircle className="w-3.5 h-3.5 text-rose-600" />}>
            {t.statusActionRequired}
          </Badge>
        );
      default:
        return <Badge variant="slate" size="sm">{status}</Badge>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Tracker Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-2">
            <Clock className="w-3.5 h-3.5 text-emerald-700" />
            <span>Real-time Welfare Lifecycle Tracker</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {t.trackerTitle}
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            {t.trackerSubtitle}
          </p>
        </div>

        <button
          onClick={onExploreSchemes}
          className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm self-start sm:self-center transition-colors"
        >
          + Track Another Scheme
        </button>
      </div>

      {/* Applications List */}
      <div className="space-y-6">
        {applications.map((app) => (
          <div
            key={app.id}
            className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow space-y-6"
          >
            {/* Top Bar of Application */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    {t.applicationId}:
                  </span>
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-800">
                    {app.applicationNumber}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Applied: {app.appliedDate}</span>
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900">
                  {app.schemeName}
                </h3>
              </div>

              <div>{getStatusBadge(app.status)}</div>
            </div>

            {/* Current Stage & Next Step */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Current Stage
                </span>
                <p className="text-sm font-bold text-slate-800">{app.currentStage}</p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-100 space-y-1">
                <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
                  {t.nextStepLabel}
                </span>
                <p className="text-sm font-semibold text-emerald-900">{app.nextStep}</p>
              </div>
            </div>

            {/* Timeline Milestones */}
            {app.timeline && app.timeline.length > 0 && (
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  {t.timelineLabel}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {app.timeline.map((event, idx) => (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-xl border flex flex-col justify-between ${
                        event.completed
                          ? 'bg-emerald-50/40 border-emerald-200 text-emerald-950'
                          : 'bg-slate-50 border-slate-200 text-slate-400'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold text-slate-400">Step {idx + 1}</span>
                        {event.completed ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Clock className="w-4 h-4 text-slate-400" />
                        )}
                      </div>
                      <div className="font-bold text-xs text-slate-900 mb-1">{event.title}</div>
                      <div className="text-[11px] text-slate-500 leading-tight">{event.description}</div>
                      <div className="text-[10px] font-semibold text-slate-400 mt-2">{event.date}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Application Footer */}
            {app.officialPortalUrl && (
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">
                  Last synchronized with national DBT database: {app.lastUpdated}
                </span>

                <a
                  href={app.officialPortalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-bold text-emerald-700 hover:text-emerald-800"
                >
                  <span>Open Official Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
