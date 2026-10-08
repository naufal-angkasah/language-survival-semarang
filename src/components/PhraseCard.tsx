import React, { useState } from 'react';
import { SurvivalPhrase, Language } from '../types';
import { 
  Volume2, 
  VolumeX, 
  Bookmark, 
  BookmarkCheck, 
  CheckCircle, 
  Info, 
  Sparkles,
  Gauge
} from 'lucide-react';
import { 
  speakIndonesian, 
  stopSpeech, 
  getProsodyForTone, 
  detectEmotionTone, 
  EmotionTone 
} from '../utils/speechEngine';

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
  const [isSlowMode, setIsSlowMode] = useState(false);

  // Determine emotional tone for this phrase
  const tone: EmotionTone = phrase.emotionTone || detectEmotionTone(phrase.phraseId, phrase.categoryId);
  const prosody = getProsodyForTone(tone, isSlowMode);

  // Play audio with local emotional inflection
  const handlePlayAudio = (slowOverride?: boolean) => {
    const useSlow = slowOverride !== undefined ? slowOverride : isSlowMode;

    if (isPlaying) {
      stopSpeech();
      setIsPlaying(false);
      return;
    }

    speakIndonesian(phrase.phraseId, tone, {
      isSlow: useSlow,
      onStart: () => setIsPlaying(true),
      onEnd: () => setIsPlaying(false),
      onError: () => setIsPlaying(false),
    });
  };

  return (
    <div className={`bg-white border rounded-2xl p-4 transition shadow-xs ${
      isPlaying ? 'border-blue-500 ring-2 ring-blue-100 shadow-md' : 'border-slate-200 hover:border-blue-300'
    }`}>
      {/* Top Bar: Key Phrase Tag, Emotion Badge, & Bookmark */}
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <div className="flex items-center gap-1.5 flex-wrap">
          {phrase.isImportant && (
            <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 border border-blue-200/80 text-[10px] font-bold px-2 py-0.5 rounded-full">
              <CheckCircle className="w-2.5 h-2.5 text-blue-600" />
              {language === 'id' ? 'Frasa Kunci' : 'Key Phrase'}
            </span>
          )}

          {/* Emotional Prosody Indicator Badge */}
          <span className={`inline-flex items-center gap-1 border text-[10px] font-bold px-2 py-0.5 rounded-full ${prosody.badgeStyle}`}>
            <span>{prosody.icon}</span>
            <span>{language === 'id' ? (phrase.emotionLabelId || prosody.labelId) : (phrase.emotionLabelEn || prosody.labelEn)}</span>
          </span>

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
          className="text-slate-300 hover:text-blue-600 transition p-1 shrink-0"
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

          {/* Interactive Audio Controls Container */}
          <div className="flex flex-col items-center gap-1.5 shrink-0">
            {/* Large Audio Speaker Button (Clean Royal Blue 48x48 Touch Target) */}
            <button
              onClick={() => handlePlayAudio()}
              className={`w-12 h-12 rounded-2xl flex items-center justify-center active-press transition shadow-sm ${
                isPlaying
                  ? 'bg-blue-800 text-white ring-4 ring-blue-100 animate-pulse'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20'
              }`}
              aria-label="Dengarkan suara emosional warga lokal"
              title={isPlaying ? 'Hentikan audio' : 'Dengarkan suara lokal'}
            >
              {isPlaying ? (
                <VolumeX className="w-6 h-6 animate-pulse" />
              ) : (
                <Volume2 className="w-6 h-6 text-white" />
              )}
            </button>

            {/* Slow Speed (0.8x) Articulation Toggle for BIPA Students */}
            <button
              onClick={() => {
                const nextSlow = !isSlowMode;
                setIsSlowMode(nextSlow);
                handlePlayAudio(nextSlow);
              }}
              className={`text-[9px] font-bold px-2 py-0.5 rounded-full border transition flex items-center gap-0.5 ${
                isSlowMode
                  ? 'bg-blue-100 text-blue-800 border-blue-300'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-500 border-slate-200'
              }`}
              title="Putar suara tempo lambat (0.8x) untuk latihan artikulasi lidah"
            >
              <Gauge className="w-2.5 h-2.5" />
              <span>{isSlowMode ? '0.8x Pelan' : '1.0x Alami'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Speaking Active Indicator Banner */}
      {isPlaying && (
        <div className="bg-blue-50/80 border border-blue-200 rounded-xl px-3 py-1.5 mb-2.5 flex items-center justify-between text-xs text-blue-900 animate-fadeIn">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-spin" />
            <span className="font-semibold">
              {language === 'id' 
                ? `Memutar intonasi lokal: ${phrase.emotionLabelId || prosody.labelId}`
                : `Playing local prosody: ${phrase.emotionLabelEn || prosody.labelEn}`}
            </span>
          </div>
          <span className="text-[10px] font-mono font-bold text-blue-700 bg-white border border-blue-200 px-1.5 py-0.5 rounded">
            {isSlowMode ? 'Tempo 0.8x' : 'Tempo Normal'}
          </span>
        </div>
      )}

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
