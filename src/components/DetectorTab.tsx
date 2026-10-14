import React, { useState } from 'react';
import { 
  ShieldAlert, ShieldCheck, AlertTriangle, XCircle, ArrowRight, 
  RotateCcw, SlidersHorizontal, Sparkles, Copy, Check, ExternalLink,
  DollarSign, Mail, Building2, Smartphone, Lock, Eye, AlertOctagon, Flame
} from 'lucide-react';
import { JobInputData, JobAnalysisResult } from '../types';
import { analyzeJobSubmission } from '../utils/detector';
import { SAMPLE_CASES } from '../data/sampleScams';
import { ThemeMode } from './Header';

interface DetectorTabProps {
  theme?: ThemeMode;
}

export const DetectorTab: React.FC<DetectorTabProps> = ({ theme = 'neon' }) => {
  const [formData, setFormData] = useState<JobInputData>({
    rawText: '',
    jobTitle: '',
    companyName: '',
    recruiterEmail: '',
    companyWebsite: '',
    salaryOffered: '',
    interviewPlatform: '',
    paymentRequested: false,
    paymentDetails: '',
    personalInfoRequested: false,
    personalInfoDetails: '',
  });

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<JobAnalysisResult | null>(null);
  const [copied, setCopied] = useState(false);

  const handleLoadSample = (sampleId: string) => {
    const found = SAMPLE_CASES.find(s => s.id === sampleId);
    if (found) {
      setFormData(found.data);
      handleAnalyze(found.data);
    }
  };

  const handleClear = () => {
    setFormData({
      rawText: '',
      jobTitle: '',
      companyName: '',
      recruiterEmail: '',
      companyWebsite: '',
      salaryOffered: '',
      interviewPlatform: '',
      paymentRequested: false,
      paymentDetails: '',
      personalInfoRequested: false,
      personalInfoDetails: '',
    });
    setResult(null);
  };

  const handleAnalyze = async (dataToAnalyze: JobInputData = formData) => {
    if (!dataToAnalyze.rawText && !dataToAnalyze.companyName && !dataToAnalyze.recruiterEmail) {
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToAnalyze),
      });

      if (res.ok) {
        const json = await res.json();
        if (json.success && json.result) {
          setResult(json.result);
          setLoading(false);
          return;
        }
      }
    } catch {
      // Local fallback
    }

    const localResult = analyzeJobSubmission(dataToAnalyze);
    setResult(localResult);
    setLoading(false);
  };

  const copySummary = async () => {
    if (!result) return;
    const text = `--- Job Scam Detector Analysis ---
Risk Level: ${result.scores.overallRisk} (Scam Probability: ${result.scores.scamScore}%)
Suspected Scheme: ${result.scamTypeSuspected || 'None'}
Summary: ${result.summary}

Top Red Flags:
${result.redFlags.map(rf => `- [${rf.severity.toUpperCase()}] ${rf.title}: ${rf.explanation}`).join('\n')}

Immediate Recommendations:
${result.recommendedActions.map(ra => `* ${ra}`).join('\n')}
`;
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case 'CRITICAL_SCAM':
        return {
          bg: 'bg-gradient-to-r from-rose-950/80 via-red-950/60 to-slate-900 border-rose-500/60 shadow-[0_0_35px_rgba(244,63,94,0.3)]',
          title: 'CRITICAL FRAUD SIGNATURE',
          desc: 'High probability malicious scam operation. Cease communication immediately.',
          icon: AlertOctagon,
          iconBg: 'bg-gradient-to-br from-rose-500 to-red-600 text-white shadow-lg shadow-rose-500/40',
          textColor: 'text-rose-400',
        };
      case 'HIGH_RISK':
        return {
          bg: 'bg-gradient-to-r from-orange-950/80 via-rose-950/60 to-slate-900 border-orange-500/60 shadow-[0_0_35px_rgba(249,115,22,0.3)]',
          title: 'HIGH THREAT DETECTED',
          desc: 'Multiple severe red flags identified. Unsafe to proceed without independent corporate verification.',
          icon: AlertTriangle,
          iconBg: 'bg-gradient-to-br from-orange-500 to-rose-600 text-white shadow-lg shadow-orange-500/40',
          textColor: 'text-orange-400',
        };
      case 'SUSPICIOUS':
        return {
          bg: 'bg-gradient-to-r from-amber-950/80 via-yellow-950/50 to-slate-900 border-amber-500/60 shadow-[0_0_35px_rgba(245,158,11,0.25)]',
          title: 'SUSPICIOUS IRREGULARITIES',
          desc: 'Abnormal communication or transaction patterns detected. Proceed with extreme caution.',
          icon: AlertTriangle,
          iconBg: 'bg-gradient-to-br from-amber-400 to-yellow-600 text-slate-950 shadow-lg shadow-amber-500/30',
          textColor: 'text-amber-400',
        };
      case 'LOW':
        return {
          bg: 'bg-gradient-to-r from-teal-950/80 via-emerald-950/50 to-slate-900 border-teal-500/50 shadow-[0_0_35px_rgba(20,184,166,0.25)]',
          title: 'LOW RISK LEVEL',
          desc: 'Few non-critical concerns. Standard hiring diligence recommended.',
          icon: ShieldCheck,
          iconBg: 'bg-gradient-to-br from-teal-400 to-emerald-600 text-slate-950 shadow-lg shadow-teal-500/30',
          textColor: 'text-teal-400',
        };
      default:
        return {
          bg: 'bg-gradient-to-r from-emerald-950/80 via-teal-950/50 to-slate-900 border-emerald-500/60 shadow-[0_0_35px_rgba(16,185,129,0.3)]',
          title: 'LIKELY LEGITIMATE OFFER',
          desc: 'No known employment fraud signatures detected. Process aligns with industry standards.',
          icon: ShieldCheck,
          iconBg: 'bg-gradient-to-br from-emerald-400 to-cyan-500 text-slate-950 shadow-lg shadow-emerald-500/40',
          textColor: 'text-emerald-400',
        };
    }
  };

  const ctaGradient = {
    neon: 'from-violet-600 via-indigo-600 to-rose-500 hover:from-violet-500 hover:via-indigo-500 hover:to-rose-400 shadow-[0_0_25px_rgba(139,92,246,0.35)]',
    cobalt: 'from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:via-indigo-500 hover:to-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.35)]',
    emerald: 'from-emerald-600 via-teal-600 to-amber-500 hover:from-emerald-500 hover:via-teal-500 hover:to-amber-400 shadow-[0_0_25px_rgba(16,185,129,0.35)]',
  }[theme];

  return (
    <div className="space-y-8">
      {/* Radiant Hero Banner */}
      <div className="bg-gradient-to-r from-slate-900/90 via-violet-950/40 to-slate-900/90 p-6 sm:p-7 rounded-3xl border border-violet-500/30 shadow-[0_0_30px_rgba(139,92,246,0.15)] relative overflow-hidden backdrop-blur">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/15 border border-violet-500/30 text-violet-300 text-xs font-semibold mb-2 shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-violet-400" />
              <span>Multi-Vector Threat & Behavioral Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-violet-100 to-rose-200 tracking-tight">
              Employment Scam & Fraud Scanner
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-1.5 max-w-2xl leading-relaxed">
              Paste suspicious job listings, recruiter emails, Telegram interviews, or offer letters. Our system tests for counterfeit checks, lookalike domains, and identity harvesting.
            </p>
          </div>

          {/* Quick Load Test Cases */}
          <div className="flex flex-wrap items-center gap-2 pt-1 lg:pt-0">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider mr-1">Load Demo:</span>
            {SAMPLE_CASES.map(sc => {
              const chipColor = 
                sc.category === 'Fake Check' ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 hover:bg-rose-500/30 shadow-[0_0_12px_rgba(244,63,94,0.2)]' :
                sc.category === 'Telegram Impersonation' ? 'bg-violet-500/20 text-violet-300 border-violet-500/40 hover:bg-violet-500/30 shadow-[0_0_12px_rgba(139,92,246,0.2)]' :
                sc.category === 'Identity Theft' ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30 shadow-[0_0_12px_rgba(245,158,11,0.2)]' :
                'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.2)]';

              return (
                <button
                  key={sc.id}
                  onClick={() => handleLoadSample(sc.id)}
                  className={`text-xs px-3 py-1.5 rounded-xl font-semibold border transition-all ${chipColor}`}
                  title={`Load "${sc.title}"`}
                >
                  {sc.category}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Input Form */}
        <div className="lg:col-span-6 space-y-5">
          <div className="bg-slate-900/80 rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4 backdrop-blur">
            <div className="flex items-center justify-between">
              <label htmlFor="rawText" className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <span>Job Offer Text / Email / Recruiter Message</span>
                <span className="text-xs text-rose-400 font-medium">(Required)</span>
              </label>
              {formData.rawText && (
                <button
                  onClick={handleClear}
                  className="text-xs font-semibold text-slate-400 hover:text-rose-400 flex items-center gap-1 transition"
                >
                  <RotateCcw className="h-3 w-3" />
                  <span>Clear</span>
                </button>
              )}
            </div>

            <textarea
              id="rawText"
              rows={8}
              value={formData.rawText}
              onChange={(e) => setFormData({ ...formData, rawText: e.target.value })}
              placeholder="Paste the full job email, LinkedIn message, WhatsApp text, or offer letter here... e.g.:

'Dear applicant, congratulations! You have been selected for remote data entry. We are mailing a $3,800 cashier check for home office equipment...'"
              className="w-full bg-[#0b0f19] border border-slate-800 rounded-2xl p-4 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-violet-500/60 focus:border-violet-500 font-mono transition"
            />

            {/* Quick Context Toggle */}
            <div>
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="text-xs font-bold text-violet-400 hover:text-violet-300 flex items-center gap-1.5 transition"
              >
                <SlidersHorizontal className="h-3.5 w-3.5" />
                <span>{showAdvanced ? 'Hide Specific Metadata Fields' : '+ Add Recruiter Email, Company, Pay Rate (Refines Scoring)'}</span>
              </button>
            </div>

            {/* Specific Structured Inputs */}
            {showAdvanced && (
              <div className="space-y-3 pt-3 border-t border-slate-800/80 animate-in fade-in duration-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 flex items-center gap-1 mb-1">
                      <Building2 className="h-3 w-3 text-violet-400" />
                      <span>Claimed Company</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Deloitte, Google, Acme Corp"
                      value={formData.companyName || ''}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full bg-[#0b0f19] border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-1 focus:ring-violet-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 flex items-center gap-1 mb-1">
                      <Mail className="h-3 w-3 text-violet-400" />
                      <span>Recruiter Email Address</span>
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. hr@company-careers.net"
                      value={formData.recruiterEmail || ''}
                      onChange={(e) => setFormData({ ...formData, recruiterEmail: e.target.value })}
                      className="w-full bg-[#0b0f19] border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-1 focus:ring-violet-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 flex items-center gap-1 mb-1">
                      <Smartphone className="h-3 w-3 text-cyan-400" />
                      <span>Interview Method / Platform</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Telegram, WhatsApp, Zoom, Teams"
                      value={formData.interviewPlatform || ''}
                      onChange={(e) => setFormData({ ...formData, interviewPlatform: e.target.value })}
                      className="w-full bg-[#0b0f19] border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-1 focus:ring-violet-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 flex items-center gap-1 mb-1">
                      <DollarSign className="h-3 w-3 text-emerald-400" />
                      <span>Offered Salary / Rate</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. $45/hour, $95,000/yr"
                      value={formData.salaryOffered || ''}
                      onChange={(e) => setFormData({ ...formData, salaryOffered: e.target.value })}
                      className="w-full bg-[#0b0f19] border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-1 focus:ring-violet-500"
                    />
                  </div>
                </div>

                {/* Checkbox triggers */}
                <div className="space-y-2 pt-2">
                  <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-200">
                    <input
                      type="checkbox"
                      checked={formData.paymentRequested}
                      onChange={(e) => setFormData({ ...formData, paymentRequested: e.target.checked })}
                      className="mt-0.5 rounded border-slate-700 text-rose-500 focus:ring-0"
                    />
                    <span>They asked me to deposit a check, pay for equipment, purchase gift cards, or wire money.</span>
                  </label>

                  <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-200">
                    <input
                      type="checkbox"
                      checked={formData.personalInfoRequested}
                      onChange={(e) => setFormData({ ...formData, personalInfoRequested: e.target.checked })}
                      className="mt-0.5 rounded border-slate-700 text-amber-500 focus:ring-0"
                    />
                    <span>They asked for my SSN, bank routing number, or driver's license photos before formal onboarding.</span>
                  </label>
                </div>
              </div>
            )}

            {/* Run Analysis Button */}
            <button
              onClick={() => handleAnalyze()}
              disabled={loading || (!formData.rawText && !formData.companyName)}
              className={`w-full py-3.5 px-4 rounded-2xl font-extrabold text-sm bg-gradient-to-r ${ctaGradient} text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
            >
              {loading ? (
                <>
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Scanning Threat Database & Heuristics...</span>
                </>
              ) : (
                <>
                  <ShieldAlert className="h-4 w-4" />
                  <span>Run Fraud Analysis</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Results Area */}
        <div className="lg:col-span-6 space-y-6">
          {!result && !loading && (
            <div className="bg-slate-900/40 border border-dashed border-slate-800 rounded-3xl p-10 text-center flex flex-col items-center justify-center min-h-[380px]">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-violet-600/20 to-rose-500/20 border border-violet-500/30 flex items-center justify-center text-violet-400 mb-4 shadow-[0_0_20px_rgba(139,92,246,0.15)]">
                <ShieldAlert className="h-8 w-8" />
              </div>
              <h3 className="text-base font-extrabold text-slate-100">Ready for Audit</h3>
              <p className="text-xs text-slate-400 max-w-sm mt-1 leading-relaxed">
                Paste job details on the left, or select one of the colored demo presets above to evaluate instant fraud signatures.
              </p>
            </div>
          )}

          {loading && (
            <div className="bg-slate-900/60 border border-violet-500/30 rounded-3xl p-10 text-center flex flex-col items-center justify-center min-h-[380px] space-y-4 shadow-[0_0_30px_rgba(139,92,246,0.15)]">
              <div className="h-12 w-12 rounded-full border-4 border-violet-500/20 border-t-violet-400 animate-spin" />
              <p className="text-sm font-bold text-slate-100">Auditing communication channels & financial vectors...</p>
              <p className="text-xs text-slate-400">Comparing against FBI IC3 signatures, Telegram lures, and fake checks.</p>
            </div>
          )}

          {result && !loading && (
            <div className="space-y-6 animate-in fade-in duration-300">
              {/* Overall Risk Card */}
              {(() => {
                const badge = getRiskBadge(result.scores.overallRisk);
                const BadgeIcon = badge.icon;
                return (
                  <div className={`p-6 rounded-3xl border ${badge.bg} relative overflow-hidden backdrop-blur`}>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3.5">
                        <div className={`p-3 rounded-2xl ${badge.iconBg}`}>
                          <BadgeIcon className="h-7 w-7" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400">Verdict</span>
                            <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-slate-950/80 text-white border border-slate-700">
                              {result.scores.scamScore}% Threat Score
                            </span>
                          </div>
                          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1">
                            {badge.title}
                          </h2>
                          <p className="text-xs text-slate-200 mt-1 max-w-md leading-relaxed">
                            {badge.desc}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={copySummary}
                        className="p-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 transition flex items-center gap-1.5 text-xs font-semibold shadow-sm"
                        title="Copy Summary"
                      >
                        {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                        <span className="hidden sm:inline">{copied ? 'Copied' : 'Share'}</span>
                      </button>
                    </div>

                    {result.scamTypeSuspected && (
                      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                        <span className="text-slate-400 font-semibold">Identified Fraud Modus:</span>
                        <span className="font-extrabold text-rose-300">{result.scamTypeSuspected}</span>
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* Threat Matrix Score Cards with Radiant Gradients */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-4 rounded-2xl bg-gradient-to-b from-rose-950/30 to-slate-900/90 border border-rose-500/30 text-center shadow-[0_0_15px_rgba(244,63,94,0.1)]">
                  <span className="text-[11px] text-slate-400 block font-semibold">Financial Risk</span>
                  <span className={`text-2xl font-black ${result.scores.financialRisk > 50 ? 'text-rose-400' : 'text-slate-200'}`}>
                    {result.scores.financialRisk}%
                  </span>
                  <div className="w-full bg-slate-800/80 h-1.5 rounded-full mt-2.5 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-rose-500 to-red-500 h-full rounded-full transition-all duration-500" 
                      style={{ width: `${result.scores.financialRisk}%` }} 
                    />
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-gradient-to-b from-violet-950/30 to-slate-900/90 border border-violet-500/30 text-center shadow-[0_0_15px_rgba(139,92,246,0.1)]">
                  <span className="text-[11px] text-slate-400 block font-semibold">Identity Theft</span>
                  <span className={`text-2xl font-black ${result.scores.identityTheftRisk > 50 ? 'text-violet-400' : 'text-slate-200'}`}>
                    {result.scores.identityTheftRisk}%
                  </span>
                  <div className="w-full bg-slate-800/80 h-1.5 rounded-full mt-2.5 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-violet-500 to-fuchsia-500 h-full rounded-full transition-all duration-500" 
                      style={{ width: `${result.scores.identityTheftRisk}%` }} 
                    />
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-gradient-to-b from-emerald-950/30 to-slate-900/90 border border-emerald-500/30 text-center shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                  <span className="text-[11px] text-slate-400 block font-semibold">Authenticity</span>
                  <span className={`text-2xl font-black ${result.scores.legitimacyScore > 40 ? 'text-emerald-400' : 'text-slate-300'}`}>
                    {result.scores.legitimacyScore}%
                  </span>
                  <div className="w-full bg-slate-800/80 h-1.5 rounded-full mt-2.5 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-emerald-400 to-cyan-400 h-full rounded-full transition-all duration-500" 
                      style={{ width: `${result.scores.legitimacyScore}%` }} 
                    />
                  </div>
                </div>
              </div>

              {/* AI Forensic Insights */}
              {result.aiInsights && (
                <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/30 via-violet-950/20 to-slate-900 border border-amber-500/40 text-xs space-y-2 shadow-[0_0_20px_rgba(245,158,11,0.15)]">
                  <div className="flex items-center gap-2 font-bold text-amber-300">
                    <Sparkles className="h-4 w-4 text-amber-400" />
                    <span>AI Forensic Linguistic Analysis</span>
                  </div>
                  <p className="text-slate-200 leading-relaxed italic">
                    "{result.aiInsights}"
                  </p>
                </div>
              )}

              {/* Detected Red Flags */}
              <div className="space-y-3">
                <h3 className="text-sm font-extrabold text-slate-100 flex items-center justify-between">
                  <span>Detected Red Flags ({result.redFlags.length})</span>
                  {result.redFlags.length === 0 && (
                    <span className="text-xs font-semibold text-emerald-400">Zero critical flags identified</span>
                  )}
                </h3>

                {result.redFlags.map((flag) => {
                  const isCritical = flag.severity === 'critical';
                  const isHigh = flag.severity === 'high';
                  return (
                    <div
                      key={flag.id}
                      className={`p-4 rounded-2xl border text-xs space-y-2.5 transition ${
                        isCritical
                          ? 'bg-rose-950/30 border-rose-500/50 shadow-[0_0_15px_rgba(244,63,94,0.1)]'
                          : isHigh
                          ? 'bg-orange-950/25 border-orange-500/40'
                          : 'bg-slate-900/90 border-slate-800'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-0.5 rounded-full font-black uppercase text-[10px] tracking-wide ${
                              isCritical
                                ? 'bg-rose-500 text-white shadow-sm shadow-rose-500/40'
                                : isHigh
                                ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40'
                                : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            }`}
                          >
                            {flag.severity}
                          </span>
                          <span className="font-bold text-slate-100 text-sm">{flag.title}</span>
                        </div>
                      </div>

                      <p className="text-slate-300 leading-relaxed">{flag.explanation}</p>

                      {flag.matchedEvidence && (
                        <div className="p-2.5 rounded-xl bg-[#0b0f19] border border-slate-800 font-mono text-[11px] text-slate-300">
                          <span className="text-rose-400 font-sans font-semibold mr-1">Evidence:</span> {flag.matchedEvidence}
                        </div>
                      )}

                      <div className="pt-1 flex items-start gap-1.5 text-amber-300 font-semibold">
                        <ArrowRight className="h-3.5 w-3.5 shrink-0 mt-0.5 text-amber-400" />
                        <span>Action: {flag.recommendation}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Positive Signals */}
              {result.positiveSignals.length > 0 && (
                <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 text-xs space-y-2 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                  <span className="font-bold text-emerald-300 flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4" />
                    <span>Legitimacy Signals Found ({result.positiveSignals.length})</span>
                  </span>
                  <ul className="space-y-1 text-slate-300 pl-4 list-disc">
                    {result.positiveSignals.map((sig, idx) => (
                      <li key={idx}>{sig}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Recommended Next Actions */}
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                  Recommended Immediate Protocol
                </h4>
                <div className="space-y-2.5 text-xs">
                  {result.recommendedActions.map((action, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-slate-300">
                      <span className="h-5 w-5 rounded-full bg-violet-600/30 text-violet-300 border border-violet-500/40 font-bold flex items-center justify-center shrink-0 text-[10px]">
                        {i + 1}
                      </span>
                      <span className="leading-relaxed">{action}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
