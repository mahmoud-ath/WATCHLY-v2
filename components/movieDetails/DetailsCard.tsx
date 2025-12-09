import React from 'react';
import { Film, Calendar, Clock, DollarSign, TrendingUp, LucideIcon } from 'lucide-react';

interface DetailsCardProps {
  releaseDate: string;
  runtime: string;
  budget: string;
  revenue: string;
}

interface DetailItem {
  icon: LucideIcon;
  label: string;
  value: string;
}

export const DetailsCard: React.FC<DetailsCardProps> = ({ 
  releaseDate, 
  runtime, 
  budget, 
  revenue 
}) => {
  const formatCurrency = (value: string) => {
    if (value === 'N/A') return value;
    const num = parseFloat(value.replace(/[^0-9.-]+/g, ''));
    if (num >= 1000) return `$${(num / 1000).toFixed(1)}B`;
    return value;
  };

  const details: DetailItem[] = [
    { 
      icon: Calendar, 
      label: 'Release Date', 
      value: new Date(releaseDate).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }) 
    },
    { icon: Clock, label: 'Runtime', value: runtime },
    ...(budget !== 'N/A' ? [{ icon: DollarSign, label: 'Budget', value: budget }] : []),
    ...(revenue !== 'N/A' ? [{ icon: TrendingUp, label: 'Revenue', value: formatCurrency(revenue) }] : []),
  ];

  return (
    <div className="bg-slate-900/50 rounded-lg md:rounded-xl p-4 md:p-6 border border-slate-800/50">
      <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
        <Film className="w-5 h-5 md:w-6 md:h-6 text-rose-400" />
        <h3 className="text-lg md:text-xl font-bold text-white">Details</h3>
      </div>
      <div className="space-y-3 md:space-y-4">
        {details.map((item, index) => (
          <div 
            key={index} 
            className="flex items-center gap-3 md:gap-4 p-2.5 md:p-3 bg-slate-800/30 rounded-lg hover:bg-slate-800/50 transition-colors"
          >
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0">
              <item.icon className="w-4 h-4 md:w-5 md:h-5 text-slate-400" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-slate-400 text-xs md:text-sm">{item.label}</p>
              <p className="text-white font-medium text-sm md:text-base truncate">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
