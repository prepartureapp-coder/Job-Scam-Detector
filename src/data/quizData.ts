export interface QuizScenario {
  id: string;
  scenario: string;
  options: { text: string; isSafe: boolean; explanation: string }[];
  scamCategory: string;
  tip: string;
}

export const QUIZ_QUESTIONS: QuizScenario[] = [
  {
    id: 'q1',
    scenario: 'You receive an email from "recruiting@apple-careers-portal.com" offering you a remote customer care job for $42/hour without an interview. They ask you to message @AppleRecruiter on Telegram to receive your offer letter.',
    options: [
      { text: 'Download Telegram and message the handle to secure the role quickly', isSafe: false, explanation: 'Scam! Apple uses apple.com domains and never hires solely via Telegram text chats without formal interviews.' },
      { text: 'Look up the recruiter on LinkedIn and reply to the email asking for confirmation', isSafe: false, explanation: 'The domain "apple-careers-portal.com" is an imposter domain. Replying engages with the scammer.' },
      { text: 'Mark as phishing and verify openings directly on jobs.apple.com', isSafe: true, explanation: 'Correct! Never trust lookalike domains or recruiters redirecting to consumer chat apps.' }
    ],
    scamCategory: 'Domain Spoofing & Telegram Lures',
    tip: 'Legitimate Fortune 500 companies email from their root domains (e.g., @apple.com) and conduct multi-step interviews.'
  },
  {
    id: 'q2',
    scenario: 'An employer emails: "We are sending you a certified cashier check for $3,500. Deposit it, keep $500 for your advance pay, and send $3,000 via Zelle to our verified vendor to order your home office laptop."',
    options: [
      { text: 'Wait until the bank says "funds available" next morning, then send the Zelle payment', isSafe: false, explanation: 'DANGER! Federal law requires banks to make funds available within 1-2 days, but verifying a counterfeit check takes weeks. When it bounces, you owe the entire $3,000.' },
      { text: 'Refuse to deposit the check and report the scammer', isSafe: true, explanation: 'Correct! Real companies ship company laptops directly from their IT department. They never have you cash checks and wire money back.' },
      { text: 'Ask if you can purchase the laptop directly on Amazon instead', isSafe: false, explanation: 'The entire check is counterfeit. Any interaction involving deposited checks and returning money is fraudulent.' }
    ],
    scamCategory: 'Fake Check & Overpayment Scheme',
    tip: 'Banks make funds accessible quickly by law, but fraudulent checks can take up to 30 days to bounce back against your account balance.'
  },
  {
    id: 'q3',
    scenario: 'You applied for an administrative job yesterday. Today they email saying you are hired, and send a Google Form requesting your Social Security Number, date of birth, and front/back photo of your driver license before scheduling an onboarding meeting.',
    options: [
      { text: 'Fill out the Google Form immediately so you don’t delay onboarding', isSafe: false, explanation: 'Major red flag! Legitimate companies never collect sensitive identity information via public Google Forms.' },
      { text: 'Request to submit sensitive documentation only through a secure corporate HR portal (like Workday or ADP) after an employment agreement is signed', isSafe: true, explanation: 'Spot on! Identity documentation should only be submitted via verified, encrypted HR platforms after an authentic offer is signed.' },
      { text: 'Email photos of your driver license but omit the SSN', isSafe: false, explanation: 'Sending government IDs via unsecured channels to unverified parties exposes you to synthetic identity theft.' }
    ],
    scamCategory: 'Identity Harvesting',
    tip: 'Never send SSNs or government ID photos through unverified email forms or chat services.'
  },
  {
    id: 'q4',
    scenario: 'A recruiter messages you on WhatsApp: "Hello! We are seeking part-time reviewers to boost app ratings. You can earn $200 USDT per day just clicking submit on 30 merchant tasks. You just need to recharge $50 into the platform wallet to start."',
    options: [
      { text: 'This is a legitimate crypto freelance task', isSafe: false, explanation: 'Scam! Legitimate freelance jobs NEVER require you to pay money or recharge crypto balances to work.' },
      { text: 'Classic Task Scam / Advance-Fee fraud. Block and report immediately', isSafe: true, explanation: 'Correct! "Task scams" simulate fake profits on fake dashboards and trick victims into depositing escalating crypto amounts.' },
      { text: 'Do the tasks with the initial free credit, then withdraw without recharging', isSafe: false, explanation: 'The platform is completely fake and rigged to steal money.' }
    ],
    scamCategory: 'Task & Crypto Scam',
    tip: 'Any job that requires you to pay money, recharge a balance, or buy crypto to work is 100% a scam.'
  }
];
