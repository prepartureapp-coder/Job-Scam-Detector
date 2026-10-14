import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { analyzeJobSubmission } from './src/utils/detector';
import { INITIAL_COMMUNITY_REPORTS } from './src/data/communityReports';
import { CommunityReport, JobInputData } from './src/types';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

app.use(cors());
app.use(express.json({ limit: '5mb' }));

// In-memory reports store
let reportsStore: CommunityReport[] = [...INITIAL_COMMUNITY_REPORTS];

// Initialize Gemini if key exists
let geminiClient: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    geminiClient = new GoogleGenAI({});
  } catch (err) {
    console.warn('[AI Studio] Gemini client initialization error:', err);
  }
}

// API Routes
app.post('/api/analyze', async (req, res) => {
  try {
    const inputData: JobInputData = req.body;
    
    // Always compute robust deterministic heuristic analysis
    const result = analyzeJobSubmission(inputData);

    // If Gemini client is active, attempt to augment with deep AI linguistic analysis
    if (geminiClient && inputData.rawText && inputData.rawText.trim().length > 20) {
      try {
        const prompt = `You are a world-class cybersecurity fraud investigator specializing in employment scams, phishing, and corporate impersonation.
Analyze the following job posting, recruiter email, or offer communication:

---
Company: ${inputData.companyName || 'Not specified'}
Title: ${inputData.jobTitle || 'Not specified'}
Recruiter Email: ${inputData.recruiterEmail || 'Not specified'}
Interview Platform: ${inputData.interviewPlatform || 'Not specified'}
Salary: ${inputData.salaryOffered || 'Not specified'}
Payment Request Details: ${inputData.paymentDetails || 'None'}
Personal Info Requested: ${inputData.personalInfoDetails || 'None'}

Body Text:
${inputData.rawText.slice(0, 3000)}
---

Provide a concise, 2-to-3 sentence forensic insight explaining the psychological manipulation tactics, phrasing anomalies, or impersonation techniques present in this communication.
Be factual, direct, and actionable. Do not repeat generic disclaimers.`;

        const aiResponse = await geminiClient.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
        });

        if (aiResponse.text) {
          result.aiInsights = aiResponse.text.trim();
        }
      } catch (aiErr) {
        console.warn('[AI Studio] Gemini analysis error, falling back to heuristic engine:', aiErr);
      }
    }

    return res.json({ success: true, result });
  } catch (error: any) {
    console.error('Error during job analysis:', error);
    return res.status(500).json({ success: false, error: error.message || 'Internal analysis error' });
  }
});

// Community Reports API
app.get('/api/reports', (req, res) => {
  const query = ((req.query.q as string) || '').toLowerCase().trim();
  const type = ((req.query.type as string) || '').toLowerCase().trim();

  let filtered = [...reportsStore];
  if (query) {
    filtered = filtered.filter(
      r =>
        r.companyClaimed.toLowerCase().includes(query) ||
        r.description.toLowerCase().includes(query) ||
        (r.scammerEmail && r.scammerEmail.toLowerCase().includes(query)) ||
        r.indicators.some(i => i.toLowerCase().includes(query))
    );
  }
  if (type && type !== 'all') {
    filtered = filtered.filter(r => r.scamType.toLowerCase().includes(type));
  }

  return res.json({ success: true, reports: filtered });
});

app.post('/api/reports', (req, res) => {
  try {
    const { companyClaimed, scammerEmail, scamType, platform, description, lossReported, indicators } = req.body;
    if (!companyClaimed || !description) {
      return res.status(400).json({ success: false, error: 'Company and description are required.' });
    }

    const newReport: CommunityReport = {
      id: `rep-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      companyClaimed: companyClaimed.trim(),
      scammerEmail: (scammerEmail || '').trim(),
      scamType: scamType || 'General Fraud',
      platform: platform || 'Email',
      description: description.trim(),
      lossReported: lossReported || '$0',
      upvotes: 1,
      indicators: Array.isArray(indicators) ? indicators : ['User Submitted']
    };

    reportsStore.unshift(newReport);
    return res.status(201).json({ success: true, report: newReport });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message || 'Failed to save report' });
  }
});

app.post('/api/reports/:id/upvote', (req, res) => {
  const report = reportsStore.find(r => r.id === req.params.id);
  if (report) {
    report.upvotes += 1;
    return res.json({ success: true, upvotes: report.upvotes });
  }
  return res.status(404).json({ success: false, error: 'Report not found' });
});

// Vite middleware or static serving
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Job Scam Detector] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
});
