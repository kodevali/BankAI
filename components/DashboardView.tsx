import React from 'react';
import { KPIS } from '../constants';
import { ArrowUpRight, ArrowDownRight, Minus, Circle, Clock } from 'lucide-react';
import { PhaseStatus, ProjectPhase } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface DashboardViewProps {
  phases: ProjectPhase[];
}

const DashboardView: React.FC<DashboardViewProps> = ({ phases }) => {
  const activePhase = phases.find(p => p.status === PhaseStatus.Active) || phases[0];
  const completedPhases = phases.filter(p => p.status === PhaseStatus.Completed).length;
  
  // Calculate overall project progress based on average of phase progress
  const overallProgress = Math.round(phases.reduce((acc, curr) => acc + curr.progress, 0) / phases.length);

  const pieData = [
    { name: 'Completed', value: overallProgress },
    { name: 'Remaining', value: 100 - overallProgress },
  ];
  const COLORS = ['#2563eb', '#e2e8f0'];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Executive Dashboard</h2>
        <p className="text-slate-500">Real-time overview of the AI Enablement Initiative.</p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {KPIS.map((kpi, index) => (
          <div key={index} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{kpi.label}</p>
            <div className="mt-2 flex items-end justify-between">
              <h3 className="text-2xl font-bold text-slate-900">{kpi.value}</h3>
              <div className={`flex items-center text-xs font-medium ${
                kpi.trend === 'up' ? 'text-green-600' : kpi.trend === 'down' ? 'text-red-600' : 'text-slate-400'
              }`}>
                {kpi.trend === 'up' && <ArrowUpRight className="w-4 h-4 mr-1" />}
                {kpi.trend === 'down' && <ArrowDownRight className="w-4 h-4 mr-1" />}
                {kpi.trend === 'neutral' && <Minus className="w-4 h-4 mr-1" />}
                <span>Target: {kpi.target}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Phase Card */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-slate-800">Current Focus: {activePhase.name}</h3>
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                activePhase.status === PhaseStatus.Active ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-700'
            }`}>
              {activePhase.status.toUpperCase()}
            </span>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-500">Phase Progress</span>
                <span className="font-medium text-slate-900">{activePhase.progress}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" style={{ width: `${activePhase.progress}%` }}></div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="bg-slate-50 p-4 rounded-lg">
                <h4 className="text-sm font-semibold text-slate-700 mb-2">Key Activities</h4>
                <ul className="text-sm text-slate-600 space-y-2">
                  {activePhase.keyActivities.slice(0, 3).map((act, i) => (
                    <li key={i} className="flex items-start justify-between">
                      <div className="flex items-center">
                         <div className={`w-2 h-2 rounded-full mr-2 ${act.completed ? 'bg-green-500' : 'bg-slate-300'}`}></div>
                         <span className={act.completed ? 'line-through text-slate-400' : ''}>{act.name}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg">
                <h4 className="text-sm font-semibold text-slate-700 mb-2">Next Deliverable</h4>
                <ul className="text-sm text-slate-600 space-y-2">
                  {activePhase.deliverables.slice(0, 2).map((del, i) => (
                    <li key={i} className="flex items-start">
                      <Circle className="w-4 h-4 mr-2 text-amber-500 mt-0.5 shrink-0" />
                      {del}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Overall Progress Chart */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Project Completion</h3>
          <div className="flex-1 flex flex-col items-center justify-center min-h-[200px] relative">
            <div className="w-full h-48 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                    stroke="none"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              
              {/* Centered Text Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-4xl font-bold text-slate-800">{overallProgress}%</span>
                <p className="text-xs text-slate-500 font-medium mt-1">Complete</p>
              </div>
            </div>
            
             {/* Custom Legend */}
             <div className="mt-2 flex items-center space-x-4 text-xs text-slate-500">
                 <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mr-1.5"></div>
                    <span>Done</span>
                 </div>
                 <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-slate-200 mr-1.5"></div>
                    <span>Pending</span>
                 </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;