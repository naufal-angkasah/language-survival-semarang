import React, { useState } from 'react';
import { SurvivalPhrase, Language } from '../types';
import { Volume2, VolumeX, Bookmark, BookmarkCheck, CheckCircle, Info } from 'lucide-react';

interface PhraseCardProps {
  phrase: SurvivalPhrase;
  language: Language;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
}

export const PhraseCard: React.FC<PhraseCardProps> = ({
  phrase,
  language,
  isBookmarked,
  onToggleBookmark,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  // Native Speech Synthesis Engine for realistic Indonesian audio playback
  const handlePlayAudio = () => {
    if (!('speechSynthesis' in window)) {
      alert('Browser tidak mendukung pemutar suara.');
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(phrase.phraseId);
    utterance.lang = 'id-ID';
    utterance.rate = 0.88; // slightly slower for foreign learners
    utterance.pitch = 1.0;

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs hover:border-blue-300 transition">
      {/* Top Bar: Key Phrase Tag & Bookmark */}
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <div className="flex items-center gap-1.5 flex-wrap">
          {phrase.isImportant && (
            <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 border border-blue-200/80 text-[10px] font-bold px-2 py-0.5 rounded-full">
              <CheckCircle className="w-2.5 h-2.5 text-blue-600" />
              {language === 'id' ? 'Frasa Penting' : 'Key Phrase'}
            </span>
          )}
          {phrase.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] text-slate-500 bg-slate-50 border border-slate-200/60 px-2 py-0.5 rounded-full font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>

        <button
          onClick={() => onToggleBookmark(phrase.id)}
          className="text-slate-300 hover:text-blue-600 transition p-1"
          aria-label="Bookmark phrase"
          title={isBookmarked ? 'Tersimpan' : 'Simpan frasa'}
        >
          {isBookmarked ? (
            <BookmarkCheck className="w-4 h-4 text-blue-600 fill-blue-600" />
          ) : (
            <Bookmark className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Main Phrase Content (High Contrast, Senior-Accessible Typography) */}
      <div className="mb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            {/* Indonesian Primary Text */}
            <h4 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight leading-snug">
              {phrase.phraseId}
            </h4>

            {/* Phonetic Pronunciation Guide */}
            <div className="mt-1">
              <span className="text-xs font-mono font-semibold text-blue-800 bg-blue-50 border border-blue-100 inline-block px-2 py-0.5 rounded">
                🗣️ {phrase.phonetic}
              </span>
            </div>

            {/* English Meaning */}
            <p className="text-sm font-semibold text-slate-600 mt-2">
              🇬🇧 {phrase.phraseEn}
            </p>
          </div>

          {/* Large Audio Speaker Button (Clean Royal Blue 48x48 Touch Target) */}
          <button
            onClick={handlePlayAudio}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 active-press transition shadow-sm ${
              isPlaying
                ? 'bg-blue-800 text-white ring-4 ring-blue-100 animate-pulse'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20'
            }`}
            aria-label="Dengarkan pelafalan"
            title="Dengarkan pelafalan suara"
          >
            {isPlaying ? (
              <VolumeX className="w-6 h-6" />
            ) : (
              <Volume2 className="w-6 h-6 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Cultural Adaptation Context Note */}
      {phrase.contextNoteId && (
        <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5 text-xs text-slate-700">
          <div className="flex items-start gap-2">
            <Info className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="font-bold text-slate-900 block mb-0.5">
                {language === 'id' ? 'Catatan Budaya Semarang:' : 'Semarang Cultural Note:'}
              </span>
              <p className="text-slate-600 leading-relaxed">
                {language === 'id' ? phrase.contextNoteId : phrase.contextNoteEn}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
