import { JobInputData, JobAnalysisResult, RedFlag, DomainCheckResult, AnalysisScores } from '../types';

const FREE_EMAIL_PROVIDERS = [
  'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com',
  'icloud.com', 'protonmail.com', 'proton.me', 'mail.com', 'zoho.com',
  'yandex.com', 'gmx.com', 'live.com'
];

const KNOWN_ENTERPRISES = [
  { name: 'Google', domain: 'google.com' },
  { name: 'Microsoft', domain: 'microsoft.com' },
  { name: 'Apple', domain: 'apple.com' },
  { name: 'Amazon', domain: 'amazon.com' },
  { name: 'Meta', domain: 'meta.com' },
  { name: 'Netflix', domain: 'netflix.com' },
  { name: 'Deloitte', domain: 'deloitte.com' },
  { name: 'PwC', domain: 'pwc.com' },
  { name: 'Ernst & Young', domain: 'ey.com' },
  { name: 'KPMG', domain: 'kpmg.com' },
  { name: 'JPMorgan Chase', domain: 'jpmorgan.com' },
  { name: 'Goldman Sachs', domain: 'goldmansachs.com' },
  { name: 'Pfizer', domain: 'pfizer.com' },
  { name: 'Johnson & Johnson', domain: 'jnj.com' },
  { name: 'IBM', domain: 'ibm.com' },
  { name: 'Oracle', domain: 'oracle.com' },
  { name: 'Salesforce', domain: 'salesforce.com' },
  { name: 'Accenture', domain: 'accenture.com' },
  { name: 'Cisco', domain: 'cisco.com' }
];

