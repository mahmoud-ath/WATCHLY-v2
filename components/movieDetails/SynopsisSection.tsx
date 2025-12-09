import React from 'react';

interface SynopsisSectionProps {
  overview: string;
}

export const SynopsisSection: React.FC<SynopsisSectionProps> = ({ overview }) => {
  return (
    <section>
      <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
        <div className="w-1 md:w-1.5 h-6 md:h-8 bg-indigo-500 rounded-full"></div>
        <h2 className="text-xl md:text-2xl font-bold text-white">Synopsis</h2>
      </div>
      <div className="bg-slate-900/50 rounded-lg md:rounded-xl p-4 md:p-6 border border-slate-800/50">
        <p className="text-slate-300 text-sm md:text-lg leading-relaxed">
          {overview || 'No overview available.'}
        </p>
      </div>
    </section>
  );
};
