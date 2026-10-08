import React from 'react';
import { Language } from '../types';
import { Globe2, Download, BookOpen, LayoutDashboard } from 'lucide-react';

interface HeaderProps {
  language: Language;
  onToggleLanguage: () => void;
  deferredPrompt: any;
  onInstallPwa: () => void;
  isInstalled: boolean;
  onOpenAdmin: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onToggleLanguage,
  deferredPrompt,
  onInstallPwa,
  isInstalled,
  onOpenAdmin,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 py-3 shadow-2xs">
      <div className="max-w-2xl mx-auto flex items-center justify-between gap-3">
        {/* Brand & Title */}
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-700">Semarang MALL</span>
              <span className="text-[10px] bg-blue-50 text-blue-800 border border-blue-200/80 px-1.5 py-0.2 rounded font-semibold">BIPA</span>
            </div>
            <h1 className="text-sm font-bold tracking-tight text-slate-900 line-clamp-1">
              Language Survival Book
            </h1>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Admin Dashboard Quick Switch Button */}
          <button
            onClick={onOpenAdmin}
            className="flex items-center gap-1 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-2.5 py-1.5 rounded-xl active-press transition shadow-2xs"
            title="Buka Web Dashboard Admin Peneliti"
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden sm:inline">Admin</span>
          </button>

          {/* PWA Install Button */}
          {!isInstalled && deferredPrompt && (
            <button
              onClick={onInstallPwa}
              className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl active-press transition shadow-2xs"
              title="Install to Homescreen"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Install</span>
            </button>
          )}

          {/* Bilingual Switcher */}
          <button
            onClick={onToggleLanguage}
            className="flex items-center gap-1.5 bg-blue-50 hover:bg-blue-100/80 text-blue-900 border border-blue-200 text-xs font-bold px-3 py-1.5 rounded-xl active-press transition shadow-2xs"
            aria-label="Toggle language"
          >
            <Globe2 className="w-3.5 h-3.5 text-blue-600" />
            <span>{language === 'id' ? '🇮🇩 ID' : '🇬🇧 EN'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
