'use client';

import { useState } from 'react';
import useTranslation from '@/hooks/useTranslation';
import { AllIcon, ModerationIcon, MusicIcon, InfoIcon } from '@/components/icons/IconsSvg';

export type CategoryType = 'general' | 'moderation' | 'music' | 'info';

const categoryIconMap = {
  general: <AllIcon />,
  moderation: <ModerationIcon />,
  music: <MusicIcon />,
  info: <InfoIcon />
};

interface Command {
    name: string;
    description: string;
    category?: string;
    // другие поля...
}

interface CommandsFilterProps {
  categories: CategoryType[];
  onFilter: (category: string) => void;
  commands: Command[];
}

export default function CommandsFilter({ categories, onFilter, commands }: CommandsFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const { t } = useTranslation();

  // Предварительный подсчет команд по категориям
  const categoryCounts = categories.reduce((acc, category) => {
    acc[category] = commands.filter(cmd => cmd.category?.toLowerCase() === category).length;
    return acc;
  }, {} as Record<CategoryType, number>);

  const handleCategoryClick = (category: string) => {
    if (selectedCategory === category) return;
    setSelectedCategory(category);
    onFilter(category);
  };

  const buttonClasses = "flex items-center justify-between px-4 py-2 rounded-md transition-colors";
  const activeButtonClasses = "bg-[#43b581] text-white";
  const inactiveButtonClasses = "hover:bg-[#2d332d] text-gray-300";

  return (
    <div className="flex flex-col space-y-1">
      <button
        onClick={() => handleCategoryClick('')}
        className={`${buttonClasses} ${selectedCategory === '' ? activeButtonClasses : inactiveButtonClasses}`}
      >
        <span className="flex items-center gap-2">
          <AllIcon />
          {t('commands.categories.all')}
        </span>
        <span className="text-sm opacity-75">{commands.length}</span>
      </button>

      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleCategoryClick(category)}
          className={`${buttonClasses} ${selectedCategory === category ? activeButtonClasses : inactiveButtonClasses}`}
        >
          <span className="flex items-center gap-2">
            {categoryIconMap[category]}
            {t(`commands.categories.${category.toLowerCase()}`)}
          </span>
          <span className="text-sm opacity-75">{categoryCounts[category]}</span>
        </button>
      ))}
    </div>
  );
} 