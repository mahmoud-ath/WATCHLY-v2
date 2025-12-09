import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { Star, Play, Pause, Volume2, Film, Clock, Calendar, Zap } from 'lucide-react';

const HeroSectionMobile: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  const movies = [
    {
      id: 1,
      title: "INTERSTELLAR",
      year: 2014,
      rating: 8.6,
      duration: "2h 49m",
      director: "Christopher Nolan",
      tagline: "Mankind was born on Earth. It was never meant to die here.",
      color: "#1E3A8A",
      image: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
      accent: "#3B82F6"
    },
    {
      id: 2,
      title: "THE BATMAN",
      year: 2022,
      rating: 8.3,
      duration: "2h 56m",
      director: "Matt Reeves",
      tagline: "Unmask the truth.",
      color: "#171717",
      image: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
      accent: "#DC2626"
    },
    {
      id: 3,
      title: "BLADE RUNNER 2049",
      year: 2017,
      rating: 8.0,
      duration: "2h 44m",
      director: "Denis Villeneuve",
      tagline: "The key to the future is finally unearthed.",
      color: "#0F172A",
      image: "https://image.tmdb.org/t/p/w500/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg",
      accent: "#06B6D4"
    },
    {
      id: 4,
      title: "DUNE",
      year: 2021,
      rating: 8.0,
      duration: "2h 35m",
      director: "Denis Villeneuve",
      tagline: "A mythic and emotionally charged hero's journey.",
      color: "#78350F",
      image: "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
      accent: "#D97706"
    }
  ];

  const currentMovie = movies[activeIndex];
  
  // Parallax values based on scroll
  const y = useTransform(scrollY, [0, 300], [0, 150]);
  const opacity = useTransform(scrollY, [0, 200], [1, 0.5]);
  const scale = useTransform(scrollY, [0, 200], [1, 0.95]);

  // Auto-rotate movies with smooth animation
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % movies.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPlaying, movies.length]);

  // Floating particles animation
  const FloatingParticles = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            background: `radial-gradient(circle, ${currentMovie.accent}40, transparent 70%)`,
          }}
          initial={{
            x: Math.random() * 100 + '%',
            y: Math.random() * 100 + '%',
            scale: Math.random() * 0.5 + 0.3,
            opacity: Math.random() * 0.3 + 0.1,
          }}
          animate={{
            x: [null, `${Math.random() * 100}%`],
            y: [null, `${Math.random() * 100}%`],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );

  return (
    <motion.div
      ref={containerRef}
      className="relative w-full min-h-screen bg-black overflow-hidden "
      style={{ y }}
    >
      {/* Background Gradient */}
      <motion.div 
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 30% 20%, ${currentMovie.color}15, transparent 50%)`,
        }}
        animate={{
          background: [
            `radial-gradient(circle at 30% 20%, ${currentMovie.color}15, transparent 50%)`,
            `radial-gradient(circle at 70% 20%, ${currentMovie.color}15, transparent 50%)`,
            `radial-gradient(circle at 30% 20%, ${currentMovie.color}15, transparent 50%)`,
          ],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* 3D Grid Background */}
      <motion.div 
        className="absolute inset-0 opacity-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1 }}
      >
        <div className="grid grid-cols-8 gap-2 p-4">
          {Array.from({ length: 48 }).map((_, i) => (
            <motion.div
              key={i}
              className="aspect-square border border-white/10 rounded-sm"
              initial={{ rotateX: 45, rotateY: 45, scale: 0.8 }}
              animate={{ 
                rotateX: [45, 60, 45],
                rotateY: [45, 30, 45],
                scale: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 4,
                delay: i * 0.05,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            />
          ))}
        </div>
      </motion.div>

      <motion.div 
        className="relative z-10 min-h-screen flex flex-col px-4 pt-8 pb-24"
        style={{ opacity, scale }}
      >
        {/* Header */}
        <motion.header 
          className="flex items-center justify-between mb-8"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          
          
          <motion.div 
            className="flex items-center gap-3"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center"
              whileHover={{ scale: 1.1, borderColor: 'rgba(255,255,255,0.4)' }}
              whileTap={{ scale: 0.95 }}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 text-white" />
              ) : (
                <Play className="w-4 h-4 text-white" />
              )}
            </motion.button>
            
            <motion.div 
              className="w-2 h-2 bg-green-500 rounded-full"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.header>

        {/* 3D Carousel */}
        <motion.div 
          className="relative flex-1 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              className="relative h-[400px]"
              initial={{ 
                x: 100, 
                opacity: 0,
                rotateY: 15,
                rotateX: 5,
                scale: 0.9
              }}
              animate={{ 
                x: 0, 
                opacity: 1,
                rotateY: 0,
                rotateX: 0,
                scale: 1
              }}
              exit={{ 
                x: -100, 
                opacity: 0,
                rotateY: -15,
                rotateX: -5,
                scale: 0.9
              }}
              transition={{
                type: 'spring',
                stiffness: 100,
                damping: 20,
                duration: 0.6
              }}
            >
              {/* 3D Card Frame */}
              <motion.div
                className="absolute inset-0 rounded-2xl overflow-hidden border border-white/10"
                style={{
                  transformStyle: 'preserve-3d',
                  perspective: '1000px'
                }}
                whileHover={{ rotateY: 5, rotateX: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {/* Glow Effect */}
                <motion.div
                  className="absolute -inset-4 rounded-3xl blur-2xl"
                  style={{ backgroundColor: currentMovie.accent }}
                  initial={{ opacity: 0.3 }}
                  animate={{ opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />

                {/* Main Poster */}
                <motion.img
                  src={currentMovie.image}
                  alt={currentMovie.title}
                  className="w-full h-full object-cover relative z-10"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8 }}
                />

                {/* 3D Edge Lighting */}
                <motion.div
                  className="absolute inset-0 border-2 border-white/20 rounded-2xl"
                  style={{ 
                    boxShadow: `0 0 60px ${currentMovie.accent}40`,
                    transform: 'translateZ(10px)'
                  }}
                  animate={{
                    boxShadow: [
                      `0 0 60px ${currentMovie.accent}40`,
                      `0 0 80px ${currentMovie.accent}60`,
                      `0 0 60px ${currentMovie.accent}40`,
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>

              {/* Floating Corner Markers */}
              <motion.div 
                className="absolute top-4 left-4 w-3 h-3 bg-white rounded-full"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div 
                className="absolute top-4 right-4 w-3 h-3 bg-white rounded-full"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              />
              <motion.div 
                className="absolute bottom-4 left-4 w-3 h-3 bg-white rounded-full"
                animate={{ y: [0, 3, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
              />
              <motion.div 
                className="absolute bottom-4 right-4 w-3 h-3 bg-white rounded-full"
                animate={{ y: [0, 3, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.7 }}
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Movie Info */}
        <motion.div 
          className="space-y-6"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
         

          {/* Animated Stats */}
          <motion.div 
            className="grid grid-cols-3 gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {[
              { label: 'CINEMA', value: 'WHERE' },
              { label: 'TECHNOLOGY', value: 'MEETS' },
              { label: 'V2.0', value: 'WATCHLY' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center p-3 border border-white/10 rounded-lg bg-white/5"
                whileHover={{ 
                  scale: 1.05,
                  borderColor: currentMovie.accent,
                  backgroundColor: `${currentMovie.accent}15`
                }}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <motion.div 
                  className="text-lg font-bold text-white mb-1"
                  animate={{ 
                    color: [currentMovie.accent, '#ffffff', currentMovie.accent]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-xs text-white/50">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Action Buttons */}
      

          {/* Animated Dots */}
          <motion.div 
            className="flex items-center justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {movies.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveIndex(index)}
                className="relative"
                whileHover={{ scale: 1.5 }}
                whileTap={{ scale: 0.8 }}
              >
                <motion.div 
                  className={`w-1.5 h-1.5 rounded-full ${index === activeIndex ? 'bg-white' : 'bg-white/30'}`}
                  animate={index === activeIndex ? {
                    scale: [1, 1.5, 1],
                    backgroundColor: [currentMovie.accent, '#ffffff', currentMovie.accent],
                  } : {}}
                  transition={index === activeIndex ? {
                    duration: 2,
                    repeat: Infinity,
                  } : {}}
                />
                {index === activeIndex && (
                  <motion.div
                    className="absolute -inset-2 rounded-full border border-white/30"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Floating Status Bar */}
      <motion.div 
        className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-lg border-t border-white/10"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 1.2, type: 'spring' }}
      >
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between text-xs text-white/60">
            <motion.div 
              className="flex items-center gap-3"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <div className="flex items-center gap-1">
                <Zap className="w-3 h-3 text-green-500" />
                <span>AI ACTIVE</span>
              </div>
              <span>•</span>
              <span>{movies.length} FILMS</span>
            </motion.div>
            <motion.div 
              className="text-white/40"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              AUTO PLAY: {isPlaying ? 'ON' : 'OFF'}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Animated Scroll Indicator */}
      <motion.div
        className="fixed top-4 left-1/2 -translate-x-1/2 h-0.5 w-20 bg-white/20 rounded-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          className="h-full bg-white"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </motion.div>
  );
};

export default HeroSectionMobile;