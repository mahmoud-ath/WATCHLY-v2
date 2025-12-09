import React from 'react';

interface ResultsHeaderProps {
  query: string;
  totalResults: number;
}

const ResultsHeader: React.FC<ResultsHeaderProps> = ({ query, totalResults }) => {
  const getTitle = () => {
    if (query && query !== 'trending') {
      return `Results for "${query}"`;
    }
    return 'All Trending Movies';
  };

  return (
    <div className="mb-8">
      <h3 className="text-2xl font-bold text-white">
        {getTitle()}
      </h3>
      <p className="text-slate-400 mt-1">
        {totalResults} {totalResults === 1 ? 'title' : 'titles'} found
      </p>
    </div>
  );
};

export default ResultsHeader;
