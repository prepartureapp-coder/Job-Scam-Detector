import { JobInputData } from '../types';

export interface SampleCase {
  id: string;
  title: string;
  category: 'Fake Check' | 'Telegram Impersonation' | 'Identity Theft' | 'Legitimate';
  difficulty: 'Easy' | 'Moderate' | 'Subtle';
  expectedRisk: string;
  data: JobInputData;
}

export const SAMPLE_CASES: SampleCase[] = [
  {
    id: 'fake-check',
    title: 'Home Office Equipment & Advance Check Scam',
    category: 'Fake Check',
    difficulty: 'Easy',
    expectedRisk: 'CRITICAL_SCAM',
    data: {
      jobTitle: 'Remote Data Entry Clerk / Office Assistant',
      companyName: 'Apex Logistics Global',
      recruiterEmail: 'hr.apexlogistics@gmail.com',
      companyWebsite: 'https://apexlogistics-fake.com',
      salaryOffered: '$48.50 per hour',
      interviewPlatform: 'Telegram / Email',
      paymentRequested: true,
      paymentDetails: 'Deposit $3,800 cashier check sent by courier, then transfer $3,200 via Zelle or wire to our certified equipment vendor.',
      personalInfoRequested: false,
      personalInfoDetails: '',
      rawText: `Dear Candidate,

Congratulations! Following a review of your resume on Indeed, the management board of Apex Logistics Global has selected you for the position of Remote Data Entry Specialist ($48.50/hour, 25-30 hrs/week).

To help you establish your home office setup, a company certified check in the amount of $3,850 will be mailed to your address today. Once received, kindly deposit the check into your bank account. Deduct $350 as your sign-on incentive bonus, and immediately wire or Zelle the remaining funds to our accredited Apple/HP equipment supplier to ship your company-encrypted MacBook Pro, scanner, and time-tracking software.

Kindly confirm your current mailing address to proceed immediately.`
    }
  },
  {
    id: 'telegram-interview',
    title: 'Corporate Impersonation via Telegram Interview',
    category: 'Telegram Impersonation',
    difficulty: 'Moderate',
    expectedRisk: 'CRITICAL_SCAM',
    data: {
      jobTitle: 'Senior UX/UI Designer',
      companyName: 'Deloitte Consulting',
      recruiterEmail: 'careers-deloitte-recruitment@outlook.com',
      companyWebsite: 'https://deloitte.com',
      salaryOffered: '$120,000 / year',
      interviewPlatform: 'Telegram (@Deloitte_HR_James)',
      paymentRequested: false,
      personalInfoRequested: false,
      rawText: `Dear Applicant,

We came across your profile and were impressed by your background. We are pleased to inform you that you have been shortlisted for an online interview with Deloitte Consulting for our Remote Creative Team.

The interview session has been scheduled to take place on Telegram app to test your promptness and attention to detail. 

Download the Telegram application on your PC or smartphone, search for our Talent Acquisition Lead via handle @Deloitte_HR_James, and send him the interview briefing code #DEL-9082.

Kindly do the needful immediately as interview slots are filling rapidly.`
    }
  },
  {
    id: 'identity-theft',
    title: 'Urgent Offer with Premature SSN & ID Harvesting',
    category: 'Identity Theft',
    difficulty: 'Subtle',
    expectedRisk: 'CRITICAL_SCAM',
    data: {
      jobTitle: 'Administrative Coordinator',
      companyName: 'Summit Healthcare Partners',
      recruiterEmail: 'onboarding@summit-health-hr.org',
      salaryOffered: '$32.00 / hour',
      interviewPlatform: 'Text questionnaire',
      paymentRequested: false,
      personalInfoRequested: true,
      personalInfoDetails: 'Full Social Security Number, photo of Driver License front & back, and bank account routing number.',
      rawText: `Congratulations!

You have been formally accepted for employment with Summit Healthcare Partners. Due to our immediate federal compliance deadlines, your background check and direct deposit profile must be finalized within 24 hours.

Please reply to this email with:
1. Full Legal Name and Date of Birth
2. Social Security Number (SSN)
3. High-resolution color photos of your driver's license (both front and back)
4. Bank account number and routing number for immediate payroll pre-authorization

Failure to submit these documents within 24 hours will result in automatic revocation of your offer letter.`
    }
  },
  {
    id: 'legitimate-job',
    title: 'Legitimate Senior Engineer Offer (Real-World Benchmark)',
    category: 'Legitimate',
    difficulty: 'Easy',
    expectedRisk: 'SAFE',
    data: {
      jobTitle: 'Staff Frontend Engineer',
      companyName: 'Cloudflare',
      recruiterEmail: 'recruiting@cloudflare.com',
      companyWebsite: 'https://cloudflare.com',
      salaryOffered: '$185,000 base + equity',
      interviewPlatform: 'Zoom (Greenhouse invitation link)',
      paymentRequested: false,
      personalInfoRequested: false,
      rawText: `Hi Alex,

It was wonderful meeting you throughout our technical loops, system design interview, and team match conversations over the past two weeks. The hiring team was thoroughly impressed by your architecture presentation!

We are excited to extend an official offer of employment for the Staff Frontend Engineer position at Cloudflare. 

You can review your detailed offer letter, equity grant details, and comprehensive health/401(k) benefits package securely through your Greenhouse applicant portal link below. All IT hardware (configured laptop and accessories) will be provided directly by Cloudflare IT logistics prior to your start date.

Please let us know if you'd like to schedule a quick 15-minute call to answer any compensation or start date questions.`
    }
  }
];
