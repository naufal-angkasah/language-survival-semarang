import React from 'react';
import { Search, X } from 'lucide-react';
import { Language } from '../types';

interface QuickSearchProps {
  language: Language;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeTag: string | null;
  onSelectTag: (tag: string | null) => void;
}

const POPULAR_TAGS = ['trans semarang', 'lumpia', 'halal', 'nuwun sewu', 'rumah sakit'];

export const QuickSearch: React.FC<QuickSearchProps> = ({
  language,
  searchQuery,
  onSearchChange,
  activeTag,
  onSelectTag,
}) => {
  return (
    <div className="space-y-2.5">
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={
            language === 'id'
              ? 'Cari kosakata, situasi, atau kata kunci (cth: lumpia, bus, sakit)...'
              : 'Search phrases, situations, or keywords (e.g., becak, hospital)...'
          }
          className="w-full pl-10 pr-9 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 shadow-sm transition"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Quick Tag Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
        <span className="text-slate-500 font-medium shrink-0">
          {language === 'id' ? 'Populer:' : 'Quick:'}
        </span>
        {POPULAR_TAGS.map((tag) => {
          const isSelected = activeTag === tag;
          return (
            <button
              key={tag}
              onClick={() => onSelectTag(isSelected ? null : tag)}
              className={`px-2.5 py-1 rounded-full font-medium transition active-press shrink-0 border ${
                isSelected
                  ? 'bg-orange-600 text-white border-orange-600 shadow-sm'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
              }`}
            >
              #{tag}
            </button>
          );
        })}
      </div>
    </div>
  );
};
