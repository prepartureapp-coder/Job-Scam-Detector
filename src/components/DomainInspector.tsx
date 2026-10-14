import React, { useState } from 'react';
import { Compass, AlertTriangle, ShieldCheck, Mail, Building2, CheckCircle2, XCircle, Search, ExternalLink, HelpCircle, Sparkles } from 'lucide-react';

export const DomainInspector: React.FC = () => {
  const [emailInput, setEmailInput] = useState('');
  const [companyInput, setCompanyInput] = useState('');
  const [checked, setChecked] = useState(false);

  const FREE_DOMAINS = [
    'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com',
    'icloud.com', 'protonmail.com', 'proton.me', 'mail.com', 'zoho.com',
    'yandex.com', 'gmx.com'
  ];

  const SUSPICIOUS_AFFIXES = [
    '-careers', '-jobs', '-hiring', '-recruit', '-recruitment',
    '-talent', '-onboarding', '-portal', '-team', '-desk', '-global',
    '-work', '-apply', '-employment'
  ];

  const handleInspect = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    setChecked(true);
  };

  const handleReset = () => {
    setEmailInput('');
    setCompanyInput('');
    setChecked(false);
  };

  // Robust domain extraction handling emails, hostnames, and full URLs
  let cleanInput = emailInput.trim().toLowerCase();
  cleanInput = cleanInput.replace(/^https?:\/\//i, '').replace(/^www\./i, '');
  cleanInput = cleanInput.split('/')[0].split('?')[0].split('#')[0];
  const domain = cleanInput.includes('@') ? cleanInput.split('@')[1] : cleanInput;
  const isFree = FREE_DOMAINS.includes(domain);
  const hasSuspiciousAffix = SUSPICIOUS_AFFIXES.some(a => domain.includes(a));
  const tld = domain.split('.').pop() || '';
  const isSuspiciousTLD = ['xyz', 'top', 'work', 'loan', 'click', 'link', 'icu'].includes(tld);

  const quickSamples = [
    { email: 'sarah.jenkins@apple-careers-portal.com', company: 'Apple', label: 'Imposter Apple Domain', color: 'bg-rose-500/15 text-rose-300 border-rose-500/40 hover:bg-rose-500/25' },
    { email: 'recruiter.google.jobs@gmail.com', company: 'Google', label: 'Gmail Claiming Google', color: 'bg-amber-500/15 text-amber-300 border-amber-500/40 hover:bg-amber-500/25' },
    { email: 'recruiting@netflix.com', company: 'Netflix', label: 'Legitimate Corporate Domain', color: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/25' },
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="bg-gradient-to-r from-slate-900/90 via-cyan-950/40 to-slate-900/90 p-6 sm:p-7 rounded-3xl border border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.15)] space-y-3 relative overflow-hidden backdrop-blur">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30">
            <Compass className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-blue-200">
              Recruiter Domain & Email Authenticator
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
              Scammers register lookalike domains (e.g., <code className="text-cyan-300 font-mono">amazon-careers-desk.com</code>) or use free Gmail accounts to impersonate recruiters. Test any sender address below.
            </p>
          </div>
        </div>

        {/* Quick test buttons */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/80">
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider mr-1">Try Presets:</span>
          {quickSamples.map((s, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setEmailInput(s.email);
                setCompanyInput(s.company);
                setChecked(true);
              }}
              className={`text-xs px-3 py-1.5 rounded-xl font-semibold border transition-all ${s.color}`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleInspect} className="bg-slate-900/80 p-6 rounded-3xl border border-slate-800 shadow-xl space-y-5 backdrop-blur">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-200 block mb-1.5 flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5 text-cyan-400" />
              <span>Sender Email or Domain</span>
            </label>
            <input
              type="text"
              placeholder="e.g. recruiter@amazon-jobs-hr.com or name@gmail.com"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="w-full bg-[#0b0f19] border border-slate-800 rounded-2xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/60 focus:border-cyan-500 font-mono transition"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-200 block mb-1.5 flex items-center gap-1.5">
              <Building2 className="h-3.5 w-3.5 text-blue-400" />
              <span>Claimed Employer Name (Optional)</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Amazon, Pfizer, Wells Fargo"
              value={companyInput}
              onChange={(e) => setCompanyInput(e.target.value)}
              className="w-full bg-[#0b0f19] border border-slate-800 rounded-2xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/60 focus:border-cyan-500 transition"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="flex-1 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:via-blue-500 hover:to-indigo-500 text-white font-extrabold text-sm transition shadow-[0_0_25px_rgba(6,182,212,0.35)] flex items-center justify-center gap-2"
          >
            <Search className="h-4 w-4" />
            <span>Inspect Domain Integrity</span>
          </button>
          {(emailInput || checked) && (
            <button
              type="button"
              onClick={handleReset}
              className="py-3.5 px-5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-sm transition"
            >
              Reset
            </button>
          )}
        </div>
      </form>

      {checked && domain && (
        <div className="space-y-5 animate-in fade-in duration-300">
          {/* Main Verdict Card */}
          <div className={`p-6 rounded-3xl border backdrop-blur ${
            isFree || hasSuspiciousAffix || isSuspiciousTLD
              ? 'bg-gradient-to-r from-rose-950/70 via-red-950/50 to-slate-900 border-rose-500/60 shadow-[0_0_30px_rgba(244,63,94,0.25)]'
              : 'bg-gradient-to-r from-emerald-950/70 via-teal-950/50 to-slate-900 border-emerald-500/60 shadow-[0_0_30px_rgba(16,185,129,0.25)]'
          }`}>
            <div className="flex items-start gap-4">
              {isFree || hasSuspiciousAffix || isSuspiciousTLD ? (
                <div className="p-3 rounded-2xl bg-gradient-to-br from-rose-500 to-red-600 text-white shadow-lg shadow-rose-500/40 shrink-0">
                  <AlertTriangle className="h-7 w-7" />
                </div>
              ) : (
                <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 text-slate-950 shadow-lg shadow-emerald-500/40 shrink-0">
                  <ShieldCheck className="h-7 w-7" />
                </div>
              )}

              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Domain Analysis for @{domain}
                </span>
                <h3 className="text-xl font-black text-white">
                  {isFree
                    ? 'Major Red Flag: Free Consumer Email Provider'
                    : hasSuspiciousAffix
                    ? 'High Suspicion: Synthetic Lookalike Domain Detected'
                    : isSuspiciousTLD
                    ? 'Warning: High-Risk Top Level Domain'
                    : 'Standard Domain Structure Verified'}
                </h3>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {isFree
                    ? `The sender is using ${domain}, a public free webmail service. Legitimate enterprise hiring never occurs via personal consumer accounts.`
                    : hasSuspiciousAffix
                    ? `The domain contains typical spoofing markers ("${SUSPICIOUS_AFFIXES.find(a => domain.includes(a))}"). Fraudsters frequently register variants of enterprise trademarks.`
                    : 'The domain does not trigger common synthetic lookalike signatures. Proceed to verify employee on LinkedIn.'}
                </p>
              </div>
            </div>
          </div>

          {/* Verification Checklist */}
          <div className="bg-slate-900/80 rounded-3xl border border-slate-800 p-6 space-y-4 shadow-xl">
            <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-cyan-400" />
              <span>How to Manually Verify This Recruiter</span>
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
              <div className="p-4 rounded-2xl bg-[#0b0f19] border border-cyan-500/20 space-y-1.5 shadow-sm">
                <div className="font-bold text-cyan-300 flex items-center gap-1.5">
                  <Search className="h-3.5 w-3.5 text-cyan-400" />
                  <span>1. Check WHOIS Domain Age</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Look up <code className="text-cyan-200 font-mono">{domain}</code> on whois.domaintools.com. If registered recently (within 90 days), it is almost certainly a fraudulent campaign.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#0b0f19] border border-blue-500/20 space-y-1.5 shadow-sm">
                <div className="font-bold text-blue-300 flex items-center gap-1.5">
                  <Building2 className="h-3.5 w-3.5 text-blue-400" />
                  <span>2. Browse Official Careers URL</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Do not click links in the message. Type the company's real root domain in your browser and check their careers portal for the exact Job Req ID.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#0b0f19] border border-violet-500/20 space-y-1.5 shadow-sm">
                <div className="font-bold text-violet-300 flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-violet-400" />
                  <span>3. Corporate MX Records</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Legitimate companies use enterprise email gateways (Google Workspace or Microsoft 365 Exchange). Scam domains often lack DKIM/DMARC records or redirect to dead pages.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#0b0f19] border border-emerald-500/20 space-y-1.5 shadow-sm">
                <div className="font-bold text-emerald-300 flex items-center gap-1.5">
                  <HelpCircle className="h-3.5 w-3.5 text-emerald-400" />
                  <span>4. LinkedIn Cross-Check</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Search the recruiter's name on LinkedIn. Verify they actually work at the company and message them on LinkedIn to confirm they sent the email.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