export function analyzeJobSubmission(input: JobInputData): JobAnalysisResult {
  const text = (input.rawText || '').toLowerCase();
  const title = (input.jobTitle || '').toLowerCase();
  const company = (input.companyName || '').trim();
  const email = (input.recruiterEmail || '').trim().toLowerCase();
  const platform = (input.interviewPlatform || '').toLowerCase();
  const salary = (input.salaryOffered || '').toLowerCase();

  const redFlags: RedFlag[] = [];
  const positiveSignals: string[] = [];
  let scamScoreAcc = 0;
  let financialRiskAcc = 0;
  let identityRiskAcc = 0;
  let legitimacyAcc = 0;

  // 1. Email Domain Analysis
  let domainAnalysis: DomainCheckResult | undefined;
  if (email && email.includes('@')) {
    const domain = email.split('@')[1];
    const isFree = FREE_EMAIL_PROVIDERS.includes(domain);
    const warnings: string[] = [];

    // Check if claimed company is a major corporation or established brand using free webmail
    if (isFree && company.length > 2) {
      warnings.push(`Recruiter claiming to represent "${company}" is using a free public mail provider (@${domain}) instead of corporate email.`);
      redFlags.push({
        id: 'free_email_for_company',
        title: 'Free Webmail Address for Official Business',
        severity: 'high',
        category: 'domain',
        explanation: `Legitimate recruiters from established companies do not conduct official hiring through personal free email accounts like @${domain}.`,
        matchedEvidence: `Recruiter email: ${email}`,
        recommendation: 'Check the official company career portal or reach out directly to verified corporate HR.'
      });
      scamScoreAcc += 25;
    }

    // Check domain spoofing against famous enterprises
    let isSuspiciousLookalike = false;
    for (const ent of KNOWN_ENTERPRISES) {
      if (company.toLowerCase().includes(ent.name.toLowerCase())) {
        if (!domain.includes(ent.domain) && !isFree) {
          // might be fake domain like google-careers-desk.com
          isSuspiciousLookalike = true;
          warnings.push(`Domain "${domain}" does not match the official enterprise domain "${ent.domain}". Lookalike domains are frequently registered by scammers.`);
          redFlags.push({
            id: 'lookalike_domain',
            title: 'Possible Impersonation / Typosquatting Domain',
            severity: 'critical',
            category: 'domain',
            explanation: `The domain "${domain}" appears to impersonate "${ent.name}" (${ent.domain}). Scammers register variants with prefixes/suffixes (e.g., -careers, -hr, -jobs).`,
            matchedEvidence: `Claimed: ${company} | Email domain: ${domain}`,
            recommendation: 'Do NOT reply to this email. Verify recruiter identity on LinkedIn or apply directly on the official website.'
          });
          scamScoreAcc += 35;
        }
      }
    }

    const legitMatch = Boolean(
      company &&
      !isFree &&
      !isSuspiciousLookalike &&
      domain.includes(company.toLowerCase().replace(/[^a-z0-9]/g, ''))
    );

    if (legitMatch) {
      positiveSignals.push(`Email domain (@${domain}) aligns with corporate name "${company}".`);
      legitimacyAcc += 20;
    }

    domainAnalysis = {
      emailDomain: domain,
      isFreeProvider: isFree,
      providerName: isFree ? domain.split('.')[0] : undefined,
      isSuspiciousLookalike,
      legitimateCompanyDomainMatch: legitMatch,
      warnings
    };
  }

  // 2. Financial / Check Scam Heuristics (CRITICAL)
  const fakeCheckPatterns = [
    { pattern: /(deposit|receive|sent|mail|deliver|issue)\s+(a\s+)?(check|cheque)/i, label: 'Instruction to deposit a mailed or digital check' },
    { pattern: /(approved\s+vendor|accredited\s+vendor|certified\s+vendor|our\s+supplier|office\s+equipment\s+vendor)/i, label: 'Requirement to purchase equipment from an "approved vendor"' },
    { pattern: /(reimburse|reimbursement)\s+(you\s+)?(check|cost|funds)/i, label: 'Promise of reimbursement via future company check' },
    { pattern: /(home\s+office\s+setup|equipment|mini\s+office)\s+(fund|allowance|check|money)/i, label: 'Unsolicited equipment fund check sent upfront' },
    { pattern: /(wire\s+transfer|western\s+union|moneygram|zelle|cash\s*app|venmo|bitcoin|crypto|usdt)/i, label: 'Use of non-refundable money transfers (Zelle/Venmo/Wire/Crypto)' }
  ];

  let fakeCheckMatches = 0;
  for (const p of fakeCheckPatterns) {
    if (p.pattern.test(text) || (input.paymentDetails && p.pattern.test(input.paymentDetails))) {
      fakeCheckMatches++;
    }
  }

  if (fakeCheckMatches >= 2 || input.paymentRequested) {
    redFlags.push({
      id: 'fake_check_equipment_scam',
      title: 'Hallmark Fake Check & Equipment Purchase Scam',
      severity: 'critical',
      category: 'financial',
      explanation: 'The classic fake check scam involves sending a counterfeit check, asking you to deposit it, and instructing you to wire funds to an "approved vendor" for equipment before your bank discovers the check bounced (leaving you with thousands in debt).',
      matchedEvidence: 'Mentions of sending checks, vendor purchases, or non-refundable transfer methods.',
      recommendation: 'NEVER deposit a check from an employer you have not met in person or through verified official channels, and NEVER transfer money back to a vendor.'
    });
    scamScoreAcc += 45;
    financialRiskAcc += 90;
  } else if (fakeCheckMatches === 1) {
    redFlags.push({
      id: 'suspicious_payment_mention',
      title: 'Financial Transaction / Equipment Purchase Mentioned',
      severity: 'high',
      category: 'financial',
      explanation: 'Legitimate employers provide equipment directly through managed IT delivery or formal corporate purchase orders, never by having new hires front costs or handle check transfers.',
      matchedEvidence: 'Detected keywords related to equipment checks or wire transfers.',
      recommendation: 'Demand that the company purchase and ship any necessary hardware directly.'
    });
    scamScoreAcc += 25;
    financialRiskAcc += 50;
  }

  // 3. Interview Platform Red Flags (Telegram, WhatsApp, Signal)
  const chatInterviewPlatforms = [
    { name: 'telegram', regex: /telegram/i },
    { name: 'whatsapp', regex: /whatsapp/i },
    { name: 'signal', regex: /signal(\s+app)?/i },
    { name: 'hangouts', regex: /(google\s+hangouts|google\s+chat)/i },
    { name: 'skype text', regex: /(skype\s+chat|text-only\s+interview)/i }
  ];

  for (const cip of chatInterviewPlatforms) {
    if (cip.regex.test(text) || cip.regex.test(platform)) {
      redFlags.push({
        id: `chat_interview_${cip.name}`,
        title: `Interview Conducted via ${cip.name.toUpperCase()}`,
        severity: 'critical',
        category: 'communication',
        explanation: `Reputable corporate employers do NOT conduct hiring interviews exclusively over consumer chat applications like ${cip.name}. This is one of the highest-frequency indicators of impersonation scams.`,
        matchedEvidence: `Interview channel identified: ${cip.name}`,
        recommendation: 'Insist on an official company meeting invite (Zoom/Google Meet/Teams) hosted on the corporate domain, with camera enabled.'
      });
      scamScoreAcc += 35;
      break;
    }
  }

  // 4. Identity Theft / Sensitive Information Requests Upfront
  const idTheftPatterns = [
    { pattern: /(social\s+security\s+number|ssn|social\s+security)/i, label: 'Social Security Number (SSN)' },
    { pattern: /(driver['’]?s\s+license\s+(copy|front|back)|passport\s+(copy|scan|photo))/i, label: 'Unsecured Government ID copies' },
    { pattern: /(routing\s+number|bank\s+account\s+number|direct\s+deposit\s+form\s+before)/i, label: 'Banking details before formal offer acceptance' },
    { pattern: /(credit\s+score\s+check|credit\s+report\s+link|verify\s+your\s+identity\s+link)/i, label: 'Suspicious credit check links' }
  ];

  let idTheftCount = 0;
  for (const idp of idTheftPatterns) {
    if (idp.pattern.test(text) || (input.personalInfoDetails && idp.pattern.test(input.personalInfoDetails))) {
      idTheftCount++;
    }
  }

  if (idTheftCount >= 1 || input.personalInfoRequested) {
    redFlags.push({
      id: 'premature_identity_request',
      title: 'Premature Request for Highly Sensitive Personal Information',
      severity: 'critical',
      category: 'identity',
      explanation: 'Scammers frequently request SSNs, photos of driver licenses, or bank details before a contract is executed or through unencrypted email/forms to commit identity theft or open fraudulent accounts.',
      matchedEvidence: 'Requests for SSN, photo ID, or banking info detected.',
      recommendation: 'Never disclose SSN, ID scans, or bank accounts until you have signed a legitimate contract through a verified HR management system (e.g., Workday, ADP, Rippling).'
    });
    scamScoreAcc += 30;
    identityRiskAcc += 85;
  }

  // 5. Unrealistic Salary / Too Good To Be True
  const highSalaryEntryPatterns = /(data\s+entry|virtual\s+assistant|customer\s+service|typing|clerk|entry\s+level|receptionist|package\s+inspector|mystery\s+shopper)/i;
  const isEntryLevelRole = highSalaryEntryPatterns.test(title) || highSalaryEntryPatterns.test(text);

  const wageHighPattern = /(\$([4-9]\d|1\d\d)\s*(\/|\s*per\s*)hr|\$([4-9]\d|1\d\d)\s*(\/|\s*per\s*)hour|\$([2-9]\d{3}|1\d{4})\s*(\/|\s*per\s*)week)/i;
  const matchesHighWage = wageHighPattern.test(salary) || wageHighPattern.test(text);

  if (isEntryLevelRole && matchesHighWage) {
    redFlags.push({
      id: 'unrealistic_compensation',
      title: 'Unrealistically High Compensation for Entry-Level Duties',
      severity: 'high',
      category: 'content',
      explanation: 'Offering $40–$100+/hr or thousands per week for simple data entry or virtual assistant roles with no experience required is a classic lure designed to lower your skepticism.',
      matchedEvidence: 'Entry-level title matched with high hourly/weekly pay rate.',
      recommendation: 'Compare the rate against national averages on Glassdoor, Bureau of Labor Statistics, or Levels.fyi.'
    });
    scamScoreAcc += 20;
    financialRiskAcc += 30;
  }

  // 6. Urgency, Pressure Tactics & Scam Phraseology
  const scamPhrases = [
    { regex: /kindly\s+(reply|provide|fill|send|contact)/i, title: 'Unusual Formal Phrase ("Kindly...")', weight: 8 },
    { regex: /(immediate\s+start|start\s+immediately|start\s+today|within\s+24\s+hours|urgent\s+hiring|hurry)/i, title: 'Manufactured Urgency / Pressure to Decide', weight: 12 },
    { regex: /(no\s+interview\s+required|hired\s+without\s+interview|selected\s+immediately|congratulations\s+you\s+have\s+been\s+selected)/i, title: 'Hired Without Real Interview / Evaluation', weight: 20 },
    { regex: /(dear\s+applicant|dear\s+candidate|dear\s+seeker|dear\s+beneficiary)/i, title: 'Generic Greeting (Not Addressed to Your Name)', weight: 8 },
    { regex: /(package\s+reshipping|re-shipping|repack|inspect\s+packages|mystery\s+shopper)/i, title: 'Potential Package Mule / Reshipping Fraud', weight: 35 },
    { regex: /(task\s+optimization|click\s+apps|crypto\s+commissions|recharge\s+balance)/i, title: 'Task Scam / Fake App Optimization Scheme', weight: 35 }
  ];

  for (const sp of scamPhrases) {
    if (sp.regex.test(text)) {
      redFlags.push({
        id: `scam_phrase_${sp.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}`,
        title: sp.title,
        severity: sp.weight >= 20 ? 'high' : 'medium',
        category: 'content',
        explanation: `This phrase or tactic is heavily correlated with fraudulent employment operations attempting to bypass normal verification.`,
        recommendation: 'Slow down the pace. Legitimate hiring processes take days or weeks and include thorough credential vetting.'
      });
      scamScoreAcc += sp.weight;
    }
  }

  // 7. Positive Signals Check
  if (/(multi-round\s+interview|panel\s+interview|technical\s+interview|coding\s+challenge|system\s+design|onsite\s+visit)/i.test(text)) {
    positiveSignals.push('Mentions multi-stage, panel, or technical evaluation process.');
    legitimacyAcc += 25;
  }

  if (/(workday|greenhouse|lever|smartrecruiters|icims|ashby)/i.test(text)) {
    positiveSignals.push('References industry-standard enterprise Applicant Tracking System (ATS).');
    legitimacyAcc += 20;
  }

  if (/(401\(k\)|health\s+insurance|dental|vision|paid\s+time\s+off|equity|rsu)/i.test(text)) {
    positiveSignals.push('Includes standard institutional benefit package details.');
    legitimacyAcc += 10;
  }

  // Calculate normalized scores
  let rawScamScore = Math.min(100, scamScoreAcc);
  // Mitigate by positive signals if no critical flags
  const hasCritical = redFlags.some(f => f.severity === 'critical');
  if (!hasCritical && legitimacyAcc > 20) {
    rawScamScore = Math.max(0, rawScamScore - Math.floor(legitimacyAcc * 0.4));
  }

  // If critical flags exist, score cannot be lower than 70
  if (hasCritical && rawScamScore < 70) {
    rawScamScore = 75;
  }

  // Determine Overall Risk Level
  let overallRisk: AnalysisScores['overallRisk'];
  if (rawScamScore >= 75) {
    overallRisk = 'CRITICAL_SCAM';
  } else if (rawScamScore >= 50) {
    overallRisk = 'HIGH_RISK';
  } else if (rawScamScore >= 25) {
    overallRisk = 'SUSPICIOUS';
  } else if (rawScamScore >= 10) {
    overallRisk = 'LOW';
  } else {
    overallRisk = 'SAFE';
  }

  // Determine primary suspected scam type
  let scamTypeSuspected = 'Undetermined / General Inconsistency';
  if (redFlags.some(f => f.id === 'fake_check_equipment_scam')) {
    scamTypeSuspected = 'Counterfeit Check & Equipment Laundering Scam';
  } else if (redFlags.some(f => f.id.includes('chat_interview'))) {
    scamTypeSuspected = 'Impersonation via Chat (Telegram/WhatsApp Lure)';
  } else if (redFlags.some(f => f.id === 'premature_identity_request')) {
    scamTypeSuspected = 'Identity Theft / Fraudulent Credit Profiling';
  } else if (text.includes('reshipping') || text.includes('repack')) {
    scamTypeSuspected = 'Package Mule / Stolen Goods Reshipping Scheme';
  } else if (text.includes('task optimization') || text.includes('crypto')) {
    scamTypeSuspected = 'Cryptocurrency Task / Advance-Fee Scam';
  }

  // Build recommended actions
  const recommendedActions: string[] = [];
  if (overallRisk === 'CRITICAL_SCAM' || overallRisk === 'HIGH_RISK') {
    recommendedActions.push('CEASE COMMUNICATION IMMEDIATELY. Do not reply to any pending messages.');
    recommendedActions.push('Do NOT deposit any checks, click unverified links, or wire funds via Zelle, Cash App, or Crypto.');
    recommendedActions.push('If you already shared your SSN or banking credentials, contact your bank fraud department and initiate a credit freeze with Experian, Equifax, and TransUnion.');
    recommendedActions.push('File a formal report with the FBI Internet Crime Complaint Center (ic3.gov) and Federal Trade Commission (reportfraud.ftc.gov).');
  } else if (overallRisk === 'SUSPICIOUS') {
    recommendedActions.push('Request a live video interview on Zoom/Teams with cameras enabled and verify recruiter identity.');
    recommendedActions.push('Search LinkedIn to confirm the recruiter currently works at the claimed company.');
    recommendedActions.push('Navigate to the company’s official careers page directly without clicking links in the email to see if the job ID exists.');
  } else {
    recommendedActions.push('Proceed with normal career evaluation diligence.');
    recommendedActions.push('Verify email headers match official corporate domains before signing any offer.');
  }

  // Summary builder
  let summary = '';
  if (overallRisk === 'CRITICAL_SCAM') {
    summary = `CRITICAL ALERT: This job opportunity exhibits definitive patterns of an employment scam (${scamTypeSuspected}). Scammers frequently impersonate real companies to extract money or harvest personal data.`;
  } else if (overallRisk === 'HIGH_RISK') {
    summary = `HIGH RISK DETECTED: Multiple major warning signs were found. We strongly advise against sharing sensitive financial credentials or accepting unsolicited funds.`;
  } else if (overallRisk === 'SUSPICIOUS') {
    summary = `CAUTION ADVISED: Several irregularities or ambiguous indicators were flagged. Independently corroborate the recruiter and hiring procedure before proceeding.`;
  } else if (overallRisk === 'LOW') {
    summary = `LOW RISK: Few or minor non-critical flags found. Follow standard interview safety procedures.`;
  } else {
    summary = `LIKELY LEGITIMATE: No typical scam heuristics or deception patterns were identified. Always preserve digital records and adhere to corporate best practices.`;
  }

  return {
    scores: {
      overallRisk,
      scamScore: rawScamScore,
      confidence: 90,
      financialRisk: Math.min(100, Math.max(financialRiskAcc, hasCritical ? 60 : 10)),
      identityTheftRisk: Math.min(100, Math.max(identityRiskAcc, hasCritical ? 50 : 10)),
      legitimacyScore: Math.min(100, Math.max(10, legitimacyAcc))
    },
    summary,
    redFlags,
    positiveSignals,
    domainAnalysis,
    recommendedActions,
    scamTypeSuspected
  };
}
