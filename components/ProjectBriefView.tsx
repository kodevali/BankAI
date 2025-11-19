import React from 'react';
import { PROJECT_GOAL, PROJECT_NAME } from '../constants';
import { Target, ShieldCheck, Users, Zap } from 'lucide-react';

const ProjectBriefView: React.FC = () => {
  return (
    <div className="animate-fade-in max-w-4xl mx-auto bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
      <div className="border-b border-slate-100 pb-6 mb-6">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">{PROJECT_NAME}</h2>
        <p className="text-slate-500 text-lg">Project Brief & Strategic Overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="flex items-center text-lg font-semibold text-slate-800 mb-3">
            <Target className="w-5 h-5 mr-2 text-blue-600" />
            Goal
          </h3>
          <p className="text-slate-600 leading-relaxed">{PROJECT_GOAL}</p>
        </div>
        <div>
          <h3 className="flex items-center text-lg font-semibold text-slate-800 mb-3">
            <ShieldCheck className="w-5 h-5 mr-2 text-red-500" />
            The Challenge
          </h3>
          <p className="text-slate-600 leading-relaxed">
            The bank has access to powerful AI features, but usage is inconsistent. Without structured training, we risk low ROI on license costs and potential data risks from improper usage.
          </p>
        </div>
      </div>

      <div className="bg-slate-50 rounded-xl p-6 mb-8">
        <h3 className="flex items-center text-lg font-semibold text-slate-800 mb-4">
            <Zap className="w-5 h-5 mr-2 text-amber-500" />
            The Strategy: Phased Rollout
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
                { step: "1. Assess", desc: "Identify high-impact workflows" },
                { step: "2. Pilot", desc: "Test on control group" },
                { step: "3. Refine", desc: "Optimize material" },
                { step: "4. Launch", desc: "Deploy in waves" }
            ].map((s, i) => (
                <div key={i} className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                    <div className="font-bold text-slate-900">{s.step}</div>
                    <div className="text-xs text-slate-500 mt-1">{s.desc}</div>
                </div>
            ))}
        </div>
      </div>

      <div className="mb-8">
         <h3 className="text-lg font-semibold text-slate-800 mb-4">Key Success Metrics (KPIs)</h3>
         <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
             <li className="flex items-center bg-green-50 p-3 rounded-lg text-green-900 text-sm font-medium border border-green-100">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Adoption: 80% active usage
             </li>
             <li className="flex items-center bg-blue-50 p-3 rounded-lg text-blue-900 text-sm font-medium border border-blue-100">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                Proficiency: Score > 4.5/5
             </li>
             <li className="flex items-center bg-indigo-50 p-3 rounded-lg text-indigo-900 text-sm font-medium border border-indigo-100">
                <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                Efficiency: Proven time savings
             </li>
         </ul>
      </div>

      <div>
        <h3 className="flex items-center text-lg font-semibold text-slate-800 mb-3">
            <Users className="w-5 h-5 mr-2 text-purple-600" />
            Key Stakeholders
        </h3>
        <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">Project Lead</span>
            <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">Learning & OD</span>
            <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">Google Consultant</span>
        </div>
      </div>

    </div>
  );
};

export default ProjectBriefView;
