import React, { useState } from 'react';
import { LayoutDashboard, CalendarDays, FileText, Sparkles, Menu, X, Banknote } from 'lucide-react';
import { ViewState, ProjectPhase, Activity } from './types';
import { PHASES } from './constants';
import DashboardView from './components/DashboardView';
import ScheduleView from './components/ScheduleView';
import AssistantView from './components/AssistantView';
import ProjectBriefView from './components/ProjectBriefView';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [phases, setPhases] = useState<ProjectPhase[]>(PHASES);

  const updateActivity = (phaseId: number, activityIndex: number, field: keyof Activity, value: any) => {
    setPhases(currentPhases => currentPhases.map(phase => {
      if (phase.id === phaseId) {
        const newActivities = [...phase.keyActivities];
        newActivities[activityIndex] = { ...newActivities[activityIndex], [field]: value };
        
        // Calculate progress based on completed activities
        const completedCount = newActivities.filter(a => a.completed).length;
        const newProgress = Math.round((completedCount / newActivities.length) * 100);

        return { ...phase, keyActivities: newActivities, progress: newProgress };
      }
      return phase;
    }));
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'schedule', label: 'Schedule & Plan', icon: CalendarDays },
    { id: 'brief', label: 'Project Brief', icon: FileText },
    { id: 'assistant', label: 'AI Assistant', icon: Sparkles },
  ];

  const renderContent = () => {
    switch (view) {
      case 'dashboard': return <DashboardView phases={phases} />;
      case 'schedule': return <ScheduleView phases={phases} onUpdateActivity={updateActivity} />;
      case 'brief': return <ProjectBriefView />;
      case 'assistant': return <AssistantView phases={phases} />;
      default: return <DashboardView phases={phases} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-white fixed h-full z-10">
        <div className="p-6 border-b border-slate-800 flex items-center space-x-3">
            <div className="p-2 bg-blue-600 rounded-lg">
                <Banknote className="w-6 h-6 text-white" />
            </div>
            <div>
                <h1 className="text-lg font-bold">BankAI</h1>
                <p className="text-xs text-slate-400">Enablement Portal</p>
            </div>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setView(item.id as ViewState)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  view === item.id 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
        <div className="p-4 border-t border-slate-800">
            <div className="bg-slate-800 rounded-lg p-4">
                <p className="text-xs text-slate-400 mb-2">Project Status</p>
                <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-green-400">On Track</span>
                    <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                </div>
            </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed w-full bg-slate-900 text-white z-20 flex justify-between items-center p-4">
         <div className="flex items-center space-x-2">
            <Banknote className="w-6 h-6 text-blue-500" />
            <h1 className="font-bold">BankAI</h1>
         </div>
         <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
             {isMobileMenuOpen ? <X /> : <Menu />}
         </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-slate-900 z-10 pt-20 px-4 space-y-4">
             {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                    setView(item.id as ViewState);
                    setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-4 rounded-lg transition-colors ${
                  view === item.id 
                    ? 'bg-blue-600 text-white' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-4 md:p-8 mt-16 md:mt-0 overflow-x-hidden">
        <div className="max-w-6xl mx-auto">
            {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;