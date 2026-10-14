export type Severity = 'critical' | 'high' | 'medium' | 'low' | 'positive';

export interface RedFlag {
  id: string;
  title: string;
  severity: Severity;
  category: 'financial' | 'communication' | 'hiring_process' | 'domain' | 'identity' | 'content';
  explanation: string;
  matchedEvidence?: string;
  recommendation: string;
}

export interface DomainCheckResult {
  emailDomain: string;
  isFreeProvider: boolean;
  providerName?: string;
  isSuspiciousLookalike: boolean;
  legitimateCompanyDomainMatch: boolean;
  warnings: string[];
}

export interface AnalysisScores {
  overallRisk: 'SAFE' | 'LOW' | 'SUSPICIOUS' | 'HIGH_RISK' | 'CRITICAL_SCAM';
  scamScore: number; // 0 (100% safe) to 100 (100% scam)
  confidence: number; // 0 to 100
  financialRisk: number; // 0 to 100
  identityTheftRisk: number; // 0 to 100
  legitimacyScore: number; // 0 to 100
}

export interface JobAnalysisResult {
  scores: AnalysisScores;
  summary: string;
  redFlags: RedFlag[];
  positiveSignals: string[];
  domainAnalysis?: DomainCheckResult;
  recommendedActions: string[];
  scamTypeSuspected?: string;
  aiInsights?: string;
}

export interface JobInputData {
  rawText: string;
  jobTitle?: string;
  companyName?: string;
  recruiterEmail?: string;
  companyWebsite?: string;
  salaryOffered?: string;
  interviewPlatform?: string;
  paymentRequested?: boolean;
  paymentDetails?: string;
  personalInfoRequested?: boolean;
  personalInfoDetails?: string;
}

export interface CommunityReport {
  id: string;
  date: string;
  companyClaimed: string;
  scammerEmail?: string;
  scamType: string;
  platform: string;
  description: string;
  lossReported: string;
  upvotes: number;
  indicators: string[];
}
