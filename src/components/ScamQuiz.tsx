import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle, Award, RotateCcw, ArrowRight, ShieldCheck, AlertTriangle } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/quizData';

export const ScamQuiz: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentIdx];

  const handleSelectOption = (idx: number) => {
    if (selectedOptionIdx !== null) return;
    setSelectedOptionIdx(idx);
    if (currentQ.options[idx].isSafe) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    setSelectedOptionIdx(null);
    if (currentIdx + 1 < QUIZ_QUESTIONS.length) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setCompleted(true);
    }
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setSelectedOptionIdx(null);
    setScore(0);
    setCompleted(false);
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div className="bg-gradient-to-r from-slate-900/90 via-emerald-950/40 to-slate-900/90 p-6 sm:p-7 rounded-3xl border border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.15)] space-y-2 relative overflow-hidden backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30">
            <HelpCircle className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-100 to-teal-200">
              Scam IQ & Instinct Assessment
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
              Can you spot deceptive traps before it costs you thousands? Test your threat reflexes on genuine FBI scenarios.
            </p>
          </div>
        </div>
      </div>

      {!completed ? (
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-7 space-y-6 shadow-xl backdrop-blur">
          <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-3">
            <span className="font-black text-emerald-400 uppercase tracking-wider">
              Question {currentIdx + 1} of {QUIZ_QUESTIONS.length}
            </span>
            <span className="px-3 py-1 rounded-full bg-[#0b0f19] border border-emerald-500/30 text-emerald-300 font-semibold">
              Category: {currentQ.scamCategory}
            </span>
          </div>

          <div className="space-y-2">
            <h3 className="text-base sm:text-lg font-black text-white leading-snug">
              {currentQ.scenario}
            </h3>
            <p className="text-xs text-slate-400 italic">
              What is the most secure response?
            </p>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOptionIdx === idx;
              const hasAnswered = selectedOptionIdx !== null;

              let btnStyle = 'bg-[#0b0f19] border-slate-800 hover:border-emerald-500/40 text-slate-200';
              if (hasAnswered) {
                if (opt.isSafe) {
                  btnStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.25)]';
                } else if (isSelected && !opt.isSafe) {
                  btnStyle = 'bg-rose-950/60 border-rose-500 text-rose-200 shadow-[0_0_15px_rgba(244,63,94,0.25)]';
                } else {
                  btnStyle = 'bg-[#0b0f19]/40 border-slate-900 text-slate-500 opacity-50';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={hasAnswered}
                  className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm font-semibold transition flex items-start justify-between gap-3 ${btnStyle}`}
                >
                  <span className="leading-relaxed">{opt.text}</span>
                  {hasAnswered && opt.isSafe && (
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                  )}
                  {hasAnswered && isSelected && !opt.isSafe && (
                    <XCircle className="h-5 w-5 text-rose-400 shrink-0 mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation after selection */}
          {selectedOptionIdx !== null && (
            <div className={`p-5 rounded-2xl border text-xs sm:text-sm space-y-2 animate-in fade-in ${
              currentQ.options[selectedOptionIdx].isSafe
                ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200 shadow-[0_0_20px_rgba(16,185,129,0.2)]'
                : 'bg-rose-950/40 border-rose-500/50 text-rose-200 shadow-[0_0_20px_rgba(244,63,94,0.2)]'
            }`}>
              <span className="font-black block text-sm">
                {currentQ.options[selectedOptionIdx].isSafe ? 'Spot On Decision!' : 'Dangerous Mistake!'}
              </span>
              <p className="leading-relaxed">
                {currentQ.options[selectedOptionIdx].explanation}
              </p>
              <div className="pt-1 text-xs text-amber-300 flex items-center gap-1.5 font-bold">
                <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0" />
                <span>Expert Takeaway: {currentQ.tip}</span>
              </div>
            </div>
          )}

          {/* Next Button */}
          {selectedOptionIdx !== null && (
            <div className="flex justify-end pt-2">
              <button
                onClick={handleNext}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 transition shadow-[0_0_20px_rgba(16,185,129,0.3)]"
              >
                <span>{currentIdx + 1 === QUIZ_QUESTIONS.length ? 'View Final Results' : 'Next Question'}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Quiz Finished Summary */
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 text-center space-y-6 shadow-2xl backdrop-blur animate-in zoom-in-95 duration-200">
          <div className="h-20 w-20 mx-auto rounded-3xl bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/30">
            <Award className="h-10 w-10" />
          </div>

          <div className="space-y-1">
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Assessment Completed!
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              You correctly identified {score} out of {QUIZ_QUESTIONS.length} threat scenarios.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0b0f19] border border-slate-800 max-w-sm mx-auto text-xs space-y-1">
            <span className="text-slate-400 uppercase text-[10px] font-black tracking-wider block">Fraud Resilience Tier</span>
            <span className={`text-xl font-black ${score === QUIZ_QUESTIONS.length ? 'text-emerald-400' : score >= 2 ? 'text-amber-400' : 'text-rose-400'}`}>
              {score === QUIZ_QUESTIONS.length
                ? 'High Resilience (Expert Fraud Spotter)'
                : score >= 2
                ? 'Moderate Awareness (Beware of Check Scams)'
                : 'High Vulnerability (Review Knowledge Base)'}
            </span>
          </div>

          <button
            onClick={handleReset}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs sm:text-sm inline-flex items-center gap-2 transition shadow-[0_0_20px_rgba(16,185,129,0.3)]"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Retake Assessment</span>
          </button>
        </div>
      )}
    </div>
  );
};
