import React from 'react';
import { Play, DollarSign, ExternalLink } from 'lucide-react';

interface Provider {
  provider_id: number;
  provider_name: string;
  logo_path: string;
}

interface WatchProvidersData {
  flatrate?: Provider[];
  rent?: Provider[];
  buy?: Provider[];
}

interface WatchOptionsProps {
  watchProviders: WatchProvidersData | null;
}

export const WatchOptions: React.FC<WatchOptionsProps> = ({ watchProviders }) => {
  if (!watchProviders || (!watchProviders.flatrate && !watchProviders.rent && !watchProviders.buy)) {
    return null;
  }

  return (
    <section>
      <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
        <div className="w-1 md:w-1.5 h-6 md:h-8 bg-emerald-500 rounded-full"></div>
        <h2 className="text-xl md:text-2xl font-bold text-white">Where to Watch</h2>
      </div>
      <div className="bg-slate-900/50 rounded-xl md:rounded-2xl p-4 md:p-6 border border-slate-800/50 space-y-6 md:space-y-8">
        {watchProviders.flatrate && (
          <div>
            <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
              <Play className="w-4 h-4 md:w-5 md:h-5 text-emerald-400" />
              <h3 className="text-base md:text-xl font-semibold text-white">Streaming Services</h3>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 md:gap-4">
              {watchProviders.flatrate.map((provider) => (
                <a
                  key={provider.provider_id}
                  href="#"
                  className="group bg-slate-800/50 hover:bg-slate-800 rounded-lg md:rounded-xl p-2 md:p-4 transition-all duration-300 hover:scale-105"
                >
                  <img
                    src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                    alt={provider.provider_name}
                    className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-1.5 md:mb-3 object-contain filter brightness-0 invert opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                  />
                  <p className="text-center text-[10px] md:text-sm text-slate-300 font-medium line-clamp-1">{provider.provider_name}</p>
                </a>
              ))}
            </div>
          </div>
        )}

        {(watchProviders.rent || watchProviders.buy) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {watchProviders.rent && (
              <div>
                <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                  <DollarSign className="w-4 h-4 md:w-5 md:h-5 text-amber-400" />
                  <h3 className="text-base md:text-xl font-semibold text-white">Rent from</h3>
                </div>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {watchProviders.rent.map((provider) => (
                    <div key={provider.provider_id} className="flex items-center gap-2 md:gap-3 bg-slate-800/50 px-3 md:px-4 py-2 md:py-2.5 rounded-lg">
                      <img
                        src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                        alt={provider.provider_name}
                        className="w-6 h-6 md:w-8 md:h-8 object-contain"
                      />
                      <span className="text-slate-300 text-xs md:text-sm">{provider.provider_name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {watchProviders.buy && (
              <div>
                <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                  <ExternalLink className="w-4 h-4 md:w-5 md:h-5 text-rose-400" />
                  <h3 className="text-base md:text-xl font-semibold text-white">Buy from</h3>
                </div>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {watchProviders.buy.map((provider) => (
                    <div key={provider.provider_id} className="flex items-center gap-2 md:gap-3 bg-slate-800/50 px-3 md:px-4 py-2 md:py-2.5 rounded-lg">
                      <img
                        src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                        alt={provider.provider_name}
                        className="w-6 h-6 md:w-8 md:h-8 object-contain"
                      />
                      <span className="text-slate-300 text-xs md:text-sm">{provider.provider_name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
