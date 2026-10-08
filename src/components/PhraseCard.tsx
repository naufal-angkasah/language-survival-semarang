import React, { useState } from 'react';
import { SurvivalPhrase, Language } from '../types';
import { Volume2, VolumeX, Bookmark, BookmarkCheck, Sparkles, Info } from 'lucide-react';

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
  const [showNote, setShowNote] = useState(true);

  // Native Speech Synthesis Engine for realistic Indonesian audio playback
  const handlePlayAudio = () => {
    if (!('speechSynthesis' in window)) {
      alert('Browser tidak mendukung pemutar suara.');
      return;
    }

    window.speechSynthesis.cancel(); // stop any active speech

    const utterance = new SpeechSynthesisUtterance(phrase.phraseId);
    utterance.lang = 'id-ID';
    utterance.rate = 0.88; // slightly slower for language learners
    utterance.pitch = 1.0;

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm hover:shadow-md transition relative">
      {/* Top Bar: Important Badge & Bookmark */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-1.5 flex-wrap">
          {phrase.isImportant && (
            <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200/60 text-[10px] font-bold px-2 py-0.5 rounded-full">
              <Sparkles className="w-2.5 h-2.5 text-amber-600" />
              {language === 'id' ? 'Frasa Kunci' : 'Essential'}
            </span>
          )}
          {phrase.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>

        <button
          onClick={() => onToggleBookmark(phrase.id)}
          className="text-slate-400 hover:text-orange-600 transition p-1"
          aria-label="Bookmark phrase"
          title={isBookmarked ? 'Saved' : 'Save phrase'}
        >
          {isBookmarked ? (
            <BookmarkCheck className="w-4 h-4 text-orange-600 fill-orange-600" />
          ) : (
            <Bookmark className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Main Phrase Content (High Contrast, Senior-Accessible Typography) */}
      <div className="mb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            {/* Indonesian Primary Text */}
            <h4 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight leading-snug">
              {phrase.phraseId}
            </h4>

            {/* Phonetic Pronunciation Guide */}
            <p className="text-xs font-mono font-medium text-amber-700 bg-amber-50/70 inline-block px-2 py-0.5 rounded mt-1">
              🗣️ {phrase.phonetic}
            </p>

            {/* English Meaning */}
            <p className="text-sm font-semibold text-slate-600 mt-1.5">
              🇬🇧 {phrase.phraseEn}
            </p>
          </div>

          {/* Large Audio Speaker Button (Ergonomic 48x48 Touch Target) */}
          <button
            onClick={handlePlayAudio}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 active-press transition shadow-md ${
              isPlaying
                ? 'bg-emerald-600 text-white ring-4 ring-emerald-100 animate-pulse'
                : 'bg-slate-900 hover:bg-slate-800 text-white shadow-slate-950/20'
            }`}
            aria-label="Dengarkan pelafalan"
            title="Dengarkan pelafalan suara"
          >
            {isPlaying ? (
              <VolumeX className="w-6 h-6 animate-bounce" />
            ) : (
              <Volume2 className="w-6 h-6 text-orange-400" />
            )}
          </button>
        </div>
      </div>

      {/* Cultural Adaptation Context Note */}
      {phrase.contextNoteId && (
        <div className="bg-slate-50 border border-slate-100 rounded-xl p-2.5 text-xs text-slate-700">
          <div className="flex items-start gap-2">
            <Info className="w-3.5 h-3.5 text-orange-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="font-bold text-slate-900 block mb-0.5">
                {language === 'id' ? 'Catatan Budaya Semarang:' : 'Semarang Cultural Insight:'}
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
