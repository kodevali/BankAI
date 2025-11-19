import React from 'react';
import { CheckCircle2, Circle, Clock } from 'lucide-react';
import { PhaseStatus, ProjectPhase, Activity } from '../types';

interface ScheduleViewProps {
  phases: ProjectPhase[];
  onUpdateActivity: (phaseId: number, activityIndex: number, field: keyof Activity, value: any) => void;
}

const ScheduleView: React.FC<ScheduleViewProps> = ({ phases, onUpdateActivity }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Project Schedule</h2>
        <p className="text-slate-500">Phased execution plan for the bank-wide rollout.</p>
      </div>

      <div className="space-y-4">
        {phases.map((phase, index) => {
          const isCompleted = phase.status === PhaseStatus.Completed;
          const isActive = phase.status === PhaseStatus.Active;
          
          return (
            <div 
              key={phase.id} 
              className={`relative bg-white border rounded-xl p-6 transition-all duration-300 ${
                isActive ? 'border-blue-500 ring-1 ring-blue-200 shadow-lg' : 'border-slate-200 shadow-sm hover:border-blue-300'
              }`}
            >
              {/* Connector Line (visual only) */}
              {index !== phases.length - 1 && (
                <div className="absolute left-9 top-16 bottom-[-24px] w-0.5 bg-slate-200 -z-10 hidden md:block" />
              )}

              <div className="flex flex-col md:flex-row md:items-start gap-4">
                {/* Status Icon */}
                <div className="flex-shrink-0 mt-1">
                  {isCompleted ? (
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                  ) : isActive ? (
                    <div className="relative">
                      <span className="absolute inline-flex h-8 w-8 animate-ping rounded-full bg-blue-400 opacity-25"></span>
                      <Clock className="relative w-8 h-8 text-blue-600" />
                    </div>
                  ) : (
                    <Circle className="w-8 h-8 text-slate-300" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                    <h3 className={`text-lg font-bold ${isActive ? 'text-blue-700' : 'text-slate-800'}`}>
                      {phase.name}
                    </h3>
                    <span className="text-sm font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded">
                      {phase.duration}
                    </span>
                  </div>
                  <p className="text-slate-600 font-medium mb-4">{phase.focusArea}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-xs font-semibold text-slate-400 uppercase mb-2 tracking-wider">Key Activities</h4>
                      <ul className="space-y-2">
                        {phase.keyActivities.map((activity, i) => (
                          <li key={i} className="text-sm text-slate-700 flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-50 pb-2 last:border-0 py-1 gap-2">
                            <div className="flex items-center gap-3">
                                <input 
                                  type="checkbox" 
                                  checked={activity.completed} 
                                  onChange={(e) => onUpdateActivity(phase.id, i, 'completed', e.target.checked)}
                                  className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                />
                                <span className={`transition-all ${activity.completed ? "line-through text-slate-400" : "text-slate-700"}`}>
                                  {activity.name}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 pl-7 sm:pl-0">
                                <input 
                                    type="date" 
                                    value={activity.dueDate || ''}
                                    onChange={(e) => onUpdateActivity(phase.id, i, 'dueDate', e.target.value)}
                                    className="text-xs border border-slate-200 rounded px-2 py-1 text-slate-500 focus:outline-none focus:border-blue-500 w-28 bg-slate-50/50"
                                />
                                <span className="text-[10px] font-medium text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                                    {activity.timeline}
                                </span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-slate-400 uppercase mb-2 tracking-wider">Deliverables</h4>
                      <ul className="space-y-1">
                        {phase.deliverables.map((del, i) => (
                          <li key={i} className="text-sm text-slate-700 flex items-start">
                            <div className={`w-1.5 h-1.5 rounded-full mt-1.5 mr-2 ${isCompleted ? 'bg-green-500' : 'bg-blue-400'}`} />
                            {del}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScheduleView;