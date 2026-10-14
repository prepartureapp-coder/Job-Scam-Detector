import React, { useState } from 'react';
import { BookOpen, AlertOctagon, Smartphone, DollarSign, Package, ShieldAlert, Cpu, Users, ChevronDown, ChevronUp } from 'lucide-react';

interface ScamPattern {
  id: string;
  title: string;
  category: string;
  icon: any;
  riskRating: 'Severe' | 'Critical' | 'High';
  gradient: string;
  iconColor: string;
  hook: string;
  modusOperandi: string;
  deadlyGiveaways: string[];
  howToProtect: string;
}

export const ScamLibrary: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string>('telegram-chat');

  const patterns: ScamPattern[] = [
    {
      id: 'telegram-chat',
      title: 'Telegram & WhatsApp Text-Only Interview',
      category: 'Corporate Impersonation',
      icon: Smartphone,
      riskRating: 'Severe',
      gradient: 'from-violet-600 to-indigo-600',
      iconColor: 'text-violet-400',
      hook: 'Invited to interview via Telegram or WhatsApp text message for a high-paying remote job with a Fortune 500 company (Google, Deloitte, Disney, etc.).',
      modusOperandi: 'Scammers create fake recruiter profiles on Telegram using real photos stolen from LinkedIn. They conduct an entirely typed 30-minute questionnaire, then issue an immediate formal offer letter within hours.',
      deadlyGiveaways: [
        'Interviews conducted exclusively through Telegram, WhatsApp, or Signal.',
        'No live video meeting with cameras enabled.',
        'Immediate hire after answering basic text questions.',
        'Urgent pressure to accept and sign within 24 hours.'
      ],
      howToProtect: 'Legitimate corporate recruiting teams schedule formal video interviews (Zoom, Google Meet, Microsoft Teams) through official calendar invites matching company email domains.'
    },
    {
      id: 'fake-check',
      title: 'The Counterfeit Check & Equipment Vendor Trap',
      category: 'Advance-Fee Financial Fraud',
      icon: DollarSign,
      riskRating: 'Critical',
      gradient: 'from-rose-600 to-red-600',
      iconColor: 'text-rose-400',
      hook: '"We will mail you a $3,500 check to purchase your home office computer from our approved vendor."',
      modusOperandi: 'The scammer mails a counterfeit cashier check, asks you to deposit it, keep a bonus, and wire the remaining funds to a "certified supplier". When the check inevitably bounces 1–3 weeks later, your bank reverses the credit, leaving you out thousands of dollars.',
      deadlyGiveaways: [
        'Employer sends a check for you to buy equipment yourself.',
        'Requires payment via Zelle, Cash App, wire, or cryptocurrency.',
        'Refuses to purchase and ship hardware directly from the company IT department.'
      ],
      howToProtect: 'Never deposit a check from an employer to pay another party. Real employers ship pre-configured laptops directly to your doorstep.'
    },
    {
      id: 'identity-harvest',
      title: 'Identity Theft & Synthetic Credit Fraud',
      category: 'Data & Identity Theft',
      icon: ShieldAlert,
      riskRating: 'Critical',
      gradient: 'from-amber-500 to-orange-600',
      iconColor: 'text-amber-400',
      hook: '"Congratulations! You are hired. Please email your SSN, driver license photos, and direct deposit routing number for payroll verification before your first day."',
      modusOperandi: 'Fraudsters set up fake job postings on job boards specifically to harvest government IDs, full SSNs, and banking credentials. They use this data to open fraudulent lines of credit, claim unemployment benefits, or commit tax refund fraud in your name.',
      deadlyGiveaways: [
        'Requested to submit sensitive credentials via standard email or Google Forms.',
        'Asked for SSN and photo ID before meeting any hiring manager or signing an authenticated contract.',
        'Unverified background check links asking for credit card numbers.'
      ],
      howToProtect: 'Only submit sensitive tax information (W-4, I-9) through recognized, encrypted enterprise HR portals (Workday, ADP, Gusto, Rippling) after an authentic offer has been executed.'
    },
    {
      id: 'package-mule',
      title: 'Package Mule / Reshipping Scheme',
      category: 'Criminal Exploitation',
      icon: Package,
      riskRating: 'High',
      gradient: 'from-blue-600 to-cyan-600',
      iconColor: 'text-cyan-400',
      hook: '"Work from home as a Package Quality Inspector or Logistics Coordinator earning $3,000/month."',
      modusOperandi: 'Victims receive packages at their home address purchased with stolen credit cards. They are instructed to inspect the goods, repack them with new shipping labels, and mail them overseas. When police investigate the stolen merchandise, the trail leads directly to the victim’s home.',
      deadlyGiveaways: [
        'Job description centers around receiving, inspecting, and re-labeling packages.',
        'Items received are luxury goods (iPhones, laptops, designer clothes).',
        'Company lacks any formal domestic warehouse infrastructure.'
      ],
      howToProtect: 'Legitimate logistics and warehousing companies operate bonded commercial fulfillment facilities, never residential addresses.'
    },
    {
      id: 'task-crypto',
      title: 'Cryptocurrency "Task" & App Rating Scam',
      category: 'Crypto Ponzi / Advance-Fee',
      icon: Cpu,
      riskRating: 'Critical',
      gradient: 'from-fuchsia-600 to-pink-600',
      iconColor: 'text-fuchsia-400',
      hook: '"Earn $150 to $300 USDT daily for rating mobile apps or optimizing digital merchant tasks for 1 hour a day."',
      modusOperandi: 'Victims are registered on a fake dashboard simulating "tasks" (clicking buttons to review apps). Initial small amounts are allowed to be withdrawn to build trust. Then "combination tasks" appear requiring victims to deposit $500, $2,000, or $10,000 into a crypto wallet to unlock their earnings. The platform eventually freezes all funds.',
      deadlyGiveaways: [
        'Payment denominated in USDT or cryptocurrency.',
        'Requires "recharging" or depositing your own funds to complete daily task quotas.',
        'Recruiter reached out unsolicited via WhatsApp, iMessage, or Telegram.'
      ],
      howToProtect: 'No authentic job requires employees to pay or deposit their own funds to unlock work or withdraw earned wages.'
    },
    {
      id: 'mlm-disguised',
      title: 'Disguised Multi-Level Marketing (MLM) / Pyramid Scheme',
      category: 'Predatory Recruitment',
      icon: Users,
      riskRating: 'High',
      gradient: 'from-emerald-600 to-teal-600',
      iconColor: 'text-emerald-400',
      hook: '"Marketing Associate / Executive Trainee: rapid advancement to management, unlimited commission earnings!"',
      modusOperandi: 'Candidates apply for what appears to be a corporate marketing role, only to find themselves doing 100% commission door-to-door sales, selling products inside big box stores, or pressured to recruit friends and family while buying expensive starter inventory.',
      deadlyGiveaways: [
        'Vague job duties ("management trainee", "direct marketing").',
        'Heavy emphasis on recruiting others rather than selling a standalone product.',
        'Required purchase of starter kits, training courses, or certification packages.'
      ],
      howToProtect: 'Research the company name with keywords like "scam", "pyramid", or "Devilcorp" on Reddit and Glassdoor.'
    }
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="bg-gradient-to-r from-slate-900/90 via-indigo-950/40 to-slate-900/90 p-6 sm:p-7 rounded-3xl border border-indigo-500/30 shadow-[0_0_30px_rgba(99,102,241,0.15)] space-y-2 relative overflow-hidden backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/30">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-violet-200">
              Scam Archetypes Knowledge Base
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
              Comprehensive playbook covering the top 6 deceptive employment schemes tracked by the FTC and FBI IC3.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {patterns.map((p) => {
          const Icon = p.icon;
          const isExpanded = expandedId === p.id;
          return (
            <div
              key={p.id}
              className={`rounded-3xl border transition-all backdrop-blur ${
                isExpanded
                  ? 'bg-slate-900/90 border-violet-500/50 shadow-[0_0_30px_rgba(139,92,246,0.15)]'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <button
                onClick={() => setExpandedId(isExpanded ? '' : p.id)}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-2xl bg-gradient-to-br ${p.gradient} text-white shadow-lg shadow-violet-500/20`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                        {p.category}
                      </span>
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                        p.riskRating === 'Critical' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      }`}>
                        {p.riskRating} Risk
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-black text-white mt-0.5">{p.title}</h3>
                  </div>
                </div>

                {isExpanded ? (
                  <ChevronUp className="h-5 w-5 text-violet-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-slate-400" />
                )}
              </button>

              {isExpanded && (
                <div className="px-6 pb-6 pt-2 border-t border-slate-800/80 space-y-4 text-xs animate-in fade-in duration-200">
                  <div>
                    <span className="font-black text-amber-400 uppercase tracking-wider text-[10px] block mb-1">
                      The Hook / Trap
                    </span>
                    <p className="text-slate-200 italic bg-[#0b0f19] p-3 rounded-xl border border-slate-800">
                      "{p.hook}"
                    </p>
                  </div>

                  <div>
                    <span className="font-black text-slate-200 uppercase tracking-wider text-[10px] block mb-1">
                      Modus Operandi (How It Works)
                    </span>
                    <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                      {p.modusOperandi}
                    </p>
                  </div>

                  <div>
                    <span className="font-black text-rose-400 uppercase tracking-wider text-[10px] block mb-1.5">
                      Deadly Warning Signs
                    </span>
                    <ul className="space-y-1.5 pl-4 list-disc text-slate-300 text-xs sm:text-sm">
                      {p.deadlyGiveaways.map((giveaway, idx) => (
                        <li key={idx}>{giveaway}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 text-emerald-200 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                    <span className="font-black block text-emerald-300 mb-0.5 text-xs uppercase tracking-wider">How To Defend Yourself:</span>
                    <p className="leading-relaxed text-xs sm:text-sm">{p.howToProtect}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
