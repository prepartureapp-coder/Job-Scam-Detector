import React, { useState, useEffect } from 'react';
import { Users, Search, ThumbsUp, PlusCircle, AlertTriangle, ShieldCheck, Mail, Building2, Filter, Send, X, Flame } from 'lucide-react';
import { CommunityReport } from '../types';
import { INITIAL_COMMUNITY_REPORTS } from '../data/communityReports';

export const CommunityFeed: React.FC = () => {
  const [reports, setReports] = useState<CommunityReport[]>(INITIAL_COMMUNITY_REPORTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // New report form state
  const [newCompany, setNewCompany] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newType, setNewType] = useState('Fake Check & Equipment Scam');
  const [newPlatform, setNewPlatform] = useState('Telegram / WhatsApp');
  const [newDescription, setNewDescription] = useState('');
  const [newLoss, setNewLoss] = useState('$0 (Caught in time)');
  const [newIndicators, setNewIndicators] = useState('Telegram Interview, Fake Check');

  // Load from server if available
  useEffect(() => {
    fetch('/api/reports')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.reports) {
          setReports(data.reports);
        }
      })
      .catch(() => {});
  }, []);

  const handleUpvote = async (id: string) => {
    setReports(prev =>
      prev.map(r => (r.id === id ? { ...r, upvotes: r.upvotes + 1 } : r))
    );

    try {
      await fetch(`/api/reports/${id}/upvote`, { method: 'POST' });
    } catch {}
  };

  const handleSubmitReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompany.trim() || !newDescription.trim()) return;

    setSubmitting(true);
    const indicatorsArr = newIndicators.split(',').map(s => s.trim()).filter(Boolean);

    const payload = {
      companyClaimed: newCompany,
      scammerEmail: newEmail,
      scamType: newType,
      platform: newPlatform,
      description: newDescription,
      lossReported: newLoss,
      indicators: indicatorsArr.length ? indicatorsArr : ['Community Alert']
    };

    try {
      const res = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.report) {
          setReports(prev => [data.report, ...prev]);
        }
      }
    } catch {
      const mockReport: CommunityReport = {
        id: `rep-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        ...payload,
        upvotes: 1
      };
      setReports(prev => [mockReport, ...prev]);
    }

    setSubmitting(false);
    setShowSubmitModal(false);
    setNewCompany('');
    setNewEmail('');
    setNewDescription('');
  };

  const filteredReports = reports.filter(r => {
    const matchesSearch =
      r.companyClaimed.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (r.scammerEmail && r.scammerEmail.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType =
      selectedType === 'all' || r.scamType.toLowerCase().includes(selectedType.toLowerCase());
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header bar with Radiant styling */}
      <div className="bg-gradient-to-r from-slate-900/90 via-fuchsia-950/40 to-slate-900/90 p-6 sm:p-7 rounded-3xl border border-fuchsia-500/30 shadow-[0_0_30px_rgba(217,70,239,0.15)] flex flex-col md:flex-row md:items-center justify-between gap-4 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-fuchsia-500 to-pink-600 text-white shadow-lg shadow-fuchsia-500/30">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-fuchsia-100 to-pink-200">
              Community Threat Intelligence Feed
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
              Real encounters, active fraudulent domains, and recruiter impersonations reported by job seekers
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowSubmitModal(true)}
          className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-fuchsia-600 to-pink-600 hover:from-fuchsia-500 hover:to-pink-500 text-white font-extrabold text-xs flex items-center gap-2 self-start md:self-auto transition shadow-[0_0_20px_rgba(217,70,239,0.3)]"
        >
          <PlusCircle className="h-4 w-4" />
          <span>Report a Scam Encounter</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 shadow-lg flex flex-col sm:flex-row items-center gap-3 backdrop-blur">
        <div className="relative flex-1 w-full">
          <Search className="h-4 w-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search company name, domain, email, or scam tactics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0b0f19] border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-100 focus:outline-none focus:ring-1 focus:ring-fuchsia-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="h-3.5 w-3.5 text-fuchsia-400 shrink-0" />
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="bg-[#0b0f19] border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-fuchsia-500"
          >
            <option value="all">All Scam Archetypes</option>
            <option value="check">Fake Check</option>
            <option value="telegram">Telegram / Chat</option>
            <option value="mule">Package Reshipping</option>
            <option value="identity">Identity Theft</option>
          </select>
        </div>
      </div>

      {/* Report Feed Cards */}
      <div className="space-y-4">
        {filteredReports.length === 0 ? (
          <div className="p-8 text-center bg-slate-900/40 rounded-3xl border border-slate-800 text-slate-400 text-xs">
            No scam reports match your query.
          </div>
        ) : (
          filteredReports.map((report) => (
            <div
              key={report.id}
              className="bg-slate-900/80 rounded-3xl border border-slate-800/80 p-5 sm:p-6 space-y-4 hover:border-fuchsia-500/40 transition-all shadow-lg backdrop-blur"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-rose-500/15 text-rose-400 border border-rose-500/30">
                    <AlertTriangle className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-white flex items-center gap-2">
                      <span>{report.companyClaimed}</span>
                      <span className="text-xs font-semibold text-slate-400">via {report.platform}</span>
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                      <span className="text-amber-400 font-bold">{report.scamType}</span>
                      <span>•</span>
                      <span className="text-slate-400 font-mono">{report.date}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs px-2.5 py-1 rounded-full bg-[#0b0f19] border border-slate-800 text-slate-300">
                    Reported Loss: <strong className="text-rose-400">{report.lossReported}</strong>
                  </span>
                  <button
                    onClick={() => handleUpvote(report.id)}
                    className="flex items-center gap-1.5 text-xs px-3 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition font-bold"
                    title="Helpful alert"
                  >
                    <ThumbsUp className="h-3.5 w-3.5 text-fuchsia-400" />
                    <span>{report.upvotes}</span>
                  </button>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {report.description}
              </p>

              {report.scammerEmail && (
                <div className="text-xs font-mono text-slate-300 bg-[#0b0f19] p-3 rounded-xl border border-slate-800 flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-fuchsia-400" />
                  <span>Reported Contact:</span>
                  <strong className="text-amber-300">{report.scammerEmail}</strong>
                </div>
              )}

              {/* Tag Indicators */}
              <div className="flex flex-wrap gap-2 pt-1">
                {report.indicators.map((ind, i) => (
                  <span
                    key={i}
                    className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-fuchsia-500/10 text-fuchsia-300 border border-fuchsia-500/30"
                  >
                    #{ind}
                  </span>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Submit Report Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-fuchsia-500/30 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-fuchsia-400" />
                <span>Submit a Scam Incident Alert</span>
              </h3>
              <button
                onClick={() => setShowSubmitModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitReport} className="space-y-3.5 text-xs">
              <div>
                <label className="text-slate-200 font-bold block mb-1">Company Impersonated / Claimed</label>
                <input
                  type="text"
                  placeholder="e.g. Acme Health Logistics"
                  value={newCompany}
                  onChange={(e) => setNewCompany(e.target.value)}
                  required
                  className="w-full bg-[#0b0f19] border border-slate-800 rounded-xl p-2.5 text-slate-100 focus:outline-none focus:ring-1 focus:ring-fuchsia-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-200 font-bold block mb-1">Scammer Email / Handle</label>
                  <input
                    type="text"
                    placeholder="e.g. hr@acme-careers.net"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="w-full bg-[#0b0f19] border border-slate-800 rounded-xl p-2.5 text-slate-100 focus:outline-none focus:ring-1 focus:ring-fuchsia-500"
                  />
                </div>

                <div>
                  <label className="text-slate-200 font-bold block mb-1">Platform Used</label>
                  <input
                    type="text"
                    placeholder="e.g. Indeed, Telegram, WhatsApp"
                    value={newPlatform}
                    onChange={(e) => setNewPlatform(e.target.value)}
                    className="w-full bg-[#0b0f19] border border-slate-800 rounded-xl p-2.5 text-slate-100 focus:outline-none focus:ring-1 focus:ring-fuchsia-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-200 font-bold block mb-1">Scam Type</label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value)}
                  className="w-full bg-[#0b0f19] border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:ring-1 focus:ring-fuchsia-500"
                >
                  <option value="Fake Check & Equipment Scam">Fake Check & Equipment Scam</option>
                  <option value="Telegram / WhatsApp Chat Interview">Telegram / WhatsApp Chat Interview</option>
                  <option value="Premature Identity Theft (SSN/ID)">Premature Identity Theft (SSN/ID)</option>
                  <option value="Package Reshipping Scheme">Package Reshipping Scheme</option>
                  <option value="Crypto Task & App Rating Scam">Crypto Task & App Rating Scam</option>
                  <option value="Phishing Link / Clone Site">Phishing Link / Clone Site</option>
                </select>
              </div>

              <div>
                <label className="text-slate-200 font-bold block mb-1">Description of What Happened</label>
                <textarea
                  rows={3}
                  placeholder="Detail the tactics used, what they asked you to do, and how you realized it was fraudulent..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  required
                  className="w-full bg-[#0b0f19] border border-slate-800 rounded-xl p-2.5 text-slate-100 focus:outline-none focus:ring-1 focus:ring-fuchsia-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold hover:bg-slate-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white font-extrabold hover:from-fuchsia-500 hover:to-pink-500 transition flex items-center gap-1.5 shadow-[0_0_15px_rgba(217,70,239,0.3)]"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Publish Alert</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
