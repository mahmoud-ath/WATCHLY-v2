import React from 'react';
import { Users } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface CastCrewCardProps {
  director: string;
  cast: string[];
}

export const CastCrewCard: React.FC<CastCrewCardProps> = ({ director, cast }) => {
  const { themeClasses } = useTheme();
  
  return (
    <div className="bg-slate-900/50 rounded-lg md:rounded-xl p-4 md:p-6 border border-slate-800/50">
      <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
        <Users className={`w-5 h-5 md:w-6 md:h-6 ${themeClasses.text}`} />
        <h3 className="text-lg md:text-xl font-bold text-white">Cast & Crew</h3>
      </div>
      <div className="space-y-3 md:space-y-4">
        <div className="bg-slate-800/30 rounded-lg p-3 md:p-4">
          <p className="text-slate-400 text-xs md:text-sm mb-1">Director</p>
          <p className="text-white text-base md:text-lg font-semibold flex items-center gap-2">
            <div className={`w-2 h-2 ${themeClasses.button} rounded-full`}></div>
            {director}
          </p>
        </div>
        <div className="bg-slate-800/30 rounded-lg p-3 md:p-4">
          <p className="text-slate-400 text-xs md:text-sm mb-2">Main Cast</p>
          <div className="space-y-1.5 md:space-y-2">
            {cast.slice(0, 5).map((actor, index) => (
              <div key={actor} className="flex items-center gap-2 md:gap-3">
                <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs text-slate-400">
                  {index + 1}
                </div>
                <span className="text-slate-300">{actor}</span>
              </div>
            ))}
          </div>
          {cast.length > 5 && (
            <button className={`text-sm ${themeClasses.text} ${themeClasses.textHover} mt-3`}>
              + {cast.length - 5} more
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
