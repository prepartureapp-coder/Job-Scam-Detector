import React, { useState } from 'react';
import { Header, ThemeMode } from './components/Header';
import { DetectorTab } from './components/DetectorTab';
import { DomainInspector } from './components/DomainInspector';
import { CheckScamSimulator } from './components/CheckScamSimulator';
import { ScamLibrary } from './components/ScamLibrary';
import { CommunityFeed } from './components/CommunityFeed';
import { ScamQuiz } from './components/ScamQuiz';
import { EmergencyPlaybook } from './components/EmergencyPlaybook';
import { ShieldCheck, ExternalLink, Zap } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('detector');
  const [theme, setTheme] = useState<ThemeMode>('neon');

  const themeAmbient = {
    neon: 'from-violet-900/20 via-rose-950/10 to-transparent',
    cobalt: 'from-blue-900/20 via-cyan-950/10 to-transparent',
    emerald: 'from-emerald-900/20 via-teal-950/10 to-transparent',
  }[theme];

  return (
    <div className="min-h-screen bg-[#070a12] text-slate-100 flex flex-col font-sans relative overflow-x-hidden selection:bg-rose-500/30 selection:text-rose-200">
      {/* Radiant ambient atmospheric lighting glows */}
      <div className={`fixed -top-40 left-1/4 w-[600px] h-[500px] bg-gradient-to-b ${themeAmbient} rounded-full blur-[140px] pointer-events-none -z-10`} />
      <div className="fixed top-1/3 -right-40 w-[500px] h-[500px] bg-gradient-to-br from-indigo-950/30 via-purple-900/15 to-transparent rounded-full blur-[160px] pointer-events-none -z-10" />

      <Header activeTab={activeTab} setActiveTab={setActiveTab} theme={theme} setTheme={setTheme} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {activeTab === 'detector' && <DetectorTab theme={theme} />}
        {activeTab === 'domain' && <DomainInspector />}
        {activeTab === 'simulator' && <CheckScamSimulator />}
        {activeTab === 'patterns' && <ScamLibrary />}
        {activeTab === 'community' && <CommunityFeed />}
        {activeTab === 'quiz' && <ScamQuiz />}
        {activeTab === 'emergency' && <EmergencyPlaybook />}
      </main>

      <footer className="border-t border-slate-800/80 bg-slate-950/90 py-6 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-lg bg-gradient-to-tr from-violet-600 to-rose-500 flex items-center justify-center text-white shadow-sm">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <span className="font-semibold text-slate-200">Job Scam Detector • Heuristic & Threat Intelligence Engine</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-slate-400">Zero-data retention • Privacy first</span>
            <span className="text-slate-600">·</span>
            <a
              href="https://www.ic3.gov"
              target="_blank"
              rel="noopener noreferrer"
              className="text-violet-400 hover:text-violet-300 font-semibold flex items-center gap-1 transition"
            >
              <span>FBI IC3</span>
              <ExternalLink className="h-3 w-3" />
            </a>
            <span className="text-slate-600">·</span>
            <a
              href="https://reportfraud.ftc.gov"
              target="_blank"
              rel="noopener noreferrer"
              className="text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1 transition"
            >
              <span>FTC Fraud</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
