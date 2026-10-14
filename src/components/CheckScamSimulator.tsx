import React, { useState } from 'react';
import { AlertTriangle, DollarSign, Clock, ArrowRight, ShieldX, CheckCircle, Info, Landmark, Sparkles } from 'lucide-react';

export const CheckScamSimulator: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      day: 'Day 1: The Lure',
      title: 'Scammer Mails Counterfeit Check',
      badge: 'Arrival',
      amount: '+$4,200.00 Check Sent',
      description: 'You receive an urgent FedEx/USPS envelope with a cashier\'s check for $4,200. The fake recruiter instructs: "Deposit this immediately for your home office setup. Deduct $400 for your advance bonus, and send $3,800 to our accredited IT equipment supplier via Zelle or wire transfer."',
      bankStatus: 'Check Deposited (Pending Verification)',
      victimPocket: '$0 out-of-pocket',
      dangerLevel: 'Low (Until funds moved)',
      trapExplanation: 'The check looks completely authentic—often bearing real company names and real bank routing numbers copied from compromised corporate accounts.'
    },
    {
      day: 'Day 2: The Federal Law Trap',
      title: 'Bank Shows "Funds Available"',
      badge: 'The Illusion',
      amount: '+$4,200.00 Temporary Credit',
      description: 'Under US Federal Regulation CC (the Expedited Funds Availability Act), banks are legally required to make deposited funds accessible within 1-2 business days. The victim checks their banking app, sees the $4,200 in their balance, and mistakenly assumes the check has "cleared"!',
      bankStatus: 'Balance Shows: $4,200 Available (NOT cleared!)',
      victimPocket: '$0 out-of-pocket',
      dangerLevel: 'CRITICAL MISCONCEPTION',
      trapExplanation: '"Available" is NOT "Cleared". Full interbank clearing takes 10 to 30 business days. The bank is merely extending temporary credit while investigating the issuing institution.'
    },
    {
      day: 'Day 3: The Wire Transfer',
      title: 'Victim Sends $3,800 to "Vendor"',
      badge: 'Irreversible Loss',
      amount: '-$3,800.00 via Zelle / Crypto',
      description: 'Believing the check cleared safely, the victim follows instructions and sends $3,800 via Zelle, Cash App, wire, or Bitcoin to the "approved equipment supplier". The "supplier" is actually the scammer or an accomplice.',
      bankStatus: 'Real Cash Leaves Account',
      victimPocket: '-$3,800 (Irretrievable cash sent)',
      dangerLevel: 'FATAL MOVE',
      trapExplanation: 'Zelle and wire transfers are instantaneous and irreversible. Once sent, fraud protections rarely reimburse voluntary transfers.'
    },
    {
      day: 'Day 14: The Inevitable Bounce',
      title: 'Bank Discovers Counterfeit Check',
      badge: 'The Reality Check',
      amount: '-$4,200.00 Claws Back',
      description: 'The issuing bank finally rejects the check as fraudulent/counterfeit. Your bank immediately reverses the entire $4,200 deposit from your account balance.',
      bankStatus: 'Deposit Reversed (-$4,200)',
      victimPocket: '-$3,800 Net Cash Lost + Overdraft Fees',
      dangerLevel: 'DEVASTATING FINANCES',
      trapExplanation: 'Under your account deposit agreement, you are legally responsible for any checks you deposit. The bank will not absorb the loss—you owe the full amount.'
    },
    {
      day: 'Aftermath: Account Closure & Fraud Flags',
      title: 'Bank Flags Your Account for Check Fraud',
      badge: 'Long-term Damage',
      amount: 'Account Frozen / ChexSystems Flag',
      description: 'Your bank may freeze your checking account, charge $35+ returned check fees, report you to ChexSystems or Early Warning Services (EWS), preventing you from opening a bank account anywhere for up to 5 years.',
      bankStatus: 'Negative Balance + Account Restricted',
      victimPocket: 'Damaged Banking Reputation & Debt',
      dangerLevel: 'SYSTEMIC CONSEQUENCES',
      trapExplanation: 'Victims often suffer twice: losing money and losing access to standard banking services.'
    }
  ];

  const current = steps[currentStep];

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Overview Card with Vibrant Ambient Gradients */}
      <div className="bg-gradient-to-r from-slate-900/90 via-amber-950/40 to-slate-900/90 p-6 sm:p-7 rounded-3xl border border-amber-500/30 shadow-[0_0_30px_rgba(245,158,11,0.15)] space-y-4 relative overflow-hidden backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 font-black shadow-lg shadow-amber-500/30">
            <Landmark className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-100 to-orange-200 tracking-tight">
              Anatomy of the $3,800 Fake Check Scam
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
              Interactive simulator demonstrating why the federal "Available Funds" rule traps job seekers
            </p>
          </div>
        </div>

        {/* Step Progress Pills with Vibrant Highlights */}
        <div className="grid grid-cols-5 gap-2 pt-2 border-t border-slate-800/80">
          {steps.map((s, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentStep(idx)}
              className={`p-2.5 rounded-xl text-left transition-all ${
                currentStep === idx
                  ? 'bg-gradient-to-r from-amber-500/30 to-rose-500/20 text-amber-200 border border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.25)] font-bold'
                  : 'bg-[#0b0f19] text-slate-400 border border-slate-800 hover:border-slate-700'
              }`}
            >
              <span className="text-[10px] font-black block uppercase tracking-wider text-amber-400">
                Step {idx + 1}
              </span>
              <span className="text-xs font-semibold truncate block mt-0.5">
                {s.day.split(':')[0]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Active Step Presentation */}
      <div className="bg-slate-900/80 rounded-3xl border border-slate-800 p-6 sm:p-7 space-y-6 shadow-xl backdrop-blur">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
          <div>
            <span className="text-xs font-black text-amber-400 uppercase tracking-wider">
              {current.day}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
              {current.title}
            </h3>
          </div>

          <div className="px-4 py-2 rounded-2xl bg-rose-500/15 border border-rose-500/40 text-rose-300 font-mono text-sm font-black shadow-[0_0_15px_rgba(244,63,94,0.2)]">
            {current.amount}
          </div>
        </div>

        <p className="text-sm text-slate-200 leading-relaxed font-normal">
          {current.description}
        </p>

        {/* Status Breakdown Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          <div className="p-4 rounded-2xl bg-[#0b0f19] border border-blue-500/20 space-y-1">
            <span className="text-[10px] uppercase font-bold text-blue-400">Bank Perception</span>
            <p className="text-xs font-bold text-slate-100">{current.bankStatus}</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#0b0f19] border border-amber-500/20 space-y-1">
            <span className="text-[10px] uppercase font-bold text-amber-400">Your Actual Balance</span>
            <p className="text-xs font-bold text-amber-300">{current.victimPocket}</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#0b0f19] border border-rose-500/20 space-y-1">
            <span className="text-[10px] uppercase font-bold text-rose-400">Threat Assessment</span>
            <p className="text-xs font-bold text-rose-400">{current.dangerLevel}</p>
          </div>
        </div>

        {/* The Golden Rule Callout */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-950/30 via-rose-950/20 to-slate-900 border border-amber-500/30 text-xs space-y-1.5 shadow-[0_0_20px_rgba(245,158,11,0.15)]">
          <div className="font-extrabold text-amber-300 flex items-center gap-2">
            <Info className="h-4 w-4 text-amber-400" />
            <span>Behind The Scenes Trap:</span>
          </div>
          <p className="text-slate-200 leading-relaxed">
            {current.trapExplanation}
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold disabled:opacity-30 disabled:cursor-not-allowed transition"
          >
            Previous Stage
          </button>

          <span className="text-xs text-slate-400 font-semibold">
            Stage {currentStep + 1} of {steps.length}
          </span>

          <button
            onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
            disabled={currentStep === steps.length - 1}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 text-xs font-black disabled:opacity-30 disabled:cursor-not-allowed transition flex items-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.3)]"
          >
            <span>Next Stage</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Safety Rules for Checks */}
      <div className="bg-slate-900/80 rounded-3xl border border-slate-800 p-6 space-y-3.5 shadow-xl">
        <h4 className="text-sm font-black text-rose-400 flex items-center gap-2">
          <ShieldX className="h-5 w-5" />
          <span>The Golden Rule of Employment Checks</span>
        </h4>
        <ul className="space-y-2 text-xs text-slate-300 list-disc pl-5 leading-relaxed">
          <li><strong>Real employers NEVER send checks to buy equipment:</strong> Authentic companies ship pre-configured IT equipment directly via corporate courier (Dell, Apple, CDW) with mobile device management pre-installed.</li>
          <li><strong>Never use Zelle, Venmo, Wire, or Crypto for job onboarding:</strong> These tools are strictly designed for peer-to-peer transfers between people who know each other.</li>
          <li><strong>Do not trust cashier's checks or certified checks:</strong> Watermarks and magnetic ink are easily counterfeited with modern desktop printers.</li>
        </ul>
      </div>
    </div>
  );
};
