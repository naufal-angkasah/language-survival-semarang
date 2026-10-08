import React from 'react';
import { CategoryInfo, Language } from '../types';
import { Bus, UtensilsCrossed, Smile, ShieldAlert, Compass } from 'lucide-react';

interface CategoryCardProps {
  category: CategoryInfo;
  language: Language;
  isSelected: boolean;
  onSelect: () => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  language,
  isSelected,
  onSelect,
}) => {
  const getIcon = () => {
    switch (category.id) {
      case 'transport':
        return <Bus className="w-5 h-5 text-blue-600" />;
      case 'culinary':
        return <UtensilsCrossed className="w-5 h-5 text-amber-600" />;
      case 'etiquette':
        return <Smile className="w-5 h-5 text-emerald-600" />;
      case 'emergency':
        return <ShieldAlert className="w-5 h-5 text-rose-600" />;
      case 'culture':
        return <Compass className="w-5 h-5 text-purple-600" />;
      default:
        return <Compass className="w-5 h-5 text-slate-600" />;
    }
  };

  return (
    <button
      onClick={onSelect}
      className={`w-full text-left p-3.5 rounded-2xl border transition active-press relative ${
        isSelected
          ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-orange-500/50'
          : 'bg-white text-slate-900 border-slate-200 hover:border-slate-300 shadow-sm'
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
            isSelected ? 'bg-slate-800' : 'bg-slate-50 border border-slate-100'
          }`}
        >
          {getIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-1 mb-0.5">
            <h3
              className={`text-sm font-bold truncate ${
                isSelected ? 'text-white' : 'text-slate-900'
              }`}
            >
              {language === 'id' ? category.titleId : category.titleEn}
            </h3>
            <span
              className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${
                isSelected
                  ? 'bg-orange-500 text-white'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              {category.badge}
            </span>
          </div>
          <p
            className={`text-xs line-clamp-2 ${
              isSelected ? 'text-slate-300' : 'text-slate-500'
            }`}
          >
            {language === 'id' ? category.descId : category.descEn}
          </p>
        </div>
      </div>
    </button>
  );
};
