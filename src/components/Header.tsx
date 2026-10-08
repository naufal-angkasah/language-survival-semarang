import React from 'react';
import { Language } from '../types';
import { Globe2, Download, BookOpen } from 'lucide-react';

interface HeaderProps {
  language: Language;
  onToggleLanguage: () => void;
  deferredPrompt: any;
  onInstallPwa: () => void;
  isInstalled: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onToggleLanguage,
  deferredPrompt,
  onInstallPwa,
  isInstalled,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur-md text-white border-b border-slate-800 px-4 py-3 shadow-md">
      <div className="max-w-2xl mx-auto flex items-center justify-between gap-3">
        {/* Brand & Title */}
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-lg shadow-orange-950/30">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-orange-400">Semarang MALL</span>
              <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded font-mono">v1.0</span>
            </div>
            <h1 className="text-sm font-bold tracking-tight text-white line-clamp-1">
              Language Survival Book
            </h1>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* PWA Install Button */}
          {!isInstalled && deferredPrompt && (
            <button
              onClick={onInstallPwa}
              className="flex items-center gap-1 bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg active-press transition shadow-sm"
              title="Install to Homescreen"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Install App</span>
            </button>
          )}

          {/* Bilingual Switcher */}
          <button
            onClick={onToggleLanguage}
            className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold px-2.5 py-1.5 rounded-lg active-press transition"
            aria-label="Toggle language"
          >
            <Globe2 className="w-3.5 h-3.5 text-orange-400" />
            <span>{language === 'id' ? '🇮🇩 ID' : '🇬🇧 EN'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
