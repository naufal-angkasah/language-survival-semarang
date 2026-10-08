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
    const iconClass = isSelected ? 'w-5 h-5 text-white' : 'w-5 h-5 text-blue-700';
    switch (category.id) {
      case 'transport':
        return <Bus className={iconClass} />;
      case 'culinary':
        return <UtensilsCrossed className={iconClass} />;
      case 'etiquette':
        return <Smile className={iconClass} />;
      case 'emergency':
        return <ShieldAlert className={iconClass} />;
      case 'culture':
        return <Compass className={iconClass} />;
      default:
        return <Compass className={iconClass} />;
    }
  };

  return (
    <button
      onClick={onSelect}
      className={`w-full text-left p-3.5 rounded-2xl border transition active-press relative ${
        isSelected
          ? 'bg-blue-600 text-white border-blue-600 shadow-md ring-2 ring-blue-400/40'
          : 'bg-white text-slate-900 border-slate-200 hover:border-blue-300 shadow-2xs'
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition ${
            isSelected ? 'bg-blue-700' : 'bg-blue-50 border border-blue-100'
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
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                isSelected
                  ? 'bg-white/20 text-white'
                  : 'bg-blue-50 text-blue-700 border border-blue-100'
              }`}
            >
              {category.badge}
            </span>
          </div>
          <p
            className={`text-xs line-clamp-2 ${
              isSelected ? 'text-blue-100' : 'text-slate-500'
            }`}
          >
            {language === 'id' ? category.descId : category.descEn}
          </p>
        </div>
      </div>
    </button>
  );
};
