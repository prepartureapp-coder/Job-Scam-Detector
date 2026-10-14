import React, { useState } from 'react';
import { Siren, ShieldAlert, ExternalLink, Lock, DollarSign, CheckSquare, Square, PhoneCall } from 'lucide-react';

export const EmergencyPlaybook: React.FC = () => {
  const [checkedTasks, setCheckedTasks] = useState<Record<string, boolean>>({});

  const toggleTask = (id: string) => {
    setCheckedTasks(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const scenarios = [
    {
      id: 'ssn',
      title: 'Action Plan: If You Shared Your Social Security Number (SSN)',
      severity: 'Critical Threat: Identity Theft',
      steps: [
        {
          id: 'ssn-1',
          action: 'Freeze Your Credit at all 3 Major Bureaus',
          detail: 'Freezing prevents scammers from taking out loans or credit cards in your name. Freezes are free by federal law and do not affect your credit score.',
          links: [
            { name: 'Experian Freeze', url: 'https://www.experian.com/freeze' },
            { name: 'Equifax Freeze', url: 'https://www.equifax.com/personal/credit-report-services/' },
            { name: 'TransUnion Freeze', url: 'https://www.transunion.com/credit-freeze' }
          ]
        },
        {
          id: 'ssn-2',
          action: 'Report to FTC IdentityTheft.gov',
          detail: 'Create an official FTC Identity Theft Report. This creates a legally binding affidavit required to remove fraudulent accounts from your credit history.',
          links: [{ name: 'File FTC Identity Report', url: 'https://www.identitytheft.gov' }]
        },
        {
          id: 'ssn-3',
          action: 'Lock Your Social Security Number (mySSA)',
          detail: 'Create or log into your account on ssa.gov and place a block on electronic access to prevent unauthorized benefit diversion.'
        }
      ]
    },
    {
      id: 'money',
      title: 'Action Plan: If You Deposited a Check or Sent Money',
      severity: 'Urgent Threat: Financial Loss',
      steps: [
        {
          id: 'money-1',
          action: 'Contact Your Bank Fraud Department IMMEDIATELY',
          detail: 'Explain directly: "I unknowingly deposited a fraudulent employment check. Please do not close my account; I am notifying you immediately of the fraud."',
          tip: 'Being proactive protects your account from being blacklisted on ChexSystems or Early Warning Services (EWS).'
        },
        {
          id: 'money-2',
          action: 'Contact the Transfer Service (Zelle / Cash App / Wire)',
          detail: 'Report the transaction as unauthorized employment fraud. While peer-to-peer transfers are hard to reverse, quick notification can freeze the recipient’s mule account.'
        },
        {
          id: 'money-3',
          action: 'File a Complaint with the FBI IC3',
          detail: 'The FBI Internet Crime Complaint Center tracks wire fraud, mule networks, and corporate impersonation syndicates.',
          links: [{ name: 'Submit FBI IC3 Complaint', url: 'https://www.ic3.gov' }]
        }
      ]
    },
    {
      id: 'bank',
      title: 'Action Plan: If You Disclosed Your Bank Account & Routing Number',
      severity: 'High Threat: Unauthorized ACH Debits',
      steps: [
        {
          id: 'bank-1',
          action: 'Close the Compromised Account & Open a New Account',
          detail: 'Anyone with your routing and account number can initiate fraudulent ACH debits or print fake checks. Request the bank close that account number and transfer remaining funds to a new number.'
        },
        {
          id: 'bank-2',
          action: 'Set Up Instant Balance & Transaction Alerts',
          detail: 'Enable real-time push notifications for all debits greater than $0.01 to catch trial deposits or micro-charges.'
        }
      ]
    }
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="bg-gradient-to-r from-rose-950/90 via-red-950/70 to-slate-900/90 p-6 sm:p-7 rounded-3xl border border-rose-500/40 shadow-[0_0_35px_rgba(244,63,94,0.2)] space-y-2 relative overflow-hidden backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-rose-500 to-red-600 text-white font-black shadow-lg shadow-rose-500/30">
            <Siren className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-rose-100 to-red-200">
              Victim Emergency Incident Response Playbook
            </h2>
            <p className="text-xs sm:text-sm text-rose-200/90 mt-0.5">
              Immediate triage steps if you already sent funds, deposited an equipment check, or disclosed your SSN.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {scenarios.map((sec) => (
          <div key={sec.id} className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-7 space-y-4 shadow-xl backdrop-blur">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                <ShieldAlert className="h-5 w-5 text-rose-400" />
                <span>{sec.title}</span>
              </h3>
              <span className="text-[10px] font-black px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 self-start sm:self-auto shadow-sm">
                {sec.severity}
              </span>
            </div>

            <div className="space-y-3.5">
              {sec.steps.map((st) => {
                const isDone = !!checkedTasks[st.id];
                return (
                  <div
                    key={st.id}
                    onClick={() => toggleTask(st.id)}
                    className={`p-4 sm:p-5 rounded-2xl border text-xs sm:text-sm cursor-pointer transition-all ${
                      isDone
                        ? 'bg-[#0b0f19]/60 border-slate-800/60 opacity-60'
                        : 'bg-[#0b0f19] border-slate-800 hover:border-rose-500/40 shadow-sm'
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <button type="button" className="mt-0.5 text-rose-400">
                        {isDone ? (
                          <CheckSquare className="h-5 w-5 text-emerald-400" />
                        ) : (
                          <Square className="h-5 w-5 text-slate-500" />
                        )}
                      </button>

                      <div className="space-y-1.5 flex-1">
                        <span className={`font-black text-sm sm:text-base block ${isDone ? 'line-through text-slate-500' : 'text-slate-100'}`}>
                          {st.action}
                        </span>
                        <p className="text-slate-300 leading-relaxed">
                          {st.detail}
                        </p>
                        {st.tip && (
                          <p className="text-xs text-amber-300 italic pt-0.5 font-semibold">
                            💡 {st.tip}
                          </p>
                        )}

                        {st.links && st.links.length > 0 && (
                          <div className="flex flex-wrap gap-2 pt-2" onClick={(e) => e.stopPropagation()}>
                            {st.links.map((link, lidx) => (
                              <a
                                key={lidx}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-rose-300 font-bold text-xs border border-rose-500/30 transition shadow-sm"
                              >
                                <span>{link.name}</span>
                                <ExternalLink className="h-3.5 w-3.5" />
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
