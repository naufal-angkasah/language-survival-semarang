import React from 'react';
import { Language } from '../types';
import { BookOpen, HelpCircle, ShieldAlert, Award } from 'lucide-react';

export type ActiveTab = 'guide' | 'quiz' | 'emergency' | 'validator';

interface BottomNavProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  language: Language;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  language,
}) => {
  const navItems: { id: ActiveTab; labelId: string; labelEn: string; icon: React.ReactNode }[] = [
    {
      id: 'guide',
      labelId: 'Panduan',
      labelEn: 'Handbook',
      icon: <BookOpen className="w-5 h-5" />,
    },
    {
      id: 'quiz',
      labelId: 'Kuis Riset',
      labelEn: 'Quiz',
      icon: <HelpCircle className="w-5 h-5" />,
    },
    {
      id: 'emergency',
      labelId: 'Darurat',
      labelEn: 'Emergency',
      icon: <ShieldAlert className="w-5 h-5" />,
    },
    {
      id: 'validator',
      labelId: 'Mode Pakar',
      labelEn: 'Evaluator',
      icon: <Award className="w-5 h-5" />,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 shadow-sm">
      <div className="max-w-md mx-auto grid grid-cols-4 gap-1">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition active-press ${
                isActive
                  ? 'text-blue-700 font-bold'
                  : 'text-slate-500 hover:text-slate-800 font-medium'
              }`}
            >
              <div
                className={`p-1.5 rounded-xl transition ${
                  isActive ? 'bg-blue-50 text-blue-700 shadow-2xs' : 'text-slate-400'
                }`}
              >
                {item.icon}
              </div>
              <span className="text-[11px] tracking-tight mt-0.5">
                {language === 'id' ? item.labelId : item.labelEn}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
