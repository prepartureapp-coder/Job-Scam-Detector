import { CommunityReport } from '../types';

export const INITIAL_COMMUNITY_REPORTS: CommunityReport[] = [
  {
    id: 'rep-1',
    date: '2026-10-10',
    companyClaimed: 'Apex Global Logistics LLC',
    scammerEmail: 'hr-onboarding@apex-logistics-jobs.net',
    scamType: 'Fake Check & Equipment Scam',
    platform: 'Indeed Message & Telegram',
    description: 'Received email claiming I was selected for remote data entry. Sent a $4,200 check from a credit union in Ohio and requested I Zelle $3,700 to an "IT supplier" in Texas.',
    lossReported: '$0 (Caught in time)',
    upvotes: 42,
    indicators: ['Fake Check', 'Zelle Payment', 'Telegram Interview', 'Free Mail Lookalike']
  },
  {
    id: 'rep-2',
    date: '2026-10-08',
    companyClaimed: 'Johnson & Johnson (Impersonation)',
    scammerEmail: 'recruiting-jnj@consultant.com',
    scamType: 'Telegram Chat Interview',
    platform: 'LinkedIn message to personal email',
    description: 'Impersonated Senior VP of Clinical Ops. Conducted a 30-minute text-only interview on Telegram. Offered $110/hour immediately and asked for full SSN and direct deposit details on a PDF form.',
    lossReported: '$0 (Reported to LinkedIn)',
    upvotes: 31,
    indicators: ['Telegram Interview', 'Lookalike Domain', 'Premature SSN Request']
  },
  {
    id: 'rep-3',
    date: '2026-10-05',
    companyClaimed: 'Nordic Digital Media',
    scammerEmail: 'talent@nordic-media-careers.org',
    scamType: 'Package Reshipping Mule Scheme',
    platform: 'Craigslist / Email',
    description: 'Advertised as "Quality Control Inspection Assistant". Asked me to receive packages at my home address, repackage them with new shipping labels provided, and reship overseas. Police later confirmed goods were bought with stolen credit cards.',
    lossReported: 'Legal risk (Assisted police)',
    upvotes: 68,
    indicators: ['Package Reshipping', 'Stolen Goods', 'No Video Call']
  },
  {
    id: 'rep-4',
    date: '2026-09-29',
    companyClaimed: 'Meta Platforms (Impersonation)',
    scammerEmail: 'careers-meta-verification@gmail.com',
    scamType: 'Identity Theft / Credit Check Phishing',
    platform: 'Direct Email',
    description: 'Sent a link to a fake "ID.me" clone claiming it was required to submit biometric ID and SSN before interviewing for a remote contract.',
    lossReported: '$0 (Blocked domain)',
    upvotes: 24,
    indicators: ['Phishing Link', 'Gmail Address for Meta', 'Biometric Harvesting']
  }
];
