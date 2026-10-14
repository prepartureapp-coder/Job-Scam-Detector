import React from 'react';
import { ShieldAlert, AlertTriangle, BookOpen, Users, Compass, HelpCircle, Siren, Palette } from 'lucide-react';

export type ThemeMode = 'neon' | 'cobalt' | 'emerald';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  theme: ThemeMode;
  setTheme: (t: ThemeMode) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, theme, setTheme }) => {
  const tabs = [
    { id: 'detector', label: 'Scam Analyzer', icon: ShieldAlert, color: 'text-violet-400' },
    { id: 'domain', label: 'Domain Inspector', icon: Compass, color: 'text-cyan-400' },
    { id: 'simulator', label: 'Check Scam Simulator', icon: AlertTriangle, color: 'text-amber-400' },
    { id: 'patterns', label: 'Scam Library', icon: BookOpen, color: 'text-blue-400' },
    { id: 'community', label: 'Community Alert Feed', icon: Users, color: 'text-fuchsia-400' },
    { id: 'quiz', label: 'Scam IQ Quiz', icon: HelpCircle, color: 'text-emerald-400' },
    { id: 'emergency', label: 'Victim Playbook', icon: Siren, highlight: true },
  ];

  const themeConfig = {
    neon: {
      brandGrad: 'from-violet-600 via-indigo-500 to-rose-500',
      activeTab: 'bg-gradient-to-r from-violet-600/30 to-rose-600/20 text-rose-200 border-violet-500/50 shadow-[0_0_15px_rgba(139,92,246,0.25)]',
      borderGlow: 'border-violet-500/20',
    },
    cobalt: {
      brandGrad: 'from-blue-600 via-cyan-500 to-indigo-600',
      activeTab: 'bg-gradient-to-r from-blue-600/30 to-cyan-600/20 text-cyan-200 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.25)]',
      borderGlow: 'border-cyan-500/20',
    },
    emerald: {
      brandGrad: 'from-emerald-600 via-teal-500 to-amber-500',
      activeTab: 'bg-gradient-to-r from-emerald-600/30 to-teal-600/20 text-emerald-200 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.25)]',
      borderGlow: 'border-emerald-500/20',
    },
  }[theme];

  return (
    <header className="border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md sticky top-0 z-40 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setActiveTab('detector')}>
            <div className={`h-11 w-11 rounded-xl bg-gradient-to-br ${themeConfig.brandGrad} flex items-center justify-center shadow-lg shadow-violet-500/30 text-white transform group-hover:scale-105 transition-transform duration-200`}>
              <ShieldAlert className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300 tracking-tight">
                  Job Scam Detector
                </span>
                <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-300 border border-rose-500/30 shadow-[0_0_10px_rgba(244,63,94,0.2)]">
                  Live Guard
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">Heuristic threat intelligence & recruiter verification</p>
            </div>
          </div>

          {/* Right Area: Palette Switcher & Emergency Action */}
          <div className="flex items-center gap-3">
            {/* Palette Mode Selector */}
            <div className="hidden sm:flex items-center bg-slate-900 border border-slate-800 rounded-lg p-1 text-xs">
              <button
                onClick={() => setTheme('neon')}
                className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                  theme === 'neon'
                    ? 'bg-gradient-to-r from-violet-600 to-rose-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Neon Violet Palette"
              >
                Neon
              </button>
              <button
                onClick={() => setTheme('cobalt')}
                className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                  theme === 'cobalt'
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Electric Cobalt Palette"
              >
                Cobalt
              </button>
              <button
                onClick={() => setTheme('emerald')}
                className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                  theme === 'emerald'
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Emerald Tech Palette"
              >
                Emerald
              </button>
            </div>

            {/* Quick Emergency Action */}
            <button
              onClick={() => setActiveTab('emergency')}
              className="flex items-center gap-2 text-xs font-bold px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-rose-950/80 to-red-900/60 text-rose-200 border border-rose-600/50 hover:border-rose-500 hover:shadow-[0_0_20px_rgba(244,63,94,0.3)] transition-all"
            >
              <Siren className="h-4 w-4 text-rose-400 animate-pulse" />
              <span className="hidden xs:inline">Incident Response</span>
              <span className="xs:hidden">Triage</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1.5 overflow-x-auto py-2.5 no-scrollbar border-t border-slate-800/80">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? themeConfig.activeTab
                    : tab.highlight
                    ? 'text-rose-300 hover:text-rose-200 hover:bg-rose-950/40 border border-transparent'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/80 border border-transparent'
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-white' : tab.color || 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
