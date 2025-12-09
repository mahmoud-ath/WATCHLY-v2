import React from 'react';

interface LoadingGridProps {
  count?: number;
}

const LoadingGrid: React.FC<LoadingGridProps> = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {[...Array(count)].map((_, i) => (
        <div 
          key={i} 
          className="aspect-[2/3] bg-slate-900 rounded-xl animate-pulse border border-slate-800"
        />
      ))}
    </div>
  );
};

export default LoadingGrid;
