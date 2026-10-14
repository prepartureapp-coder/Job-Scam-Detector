# 🛡️ Job Scam Detector

> **Intelligent threat detection platform for job seekers to identify fraudulent employment listings, recruiter impersonations, counterfeit check schemes, and deceptive hiring offers.**

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19.0-61dafb.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)
![Vite](https://img.shields.io/badge/Vite-6.0-646cff.svg)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4.0-38bdf8.svg)

---

## 🎯 Overview

With the explosive rise in remote work opportunities, cybercriminals increasingly exploit job seekers through sophisticated employment scams. The **Job Scam Detector** is a multi-vector threat intelligence platform designed to protect applicants before they lose money or disclose sensitive personal data.

The system analyzes job postings, recruiter communications, WhatsApp/Telegram messages, and offer letters against behavioral signatures compiled by the **Federal Trade Commission (FTC)** and the **FBI Internet Crime Complaint Center (IC3)**.

---

## ✨ Key Features

### 1. 🔍 Heuristic & AI-Augmented Scam Analyzer
- **Multi-Vector Detection Engine**: Scans text for classic scam signatures (counterfeit check laundering, advance-fee equipment purchase requests, non-refundable payment apps like Zelle/Cash App/Crypto, premature SSN/banking demands).
- **Linguistic & Urgency Analysis**: Identifies manufactured urgency ("Immediate start within 24 hours"), generic salutations ("Dear Applicant"), and suspicious formal phrasing.
- **AI Forensic Insights**: Optional server-side analysis powered by Gemini for subtle psychological manipulation cues, with seamless 100% deterministic local heuristic fallback.
- **Explainable Threat Matrix**: Breaks down overall risk score (0–100%), Financial Risk, Identity Theft Risk, and Authenticity Score with matched evidence quotes.

### 2. 🌐 Recruiter Domain & Email Authenticator
- **Lookalike & Typosquatting Detection**: Flags domains that mimic enterprise trademarks using suspicious suffixes (`-careers`, `-jobs`, `-recruitment`, `-portal`, `-desk`).
- **Free Webmail Filter**: Flags recruiters claiming to represent Fortune 500 corporations while emailing from public `@gmail.com`, `@yahoo.com`, or `@outlook.com` addresses.
- **Verification Toolkit**: Step-by-step guides for inspecting WHOIS domain age, enterprise MX records, and LinkedIn credentials.

### 3. 🏦 Interactive Fake Check Scam Simulator
- **Visual Day-by-Day Timeline**: Walks users through the exact mechanics of the $3,800+ equipment purchase scam.
- **Regulation CC Demystification**: Explains why federal "Available Funds" rules cause victims to mistakenly believe a check has cleared when full interbank verification actually takes weeks.
- **Financial Risk Explainer**: Clarifies why account holders are held legally liable when deposited counterfeit checks bounce.

### 4. 📚 Scam Patterns Library
Comprehensive field manual detailing the top 6 modern employment scams:
- **Telegram & WhatsApp Text-Only Interviews**
- **Counterfeit Check & Equipment Vendor Trap**
- **Premature Identity Harvesting (SSN / Tax Forms / Direct Deposit)**
- **Package Reshipping Mule Schemes**
- **Cryptocurrency Task & Fake App Optimization Schemes**
- **Disguised Multi-Level Marketing (MLM) & Pyramid Operations**

### 5. 👥 Community Threat Intelligence Feed
- **Live Incident Tracker**: Browse reports from applicants who flagged suspicious recruiters, lookalike domains, and interview requests.
- **Community Upvoting & Reporting**: Submit incident reports to warn other job seekers.

### 6. 🧠 Scam IQ & Reflex Assessment
- Realistic scenario-based test evaluating instincts on lookalike domains, fake checks, and premature onboarding requests with immediate educational takeaways.

### 7. 🚨 Victim Emergency Incident Response Playbook
Action checklist for victims who may have already compromised sensitive data:
- **Immediate Credit Bureau Freezes** (direct links to Experian, Equifax, TransUnion)
- **FTC Identity Theft Affidavit** (IdentityTheft.gov)
- **FBI IC3 Reporting** (ic3.gov)
- **Bank Fraud Notification Guidelines** (protecting ChexSystems/EWS records)

### 8. 🎨 Vibrant Theme Engine
- Instant color palette switcher in the header:
  - **Neon**: Cyber violet, indigo, and radiant rose.
  - **Cobalt**: Electric blue, cyan, and deep oceanic navy.
  - **Emerald**: Mint green, tech teal, and warm gold.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Lucide Icons
- **Build System**: Vite 6
- **Backend / Proxy**: Express, tsx
- **AI Integration**: `@google/genai` (Gemini API with offline rule-engine fallback)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+ (Node.js 22 recommended)
- npm

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/prepartureapp-coder/Job-Scam-Detector.git
   cd Job-Scam-Detector
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```
   Add your Gemini API key (optional — app functions fully with local heuristic engine):
   ```env
   GEMINI_API_KEY=your_api_key_here
   PORT=3000
   ```

4. **Start Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Build for Production:**
   ```bash
   npm run build
   ```

---

## 🔒 Privacy & Safety Notice

- **Zero-Storage Privacy**: Input text evaluated client-side or transiently via server proxy. No sensitive documents or resumes are permanently logged.
- **Educational Tool**: This software provides heuristic threat indicators to aid job seekers. Always conduct independent verification before sending funds or entering into employment contracts.

---

## 📄 License

MIT License. Designed to protect the global job seeker community.
