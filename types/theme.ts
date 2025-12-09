export type ColorTheme = 'purple' | 'green' | 'orange';

export interface ThemeConfig {
  colorTheme: ColorTheme;
}

export const COLOR_THEMES = {
  purple: {
    primary: '#6366f1',
    secondary: '#a855f7',
    accent: '#ec4899',
    button: 'bg-indigo-600 hover:bg-indigo-500',
    buttonAlt: 'bg-purple-600 hover:bg-purple-500',
    text: 'text-indigo-400',
    textHover: 'hover:text-indigo-400',
    border: 'border-indigo-500/20',
    borderHover: 'hover:border-indigo-500/40',
    glow: 'shadow-indigo-500/30',
    glowHover: 'hover:shadow-indigo-500/40',
    bg: 'bg-indigo-600/20',
    bgHover: 'hover:bg-indigo-600/30',
  },
  green: {
    primary: '#10b981',
    secondary: '#14b8a6',
    accent: '#06b6d4',
    button: 'bg-emerald-600 hover:bg-emerald-500',
    buttonAlt: 'bg-teal-600 hover:bg-teal-500',
    text: 'text-emerald-400',
    textHover: 'hover:text-emerald-400',
    border: 'border-emerald-500/20',
    borderHover: 'hover:border-emerald-500/40',
    glow: 'shadow-emerald-500/30',
    glowHover: 'hover:shadow-emerald-500/40',
    bg: 'bg-emerald-600/20',
    bgHover: 'hover:bg-emerald-600/30',
  },
  orange: {
    primary: '#f97316',
    secondary: '#fb923c',
    accent: '#fbbf24',
    button: 'bg-orange-600 hover:bg-orange-500',
    buttonAlt: 'bg-amber-600 hover:bg-amber-500',
    text: 'text-orange-400',
    textHover: 'hover:text-orange-400',
    border: 'border-orange-500/20',
    borderHover: 'hover:border-orange-500/40',
    glow: 'shadow-orange-500/30',
    glowHover: 'hover:shadow-orange-500/40',
    bg: 'bg-orange-600/20',
    bgHover: 'hover:bg-orange-600/30',
  },
};
