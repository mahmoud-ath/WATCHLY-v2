import React from 'react';
import { Globe, Star } from 'lucide-react';

interface QuickStatsCardProps {
  rating: number;
  genresCount: number;
  castCount: number;
}

export const QuickStatsCard: React.FC<QuickStatsCardProps> = ({ 
  rating, 
  genresCount, 
  castCount 
}) => {
  return (
    <div className="bg-slate-900/50 rounded-lg md:rounded-xl p-4 md:p-6 border border-slate-800/50">
      <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
        <Globe className="w-5 h-5 md:w-6 md:h-6 text-emerald-400" />
        <h3 className="text-lg md:text-xl font-bold text-white">Quick Stats</h3>
      </div>
      <div className="space-y-3 md:space-y-4">
        <div className="bg-slate-800/50 rounded-lg p-3 md:p-4">
          <div className="flex justify-between items-center">
            <span className="text-slate-400 text-sm md:text-base">Rating</span>
            <div className="flex items-center gap-2">
              <span className="text-xl md:text-2xl font-bold text-white">{rating}</span>
              <Star className="w-4 h-4 md:w-5 md:h-5 text-yellow-500 fill-yellow-500" />
            </div>
          </div>
          <div className="mt-2 w-full bg-slate-800 rounded-full h-1.5 md:h-2">
            <div 
              className="bg-yellow-500 h-1.5 md:h-2 rounded-full" 
              style={{ width: `${rating * 10}%` }}
            ></div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 md:gap-3">
          <div className="bg-slate-800/30 rounded-lg p-3 md:p-4 text-center">
            <p className="text-slate-400 text-xs md:text-sm">Genres</p>
            <p className="text-white font-semibold text-sm md:text-base">{genresCount}</p>
          </div>
          <div className="bg-slate-800/30 rounded-lg p-3 md:p-4 text-center">
            <p className="text-slate-400 text-xs md:text-sm">Cast</p>
            <p className="text-white font-semibold text-sm md:text-base">{castCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
