import React, { useState } from 'react';
import { Filter, Star, Calendar, Tag, ChevronDown } from 'lucide-react';
import { TMDB_GENRES } from '../../services/tmdbService';
import { useTheme } from '../../contexts/ThemeContext';

export interface FilterState {
  contentType: 'movie' | 'tv';
  genres: number[];
  yearFrom: number;
  yearTo: number;
  minRating: number;
}

interface FilterPanelProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onApply: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onFilterChange, onApply }) => {
  const { themeClasses } = useTheme();
  const currentYear = new Date().getFullYear();
  const genres = filters.contentType === 'movie' ? TMDB_GENRES.movie : TMDB_GENRES.tv;
  const [expandedFilter, setExpandedFilter] = useState<string | null>(null);
  
  const toggleGenre = (genreId: number) => {
    const newGenres = filters.genres.includes(genreId)
      ? filters.genres.filter(id => id !== genreId)
      : [...filters.genres, genreId];
    onFilterChange({ ...filters, genres: newGenres });
  };

  const FilterPill = ({ 
    label, 
    value, 
    icon: Icon,
    onClick,
    active
  }: { 
    label: string; 
    value?: string;
    icon: any;
    onClick?: () => void;
    active?: boolean;
  }) => (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all border ${
        active
          ? `${themeClasses.bg} ${themeClasses.text} ${themeClasses.border} shadow-lg ${themeClasses.glow}`
          : 'bg-slate-800/50 text-slate-400 border-slate-700/50 hover:bg-slate-800 hover:text-white hover:border-slate-600'
      }`}
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
      {value && <span className="text-slate-500 ml-1">{value}</span>}
      <ChevronDown className={`w-3 h-3 ml-2 transition-transform ${expandedFilter === label.toLowerCase() ? 'rotate-180' : ''}`} />
    </button>
  );

  return (
    <div className="space-y-4">
      {/* Main Filter Bar */}
      <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800/50 rounded-xl shadow-xl py-4">
        <div className="flex items-center gap-4 px-6">
          {/* Filter Label */}
          <div className="flex items-center gap-2">
            <div className={`p-2 ${themeClasses.button} rounded-lg shadow-lg ${themeClasses.glow}`}>
              <Filter className="w-4 h-4 text-white" />
            </div>
            <h3 className="font-semibold text-white">Filters:</h3>
          </div>

          {/* Filter Pills */}
          <div className="flex-1 flex items-center gap-3 flex-wrap">
            <FilterPill 
              label="Type" 
              value={filters.contentType === 'movie' ? 'Movies' : 'TV Shows'}
              icon={Filter}
              onClick={() => setExpandedFilter(expandedFilter === 'type' ? null : 'type')}
              active={true}
            />
            
            <FilterPill 
              label="Genres" 
              value={filters.genres.length > 0 ? `${filters.genres.length} selected` : undefined}
              icon={Tag}
              onClick={() => setExpandedFilter(expandedFilter === 'genres' ? null : 'genres')}
              active={filters.genres.length > 0}
            />
            
            <FilterPill 
              label="Year" 
              value={`${filters.yearFrom} - ${filters.yearTo}`}
              icon={Calendar}
              onClick={() => setExpandedFilter(expandedFilter === 'year' ? null : 'year')}
              active={filters.yearFrom !== currentYear - 5 || filters.yearTo !== currentYear}
            />
            
            <FilterPill 
              label="Rating" 
              value={`${filters.minRating}+`}
              icon={Star}
              onClick={() => setExpandedFilter(expandedFilter === 'rating' ? null : 'rating')}
              active={filters.minRating > 6.0}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onFilterChange({
                contentType: 'movie',
                genres: [],
                yearFrom: currentYear - 5,
                yearTo: currentYear,
                minRating: 6.0,
              })}
              className="px-4 py-2 text-slate-400 hover:text-white text-sm font-medium hover:bg-slate-800 rounded-lg transition-all"
            >
              Reset
            </button>
            <button
              onClick={onApply}
              className={`px-6 py-2 ${themeClasses.button} text-white font-semibold rounded-lg transition-all shadow-lg ${themeClasses.glow}`}
            >
              Apply
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Filter Panels */}
      {expandedFilter && (
        <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800/50 rounded-xl shadow-2xl p-6">
          {expandedFilter === 'type' && (
            <div className="space-y-4">
              <h4 className="font-semibold text-white">Content Type</h4>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => {
                    onFilterChange({ ...filters, contentType: 'movie', genres: [] });
                    setExpandedFilter(null);
                  }}
                  className={`p-4 rounded-xl border text-center transition-all ${
                    filters.contentType === 'movie'
                      ? `${themeClasses.bg} ${themeClasses.border} text-white shadow-lg ${themeClasses.glow}`
                      : 'bg-slate-800/50 border-slate-700/50 text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <div className="text-lg font-semibold mb-1">Movies</div>
                  <div className="text-sm text-slate-500">Feature films</div>
                </button>
                <button
                  onClick={() => {
                    onFilterChange({ ...filters, contentType: 'tv', genres: [] });
                    setExpandedFilter(null);
                  }}
                  className={`p-4 rounded-xl border text-center transition-all ${
                    filters.contentType === 'tv'
                      ? `${themeClasses.bg} ${themeClasses.border} text-white shadow-lg ${themeClasses.glow}`
                      : 'bg-slate-800/50 border-slate-700/50 text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <div className="text-lg font-semibold mb-1">TV Shows</div>
                  <div className="text-sm text-slate-500">Series & episodes</div>
                </button>
              </div>
            </div>
          )}

          {expandedFilter === 'genres' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-white">Select Genres</h4>
                {filters.genres.length > 0 && (
                  <button
                    onClick={() => onFilterChange({ ...filters, genres: [] })}
                    className={`text-sm ${themeClasses.text} ${themeClasses.textHover}`}
                  >
                    Clear selection
                  </button>
                )}
              </div>
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-h-96 overflow-y-auto custom-scrollbar pr-2">
                {genres.map((genre) => (
                  <button
                    key={genre.id}
                    onClick={() => toggleGenre(genre.id)}
                    className={`p-3 rounded-lg border text-center transition-all ${
                      filters.genres.includes(genre.id)
                        ? `${themeClasses.button} text-white ${themeClasses.border} shadow-lg ${themeClasses.glow}`
                        : 'bg-slate-800/50 text-slate-400 border-slate-700/50 hover:bg-slate-800 hover:text-white hover:border-slate-600'
                    }`}
                  >
                    <div className="text-sm font-medium">{genre.name}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {expandedFilter === 'year' && (
            <div className="space-y-6">
              <h4 className="font-semibold text-white">Release Year Range</h4>
              <div className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="flex-1">
                    <label className="text-sm text-slate-400 mb-2 block">From: {filters.yearFrom}</label>
                    <input
                      type="range"
                      min="1950"
                      max={filters.yearTo}
                      value={filters.yearFrom}
                      onChange={(e) => {
                        const newYearFrom = parseInt(e.target.value);
                        onFilterChange({ 
                          ...filters, 
                          yearFrom: newYearFrom,
                          yearTo: Math.max(newYearFrom, filters.yearTo)
                        });
                      }}
                      className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                  </div>
                  <div className="text-slate-600">→</div>
                  <div className="flex-1">
                    <label className="text-sm text-slate-400 mb-2 block">To: {filters.yearTo}</label>
                    <input
                      type="range"
                      min={filters.yearFrom}
                      max={currentYear}
                      value={filters.yearTo}
                      onChange={(e) => {
                        const newYearTo = parseInt(e.target.value);
                        onFilterChange({ 
                          ...filters, 
                          yearTo: newYearTo,
                          yearFrom: Math.min(filters.yearFrom, newYearTo)
                        });
                      }}
                      className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center px-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">{filters.yearFrom}</div>
                    <div className="text-sm text-slate-500">From</div>
                  </div>
                  <div className="text-slate-600">━━━</div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">{filters.yearTo}</div>
                    <div className="text-sm text-slate-500">To</div>
                  </div>
                </div>
                {filters.yearFrom === filters.yearTo && (
                  <div className="bg-yellow-600/20 border border-yellow-500/50 rounded-lg p-3 text-center">
                    <p className="text-sm text-yellow-300">
                      Showing content from <span className="font-bold">{filters.yearFrom}</span> only
                    </p>
                  </div>
                )}
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => setExpandedFilter(null)}
                  className={`px-6 py-2 ${themeClasses.button} text-white font-semibold rounded-lg shadow-lg ${themeClasses.glow}`}
                >
                  Done
                </button>
              </div>
            </div>
          )}

          {expandedFilter === 'rating' && (
            <div className="space-y-6">
              <h4 className="font-semibold text-white">Minimum Rating</h4>
              <div className="grid grid-cols-5 gap-3">
                {[6.0, 6.5, 7.0, 7.5, 8.0, 8.5, 9.0, 9.5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => {
                      onFilterChange({ ...filters, minRating: rating });
                      setExpandedFilter(null);
                    }}
                    className={`p-4 rounded-xl flex flex-col items-center justify-center transition-all border ${
                      filters.minRating === rating
                        ? 'bg-yellow-600/20 border-yellow-500 text-white shadow-lg shadow-yellow-500/20'
                        : 'bg-slate-800/50 border-slate-700/50 text-slate-400 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <Star className={`w-5 h-5 mb-2 ${
                      rating <= filters.minRating ? 'fill-yellow-500 text-yellow-500' : 'text-slate-600'
                    }`} />
                    <span className="text-lg font-bold">
                      {rating}+
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterPanel;