import React, { useState } from 'react';
import { QuizQuestion, Language } from '../types';
import { CheckCircle2, XCircle, RotateCcw, Award, ArrowRight } from 'lucide-react';

interface QuizModalProps {
  questions: QuizQuestion[];
  language: Language;
}

export const QuizModal: React.FC<QuizModalProps> = ({ questions, language }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = questions[currentIdx];

  const handleSelectOption = (optId: string) => {
    if (selectedOption !== null) return;
    setSelectedOption(optId);

    const chosen = currentQ.options.find((o) => o.id === optId);
    if (chosen && chosen.isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      setIsFinished(true);
    }
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="space-y-4 pb-12">
      {/* Header Info */}
      <div className="bg-blue-600 text-white p-4 sm:p-5 rounded-2xl shadow-sm shadow-blue-600/15">
        <div className="flex items-center justify-between gap-2">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider bg-white/20 text-white px-2 py-0.5 rounded-full">
              {language === 'id' ? 'Instrumen Riset Disertasi' : 'Dissertation Research Test'}
            </span>
            <h3 className="text-sm sm:text-base font-extrabold mt-1 text-white">
              {language === 'id'
                ? 'Simulasi Pre-Test & Post-Test Budaya'
                : 'Cultural Adaptation Situation Quiz'}
            </h3>
            <p className="text-xs text-blue-100 mt-0.5">
              {language === 'id'
                ? 'Pengukuran pemahaman etiket & komunikasi bertahan hidup di Semarang'
                : 'Assessment of survival communication and etiquette in Semarang'}
            </p>
          </div>
          <Award className="w-8 h-8 text-blue-200 shrink-0" />
        </div>
      </div>

      {!isFinished ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-3">
          {/* Progress */}
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 border-b border-slate-100 pb-2">
            <span>
              {language === 'id' ? 'Pertanyaan' : 'Question'} {currentIdx + 1} / {questions.length}
            </span>
            <span className="text-blue-700 font-extrabold">
              {language === 'id' ? 'Skor Saat Ini' : 'Current Score'}: {score}
            </span>
          </div>

          {/* Skenario Situasi */}
          <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-3 text-xs text-slate-800">
            <span className="font-bold text-blue-900 block mb-0.5">
              📍 {language === 'id' ? 'Skenario Situasi:' : 'Scenario:'}
            </span>
            <p className="leading-relaxed text-slate-700">
              {language === 'id' ? currentQ.situationId : currentQ.situationEn}
            </p>
          </div>

          {/* Pertanyaan */}
          <h4 className="text-sm font-bold text-slate-900 pt-1">
            {language === 'id' ? currentQ.questionId : currentQ.questionEn}
          </h4>

          {/* Pilihan Jawaban */}
          <div className="space-y-2 pt-1">
            {currentQ.options.map((opt) => {
              const isChosen = selectedOption === opt.id;
              const hasAnswered = selectedOption !== null;

              let btnStyle = 'bg-white border-slate-200 text-slate-800 hover:border-blue-300';
              if (hasAnswered) {
                if (opt.isCorrect) {
                  btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold';
                } else if (isChosen && !opt.isCorrect) {
                  btnStyle = 'bg-rose-50 border-rose-500 text-rose-950';
                }
              }

              return (
                <div key={opt.id}>
                  <button
                    onClick={() => handleSelectOption(opt.id)}
                    disabled={hasAnswered}
                    className={`w-full text-left p-3 rounded-xl border text-xs transition flex items-start gap-2.5 ${btnStyle} active-press`}
                  >
                    <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center shrink-0 text-[10px] font-bold mt-0.5">
                      {opt.id.split('-')[1]?.toUpperCase()}
                    </span>
                    <span className="flex-1">
                      {language === 'id' ? opt.textId : opt.textEn}
                    </span>
                    {hasAnswered && opt.isCorrect && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    )}
                    {hasAnswered && isChosen && !opt.isCorrect && (
                      <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    )}
                  </button>

                  {/* Penjelasan jika sudah dijawab */}
                  {hasAnswered && (isChosen || opt.isCorrect) && (
                    <div
                      className={`text-[11px] p-2.5 rounded-lg mt-1 ml-7 ${
                        opt.isCorrect
                          ? 'bg-emerald-100/70 text-emerald-900'
                          : 'bg-rose-100/70 text-rose-900'
                      }`}
                    >
                      {language === 'id' ? opt.explanationId : opt.explanationEn}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Tombol Lanjut */}
          {selectedOption && (
            <button
              onClick={handleNext}
              className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 shadow-sm shadow-blue-600/20"
            >
              <span>{currentIdx < questions.length - 1 ? 'Soal Berikutnya' : 'Lihat Hasil Tes'}</span>
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </button>
          )}
        </div>
      ) : (
        /* KARTU HASIL AKHIR */
        <div className="bg-white border border-slate-200 rounded-3xl p-6 text-center shadow-xs max-w-sm mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto mb-3 shadow-md shadow-blue-500/20">
            <Award className="w-7 h-7" />
          </div>
          <h3 className="text-base font-extrabold text-slate-900">
            {language === 'id' ? 'Hasil Tes Situasi Budaya' : 'Cultural Test Result'}
          </h3>
          <p className="text-2xl font-black text-blue-700 my-2">
            {score} / {questions.length}
          </p>
          <p className="text-xs text-slate-500 mb-5 leading-relaxed">
            {score === questions.length
              ? 'Luar biasa! Pemahaman adaptasi budaya lokal Semarang Anda sangat baik.'
              : 'Terus tingkatkan pemahaman dengan membaca tips budaya di dalam modul.'}
          </p>
          <button
            onClick={handleReset}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 shadow-sm shadow-blue-600/20"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Ulangi Tes</span>
          </button>
        </div>
      )}
    </div>
  );
};
